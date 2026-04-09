# C:\DeepTrust\backend\app\main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import audio, text, image, video
from app.ml.model_loader import start_background_loading, get_all_status
import os
import socket

# Globally attempt to configure socket parameters for faster reuse
import socketserver
socketserver.TCPServer.allow_reuse_address = True

app = FastAPI(
    title="DeepTrust API",
    description="Multilingual Multimodal Fake Detection",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    print("🚀 Server started quickly. Models loading in background...")
    start_background_loading()

@app.on_event("shutdown")
async def shutdown_event():
    print("🛑 Shutting down server and forcefully releasing port...")
    # Force kills the remaining threads (like the model loader) to unbind port 8000 instantly
    os._exit(0)

app.include_router(audio.router, prefix="/api/v1", tags=["Audio"])
app.include_router(text.router,  prefix="/api/v1", tags=["Text"])
app.include_router(image.router, prefix="/api/v1", tags=["Image"])
app.include_router(video.router, prefix="/api/v1", tags=["Video"])

@app.get("/health")
def health():
    return {"status": "ok", "version": "2.0.0"}

@app.get("/api/v1/status", tags=["Status"])
def get_status():
    st = get_all_status()
    loading = [model for model, status in st.items() if status in ["pending", "loading"]]
    loaded = [model for model, status in st.items() if status == "loaded"]
    
    # Simple estimation string based on loading queues
    est = "Ready" if not loading else "Estimated < 1-2 minutes"
    
    return {
        "loaded": loaded,
        "loading": loading,
        "estimated_ready_time": est,
        "details": st
    }