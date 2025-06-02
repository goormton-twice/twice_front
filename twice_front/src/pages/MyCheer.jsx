import Arrow from "../components/Arrow";
import Footer from "../components/Footer";
import StoryInput from "../components/StoryInput";
import React from "react";
const MyCheer = () => {
  const cheers = [
    {
      id: 1,
      hasLikes: true,
      tag: "위로",
      content:
        "요즘은 아무리 열심히 해도 결과가 잘 안 보여서 지치고 있어요.공부는 하고 있는데, 내가 잘하고 있는 건지 잘 모르겠어요.정말 이 길이 내가 원하는 길인지 점점 헷갈리기도 하고요.",
      style: {
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "#B3B2B2",
      },
      hasBookmark: true,
    },
  ];
  return (
    <div style={{ width: "100%", height: "100vh", background:"#f7f3ff"}}>
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
          <Arrow style={{ fontSize: "1.2em" }} />
          <div>나의 사연 쓰기</div>
        </div>
        {cheers.map((cheer) => (
          <StoryInput
            key={cheer.id}
            hasLikes={cheer.hasLikes}
            style={{border:"1px solid rgba(152, 108, 233, 1)"}}
            hasBookmark={cheer.hasBookmark}
            hasSettings={true}
          >
            {cheer.content}
          </StoryInput>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyCheer;
