# import os

# def cleanup_temp_file(file_path: str):
#     """
#     Deletes the temporary file after processing.
#     Intended to be used as a FastAPI BackgroundTask to avoid blocking the HTTP response.
#     """
#     try:
#         if os.path.exists(file_path):
#             os.remove(file_path)
#     except Exception as e:
#         print(f"Failed to cleanup temp file {file_path}: {e}")
# C:\DeepTrust\backend\app\utils\file_handler.py

import os
import logging

logger = logging.getLogger(__name__)


def cleanup_temp_file(path: str) -> None:
    """
    Safely delete a temporary file.
    Called as a FastAPI BackgroundTask — must never raise.
    """
    if not path:
        return
    try:
        if os.path.exists(path):
            os.remove(path)
            logger.debug("[FILE] Cleaned up temp file: %s", path)
    except Exception as exc:
        logger.warning("[FILE] Could not delete temp file %s: %s", path, exc)