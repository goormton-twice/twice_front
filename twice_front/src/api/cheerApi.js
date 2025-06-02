// src/api/cheerApi.js
import api from "./api";

export const getCheersByStoryId = async (storyId) => {
  try {
    const res = await api.get(`/cheers/story/${storyId}`);
    // res.data.data는 [{ cheerId, content, createdAt, user: { username, profileImageUrl }, … }, …]
    return res.data.data;
  } catch (err) {
    console.error("응원 메시지 불러오기 실패:", err);
    return [];
  }
};

/**
 * 스토리 ID에 새 응원 메시지를 보냅니다.
**/
export const postCheer = async ({ storyId, content }) => {
  try {
    const res = await api.post("/cheers", { storyId, content });
    // res.data.data 형태: { cheerId, username, content, createdAt, categoryName }
    return res.data.data;
  } catch (err) {
    console.error("응원 메시지 생성 실패:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "응원 메시지 생성 중 오류 발생");
  }
};

/**
 * (구버전) 카테고리 + userNumber 기반으로 랜덤 응원 메시지를 가져옵니다.
 * @param {number} category
 * @param {number} userNumber
 * @returns {Promise< object >} res.data.data 반환
 */
export const getRandomCheer = async (category, userNumber) => {
  try {
    const res = await api.get("/cheers/random", {
      params: { category, userNumber },
    });
    return res.data.data;
  } catch (err) {
    console.error("기존 랜덤 응원 불러오기 실패:", err.response?.data || err);
    throw err;
  }
};

/**
 * 카테고리 ID(categoryId)를 이용해 하루 최대 3회까지 랜덤 응원 메시지를 가져옵니다.
 * @param {number} categoryId  조회하려는 카테고리 ID (예: 1, 2, 3)
 * @returns {Promise<{ success: boolean, message: string, data: object|null }>}
 * @throws 네트워크 오류나 인증 오류 시 예외 던짐
 */
export const getRandomCheerByCategory = async (categoryId) => {
  // 1) 로컬 스토리지에서 JWT 토큰을 꺼내옵니다.
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    // 2) axios 인스턴스를 통해 Authorization 헤더와 함께 GET 요청을 보냅니다.
    const res = await api.get("/cheers/random", {
      params: { categoryId },
      // 인터셉터가 이미 Authorization 헤더를 붙여 주도록 설정되어 있다면, 여기 헤더 생략 가능
      // headers: { Authorization: `Bearer ${token}` }
    });

    // res.data 형태: { success, message, data: { cheerId, username, content, createdAt, categoryName } }
    return res.data;
  } catch (err) {
    // HTTP 오류(401, 403 등)나 네트워크 오류 처리
    console.error("카테고리별 랜덤 응원 불러오기 실패:", err.response?.data || err.message);
    // err.response.data가 있다면 그 안의 message를 쓰고, 그렇지 않으면 err.message
    const msg = err.response?.data?.message || err.message || "서버 요청 오류";
    throw new Error(msg);
  }
};
