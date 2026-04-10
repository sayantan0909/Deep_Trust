FROM python:3.11-slim

WORKDIR /app

# System deps for librosa + opencv
# --no-install-recommends keeps the image slim
# The cache-busting ARG forces a fresh apt-get update on every build
ARG CACHEBUST=1
RUN apt-get update --fix-missing && apt-get install -y --no-install-recommends \
    libsndfile1 \
    ffmpeg \
    libgl1 \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_CACHE=/app/.cache/huggingface

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]