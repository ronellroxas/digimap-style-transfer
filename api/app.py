#server dependencies
from flask import Flask
from flask_cors import cross_origin
import base64

# model dependencies
from model import execute
from flask import request

#Server settings
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/execute", methods=['POST'])
@cross_origin()
def style_transfer():
    assert request.path == '/execute'
    assert request.method == 'POST'
    content_image_raw, style_image_raw = request.files["content_image"].read(), request.files["style_image"].read()
    
    output = execute(content_image_raw, style_image_raw)

    return {"output": base64.b64encode(output.getvalue()).decode()}, 200
    #return send_file(output, mimetype='image/PNG'), 200   #response, status code
