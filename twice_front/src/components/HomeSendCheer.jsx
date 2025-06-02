// src/components/HomeSendCheer.jsx
import React from "react";
import { HeartHandshake } from "lucide-react"; // 'heart-handshake' 아이콘 (lucide-react)
import "./HomeSendCheer.css";

export default function HomeSendCheer({ onClose,storyId }) {
  // 버튼 클릭 시 해당 사연 페이지로 이동
  const handleGoToStory = () => {
    if (storyId) {
      window.location.href = `/stories/${storyId}`; // 경로는 실제 상세 페이지 path에 맞게 수정
    }
  };

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="icon-wrapper">
          <HeartHandshake className="icon-heart" />
        </div>
        <div className="message-text">
          사연자님께 따뜻한 응원이 전송되었어요
          <br />
          소중한 응원 감사해요!
        </div>
        <button className="go-to-story-button" onClick={handleGoToStory}>
          작성한 사연으로 이동
        </button>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
