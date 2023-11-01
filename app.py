import cv2
from flask import Flask, request, jsonify
from PIL import Image
from tensorflow.keras.models import load_model

app = Flask(__name__)

@app.route('/', methods=['POST'])
def home():
    
    dim = 512
    def read_resize(img):
        re_img = cv2.resize(img, (dim, dim))
        return re_img

    image = request.files['image']
    image = Image.open(image)  
    
    
    img = read_resize(image)
    
    model = load_model('model.h5')
    output = model.predict(img)
    
    return jsonify({'predictions': output.tolist()})

if __name__=='__main__':
    app.run(debug=True, port=9000)