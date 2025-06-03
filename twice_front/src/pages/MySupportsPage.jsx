// src/pages/MySupportsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyStories } from "../api/storyApi";
import "./MySupportPage.css";

export default function MySupportsPage() {
  const [myStories, setMyStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyStories() {
      setLoading(true);
      try {
        const stories = await getMyStories();
        setMyStories(stories);
      } catch (e) {
        setMyStories([]);
      }
      setLoading(false);
    }
    fetchMyStories();
  }, []);

  if (loading) return <div className="my-supports-status">로딩중...</div>;
  if (!myStories.length)
    return <div className="my-supports-status">내가 쓴 응원이 없습니다.</div>;

  return (
    <div className="my-supports-wrapper">
      <h1>내가 쓴 응원</h1>
      <ul>
        {myStories.map((story) => (
          <li
            key={story.storyId}
            className="my-supports-item"
            onClick={() => navigate(`/stories/${story.storyId}`)}
          >
            <div className="my-supports-content">{story.content}</div>
            <div className="my-supports-meta">
              <span className="meta-category">{story.categoryName}</span>
              <span className="meta-date">
                {story.createdAt &&
                  new Date(story.createdAt).toLocaleDateString()}
              </span>
              <span className="meta-cheers">응원 {story.cheerCount}개</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
