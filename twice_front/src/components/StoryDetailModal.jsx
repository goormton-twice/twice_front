// StoryDetailModal.jsx
import React from 'react';
import { ChevronUp } from 'lucide-react'; // 접기 아이콘
import './StoryDetailModal.css';

export default function StoryDetailModal({
  isOpen,       // boolean: 모달 열림/닫힘 여부
  onClose,      // 함수: 모달 닫기 콜백
  story,        // { user, avatar, date, content } 형태의 객체
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* 1) 검은 반투명 오버레이 */}
      <div className="overlay" onClick={onClose}></div>

      {/* 2) 모달 컨테이너 */}
      <div className="modal-container">
        {/* 3) 모달 내부 */}
        <div className="modal-content">
          {/* 유저 정보 */}
          <div className="modal-user">
            <div className="modal-avatar">
              <img src={story.avatar} alt={story.user} />
            </div>
            <span className="modal-username">{story.user}</span>
            <span className="modal-date">{story.date}</span>
          </div>

          {/* 본문 */}
          <div className="modal-body">
            {story.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* “사연 접기” 버튼 */}
          <button className="modal-collapse-btn" onClick={onClose}>
            <span>사연 접기</span>
            <ChevronUp className="modal-collapse-icon" />
          </button>
        </div>
      </div>
    </>
  );
}
