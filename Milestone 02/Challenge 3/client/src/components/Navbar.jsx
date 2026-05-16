import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, CheckSquare, ListTodo } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-icon">
            <CheckSquare size={20} strokeWidth={3} />
          </div>
          <div className="logo-text">TaskNest</div>
        </NavLink>

        <div className="nav-menu">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Layout size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ListTodo size={18} />
            <span>Tasks</span>
          </NavLink>
        </div>

        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748b' }}>
            AR
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
