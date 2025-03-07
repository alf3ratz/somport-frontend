// components/ProtectedRoute.tsx
import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children?: ReactNode // Явно указываем children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to='/auth' />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
