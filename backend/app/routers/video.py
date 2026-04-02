from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
import tempfile
from app.services.video_service import run_video_analysis
from app.utils.file_handler import cleanup_temp_file

router = APIRouter()

@router.post("/video")
async def analyze_video(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    allowed = ["video/mp4", "video/quicktime", "video/webm"]
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_bytes = await file.read()
    if len(file_bytes) > 100 * 1024 * 1024:   # 100MB limit
        raise HTTPException(status_code=400, detail="File too large (max 100MB)")

    # Save to temp file since OpenCV requires a path
    with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    # Schedule cleanup task
    background_tasks.add_task(cleanup_temp_file, tmp_path)

    return await run_video_analysis(tmp_path)
