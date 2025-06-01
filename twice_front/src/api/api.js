// src/api/api.js 또는 axios 설정 파일
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.cheer-up.net',
  withCredentials: true // 추가
});

export default api;
