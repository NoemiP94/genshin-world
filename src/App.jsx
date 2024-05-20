import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNav from './components/MyNav'

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes></Routes>
    </BrowserRouter>
  )
}

export default App
