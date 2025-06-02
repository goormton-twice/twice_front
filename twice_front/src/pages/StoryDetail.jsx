// src/pages/StoryDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoryById } from "../api/storyApi"; // 아래에 예시 함수도 같이 안내
import { getCheersByStoryId } from "../api/cheerApi";
// import "./StoryDetail.css";

export default function StoryDetail() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [cheers, setCheers] = useState([]);

  useEffect(() => {
    // 사연 데이터 불러오기
    async function fetchData() {
      try {
        const storyData = await getStoryById(storyId);
        setStory(storyData);

        const cheersData = await getCheersByStoryId(storyId);
        setCheers(cheersData);
      } catch (err) {
        console.error("사연 또는 응원 메시지 불러오기 실패:", err);
      }
    }
    fetchData();
  }, [storyId]);

  if (!story) {
    return <div className="story-detail-loading">로딩 중...</div>;
  }

  return (
    <div className="story-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>
      <div className="story-header">
        <img src="/avatars/default.png" alt={story.username} className="story-avatar" />
        <span className="story-username">{story.username}</span>
        <span className="story-date">{new Date(story.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="story-content">{story.content}</div>

      <div className="cheer-section">
        <h3>응원 메시지</h3>
        {cheers.length === 0 ? (
          <div className="cheer-empty">아직 응원이 없습니다.</div>
        ) : (
          cheers.map((cheer, i) => (
            <div key={i} className="cheer-item">
              <img src={cheer.user?.profileImageUrl || "/avatars/default.png"} alt={cheer.user?.username || ""} className="cheer-avatar" />
              <span className="cheer-username">{cheer.user?.username}</span>
              <span className="cheer-date">{new Date(cheer.createdAt).toLocaleDateString()}</span>
              <div className="cheer-content">{cheer.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
