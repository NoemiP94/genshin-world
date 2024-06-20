import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNav from './components/MyNav'
import AreaRiservata from './components/AreaRiservata'
import Region from './components/Region'
import Login from './components/Login'
import Footer from './components/Footer'
import Material from './components/Material'
import Artifacts from './components/Artifacts'

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/reserved/*" element={<AreaRiservata />}>
          {/* Nested route */}
          <Route path="region" element={<Region />} />
          <Route path="material" element={<Material />} />
          <Route path="artifacts" element={<Artifacts />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
