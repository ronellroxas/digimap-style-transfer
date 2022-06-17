import { useEffect, useState } from 'react';
import './App.css';
import StyleTransfer from './style_transfer/Model';
import {browser} from '@tensorflow/tfjs';

function App() {
    
    const [model, setModel] = useState(null);
    
    useEffect(() => {
      if (model == null) {
        
        //load tensorflow model using tfjs
        let load_model = async () => {
          let style_model = new StyleTransfer();
          await style_model.load_model()
          setModel(style_model);
        }
        
        load_model();
      }
    }, [model]);

    // perform style transfer
    const transfer = () => {  
      let execute = async () => {
        let result = await model.execute(document.getElementById('styleImage'), document.getElementById('targetImage'));
        await browser.toPixels(result, document.getElementById('outputImage'));

      }

      execute();
    }

    return ( 
      <div>
        <img id='styleImage' src='./Tsunami_by_hokusai_19th_century.jpg' width="500px" height="500px" alt="Style"/>
        <img id='targetImage' src='./dlsu_image.jpg' width="500px" height="500px" alt="Target"/>
        <button onClick={() => transfer()} disabled={!model}>Transfer</button>
        <canvas id='outputImage'  width="500px" height="500px"/>
      </div>
    );
}

export default App;