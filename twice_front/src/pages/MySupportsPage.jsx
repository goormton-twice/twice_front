// src/pages/MySupportsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getMyCheers } from "../api/cheerApi";
import "./MySupportPage.css";

export default function MySupportsPage() {
  const [myCheers, setMyCheers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyCheers() {
      setLoading(true);
      try {
        const cheers = await getMyCheers();
        setMyCheers(cheers);
      } catch (e) {
        console.error("내가 작성한 응원 불러오기 실패:", e);
        setMyCheers([]);
      }
      setLoading(false);
    }
    fetchMyCheers();
  }, []);

  if (loading) return <div className="my-supports-status">로딩중...</div>;
  if (!myCheers.length)
    return <div className="my-supports-status">내가 작성한 응원이 없습니다.</div>;

  return (
    <div className="my-supports-wrapper">
      <h1>내가 작성한 응원</h1>
      <ul>
        {myCheers.map((cheer) => (
          <li
            key={cheer.cheerId}
            className="my-supports-item"
            onClick={() => navigate(`/stories/${cheer.storyId}`)}
          >
            {/* 내가 남긴 응원 내용 */}
            <div className="my-supports-content">{cheer.content}</div>

            {/* 응원을 건 사연(스토리)의 간략 정보 */}
            <div className="my-supports-story-info">
              <div className="story-snippet-label">응원한 사연:</div>
              <div className="story-snippet-content">
                {cheer.storyContent.length > 50
                  ? cheer.storyContent.slice(0, 50) + "..."
                  : cheer.storyContent}
              </div>
            </div>

            {/* 메타 정보(카테고리, 사연 날짜, 응원 작성일) */}
            <div className="my-supports-meta">
              <span className="meta-category">{cheer.storyCategoryName}</span>
              <span className="meta-story-date">
                {cheer.storyCreatedAt &&
                  new Date(cheer.storyCreatedAt).toLocaleDateString()}
              </span>
              <span className="meta-cheer-date">
                {cheer.createdAt &&
                  new Date(cheer.createdAt).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
