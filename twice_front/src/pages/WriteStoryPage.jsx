import React, { useState } from 'react'
import './WriteStoryPage.css'

export default function WriteStoryPage() {
  const [story, setStory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 서버로 전송하거나 상위 상태로 전달
    console.log('등록된 사연:', story)
    setStory('')
  }

  return (
    <div className="write-story-container">
      <h1 className="write-story-header">사연 쓰기</h1>
      <form className="write-story-form" onSubmit={handleSubmit}>
        <label htmlFor="story" className="write-story-label">
          남기고 싶은 사연을 입력해주세요
        </label>
        <textarea
          id="story"
          className="write-story-textarea"
          placeholder="여기에 사연을 작성하세요…"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
        <button type="submit" className="write-story-button">
          등록하기
        </button>
      </form>
    </div>
  )
}
