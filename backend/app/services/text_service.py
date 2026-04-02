from pydantic import BaseModel
from app.ml.text_detector import detect_fake_text
from app.utils.response_formatter import format_response

class TextRequest(BaseModel):
    text: str

async def run_text_analysis(request: TextRequest) -> dict:
    result = detect_fake_text(request.text)
    return format_response(
        label=result["label"],
        confidence=result["confidence"],
        reason=result["reason"],
        extra={"all_scores": result.get("all_scores")}
    )
