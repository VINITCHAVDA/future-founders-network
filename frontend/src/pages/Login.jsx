import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api, { getApiError } from '../services/api'
import { saveAuth } from '../services/authService'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await api.post('/login', form)
      saveAuth(response.data.data)
      const user = response.data.data.user
      navigate(location.state?.from?.pathname || (user.role === 'admin' ? '/admin/dashboard' : '/dashboard'))
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        {message && <p className="alert error">{message}</p>}
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <button className="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <p>New here? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  )
}

export default Login
