import React, { useState } from 'react';
import './SignIn.css';
import { loginUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import NaverLoginButton from "../components/NaverLoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import KakaoLoginButton from "../components/KakaoLoginButton";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });

    try {
      const response = await loginUser(email, password);
      console.log('로그인 성공:', response);
      alert('로그인 성공!');
      localStorage.setItem('accessToken', response);
      navigate('/home'); // 혹은 원하는 페이지로
    } 
    catch (error) {
      console.error('로그인 실패:', error);
      alert('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

return (
    <div className="login-container">
        <div className="content-wrapper">
            <div className="logo">
                <img src="/signinlogo.svg" alt="logo" />
            </div>
            <p className="subtitle">당신의 하루에 작은 <br />응원을 담아요</p>

            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <div className="input-password-wrapper">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                    <span className="eye-icon">👁️</span>
                </div>
                <button type="submit" className="login-button">로그인</button>
            </form>

            <div className="help-links">
                <span>비밀번호 찾기</span>
                <span>|</span>
                <span>아이디 찾기</span>
                <span>|</span>
                <span 
                    className="signup-link" 
                    onClick={() => navigate('/signup')}
                >
                    회원가입
                </span>
            </div>

            <div className="sns-login-section">
                <div className="divider">
                    <span className="line" />
                    <span className="label">간편 로그인</span>
                    <span className="line" />
                </div>
                <div className="sns-buttons">
                    <NaverLoginButton />
                    <GoogleLoginButton />
                    <KakaoLoginButton />
                </div>
            </div>
        </div>
    </div>
);
}
