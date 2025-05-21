import React from 'react'

export default function CategoryButton({ label, tag, onClick }) {
  return (
    <button className="uncond-button" onClick={onClick}>
      <span className="uncond-button-label">{label}</span>
      <span className="uncond-button-tag">{tag}</span>
    </button>
  )
}
