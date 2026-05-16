import { useState } from 'react';
import './App.css';

function App() {
  const [noteText, setNoteText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!noteText.trim()) return;

    setIsLoading(true);
    setSummary('');

    try {
      const response = await fetch('/api/notes/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText }),
      });

      const data = await response.json();
      setSummary(data.result);
    } catch (error) {
      console.error('Frontend Error:', error);
      setSummary('Failed to fetch summary.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>NoteSnap</h1>
      <p className="subtitle">AI-Powered Study Tool</p>
      
      <div className="input-group">
        <textarea
          rows={10}
          placeholder="Paste your study notes here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button 
          onClick={handleSummarize} 
          disabled={isLoading}
        >
          {isLoading ? 'Summarising...' : 'Summarise Note'}
        </button>
      </div>

      {summary && (
        <div className="result-area">
          <h3>Summary Result:</h3>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
