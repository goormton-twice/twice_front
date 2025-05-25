import StoryInput from "../components/StoryInput";

const PopularCheersList = () => {
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
        <StoryInput
          hasTags={true}
          hasLikes={true}
          style={{
            borderWidth: "0 0 1px 0",
            borderStyle: "solid",
            borderColor: "#B3B2B2",
          }}
        >사연 내용</StoryInput>
      </div>
    </div>
  );
};

export default PopularCheersList;
