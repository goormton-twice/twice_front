import StoryInput from "../components/StoryInput";
import Arrow from "../components/Arrow.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { getStoryById } from "../api/storyApi.js";
import { getCheersByStoryId, postCheer } from "../api/cheerApi.js";
import Footer from "../components/Footer.jsx";
import "./popularCheer.css";
import Profile from '../components/profile.jsx';
const PersonalCheerDetail = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);
  const [post, setPost] = useState();
  const [cheers, setCheers] = useState([]);
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getStoryById(id);
        setPost(response);
        console.log("개인 응원함을 불러오는 중:", response);
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    }
    async function getCheer() {
      try {
        const res = await getCheersByStoryId(id); // 실제 API URL로 변경
        setCheers(res);
        console.log("인기 응원함 응원 메시지:", res);
      } catch (error) {
        console.error("인기 응원함을 불러오는 중 오류 발생:", error);
      }
    }
    fetchPosts();
    getCheer();
  }, [id]);

  return (
    <div style={{ width: "100%", height: "screen", background: "#f7f3ff" }}>
      <div style={{ padding: "35px 25px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              fontWeight: "700",
              fontSize: "1.5em",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Arrow
              style={{ fontSize: "1.2em" }}
              onClick={() => navigate("/personalCheer")}
            />
            <div>개인 응원함</div>
            </div>
            <Profile
                      stroke="rgba(152, 108, 233, 1)"
                      fill="rgba(247, 243, 255, 1)"
                      onClick = {() => navigate('/mypage')}
                    ></Profile>
          </div>
        </div>
        {post && (
          <StoryInput
            key={post.storyId}
            hasSettings={true}
            nickname={post.username}
            date={
              post.createdAt.slice(5, 7) + "." + post.createdAt.slice(8, 10)}
            hasLikes={post.cheerCount}
            hasBookmark={true}
            style={{
              border: "1px solid rgba(152, 108, 233, 1)",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.1)",
              boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
            }}
          >
            {post.content}
          </StoryInput>
        )}
      </div>
      
      <div style = {{ display: "flex", flexDirection: "column", gap: "10px", zIndex:"0" }}>
      {cheers.map((cheer) => {
        return (
            <StoryInput
            key={cheer.cheerId}
            nickname={cheer.username}
            date={
              cheer.createdAt.slice(5, 7) + "." + cheer.createdAt.slice(8, 10)
            }
            hasBookmark={false}
            style={{
              border: "0",
              borderRadius: "0",
              boxShadow: "none",
              width: "100vw",
            }}
          >
            {cheer.content}
          </StoryInput>
        )
        
      })}
      </div>
      <Footer />
    </div>
  );
};

export default PersonalCheerDetail;
