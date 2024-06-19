import os
import warnings
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore', category=DeprecationWarning)
warnings.filterwarnings('ignore', category=UserWarning)
import base64
import json
import logging
from deepface import DeepFace
import cv2
import numpy as np
import tensorflow as tf
tf.get_logger().setLevel('ERROR')

logging.getLogger('tensorflow').setLevel(logging.ERROR)

def decode_base64_to_image(base64_string):
    img_bytes = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

def register_face(images, email):
    try:
        face_encodings = []
        for image in images:
            face_encoding = DeepFace.represent(img_path=image, model_name='Facenet', enforce_detection=False)
            face_encodings.append(face_encoding)
        os.makedirs("temp", exist_ok=True)
        user_dir = os.path.join("temp", email)
        os.makedirs(user_dir, exist_ok=True)
        with open(f"{user_dir}/{email}_face_encoding.json", 'w') as f:
            json.dump(face_encodings, f)
        print("Đăng ký khuôn mặt thành công!")  
    except ValueError as e:
        print(f"Lỗi: {str(e)}")  

def load_images_from_json(json_file, email):
    with open(json_file, 'r') as f:
        base64_images = json.load(f)
    
    images = []
    user_dir = os.path.join("temp", email)
    os.makedirs(user_dir, exist_ok=True)
    for item in base64_images:
        img = decode_base64_to_image(item['base64'])
        image_path = os.path.join(user_dir, item['filename'])
        cv2.imwrite(image_path, img)
        images.append(image_path)
    return images

if __name__ == "__main__":
    email = input("Nhập Email: ")  
    if email:
        json_file = input("Nhập đường dẫn đến file JSON: ") 
        if json_file:
            images = load_images_from_json(json_file, email) 
            if images:
                register_face(images, email) 
            else:
                print("Không thể tải ảnh từ file JSON hoặc không có ảnh nào được trích xuất.")
        else:
            print("Vui lòng nhập đường dẫn đến file JSON.")  
    else:
        print("Vui lòng nhập Email.")  
