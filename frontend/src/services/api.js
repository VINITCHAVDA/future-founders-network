import axios from 'axios'

export const API_BASE_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ffn_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const getValidationErrors = (error) => {
  const data = error?.response?.data?.data || error?.response?.data?.errors

  if (!data || typeof data !== 'object') {
    return []
  }

  return Object.entries(data).flatMap(([field, messages]) => {
    if (Array.isArray(messages)) {
      return messages.map((message) => `${field.replaceAll('_', ' ')}: ${message}`)
    }

    return [`${field.replaceAll('_', ' ')}: ${messages}`]
  })
}

export const getApiError = (error) => {
  if (!error?.response) {
    return 'Server is not running. Please try again later.'
  }

  const validationErrors = getValidationErrors(error)

  if (validationErrors.length > 0) {
    return validationErrors.join('\n')
  }

  return error.response?.data?.message || 'Something went wrong. Please try again.'
}

export default api
