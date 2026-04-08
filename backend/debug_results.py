import sys
import os
import io
import requests
import base64
import wave
import json

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
    return base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==")

def main():
    results = {}
    
    print("Testing Text...")
    results['text'] = detect_fake_text("Test string")
    
    print("Testing Image...")
    results['image'] = detect_fake_image(create_dummy_image_png())
    
    print("Testing Audio...")
    results['audio'] = detect_fake_audio(create_dummy_audio_wav())
    
    with open('test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    print("Done. Saved to test_results.json")

if __name__ == "__main__":
    main()
