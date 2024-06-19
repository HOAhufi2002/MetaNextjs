import os
import warnings
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore', category=DeprecationWarning)
warnings.filterwarnings('ignore', category=UserWarning)

import tensorflow as tf
tf.get_logger().setLevel('ERROR')
import base64
import json
import logging
from deepface import DeepFace
import numpy as np
import sys
import cv2
logging.getLogger('tensorflow').setLevel(logging.ERROR)

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def euclidean_distance(source, test):
    return np.linalg.norm(np.array(source) - np.array(test))

def decode_base64_to_image(base64_string):
    img_bytes = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

def verify_face(image):
    try:
        current_face_encoding = DeepFace.represent(img_path=image, model_name='Facenet', enforce_detection=False)[0]["embedding"]
        match_results = []
        for root, dirs, files in os.walk('temp'):
            for file in files:
                if file.endswith("_face_encoding.json"):
                    user_id = file.split('_face_encoding.json')[0]
                    with open(os.path.join(root, file), 'r') as f:
                        stored_face_encodings = json.load(f)
                    for stored_face_encoding in stored_face_encodings:
                        distance = euclidean_distance(stored_face_encoding[0]["embedding"], current_face_encoding)
                        match_percentage = max(0, 100 * (1 - distance / np.linalg.norm(stored_face_encoding[0]["embedding"])))
                        match_results.append({"user_id": user_id, "match_percentage": match_percentage})
        best_match = max(match_results, key=lambda x: x["match_percentage"], default={"user_id": None, "match_percentage": 0})
        return best_match
    except Exception as e:
        print(f"Lỗi: {str(e)}", file=sys.stderr)
        return None

if __name__ == "__main__":
    try:
        json_file = input("Nhập đường dẫn đến file JSON chứa base64: ")  # Prompt user for JSON file path
        if os.path.exists(json_file):
            with open(json_file, 'r') as f:
                base64_data = json.load(f)
                base64_string = base64_data['base64']
                image = decode_base64_to_image(base64_string)
                temp_image_path = 'temp/current_face.jpg'
                cv2.imwrite(temp_image_path, image)
                result = verify_face(temp_image_path)
                if result and result['user_id']:
                    print(f"User ID: {result['user_id']}, Match Percentage: {result['match_percentage']:.2f}%")
                else:
                    print("Không tìm thấy khuôn mặt phù hợp.")
        else:
            print("Đường dẫn file JSON không tồn tại.", file=sys.stderr)
    except Exception as e:
        print(f"Lỗi: {str(e)}", file=sys.stderr)
        sys.exit(1)
