import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { API_BASE_URL, getApiError, getValidationErrors } from '../services/api'
import { saveAuth } from '../services/authService'

const initialForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setValidationErrors([])
    setSuccessMessage('')

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.password_confirmation,
    }

    console.log('Register API request:', { url: `${API_BASE_URL}/register`, method: 'POST', payload })

    try {
      const response = await api.post('/register', payload)
      console.log('Register API response:', response.data)

      saveAuth(response.data.data)
      setSuccessMessage('Registration successful. Redirecting to your dashboard...')
      setForm(initialForm)

      setTimeout(() => {
        navigate('/dashboard')
      }, 900)
    } catch (error) {
      console.log('Register API error:', error?.response?.data || error.message)
      setValidationErrors(getValidationErrors(error))
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page auth-animated">
      <div className="auth-card-wrap">
        <div className="auth-copy animate-fade-up stagger-1">
          <p className="eyebrow">Join the network</p>
          <h1>Create your founder profile.</h1>
          <p>
            Register to join chapters, attend events, publish startup updates, and connect with ambitious student founders.
          </p>
          <div className="auth-benefits">
            <span>✓ Student founder profile</span>
            <span>✓ Chapter and event access</span>
            <span>✓ Community posts and membership</span>
          </div>
        </div>

        <form className="form-card auth-card animate-scale-in stagger-2" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">Start building</p>
          <h2>Create student account</h2>

          {successMessage && <p className="alert success">{successMessage}</p>}
          {message && !validationErrors.length && <p className="alert error">{message}</p>}
          {validationErrors.length > 0 && (
            <div className="alert error validation-box">
              <strong>Please fix these details:</strong>
              <ul>
                {validationErrors.map((errorText) => <li key={errorText}>{errorText}</li>)}
              </ul>
            </div>
          )}

          <label>
            Full Name
            <input name="name" placeholder="Ava Johnson" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email Address
            <input name="email" type="email" placeholder="ava@example.com" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={handleChange} minLength="8" required />
          </label>
          <label>
            Confirm Password
            <input name="password_confirmation" type="password" placeholder="Repeat your password" value={form.password_confirmation} onChange={handleChange} minLength="8" required />
          </label>

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
          <p className="auth-switch">Already a member? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Register
