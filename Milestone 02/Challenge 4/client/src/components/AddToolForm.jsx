import React, { useState } from 'react';

const AddToolForm = ({ onToolAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        setSubmitMessage('✅ Tool listed successfully!');
        setName('');
        setDescription('');
        onToolAdded();
      }
    } catch (error) {
      setSubmitMessage('❌ Error listing tool.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-tool-form">
      <h3>📋 List a New Tool</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tool Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Power Drill"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Short description..."
          />
        </div>

        {submitMessage && (
          <p className="submit-msg">{submitMessage}</p>
        )}

        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Listing...' : 'List Tool'}
        </button>
      </form>
    </div>
  );
};

export default AddToolForm;
