import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StyleTransfer from './components/StyleTransfer';
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <>
        <Navbar></Navbar>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route exact path="/StyleTransfer"  element={<StyleTransfer />}/>
            </Routes>
        </Router>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();