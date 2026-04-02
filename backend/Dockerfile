FROM python:3.11-slim

WORKDIR /app

# System deps for librosa + opencv
RUN apt-get update && apt-get install -y \
    libsndfile1 ffmpeg libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# HuggingFace cache goes to a writable directory
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_CACHE=/app/.cache/huggingface

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]
