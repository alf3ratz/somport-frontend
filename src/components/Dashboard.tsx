// pages/Dashboard.tsx
import React from 'react'

import { useAuth } from '../hooks/useAuth'

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className='dashboard'>
      <h1>Добро пожаловать, {user?.username}!</h1>
      <button onClick={logout} className='btn-secondary'>
        Выйти
      </button>
    </div>
  )
}

export default Dashboard
