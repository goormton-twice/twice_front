import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    const response = await fetch('LOGIN_SERVER_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    if (response.status === 200) {
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('email', result.email);
      sessionStorage.setItem('role', result.role);
      sessionStorage.setItem('storeid', result.storeId);
      navigate('/');
    } else {
      setLoginCheck(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>On&Off</h1>
        <label>이메일</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {loginCheck && <p style={{ color: 'red' }}>이메일 혹은 비밀번호가 틀렸습니다.</p>}
        <button type="submit">로그인</button>
        <p className="signup-link">
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
}