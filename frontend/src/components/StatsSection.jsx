const stats = [
  { value: '2,400+', label: 'Students', icon: '🎓' },
  { value: '35+', label: 'Chapters', icon: '🌐' },
  { value: '120+', label: 'Events', icon: '🎤' },
  { value: '850+', label: 'Posts', icon: '📝' },
]

function StatsSection() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <div className="stats-header">
        <p className="eyebrow">Community growth</p>
        <h2 id="stats-heading">Growing Future Founders Community</h2>
        <p>
          Connecting students, entrepreneurs, mentors, and startup communities across India.
        </p>
      </div>

      <div className="stats-cards" aria-label="Future Founders Network statistics">
        {stats.map((stat, index) => (
          <article className={`stat-card pro-stat-card animate-scale-in stagger-${index + 1}`} key={stat.label}>
            <span className="stat-icon" aria-hidden="true">{stat.icon}</span>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
