// src/api/categoryApi.js
import api from './api'; // (이미 axios 인스턴스가 있으면 import)

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data; // 배열 반환
};
