// src/pages/MyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/userApi'; 
import './MyPage.css';
import Arrow from '../components/Arrow';

export default function MyPage() {
  const navigate = useNavigate();

  // 페이지가 렌더될 때 한 번만 찍히도록
  console.log("▶ MyPage 컴포넌트가 렌더되었습니다.");

  const [nickname, setNickname] = useState('닉네임');
  const email = sessionStorage.getItem('email') || '이메일 없음';
  const isNaverLinked = sessionStorage.getItem('naverLinked') === 'true';

  useEffect(() => {
    console.log("▶ MyPage useEffect 동작: 유저 정보 Fetch 시작");
    async function fetchNickname() {
      try {
        const user = await getUserInfo();
        setNickname(user.nickname || '닉네임');
        console.log("▶ 유저 정보 가져옴:", user);
      } catch (e) {
        setNickname('닉네임');
        console.error("▶ 유저 정보 Fetch 실패:", e);
      }
    }
    fetchNickname();
  }, []);

  // 메뉴 배열
  const items = [
    { label: '내가 쓴 응원', path: '/mysupports' },
    { label: '내가 본 무조건 응원', path: '/support' },
    { label: '내가 북마크한 사연', path: '/bookmarks' },
    { label: '설정', path: '/settings' },
  ];

  return (
    <div className="mypage-container">
      <header className="mypage-header">
        <Arrow />
        <span className="mypage-title">마이 페이지</span>
      </header>

      {/* 프로필 영역 */}
      <section className="mypage-profile">
        <div className="profile-avatar">
          <div className="avatar-placeholder"></div>
        </div>
        <h2 className="profile-name">{nickname}</h2>
        <div className="profile-mail">{email}</div>
        <button className="profile-naver-btn" disabled={isNaverLinked}>
          {isNaverLinked ? '네이버 연동 완료' : '네이버 연동'}
        </button>
      </section>

      {/* 메뉴 목록 */}
      <nav className="mypage-nav">
        {items.map((item, idx) => (
          <React.Fragment key={item.label}>
            <div
              className="mypage-nav-item"
              onClick={() => {
                console.log(`▶ 메뉴 클릭됨: ${item.label} → ${item.path}`);
                navigate(item.path);
              }}
            >
              <span className="mypage-nav-label">{item.label}</span>
              <span className="chevron-svg">
                {/* 화살표 SVG 생략 */}
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="29"
                    height="29"
                    rx="14.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="29"
                    height="29"
                    rx="14.5"
                    stroke="#986CE9"
                  />
                  <path
                    d="M11.25 22.5L18.75 15L11.25 7.5"
                    stroke="#986CE9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            {idx < items.length - 1 && <div className="mypage-divider" />}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
