import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { Heart, ChevronUp } from 'lucide-react'
import './Home.css'

const stories = [
  { id: 1, user: '닉네임1', date: '05.16', content: '첫 번째 사연입니다.', likes: 3 },
  { id: 2, user: '닉네임2', date: '05.17', content: '두 번째 사연입니다. 길이를 테스트합니다.', likes: 1 },
  { id: 3, user: '닉네임3', date: '05.18', content: '세 번째 사연입니다.\n여러 줄\n테스트..\n여러 줄\n테스트.\n여러 줄\n테스트.\n여러 줄\n테스트.\n여러 줄\n테스트', likes: 5 },
  { id: 4, user: '닉네임4', date: '05.19', content: '네 번째 사연으로 넘어갑니다.', likes: 0 },
  { id: 5, user: '닉네임5', date: '05.20', content: '다섯 번째 사연. 마지막입니다!', likes: 2 },
]

const cheers = [
  { id: 1, user: '닉네임1', date: '05.16', content: '첫 번째 사연의 응원입니다.', likes: 3 },
  { id: 2, user: '닉네임2', date: '05.17', content: '두 번째 사연의 응원입니다.', likes: 1 },
  { id: 3, user: '닉네임3', date: '05.18', content: '세 번째 사연의 응원입니다.', likes: 5 },
  { id: 4, user: '닉네임4', date: '05.19', content: '네 번째 사연의 응원입니다.', likes: 0 },
  { id: 5, user: '닉네임5', date: '05.20', content: '다섯 번째 사연의 응원입니다!', likes: 2 },
]

export default function SupportCarouselPage() {
  const [index, setIndex] = useState(0)

  const handlers = useSwipeable({
    onSwipedLeft:  () => setIndex(i => (i === stories.length - 1 ? 0 : i + 1)),
    onSwipedRight: () => setIndex(i => (i === 0 ? stories.length - 1 : i - 1)),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    delta: 10,
  })

  // “사연”은 현재 인덱스, “응원”은 다음 인덱스로 가져옵니다.
  const story = stories[index]
  const cheer = cheers[index]

  return (
    <div className="carousel-container">
      <h2 className="page-logo">LOGO</h2>
      <p className="page-instruction">응원을 3개 보내고 당신의 사연을 써보세요</p>

      <motion.div
        className="carousel-card"
        key={story.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        {...handlers}
      >
        {/* 사연 부분 */}
        <div className="card-user">
          <div className="avatar">image</div>
          <span className="username">{story.user}</span>
          <span className="date">{story.date}</span>
        </div>
        <div className="card-content">{story.content}</div>

        <div className="divider" />

        {/* 응원 부분 */}
        <div className="card-user">
          <div className="avatar">image</div>
          <span className="username">{cheer.user}</span>
          <span className="date">{cheer.date}</span>
        </div>
        <div className="card-content">{cheer.content}</div>

        {/* 인디케이터 (박스 안) */}
        <div className="indicator">
          {stories.map((_, i) => (
            <span key={i} className={'dot' + (i === index ? ' active' : '')} />
          ))}
        </div>

        {/* “따뜻한 응원 보내기” 버튼 (박스 안) */}
        <button className="send-cheer-button">
          <span>따뜻한 응원 보내기</span>
          <ChevronUp className="arrow" />
        </button>
      </motion.div>
    </div>
  )
}
