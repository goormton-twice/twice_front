import Setting from "../components/Setting.jsx";
import StoryInput from "../components/StoryInput";
import Arrow from "../components/Arrow.jsx";
import { useEffect, useState } from "react";
import Report from "../components/Report.jsx";
import Share from "../components/share.jsx";
import Edit from "../components/Edit.jsx";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { getStoryById } from "../api/storyApi.js";
import { getCheersByStoryId, postCheer } from "../api/cheerApi.js";
import Footer from "../components/Footer.jsx";
import "./PopularCheer.css";
const PopularCheer = () => {
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
        console.log("인기 응원함을 불러오는 중:", response);
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

  const handleSendCheer = async () => {
    if (!inputValue.trim()) return;
    try {
      await postCheer({
        storyId:id,
        content: inputValue,
        category: "기타",
      });
      setInputValue(""); // 입력창 초기화

      // 새로고침 없이 댓글 목록 갱신
      const cheers = await getCheersByStoryId(id);
      setComments(
        (cheers || []).map((c) => ({
          id: c.cheerId || c.id,
          avatar: c.user?.profileImageUrl || "/avatars/default.png",
          user: c.user?.username || "익명",
          date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-",
          content: c.content,
        }))
      );
    } catch (err) {
      console.error("응원 등록 실패:", err);
      alert("응원 등록에 실패했습니다.");
    }
  };
  return (
    <div style={{ width: "100%", height: "100vh", background: "#f7f3ff" }}>
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
              display: "flex",
              fontWeight: "700",
              fontSize: "1.5em",
              alignItems: "center",
              gap: "5px",
              marginBottom: "20px",
            }}
          >
            <Arrow
              style={{ fontSize: "1.2em" }}
              onClick={() => navigate("/popularCheersList")}
            />
            <div>인기 응원함</div>
          </div>
        </div>
        {post && (
          <StoryInput
            key={post.storyId}
            hasSettings={true}
            nickname={post.username}
            date={
              post.createdAt.slice(5, 7) + "." + post.createdAt.slice(8, 10)
            }
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
      <div className="sd-input-bar">
        <input
          className="sd-input-placeholder"
          style = {{
            border: "none",
            outline: "none",
            background: "transparent",}}
          placeholder="따뜻한 응원 보내기"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendCheer();
          }}
          
        />
        <button className="sd-input-arrow" onClick={handleSendCheer}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="24" height="24" rx="12" fill="#986CE9" />
            <path
              d="M5 12.5L12 5.5M12 5.5L19 12.5M12 5.5V19.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div style = {{ display: "flex", flexDirection: "column", gap: "10px", zIndex:"0" }}>
      {cheers.map((cheer) => {
        return (
            <StoryInput
            key={cheer.cheerId}
            hasLikes={cheer.cheerCount}
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

export default PopularCheer;
