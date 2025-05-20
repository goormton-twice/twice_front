import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const payload = { email, password, nickname: userNickname, name: username, phone: phoneNumber, role };
    const response = await fetch('SIGNUP_SERVER_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.status === 201) navigate('/login');
    else alert(`회원가입 실패: ${data.message || data.email}`);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>On&Off</h1>
        <label>이메일</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>사용자명</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <label>닉네임</label>
        <input value={userNickname} onChange={e => setUserNickname(e.target.value)} />
        <label>전화번호</label>
        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <fieldset>
          <legend>회원 유형</legend>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />고객
          </label>
          <label>
            <input
              type="radio"
              value="seller"
              checked={role === 'seller'}
              onChange={() => setRole('seller')}
            />판매자
          </label>
        </fieldset>
        <button type="submit">회원가입</button>
        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
}