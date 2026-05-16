
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
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
                    <button className="btn btn-primary" type="submit">Log In</button>
                    <div className="auth-footer">
                        No account? <Link to="/signup" className="auth-link">Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
