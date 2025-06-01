import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.cheer-up.net/api',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRandomStories = async (size = 5) => {
  const response = await API.get(`/stories/random?size=${size}`);
  return response.data.data;
};
