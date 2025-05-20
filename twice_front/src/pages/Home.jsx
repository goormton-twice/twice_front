import React from 'react';
import AdComponent from '../components/AdComponent.jsx';

const sampleImages = [
  { id: 1, src: '/ads/ad1.jpg' },
  { id: 2, src: '/ads/ad2.jpg' },
  { id: 3, src: '/ads/ad3.jpg' },
];

export default function Home() {
  return (
    <div>
      <AdComponent images={sampleImages} />
      <h2>환영합니다!</h2>
      <p>홈페이지 콘텐츠를 여기에 추가하세요.</p>
    </div>
  );
}