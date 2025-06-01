// src/api/cheerApi.js

const BASE_URL = "https://api.cheer-up.net/api";

export const getRandomStories = async (size = 5) => {
  try {
    const res = await fetch(`${BASE_URL}/stories/random?size=${size}`, {
      method: "GET",
      credentials: "include", // 쿠키 포함
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("응원 게시글 불러오기 실패:", err);
    throw err;
  }
};


// 응원 메시지 불러오기 (스토리 기준)
export const getCheersByStoryId = async (storyId) => {
  try {
    const res = await fetch(`${BASE_URL}/cheers?storyId=${storyId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("응원 메시지 불러오기 실패:", err);
    return [];
  }
};

// 응원 메시지 보내기
export const postCheer = async ({ storyId, content, category }) => {
  try {
    const res = await fetch(`${BASE_URL}/cheers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        storyId,
        content,
        category,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "응원 전송 실패");
    }

    return await res.json();
  } catch (err) {
    console.error("응원 전송 실패:", err);
    throw err;
  }
};
