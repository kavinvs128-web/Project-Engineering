import React, { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signup', formData);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="card w-full max-w-md p-8 shadow-xl">
                 <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <UserPlus className="text-blue-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                    <p className="mt-2 text-slate-500">Join our community and manage events effortlessly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="input-field" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="you@example.com" 
                            className="input-field" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="input-field" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3 h-12 shadow-md hover:shadow-lg mt-6">
                        Create Account
                    </button>
                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-600">
                            Already have an account? 
                            <Link to="/login" className="text-blue-600 font-semibold ml-1 hover:underline underline-offset-4">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
