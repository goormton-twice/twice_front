import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomCheer } from '../api/cheerApi';
import './CategoryDetailPage.css';

export default function CategoryDetailPage() {
  const navigate = useNavigate();
  const [cheer, setCheer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandomCheer() {
      setLoading(true);
      try {
        // category="fighting", userNumber=1
        const cheerData = await getRandomCheer("fighting", 1);
        setCheer(cheerData);
      } catch (e) {
        console.error(e);
        setCheer(null);
      }
      setLoading(false);
    }
    fetchRandomCheer();
  }, []);

  // 날짜 포맷
  const dateStr = cheer?.createdAt
    ? new Date(cheer.createdAt).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }).replace('. ', '.').replace('.', '')
    : '';

  if (loading) return <div>Loading...</div>;
  if (!cheer) return <div>응원 메시지를 불러올 수 없습니다.</div>;

  return (
    <div className="category-detail-wrapper">
      <div className="category-detail-title">무조건 응원함</div>
      <div className="category-detail-subtitle">
        “내 편 좀 들어줘”에 대한 응원이에요
      </div>
      <div className="category-detail-card">
        <div className="card-header">
          <div className="card-avatar">
            <div className="avatar-placeholder"></div>
          </div>
          <span className="card-username">{cheer.username || '익명'}</span>
          <span className="card-date">{dateStr}</span>
        </div>
        <div className="card-content collapsed">{cheer.content}</div>
        <button
          className="view-support-button"
          onClick={() => cheer.storyId && navigate(`/stories/${cheer.storyId}`)}
          disabled={false}
        >
          <span className="view-support-text">응원에 대한 사연 보러 가기</span>
          <div className="view-support-icon">
            {/* SVG 아이콘 */}
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12.5H19M19 12.5L12 5.5M19 12.5L12 19.5"
              stroke="#656565" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
