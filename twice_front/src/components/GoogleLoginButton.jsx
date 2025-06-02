import React from "react";

export default function GoogleLoginButton() {
  // 공식 가이드의 OAuth 엔드포인트로 수정
  const GOOGLE_LOGIN_URL = "https://api.cheer-up.net/oauth2/authorization/google";
  const handleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <button
      className="google-login-btn"
      onClick={handleLogin}
      style={{ backgroundColor: "transparent", border: "none" }}
    >
      <img src="/google.svg" alt="구글 로고" style={{ height: 30, width: 30, marginRight: 0 }} />
    </button>
  );
}