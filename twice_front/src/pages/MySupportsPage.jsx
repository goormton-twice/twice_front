import React, { useEffect, useState } from "react";
import { getMyStories } from "../api/storyApi";

export default function MySupportsPage() {
  const [myStories, setMyStories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>로딩중...</div>;
  if (!myStories.length) return <div>내가 쓴 응원이 없습니다.</div>;

  return (
    <div className="my-supports-wrapper">
      <h1>내가 쓴 응원</h1>
      <ul>
        {myStories.map((story) => (
          <li key={story.storyId} className="my-supports-item">
            <div className="my-supports-content">{story.content}</div>
            <div className="my-supports-meta">
              <span>{story.categoryName}</span>
              <span>{story.createdAt && new Date(story.createdAt).toLocaleDateString()}</span>
              <span>응원 {story.cheerCount}개</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
