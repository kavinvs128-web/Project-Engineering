import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import GroupDetail from './components/GroupDetail';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div className="logo">StudyGroupHub</div>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            {!token ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <button 
                className="secondary" 
                style={{ width: 'auto', padding: '8px 16px' }} 
                onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <main className="animate-in">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/groups/:id" element={token ? <GroupDetail /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
