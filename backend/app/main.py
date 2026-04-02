from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import text, image, audio, video
from app.ml.model_loader import load_all_models

app = FastAPI(title="Misinformation Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten this after hackathon
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    load_all_models()   # load audio model once when server starts

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(text.router,  prefix="/analyze")
app.include_router(image.router, prefix="/analyze")
app.include_router(audio.router, prefix="/analyze")
app.include_router(video.router, prefix="/analyze")
