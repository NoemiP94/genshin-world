import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNav from './components/MyNav'
import AreaRiservata from './components/AreaRiservata'
import Region from './components/Region'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/reserved/*" element={<AreaRiservata />}>
          <Route path="region" element={<Region />} /> {/* Nested route */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
