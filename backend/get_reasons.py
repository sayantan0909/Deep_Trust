import sys
import os
import io
import requests
import base64
import wave

sys.path.append(os.getcwd())

from app.ml.text_detector import detect_fake_text
from app.ml.image_detector import detect_fake_image
from app.ml.audio_detector import detect_fake_audio

def create_dummy_audio_wav():
    output = io.BytesIO()
    with wave.open(output, 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(16000)
        wav.writeframes(b'\x00' * 32000)
    return output.getvalue()

def create_dummy_image_png():
    return base64.b64decode(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    )

def main():
    print("Testing TEXT:")
    try:
        res = detect_fake_text("Sample")
        print(f"TEXT Label: {res.get('label')}")
        if res.get('label') == 'ERROR': print(f"TEXT Error: {res.get('reason')}")
    except Exception as e: print(f"TEXT Crash: {e}")

    print("\nTesting IMAGE:")
    try:
        res = detect_fake_image(create_dummy_image_png())
        print(f"IMAGE Label: {res.get('label')}")
        if res.get('label') == 'ERROR': print(f"IMAGE Error: {res.get('reason')}")
    except Exception as e: print(f"IMAGE Crash: {e}")

    print("\nTesting AUDIO:")
    try:
        res = detect_fake_audio(create_dummy_audio_wav())
        print(f"AUDIO Label: {res.get('label')}")
        if res.get('label') == 'ERROR': print(f"AUDIO Error: {res.get('reason')}")
    except Exception as e: print(f"AUDIO Crash: {e}")

if __name__ == "__main__":
    main()
