import React, { useEffect } from "react";
import "./SplashScreen.css";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  // 마운트되자마자 3초 타이머, 3초 후 /home으로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      {/* 배경 이미지를 CSS에서 설정 */}
      <div className="splash-content">
        <img src="/firstlogo.svg" alt="cheerup" className="splash-logo" />
        <div className="splash-text">
          당신의 하루에 작은 <br />
          응원을 담아요
        </div>
      </div>
    </div>
  );
}
