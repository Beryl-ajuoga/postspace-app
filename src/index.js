import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Routes from './Routes';
import App from './App.js';
import Routes from './components/Routes';


ReactDOM.render(
  <React.StrictMode>
    <Routes /> 
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);










