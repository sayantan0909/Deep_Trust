import requests
import json
from app.config import AUDIO_MODEL_URL

SPACE_BASE = "https://sayantan090-audio-deepfake-detector.hf.space"

def detect_fake_audio(file_bytes: bytes) -> dict:
    try:
        # ── STEP 1: Upload file to Space ──────────────────────
        upload_response = requests.post(
            f"{SPACE_BASE}/gradio_api/upload",
            files={"files": ("audio.wav", file_bytes, "audio/wav")},
            timeout=30
        )
        upload_response.raise_for_status()
        uploaded_paths = upload_response.json()

        if not uploaded_paths or not isinstance(uploaded_paths, list):
            raise ValueError(f"Upload failed: {upload_response.text}")

        uploaded_path = uploaded_paths[0]

        # ── STEP 2: Submit predict with exact schema from /info ─
        submit_response = requests.post(
            f"{SPACE_BASE}/gradio_api/call/predict",
            json={
                "data": [
                    {
                        "path": uploaded_path,
                        "orig_name": "audio.wav",
                        "mime_type": "audio/wav",
                        "meta": {"_type": "gradio.FileData"}   # ← exact key from API info
                    }
                ]
            },
            timeout=30
        )
        submit_response.raise_for_status()
        event_id = submit_response.json()["event_id"]

        # ── STEP 3: Stream SSE result ─────────────────────────
        result_response = requests.get(
            f"{SPACE_BASE}/gradio_api/call/predict/{event_id}",
            timeout=90,
            stream=True
        )
        result_response.raise_for_status()

        result_data = None
        for raw_line in result_response.iter_lines():
            line = raw_line.decode("utf-8") if isinstance(raw_line, bytes) else raw_line
            if line.startswith("data: "):
                payload = json.loads(line[6:])
                # Skip error events — {"error": "..."}
                if isinstance(payload, dict) and "error" in payload:
                    raise ValueError(f"Space error: {payload['error']}")
                if isinstance(payload, list) and len(payload) > 0:
                    result_data = payload[0]
                    break

        if result_data is None:
            raise ValueError("No result data in SSE stream")

        # ── STEP 4: Parse output text ─────────────────────────
        # Expected: "🔴 FAKE: 91.3%\n🟢 REAL: 8.7%"
        fake_score = 0.0
        real_score = 0.0
        for line in str(result_data).splitlines():
            upper = line.upper()
            if "FAKE" in upper and ":" in line:
                fake_score = float(line.split(":")[-1].strip().replace("%", "")) / 100
            elif "REAL" in upper and ":" in line:
                real_score = float(line.split(":")[-1].strip().replace("%", "")) / 100

        # Fallback if only one label returned
        if fake_score == 0.0 and real_score == 0.0:
            raise ValueError(f"Could not parse scores from: {result_data}")
        if real_score == 0.0:
            real_score = round(1.0 - fake_score, 4)

        label = "FAKE" if fake_score > 0.5 else "REAL"
        return {
            "label":      label,
            "confidence": round(max(fake_score, real_score) * 100, 1),
            "fake_score": round(fake_score, 4),
            "real_score": round(real_score, 4),
            "reason":     f"Voice pattern analysis detected {label} audio",
            "all_scores": {
                "FAKE": round(fake_score * 100, 1),
                "REAL": round(real_score * 100, 1)
            }
        }

    except Exception as e:
        return {
            "label":      "ERROR",
            "confidence": 0,
            "fake_score": 0.0,
            "real_score": 0.0,
            "reason":     str(e),
            "all_scores": {}
        }