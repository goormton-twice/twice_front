import Setting from "../components/Setting.jsx";
import StoryInput from "../components/StoryInput";
import Arrow from "../components/Arrow.jsx";
import { useState } from "react";
import Report from "../components/Report.jsx";
import Share from "../components/share.jsx";
import Edit from '../components/Edit.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const PopularCheer = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([])
  const post = posts.find(p => p.id === parseInt(id));

  useEffect(() => {
      axios.get(`https://api.cheer-up.net/api/stories/${post.storyId}`) // <- Swagger에서 확인한 GET API URL
        .then((response) => {
          console.log(response.data); // 응답 데이터 확인
          setPosts(response.data.data);     // 상태에 저장
        })
        .catch((error) => {
          console.error("API 호출 실패:", error);
        });
    }, []); 
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
            fontWeight: "700",
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
        nickname={post.username}
        date={post.createdAt.split("T")[0]} // Assuming createdAt is in ISO format
        url={"../src/assets/react.svg"} // Default image if none provided
        hasLikes={post.cheerCount}
        hasBookmark={true}
        style={{
          borderWidth: "0 0 1px 0",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        {post.content}<div style={{ height: "100px" }} />
      </StoryInput>

      <StoryInput
        hasLikes={false}
        hasBookmark={false}
        style={{ border: "0", boxShadow: "none" }}
      >
        힘 내세요!
      </StoryInput>
    </div>
  );
};

export default PopularCheer;
