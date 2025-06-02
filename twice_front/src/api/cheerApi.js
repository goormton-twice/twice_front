import api from './api';

// 응원 메시지 불러오기 (스토리 기준)
export const getCheersByStoryId = async (storyId) => {
  try {
    const res = await api.get(`/cheers/story/${storyId}`);
    return res.data.data;
  } catch (err) {
    console.error("응원 메시지 불러오기 실패:", err);
    return [];
  }
};

// 응원 메시지 보내기
export const postCheer = async ({ storyId, content, category }) => {
  try {
    const res = await api.post('/cheers', { storyId, content, category });
    return res.data;
  } catch (err) {
    console.error("응원 전송 실패:", err);
    throw err;
  }
};
