import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';

const MODEL_DIR = './style-transfer/model.json'

class StyleTransfer {
    /**
     * Loads the model asynchronously.
     */
    async load_model() {
        this.model = await loadGraphModel(MODEL_DIR);
    }

    /**
     * Applies the style of styleImage to targetImage
     * @param {*} styleImage The Image wherein the style will be copied from
     * @param {*} targetImage The Image wherein the style will be applied to
     * @param {*} canvas Target canvas to draw with
     */
    async execute(styleImage, targetImage) {
        if (styleImage == null) return
        if (targetImage == null) return
        
        //normalize images
        styleImage = this.normalize(styleImage);
        targetImage = this.normalize(targetImage);

        let result = this.model.execute([targetImage, styleImage]);
        return tf.squeeze(result);
    }

    /**
     * Normalizes image for the model input.
     * @param {*} image Image to normalize/format for model input
     */
    normalize(image) {
        return tf.tidy(() => {
            //convert the image data to a tensor 
            let tensor = tf.browser.fromPixels(image);
            //resize to 256 x 256
            //const resized = tf.image.resizeBilinear(tensor, [256, 256]).toFloat()
            //const resized = tensor;
            // Normalize the image 
            const offset = tf.scalar(255.0);
            const normalized = tensor.div(offset);
            //We add a dimension to get a batch shape 
            const batched = normalized.expandDims(0);
            return batched;
        })
    }
}

export default StyleTransfer;