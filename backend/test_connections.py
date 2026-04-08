import sys
import os
import io
import requests
import base64
import wave

# Ensure we're in the right dir to import app
sys.path.append(os.getcwd())

# Use current environment for loading
from app.ml.text_detector import detect_fake_text
from app.ml.image_detector import detect_fake_image
from app.ml.audio_detector import detect_fake_audio

def create_dummy_audio_wav():
    """Create 1 second of silence as WAV bytes."""
    output = io.BytesIO()
    with wave.open(output, 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(16000)
        wav.writeframes(b'\x00' * 32000)
    return output.getvalue()

def create_dummy_image_png():
    """Create a tiny 1x1 white pixel PNG as bytes."""
    return base64.b64decode(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    )

def main():
    print("Starting Connectivity Tests for DeepTrust Models...")

    # --- 1. TEST TEXT MODEL ---
    print("\n--- Testing TEXT MODEL (Sayantan090/fake-news-detector) ---")
    try:
        text_result = detect_fake_text("Breaking news: Scientists discover that water is wet.")
        print(f"TEXT MODEL Result: {text_result}")
    except Exception as e:
        print(f"TEXT MODEL crashed: {e}")

    # --- 2. TEST IMAGE MODEL ---
    print("\n--- Testing IMAGE MODEL (raktik-deepfake-detector-image Space) ---")
    try:
        img_bytes = create_dummy_image_png()
        img_result = detect_fake_image(img_bytes)
        print(f"IMAGE MODEL Result: {img_result}")
    except Exception as e:
        print(f"IMAGE MODEL crashed: {e}")

    # --- 3. TEST AUDIO MODEL ---
    print("\n--- Testing AUDIO MODEL (Sayantan090/audio-fake-detector) ---")
    try:
        aud_bytes = create_dummy_audio_wav()
        aud_result = detect_fake_audio(aud_bytes)
        print(f"AUDIO MODEL Result: {aud_result}")
    except Exception as e:
        print(f"AUDIO MODEL crashed: {e}")

if __name__ == "__main__":
    main()
