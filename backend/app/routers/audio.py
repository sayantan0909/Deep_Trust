from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.audio_service import run_audio_analysis

router = APIRouter()

@router.post("/audio")
async def analyze_audio(file: UploadFile = File(...)):
    allowed = ["audio/mpeg", "audio/wav", "audio/flac", "audio/x-wav"]
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_bytes = await file.read()
    if len(file_bytes) > 25 * 1024 * 1024:   # 25MB limit
        raise HTTPException(status_code=400, detail="File too large (max 25MB)")

    return await run_audio_analysis(file_bytes)
