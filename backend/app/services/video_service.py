# # C:\DeepTrust\backend\app\services\video_service.py

import asyncio
import logging
from functools import partial
from app.ml.video_detector import detect_fake_video

logger = logging.getLogger(__name__)


async def run_video_analysis(tmp_path: str) -> dict:
    """
    Runs detect_fake_video in a thread-pool executor so FastAPI's event loop
    is never blocked during the (potentially long) CV + model inference work.
    Returns the raw structured dict from detect_fake_video directly — it already
    conforms to the full API response contract.
    """
    loop = asyncio.get_event_loop()

    logger.info("[VIDEO SERVICE] Dispatching analysis for: %s", tmp_path)
    result = await loop.run_in_executor(
        None, partial(detect_fake_video, tmp_path)
    )
    logger.info(
        "[VIDEO SERVICE] Completed. verdict=%s confidence=%.1f",
        result.get("final_prediction"), result.get("confidence", 0),
    )
    return result