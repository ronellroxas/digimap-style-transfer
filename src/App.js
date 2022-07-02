import {useState} from 'react'
import './App.css';
import axios from 'axios';
import {Buffer} from 'buffer';

function App() {
    const STYLE_IMAGE_ID = "style-image";
    const CONTENT_IMAGE_ID = "content-image";
    const OUTPUT_IMAGE_ID = "output-image";

    // raw image files for API
    const [styleImage, setStyleImage] = useState(null);
    const [contentImage, setContentImage] = useState(null);
    

    // URL image for UI preview
    const [styleURL, setStyleURL] = useState(null);
    const [contentURL, setContentURL] = useState(null);
    const [outputURL, setOutputURL] = useState(null);
    
    const updateStyleImage = (e) => {
      console.log('style image updated');
      const [file] = e.target.files;
      setStyleImage(file);
      setStyleURL(URL.createObjectURL(file));
    }

    const updateContentImage = (e) => {
      console.log('content image updated');
      const [file] = e.target.files;
      setContentImage(file);
      setContentURL(URL.createObjectURL(file));

    }

    const submitForm = (e) => {
      e.preventDefault();
      let formData = new FormData();

      // build form
      formData.append('content_image', contentImage);
      formData.append('style_image', styleImage);

      // call API
      axios.post('http://localhost:5000/execute', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(response => {
        setOutputURL('data:image/png;base64,' + response.data.output);
        
      });
    }

    return ( 
      <>
        <form id="ImageForm" onSubmit={submitForm}>
          <input id={CONTENT_IMAGE_ID + "-input"} type="file" onChange={updateContentImage}/>
          <input id={STYLE_IMAGE_ID + "-input"} type="file" onChange={updateStyleImage}/>
          <input type="submit" value="Execute" disabled={!styleImage || !contentImage}/>
        </form>
        <img id={CONTENT_IMAGE_ID} src={contentURL} alt="Content Display" width="500px" height="500px"/>
        <img id={STYLE_IMAGE_ID} src={styleURL} alt="Style Display" width="500px" height="500px"/>
        <img id={OUTPUT_IMAGE_ID} src={outputURL} alt="Output Display" width="500px" height="500px"/>
      </>

    );
}

export default App;