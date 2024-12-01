import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
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
  )
}

export default LoginPage
