import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { getApiError } from '../services/api'
import { saveAuth } from '../services/authService'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await api.post('/register', form)
      saveAuth(response.data.data)
      navigate('/dashboard')
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Start building</p>
        <h1>Create student account</h1>
        {message && <p className="alert error">{message}</p>}
        <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength="8" required /></label>
        <label>Confirm Password<input type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} minLength="8" required /></label>
        <button className="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        <p>Already a member? <Link to="/login">Login</Link></p>
      </form>
    </section>
  )
}

export default Register
