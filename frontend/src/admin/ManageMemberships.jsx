import { useState } from 'react'
import api, { getApiError } from '../services/api'

function ManageMemberships() {
  const [membershipId, setMembershipId] = useState('')
  const [message, setMessage] = useState('')

  const reviewMembership = async (action) => {
    setMessage('')
    try {
      const response = await api.put(`/admin/memberships/${membershipId}/${action}`)
      setMessage(response.data.message)
      setMembershipId('')
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  return (
    <section className="page-shell narrow">
      <div className="form-card wide">
        <p className="eyebrow">Admin</p>
        <h1>Review memberships</h1>
        <p>Enter a pending membership application ID, then approve or reject it.</p>
        {message && <p className="alert">{message}</p>}
        <label>Membership ID<input value={membershipId} onChange={(e) => setMembershipId(e.target.value)} /></label>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={() => reviewMembership('approve')}>Approve Membership</button>
          <button className="btn btn-ghost" type="button" onClick={() => reviewMembership('reject')}>Reject Membership</button>
        </div>
      </div>
    </section>
  )
}

export default ManageMemberships
