// src/pages/Home.jsx
// ✅ useEffect를 포함하도록 수정
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronUp } from "lucide-react";
import HomeSendCheer from "../components/HomeSendCheer";
import InputBar from "../components/InputBar";        // 새로 만든 입력창 컴포넌트
import { getAllStories, getCheersByStoryId, postCheer } from "../api/cheerApi";
import "./Home.css";

// ───── 예시 데이터 (생략하지 말고 그대로 붙여주세요) ─────
const stories = [
  {
    id: 1,
    user: "Ji_woo",
    avatar: "/avatars/3d_avatar_2.png",
    date: "05.16",
    content: `요즘은 채용 공고도 별로 없고, 이력서를 아무리 넣어도 계속 떨어지기만 해요.
내가 뭘 잘못하고 있는 건지도 잘 모르겠고, 자꾸 자신감이 떨어지네요.
주변 친구들은 하나씩 붙었다는...`
  },
  {
    id: 2,
    user: "hae_on",
    avatar: "/avatars/3d_avatar_30.png",
    date: "05.17",
    content: `남들과 비교하지 않으셨으면 좋겠어요.
각자 속도도 다르고, 타이밍도 다르잖아요!`
  },
  {
    id: 3,
    user: "sarang12",
    avatar: "/avatars/3d_avatar_26.png",
    date: "05.18",
    content: `하루 종일 공부만 하니까 내가 잘하고 있는 건지도 모르겠고요…
이 길이 진짜 내가 원하는 길인지도 헷갈려요.
다른 친구들보다 뒤처지는 것 같고, 시간은 계속 흐르는데 성적은 그...`
  }
];

const cheers = [
  {
    id: 1,
    user: "sarang12",
    avatar: "/avatars/3d_avatar_26.png",
    date: "05.16",
    content: `정말 잘하고 계세요. 본인이 얼마나 열심히 해오셨는지 저는 알고 있어요!`
  },
  {
    id: 2,
    user: "Ji_woo",
    avatar: "/avatars/3d_avatar_2.png",
    date: "05.17",
    content: `응원의 댓글도 읽어보세요.
힘든 건 혼자만이 아니에요!`
  },
  {
    id: 3,
    user: "hae_on",
    avatar: "/avatars/3d_avatar_30.png",
    date: "05.18",
    content: `지금처럼 불안하고 흔들리는 시기는 누구에게나 오기 마련이에요...`
  }
];
// ────────────────────────────────────────────────────

const getIdx = (idx, len) => ((idx % len) + len) % len;

