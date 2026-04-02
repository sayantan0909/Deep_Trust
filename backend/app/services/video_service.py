from app.ml.video_detector import detect_fake_video
from app.utils.response_formatter import format_response

async def run_video_analysis(tmp_path: str) -> dict:
    result = detect_fake_video(tmp_path)
    return format_response(
        label=result["label"],
        confidence=result["confidence"],
        reason=result["reason"],
        extra={"frames_analyzed": result.get("frames_analyzed")}
    )
