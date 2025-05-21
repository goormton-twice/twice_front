import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ title }) {
  const navigate = useNavigate()

  return (
    <header className="category-detail-header">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ◀
      </button>
      <h1 className="category-detail-title">{title}</h1>
    </header>
  )
}
