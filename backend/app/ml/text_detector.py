from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# HuggingFace model path
MODEL_PATH = "Sayantan090/fake-news-detector"

# Load model once
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

model.eval()

def detect_fake_text(text: str) -> dict:
    try:
        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=128
        )

        with torch.no_grad():
            outputs = model(**inputs)

        probs = F.softmax(outputs.logits, dim=-1)

        fake_prob = probs[0][0].item()
        real_prob = probs[0][1].item()

        pred = torch.argmax(probs).item()
        confidence = probs[0][pred].item()

        label = "FAKE" if pred == 0 else "REAL"

        reason = (
            "Detected patterns of misinformation or exaggeration."
            if label == "FAKE"
            else "Content appears factual and consistent."
        )

        return {
            "label": label,
            "confidence": round(confidence * 100, 1),
            "reason": reason,
            "all_scores": {
                "FAKE": round(fake_prob * 100, 1),
                "REAL": round(real_prob * 100, 1)
            }
        }

    except Exception as e:
        return {
            "label": "ERROR",
            "confidence": 0,
            "reason": str(e),
            "all_scores": {}
        }