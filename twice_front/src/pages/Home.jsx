// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import HomeSendCheer from "../components/HomeSendCheer";
import InputBar from "../components/InputBar";
import { getCheersByStoryId, postCheer } from "../api/cheerApi";
import { getRandomStories, getPopularStories } from "../api/storyApi";
import { getUserInfo } from "../api/userApi"; // 사용자 정보 호출 함수
import "./Home.css";
import Footer from "../components/Footer";

const getIdx = (idx, len) => ((idx % len) + len) % len;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [showCheerPopup, setShowCheerPopup] = useState(false);
  const [showInputBar, setShowInputBar] = useState(false);
  const [stories, setStories] = useState([]);
  const [cheers, setCheers] = useState([]);
  const [nickname, setNickname] = useState("익명");
  const [lastCheeredStoryId, setLastCheeredStoryId] = useState(null);

  const len = stories.length;
  const prev = getIdx(index - 1, len);
  const curr = getIdx(index, len);
  const next = getIdx(index + 1, len);

  const goPrev = () => setIndex(prev);
  const goNext = () => setIndex(next);

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    delta: 10,
  });

  const handleCheerClick = () => setShowInputBar(true);

  // 유저 정보 & 스토리 동시 fetch
  useEffect(() => {
    async function fetchAll() {
      try {
        // 1) 사용자 정보 가져오기
        // getUserInfo()는 GET /api/users/me 를 호출하여 { data: { username, ... } } 형태를 리턴한다고 가정
        const userRes = await getUserInfo();
        const userData = userRes.data; // { role, id, email, username, provider }
        setNickname(userData.username || "익명");

        // 2) 인기 스토리 3개 가져오기
        const fetchedStories = await getPopularStories(3);
        setStories(fetchedStories);

        // 3) 각 스토리별 첫 번째 응원 메시지 가져오기
        const cheersList = await Promise.all(
          fetchedStories.map(async (story) => {
            const cheerMessages = await getCheersByStoryId(story.storyId);
            return (
              cheerMessages[0] || {
                content: "아직 응원이 없어요",
                createdAt: new Date().toISOString(),
                user: {
                  username: "cheerup",
                  profileImageUrl: "/avatars/default.png",
                },
              }
            );
          })
        );
        setCheers(cheersList);
      } catch (err) {
        setNickname("익명");
        setStories([]);
        setCheers([]);
        console.error("데이터 불러오기 실패:", err);
      }
    }
    fetchAll();
  }, []);

  const onInputSubmit = async (textValue) => {
    const currentStory = stories[index];
    if (!currentStory) return;

    await postCheer({
      storyId: currentStory.storyId,
      content: textValue,
      category: "기타",
    });

    setLastCheeredStoryId(currentStory.storyId);
    setShowInputBar(false);
    setTimeout(() => setShowCheerPopup(true), 150);
  };

  const onCloseCheerPopup = () => {
    setShowCheerPopup(false);
    setShowInputBar(false);
  };

  // 카드 컴포넌트
  const Card = ({ story, cheer, isMain, onClick, side }) => (
    <motion.div
      className={`carousel-card ${isMain ? "main" : "side " + side}`}
      style={{ zIndex: isMain ? 10 : 1, cursor: "pointer" }}
      animate={
        isMain
          ? { x: 0, scale: 1, opacity: 1, filter: "none" }
          : side === "left"
          ? { x: "-260px", scale: 0.87, opacity: 0.6, filter: "blur(1.5px)" }
          : { x: "260px", scale: 0.87, opacity: 0.6, filter: "blur(1.5px)" }
      }
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      onClick={() => {
        if (!isMain) onClick();
      }}
    >
      <div className="card-story-wrapper">
        <div className="card-story-header">
          <img
            src="/avatars/default.png"
            alt={story.username}
            className="card-story-avatar"
          />
          <span className="card-story-username">{story.username}</span>
          <span className="card-story-date">
            {story.createdAt
              ? new Date(story.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
        <div className="card-story-content">{story.content}</div>
      </div>

      <div className="card-cheer-wrapper">
        <div className="card-cheer-header">
          <img
            src={cheer.user?.profileImageUrl || "/avatars/default.png"}
            alt={cheer.user?.username || "cheerup"}
            className="card-cheer-avatar"
          />
          <span className="card-cheer-username">
            {cheer.user?.username ?? cheer.username ?? "cheerup"}
          </span>
          <span className="card-cheer-date">
            {cheer.createdAt
              ? new Date(cheer.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
        <div className="card-cheer-content">{cheer.content}</div>
      </div>
    </motion.div>
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="carousel-container" {...handlers}>
        <div style={{ width: "100%", marginBottom: "32px" }}>
          <img src="/logo.svg" alt="logo" />
          <div className="page-instruction">
            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>
              {nickname} 님 안녕하세요
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: "#222",
                marginTop: 4,
              }}
            >
              응원 3개를 보내고 당신의 사연을 써보세요
            </div>
          </div>
        </div>

        <div className="carousel-3d-wrapper">
          {stories.length === 3 && cheers.length === 3 && (
            <>
              <Card
                story={stories[prev]}
                cheer={cheers[prev]}
                isMain={false}
                onClick={goPrev}
                side="left"
              />
              <Card story={stories[curr]} cheer={cheers[curr]} isMain={true} />
              <Card
                story={stories[next]}
                cheer={cheers[next]}
                isMain={false}
                onClick={goNext}
                side="right"
              />
            </>
          )}
        </div>

        <button className="send-cheer-button" onClick={handleCheerClick}>
          <span>따뜻한 응원 보내기</span>
          <svg
            className="arrow"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="white" />
            <path
              d="M5.5 12.5L12.5 5.5M12.5 5.5L19.5 12.5M12.5 5.5V19.5"
              stroke="#986CE9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {showInputBar && (
          <InputBar
            onSubmit={onInputSubmit}
            onCancel={() => setShowInputBar(false)}
          />
        )}
        {showCheerPopup && (
          <HomeSendCheer
            onClose={onCloseCheerPopup}
            storyId={lastCheeredStoryId}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
