import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Fish from './Fish'
import './loginpage.css'

const LoginPage: React.FC = () => {
  const fishData = []
  // const fishData = [
  //   { color: '#1E90FF' },
  //   { color: '#FF6347' },
  //   { color: '#32CD32' },
  //   { color: '#FFD700' },
  //   { color: '#8A2BE2' },
  // ]
  for (let i = 0; i < 100; i++) {
    fishData.push({ color: '#1E90FF' })
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const apiUrl = 'http://localhost:8080'

  // Функция для отправки запроса на сервер для проверки логина и пароля
  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()
      if (data.message !== null && !response.ok) {
        alert(data.message)
      }
      // Проверка ответа API
      if (response.ok && data.username !== null) {
        navigate('/home')
      }
    } catch (err) {
      alert('Ошибка')
    }
  }

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при подключении к серверу')
      }

      const data = await response.json()
      if (data.message !== null && !response.ok) {
        alert(data.message)
      }
      // Проверка ответа API
      if (response.ok && data.username !== null) {
        navigate('/home')
      }
    } catch (err) {
      alert('Ошибка')
    }
  }

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-green-100 to-green-300'>
      {/* Фон с рыбами */}
      <div className='absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden'>
        {fishData.map((fish, index) => (
          <Fish key={index} color={fish.color} />
        ))}
      </div>

      {/* Форма логина */}
      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='bg-white p-8 rounded-lg shadow-xl w-96 max-w-full'>
          <h2 className='text-2xl font-semibold text-center mb-6 text-indigo-600'>Вход в систему</h2>

          <div className='mb-4'>
            <label className='block text-gray-700 font-medium' htmlFor='username'>
              Логин:
            </label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 font-medium' htmlFor='password'>
              Пароль:
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <button
            onClick={handleLogin}
            className='w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            Войти
          </button>
          <button
            onClick={handleRegister}
            className='w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4'
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
