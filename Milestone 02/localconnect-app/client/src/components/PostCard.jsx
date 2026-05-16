import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="user-badge">Neighbor</span>
        <span className="timestamp">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="card-content">{post.content}</p>
    </div>
  );
};

export default PostCard;
