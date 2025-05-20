import React, { useEffect, useState } from 'react';
import '../styles/ImageSlider.css';

export default function AdComponent({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="ad-image-container">
      <div className="slider-image-container">
        <img
          src={images[currentIndex].src}
          alt={`Ad ${images[currentIndex].id}`}
          className="ad-image"
        />
        <div className="slider-image-index">
          {images.map((img, i) => (
            <div key={img.id} className={`slider-circle ${i === currentIndex ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}