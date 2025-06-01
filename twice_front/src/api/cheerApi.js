// src/api/cheerApi.js
import api from './api';

// 전체 응원함(스토리) 목록 불러오기
export const getAllStories = async () => {
  const res = await api.get('/api/stories');
  return res.data.data;  // 배열 형태의 story 목록
};

// 특정 스토리의 응원 메시지 불러오기
export const getCheersByStoryId = async (storyId) => {
  const res = await api.get(`/api/cheers/story/${storyId}`);
  return res.data.data;  // cheer 메시지 배열
};

// 응원 메시지 생성
export const postCheer = async ({ storyId, content, category }) => {
  const res = await api.post('/api/cheers', {
    storyId,
    content,
    category
  });
  return res.data.data;  // 생성된 cheer 메시지
};
