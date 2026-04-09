# C:\DeepTrust\backend\app\ml\whisper_transcriber.py

import tempfile, os, io
import numpy as np
import soundfile as sf
import librosa
from app.ml.model_loader import get_model

LANGUAGE_MAP = {
    "bn": "Bengali",
    "hi": "Hindi",
    "en": "English",
}

def transcribe_audio(file_bytes: bytes) -> dict:
    # Load audio
    audio_array, sample_rate = sf.read(io.BytesIO(file_bytes))

    if audio_array.ndim > 1:
        audio_array = audio_array.mean(axis=1)

    if sample_rate != 16000:
        audio_array = librosa.resample(
            audio_array, orig_sr=sample_rate, target_sr=16000
        )

    # Write to temp file (Whisper needs file path)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        sf.write(tmp.name, audio_array, 16000)
        tmp_path = tmp.name

    try:
        whisper_model = get_model("whisper")
        result = whisper_model.transcribe(tmp_path, task="transcribe")
        lang_code = result.get("language", "unknown")

        return {
            "transcript":     result["text"].strip(),
            "language_code":  lang_code,
            "language_name":  LANGUAGE_MAP.get(lang_code, lang_code.upper()),
            "success":        True
        }

    except Exception as e:
        return {
            "transcript":    "",
            "language_code": "unknown",
            "language_name": "Unknown",
            "success":       False,
            "error":         str(e)
        }
    finally:
        os.unlink(tmp_path)