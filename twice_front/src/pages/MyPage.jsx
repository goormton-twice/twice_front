// src/pages/MyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/userApi';
import './MyPage.css';
import Arrow from '../components/Arrow';

export default function MyPage() {
  const navigate = useNavigate();

  console.log("▶ MyPage 컴포넌트가 렌더되었습니다.");

  // 사용자 닉네임, 이메일, provider 상태
  const [nickname, setNickname] = useState('닉네임');
  const [email, setEmail] = useState('이메일 없음');
  const [provider, setProvider] = useState(null); // 'naver' | 'google' | 'kakao' | null

  useEffect(() => {
    console.log("▶ MyPage useEffect 동작: 유저 정보 Fetch 시작");
    async function fetchUser() {
      try {
        const res = await getUserInfo();
        // getUserInfo()는 { data: { role, id, email, username, provider }, success, message } 형태로 반환
        const userData = res.data;
        setNickname(userData.username || '닉네임');
        setEmail(userData.email || '이메일 없음');
        setProvider(userData.provider || null);
        console.log("▶ 유저 정보 가져옴:", userData);
      } catch (e) {
        setNickname('닉네임');
        setEmail('이메일 없음');
        setProvider(null);
        console.error("▶ 유저 정보 Fetch 실패:", e);
      }
    }
    fetchUser();
  }, []);

  // provider에 따라 버튼 라벨과 disabled 여부 결정
  let socialLabel = '소셜 계정 연동';
  let socialDisabled = false;

  if (provider === 'naver') {
    socialLabel = '네이버 연동 완료';
    socialDisabled = true;
  } else if (provider === 'google') {
    socialLabel = '구글 연동 완료';
    socialDisabled = true;
  } else if (provider === 'kakao') {
    socialLabel = '카카오 연동 완료';
    socialDisabled = true;
  }

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
        <button className="profile-naver-btn" disabled={socialDisabled}>
          {socialLabel}
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
                {/* 화살표 SVG */}
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
