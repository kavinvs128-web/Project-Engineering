
import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const AddFragmentForm = ({ onAdd, parentId }) => {
    const { role } = useAuth();
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/fragments', { content, parentId });
            onAdd();
            setContent('');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed');
        }
    };

    // BROKEN PART 3: UI driven by mutable role from context/localStorage
    const canAdd = role === 'admin' || role === 'curator' || role === 'contributor';

    if (!canAdd) return null;

    return (
        <form onSubmit={handleSubmit} className="glass-card add-card">
            <h3 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Share your continuation</h3>
            <div className="form-group">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input"
                    style={{ minHeight: '150px', resize: 'none', fontSize: '1.1rem' }}
                    placeholder="Where does the story go next?"
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                style={{ width: 'auto' }}
            >
                Submit Fragment
            </button>
        </form>
    );
};

export default AddFragmentForm;
