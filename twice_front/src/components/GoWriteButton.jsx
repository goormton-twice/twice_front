import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GoWriteButton() {
  const navigate = useNavigate()

  return (
    <button
      className="go-write-button"
      onClick={() => navigate('/write')}
    >
      나의 사연에 대해 응원받으러 가기 →
    </button>
  )
}
