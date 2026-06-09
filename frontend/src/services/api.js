import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ffn_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const getApiError = (error) => {
  return error?.response?.data?.message || 'Something went wrong. Please try again.'
}

export default api
