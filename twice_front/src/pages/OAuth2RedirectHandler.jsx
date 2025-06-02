// // src/pages/OAuth2RedirectHandler.jsx
// import React, { useEffect } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";

// export default function OAuth2RedirectHandler() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { provider } = useParams(); // "google", "naver", "kakao" 중 하나

//   useEffect(() => {
//     // 1) URLSearchParams로 쿼리스트링에서 토큰 꺼내기
//     const query = new URLSearchParams(location.search);
//     const token = query.get("accessToken") || query.get("token");

//     if (token) {
//       // 2) 로컬스토리지에 JWT 저장
//       localStorage.setItem("accessToken", token);
//       // 3) 저장 후 홈으로 리다이렉트
//       navigate("/home", { replace: true });
//     } else {
//       // 토큰이 없으면 로그인 페이지로
//       navigate("/signin", { replace: true });
//     }
//   }, [location.search, navigate]);

//   return <div>로그인 처리 중…</div>;
// }
