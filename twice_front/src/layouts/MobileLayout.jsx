import React from 'react';
import Header from '../components/Header.jsx';
import BottomNav from '../components/BottomNav.jsx';

export default function MobileLayout({ children }) {
  return (
    <div className="mobile-container">
      <Header />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}