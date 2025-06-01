// src/pages/StoryDetailPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Setting from "../components/Setting.jsx";
import Report from "../components/Report.jsx";
import Share from "../components/share.jsx";
import Edit from "../components/Edit.jsx";
import Arrow from "../components/Arrow.jsx";
import MessageCircleHeart from "../components/MessageCircleHeart.jsx";
import Bookmark from "../components/bookmark.jsx";
import "./StoryDetailPage.css";

export default function StoryDetailPage() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);

  // 예시 댓글 배열
  const comments = [
    {
      id: 1,
      avatar: "/avatars/3d_avatar_30.png",
      user: "hae_on",
      date: "05.16",
      content:
        "남들과 비교하지 않으셨으면 좋겠어요. 각자 속도도 다르고, 타이밍도 다르잖아요! 본인만의 페이스를 믿고 나아가면 분명 좋은 결과가 올 거예요."
    },
    {
      id: 2,
      avatar: "/avatars/3d_avatar_26.png",
      user: "sarang12",
      date: "05.17",
      content:
        "정말 잘하고 계세요. 제가 아는 한, 당신은 이미 충분히 노력하고 있답니다! 힘내세요 😊"
    },
    {
      id: 3,
      avatar: "/avatars/3d_avatar_2.png",
      user: "Ji_woo",
      date: "05.18",
      content:
        "응원의 댓글도 꼭 읽어보세요. 어려움을 겪는 건 혼자만이 아니에요. 당신을 응원하는 사람들이 많답니다!"
    }
  ];

  // 카드(사연) 예시 데이터
  const card = {
    avatar: "/avatars/3d_avatar_6.png",
    user: "tnvhwk",
    date: "05.16",
    content: `요즘은 아무리 열심히 해도 결과가 잘 안 보여서 지치고 있어요.
공부는 하고 있는데, 내가 잘하고 있는 건지 잘 모르겠어요.
정말 이 길이 내가 원하는 길인지 점점 헷갈리기도 하고요.`,
    supportCount: 2
  };

  return (
    <div className="story-detail-page">
      {/* ─── 상단 헤더 ─── */}
      <div className="sd-header">
        <button
          className="sd-back-button"
          onClick={() => navigate("/support")}
        >
          <Arrow className="sd-arrow-icon" />
        </button>
        <div className="sd-title">무조건 응원함</div>
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
        <div className="sd-input-placeholder">따뜻한 응원 보내기</div>
        <button className="sd-input-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 위 화살표 아이콘도 camelCased 속성으로 수정 */}
            <path
              d="M12 4L12 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 10L12 4L18 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ─── 하단 네비게이션 바 자리 ─── */}
      <div className="sd-bottom-nav">
        {/* 실제 네비게이션 컴포넌트를 이곳에 넣으세요 */}
      </div>
    </div>
  );
}
