import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/somport-frontend/' element={<LoginPage />} />
        <Route path='/somport-frontend/home' element={<HomePage />} />
      </Routes>
    </Router>
  )
}
//ds

export default App
