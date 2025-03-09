// pages/AuthPage.tsx
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

enum AuthMode {
  LOGIN = 'login',
  REGISTER = 'register',
}

const AuthPageOld: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === AuthMode.LOGIN) {
      await login(username, password)
    } else {
      await register(username, password)
    }

    navigate('/')
  }

  return (
    <div className='auth-container'>
      <div className='auth-mode-toggle'>
        <button className={mode === AuthMode.LOGIN ? 'active' : ''} onClick={() => setMode(AuthMode.LOGIN)}>
          Вход
        </button>
        <button className={mode === AuthMode.REGISTER ? 'active' : ''} onClick={() => setMode(AuthMode.REGISTER)}>
          Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Имя пользователя</label>
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Пароль</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='btn-primary'>
          {mode === AuthMode.LOGIN ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}

export default AuthPageOld
