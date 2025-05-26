import Setting from "../components/Setting.jsx";
import StoryInput from "../components/StoryInput";
import Arrow from "../components/Arrow.jsx";
import { useState } from "react";
import Report from "../components/Report.jsx";
import Share from "../components/share.jsx";
import Edit from '../components/Edit.jsx';
const PopularCheer = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
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
            fontWeight: "900",
            fontSize: "1.5em",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Arrow style={{ fontSize: "1.2em" }} />
          <div>인기 응원함</div>
        </div>

        <Setting
          onClick={() => setIsClicked(!isClicked)}
          style={{ width: "20px" }}
        />

        {isClicked && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "20px",
              width: "150px",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {isYourPage ? (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                <div value="edit">수정하기</div>
                <Edit />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                <div value="report">신고하기</div>
                <Report />
              </div>
            )}
            <div style={{width:"100%", backgroundColor: "#8080808C", height:"1px"}}></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div value="share">
                공유하기
              </div>
              <Share />
            </div>
          </div>
        )}
      </div>

      <StoryInput
        hasLikes={true}
        hasBookmark={true}
        style={{
          borderWidth: "0 0 1px 0",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        사연 내용 <div style={{ height: "100px" }} />
      </StoryInput>

      <StoryInput
        hasLikes={false}
        hasBookmark={false}
        style={{ borderBottom: "1px solid [#B3B2B2]" }}
      >
        힘 내세요!
      </StoryInput>
    </div>
  );
};

export default PopularCheer;
