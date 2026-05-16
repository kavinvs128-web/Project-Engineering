import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getPosts, createPost } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await createPost(content);
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Neighborhood Feed</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea 
              className="input-field" 
              placeholder="What's happening in the neighborhood?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
            />
          </div>
          <button type="submit" className="btn-primary">Post Update</button>
        </form>
      </div>
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
