import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import StoryInput from "../components/StoryInput";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PopularCheersList = () => {
  const [posts, setPosts] = useState( [
    {
      "storyId": 0,
      "content": "s",
      "createdAt": "2025-06-01T11:05:10.114Z",
      "categoryName": "s",
      "username": "s",
      "cheerCount": 0
    }
  ]);
  const handlePostClick = (postId) => {
    // URL 파라미터로 글 ID 전달
    navigate(`/popularCheersList/${postId}`);
  };
  const [selectedTag, setSelectedTag] = useState(null);
  const handleTagClick = (e) => {
    const tag = e.target.innerText;
    if (selectedTag === tag) {
      setSelectedTag(null); // 같은 버튼 두 번 누르면 전체 보기로
    } else {
      setSelectedTag(tag);
    }
  };
  useEffect(() => {
    axios.get('https://api.cheer-up.net/api/stories/popular?size=10') // <- Swagger에서 확인한 GET API URL
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인
        setPosts(response.data.data);     // 상태에 저장
      })
      .catch((error) => {
        console.error("API 호출 실패:", error);
      });
  }, []); 
  
 // const filteredPosts =
   // selectedTag === null
     // ? posts
     // : posts.filter((post) => post.tag.includes(selectedTag));

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:"linear-gradient(180deg, #FFFFFF 0%, #F1E9FF 100%)"
      }}
    >
      <div style={{ padding: "35px 25px 0 25px",  display: "flex",
        alignContent: "center",
        flexDirection: "column", gap: "10px" }}>
        <div style={{ fontWeight: "700", fontSize: "1.5em" }}>인기 응원함</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={handleTagClick}
            style={{
              backgroundColor: "rgba(247, 243, 255, 1)",
              padding: "14px 20px",
              border: "1px solid rgba(137, 137, 137, 1)",
              borderRadius: "30px",
            }}
          >
            공감
          </Button>
          <Button
            onClick={handleTagClick}
            style={{
              backgroundColor: "rgba(247, 243, 255, 1)",
              padding: "14px 20px",
              border: "1px solid rgba(137, 137, 137, 1)",
              borderRadius: "30px",
            }}
          >
            위로
          </Button>
          <Button
            onClick={handleTagClick}
            style={{
              backgroundColor: "rgba(247, 243, 255, 1)",
              padding: "14px 20px",
              border: "1px solid rgba(137, 137, 137, 1)",
              borderRadius: "30px",
            }}
          >
            응원
          </Button>
        </div>
        {posts.map((post) => (
          <StoryInput
            key={post.storyId}
            hasLikes={post.cheerCount}
            style={{border:"0", borderBottom:"2px solid rgba(218, 218, 218, 1)", boxShadow:"none", borderRadius:"0", backgroundColor:"transparent"}}
            Tag={post.categoryName}
            onClick={() => handlePostClick(post.storyId)}
          >
            {post.content}
          </StoryInput>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PopularCheersList;
