import api from './api';

// 랜덤 스토리 불러오기
export const getRandomStories = async (size = 5) => {
  const res = await api.get(`/stories/random`, { params: { size } });
  return res.data.data;
};

// 인기 스토리(응원함) 불러오기
export const getPopularStories = async (size = 10) => {
  const res = await api.get(`/stories/popular`, { params: { size } });
  return res.data.data;
};

export const getStoryById = async (storyId) => {
  const response = await api.get(`/stories/${storyId}`);
  return response.data.data;
};
