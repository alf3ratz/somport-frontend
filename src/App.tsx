import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'

const App: React.FC = () => {
  return (
    <Router basename="/somport-frontend">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </Router>
  )
}
//ds

export default App
