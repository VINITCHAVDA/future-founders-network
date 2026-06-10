import api from './api'

const TOKEN_KEY = 'ffn_token'
const USER_KEY = 'ffn_user'

export const saveAuth = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = () => Boolean(getToken())

export const isAdmin = () => getCurrentUser()?.role === 'admin'

export const logout = async () => {
  if (getToken()) {
    await api.post('/logout')
  }

  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
