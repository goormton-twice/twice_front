import React from 'react'
import './CategoryDetailPage.css'
import Before from '../components/before.jsx'
import SupportCard from '../components/SupportCard.jsx'
import GoWriteButton from '../components/GoWriteButton.jsx'

export default function CategoryDetailPage() {
  const categoryLabel1 = '내 편 좀 들어줘'

  return (
    <div className="category-detail-container">
      <Before title="무조건 응원함" />

      <main className="category-detail-main">
        <p className="category-detail-subtitle">
          “{categoryLabel1}”에 대한 응원이에요
        </p>

        <SupportCard />

        <GoWriteButton />
      </main>
    </div>
  )
}
