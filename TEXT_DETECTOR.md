# 🧠 DeepTrust — Multilingual Fake News Detection System (Text Classifier)

## 🚀 Overview

DeepTrust is an AI-powered fake news detection system designed to identify misinformation across **Bengali, Banglish, Hindi, and English** text.

The system leverages a fine-tuned multilingual transformer model to classify text as:

* ✅ REAL (factual information)
* ❌ FAKE (misleading, exaggerated, or rumor-based content)

---

## 🎯 Key Features

* 🌍 Multilingual support (Bengali, Hindi, English, Banglish)
* 🧠 Transformer-based NLP model
* ⚡ Real-time inference via FastAPI
* 📊 Confidence scoring + explanation
* 🔁 Iterative model improvement pipeline

---

## 🧠 Model Architecture

We use:

👉 XLM-RoBERTa

### Why XLM-R?

* Pretrained on **100+ languages**
* Strong performance on **low-resource languages (Bengali)**
* Handles **code-mixed language (Banglish)** effectively

---

## 📚 Pretrained Model

Base model:

```text
xlm-roberta-base
```

Source:

* Pretrained by Facebook AI
* Trained on CommonCrawl multilingual corpus

---

## 🏋️ Training Process

### 1. Dataset Construction

We created a **custom dataset** focused on:

#### 📍 Regions:

* West Bengal (Kolkata + districts)
* India (national context)

#### 🧾 Content Types:

* Political news
* Government schemes
* Cyclone / weather alerts
* Education updates
* Viral rumors / misinformation

---

### 🌐 Language Distribution

* 40% Banglish
* 30% Bengali
* 20% English
* 10% Hindi

---

### 🧪 Labeling Strategy

| Label | Meaning                               |
| ----- | ------------------------------------- |
| 1     | REAL (news-like, factual)             |
| 0     | FAKE (rumor, exaggerated, misleading) |

---

### ⚠️ Fake News Patterns Included

* “গোপনে”, “secretly”, “media hiding”
* “share urgently”
* miracle claims (health, government)
* hidden decisions / conspiracy tone

---

## ⚙️ Training Details

* Model: `xlm-roberta-base`
* Task: Sequence Classification
* Epochs: 4
* Batch Size: 16
* Learning Rate: 2e-5
* Max Length: 128

---

## 📊 Performance

| Metric   | Score  |
| -------- | ------ |
| Accuracy | ~89.7% |
| F1 Score | ~0.89  |

---

## 🧠 Limitations

* Struggles with **short, low-context sentences**
* Sensitive to **subtle misinformation without strong patterns**
* Requires more data for **fine-grained Bengali rumors**

---

## 🔁 Model Improvement Strategy

* Add more **short fake sentences**
* Increase **Bengali rumor dataset**
* Introduce **hybrid rule-based detection**
* Iterative retraining and versioning

---

## 🌍 Model Hosting

Model is hosted on:

👉 Hugging Face

Example:

```text
Sayantan090/fake-news-detector
```

---

## 🧩 Backend Integration

The model is integrated using:

* FastAPI backend
* HuggingFace Transformers

### Inference Flow

```text
User Input → API → Model → Prediction → Response
```

---

## 📡 API Example

### Request

```json
{
  "text": "সরকার এই খবর গোপন রেখেছে, সবাই দ্রুত শেয়ার করুন"
}
```

### Response

```json
{
  "verdict": "FAKE",
  "confidence": 97.7,
  "reason": "Detected patterns of misinformation or exaggeration.",
  "is_fake": true
}
```

---

## 🛠 Tech Stack

* Python
* FastAPI
* Transformers (HuggingFace)
* PyTorch
* Google Colab (training)

---

## 🔮 Future Improvements

* Image + text multimodal detection
* Metadata + watermark analysis
* Real-time misinformation tracking
* Social media integration

---

## 👨💻 Author

Developed as part of a hackathon project focused on combating misinformation using AI.

---

## 🏁 Conclusion

DeepTrust demonstrates how multilingual transformer models can be effectively adapted to detect misinformation in region-specific and code-mixed contexts.

---

⚡ “From local data to global intelligence.”
