import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setting from "../components/Setting.jsx";
import Report from "../components/Report.jsx";
import Share from "../components/share.jsx";
import Edit from "../components/Edit.jsx";
import Arrow from "../components/Arrow.jsx";
import MessageCircleHeart from "../components/MessageCircleHeart.jsx";
import Bookmark from "../components/bookmark.jsx";
import { getStoryById } from "../api/storyApi";
import { getCheersByStoryId } from "../api/cheerApi";
import "./StoryDetailPage.css";

export default function StoryDetailPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 상태: 실제 사연 데이터/댓글(응원 메시지)
  const [card, setCard] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const story = await getStoryById(storyId);
        setCard({
          avatar: "/avatars/3d_avatar_6.png", // TODO: story.profileImageUrl 있으면 교체
          user: story.username,
          date: story.createdAt ? new Date(story.createdAt).toLocaleDateString() : "-",
          content: story.content,
          supportCount: story.cheerCount ?? 0,
        });

        const cheers = await getCheersByStoryId(storyId);
        setComments(
          (cheers || []).map((c) => ({
            id: c.cheerId || c.id,
            avatar: c.user?.profileImageUrl || "/avatars/default.png",
            user: c.user?.username || "익명",
            date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-",
            content: c.content,
          }))
        );
      } catch (e) {
        // 에러 처리
        setCard(null);
        setComments([]);
      }
    }
    fetchData();
  }, [storyId]);

const handleSendCheer = async () => {
  if (!inputValue.trim()) return;
  try {
    await postCheer({
      storyId,
      content: inputValue,
      category: "기타",
    });
    setInputValue(""); // 입력창 초기화

    // 새로고침 없이 댓글 목록 갱신
    const cheers = await getCheersByStoryId(storyId);
    setComments(
      (cheers || []).map((c) => ({
        id: c.cheerId || c.id,
        avatar: c.user?.profileImageUrl || "/avatars/default.png",
        user: c.user?.username || "익명",
        date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-",
        content: c.content,
      }))
    );
  } catch (err) {
    alert("응원 등록에 실패했습니다.");
  }
};

  if (!card) return <div className="story-detail-page">로딩 중...</div>;

  return (
    <div className="story-detail-page">
      {/* ─── 상단 헤더 ─── */}
      <div className="sd-header">
        <button className="sd-back-button" onClick={() => navigate(-1)}>
          <Arrow className="sd-arrow-icon" />
        </button>
        <div className="sd-title"></div>
      </div>
      {/* ─── 카드(사연) 영역 ─── */}
      <div className="sd-card">
        <div className="sd-card-header">
          <div className="sd-profile-avatar">
            <img src={card.avatar} alt={card.user} />
          </div>
          <div className="sd-profile-info">
            <span className="sd-profile-name">{card.user}</span>
            <span className="sd-profile-date">{card.date}</span>
          </div>
          <Setting
            className="sd-setting-icon"
            onClick={() => setIsClicked(!isClicked)}
          />
          {isClicked && (
            <div className="sd-settings-menu">
              {isYourPage ? (
                <div className="sd-settings-item">
                  <div>수정하기</div>
                  <Edit />
                </div>
              ) : (
                <div className="sd-settings-item">
                  <div>신고하기</div>
                  <Report />
                </div>
              )}
              <div className="sd-settings-divider"></div>
              <div className="sd-settings-item">
                <div>공유하기</div>
                <Share />
              </div>
            </div>
          )}
        </div>

        <div className="sd-card-content">
          {card.content.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>

        <div className="sd-card-actions">
          <div className="sd-action-support">
            <MessageCircleHeart className="sd-icon-support" />
            <span className="sd-support-count">
              응원 {card.supportCount}
            </span>
          </div>
          <button className="sd-action-bookmark">
            <Bookmark className="sd-icon-bookmark" />
          </button>
        </div>
      </div>

      {/* ─── 응원 댓글(Comments) 섹션 ─── */}
      <div className="sd-comments-section">
        {comments.map((c, idx) => (
          <div key={c.cheerId || c.id || idx} className="sd-comment">
            <div className="sd-comment-header">
              <div className="sd-comment-avatar">
                <img src={c.avatar} alt={c.user} />
              </div>
              <div className="sd-comment-info">
                <span className="sd-comment-name">{c.user}</span>
                <span className="sd-comment-date">{c.date}</span>
              </div>
            </div>
            <div className="sd-comment-content">
              {c.content.split("\n").map((line, idx) => (
                <React.Fragment key={c.cheerId || c.id || idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

        {/* ─── 하단 입력 바 (“따뜻한 응원 보내기”) ─── */}
        <div className="sd-input-bar">
          <input
            className="sd-input-placeholder"
            placeholder="따뜻한 응원 보내기"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSendCheer(); }}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent" }}
          />
          <button className="sd-input-arrow" onClick={handleSendCheer}>
            {/* ...svg */}
          </button>
        </div>
      <div className="sd-bottom-nav" />
    </div>
  );
}
