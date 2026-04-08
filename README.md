# DeepTrust

DeepTrust is an intelligent, real-time content authenticity platform that detects fake and manipulated media across four modalities: text, images, audio, and video.

## Backend
FastAPI server powered by HuggingFace inference API and local pipelines.
🪟 Windows
```bash
cd backend
python -m venv venv ( py -3.11 -m venv venv)
venv\Scripts\Activate
pip install -r requirements.txt
pip install transformers torch librosa
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```
🍎 macOS / 🐧 Linux
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

## Frontend
React + Vite application built with Tailwind CSS.

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
