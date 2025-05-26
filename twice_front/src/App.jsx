// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MobileLayout from './layouts/MobileLayout.jsx'
import DesktopLayout from './layouts/DesktopLayout.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Cart from './pages/Cart.jsx'
import UserProfile from './pages/UserProfile.jsx'
import WriteStoryPage from './pages/WriteStoryPage.jsx'
import UnconditionalSupportPage from './pages/UnconditionalSupportPage.jsx'
import CategoryDetailPage1 from './pages/CategoryDetailPage1.jsx'
import CategoryDetailPage2 from './pages/CategoryDetailPage2.jsx'
import CategoryDetailPage3 from './pages/CategoryDetailPage3.jsx'
import StoryDetailPage from './pages/StoryDetailPage.jsx'
import MyPage from './pages/MyPage.jsx'
import HomeSendCheer from './components/HomeSendCheer'; // 경로 주의


export default function App() {
  const role = sessionStorage.getItem('role') // 'user' or 'seller'
  const Layout = role === 'user' ? MobileLayout : DesktopLayout

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/write" element={<WriteStoryPage />} />
        <Route path="/support" element={<UnconditionalSupportPage />} />
        <Route path="/support/kind" element={<CategoryDetailPage1 />} />
        <Route path="/support/story" element={<StoryDetailPage />} />
        <Route path="/support/warm" element={<CategoryDetailPage2 />} />
        <Route path="/support/power" element={<CategoryDetailPage3 />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<HomeSendCheer />} />
      </Routes>
    </Layout>
  )
}
