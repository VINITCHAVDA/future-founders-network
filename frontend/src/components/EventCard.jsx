function EventCard({ event, onRegister, registering }) {
  const date = event.event_date ? new Date(event.event_date).toLocaleDateString() : 'Date coming soon'

  return (
    <article className="card event-card">
      <div className="card-topline">
        <span className="badge">{event.status || 'upcoming'}</span>
        <span>{event.chapter?.name || 'Future Founders'}</span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <div className="meta-grid">
        <span>📅 {date}</span>
        <span>⏰ {event.event_time || 'TBA'}</span>
        <span>📍 {event.location}</span>
      </div>
      {onRegister && (
        <button className="btn btn-primary" type="button" onClick={() => onRegister(event.id)} disabled={registering}>
          {registering ? 'Registering...' : 'Register Event'}
        </button>
      )}
    </article>
  )
}

export default EventCard
