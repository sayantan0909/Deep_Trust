import torch
import librosa
import tempfile
import os
from transformers import AutoModelForAudioClassification, AutoFeatureExtractor

model_name = "Sayantan090/wav2vec2-deepfake-voice-detector"

model = AutoModelForAudioClassification.from_pretrained(model_name)
feature_extractor = AutoFeatureExtractor.from_pretrained(model_name)

model.eval()

def detect_fake_audio(file_bytes: bytes) -> dict:
    try:
        # ✅ create temp file WITHOUT lock
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            tmp.write(file_bytes)
            temp_path = tmp.name

        # ✅ now load safely
        audio, sr = librosa.load(temp_path, sr=16000)

        # cleanup (VERY IMPORTANT)
        os.remove(temp_path)

        inputs = feature_extractor(
            audio,
            sampling_rate=16000,
            return_tensors="pt",
            padding=True
        )

        with torch.no_grad():
            outputs = model(**inputs)
            probs = torch.nn.functional.softmax(outputs.logits, dim=-1)

        real_score = probs[0][0].item()
        fake_score = probs[0][1].item()

        label = "FAKE" if fake_score > real_score else "REAL"

        return {
            "label": label,
            "confidence": round(max(fake_score, real_score) * 100, 1),
            "fake_score": round(fake_score, 4),
            "real_score": round(real_score, 4),
            "reason": f"Voice pattern analysis detected {label} audio",
            "all_scores": {
                "FAKE": round(fake_score * 100, 1),
                "REAL": round(real_score * 100, 1)
            }
        }

    except Exception as e:
        return {
            "label": "ERROR",
            "confidence": 0,
            "fake_score": 0.0,
            "real_score": 0.0,
            "reason": str(e),
            "all_scores": {}
        }