import { useState } from 'react';
import Button from "../components/Button";
import StoryInput from "../components/StoryInput";

const PopularCheersList = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const handleTagClick = (e) => {
    const tag = e.target.innerText;
  if (selectedTag === tag) {
    setSelectedTag(null); // 같은 버튼 두 번 누르면 전체 보기로
  } else {
    setSelectedTag(tag);
  }
  }
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
    {
      id: 3,
      hasLikes: true,
      tag: "응원",
      content: "사연 내용",
      style: {
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "#B3B2B2",
      },
    },
  ];
  const filteredPosts = selectedTag === null 
  ? posts 
  : posts.filter(post => post.tag.includes(selectedTag));

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ fontWeight: "900", fontSize: "1.5em" }}>인기 응원함</div>
        <div style={{ display: "flex", gap: "10px", }}>
          <Button onClick={handleTagClick} style={{padding:"10px 20px", borderRadius:"0"}}>공감</Button>
          <Button onClick={handleTagClick} style={{padding:"10px 20px", borderRadius:"0"}}>위로</Button>
          <Button onClick={handleTagClick} style={{padding:"10px 20px", borderRadius:"0"}}>응원</Button>
        </div>
        {filteredPosts.map((post) =>(
          <StoryInput
            key={post.id}
            hasLikes={post.hasLikes}
            style={post.style}
            Tag={post.tag}
          >
            {post.content}
          </StoryInput>
          ) 
        )}
      </div>
    </div>
  );
};

export default PopularCheersList;
