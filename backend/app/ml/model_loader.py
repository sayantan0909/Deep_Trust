# This module holds the loaded models in memory so they're not reloaded per request
_models = {}

def load_all_models():
    """Called once at server startup. Loads heavy models into RAM."""
    print("Loading audio model...")
    from transformers import pipeline
    _models["audio"] = pipeline(
        "audio-classification",
        model="motheecreator/Deepfake-audio-detection",  # ~400MB, downloads once
        device=-1   # -1 = CPU (Render free tier has no GPU)
    )
    print("All models loaded.")

def get_model(name: str):
    return _models.get(name)
