# C:\DeepTrust\backend\app\routers\audio.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.audio_service import run_audio_analysis
from app.services.multimodal_service import run_multimodal_analysis

router = APIRouter()

ALLOWED = ["audio/mpeg", "audio/wav", "audio/flac",
           "audio/x-wav", "audio/mp4", "audio/ogg"]
MAX_SIZE = 25 * 1024 * 1024  # 25MB

def _validate(file: UploadFile, file_bytes: bytes):
    if file.content_type not in ALLOWED:
        raise HTTPException(400, "Unsupported file type")
    if len(file_bytes) > MAX_SIZE:
        raise HTTPException(400, "File too large (max 25MB)")


# ── Existing endpoint (audio only) ───────────────────
@router.post("/audio")
async def analyze_audio(file: UploadFile = File(...)):
    file_bytes = await file.read()
    _validate(file, file_bytes)
    return await run_audio_analysis(file_bytes)


# ── NEW: full multimodal endpoint ─────────────────────
@router.post("/audio/multimodal")
async def analyze_audio_multimodal(file: UploadFile = File(...)):
    """
    Audio → Wav2Vec2 (voice check)
           + Whisper (transcribe)
           + XLM-RoBERTa (text check)
           → Fusion → Final Verdict
    """
    file_bytes = await file.read()
    _validate(file, file_bytes)
    return await run_multimodal_analysis(file_bytes)