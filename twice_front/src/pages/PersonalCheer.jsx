import React, { use, useEffect } from "react";

import { useState } from "react";
import Button from "../components/Button";
import StoryInput from "../components/StoryInput";
import Rock from "../components/Rock";
import Footer from "../components/Footer";

import { useNavigate } from 'react-router-dom';
import { getMyStories } from '../api/storyApi';
import Profile from '../components/Profile.jsx';

const PersonalCheer = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isFiltered, setIsFiltered] = useState(true);
  const navigate = useNavigate();
  const handleTagClick = (e) => {
    const tag = e.target.innerText;
    if (selectedTag === tag) {
      setSelectedTag(null); // 같은 버튼 두 번 누르면 전체 보기로
    } else {
      setSelectedTag(tag);
    }
  };
  const handleClick = (id) => {
    navigate(`/personalCheer/${id}`);
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getMyStories(); // 실제 API URL로 변경
        setPosts(response);
        console.log("개인 응원함을 불러오는 중:", response);
      } catch (error) {
        console.error("인기 응원함을 불러오는 중 오류 발생:", error);
      }
    }
    fetchPosts();
  }, []);
  const filteredPosts =
    selectedTag === null
    ? posts
   : posts.filter((post) => post.categoryName.includes(selectedTag));

  return (
    <div
      style={{
        width: "100%",
        height: "screen",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1E9FF 100%)",
      }}
    >
      <div style={{ padding: "35px 25px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "600",
            fontSize: "1.5em",
            alignItems: "center",

            gap: "5px",
          }}
        >
          <div>개인 응원함</div>
          <Profile
            stroke="rgba(152, 108, 233, 1)"
            fill="rgba(247, 243, 255, 1)"
            onClick={() => navigate("/mypage")}
          ></Profile>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            padding: "15px",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "center",
            gap: "10px",
            margin: "20px 0",
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "30px",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.1)",
            boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>오늘 보낸 응원</div>
            <div>
              <span style={{ fontWeight: "700" }}> 1 </span>개
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>지금까지 보낸 응원</div>
            <div>
              <span style={{ fontWeight: "700" }}>3 </span>개
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "black",
            marginBottom: "15px",
          }}
        />
        <div
          style={
            isFiltered
              ? {
                  display: "flex",
                  position: "absolute",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 1,
                  translate: "10px 70px",
                }
              : { display: "none" }
          }
        >
          <Rock onClick={() => setIsFiltered(!isFiltered)} />
          <div style={{ textAlign: "center",fontWeight:"500", width: "250px", marginTop: "10px" }}>
            응원을 2개 더 보내면 <br /> 내가 받은 응원을 볼 수 있어요
          </div>
        </div>
        <div style={{ fontWeight: "600", marginBottom: "10px" }}>
          내가 쓴 사연
        </div>
        <div style={isFiltered ? { filter: "blur(3px)" } : {}}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Button
              onClick={handleTagClick}
              style={{
                padding: "15px 15px",
                borderRadius: "30px",
                border: "1px solid rgba(137, 137, 137, 1)",
              }}
            >
              화이팅
            </Button>
            <Button
              onClick={handleTagClick}
              style={{
                padding: "15px 15px",
                borderRadius: "30px",
                border: "1px solid rgba(137, 137, 137, 1)",
              }}
            >
              힘내요
            </Button>
            <Button
              onClick={handleTagClick}
              style={{
                padding: "15px 15px",
                borderRadius: "30px",
                border: "1px solid rgba(137, 137, 137, 1)",
              }}
            >
              할수있어
            </Button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {filteredPosts.map((post) => (
              <StoryInput
                key={post.storyId}
                hasLikes={post.cheerCount}
                url={"/person3.svg"}
                Tag={post.categoryName}
                style={{}}
                nickname={post.username}
                date={
                  post.createdAt
                    ? post.createdAt.slice(5, 7) +
                      "." +
                      post.createdAt.slice(8, 10)
                    : "날짜 없음"
                }
                onClick={() => handleClick(post.storyId)}
              >
                {
                  <div>
                    <div>{post.content}</div>
                  </div>
                }
              </StoryInput>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalCheer;
