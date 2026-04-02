import requests
from app.config import TEXT_MODEL_URL, HF_HEADERS

def detect_fake_text(text: str) -> dict:
    """
    Sends text to HuggingFace Inference API.
    Returns: { label: "FAKE"/"REAL", confidence: 0.0–1.0, reason: str }
    """
    response = requests.post(
        TEXT_MODEL_URL,
        headers=HF_HEADERS,
        json={"inputs": text},
        timeout=30
    )
    response.raise_for_status()
    results = response.json()

    # HF returns list of [{"label": "FAKE", "score": 0.91}, {"label": "REAL", "score": 0.09}]
    # Sort by score descending, pick top
    if isinstance(results[0], list):
        results = results[0]

    top = max(results, key=lambda x: x["score"])

    return {
        "label": top["label"].upper(),
        "confidence": round(top["score"] * 100, 1),
        "reason": f"Model confidence: {round(top['score']*100,1)}% that this is {top['label']}",
        "all_scores": {r["label"]: round(r["score"]*100, 1) for r in results}
    }
