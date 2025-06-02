// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PopularCheersList from './pages/PopularCheersList'
import PopularCheer from './pages/PopularCheer'
import PersonalCheer from './pages/PersonalCheer'
import MobileLayout from './layouts/MobileLayout.jsx'
import DesktopLayout from './layouts/DesktopLayout.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Signup from './pages/Signup.jsx'
import Cart from './pages/Cart.jsx'
import UserProfile from './pages/UserProfile.jsx'
import UnconditionalSupportPage from './pages/UnconditionalSupportPage.jsx'
import CategoryDetailPage1 from './pages/CategoryDetailPage1.jsx'
import CategoryDetailPage2 from './pages/CategoryDetailPage2.jsx'
import CategoryDetailPage3 from './pages/CategoryDetailPage3.jsx'
import StoryDetailPage from './pages/StoryDetailPage.jsx'
import MyPage from './pages/MyPage.jsx'
import MySupportsPage from "./pages/MySupportsPage";
import WriteCheer from './pages/WriteCheer.jsx'
import MyCheer from './pages/MyCheer.jsx'
import AuthForm from './components/AuthForm';

export default function App() {
  const role = sessionStorage.getItem('role') // 'user' or 'seller'
  const Layout = role === 'user' ? MobileLayout : DesktopLayout

  return (  
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/support" element={<UnconditionalSupportPage />} />
        <Route path="/support/kind" element={<CategoryDetailPage1 />} />
        <Route path="/support/warm" element={<CategoryDetailPage2 />} />
        <Route path="/support/power" element={<CategoryDetailPage3 />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/popularCheersList" element={<PopularCheersList />} />
        <Route path = "/popularCheer" element = {<PopularCheer />} />
        <Route path = "/personalCheer" element = {<PersonalCheer />} />
        <Route path="/writeCheer" element={<WriteCheer />}></Route>
        <Route path="/myCheer" element={<MyCheer />}></Route>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/stories/:storyId" element={<StoryDetailPage />} />
        <Route path="/mysupports" element={<MySupportsPage />} />
      </Routes>
      )
    }
