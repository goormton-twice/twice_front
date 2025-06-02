// src/pages/CategoryDetailPage3.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryDetailPage.css";
import Arrow from "../components/Arrow";
import Footer from "../components/Footer";

// cheerApi.js에서 랜덤 응원 메시지 호출 함수
import { getRandomCheerByCategory } from "../api/cheerApi";

export default function CategoryDetailPage2() {
  const navigate = useNavigate();

  // 카테고리 ID = 2 (“잘하고 있다는 말이 듣고 싶어”)
  const categoryIdNum = 2;
  const categoryName = "위로가 필요해";

  const [cheerData, setCheerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomCheer = async () => {
      setLoading(true);
      setError(null);
      setCheerData(null);

      try {
        // 실제 API 호출: /api/cheers/random?categoryId=2
        const result = await getRandomCheerByCategory(categoryIdNum);

        if (result.success) {
          setCheerData(result.data);
        } else {
          setError(result.message || "응원 메시지를 불러오지 못했습니다.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "서버 요청 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRandomCheer();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewSupport = () => {
    if (cheerData && cheerData.storyId) {
      navigate(`/stories/${cheerData.storyId}`);
    } else {
      console.error("Story ID is missing in cheerData.");
    }
  };

  const handleWriteStory = () => {
    navigate("/write");
  };

  const supportCount = cheerData ? 1 : 0;
  const minSupportCount = 3;
  const isButtonDisabled = supportCount < minSupportCount;

  return (
    <div className="category-detail-wrapper">
      <div className="category-detail-header">
        <div className="back-arrow" onClick={handleBack}>
          <Arrow />
        </div>
        <h1 className="category-detail-title">무조건 응원함</h1>
      </div>

      <div className="category-detail-subtitle">
        “{categoryName}”에 대한 응원이에요
      </div>

      {loading && (
        <p className="category-detail-loading">응원 메시지를 불러오는 중...</p>
      )}
      {error && <p className="category-detail-error">에러: {error}</p>}

      {!loading && !error && cheerData && (
        <div className="category-detail-card">
          <div className="card-header">
            <div className="card-avatar">
              <div className="avatar-placeholder"></div>
            </div>
            <span className="card-username">{cheerData.username}</span>
            <span className="card-date">
              {new Date(cheerData.createdAt).toLocaleDateString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>

          <div className="card-content">{cheerData.content}</div>

          <button className="view-support-button" onClick={handleViewSupport}>
            <span className="view-support-text">응원에 대한 사연 보러 가기</span>
            <div className="view-support-icon">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12.5H19M19 12.5L12 5.5M19 12.5L12 19.5"
                  stroke="#656565"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

      <div className="write-story-bottom-wrapper">
        <button
          className={`write-story-bottom ${isButtonDisabled ? "disabled" : ""}`}
          onClick={handleWriteStory}
          disabled={isButtonDisabled}
        >
          <span className="write-story-text">나만의 사연 쓰기</span>
          <div className="write-story-icon">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.91215 12.5866C9.72104 12.3958 9.49327 12.2457 9.24259 12.1453L1.31258 8.96534C1.2179 8.92735 1.13711 8.8613 1.08104 8.77606C1.02498 8.69083 0.996331 8.59048 0.998943 8.4885C1.00156 8.38651 1.0353 8.28776 1.09566 8.20551C1.15601 8.12326 1.24008 8.06143 1.33658 8.02834L20.3366 1.52834C20.4252 1.49633 20.5211 1.49023 20.613 1.51073C20.705 1.53123 20.7892 1.5775 20.8558 1.64412C20.9224 1.71073 20.9687 1.79494 20.9892 1.88689C21.0097 1.97884 21.0036 2.07473 20.9716 2.16334L14.4716 21.1633C14.4385 21.2598 14.3767 21.3439 14.2944 21.4043C14.2122 21.4646 14.1134 21.4984 14.0114 21.501C13.9094 21.5036 13.8091 21.4749 13.7239 21.4189C13.6386 21.3628 13.5726 21.282 13.5346 21.1873L10.3546 13.2553C10.2538 13.0048 10.1033 12.7773 9.91215 12.5866ZM9.91215 12.5866L20.8525 1.64825"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <Footer />
    </div>
  );
}