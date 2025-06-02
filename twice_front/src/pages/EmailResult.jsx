import React, { useState } from "react";
import styles from "./EmailResult.module.css";

// 재사용 가능한 팝업(모달) 컴포넌트
function Popup({ message, onClose }) {
  return (
    <div className={styles.popup}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
        ×
      </button>
      <div style={{ fontSize: 17, color: "#000", fontWeight: 500, lineHeight: 1.6 }}>
        {message}
      </div>
    </div>
  );
}

/**
 * icon: 아이콘 경로 (string)
 * title: 타이틀 (string 또는 JSX)
 * desc: 설명 (string 또는 JSX)
 * buttonText: 메인 버튼 텍스트
 * onButtonClick: 메인 버튼 클릭 이벤트
 * subInfo: 하단 안내문 (string, 하이라이트할 부분엔 <span className={styles.link}>)
 * onSubLinkClick: 하단 링크 클릭 이벤트
 * subLinkLabel: 하단 하이라이트 텍스트 (string)
 * popupMsg: 팝업 메시지
 * setPopupMsg: 팝업 닫기용 setState 함수
 */
export default function EmailResult({
  icon = "/mail_icon.svg",
  title,
  desc,
  buttonText = "확인",
  onButtonClick,
  subInfo,
  subLinkLabel = "",
  onSubLinkClick,
  popupMsg = "",
  setPopupMsg,
}) {
  // 하단 cheerup 로고와 홈 인디케이터는 항상 보여줌
  return (
    <div className={styles.container}>
      <div className={styles.centerBox}>
        <div className={styles.iconCircle}>
          <img src={icon} alt="" />
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          {desc && <div className={styles.desc}>{desc}</div>}
        </div>
        <button className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
        {subInfo && (
          <div className={styles.subInfo}>
            {subInfo.split(subLinkLabel).map((txt, idx, arr) =>
              idx < arr.length - 1 ? (
                <React.Fragment key={idx}>
                  {txt}
                  <span
                    className={styles.link}
                    onClick={onSubLinkClick}
                    tabIndex={0}
                  >
                    {subLinkLabel}
                  </span>
                </React.Fragment>
              ) : (
                txt
              )
            )}
          </div>
        )}
      </div>
      <div className={styles.logo}>
        <img src="/cheerup.svg" alt="cheerup logo" />
      </div>
      <div className={styles.homeIndicator} />
      {popupMsg && setPopupMsg && (
        <Popup
          message={popupMsg}
          onClose={() => setPopupMsg("")}
        />
      )}
    </div>
  );
}
