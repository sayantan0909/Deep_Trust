import os

def cleanup_temp_file(file_path: str):
    """
    Deletes the temporary file after processing.
    Intended to be used as a FastAPI BackgroundTask to avoid blocking the HTTP response.
    """
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Failed to cleanup temp file {file_path}: {e}")
