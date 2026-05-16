
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // BROKEN PART 6: Only frontend logic, no server-side invalidation
        logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-outline" style={{ width: 'auto', padding: '0.5rem 1.25rem' }}>
            Logout
        </button>
    );
};

export default LogoutButton;
