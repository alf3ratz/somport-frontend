// App.tsx
import React, { useEffect, useRef } from 'react';

import VideoStream from './components/VideoStream';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    // <div style={{ textAlign: 'center', marginTop: '50px' }}>
    //     <h1>Video Stream</h1>
    //     <VideoPlayer />
    // </div>
    // <Router basename="/somport-frontend">
    //   <Routes>
    //     <Route path='/' element={<LoginPage />} />
    //     <Route path='/home' element={<HomePage />} />
    //   </Routes>
    // </Router>
    // <AuthProvider> {/* Теперь с корректной типизацией */}
    //   <Router>
    //     <Routes>
    //       <Route 
    //         path="/" 
    //         element={
    //           <ProtectedRoute>
    //             <Dashboard />
    //           </ProtectedRoute>
    //         } 
    //       />
    //       <Route path="/auth" element={<AuthPage />} />
    //     </Routes>
    //   </Router>
    // </AuthProvider>
    <Router basename="/">
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/home' element={<Dashboard />} />
        <Route path='/video' element={<VideoStream />} />
      </Routes>
</Router>
);
}

export default App;