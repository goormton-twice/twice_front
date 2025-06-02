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

// 특정 스토리(응원함) 조회
export const getStoryById = async (storyId) => {
  try {
    const res = await api.get(`/stories/${storyId}`);
    // 실제 유효 데이터는 res.data.data 안에 들어 있습니다.
    return res.data; 
  } catch (err) {
    console.error("스토리 단건 조회 실패:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "스토리 조회 중 오류 발생");
  }
};


// 내가 쓴 응원(내 응원함) 목록 조회
export const getMyStories = async () => {
  const res = await api.get('/stories/my');
  return res.data.data; // 배열 반환
};