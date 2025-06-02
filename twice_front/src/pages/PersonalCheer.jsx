import React, { use } from "react";

import { useState } from "react";
import Button from "../components/Button";
import StoryInput from "../components/StoryInput";
import Rock from "../components/Rock";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import { getMyStories } from '../api/storyApi';

const PersonalCheer = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
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
    navigate(`/personalCheerDetail/${id}`);}
  const [posts,setPosts] = useState([
    {
      id: 1,
      hasLikes: true,
      tag: "위로",
      content: "사연 내용",
      style: {
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "#B3B2B2",
      },
    },
    {
      id: 2,
      hasLikes: true,
      tag: "공감",
      content: "사연 내용",
      style: {
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "#B3B2B2",
      },
    },
  ]);
  useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await getMyStories() // 실제 API URL로 변경
          setPosts(response);
        } catch (error) {
          console.error("인기 응원함을 불러오는 중 오류 발생:", error);
        }
      }
      fetchPosts();
    }, []); 
  const filteredPosts =
    selectedTag === null
      ? posts
      : posts.filter((post) => post.tag.includes(selectedTag));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "35px 25px",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1E9FF 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "700",
          fontSize: "1.5em",
          alignItems: "center",
          gap: "5px",
          padding: "20px",
        }}
      >
        <div>개인 응원함</div>
        <Profile
          stroke="rgba(152, 108, 233, 1)"
          fill="rgba(247, 243, 255, 1)"
          onClick = {() => navigate('/mypage')}
        ></Profile>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            오늘 보낸 응원{" "}
            <div style={{ fontWeight: "700", display: "inline" }}>3 </div>개
          </div>
        </div>
        <div>
          지금까지 보낸 응원{" "}
          <div style={{ fontWeight: "700", display: "inline" }}>3 </div>개
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
                translate: "60px 50px",
              }
            : { display: "none" }
        }
      >
        <Rock />
        <div style={{ textAlign: "center", width: "250px" }}>
          내가 받은 응원을 보기까지 <br />
          써야 하는 응원 수가{" "}
          <div style={{ display: "inline", color: "#E35F5F" }}>2개 </div>
          남았어요
        </div>
      </div>
      <div>내가 쓴 사연</div>
      <div style={isFiltered ? { filter: "blur(3px)" } : {}}>
        <div style={{ display: "flex", gap: "10px", padding: "0 20px" }}>
          <Button
            onClick={handleTagClick}
            style={{
              padding: "15px 25px",
              borderRadius: "30px",
              border: "1px solid rgba(137, 137, 137, 1)",
            }}
          >
            공감
          </Button>
          <Button
            onClick={handleTagClick}
            style={{
              padding: "15px 25px",
              borderRadius: "30px",
              border: "1px solid rgba(137, 137, 137, 1)",
            }}
          >
            위로
          </Button>
          <Button
            onClick={handleTagClick}
            style={{
              padding: "15px 25px",
              borderRadius: "30px",
              border: "1px solid rgba(137, 137, 137, 1)",
            }}
          >
            응원
          </Button>
        </div>
        <div style={{ padding: "0 20px" }}>
          {filteredPosts.map((post) => (
            <StoryInput
              key={post.storyId}
              hasLikes={post.cheerCount}
              style={{}}
              Tag={post.categoryName}
              onClic={() => handleClick(post.storyId)}
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
  );
};

export default PersonalCheer;
