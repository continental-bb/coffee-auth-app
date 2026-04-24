// ✅ MAIN ENTRY POINT: Renders the React app with Router
// This is the ONLY place where <Router> should exist

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // ✅ Import Router here
import App from './App';
import './index.css';

// ✅ Render app with Router wrapping everything
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>  {/* ✅ SINGLE Router - wraps entire app */}
      <App />
    </Router>
  </React.StrictMode>
);