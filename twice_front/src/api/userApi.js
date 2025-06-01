// src/api/userApi.js
import api from './api';

// 회원가입
import axios from 'axios';

export async function signupUser(email, password, username, role = 'USER') {
  return axios.post(
    'https://api.cheer-up.net/api/users/signup',
    {
      email,
      password,
      username,
      role, // 기본값 USER 설정
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
}



// 로그인
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post('https://api.cheer-up.net/api/users/login', {
      email,
      password,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return res.data;
  } catch (err) {
    console.error("❌ 로그인 실패:", err.response?.data || err);
    throw err;
  }
};

// 로그아웃
export const logoutUser = async () => {
  const res = await api.post('/users/logout');
  return res.data;
};
