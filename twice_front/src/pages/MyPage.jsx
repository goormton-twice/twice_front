import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

export default function MyPage() {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('email') || '닉네임 님';
  const sentCount = Number(sessionStorage.getItem('sentCount') || 0);
  const dailyLimit = 5;

  const items = [
    { label: '내가 쓴 응원', path: '/my-supports' },
    { label: '내가 본 무조건 응원', path: '/support' },
    { label: '내가 북마크한 사연', path: '/bookmarks' },
    { label: '설정', path: '/settings' },
  ];

  return (
    <div className="mypage-container">
      <header className="mypage-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ◀
        </button>
        <h1 className="mypage-title">마이 페이지</h1>
      </header>

      <section className="mypage-profile">
        <div className="profile-avatar">image</div>
        <h2 className="profile-name">{userName}</h2>
        <p className="profile-info">
          오늘 보낸 응원 <strong>{sentCount}</strong> / {dailyLimit}개
        </p>
      </section>

      <nav className="mypage-nav">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="mypage-nav-item"
            onClick={() => navigate(item.path)}
          >
            <span>{item.label}</span>
            <span className="arrow">▶</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
