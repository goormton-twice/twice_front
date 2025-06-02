import api from './api';

// 회원가입
export async function signupUser(username, email, password, role = 'USER') {
  return api.post(
    '/users/signup',
    { username, email, password, role },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
}

// 로그인
export const loginUser = async (email, password) => {
  try {
    const res = await api.post(
      '/users/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("로그인 실패:", err.response?.data || err);
    throw err;
  }
};

// 로그아웃
export const logoutUser = async () => {
  const res = await api.post('/users/logout');
  return res.data;
};

// 내 정보 가져오기 (닉네임 등)
export const getUserInfo = async () => {
  try {
    const res = await api.get('/users/me');
    return res.data; 
  } 
  catch (err) {
    console.error("사용자 정보 조회 실패:", err.response?.data || err.message);
    // err.response.data.message가 내려오면 그것을, 아니면 err.message를 던지도록 합니다.
    const msg = err.response?.data?.message || err.message || "사용자 정보 조회 중 오류가 발생했습니다.";
    throw new Error(msg);
  }
};