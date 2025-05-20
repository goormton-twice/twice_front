import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { Heart, MessageCircle } from 'lucide-react'
import './SupportCarouselPage.css'

const stories = [
  { id: 1, user: '닉네임1', date: '05.16', content: '첫 번째 사연입니다.', likes: 3, comments: 4 },
  { id: 2, user: '닉네임2', date: '05.17', content: '두 번째 사연입니다. 조금 더 길게 써보면 어떻게 될까요? 두 번째 사연입니다. 조금 더 길게 써보면 어떻게 될까요? 두 번째 사연입니다. 조금 더 길게 써보면 어떻게 될까요? 두 번째 사연입니다. 조금 더 길게 써보면 어떻게 될까요? 두 번째 사연입니다. 조금 더 길게 써보면 어떻게 될까요? 두 번째 사연입니다. 조금 더 길게 써보면 어떻게 될까요?', likes: 1, comments: 2 },
  { id: 3, user: '닉네임3', date: '05.18', content: '세 번째 사연입니다.\n여러 줄\n테스트.', likes: 5, comments: 0 },
  { id: 4, user: '닉네임4', date: '05.19', content: '네 번째 사연으로 넘어갑니다.', likes: 0, comments: 1 },
  { id: 5, user: '닉네임5', date: '05.20', content: '다섯 번째 사연. 마지막입니다!', likes: 2, comments: 3 },
]

export default function SupportCarouselPage() {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')

  const handlers = useSwipeable({
    onSwipedLeft:  () => setIndex(prev => prev === stories.length - 1 ? 0 : prev + 1),
    onSwipedRight: () => setIndex(prev => prev === 0 ? stories.length - 1 : prev - 1),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    delta: 10,
  })

  const send = () => {
    if (!input.trim()) return
    console.log('전송된 사연:', input)
    setInput('')
  }

  return (
    <div className="carousel-container">
      <div className="content">
        <h2 className="page-logo">LOGO</h2>
        <p className="page-instruction">
          응원을 5개 보내고 당신의 사연을 써보세요
        </p>

        <div className="card-wrapper">
          <motion.div
            key={stories[index].id}
            className="carousel-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            {...handlers}
          >
            <div className="card-user">
              <div className="avatar">image</div>
              <span className="username">{stories[index].user}</span>
              <span className="date">{stories[index].date}</span>
            </div>
            <div className="card-content">
              {stories[index].content}
            </div>
            <div className="card-actions">
              <div className="action">
                <Heart className="icon" /> {stories[index].likes}
              </div>
            </div>
          </motion.div>

          <div className="indicator">
            {stories.map((_, i) => (
              <span
                key={i}
                className={'dot' + (i === index ? ' active' : '')}
              />
            ))}
          </div>

          <div className="input-area">
            <textarea
              className="story-input"
              placeholder="응원을 입력하세요..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className="send-button" onClick={send}>
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
