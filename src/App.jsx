import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNav from './components/MyNav'
import AreaRiservata from './components/AreaRiservata'
import Region from './components/Region'
import Login from './components/Login'
import Footer from './components/Footer'
import Material from './components/Material'
import Artifacts from './components/Artifacts'
import Weapon from './components/Weapon'
import Domain from './components/Domain'
import Enemy from './components/Enemy'
import Character from './components/Character'

import Constellation from './components/Constellation'
import SingleCharacter from './components/SingleCharacter'
import MainGoal from './components/MainGoal'
import Goal from './components/Goal'

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
          <Route path="weapon" element={<Weapon />} />
          <Route path="domain" element={<Domain />} />
          <Route path="enemy" element={<Enemy />} />
          <Route path="character" element={<Character />} />
          <Route path="character/:id" element={<SingleCharacter />} />
          <Route path="constellation" element={<Constellation />} />
          <Route path="goals" element={<MainGoal />} />
          <Route path="goals/:id" element={<Goal />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
