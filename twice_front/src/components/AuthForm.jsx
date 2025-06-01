// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { loginUser, signupUser, logoutUser } from '../api/userApi';

const AuthForm = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    try {
      if (mode === 'signup') {
        const result = await signupUser(username, email, password);
        alert('회원가입 성공: ' + result);
      } else {
        const result = await loginUser(email, password);
        alert('로그인 성공: ' + result);
      }
    } catch (err) {
      alert('실패: ' + err.message);
    }
  };

  return (
    <div>
      <h2>{mode === 'signup' ? '회원가입' : '로그인'}</h2>
      {mode === 'signup' && (
        <input
          placeholder="닉네임"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      )}
      <input
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>{mode === 'signup' ? '회원가입' : '로그인'}</button>
      <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
        {mode === 'signup' ? '로그인으로' : '회원가입으로'}
      </button>
      <br />
      <button onClick={async () => alert(await logoutUser())}>로그아웃</button>
    </div>
  );
};

export default AuthForm;
