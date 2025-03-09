import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from '../services/AuthService'

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { accessToken } = await AuthService.login(username, password)
      localStorage.setItem('authToken', accessToken)
      navigate('/home')
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { accessToken } = await AuthService.register(username, password)
      localStorage.setItem('authToken', accessToken)
      navigate('/home')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form>
        <div className='form-group'>
          <label>Имя пользователя</label>
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Пароль</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button onClick={handleLogin}>{'Войти'}</button>
        <label onClick={handleRegister}>{'Зарегистрироваться'}</label>
      </form>
    </div>
  )
}
export default AuthPage
