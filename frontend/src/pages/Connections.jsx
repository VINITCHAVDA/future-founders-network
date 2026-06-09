import { useState } from 'react'
import api, { getApiError } from '../services/api'

function Connections() {
  const [receiverId, setReceiverId] = useState('')
  const [connectionId, setConnectionId] = useState('')
  const [message, setMessage] = useState('')

  const sendConnection = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      const response = await api.post(`/connections/send/${receiverId}`)
      setMessage(response.data.message)
      setReceiverId('')
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  const updateConnection = async (status) => {
    setMessage('')
    try {
      const response = await api.post(`/connections/${status}/${connectionId}`)
      setMessage(response.data.message)
      setConnectionId('')
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  return (
    <section className="page-shell narrow">
      <p className="eyebrow">Connections</p>
      <h1>Build your student founder network</h1>
      {message && <p className="alert">{message}</p>}
      <div className="card-stack">
        <form className="form-card wide" onSubmit={sendConnection}>
          <h2>Send connection request</h2>
          <p>Enter a student user ID from your API dataset or admin users list.</p>
          <label>Receiver User ID<input value={receiverId} onChange={(e) => setReceiverId(e.target.value)} required /></label>
          <button className="btn btn-primary" type="submit">Send Request</button>
        </form>
        <div className="form-card wide">
          <h2>Respond to request</h2>
          <label>Connection Request ID<input value={connectionId} onChange={(e) => setConnectionId(e.target.value)} /></label>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={() => updateConnection('accept')}>Accept</button>
            <button className="btn btn-ghost" type="button" onClick={() => updateConnection('reject')}>Reject</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Connections
