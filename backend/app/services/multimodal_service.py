# C:\DeepTrust\backend\app\services\multimodal_service.py

from app.ml.audio_detector import detect_fake_audio
from app.ml.whisper_transcriber import transcribe_audio
from app.ml.model_loader import get_model

AUDIO_WEIGHT = 0.5
TEXT_WEIGHT  = 0.5

def _detect_text(text: str) -> dict:
    if not text or len(text.strip()) < 5:
        return {
            "label": "UNKNOWN", "fake_score": 0.5,
            "confidence": 0.0,  "skipped": True,
            "reason": "Transcript too short"
        }

    model  = get_model("text")
    result = model(text, truncation=True, max_length=128)[0]
    label  = result["label"].upper()
    score  = result["score"]

    # fake_score = probability it IS fake
    fake_score = score if ("FAKE" in label or label == "LABEL_0") \
                 else 1.0 - score

    return {
        "label":      "FAKE" if fake_score > 0.5 else "REAL",
        "fake_score": round(fake_score, 4),
        "confidence": round(score * 100, 1),
        "skipped":    False,
        "reason":     "Misinformation patterns detected" \
                      if fake_score > 0.5 else "Content appears factual"
    }


def _fuse(audio_fake: float, text_fake: float,
          text_skipped: bool) -> dict:

    if text_skipped:
        score  = audio_fake
        method = "audio_only"
    else:
        score  = (AUDIO_WEIGHT * audio_fake) + (TEXT_WEIGHT * text_fake)
        method = "weighted_fusion"

    if score >= 0.70:   verdict, risk = "FAKE", "HIGH"
    elif score >= 0.50: verdict, risk = "FAKE", "MEDIUM"
    elif score >= 0.35: verdict, risk = "REAL", "LOW"
    else:               verdict, risk = "REAL", "VERY LOW"

    return {
        "verdict":        verdict,
        "risk_level":     risk,
        "fusion_score":   round(score, 4),
        "confidence":     round(score * 100 if verdict == "FAKE"
                                else (1 - score) * 100, 1),
        "fusion_method":  method
    }


async def run_multimodal_analysis(file_bytes: bytes) -> dict:
    # Branch 1 — audio authenticity
    audio_result = detect_fake_audio(file_bytes)

    # Branch 2 — speech → text → semantic check
    transcript   = transcribe_audio(file_bytes)
    text_result  = {"label": "UNKNOWN", "fake_score": 0.5,
                    "confidence": 0.0,  "skipped": True,
                    "reason": "Transcription failed"}

    if transcript["success"] and transcript["transcript"]:
        text_result = _detect_text(transcript["transcript"])

    # Branch 3 — fusion
    fusion = _fuse(
        audio_fake   = audio_result["fake_score"],
        text_fake    = text_result["fake_score"],
        text_skipped = text_result.get("skipped", False)
    )

    return {
        "verdict":       fusion["verdict"],
        "confidence":    fusion["confidence"],
        "risk_level":    fusion["risk_level"],
        "fusion_score":  fusion["fusion_score"],
        "fusion_method": fusion["fusion_method"],

        "audio_analysis": {
            "verdict":    audio_result["label"],
            "fake_score": audio_result["fake_score"],
            "confidence": audio_result["confidence"],
            "reason":     audio_result["reason"]
        },

        "text_analysis": {
            "transcript": transcript.get("transcript", ""),
            "language":   transcript.get("language_name", "Unknown"),
            "verdict":    text_result["label"],
            "fake_score": text_result["fake_score"],
            "confidence": text_result["confidence"],
            "reason":     text_result["reason"],
            "skipped":    text_result.get("skipped", False)
        }
    }