# import cv2
# import numpy as np
# from app.ml.image_detector import detect_fake_image

# def detect_fake_video(tmp_path: str, sample_every_n_seconds: int = 2) -> dict:
#     """
#     Strategy: Extract 1 frame every N seconds → run image detector on each → average scores.
#     """
#     cap = cv2.VideoCapture(tmp_path)
#     fps = cap.get(cv2.CAP_PROP_FPS) or 25
#     frame_interval = int(fps * sample_every_n_seconds)

#     fake_scores = []
#     frame_count = 0
#     analyzed = 0

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break
#         if frame_count % frame_interval == 0:
#             # Convert frame to JPEG bytes and send to image detector
#             _, buffer = cv2.imencode(".jpg", frame)
#             frame_bytes = buffer.tobytes()

#             try:
#                 result = detect_fake_image(frame_bytes)
#                 score = result["confidence"] if result["label"] == "FAKE" else 100 - result["confidence"]
#                 fake_scores.append(score)
#                 analyzed += 1
#             except Exception:
#                 pass  # skip failed frames
#         frame_count += 1

#     cap.release()

#     if not fake_scores:
#         return {"label": "UNKNOWN", "confidence": 0, "reason": "Could not extract frames", "frames_analyzed": 0}

#     avg_fake_score = round(np.mean(fake_scores), 1)
#     label = "FAKE" if avg_fake_score >= 50 else "REAL"

#     return {
#         "label": label,
#         "confidence": avg_fake_score if label == "FAKE" else round(100 - avg_fake_score, 1),
#         "reason": f"Analyzed {analyzed} frames. Avg deepfake probability: {avg_fake_score}%",
#         "frames_analyzed": analyzed
#     }
# C:\DeepTrust\backend\app\ml\video_detector.py

import cv2
import numpy as np
import subprocess
import tempfile
import os
import logging
from typing import Optional
from app.ml.image_detector import detect_fake_image

logger = logging.getLogger(__name__)

# ── Constants ─────────────────────────────────────────────────────────────────
MAX_FRAMES          = 50          # hard cap to keep inference fast
SAMPLE_EVERY_N_SEC  = 2           # 1 frame per N seconds
FAKE_THRESHOLD      = 0.60        # fake_ratio above this → FAKE
REAL_THRESHOLD      = 0.40        # fake_ratio below this → REAL


# ── Helpers ───────────────────────────────────────────────────────────────────

def _format_timestamp(seconds: float) -> str:
    """Convert float seconds → 'MM:SS' string."""
    minutes = int(seconds) // 60
    secs    = int(seconds) % 60
    return f"{minutes:02d}:{secs:02d}"


def normalize_video(input_path: str) -> str:
    """
    Preprocess video with FFmpeg to fix codec, mobile video, and browser upload issues.
    """
    output_path = tempfile.NamedTemporaryFile(suffix=".mp4", delete=False).name

    cmd = [
        "ffmpeg", "-y",
        "-i", input_path,
        "-vcodec", "libx264",
        "-acodec", "aac",
        output_path
    ]

    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    return output_path


