// src/components/HomeSendCheer.jsx
import React from "react";
import { HeartHandshake } from "lucide-react"; // 'heart-handshake' 아이콘 (lucide-react)
import "./HomeSendCheer.css";

export default function HomeSendCheer({ onClose }) {
  // onClose prop이 넘어오면, 팝업을 닫고 싶을 때 사용

  // (필요 없다면 생략하셔도 됩니다.)

  return (
    <div className="overlay"> {/* 화면 전체 어두워지는 배경 */}
      <div className="modal-container"> {/* 팝업 박스 백그라운드 */}
        {/* ① 상단 아이콘 영역 */}
        <div className="icon-wrapper">
          <HeartHandshake className="icon-heart" />
        </div>

        {/* ② 안내 문구 영역 */}
        <div className="message-text">
          사연자님께 따뜻한 응원이 전송되었어요
          <br />
          소중한 응원 감사해요!
        </div>

        {/* ③ “작성한 사연으로 이동” 버튼 */}
        <button className="go-to-story-button">작성한 사연으로 이동</button>

        {/* ④ (선택) 닫기 버튼이나 클릭 시 onClose 호출 */}
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
      </div>
    </div>
  );
}
