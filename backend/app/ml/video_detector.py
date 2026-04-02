import cv2
import numpy as np
from app.ml.image_detector import detect_fake_image

def detect_fake_video(tmp_path: str, sample_every_n_seconds: int = 2) -> dict:
    """
    Strategy: Extract 1 frame every N seconds → run image detector on each → average scores.
    """
    cap = cv2.VideoCapture(tmp_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    frame_interval = int(fps * sample_every_n_seconds)

    fake_scores = []
    frame_count = 0
    analyzed = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_interval == 0:
            # Convert frame to JPEG bytes and send to image detector
            _, buffer = cv2.imencode(".jpg", frame)
            frame_bytes = buffer.tobytes()

            try:
                result = detect_fake_image(frame_bytes)
                score = result["confidence"] if result["label"] == "FAKE" else 100 - result["confidence"]
                fake_scores.append(score)
                analyzed += 1
            except Exception:
                pass  # skip failed frames
        frame_count += 1

    cap.release()

    if not fake_scores:
        return {"label": "UNKNOWN", "confidence": 0, "reason": "Could not extract frames", "frames_analyzed": 0}

    avg_fake_score = round(np.mean(fake_scores), 1)
    label = "FAKE" if avg_fake_score >= 50 else "REAL"

    return {
        "label": label,
        "confidence": avg_fake_score if label == "FAKE" else round(100 - avg_fake_score, 1),
        "reason": f"Analyzed {analyzed} frames. Avg deepfake probability: {avg_fake_score}%",
        "frames_analyzed": analyzed
    }