def _extract_frames(video_path: str) -> list[dict]:
    """
    Extract one frame every SAMPLE_EVERY_N_SEC seconds using OpenCV.
    Returns a list of dicts: { frame_index, timestamp_sec, frame_bytes }.
    Capped at MAX_FRAMES.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open video file: {video_path}")

    fps            = cap.get(cv2.CAP_PROP_FPS) or 25.0
    total_frames   = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration_sec   = total_frames / fps
    frame_interval = max(1, int(fps * SAMPLE_EVERY_N_SEC))

    logger.info(
        "[VIDEO] fps=%.1f  total_frames=%d  duration=%.1fs  interval=%d",
        fps, total_frames, duration_sec, frame_interval,
    )

    extracted = []
    frame_idx = 0

    while cap.isOpened() and len(extracted) < MAX_FRAMES:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_idx % frame_interval == 0:
            ok, buffer = cv2.imencode(
                ".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 90]
            )
            if ok:
                extracted.append({
                    "frame_index":  frame_idx,
                    "timestamp_sec": frame_idx / fps,
                    "frame_bytes":  buffer.tobytes(),
                })

        frame_idx += 1

    cap.release()
    logger.info("[VIDEO] Extracted %d frames for analysis.", len(extracted))
    return extracted


def _extract_audio(video_path: str) -> Optional[bytes]:
    """
    Use ffmpeg (if available) to extract audio as WAV bytes.
    Returns None on any failure so the caller can degrade gracefully.
    """
    try:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            tmp_wav = tmp.name

        cmd = [
            "ffmpeg", "-y", "-i", video_path,
            "-vn",                          # no video
            "-acodec", "pcm_s16le",         # raw PCM → wav2vec2 compatible
            "-ar", "16000",                 # 16 kHz
            "-ac", "1",                     # mono
            tmp_wav,
        ]
        result = subprocess.run(
            cmd, capture_output=True, timeout=60
        )

        if result.returncode != 0:
            logger.warning(
                "[VIDEO] ffmpeg audio extraction failed: %s",
                result.stderr.decode(errors="replace")[:300],
            )
            return None

        with open(tmp_wav, "rb") as f:
            audio_bytes = f.read()

        return audio_bytes if len(audio_bytes) > 1000 else None

    except FileNotFoundError:
        logger.warning("[VIDEO] ffmpeg not found — skipping audio track.")
        return None
    except Exception as exc:
        logger.warning("[VIDEO] Audio extraction error: %s", exc)
        return None
    finally:
        try:
            os.remove(tmp_wav)
        except Exception:
            pass


def _analyze_frames_batch(frames: list[dict]) -> list[dict]:
    """
    Run detect_fake_image on each frame sequentially.
    Returns enriched frame records with prediction/confidence/timestamp.
    """
    results = []
    for item in frames:
        ts_str = _format_timestamp(item["timestamp_sec"])
        try:
            detection = detect_fake_image(item["frame_bytes"])
            label      = detection.get("label", "UNKNOWN")
            confidence = detection.get("confidence", 0.0)

            # Normalise to a single "fake probability" in [0, 100]
            if label == "FAKE":
                fake_prob = confidence
            elif label == "REAL":
                fake_prob = 100.0 - confidence
            else:
                fake_prob = 50.0          # unknown → neutral

            results.append({
                "timestamp":   ts_str,
                "prediction":  label,
                "confidence":  round(confidence, 1),
                "fake_prob":   round(fake_prob, 1),
            })
            logger.debug("[VIDEO] %s → %s @ %.1f%%", ts_str, label, confidence)

        except Exception as exc:
            logger.warning("[VIDEO] Frame %s failed: %s", ts_str, exc)
            results.append({
                "timestamp":   ts_str,
                "prediction":  "ERROR",
                "confidence":  0.0,
                "fake_prob":   50.0,      # neutral on error
            })

    return results


def _temporal_consistency(frame_results: list[dict]) -> dict:
    """
    Analyse prediction consistency over time.

    Returns:
        inconsistency_score  – 0..100  (0 = perfectly consistent)
        longest_fake_streak  – int (frames)
        flip_count           – number of label transitions
        consistency_label    – "HIGH" | "MEDIUM" | "LOW"
    """
    labels = [r["prediction"] for r in frame_results if r["prediction"] != "ERROR"]
    if not labels:
        return {
            "inconsistency_score": 0,
            "longest_fake_streak": 0,
            "flip_count": 0,
            "consistency_label": "UNKNOWN",
        }

    # Count transitions (REAL→FAKE or FAKE→REAL)
    flips = sum(1 for a, b in zip(labels, labels[1:]) if a != b)

    # Longest run of FAKE
    max_streak = cur_streak = 0
    for lbl in labels:
        if lbl == "FAKE":
            cur_streak += 1
            max_streak = max(max_streak, cur_streak)
        else:
            cur_streak = 0

    # Inconsistency score: normalise flips against max possible transitions
    max_flips            = max(len(labels) - 1, 1)
    inconsistency_score  = round((flips / max_flips) * 100, 1)

    if inconsistency_score < 25:
        consistency_label = "HIGH"
    elif inconsistency_score < 55:
        consistency_label = "MEDIUM"
    else:
        consistency_label = "LOW"

    return {
        "inconsistency_score": inconsistency_score,
        "longest_fake_streak": max_streak,
        "flip_count":          flips,
        "consistency_label":   consistency_label,
    }


def _aggregate(frame_results: list[dict]) -> dict:
    """
    Compute final verdict from per-frame results.
    """
    valid   = [r for r in frame_results if r["prediction"] != "ERROR"]
    total   = len(valid)
    if total == 0:
        return {
            "final_prediction":  "UNCERTAIN",
            "confidence":        0.0,
            "fake_frames":       0,
            "real_frames":       0,
            "fake_ratio":        0.0,
            "avg_confidence":    0.0,
            "confidence_gap":    0.0,
        }

    fake_frames  = sum(1 for r in valid if r["prediction"] == "FAKE")
    real_frames  = total - fake_frames
    fake_ratio   = round(fake_frames / total, 4)

    avg_fake_conf = (
        np.mean([r["confidence"] for r in valid if r["prediction"] == "FAKE"])
        if fake_frames else 0.0
    )
    avg_real_conf = (
        np.mean([r["confidence"] for r in valid if r["prediction"] == "REAL"])
        if real_frames else 0.0
    )

    avg_confidence  = round(float(np.mean([r["fake_prob"] for r in valid])), 2)
    confidence_gap  = round(abs(avg_fake_conf - avg_real_conf), 2)

    if fake_ratio > FAKE_THRESHOLD:
        final_prediction = "FAKE"
        confidence       = round(avg_fake_conf, 2) if avg_fake_conf else round(avg_confidence, 2)
    elif fake_ratio < REAL_THRESHOLD:
        final_prediction = "REAL"
        confidence       = round(avg_real_conf, 2) if avg_real_conf else round(100 - avg_confidence, 2)
    else:
        final_prediction = "UNCERTAIN"
        confidence       = round(avg_confidence, 2)

    return {
        "final_prediction": final_prediction,
        "confidence":       confidence,
        "fake_frames":      fake_frames,
        "real_frames":      real_frames,
        "fake_ratio":       fake_ratio,
        "avg_confidence":   avg_confidence,
        "confidence_gap":   confidence_gap,
    }


def _fuse_with_audio(image_score: float, audio_result: dict) -> tuple[str, float]:
    """
    Combine image fake-probability with audio result into a final fused score.
    image_score  – [0, 100] probability of FAKE from image analysis
    audio_result – dict returned by detect_fake_audio
    Returns (label, fused_confidence_pct)
    """
    audio_fake_score = audio_result.get("all_scores", {}).get("FAKE", 50.0)
    fused = round((image_score + audio_fake_score) / 2, 2)

    if fused > 60:
        label = "FAKE"
    elif fused < 40:
        label = "REAL"
    else:
        label = "UNCERTAIN"

    return label, fused


# ── Public API ────────────────────────────────────────────────────────────────

def detect_fake_video(tmp_path: str, sample_every_n_seconds: int = SAMPLE_EVERY_N_SEC) -> dict:
    """
    Full pipeline:
      1. Extract frames (time-sampled, capped at MAX_FRAMES)
      2. Run image deepfake detector on each frame
      3. Temporal consistency analysis
      4. Aggregate verdict (fake_ratio thresholds)
      5. Optional: extract audio → audio detector → fuse scores

    Returns structured dict matching the required API response format.
    """
    logger.info("[VIDEO] Starting analysis for: %s", tmp_path)

    normalized_path = normalize_video(tmp_path)

    try:
        # ── Step 1: Extract frames ─────────────────────────────────────────────
        try:
            frames = _extract_frames(normalized_path)
        except Exception as exc:
            logger.error("[VIDEO] Frame extraction failed: %s", exc)
            return _error_response(str(exc))
    
        if not frames:
            return _error_response("No frames could be extracted from the video.")
    
        # ── Step 2: Frame-level image analysis ────────────────────────────────
        frame_results = _analyze_frames_batch(frames)
    
        # ── Step 3: Temporal consistency ──────────────────────────────────────
        temporal = _temporal_consistency(frame_results)
    
        # ── Step 4: Aggregate image verdict ───────────────────────────────────
        agg = _aggregate(frame_results)
    
        # ── Step 5: Audio analysis (optional) ─────────────────────────────────
        audio_result   = None
        audio_bytes    = _extract_audio(normalized_path)
        multimodal_used = False
    
        if audio_bytes:
            try:
                from app.ml.audio_detector import detect_fake_audio
                audio_result    = detect_fake_audio(audio_bytes)
                multimodal_used = audio_result.get("label") not in (None, "ERROR")
                logger.info("[VIDEO] Audio result: %s", audio_result.get("label"))
            except Exception as exc:
                logger.warning("[VIDEO] Audio detector failed: %s", exc)
                audio_result = None
    
        # ── Step 6: Fuse scores if audio is available ─────────────────────────
        if multimodal_used and audio_result:
            fused_label, fused_conf = _fuse_with_audio(
                agg["avg_confidence"], audio_result
            )
            final_prediction = fused_label
            confidence       = fused_conf
        else:
            final_prediction = agg["final_prediction"]
            confidence       = agg["confidence"]
    
        # ── Build response ────────────────────────────────────────────────────
        # Strip internal fake_prob field from public frame results
        public_frame_results = [
            {
                "timestamp":  r["timestamp"],
                "prediction": r["prediction"],
                "confidence": r["confidence"],
            }
            for r in frame_results
        ]
    
        response = {
            "final_prediction": final_prediction,
            "confidence":       round(confidence, 2),
            "is_fake":          final_prediction == "FAKE",
            "analysis_summary": {
                "total_frames":         len(frame_results),
                "fake_frames":          agg["fake_frames"],
                "real_frames":          agg["real_frames"],
                "fake_ratio":           agg["fake_ratio"],
                "avg_confidence":       agg["avg_confidence"],
                "confidence_gap":       agg["confidence_gap"],
                "temporal_consistency": temporal["consistency_label"],
                "flip_count":           temporal["flip_count"],
                "longest_fake_streak":  temporal["longest_fake_streak"],
                "inconsistency_score":  temporal["inconsistency_score"],
                "multimodal_used":      multimodal_used,
            },
            "frame_results": public_frame_results,
            "audio_analysis": (
                {
                    "label":      audio_result.get("label"),
                    "confidence": audio_result.get("confidence"),
                    "reason":     audio_result.get("reason"),
                }
                if multimodal_used and audio_result else None
            ),
            "reason": _build_reason(final_prediction, agg, temporal, multimodal_used),
        }
    
        logger.info(
            "[VIDEO] ✅ Done. verdict=%s confidence=%.1f frames=%d",
            final_prediction, confidence, len(frame_results),
        )
        return response

    finally:
        if normalized_path and os.path.exists(normalized_path) and normalized_path != tmp_path:
            try:
                os.remove(normalized_path)
            except Exception as exc:
                logger.warning("[VIDEO] Failed to cleanup normalized video: %s", exc)


def _build_reason(
    verdict: str,
    agg: dict,
    temporal: dict,
    multimodal: bool,
) -> str:
    parts = [
        f"Analyzed {agg['fake_frames'] + agg['real_frames']} frames; "
        f"{agg['fake_frames']} flagged as FAKE ({agg['fake_ratio']*100:.0f}%).",
        f"Temporal consistency: {temporal['consistency_label']} "
        f"({temporal['flip_count']} label flips detected).",
    ]
    if multimodal:
        parts.append("Audio deepfake analysis included in final score.")
    parts.append(f"Final verdict: {verdict}.")
    return " ".join(parts)


def _error_response(reason: str) -> dict:
    return {
        "final_prediction": "ERROR",
        "confidence":       0.0,
        "is_fake":          False,
        "analysis_summary": {
            "total_frames":         0,
            "fake_frames":          0,
            "real_frames":          0,
            "fake_ratio":           0.0,
            "avg_confidence":       0.0,
            "confidence_gap":       0.0,
            "temporal_consistency": "UNKNOWN",
            "flip_count":           0,
            "longest_fake_streak":  0,
            "inconsistency_score":  0.0,
            "multimodal_used":      False,
        },
        "frame_results":  [],
        "audio_analysis": None,
        "reason":         reason,
    }