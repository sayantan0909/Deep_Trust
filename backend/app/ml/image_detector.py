# C:\DeepTrust\backend\app\ml\image_detector.py

import requests
import time
import json
from app.config import IMAGE_MODEL_URL

HF_SPACE_BASE_URL = IMAGE_MODEL_URL.replace("/gradio_api/call/predict", "")
UPLOAD_URL        = f"{HF_SPACE_BASE_URL}/gradio_api/upload"


def _upload_file_to_space(file_bytes: bytes) -> str:
    """
    Step 1: Upload the raw image to HF Space's /gradio_api/upload endpoint.
    Returns the file path string that Gradio assigns (e.g. '/tmp/gradio/abc123/image.jpg').
    """
    print(f"[IMAGE] 📤 Uploading file to: {UPLOAD_URL}")
    resp = requests.post(
        UPLOAD_URL,
        files={"files": ("image.jpg", file_bytes, "image/jpeg")},
        timeout=60,
    )
    resp.raise_for_status()
    result = resp.json()
    print(f"[IMAGE] 📤 Upload response: {result}")

    # Response is a list of file paths: ["/tmp/gradio/abc/image.jpg"]
    if isinstance(result, list) and len(result) > 0:
        return result[0]

    raise ValueError(f"Unexpected upload response: {result}")


def detect_fake_image(file_bytes: bytes) -> dict:
    """
    Sends image to Gradio 4+ Space using proper file upload flow:
      1. Upload file → get temp path
      2. POST /call/predict with the temp path
      3. Poll SSE for result
    """
    try:
        print(f"[IMAGE] 📦 Received {len(file_bytes)} bytes")

        # ── Step 1: Upload file to Space ───────────────────────────────────
        uploaded_path = _upload_file_to_space(file_bytes)
        print(f"[IMAGE] ✅ File uploaded, path: {uploaded_path}")

        # ── Step 2: Call /predict with the uploaded file reference ─────────
        # Gradio 4 expects: {"data": [{"path": "...", "orig_name": "..."}]}
        payload = {
            "data": [
                {
                    "path": uploaded_path,
                    "orig_name": "image.jpg",
                    "mime_type": "image/jpeg",
                }
            ]
        }

        print(f"[IMAGE] 🚀 POSTing predict to: {IMAGE_MODEL_URL}")
        init_resp = requests.post(IMAGE_MODEL_URL, json=payload, timeout=60)
        print(f"[IMAGE] 📬 POST status: {init_resp.status_code} | body: {init_resp.text[:300]}")
        init_resp.raise_for_status()

        event_id = init_resp.json().get("event_id")
        if not event_id:
            raise ValueError(f"No event_id in response: {init_resp.text}")
        print(f"[IMAGE] 🎫 event_id: {event_id}")

        # ── Step 3: Poll SSE for result ────────────────────────────────────
        result_url  = f"{IMAGE_MODEL_URL}/{event_id}"
        max_retries = 40

        for attempt in range(max_retries):
            print(f"[IMAGE] 🔄 Poll {attempt+1}/{max_retries}")
            try:
                res = requests.get(result_url, timeout=30)
                res.raise_for_status()
                print(f"[IMAGE] 📥 SSE raw:\n{res.text[:400]}")
            except requests.RequestException as e:
                print(f"[IMAGE] ⚠️ Poll error: {e}")
                time.sleep(3)
                continue

            current_event = None
            parsed_data   = None

            for raw_line in res.text.splitlines():
                line = raw_line.strip()

                if line.startswith("event:"):
                    current_event = line[len("event:"):].strip()
                    print(f"[IMAGE] 📡 event: {current_event}")

                elif line.startswith("data:"):
                    payload_str = line[len("data:"):].strip()
                    print(f"[IMAGE] 📡 data: {payload_str[:200]}")

                    if payload_str in ("", "null"):
                        continue

                    # ── Catch errors returned by Gradio ───────────────────
                    if current_event == "error":
                        try:
                            err_payload = json.loads(payload_str)
                            raise ValueError(
                                f"Gradio returned error: {err_payload}"
                            )
                        except json.JSONDecodeError:
                            raise ValueError(
                                f"Gradio error (raw): {payload_str}"
                            )

                    try:
                        payload_parsed = json.loads(payload_str)
                    except json.JSONDecodeError:
                        continue

                    if (
                        current_event == "complete"
                        and isinstance(payload_parsed, list)
                        and len(payload_parsed) > 0
                    ):
                        parsed_data = payload_parsed
                        break

            if parsed_data is not None:
                output = parsed_data[0]
                if not isinstance(output, dict):
                    raise ValueError(f"Unexpected output format: {parsed_data}")

                raw_label      = output.get("label", "")
                label          = "FAKE" if "fake" in raw_label.lower() else "REAL"

                conf_str       = str(output.get("confidence", "0%")).strip().rstrip("%")
                try:
                    confidence_pct = round(float(conf_str), 2)
                except ValueError:
                    confidence_pct = 0.0

                all_scores = {
                    "FAKE": round(float(output.get("FAKE 🔴", 0.0)) * 100, 1),
                    "REAL": round(float(output.get("REAL 🟢", 0.0)) * 100, 1),
                }

                print(f"[IMAGE] 🎉 Result: {label} @ {confidence_pct}%")
                return {
                    "label":      label,
                    "confidence": confidence_pct,
                    "reason":     f"Model detected image as {label} with {confidence_pct}% confidence",
                    "all_scores": all_scores,
                }

            wait = 2 if attempt < 10 else 4
            print(f"[IMAGE] ⏳ Waiting {wait}s...")
            time.sleep(wait)

        raise TimeoutError("Gradio Space did not respond after ~2 minutes.")

    except Exception as e:
        print(f"[IMAGE] ❌ {type(e).__name__}: {e}")
        return {
            "label":      "ERROR",
            "confidence": 0,
            "reason":     str(e),
            "all_scores": {},
        }