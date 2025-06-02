import React from "react";

import { useNavigate } from 'react-router-dom'
import './UnconditionalSupportPage.css'
import Footer from "../components/Footer";
import Category from "../components/Category";

const categories = [
  { label: '내 편 좀 들어줘', tag: '#다정한', idx: 1 },
  { label: '위로가 필요해', tag: '#따뜻한', idx: 2 },
  { label: '잘하고 있다는 말이 듣고 싶어', tag: '#든든한', idx: 3 },
]

export default function UnconditionalSupportPage() {
  const navigate = useNavigate()

  const handleCategoryClick = (idx) => {
    if (idx === 1) {
      navigate('/support/kind')
      // categoryId == 1
    } else if (idx === 2) {
      navigate('/support/warm')
      // categoryId == 2
    } else {
      navigate('/support/power')
      // categoryId == 3
    }
  }

  return (
    <div className="uncond-container">
      <h1 className="uncond-title" >무조건 응원함</h1>
      <p className="uncond-subtitle">
        응원 받고 싶은 <br></br>
        카테고리를 선택해주세요
      </p>
      <div className="uncond-buttons">
        {categories.map(({ label, tag, idx }) => (
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
      <Footer />
    </div>
  )
}
