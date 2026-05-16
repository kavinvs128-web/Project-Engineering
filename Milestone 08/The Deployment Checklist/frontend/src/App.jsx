import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>LaunchPad</h1>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {user.name} ({user.role})
              </span>
              <button 
                onClick={handleLogout} 
                style={{ backgroundColor: 'transparent', border: '1px solid #475569', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Products user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
