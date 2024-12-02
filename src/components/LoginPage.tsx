import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Fish from './Fish'

//import './homepage.css'
import './loginpage.css'

const LoginPage: React.FC = () => {
  const fishData = [
    { color: '#1E90FF' },
    { color: '#FF6347' },
    { color: '#32CD32' },
    { color: '#FFD700' },
    { color: '#8A2BE2' },
  ]
  const [username, setUsername] = useState('qw')
  const [password, setPassword] = useState('qw')
  const navigate = useNavigate() // Используем useNavigate

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      // Простой пример проверки логина
      navigate('/home') // Переход на главную страницу
    } else {
      alert('Неверный логин или пароль')
    }
  }

  return (
    <div className='login-page'>
      {/* Блок с рыбами, которые двигаются горизонтально */}
      <div className='fish-background'>
        {fishData.map((fish, index) => (
          <Fish key={index} color={fish.color} />
        ))}
      </div>

      {/* Форма логина */}
      <div className='form-container'>
        <h2>Вход в систему</h2>
        <div>
          <label>
            Логин:
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button onClick={handleLogin}>Войти</button>
      </div>
    </div>
  )
}

export default LoginPage
