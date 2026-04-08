# from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
# import tempfile
# from app.services.video_service import run_video_analysis
# from app.utils.file_handler import cleanup_temp_file

# router = APIRouter()

# @router.post("/video")
# async def analyze_video(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
#     allowed = ["video/mp4", "video/quicktime", "video/webm"]
#     if file.content_type not in allowed:
#         raise HTTPException(status_code=400, detail="Unsupported file type")

#     file_bytes = await file.read()
#     if len(file_bytes) > 100 * 1024 * 1024:   # 100MB limit
#         raise HTTPException(status_code=400, detail="File too large (max 100MB)")

#     # Save to temp file since OpenCV requires a path
#     with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp:
#         tmp.write(file_bytes)
#         tmp_path = tmp.name

#     # Schedule cleanup task
#     background_tasks.add_task(cleanup_temp_file, tmp_path)

#     return await run_video_analysis(tmp_path)
# C:\DeepTrust\backend\app\routers\video.py

import tempfile
import logging
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks

from app.services.video_service import run_video_analysis
from app.utils.file_handler import cleanup_temp_file

logger = logging.getLogger(__name__)

router = APIRouter()

ALLOWED_MIME_TYPES = {
    "video/mp4",
    "video/quicktime",   # .mov
    "video/webm",
    "video/x-matroska",  # .mkv (bonus)
}
MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024   # 100 MB
TEMP_SUFFIX_MAP = {
    "video/mp4":        ".mp4",
    "video/quicktime":  ".mov",
    "video/webm":       ".webm",
    "video/x-matroska": ".mkv",
}


@router.post(
    "/video",
    summary="Analyze a video for deepfake content",
    response_description=(
        "Structured deepfake analysis including per-frame predictions, "
        "temporal consistency metrics, and an optional audio fusion score."
    ),
)
async def analyze_video(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="Video file (mp4, mov, webm) ≤ 100 MB"),
):
    """
    ### Video Deepfake Detection

    **Pipeline**
    1. Validate MIME type and size
    2. Extract one frame every 2 seconds (max 50 frames)
    3. Run image deepfake model on each frame
    4. Compute temporal consistency across the frame sequence
    5. Optionally extract audio and fuse with voice-deepfake model
    6. Return structured verdict with per-frame timeline

    **Response fields**
    - `final_prediction` – FAKE | REAL | UNCERTAIN | ERROR
    - `confidence` – 0–100
    - `analysis_summary` – frame counts, fake_ratio, temporal stats
    - `frame_results` – per-frame label + confidence + timestamp
    - `audio_analysis` – present only when audio could be extracted
    """
    # ── 1. MIME validation ────────────────────────────────────────────────
    content_type = (file.content_type or "").lower().split(";")[0].strip()
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported file type '{content_type}'. "
                f"Accepted: {', '.join(sorted(ALLOWED_MIME_TYPES))}"
            ),
        )

    # ── 2. Read & size validation ─────────────────────────────────────────
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File too large ({len(file_bytes) // (1024*1024)} MB). Maximum allowed: 100 MB.",
        )
    if len(file_bytes) < 1024:
        raise HTTPException(status_code=400, detail="File appears to be empty or corrupted.")

    # ── 3. Write to temp file (OpenCV needs a path, not bytes) ────────────
    suffix   = TEMP_SUFFIX_MAP.get(content_type, ".mp4")
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
            tmp.write(file_bytes)
            tmp_path = tmp.name
        logger.info(
            "[VIDEO ROUTER] Saved upload '%s' (%d MB) → %s",
            file.filename, len(file_bytes) // (1024 * 1024), tmp_path,
        )
    except OSError as exc:
        raise HTTPException(status_code=500, detail=f"Failed to save upload: {exc}")

    # ── 4. Schedule temp-file cleanup regardless of outcome ───────────────
    background_tasks.add_task(cleanup_temp_file, tmp_path)

    # ── 5. Run analysis ───────────────────────────────────────────────────
    result = await run_video_analysis(tmp_path)

    if result.get("final_prediction") == "ERROR":
        raise HTTPException(
            status_code=500,
            detail=result.get("reason", "Video analysis failed."),
        )

    return result