
import { useState, useEffect } from 'react';
import api from '../api/client';
import FragmentCard from '../components/FragmentCard';
import AddFragmentForm from '../components/AddFragmentForm';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';

const Story = () => {
    const { user } = useAuth();
    const [fragments, setFragments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFragments = async () => {
        try {
            const res = await api.get('/fragments');
            setFragments(res.data);
        } catch (err) {
            console.error('Failed to fetch', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFragments();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="content-container">
            <header className="top-header">
                <div>
                    <h1 className="page-title gradient-text" style={{ textAlign: 'left', fontSize: '3rem' }}>
                        Fragments
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontWeight: '500' }}>Collaborative Storytelling Platform</p>
                </div>
                <div className="user-info">
                    <div className="user-badge">
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase' }}>Logged in as</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: '700' }}>
                           {user?.email?.split('@')[0] || 'Anonymous'} <span className="user-role">{user?.role || 'Guest'}</span>
                        </p>
                    </div>
                    <LogoutButton />
                </div>
            </header>

            <div className="fragment-list">
                {fragments.length === 0 ? (
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-dim)' }}>No fragments yet. Be the first to contribute!</p>
                    </div>
                ) : (
                    fragments.map(f => (
                        <FragmentCard 
                            key={f.id} 
                            fragment={f} 
                            onUpdate={fetchFragments} 
                            onDelete={fetchFragments} 
                        />
                    ))
                )}
            </div>

            {user && (
                <div className="add-fragment-form">
                    <h2 className="section-title">Continue the Story</h2>
                    <AddFragmentForm onAdd={fetchFragments} parentId={fragments[fragments.length-1]?.id} />
                </div>
            )}
        </div>
    );
};

export default Story;
