// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
