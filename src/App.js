import { useEffect, useState } from 'react';
import './App.css';
import StyleTransfer from './style_transfer/Model';
import {browser, engine} from '@tensorflow/tfjs';

function App() {
    
    const [model, setModel] = useState(null);
    
    useEffect(() => {
      if (model == null) {
        
        //setup webgl
        let setup = async () => {
          let style_model = new StyleTransfer();
          await style_model.setup()
          setModel(style_model);
        }
        
        setup();
      }
    }, [model]);

    // perform style transfer
    const transfer = () => {  
      let execute = async () => {
        engine().startScope();
        let result = await model.execute(document.getElementById('styleImage'), document.getElementById('targetImage'));
        await browser.toPixels(result, document.getElementById('outputImage'));
        engine().endScope();
      }

      execute();
    }

    return ( 
      <div>
        <img id='styleImage' src='./pixel_art.png' width="500px" height="500px" alt="Style"/>
        <img id='targetImage' src='./dlsu_image.jpg' width="500px" height="500px" alt="Target"/>
        <button onClick={() => transfer()} disabled={!model}>Transfer</button>
        <canvas id='outputImage'  width="500px" height="500px"/>
      </div>
    );
}

export default App;