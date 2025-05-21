import React from 'react'

export default function SupportCard({
  avatar = 'image',
  name = '닉네임',
  date = '05.16',
  content = '응원 내용'
}) {
  return (
    <div className="category-detail-card">
      <div className="user-info">
        <div className="user-avatar">{avatar}</div>
        <span className="user-name">{name}</span>
        <span className="user-date">{date}</span>
      </div>
      <div className="support-content">
        {content}
      </div>
    </div>
  )
}
