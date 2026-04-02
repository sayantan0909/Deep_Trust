from fastapi import APIRouter, HTTPException
from app.services.text_service import run_text_analysis, TextRequest

router = APIRouter()

@router.post("/text")
async def analyze_text(request: TextRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    return await run_text_analysis(request)
