from dotenv import load_dotenv
import os

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")          # your HuggingFace token
HF_HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# # HuggingFace model endpoints
# TEXT_MODEL_URL  = "https://api-inference.huggingface.co/models/hamzab/roberta-fake-news-classification"
# IMAGE_MODEL_URL = "https://api-inference.huggingface.co/models/dima806/deepfake_vs_real_image_detection"

# # For audio we load locally — this is the HuggingFace model ID
# AUDIO_MODEL_ID  = "facebook/wav2vec2-base"     # swap with fine-tuned when ready

# YOUR HuggingFace models (Note: Inference API must be enabled on HF for these)
TEXT_MODEL_URL  = "https://api-inference.huggingface.co/models/Sayantan090/fake-news-detector"
AUDIO_MODEL_URL = "https://sayantan090-audio-deepfake-detector.hf.space/gradio_api/call/predict"

# YOUR deployed Space API (Gradio 4+)
IMAGE_MODEL_URL = "https://raktik-deepfake-detector-image.hf.space/gradio_api/call/predict"
