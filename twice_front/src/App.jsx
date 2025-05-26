import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PopularCheersList from './pages/PopularCheersList'
import PopularCheer from './pages/PopularCheer'
import PersonalCheer from './pages/PersonalCheer'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/popularCheersList" element={<PopularCheersList />} />
        <Route path = "/popularCheer" element = {<PopularCheer />} />
        <Route path = "/personalCheer" element = {<PersonalCheer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
