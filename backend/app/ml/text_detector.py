import requests
from app.config import TEXT_MODEL_URL, HF_HEADERS

def detect_fake_text(text: str) -> dict:
    """
    Sends text to the HuggingFace Inference API (Sayantan090/fake-news-detector).
    Returns: { label, confidence, reason, all_scores }
    """
    try:
        response = requests.post(
            TEXT_MODEL_URL,
            headers=HF_HEADERS,
            json={"inputs": text},
            timeout=30
        )
        response.raise_for_status()
        result = response.json()

        # HF Inference API returns a list of [{"label": ..., "score": ...}]
        # Some models return a nested list [[{...}]]
        if isinstance(result, list) and len(result) > 0:
            scores_list = result[0] if isinstance(result[0], list) else result
        else:
            raise ValueError(f"Unexpected API response format: {result}")

        # Build scores dict — normalize label keys to FAKE / REAL
        all_scores = {}
        for item in scores_list:
            key = item["label"].upper()
            # Handle varied label conventions: LABEL_0/LABEL_1, fake/real, etc.
            if key in ("LABEL_0", "FAKE", "FALSE", "MISLEADING"):
                all_scores["FAKE"] = round(item["score"] * 100, 1)
            elif key in ("LABEL_1", "REAL", "TRUE", "LEGITIMATE"):
                all_scores["REAL"] = round(item["score"] * 100, 1)
            else:
                all_scores[key] = round(item["score"] * 100, 1)

        # Pick the winning label
        fake_score = all_scores.get("FAKE", 0.0)
        real_score = all_scores.get("REAL", 0.0)
        label = "FAKE" if fake_score >= real_score else "REAL"
        confidence = max(fake_score, real_score)

        reason = (
            "Detected patterns of misinformation or exaggeration."
            if label == "FAKE"
            else "Content appears factual and consistent."
        )

        return {
            "label": label,
            "confidence": confidence,
            "reason": reason,
            "all_scores": all_scores
        }

    except Exception as e:
        return {
            "label": "ERROR",
            "confidence": 0,
            "reason": str(e),
            "all_scores": {}
        }