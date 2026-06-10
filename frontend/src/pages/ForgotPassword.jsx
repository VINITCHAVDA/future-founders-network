import { useState } from 'react'
import { Link } from 'react-router-dom'
import api, { getApiError, getValidationErrors } from '../services/api'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setValidationErrors([])
    setSuccessMessage('')

    try {
      const response = await api.post('/forgot-password', { email: email.trim() })
      setSuccessMessage(response.data.message || 'Password reset link sent. Please check your email.')
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
          <p className="eyebrow">Account recovery</p>
          <h1>Reset your password securely.</h1>
          <p>
            Enter your registered email and we will send a password reset link that opens the Future Founders Network reset page.
          </p>
        </div>

        <form className="form-card auth-card animate-scale-in stagger-2" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">Forgot password</p>
          <h2>Send reset link</h2>

          {successMessage && <p className="alert success">{successMessage}</p>}
          {message && !validationErrors.length && <p className="alert error">{message}</p>}
          {validationErrors.length > 0 && (
            <div className="alert error validation-box">
              <strong>Please check this email:</strong>
              <ul>
                {validationErrors.map((errorText) => <li key={errorText}>{errorText}</li>)}
              </ul>
            </div>
          )}

          <label>
            Email Address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <p className="auth-switch">Remember your password? <Link to="/login">Back to login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassword
