function EventCard({ event, onRegister, registering, animationClass = '' }) {
  const date = event.event_date ? new Date(event.event_date).toLocaleDateString() : 'Date coming soon'
  const isPast = event.status === 'completed'

  return (
    <article className={`card event-card professional-card animate-scale-in ${isPast ? 'is-past' : ''} ${animationClass}`}>
      <div className="card-topline">
        <span className={`badge ${isPast ? 'badge-muted' : 'badge-gold'}`}>{event.status || 'upcoming'}</span>
        <span>{event.type || event.chapter?.name || 'Founder Event'}</span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description || 'A curated event for learning, networking, and startup growth.'}</p>
      <div className="event-meta">
        <span>📅 {date}</span>
        <span>⏰ {event.event_time || 'TBA'}</span>
        <span>📍 {event.location || 'Online / Campus'}</span>
      </div>
      {onRegister && (
        <button className="btn btn-primary" type="button" onClick={() => onRegister(event.id)} disabled={registering || isPast}>
          {isPast ? 'View Details' : registering ? 'Registering...' : 'Register / View Details'}
        </button>
      )}
    </article>
  )
}

export default EventCard
