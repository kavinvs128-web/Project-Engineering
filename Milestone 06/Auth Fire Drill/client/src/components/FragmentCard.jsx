
import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const FragmentCard = ({ fragment, onUpdate, onDelete }) => {
    const { user, role } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(fragment.content);

    const handleUpdate = async () => {
        try {
            await api.put(`/fragments/${fragment.id}`, { content: editContent });
            onUpdate();
            setIsEditing(false);
        } catch (err) { alert(err.response?.data?.error || 'Failed'); }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/fragments/${fragment.id}`);
            onDelete();
        } catch (err) { alert(err.response?.data?.error || 'Failed'); }
    };

    const handleApprove = async () => {
        try {
            await api.post(`/fragments/${fragment.id}/approve`);
            onUpdate();
        } catch (err) { alert(err.response?.data?.error || 'Failed'); }
    };

    // BROKEN PART 3: UI driven by mutable role from context/localStorage
    const canEdit = role === 'admin' || role === 'curator' || (role === 'contributor' && fragment.userId === user?.id);
    const canDelete = role === 'admin';
    const canApprove = (role === 'admin' || role === 'curator') && fragment.status !== 'published';

    return (
        <div className="glass-card fragment-card">
            <div className="fragment-header">
                <div className="author-meta">
                    <div className="avatar">
                        {fragment.author[0].toUpperCase()}
                    </div>
                    <div>
                        <p className="author-name">{fragment.author}</p>
                        <span className="fragment-status">
                            {fragment.status}
                        </span>
                    </div>
                </div>
                <div className="fragment-actions">
                    {canEdit && !isEditing && (
                        <button onClick={() => setIsEditing(true)} className="action-btn edit">
                            Edit
                        </button>
                    )}
                    {canApprove && (
                        <button onClick={handleApprove} className="action-btn approve">
                            Approve
                        </button>
                    )}
                    {canDelete && (
                        <button onClick={handleDelete} className="action-btn delete">
                            Delete
                        </button>
                    )}
                </div>
            </div>
            
            {isEditing ? (
                <div className="edit-mode">
                    <div className="form-group">
                        <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="input" style={{ minHeight: '120px', resize: 'none' }} />
                    </div>
                    <div className="fragment-actions">
                        <button onClick={handleUpdate} className="btn btn-primary" style={{ width: 'auto' }}>Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn btn-outline" style={{ width: 'auto' }}>Cancel</button>
                    </div>
                </div>
            ) : (
                <p className="fragment-content">{fragment.content}</p>
            )}
        </div>
    );
};

export default FragmentCard;
