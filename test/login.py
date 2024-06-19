import os
import warnings
import time

# Set environment variable to disable oneDNN optimizations and reduce TensorFlow logging verbosity
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# Suppress warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
warnings.filterwarnings('ignore', category=UserWarning)

# Import TensorFlow after setting environment variables
import tensorflow as tf
tf.get_logger().setLevel('ERROR')

import logging
import cv2
from deepface import DeepFace
import numpy as np
import json
import sys

# Set console encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

logging.getLogger('tensorflow').setLevel(logging.ERROR)

def euclidean_distance(source, test):
    return np.linalg.norm(np.array(source) - np.array(test))

def verify_face(image):
    try:
        current_face_encoding = DeepFace.represent(img_path=image, model_name='Facenet', enforce_detection=False)[0]["embedding"]
        match_results = []
        for filename in os.listdir('temp'):
            if filename.endswith("_face_encoding.json"):
                email = filename.split('_face_encoding.json')[0]
                with open(os.path.join('temp', filename), 'r') as f:
                    stored_face_encodings = json.load(f)
                for stored_face_encoding in stored_face_encodings:
                    distance = euclidean_distance(stored_face_encoding[0]["embedding"], current_face_encoding)
                    match_percentage = max(0, 100 * (1 - distance / np.linalg.norm(stored_face_encoding[0]["embedding"])))
                    match_results.append({"email": email, "match_percentage": match_percentage})
        best_match = max(match_results, key=lambda x: x["match_percentage"], default={"email": None, "match_percentage": 0})
        return best_match
    except Exception as e:
        print(f"Lỗi: {str(e)}", file=sys.stderr)
        return None

def capture_frames_from_webcam():
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Lỗi: Không thể mở webcam.", file=sys.stderr)
        return

    while True:
        ret, frame = cap.read()
        if ret:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                face_crop = frame[y:y+h, x:x+w]
                cv2.imwrite('temp/current_face.jpg', face_crop)
                result = verify_face('temp/current_face.jpg')
                if result and result['email']:
                    match_percentage = result['match_percentage']
                    email = result['email']
                    text = f"Email: {email}, {match_percentage:.2f}%"
                    cv2.putText(frame, text, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

                    for i in range(5, 0, -1):
                        ret, frame = cap.read()
                        if ret:
                            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                            cv2.putText(frame, text, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)
                            cv2.putText(frame, f"Nhận diện trong vòng: {i} giây", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                            cv2.imshow('Webcam', frame)
                            cv2.waitKey(1000)
                    cap.release()
                    cv2.destroyAllWindows()
                    return f"Match found: Email {email} with {match_percentage:.2f}% match."

            cv2.imshow('Webcam', frame)  # Show the frame in a window
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            print("Lỗi: Không thể đọc khung hình từ webcam.", file=sys.stderr)
            break
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    try:
        result = capture_frames_from_webcam()  # Call capture function
        if result:
            print(result)
    except Exception as e:
        print(f"Lỗi: {str(e)}", file=sys.stderr)
        sys.exit(1)
