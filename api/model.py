from matplotlib import pyplot as plt
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import cv2
from PIL import Image
import io

def execute(content_image_raw=None, style_image_raw=None) -> io.BytesIO:
    '''
    Performs style transfer on the `content_image` given the `style_image`. Loads tensorflow model from tensorflow hub link, normalizes the image inputs to size 255, then performs style transfer.
    Source code retrieved from https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2.
    '''
    assert content_image_raw is not None and style_image_raw is not None, "Content_image and style image must be provided."

    content_image = np.fromstring(content_image_raw, np.uint8)
    style_image = np.fromstring(style_image_raw, np.uint8)
    
    # Load content and style images (see example in the attached colab).
    content_image = cv2.imdecode(content_image, cv2.IMREAD_COLOR)
    style_image = cv2.imdecode(style_image, cv2.IMREAD_COLOR)

    # Convert to float32 numpy array, add batch dimension, and normalize to range [0, 1]. Example using numpy:
    content_image = content_image.astype(np.float32)[np.newaxis, ...] / 255.
    style_image = style_image.astype(np.float32)[np.newaxis, ...] / 255.
    
    
    # Optionally resize the images. It is recommended that the style image is about
    # 256 pixels (this size was used when training the style transfer network).
    # The content image can be any size.
    style_image = tf.image.resize(style_image, (256, 256))

    # Load image stylization module.
    hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    # Stylize image.
    outputs = hub_module(tf.constant(content_image), tf.constant(style_image))
    output = outputs[0].numpy()[0] * 255

    # with tf.compat.v1.Session() as sess:
    #     tf.compat.v1.global_variables_initializer().run()
    #     o = sess.run(output)
    #     o = np.add(o, 0)
    #     output = o

    # Output numpy to image object
    output_img = Image.fromarray(output.astype('uint8'), 'RGB')
        # create file-object in memory
    file_object = io.BytesIO()

    # write PNG in file-object
    output_img.save(file_object, 'PNG')

    # move to beginning of file so `send_file()` it will read from start    
    file_object.seek(0)

    return file_object

