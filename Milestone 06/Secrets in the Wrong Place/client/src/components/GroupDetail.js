import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  const fetchDetails = async () => {
    try {
      const { data } = await api.get(`/groups/${id}`);
      setGroup(data.group);
    } catch (err) {
      alert('Failed to fetch details (Are you a member?)');
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteFile, setNoteFile] = useState('');

  const fetchNotes = async () => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchNotes();
  }, [id]);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notes', { 
        title: noteTitle, 
        content: noteContent, 
        fileUrl: noteFile, 
        groupId: id 
      });
      setNoteTitle(''); setNoteContent(''); setNoteFile('');
      fetchNotes();
    } catch (err) {
      alert('Failed to post note');
    }
  };

  const handleDeleteNote = async (noteId, isOther) => {
    let password = '';
    if (isOther) {
      password = prompt('This is not your note. Enter Admin Password to delete:');
      if (!password) return;
    }
    try {
      await api.post(`/notes/${noteId}/delete`, { adminPassword: password });
      fetchNotes();
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminAction = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/do-something', { adminPassword });
      alert(response.data.message);
      setAdminPassword('');
    } catch (err) {
      alert('Admin action failed: ' + (err.response?.data?.error || err.message));
    }
  };

  if (!group) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  const currentUserId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;

  return (
    <div className="animate-in">
      <div className="card" style={{ marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '8px' }}>{group.name}</h1>
        <p style={{ fontSize: '18px' }}>{group.description}</p>
        <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <span>ID: {group.id}</span>
          <span>•</span>
          <span>Members: {group.members.length}</span>
        </div>
      </div>

      <div className="grid">
        <section className="card" style={{ gridColumn: 'span 2' }}>
          <h2>Study Notes & Documents</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', marginTop: '20px' }}>
            {notes.map(n => (
              <div key={n.id} className="card" style={{ background: '#0f172a', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '18px' }}>{n.title}</h3>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>{n.content}</p>
                {n.fileUrl && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={n.fileUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: '12px' }}>
                      View Attachment 🔗
                    </a>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>By {n.author.name}</span>
                  <button 
                    onClick={() => handleDeleteNote(n.id, n.authorId !== currentUserId)}
                    className="danger" 
                    style={{ width: 'auto', padding: '4px 8px', fontSize: '11px' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '32px', background: '#33415533' }}>
            <h3>Share a New Note</h3>
            <form onSubmit={handleCreateNote} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div className="form-group">
                <label>Title</label>
                <input placeholder="Note Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>File URL (Optional)</label>
                <input placeholder="https://..." value={noteFile} onChange={(e) => setNoteFile(e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Content</label>
                <textarea placeholder="Write your summary here..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)} required />
              </div>
              <button type="submit" style={{ gridColumn: 'span 2' }}>Post to Group</button>
            </form>
          </div>
        </section>

        <section className="card">
          <h2>Group Members</h2>
          <ul className="member-list">
            {group.members.map(m => (
              <li key={m.id} className="member-item">
                <div className="avatar">{m.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{m.email}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Admin Controls</h2>
          <p>Global management access.</p>
          <form onSubmit={handleAdminAction}>
            <div className="form-group">
              <label>Admin Access Password</label>
              <input 
                type="password" 
                placeholder="Manager secret..." 
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Execute Admin Command</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default GroupDetail;
