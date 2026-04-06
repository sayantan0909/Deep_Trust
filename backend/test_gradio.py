import requests
import base64
import time

def test_gradio_api():
    url_base = "https://raktik-deepfake-detector-image.hf.space"
    
    # Tiny 1x1 image
    img_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    data_uri = f"data:image/jpeg;base64,{img_b64}"
    
    print(f"Testing {url_base} ...")

    # Try 1: /api/predict (Simple POST)
    print("\nTrying /api/predict ...")
    try:
        resp = requests.post(f"{url_base}/api/predict", json={"data": [data_uri]}, timeout=10)
        print(f"Status: {resp.status_code}")
        print(f"Content-Type: {resp.headers.get('Content-Type')}")
        if 'application/json' in resp.headers.get('Content-Type', ''):
            print(f"Success! {resp.json()}")
        else:
            print("Response is not JSON.")
    except Exception as e:
        print(f"Error: {e}")

    # Try 2: /gradio_api/call/predict (New Gradio v4+)
    print("\nTrying /gradio_api/call/predict ...")
    try:
        # Step A: POST to call
        resp = requests.post(f"{url_base}/gradio_api/call/predict", json={"data": [data_uri]}, timeout=10)
        print(f"Call Status: {resp.status_code}")
        if resp.status_code == 200:
            event_id = resp.json().get("event_id")
            print(f"Event ID: {event_id}")
            # Step B: GET results (or wait)
            # For simplicity, we just check if it gave us an event ID
            time.sleep(1)
            res_get = requests.get(f"{url_base}/gradio_api/call/predict/{event_id}", timeout=10)
            print(f"Wait Status: {res_get.status_code}")
            print(f"Result: {res_get.text[:200]}...")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_gradio_api()
