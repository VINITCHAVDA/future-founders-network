import { useState } from 'react'
import api, { getApiError } from '../services/api'

function Membership() {
  const [planName, setPlanName] = useState('Student Founder Membership')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const response = await api.post('/membership/apply', { plan_name: planName })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell narrow">
      <form className="form-card wide" onSubmit={handleSubmit}>
        <p className="eyebrow">Membership</p>
        <h1>Apply for Future Founders membership</h1>
        <p>Membership applications are reviewed by an admin before approval.</p>
        {message && <p className="alert">{message}</p>}
        <label>Plan Name<input value={planName} onChange={(e) => setPlanName(e.target.value)} required /></label>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Applying...' : 'Apply Now'}</button>
      </form>
    </section>
  )
}

export default Membership
