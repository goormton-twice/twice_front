import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="user-profile">
      <button className="user-logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}