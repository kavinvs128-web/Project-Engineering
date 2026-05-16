import React from 'react';

const Leaderboard = () => {
  const leaders = [
    { name: 'John Doe', score: 1250 },
    { name: 'Jane Smith', score: 1100 },
    { name: 'Alice Johnson', score: 950 },
    { name: 'Bob Wilson', score: 800 },
    { name: 'Charlie Brown', score: 750 },
  ];

  return (
    <div>
      <h1 className="page-title">Community Leaderboard</h1>
      <p style={{marginBottom: '1.5rem', color: '#64748b'}}>Top contributors making our neighborhood a better place.</p>
      <div className="leaderboard-list">
        {leaders.map((leader, index) => (
          <div key={index} className="leader_item leader-item">
            <span className="leader-rank">#{index + 1}</span>
            <span className="leader-name">{leader.name}</span>
            <span className="leader-score">{leader.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