export default function Home() {
  // ── 캐러셀 인덱스 ──
  const [index, setIndex] = useState(0);

  // ── 응원 완료 팝업을 띄울지 여부 ──
  // showCheerPopup이 false가 될 때, InputBar도 false로 묶을 예정
  const [showCheerPopup, setShowCheerPopup] = useState(false);

  // ── InputBar(텍스트 입력창)를 띄울지 여부 ──
  const [showInputBar, setShowInputBar] = useState(false);

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
    delta: 10
  });

  // “따뜻한 응원 보내기” 버튼 클릭 시
  // ① InputBar를 켜고(키보드, 입력창 표시)
  // ② 일정 시간이 지나면(showCheerPopup)로 전환
  const handleCheerClick = () => {
    // 일단 입력창부터 띄워준다
    setShowInputBar(true);

  };

    // ▶ 사연과 응원 메시지 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const fetchedStories = await getAllStories();
      setStories(fetchedStories);

      // 각 스토리에 대해 첫 번째 응원 메시지만 가져오기
      const cheersList = await Promise.all(
        fetchedStories.map(async (story) => {
          const cheerMessages = await getCheersByStoryId(story.storyId);
          return cheerMessages[0] || {
            content: "아직 응원이 없어요 😢",
            date: new Date().toISOString(),
            user: {
              username: "cheerup",
              profileImageUrl: "/avatars/default.png"
            }
          };
        })
      );
      setCheers(cheersList);
    };

    fetchData();
  }, []);

  // InputBar에서 “전송” 버튼을 누르면 호출될 함수
  // 이 시점에 실제로 응원을 보내는 로직(백엔드 호출 등)을 넣을 수 있고
  // 여기서는 간단히 팝업만 띄워준다.
  // ▶ 응원 전송 로직
  const onInputSubmit = async (textValue) => {
    const currentStory = stories[index];
    const storyId = currentStory.storyId;

    await postCheer({
      storyId,
      content: textValue,
      category: "기타" // 혹은 선택한 카테고리
    });

    setShowInputBar(false);
    setTimeout(() => setShowCheerPopup(true), 150);
  };

  // “응원 완료” 팝업 닫힐 때 호출
  // setShowCheerPopup(false)가 되면 InputBar도 false로 만들어준다
  const onCloseCheerPopup = () => {
    setShowCheerPopup(false);

    // 팝업이 완전히 닫히면, 혹시 여전히 InputBar가 떠 있는 상태라면
    // 강제로 같이 닫아 버린다
    setShowInputBar(false);
  };

  // ── 캐러셀 카드 컴포넌트 ──
  const Card = ({ story, cheer, isMain, onClick, side }) => (
    <motion.div
      className={`carousel-card ${isMain ? "main" : "side " + side}`}
      style={{ zIndex: isMain ? 10 : 1, cursor: isMain ? "pointer" : "pointer" }}
      animate={
        isMain
          ? { x: 0, scale: 1, opacity: 1, filter: "none" }
          : side === "left"
          ? { x: "-260px", scale: 0.87, opacity: 0.6, filter: "blur(1.5px)" }
          : { x: "260px", scale: 0.87, opacity: 0.6, filter: "blur(1.5px)" }
      }
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      onClick={() => {
        if (isMain) {
          // 중앙 카드를 클릭하면 상세 보기 모달 등 추가 동작이 들어갈 수 있음
          // (생략)
        } else {
          onClick();
        }
      }}
    >
      {/* ── 사연(Story) 영역 ── */}
      <div className="card-story-wrapper">
        <div className="card-story-header">
          <img src={story.avatar} alt={story.user} className="card-story-avatar" />
          <span className="card-story-username">{story.user}</span>
          <span className="card-story-date">{story.date}</span>
        </div>
        <div className="card-story-content">{story.content}</div>
      </div>

      {/* ── 댓글(Cheer) 영역 ── */}
      <div className="card-cheer-wrapper">
        <div className="card-cheer-header">
          <img src={cheer.avatar} alt={cheer.user} className="card-cheer-avatar" />
          <span className="card-cheer-username">{cheer.user}</span>
          <span className="card-cheer-date">{cheer.date}</span>
        </div>
        <div className="card-cheer-content">{cheer.content}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="carousel-container" {...handlers}>
      {/* ── 로고+인사말 ── */}
      <div style={{ width: "100%", marginBottom: "32px" }}>
        <div className="page-logo">cheerup</div>
        <div className="page-instruction">
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>
            닉네임 님 안녕하세요
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#222", marginTop: 4 }}>
            응원 3개를 보내고 당신의 사연을 써보세요
          </div>
        </div>
      </div>

      {/* ── 3D 캐러셀 카드 3개(좌/중앙/우) ── */}
      <div className="carousel-3d-wrapper">
        <Card story={stories[prev]} cheer={cheers[prev]} isMain={false} onClick={goPrev} side="left" />
        <Card story={stories[curr]} cheer={cheers[curr]} isMain={true} />
        <Card story={stories[next]} cheer={cheers[next]} isMain={false} onClick={goNext} side="right" />
      </div>
      <button className="send-cheer-button" onClick={handleCheerClick}>
        <span>따뜻한 응원 보내기</span>
          <svg
            className="arrow"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="24"
              height="24"
              rx="12"
              fill="white" />
            <path
              d="M5.5 12.5L12.5 5.5M12.5 5.5L19.5 12.5M12.5 5.5V19.5"
              stroke="#986CE9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
      </button>

      {/* ── InputBar (텍스트 입력창) ── */}
      {showInputBar && (
        <InputBar
          onSubmit={onInputSubmit}
          onCancel={() => setShowInputBar(false)}
        />
      )}

      {/* ── 응원 완료 팝업(HomeSendCheer) ── */}
      {showCheerPopup && <HomeSendCheer onClose={onCloseCheerPopup} />}
    </div>
  );
}
