import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setting from "../components/Setting.jsx";
import Report from "../components/Report.jsx";
import Share from "../components/share.jsx";
import Edit from "../components/Edit.jsx";
import Arrow from "../components/Arrow.jsx";
import MessageCircleHeart from "../components/MessageCircleHeart.jsx";
import { getStoryById } from "../api/storyApi";
import { getCheersByStoryId, postCheer } from "../api/cheerApi";
import "./StoryDetailPage.css";
import Bookmark from '../components/Bookmark.jsx';

export default function StoryDetailPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 카드(사연) 정보
  const [card, setCard] = useState(null);
  // 댓글(응원 메시지) 배열
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // ================================
        // (1) 단일 스토리 정보 조회
        // ================================
        const res = await getStoryById(storyId);
        // res.data 형태: { storyId, content, createdAt, categoryName, username, cheerCount }
        const storyData = res.data; 

        setCard({
          avatar: "/avatars/3d_avatar_6.png", // 실제 프로필 URL이 있으면 storyData.profileImageUrl로 교체
          user: storyData.username || "익명",
          date: storyData.createdAt
            ? new Date(storyData.createdAt).toLocaleDateString()
            : "-",
          content: storyData.content,
          supportCount: storyData.cheerCount ?? 0,
        });

        // ====================================
        // (2) 해당 스토리 댓글(응원 메시지) 조회
        // ====================================
        const cheers = await getCheersByStoryId(storyId);
        // cheers는 배열(댓글 객체들의 배열)
        // 댓글 객체 형태 예시:
        //  A) { cheerId, content, createdAt, user: { username, profileImageUrl }, … }
        //  B) { cheerId, content, createdAt, username, profileImageUrl, … }
        setComments(
          (cheers || []).map((c) => ({
            id: c.cheerId || c.id,
            // 두 가지 케이스를 모두 처리: user 객체 내부의 username, 아니면 최상위 username, 없으면 "익명"
            user: c.user?.username || c.username || "익명",
            // 프로필 이미지도 비슷하게 처리
            avatar: c.user?.profileImageUrl || c.profileImageUrl || "/avatars/default.png",
            date: c.createdAt
              ? new Date(c.createdAt).toLocaleDateString()
              : "-",
            content: c.content,
            // categoryName도 댓글 내 data로 내려오면 저장 (보여주고 싶다면 사용)
            categoryName: c.categoryName || "",
          }))
        );
      } catch (e) {
        console.error("스토리 혹은 댓글 불러오기 실패:", e);
        setCard(null);
        setComments([]);
      }
    }
    fetchData();
  }, [storyId]);

  // ================================
  // (3) 새로운 댓글(응원 메시지) 보내기
  // ================================
  const handleSendCheer = async () => {
    if (!inputValue.trim()) return;
    try {
      // 백엔드 스펙에 따라 Request body: { storyId, content }
      // Response res.data.data 형태: { cheerId, username, content, createdAt, categoryName }
      const newCheer = await postCheer({
        storyId,
        content: inputValue.trim(),
      });

      // 응답으로 받은 새 댓글을 comments 배열 맨 끝에 추가
      setComments((prev) => [
        ...prev,
        {
          id: newCheer.cheerId,
          user: newCheer.username || "익명",
          avatar: "/avatars/default.png", 
          date: newCheer.createdAt
            ? new Date(newCheer.createdAt).toLocaleDateString()
            : "-",
          content: newCheer.content,
          categoryName: newCheer.categoryName || "",
        },
      ]);

      setInputValue("");
    } catch (err) {
      console.error("handleSendCheer 오류:", err);
      alert("응원 등록에 실패했습니다.");
    }
  };

  if (!card) {
    return <div className="story-detail-page">로딩 중...</div>;
  }

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
            <span className="sd-support-count">응원 {card.supportCount}</span>
          </div>
          <button className="sd-action-bookmark">
            <Bookmark className="sd-icon-bookmark" />
          </button>
        </div>
      </div>

      {/* ─── 응원 댓글(Comments) 섹션 ─── */}
      <div className="sd-comments-section">
        {comments.map((c) => (
          <div key={c.id} className="sd-comment">
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
                <React.Fragment key={idx}>
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
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendCheer();
          }}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        />
        <button className="sd-input-arrow" onClick={handleSendCheer}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="24" height="24" rx="12" fill="#986CE9" />
            <path
              d="M5 12.5L12 5.5M12 5.5L19 12.5M12 5.5V19.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="sd-bottom-nav" />
    </div>
  );
}
