import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { usePostsByUser } from '../hooks/usePosts';
import './UserDetail.css';

const UserDetail: React.FC = () => {
  const { selectedUser } = useAppSelector((state) => state.user);
  const { 
    data: posts, 
    isLoading: postsLoading, 
    error: postsError 
  } = usePostsByUser(selectedUser?.id || 0);

  if (!selectedUser) {
    return (
      <div className="user-detail-container">
        <div className="no-selection">
          <h3>No user selected</h3>
          <p>Please select a user from the list to view their details and posts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <h2>{selectedUser.name}</h2>
        <div className="user-detail-info">
          <div className="info-item">
            <strong>Email:</strong> {selectedUser.email}
          </div>
          <div className="info-item">
            <strong>Username:</strong> @{selectedUser.username}
          </div>
          <div className="info-item">
            <strong>Phone:</strong> {selectedUser.phone}
          </div>
          <div className="info-item">
            <strong>Website:</strong> {selectedUser.website}
          </div>
        </div>
      </div>

      <div className="user-posts-section">
        <h3>Posts by {selectedUser.name}</h3>
        
        {postsLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading posts...</p>
          </div>
        )}

        {postsError && (
          <div className="error-container">
            <p>Error loading posts: {postsError.message}</p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h4 className="post-title">{post.title}</h4>
                <p className="post-body">{post.body}</p>
                <div className="post-meta">
                  Post ID: {post.id}
                </div>
              </div>
            ))}
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="no-posts">
            <p>No posts found for this user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;