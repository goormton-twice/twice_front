// src/pages/CategoryDetailPage.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryDetailPage.css';
import Arrow from '../components/Arrow.jsx';

export default function CategoryDetailPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  // 응원 개수 (실제로는 props나 API에서 받아올 값)
  const supportCount = 4;       // 예시값
  const minSupportCount = 3;    // 최소 필요 응원 개수

  // 버튼 활성/비활성 여부
  const isButtonDisabled = supportCount < minSupportCount;

  // 카드 클릭 시 상세 보기(모달을 빼고 따로 동작 없음)
  const handleCardClick = () => {
    // 원래 모달 열던 자리 → 모달은 없애고 아무 액션도 하지 않도록 비워둡니다.
  };

  // “나만의 사연 쓰기” 버튼 클릭
  const handleWriteStory = () => {
    navigate('/writecheer');
  };

  // “응원에 대한 사연 보러 가기” 버튼 클릭
  const handleViewSupport = () => {
    navigate('/support/story');
  };

  return (
    <div className="category-detail-wrapper">

      {/* 페이지 타이틀 */}
      <div className="category-detail-title">무조건 응원함</div>

      {/* “잘하고 있다는 말이 듣고 싶어”에 대한 응원이에요 */}
      <div className="category-detail-subtitle">
        “위로가 필요해”에 대한 응원이에요
      </div>

      {/* 카드 박스 */}
      <div className="category-detail-card" onClick={handleCardClick}>
        {/* 사용자 정보 */}
        <div className="card-header">
          <div className="card-avatar">
            {/* 실제로는 <img src={avatarUrl} /> 등을 넣어주세요 */}
            <div className="avatar-placeholder"></div>
          </div>
          <span className="card-username">hae_on</span>
          <span className="card-date">05.16</span>
        </div>

        {/* 응원 내용 (collapsed) */}
        <div className="card-content collapsed">
          남들과 비교하지 않으셨으면 좋겠어요. 
          각자 속도도 다르고, 타이밍도 다르잖아요. 
          본인만의 리듬과 페이스를 믿고 계속 걸어가신다면, 
          분명히 좋은 결과로 이어질 거예요. 
          지금 이대로도 충분히 잘하고 계십니다.
        </div>

        {/* “응원에 대한 사연 보러 가기 →” 버튼 */}
        <button
          className="view-support-button"
          onClick={handleViewSupport}
          disabled={false}
        >
          <span className="view-support-text">응원에 대한 사연 보러 가기</span>
          <div className="view-support-icon">
            {
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12.5H19M19 12.5L12 5.5M19 12.5L12 19.5" 
              stroke="#656565" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </div>
        </button>
      </div>

      {/* 하단 “나만의 사연 쓰기” 버튼 */}
      <button
        className={`write-story-bottom ${isButtonDisabled ? 'disabled' : ''}`}
        onClick={handleWriteStory}
        disabled={isButtonDisabled}
      >
        <span className="write-story-text">나만의 사연 쓰기</span>
        <div className="write-story-icon">
          {
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.91215 12.5866C9.72104 12.3958 9.49327 12.2457 9.24259 12.1453L1.31258 8.96534C1.2179 8.92735 1.13711 8.8613 1.08104 8.77606C1.02498 8.69083 0.996331 8.59048 0.998943 8.4885C1.00156 8.38651 1.0353 8.28776 1.09566 8.20551C1.15601 8.12326 1.24008 8.06143 1.33658 8.02834L20.3366 1.52834C20.4252 1.49633 20.5211 1.49023 20.613 1.51073C20.705 1.53123 20.7892 1.5775 20.8558 1.64412C20.9224 1.71073 20.9687 1.79494 20.9892 1.88689C21.0097 1.97884 21.0036 2.07473 20.9716 2.16334L14.4716 21.1633C14.4385 21.2598 14.3767 21.3439 14.2944 21.4043C14.2122 21.4646 14.1134 21.4984 14.0114 21.501C13.9094 21.5036 13.8091 21.4749 13.7239 21.4189C13.6386 21.3628 13.5726 21.282 13.5346 21.1873L10.3546 13.2553C10.2538 13.0048 10.1033 12.7773 9.91215 12.5866ZM9.91215 12.5866L20.8525 1.64825"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        </div>
      </button>
    </div>
  );
}
