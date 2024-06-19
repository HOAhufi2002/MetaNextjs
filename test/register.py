import os
import warnings

# Set environment variable to disable oneDNN optimizations and reduce TensorFlow logging verbosity
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# Suppress warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
warnings.filterwarnings('ignore', category=UserWarning)

# Import TensorFlow after setting environment variables
import tensorflow as tf
tf.get_logger().setLevel('ERROR')

import os
import logging
import cv2
from deepface import DeepFace
import json

logging.getLogger('tensorflow').setLevel(logging.ERROR)

# Function to register faces by extracting and saving their encodings
def register_face(images, user_id):
    try:
        face_encodings = []
        for image in images:
            # Extract face encoding using DeepFace
            face_encoding = DeepFace.represent(img_path=image, model_name='Facenet', enforce_detection=False)
            face_encodings.append(face_encoding)
        # Create a directory for saving the face encoding if it doesn't exist
        os.makedirs("temp", exist_ok=True)
        # Save the face encodings to a file
        with open(f"temp/{user_id}_face_encoding.json", 'w') as f:
            json.dump(face_encodings, f)
        print("Đăng ký khuôn mặt thành công!")  # Registration successful
    except ValueError as e:
        print(f"Lỗi: {str(e)}")  # Handle errors

def capture_frames_from_webcam(duration=10, frame_rate=20):
    cap = cv2.VideoCapture(0)  # Open the webcam
    if not cap.isOpened():
        print("Không thể mở webcam.")
        return []

    frames = []
    webcam_fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(webcam_fps / frame_rate)
    total_frames = frame_rate * duration
    frame_count = 0
    
    print(f"Webcam FPS: {webcam_fps}")
    print(f"Frame Interval: {frame_interval}")
    print(f"Total Frames to Capture: {total_frames}")
    
    while frame_count < total_frames:
        ret, frame = cap.read()
        if ret:
            cv2.imshow('Webcam', frame)  # Show the frame in a window
            if frame_count % frame_interval == 0:
                # Create a directory for saving frames if it doesn't exist
                os.makedirs("temp", exist_ok=True)
                frame_path = f"temp/{user_id}_frame_{len(frames)}.jpg"  # Save frames with user_id prefix
                cv2.imwrite(frame_path, frame)
                frames.append(frame_path)
                print(f"Saved Frame {len(frames)} at count {frame_count}")
            frame_count += 1
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break  # Exit loop if 'q' is pressed
        else:
            break
    cap.release()
    cv2.destroyAllWindows()
    print(f"Total Saved Frames: {len(frames)}")
    return frames

if __name__ == "__main__":
    user_id = input("Nhập User ID: ")  # Prompt user for User ID
    if user_id:
        print("Đang quay video từ webcam... Nhấn 'q' để dừng.")
        images = capture_frames_from_webcam()  # Capture frames from webcam
        if images:
            register_face(images, user_id)  # Register faces with the captured frames
        else:
            print("Không thể quay video hoặc không có khung hình nào được trích xuất.")
    else:
        print("Vui lòng nhập User ID.")  # Prompt user to enter User
