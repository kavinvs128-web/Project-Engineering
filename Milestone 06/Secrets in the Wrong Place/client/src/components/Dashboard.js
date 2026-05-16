import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groupId, setGroupId] = useState('');

  const fetchGroups = async () => {
    try {
      const { data } = await api.get('/groups');
      setGroups(data.groups);
    } catch (err) {
      console.error('Failed to fetch groups', err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/groups', { name, description });
      setName(''); setDescription('');
      alert('Group created!');
      fetchGroups();
    } catch (err) {
      alert('Creation failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/groups/${groupId}/join`);
      setGroupId('');
      alert('Joined group!');
      fetchGroups();
    } catch (err) {
      alert('Joining failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="animate-in">
      <header style={{ marginBottom: '32px' }}>
        <h1>Study Groups</h1>
        <p>Explore your existing groups or start a new collaboration.</p>
      </header>
      
      <div className="grid">
        <section className="card">
          <h3>Create Group</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Group Name</label>
              <input placeholder="Web Dev 101" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Brief Description</label>
              <textarea placeholder="Discuss React and Node..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Start Group</button>
          </form>
        </section>

        <section className="card">
          <h3>Quick Join</h3>
          <p>Have an invite code? Enter it below to join instantly.</p>
          <form onSubmit={handleJoin}>
            <div className="form-group">
              <label>Group ID</label>
              <input placeholder="123" value={groupId} onChange={(e) => setGroupId(e.target.value)} required />
            </div>
            <button className="secondary" type="submit">Join via ID</button>
          </form>
        </section>
      </div>

      <section style={{ marginTop: '48px' }}>
        <h2>My Memberships</h2>
        {groups.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p>You haven't joined any groups yet. Start by creating one!</p>
          </div>
        ) : (
          <div className="grid">
            {groups.map(g => (
              <div key={g.id} className="card">
                <h3 style={{ color: 'var(--primary)' }}>{g.name}</h3>
                <p>{g.description}</p>
                <Link to={`/groups/${g.id}`}>
                  <button className="secondary">View Details</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
