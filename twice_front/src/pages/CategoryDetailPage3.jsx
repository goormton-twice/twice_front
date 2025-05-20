import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CategoryDetailPage.css'

export default function CategoryDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="category-detail-container">
      <header className="category-detail-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ◀
        </button>
        <h1 className="category-detail-title">무조건 응원함</h1>
      </header>

      <main className="category-detail-main">
        <p className="category-detail-subtitle">
          “잘하고 있다는 말이 듣고 싶어”에 대한 응원이에요
        </p>

        <div className="category-detail-card">
          <div className="user-info">
            <div className="user-avatar">image</div>
            <span className="user-name">닉네임</span>
            <span className="user-date">05.16</span>
          </div>
          <div className="support-content">
            응원 내용
          </div>
        </div>

        <button
          className="go-write-button"
          onClick={() => navigate('/write')}
        >
          나의 사연에 대해 응원받으러 가기 →
        </button>
      </main>
    </div>
  )
}
