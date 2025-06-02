// NaverLoginButton.jsx
import React from "react";

export default function NaverLoginButton() {
  // 실제 로그인 서버 URL (도메인까지 포함)
  const NAVER_LOGIN_URL = "https://api.cheer-up.net/api/users/oauth2/naver";

  const handleLogin = () => {
    // 네이버 로그인 페이지로 리디렉션
    window.location.href = NAVER_LOGIN_URL;
  };

return (
    <button
        className="naver-login-btn"
        onClick={handleLogin}
        style={{ backgroundColor: "transparent", border: "none" }}
    >
        <img
            src="/naver.svg"
            alt="네이버 로고"
            style={{ height: 30, width: 30, marginRight: 0 }}
        />
    </button>
);
}
