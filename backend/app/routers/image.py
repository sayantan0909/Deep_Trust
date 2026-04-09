from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.image_service import run_image_analysis

router = APIRouter()

@router.post("/image")
async def analyze_image(file: UploadFile = File(...)):
    allowed = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_bytes = await file.read()
    if len(file_bytes) > 10 * 1024 * 1024:   # 10MB limit
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    return await run_image_analysis(file_bytes)
