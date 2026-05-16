import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Productivity Dash</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks & Notes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
