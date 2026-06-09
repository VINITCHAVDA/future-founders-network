import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import EventCard from '../components/EventCard'
import SectionHeader from '../components/SectionHeader'
import api, { getApiError } from '../services/api'
import { isAuthenticated } from '../services/authService'

const sampleEvents = [
  { id: 'event-1', title: 'Founder Mixer Night', description: 'A relaxed networking night for students looking for collaborators and early feedback.', event_date: '2026-07-10', event_time: '18:00', location: 'Campus Innovation Hub', status: 'upcoming', type: 'Networking' },
  { id: 'event-2', title: 'MVP Launch Workshop', description: 'Learn how to scope, validate, and ship a simple version of your idea in two weeks.', event_date: '2026-07-18', event_time: '16:30', location: 'Startup Lab', status: 'upcoming', type: 'Workshop' },
  { id: 'event-3', title: 'Pitch Practice Studio', description: 'Get peer and mentor feedback on your startup story, problem, solution, and ask.', event_date: '2026-07-25', event_time: '17:00', location: 'Business School Hall', status: 'upcoming', type: 'Pitch' },
  { id: 'event-4', title: 'Spring Demo Day', description: 'Student teams showcase validated ideas, MVPs, and customer traction from the semester.', event_date: '2026-05-20', event_time: '15:00', location: 'Auditorium', status: 'completed', type: 'Demo Day' },
]

function Events() {
  const [events, setEvents] = useState(sampleEvents)
  const [filter, setFilter] = useState('all')
  const [message, setMessage] = useState('')
  const [registeringId, setRegisteringId] = useState(null)

  useEffect(() => {
    api.get('/events')
      .then((response) => setEvents(response.data.data.length ? response.data.data : sampleEvents))
      .catch(() => setMessage('Showing sample events. Start the Laravel API to load live event data.'))
  }, [])

  const visibleEvents = useMemo(() => {
    if (filter === 'all') return events
    return events.filter((event) => event.status === filter)
  }, [events, filter])

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
    <section className="page-shell animate-fade-up">
      <div className="directory-header animate-fade-up stagger-1">
        <SectionHeader eyebrow="Events" title="Attend high-signal startup events">
          Join workshops, mixers, pitch studios, mentor sessions, and demo days designed for student founders.
        </SectionHeader>
        <div className="filter-pills animate-scale-in stagger-2" aria-label="Filter events">
          {['all', 'upcoming', 'completed'].map((item) => (
            <button className={filter === item ? 'active' : ''} key={item} type="button" onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {message && <p className="alert">{message}</p>}

      {visibleEvents.length ? (
        <div className="grid three directory-grid">
          {visibleEvents.map((event, index) => (
            <EventCard key={event.id} event={event} onRegister={handleRegister} registering={registeringId === event.id} animationClass={`stagger-${(index % 4) + 1}`} />
          ))}
        </div>
      ) : (
        <EmptyState title="No events in this category">Try another filter or check back soon.</EmptyState>
      )}
    </section>
  )
}

export default Events
