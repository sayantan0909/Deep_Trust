# Unified response shape used by all 4 detectors
def format_response(label: str, confidence: float, reason: str, extra: dict = None) -> dict:
    return {
        "verdict": label,                          # "FAKE" or "REAL"
        "confidence": confidence,                  # 0–100
        "reason": reason,
        "is_fake": label == "FAKE",
        **(extra or {})
    }
