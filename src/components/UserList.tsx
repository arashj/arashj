import React from 'react';
import { useUsers } from '../hooks/useUsers';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSelectedUser, addToFavorites, removeFromFavorites } from '../store/slices/userSlice';
import './UserList.css';

const UserList: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useUsers();
  const dispatch = useAppDispatch();
  const { selectedUser, favorites } = useAppSelector((state) => state.user);

  const handleUserSelect = (user: any) => {
    dispatch(setSelectedUser(user));
  };

  const handleToggleFavorite = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(userId)) {
      dispatch(removeFromFavorites(userId));
    } else {
      dispatch(addToFavorites(userId));
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading users: {error.message}</p>
        <button onClick={() => refetch()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users ({users?.length || 0})</h2>
        <p className="favorites-count">
          Favorites: {favorites.length}
        </p>
      </div>
      
      <div className="user-list">
        {users?.map((user) => (
          <div
            key={user.id}
            className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-username">@{user.username}</p>
              <p className="user-phone">{user.phone}</p>
            </div>
            
            <button
              className={`favorite-button ${favorites.includes(user.id) ? 'favorited' : ''}`}
              onClick={(e) => handleToggleFavorite(user.id, e)}
              title={favorites.includes(user.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorites.includes(user.id) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;