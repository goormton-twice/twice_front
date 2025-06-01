// src/components/InputBar.jsx
import React, { useState, useRef, useEffect } from "react";
import "./InputBar.css";

export default function InputBar({ onSubmit, onCancel }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // 컴포넌트가 마운트되면 자동으로 포커스 주기
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="inputbar-overlay">
      <div className="inputbar-container">
        {/* 취소 버튼 (혹은 뒤로가기 아이콘) */}
        <button className="inputbar-cancel-btn" onClick={onCancel}>
          취소
        </button>

        {/* 실제 입력창(가운데) */}
        <input
          ref={inputRef}
          className="inputbar-textfield"
          type="text"
          placeholder="따뜻한 응원 보내기"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* 전송 버튼 */}
        <button
          className="inputbar-send-btn"
          onClick={() => {
            if (text.trim() === "") {
              return; // 빈값일 때는 전송하지 않도록
            }
            onSubmit(text.trim());
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}
