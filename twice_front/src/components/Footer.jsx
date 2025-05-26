import { useState } from "react";
import HomeImg from "./HomeImg";
import Likes from "./likes";
import Cheer from "./Cheer";
import PersonalCheerImg from "./PersonalCheerImg";

const Footer = () => {
  const [clicked, setClicked] = useState();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100vw",
        height: "70px",
        background: "red",
        position: "fixed",
        bottom: "0",
      }}
    >
      <button>
        <HomeImg />
        <div>홈</div>
      </button>
      <button>
        <Likes />
        <div>무조건 응원함</div>
      </button>
      <button>
        <Cheer />
        <div>사연 쓰기</div>
      </button>
      <button>
        <PopularCheerImg />
        <div>인기 응원함</div>
      </button>
      <button>
        <PersonalCheerImg />
        <div>개인 응원함</div>
      </button>
    </div>
  );
};
export default Footer;
