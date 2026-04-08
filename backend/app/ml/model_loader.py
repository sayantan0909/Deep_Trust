# C:\DeepTrust\backend\app\ml\model_loader.py
# Only Whisper is loaded locally; text + audio now call HuggingFace Inference API.

import whisper
import threading

_models = {}
_status = {
    "whisper": "pending"
}
_locks = {
    "whisper": threading.Lock()
}

def start_background_loading():
    """Called on startup to pre-load Whisper in the background."""
    def _loader():
        try:
            get_model("whisper")
        except Exception as e:
            print(f"[ModelLoader] Fatal background load error: {e}")

    thread = threading.Thread(target=_loader, daemon=True)
    thread.start()

def get_all_status():
    return _status

def get_model(model_type: str):
    if model_type not in _locks:
        raise ValueError(f"Unknown model type: {model_type}")

    # If already loaded, return fast
    if _status[model_type] == "loaded":
        return _models[model_type]

    # Wait for lock (lazy initialization thread safety)
    with _locks[model_type]:
        # Check again in case another thread loaded it while we waited
        if _status[model_type] == "loaded":
            return _models[model_type]
        
        _status[model_type] = "loading"
        try:
            _models[model_type] = _load_sync(model_type)
            _status[model_type] = "loaded"
            return _models[model_type]
        except Exception as e:
            _status[model_type] = "failed"
            print(f"[ModelLoader] Failed loading {model_type}: {e}")
            raise e

def _load_sync(model_type: str):
    print(f"[ModelLoader] Loading: {model_type}")

    if model_type == "whisper":
        WHISPER_MODEL_SIZE = "base"  # change here when needed
        return whisper.load_model(WHISPER_MODEL_SIZE)

    raise ValueError(f"Unknown model type: {model_type}")