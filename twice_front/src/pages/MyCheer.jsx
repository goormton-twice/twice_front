import { useNavigate } from 'react-router-dom';
import { getMyStories } from '../api/storyApi';
import Arrow from "../components/Arrow";
import Footer from "../components/Footer";
import StoryInput from "../components/StoryInput";
import React, {useEffect, useState } from "react";
import Setting from '../components/Setting';
import SettingBtn from '../components/SettingBtn';
const MyCheer = () => {
  const navigate = useNavigate();
  const [cheers, setCheers] = useState([]);
  useEffect(() => {
    async function fetchMyStories() {
      try {
        const response = await getMyStories();
        setCheers(response)
        console.log("나의 사연:", response);
      } catch (error) {
        console.error("나의 사연을 불러오는 중 오류 발생:", error);
      }
    }
    fetchMyStories();
  }, []);
  
  return (
    <div style={{ width: "100%", height: "screen", background:"#f7f3ff"}}>
      <div style={{ padding: "35px 25px" }}>
        <div
          style={{
            display: "flex",
            fontWeight: "700",
            fontSize: "1.5em",
            alignItems: "center",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <Arrow style={{ fontSize: "1.2em" }} onClick={() => navigate('/writeCheer') } />
          <div>나의 사연 쓰기</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {cheers.map((cheer) => (
          <StoryInput
            key={cheer.storyId}
            hasLikes={cheer.cheerCount}
            nickname={cheer.username}
            style={{border:"1px solid rgba(152, 108, 233, 1)"}}
            hasBookmark={true}
            hasSettings={true}
            icons = {
              <SettingBtn isYourPage={true}></SettingBtn>
            }
            date = {cheer.createdAt.slice(5,7) + "." + cheer.createdAt.slice(8,10)}
          >
            {cheer.content}
          </StoryInput>
        ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCheer;
