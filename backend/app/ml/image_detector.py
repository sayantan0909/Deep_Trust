import requests
from PIL import Image
import io
from app.config import IMAGE_MODEL_URL, HF_HEADERS

def detect_fake_image(file_bytes: bytes) -> dict:
    """
    Sends raw image bytes to HuggingFace ViT deepfake detection model.
    Returns: { label, confidence, reason }
    """
    response = requests.post(
        IMAGE_MODEL_URL,
        headers=HF_HEADERS,
        data=file_bytes,        # HF image endpoint accepts raw bytes
        timeout=30
    )
    response.raise_for_status()
    results = response.json()

    if isinstance(results[0], list):
        results = results[0]

    # Model labels are typically "Fake" / "Real"
    top = max(results, key=lambda x: x["score"])
    label = "FAKE" if "fake" in top["label"].lower() else "REAL"

    return {
        "label": label,
        "confidence": round(top["score"] * 100, 1),
        "reason": f"ViT model detected image as {label} with {round(top['score']*100,1)}% confidence",
        "all_scores": {r["label"]: round(r["score"]*100, 1) for r in results}
    }
