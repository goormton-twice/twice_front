// NaverLoginButton.jsx
import React from "react";

export default function GoogleLoginButton() {
  // 실제 로그인 서버 URL (도메인까지 포함)
  const GOOGLE_LOGIN_URL = "https://api.cheer-up.net/api/users/oauth2/google";

  const handleLogin = () => {
    // 구글글 로그인 페이지로 리디렉션
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <button 
        className="google-login-btn" 
        onClick={handleLogin}
        style={{ backgroundColor: "transparent", border: "none" }}
        >
      <img
        src="/google.svg"
        alt="구글 로고"
        style={{ height: 30, width: 30, marginRight: 0 }}
      />
    </button>
  );
}