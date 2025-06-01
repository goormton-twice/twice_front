// src/pages/Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { ChevronUp } from 'lucide-react';
import HomeSendCheer from '../components/HomeSendCheer';
import StoryDetailModal from '../components/StoryDetailModal';
import './Home.css';

// ───── 예시 데이터 (여기에 꼭 붙여 넣어야 합니다) ─────
const stories = [
  {
    id: 1,
    user: 'Ji_woo',
    avatar: '/avatars/3d_avatar_2.png',
    date: '05.16',
    content: `요즘은 채용 공고도 별로 없고, 이력서를 아무리 넣어도 계속 떨어지기만 해요.
내가 뭘 잘못하고 있는 건지도 잘 모르겠고, 자꾸 자신감이 떨어지네요.
주변 친구들은 하나씩 붙었다는...`,
  },
  {
    id: 2,
    user: 'hae_on',
    avatar: '/avatars/3d_avatar_30.png',
    date: '05.17',
    content: `남들과 비교하지 않으셨으면 좋겠어요.
각자 속도도 다르고, 타이밍도 다르잖아요!`,
  },
  {
    id: 3,
    user: 'sarang12',
    avatar: '/avatars/3d_avatar_26.png',
    date: '05.18',
    content: `하루 종일 공부만 하니까 내가 잘하고 있는 건지도 모르겠고요…
이 길이 진짜 내가 원하는 길인지도 헷갈려요.
다른 친구들보다 뒤처지는 것 같고, 시간은 계속 흐르는데 성적은 그...`,
  },
];

const cheers = [
  {
    id: 1,
    user: 'sarang12',
    avatar: '/avatars/3d_avatar_26.png',
    date: '05.16',
    content: `정말 잘하고 계세요. 본인이 얼마나 열심히 해오셨는지 저는 알고 있어요!`,
  },
  {
    id: 2,
    user: 'Ji_woo',
    avatar: '/avatars/3d_avatar_2.png',
    date: '05.17',
    content: `응원의 댓글도 읽어보세요. 
힘든 건 혼자만이 아니에요!`,
  },
  {
    id: 3,
    user: 'hae_on',
    avatar: '/avatars/3d_avatar_30.png',
    date: '05.18',
    content: `지금처럼 불안하고 흔들리는 시기는 누구에게나 오기 마련이에요...`,
  },
];
// ───────────────────────────────────────────────

const getIdx = (idx, len) => ((idx % len) + len) % len;

