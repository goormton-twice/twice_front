import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PopularCheersList from './pages/PopularCheersList'
import PopularCheer from './pages/PopularCheer'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/popularCheersList" element={<PopularCheersList />} />
        <Route path = "/popularCheer" element = {<PopularCheer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
