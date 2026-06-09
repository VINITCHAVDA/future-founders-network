function ChapterCard({ chapter, onJoin, joining }) {
  return (
    <article className="card chapter-card professional-card">
      <div className="card-topline">
        <span className="badge badge-gold">{chapter.status || 'active'}</span>
        <span className="card-location">📍 {chapter.city || 'Global'}</span>
      </div>
      <h3>{chapter.name}</h3>
      <p>{chapter.description || 'A student-led community for founders, creators, and business builders.'}</p>
      <div className="metric-row">
        <span><strong>{chapter.chapter_members_count ?? chapter.members_count ?? 0}</strong> members</span>
        <span><strong>{chapter.events_count ?? 0}</strong> events</span>
      </div>
      {onJoin && (
        <button className="btn btn-primary" type="button" onClick={() => onJoin(chapter.id)} disabled={joining}>
          {joining ? 'Joining...' : 'Join Chapter'}
        </button>
      )}
    </article>
  )
}

export default ChapterCard
