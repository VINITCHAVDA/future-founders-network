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
      console.log('Login API response:', response.data)
      saveAuth(response.data.data)
      const user = response.data.data.user
      navigate(location.state?.from?.pathname || (user.role === 'admin' ? '/admin/dashboard' : '/dashboard'))
    } catch (error) {
      console.log('Login API error:', error?.response?.data || error.message)
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page auth-animated">
      <div className="auth-card-wrap compact">
        <div className="auth-copy animate-fade-up stagger-1">
          <p className="eyebrow">Welcome back</p>
          <h1>Login to your network.</h1>
          <p>Access your dashboard, profile, events, chapters, posts, and membership tools.</p>
        </div>

        <form className="form-card auth-card animate-scale-in stagger-2" onSubmit={handleSubmit}>
          <p className="eyebrow">Sign in</p>
          <h2>Login</h2>
          {message && <p className="alert error">{message}</p>}
          <label>
            Email Address
            <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <div className="auth-form-meta">
            <Link className="auth-inline-link" to="/forgot-password">Forgot Password?</Link>
          </div>
          <button className="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Login
