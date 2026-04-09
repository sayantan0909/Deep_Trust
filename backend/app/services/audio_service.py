from app.ml.audio_detector import detect_fake_audio
from app.utils.response_formatter import format_response

async def run_audio_analysis(file_bytes: bytes) -> dict:
    result = detect_fake_audio(file_bytes)
    return format_response(
        label=result["label"],
        confidence=result["confidence"],
        reason=result["reason"],
        extra={"all_scores": result.get("all_scores")}
    )
