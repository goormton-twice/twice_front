import React from 'react'
import { useNavigate } from 'react-router-dom'
import './UnconditionalSupportPage.css'

const categories = [
  { label: '내 편 좀 들어줘', tag: '#다정한' },
  { label: '위로가 필요해', tag: '#따뜻한' },
  { label: '잘하고 있다는 말이 듣고 싶어', tag: '#든든한' },
]

export default function UnconditionalSupportPage() {
  const navigate = useNavigate()

  const handleCategoryClick = (idx) => {
    navigate('/support/category1')
    navigate('/support/category2')
    navigate('/support/category3')
  }

  return (
    <div className="uncond-container">
      <h1 className="uncond-title">무조건 응원함</h1>
      <p className="uncond-subtitle">
        응원 받고 싶은 카테고리를 선택해주세요
      </p>
      <div className="uncond-buttons">
        {categories.map(({ label, tag }, idx) => (
          <button
            key={idx}
            className="uncond-button"
            onClick={() => handleCategoryClick(idx)}
          >
            <span className="uncond-button-label">{label}</span>
            <span className="uncond-button-tag">{tag}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
