import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import React from 'react';
import CreateItem from './routes/CreateItem';
import ViewItems from './routes/ViewItems';
import Login from './routes/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const toRender =     
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>


const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(toRender);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
