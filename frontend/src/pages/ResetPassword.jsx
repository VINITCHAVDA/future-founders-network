import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import api, { getApiError, getValidationErrors } from '../services/api'

function ResetPassword() {
  const { token } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: searchParams.get('email') || '',
    password: '',
    password_confirmation: '',
  })
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
      token,
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.password_confirmation,
    }

    try {
      const response = await api.post('/reset-password', payload)
      setSuccessMessage(response.data.message || 'Password reset successful. Redirecting to login...')
      setForm({ email: form.email, password: '', password_confirmation: '' })

      setTimeout(() => {
        navigate('/login')
      }, 1100)
    } catch (error) {
      setValidationErrors(getValidationErrors(error))
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page auth-animated">
      <div className="auth-card-wrap compact">
        <div className="auth-copy animate-fade-up stagger-1">
          <p className="eyebrow">Create new password</p>
          <h1>Choose a strong password.</h1>
          <p>
            Use the email that received your reset link and set a new password with at least 8 characters.
          </p>
        </div>

        <form className="form-card auth-card animate-scale-in stagger-2" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">Reset password</p>
          <h2>Update password</h2>

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
            Email Address
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            New Password
            <input name="password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={handleChange} minLength="8" required />
          </label>
          <label>
            Confirm Password
            <input name="password_confirmation" type="password" placeholder="Repeat your new password" value={form.password_confirmation} onChange={handleChange} minLength="8" required />
          </label>

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <p className="auth-switch">Already reset it? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword
