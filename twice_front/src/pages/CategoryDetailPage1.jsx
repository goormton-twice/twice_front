import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CategoryDetailPage.css'
import Arrow from '../components/Arrow.jsx'
import Modal from '../components/Modal.jsx'

export default function CategoryDetailPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // 응원 개수 (실제로는 props나 API에서 받아올 값)
  const supportCount = 3 // 예시값
  const minSupportCount = 3 // 최소 필요 응원 개수
  
  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleWriteStory = (e) => {
    e.stopPropagation()
    navigate('/write')
  }

  const handleViewSupport = () => {
    setIsModalOpen(false)
    navigate('/support/story')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const isButtonDisabled = supportCount < minSupportCount

  return (
    <div className="category-detail-container">
      <header className="category-detail-header">
        <button className="back-button" onClick={() => navigate('/support')}>
          <Arrow />
        </button>
        <h1 className="category-detail-title">무조건 응원함</h1>
      </header>

      <main className="category-detail-main">
        <p className="category-detail-subtitle">
          "내 편 좀 들어줘"에 대한 응원이에요
        </p>

        <div
          className="category-detail-card"
          onClick={handleCardClick}
          style={{ cursor: 'pointer' }}
        >
          <div className="user-info">
            <div className="user-avatar">닉네임</div>
            <span className="user-name">닉네임</span>
            <span className="user-date">05.16</span>
          </div>

          <div className="support-content collapsed">
            나 여기 있어. 괜찮아, 오늘은 그냥 나한테 기대도 돼. 
            아무 말 안 해도 돼. 너한테 꼭 해주고 싶은 말은 이거야. 
            너가 누구보다 열심히 살아오고 있다는 거 알아. 
            잠깐 멈춰서 쉬는 것도, 울고 싶은 것도 다 괜찮은 일이야. 
            그리고 너, 정말 괜찮은 사람이야.
            <br /><br />
            이 순간도 결국 지나가고, 나는 그 끝에서 너가 다시 웃을 수 있을 거라는 걸 믿어. 
            너 혼자 아니야. 나 계속 옆에 있을게.
            <br /><br />
            시 옷을 수 있을 거라는 걸 믿어. 너 혼자 아니야.
          </div>

          <button
            className="toggle-button"
            onClick={(e) => {
              e.stopPropagation()
              handleCardClick()
            }}
          >
            ...더보기
          </button>

          <div className="detail-actions">
            <button
              className={`write-story-button ${isButtonDisabled ? 'disabled' : ''}`}
              onClick={handleWriteStory}
              disabled={isButtonDisabled}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              나의 사연 쓰고 응원받으러 가기 →
              {isButtonDisabled && (
                <img
                  src="../icons/lock.png"
                  alt="잠금"
                  style={{ width: '20px', height: '20px', marginLeft: '8px' }}
                />
              )}
            </button>

          </div>
        </div>
      </main>

      {/* 모달 팝업 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-card">
          <div className="user-info">
            <div className="user-avatar">닉네임</div>
            <span className="user-name">닉네임</span>
            <span className="user-date">05.16</span>
          </div>

          <div className="support-content expanded">
            나 여기 있어. 괜찮아, 오늘은 그냥 나한테 기대도 돼. 
            아무 말 안 해도 돼. 너한테 꼭 해주고 싶은 말은 이거야. 
            너가 누구보다 열심히 살아오고 있다는 거 알아. 
            잠깐 멈춰서 쉬는 것도, 울고 싶은 것도 다 괜찮은 일이야. 
            그리고 너, 정말 괜찮은 사람이야.
            <br /><br />
            이 순간도 결국 지나가고, 나는 그 끝에서 너가 다시 웃을 수 있을 거라는 걸 믿어. 
            너 혼자 아니야. 나 계속 옆에 있을게.
            <br /><br />
            시 옷을 수 있을 거라는 걸 믿어. 너 혼자 아니야.
          </div>

          <div className="modal-actions">
            <button
              className="view-support-button"
              onClick={handleViewSupport}
            >
              응원에 대한 사연 보러가기 →
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
