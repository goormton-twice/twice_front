import React from "react";
import HomeImg from "./HomeImg";
import Cheer from "./Cheer";
import PersonalCheerImg from "./PersonalCheerImg";
import PopularCheerImg from './PopularCheerImg';
import "./Footer.css";
import { useNavigate, useLocation } from 'react-router-dom';
import Likes from "./Likes";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성 버튼 결정
  const getActiveButton = () => {
    const pathname = location.pathname;
    if (pathname === "/home") return "home";
    if (pathname === "/support") return "support";
    if (pathname === "/writeCheer") return "cheer";
    if (pathname === "/popularCheersList") return "popularCheer";
    if (pathname === "/personalCheer") return "personalCheer";
    return null;
  };

  const activeButton = getActiveButton();

  const handleClick = (buttonName) => {
    switch (buttonName) {
      case "home":
        navigate("/home");
        break;
      case "support":
        navigate("/support");
        break;
      case "cheer":
        navigate("/writeCheer");
        break;
      case "popularCheer":
        navigate("/popularCheersList");
        break;
      case "personalCheer":
        navigate("/personalCheer");
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "70px",
        background: "",
        position: "fixed",
        bottom: "0",
        padding: "10px 5px",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button className='footer-btn' onClick={() => handleClick("home")}>
        <HomeImg 
          className='icons' 
          stroke={activeButton === "home" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)"} 
        />
        <div style={{ 
          color: activeButton === "home" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" 
        }}>
          홈
        </div>
      </button>

      <button className='footer-btn' onClick={() => handleClick("support")}>
        <Likes 
          className='icons' 
          stroke={activeButton === "support" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)"} 
        />
        <div style={{ 
          color: activeButton === "support" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" 
        }}>
          무조건 응원함
        </div>
      </button>

      <button className='footer-btn' onClick={() => handleClick("cheer")}>
        <Cheer 
          className='icons' 
          stroke={activeButton === "cheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)"} 
        />
        <div style={{ 
          color: activeButton === "cheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" 
        }}>
          사연 쓰기
        </div>
      </button>

      <button className='footer-btn' onClick={() => handleClick("popularCheer")}>
        <PopularCheerImg 
          className='icons' 
          stroke={activeButton === "popularCheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)"} 
        />
        <div style={{ 
          color: activeButton === "popularCheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" 
        }}>
          인기 응원함
        </div>
      </button>

      <button className='footer-btn' onClick={() => handleClick("personalCheer")}>
        <PersonalCheerImg 
          className='icons' 
          stroke={activeButton === "personalCheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)"} 
        />
        <div style={{ 
          color: activeButton === "personalCheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" 
        }}>
          개인 응원함
        </div>
      </button>
    </div>
  );
};

export default Footer;