export default function Home() {
  // ① 캐러셀 인덱스 상태
  const [index, setIndex] = useState(0);
  const [showCheerPopup, setShowCheerPopup] = useState(false);
  // ② “응원 보내기” 토스트 상태
  const [showNotification, setShowNotification] = useState(false);
  // ③ 상세 모달의 열림/닫힘 상태
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // ④ 모달에 전달할 “상세 보여줄 사연” 객체
  const [detailStory, setDetailStory] = useState(null);

  // ⑤ 입력 바(showInputBar) 상태와, 입력 텍스트 상태
  const [showInputBar, setShowInputBar] = useState(false);
  const [cheerText, setCheerText] = useState('');

  const len = stories.length;
  const prev = getIdx(index - 1, len);
  const curr = getIdx(index, len);
  const next = getIdx(index + 1, len);

  // “왼쪽 카드 클릭 = 이전 카드” 함수
  const goPrev = () => setIndex(prev);
  // “오른쪽 카드 클릭 = 다음 카드” 함수
  const goNext = () => setIndex(next);

  const handlers = useSwipeable({
    onSwipedLeft:  goNext,
    onSwipedRight: goPrev,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    delta: 10,
  });

  // “따뜻한 응원 보내기” 버튼 클릭 → 입력 바 노출
  const handleCheerClick = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트와 겹치지 않도록
    setShowInputBar(true);
  };

  // 입력 바에서 “전송” 버튼 클릭 시
  const handleSendCheer = () => {
    if (!cheerText.trim()) return; // 빈 문자열일 땐 무시

    // 1. 토스트 표시
    setShowCheerPopup(true);
    setShowInputBar(false)
  };

  // ── 캐러셀 카드 컴포넌트 ──
  const Card = ({ story, cheer, isMain, onClick, side }) => (
    <motion.div
      className={`carousel-card ${isMain ? 'main' : 'side ' + side}`}
      style={{ zIndex: isMain ? 10 : 1, cursor: 'pointer' }}
      animate={
        isMain
          ? { x: 0, scale: 1, opacity: 1, filter: 'none' }
          : side === 'left'
            ? { x: '-300px', scale: 0.87, opacity: 0.6, filter: 'blur(1.5px)' }
            : { x: '300px', scale: 0.87, opacity: 0.6, filter: 'blur(1.5px)' }
      }
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      onClick={() => {
        if (isMain) {
          // 중앙 카드를 클릭하면 상세 모달 열기
          setDetailStory(story);
          setIsDetailOpen(true);
        } else {
          // 좌/우 카드는 캐러셀 이동
          onClick();
        }
      }}
    >
      {/* 사연 영역 */}
      <div>
        <div className="card-user">
          <img src={story.avatar} alt={story.user} className="avatar" />
          <span className="username">{story.user}</span>
          <span className="date">{story.date}</span>
        </div>
        <div className="card-content">
          {story.content.length > 100
            ? story.content.slice(0, 100) + '…더보기'
            : story.content}
        </div>
      </div>

      {/* 응원 영역 */}
      <div>
        <div className="card-user">
          <img src={cheer.avatar} alt={cheer.user} className="avatar" />
          <span className="username">{cheer.user}</span>
          <span className="date">{cheer.date}</span>
        </div>
        <div className="card-content">
          {cheer.content.length > 100
            ? cheer.content.slice(0, 100) + '…'
            : cheer.content}
        </div>
      </div>

      {/* 중앙 카드에만 “따뜻한 응원 보내기” 버튼 표시 */}
      {isMain && (
        <button className="send-cheer-button" onClick={handleCheerClick}>
          <span>따뜻한 응원 보내기</span>
          <ChevronUp className="arrow" />
        </button>
      )}
    </motion.div>
  );

  return (
    <div className="carousel-container" {...handlers}>
      {/* ── 로고 + 인사말 ── */}
      <div style={{ width: '100%', marginBottom: '32px' }}>
        <div className="page-logo">cheerup</div>
        <div className="page-instruction">
          <div style={{ fontWeight: 500, fontSize: 24, marginBottom: 2 }}>닉네임 님 안녕하세요</div>
          <div style={{ fontWeight: 400, fontSize: 17, color: '#222', marginTop: 6 }}>
            응원 3개를 보내고 당신의 사연을 써보세요
          </div>
        </div>
      </div>

      {/* ── 3D 캐러셀 카드 3개(좌/중앙/우) ── */}
      <div className="carousel-3d-wrapper">
        <Card
          story={stories[prev]}
          cheer={cheers[prev]}
          isMain={false}
          onClick={goPrev}
          side="left"
        />
        <Card
          story={stories[curr]}
          cheer={cheers[curr]}
          isMain={true}
        />
        <Card
          story={stories[next]}
          cheer={cheers[next]}
          isMain={false}
          onClick={goNext}
          side="right"
        />
      </div>

      {/* ── “응원 보내기” 입력 바 (피그마 CSS 적용) ── */}
      {showInputBar && (
        <div className="input-bar">
          <div className="input-bar-background">
            <input
              type="text"
              className="cheer-input"
              placeholder="따뜻한 응원을 보내보세요"
              value={cheerText}
              onChange={(e) => setCheerText(e.target.value)}
            />
            <button className="send-button" onClick={handleSendCheer}>
              <ChevronUp className="arrow-icon" />
            </button>
          </div>
        </div>
      )}

      {/* ── 응원 보내기 토스트 ── */}
      {showCheerPopup && <HomeSendCheer onClose={() => setShowCheerPopup(false)} />}

      {/* ── 사연 상세 보기 모달 ── */}
      {isDetailOpen && (
        <StoryDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          story={detailStory}
        />
      )}
    </div>
  );
}
