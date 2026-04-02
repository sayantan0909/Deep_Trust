from app.ml.image_detector import detect_fake_image
from app.utils.response_formatter import format_response

async def run_image_analysis(file_bytes: bytes) -> dict:
    result = detect_fake_image(file_bytes)
    return format_response(
        label=result["label"],
        confidence=result["confidence"],
        reason=result["reason"],
        extra={"all_scores": result.get("all_scores")}
    )
