import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.cheer-up.net/api', // 모든 API의 기본 주소
  withCredentials: true,
});

// 인터셉터: 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;