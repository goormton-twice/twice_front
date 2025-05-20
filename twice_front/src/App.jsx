import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PopularCheers from './pages/PopularCheers'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/popularCheers" element={<PopularCheers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
