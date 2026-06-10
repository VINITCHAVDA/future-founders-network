import { Navigate, Outlet } from 'react-router-dom'
import { isAdmin, isAuthenticated } from '../services/authService'

function AdminRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default AdminRoute
