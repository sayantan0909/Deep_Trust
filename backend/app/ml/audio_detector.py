import numpy as np
import soundfile as sf
import librosa
import io
from app.ml.model_loader import get_model

def detect_fake_audio(file_bytes: bytes) -> dict:
    """
    Runs locally loaded Wav2Vec2 deepfake audio detector.
    Pipeline: raw bytes → resample to 16kHz → model → label + score
    """
    # Load audio from bytes (supports .wav, .mp3, .flac)
    audio_array, sample_rate = sf.read(io.BytesIO(file_bytes))

    # Ensure mono channel
    if audio_array.ndim > 1:
        audio_array = audio_array.mean(axis=1)

    # Resample to 16000Hz (model requirement)
    if sample_rate != 16000:
        audio_array = librosa.resample(audio_array, orig_sr=sample_rate, target_sr=16000)

    # Run through locally loaded pipeline
    model = get_model("audio")
    results = model({"raw": audio_array, "sampling_rate": 16000}, top_k=2)

    top = results[0]
    label = "FAKE" if "fake" in top["label"].lower() or "spoof" in top["label"].lower() else "REAL"

    return {
        "label": label,
        "confidence": round(top["score"] * 100, 1),
        "reason": f"Audio classified as {label} based on voice pattern analysis",
        "all_scores": {r["label"]: round(r["score"]*100, 1) for r in results}
    }
