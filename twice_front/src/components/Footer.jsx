import { useState } from "react";
import HomeImg from "./HomeImg";
import Likes from "./likes";
import Cheer from "./Cheer";
import PersonalCheerImg from "./PersonalCheerImg";
import PopularCheerImg from './PopularCheerImg';
import "./Footer.css"; 
const Footer = () => {
  const [clicked, setClicked] = useState();
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
        padding:"10px 5px",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button className='footer-btn' onClick={() => setClicked("home")}>
        <HomeImg className='icons' stroke={clicked === "home" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)"} />
        <div style={{ color: clicked === "home" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" }}>홈</div>
      </button>
      <button className='footer-btn' onClick={() => setClicked("likes")}>
        <Likes className='icons' stroke={clicked === "likes"? "rgba(152, 108, 233, 1)":"rgba(206, 206, 206, 1)"}  />
        <div style={{ color: clicked === "likes" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" }}>무조건 응원함</div>
      </button>
      <button className='footer-btn' onClick={() => setClicked("cheer")}>
        <Cheer className='icons' stroke={clicked === "cheer"? "rgba(152, 108, 233, 1)":"rgba(206, 206, 206, 1)"}/>
        <div style={{ color: clicked === "cheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" }}>사연 쓰기</div>
      </button>
      <button className='footer-btn' onClick={() => setClicked("popularCheer")}>
        <PopularCheerImg className='icons' stroke={clicked === "popularCheer"? "rgba(152, 108, 233, 1)":"rgba(206, 206, 206, 1)"}/>
        <div style={{ color: clicked === "popularCheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" }}>인기 응원함</div>
      </button>
      <button className='footer-btn' onClick={() => setClicked("personalCheer")}>
        <PersonalCheerImg className='icons' stroke={clicked ==="personalCheer"? "rgba(152, 108, 233, 1)":"rgba(206, 206, 206, 1)"}/>
        <div style={{ color: clicked === "personalCheer" ? "rgba(152, 108, 233, 1)" : "rgba(206, 206, 206, 1)" }}>개인 응원함</div>
      </button>
    </div>
  );
};
export default Footer;
