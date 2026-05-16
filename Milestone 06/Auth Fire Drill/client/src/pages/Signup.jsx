
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('reader');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signup', { email, password, role });
            login(res.data);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="glass-card auth-card">
                <h1 className="page-title gradient-text">
                    Fragments
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Email Address</label>
                        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
                    </div>
                    <div className="form-group">
                        <label className="label">Password</label>
                        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label className="label">Role Selection</label>
                        <select className="input select-input" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="reader">Reader</option>
                            <option value="contributor">Contributor</option>
                            <option value="curator">Curator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit">Sign Up</button>
                    <div className="auth-footer">
                        Already have an account? <Link to="/login" className="auth-link">Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
