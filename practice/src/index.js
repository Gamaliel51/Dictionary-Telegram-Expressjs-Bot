import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

function dorender(){
  const elem = (
    <App/>
  )
  root.render(elem)
}

setInterval(dorender, 1000)