import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import api, { getApiError } from '../services/api'
import { isAuthenticated } from '../services/authService'

function Events() {
  const [events, setEvents] = useState([])
  const [message, setMessage] = useState('')
  const [registeringId, setRegisteringId] = useState(null)

  useEffect(() => {
    api.get('/events').then((response) => setEvents(response.data.data))
  }, [])

  const handleRegister = async (id) => {
    if (!isAuthenticated()) {
      setMessage('Please login before registering for an event.')
      return
    }

    setRegisteringId(id)
    setMessage('')
    try {
      const response = await api.post(`/events/${id}/register`)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setRegisteringId(null)
    }
  }

  return (
    <section className="page-shell">
      <p className="eyebrow">Events</p>
      <h1>Register for startup events</h1>
      {message && <p className="alert">{message}</p>}
      <div className="grid three">
        {events.map((event) => <EventCard key={event.id} event={event} onRegister={handleRegister} registering={registeringId === event.id} />)}
      </div>
    </section>
  )
}

export default Events
