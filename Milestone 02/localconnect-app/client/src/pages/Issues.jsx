import React, { useState, useEffect } from 'react';
import IssueCard from '../components/IssueCard';
import { getIssues, createIssue, updateIssue } from '../services/api';

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const { data } = await getIssues();
      setIssues(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createIssue(title, description);
      setTitle('');
      setDescription('');
      fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateIssue(id, status);
      fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Local Issues</h1>
      <div className="card">
        <h2 className="card-title" style={{marginBottom: '1rem'}}>Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="input-field" 
              placeholder="Issue Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{marginBottom: '0.5rem'}}
            />
            <textarea 
              className="input-field" 
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
            />
          </div>
          <button type="submit" className="btn-primary">Submit Issue</button>
        </form>
      </div>
      <div className="grid">
        {issues.map(issue => (
          <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />
        ))}
      </div>
    </div>
  );
};

export default Issues;
