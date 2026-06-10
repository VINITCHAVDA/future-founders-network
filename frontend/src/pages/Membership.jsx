import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import StatusMessage from '../components/StatusMessage'
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
        <PageHeader eyebrow="Membership" title="Apply for Future Founders membership">
          Membership applications are reviewed by an admin before approval.
        </PageHeader>
        <StatusMessage>{message}</StatusMessage>
        <label>Plan Name<input value={planName} onChange={(e) => setPlanName(e.target.value)} required /></label>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Applying...' : 'Apply Now'}</button>
      </form>
    </section>
  )
}

export default Membership
