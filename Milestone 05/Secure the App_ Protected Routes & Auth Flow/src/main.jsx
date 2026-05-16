import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
// import { AuthProvider } from './context/AuthContext' // BUG 1: AuthProvider import exists but is not used

/**
 * Main application entry point.
 * BUG 1: The AuthProvider is missing! Any component calling useAuth() will receive null.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ❌ BUG 1: AuthProvider should wrap <App /> but it is missing */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
