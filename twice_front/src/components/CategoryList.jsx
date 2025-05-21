import React from 'react'
import CategoryButton from './CategoryButton.jsx'

export default function CategoryList({ categories, onCategoryClick }) {
  return (
    <div className="uncond-buttons">
      {categories.map(({ label, tag }, idx) => (
        <CategoryButton
          key={idx}
          label={label}
          tag={tag}
          onClick={() => onCategoryClick(idx)}
        />
      ))}
    </div>
  )
}
