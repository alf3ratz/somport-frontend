// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react'

import { User } from '../types/auth.types'

interface AuthContextProps {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

// Явно объявляем пропсы с children
interface AuthProviderProps {
  children: ReactNode // Используем ReactNode из 'react'
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string) => {
    const fakeUser = { username }
    localStorage.setItem('user', JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const register = async (username: string, password: string) => {
    const fakeUser = { username }
    localStorage.setItem('user', JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}
