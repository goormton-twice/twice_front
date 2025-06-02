import React from "react";

import { useState } from "react";
import Profile from "../components/profile";
import Button from "../components/Button";
import StoryInput from "../components/StoryInput";
import Rock from '../components/Rock';
import Footer from '../components/Footer';

const PersonalCheer = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isFiltered, setIsFiltered] = useState(true);
  const handleTagClick = (e) => {
    const tag = e.target.innerText;
    if (selectedTag === tag) {
      setSelectedTag(null); // 같은 버튼 두 번 누르면 전체 보기로
    } else {
      setSelectedTag(tag);
    }
  };
  const posts = [
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
  ];
  const filteredPosts =
    selectedTag === null
      ? posts
      : posts.filter((post) => post.tag.includes(selectedTag));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "900",
          fontSize: "1.5em",
          alignItems: "center",
          gap: "5px",
          padding: "20px",
        }}
      >
        <div>개인 응원함</div>
        <Profile> navigate('/mypage');</Profile>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
        }}
      >
        <img src="../src/assets/react.svg" style={{ width: "100px" }} />
        <div style={{ fontWeight: "700" }}>닉네임 님</div>
        <div>
          오늘 보낸 응원{" "}
          <div style={{ fontWeight: "700", display: "inline" }}>3 </div>개
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
                translate: "30px 50px",
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
      <div
        style={
          isFiltered
            ? { filter: "blur(3px)", background: "linear-gradient(white,#F7C0C0)" }
            : {}
        }
      >
        <div style={{ display: "flex", gap: "10px", padding: "0 20px" }}>
          <Button
            onClick={handleTagClick}
            style={{ padding: "10px 20px", borderRadius: "0" }}
          >
            공감
          </Button>
          <Button
            onClick={handleTagClick}
            style={{ padding: "10px 20px", borderRadius: "0" }}
          >
            위로
          </Button>
          <Button
            onClick={handleTagClick}
            style={{ padding: "10px 20px", borderRadius: "0" }}
          >
            응원
          </Button>
        </div>
        <div style={{ padding: "0 20px" }}>
          {filteredPosts.map((post) => (
            <StoryInput
              key={post.id}
              hasLikes={post.hasLikes}
              style={post.style}
              Tag={post.tag}
            >
              {
                <div>
                  <div>{post.content}</div>
                  <StoryInput key={6} hasLikes={false}>
                    힘 내세요!
                  </StoryInput>
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
