import React from 'react';
import Header from '../components/Header.jsx';

export default function DesktopLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}