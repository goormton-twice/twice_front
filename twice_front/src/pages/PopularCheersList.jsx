import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import StoryInput from "../components/StoryInput";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getPopularStories } from '../api/storyApi';

const PopularCheersList = () => {
  const [posts, setPosts] = useState( [
    {
      storyId: 0,
      content: "s",
      createdAt: "2025-06-01T11:05:10.114Z",
      categoryName: "s",
      username: "s",
      cheerCount: 0
    }
  ]);
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();
  const handlePostClick = (postId) => {
    // URL 파라미터로 글 ID 전달
    navigate(`/popularCheersList/${postId}`);
  };
  const handleTagClick = (e) => {
    const tag = e.target.innerText;
    if (selectedTag === tag) {
      setSelectedTag(null); // 같은 버튼 두 번 누르면 전체 보기로
    } else {
      setSelectedTag(tag);
    }
  };
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getPopularStories() // 실제 API URL로 변경
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
      : posts.filter((post) => post.categoryName.includes(selectedTag));

  return (
    <div
      style={{
        width: "100%",
        height: "screen",
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
        {filteredPosts.map((post) => (
          <StoryInput
            key={post.storyId}
            nickname={post.username}
            hasLikes={post.cheerCount}
            style={{border:"0", borderBottom:"2px solid rgba(218, 218, 218, 1)", boxShadow:"none", borderRadius:"0", backgroundColor:"transparent"}}
            date = {post.createdAt.slice(5,7) + "." + post.createdAt.slice(8,10)}
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
