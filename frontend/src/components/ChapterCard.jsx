function ChapterCard({ chapter, onJoin, joining }) {
  return (
    <article className="card chapter-card">
      <div className="card-topline">
        <span className="badge">{chapter.status || 'active'}</span>
        <span>{chapter.city}</span>
      </div>
      <h3>{chapter.name}</h3>
      <p>{chapter.description}</p>
      <div className="meta-grid">
        <span>🎤 {chapter.events_count ?? 0} events</span>
        <span>🤝 {chapter.chapter_members_count ?? 0} members</span>
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
