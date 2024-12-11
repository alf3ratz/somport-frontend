import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppLayout from './components/Layout'

import Home from './pages/Users'

import Users from './pages/Users'

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
