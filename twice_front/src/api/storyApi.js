import api from './api';

// 랜덤 스토리 불러오기
export const getRandomStories = async (size = 5) => {
  const res = await api.get(`/stories/random`, { params: { size } });
  return res.data.data;
};

export const fetchRandomStory = async (size = 1) => {
  const res = await api.get(`/stories/random`, { params: { size } });
  return res.data.data;
};


// 인기 스토리(응원함) 불러오기
export const getPopularStories = async (size = 10) => {
  const res = await api.get(`/stories/popular`, { params: { size } });
  return res.data.data;
};

// 사연 작성하기 (응원함 생성)
export const postStory = async ({content, categoryId}) => {
  try{
    const response = await api.post('/stories/create', {
    content,
    categoryId
  });
    return response.data;
  }
  catch(error) {
    console.error("응원함 생성 실패:", error);
    throw error;
  }
};

export const getStoryById = async (storyId) => {
  const response = await api.get(`/stories/${storyId}`);
  return response.data.data;
};


// 내가 쓴 응원(내 응원함) 목록 조회
export const getMyStories = async () => {
  const res = await api.get('/stories/my');
  return res.data.data; // 배열 반환
};