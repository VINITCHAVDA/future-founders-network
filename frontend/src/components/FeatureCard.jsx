function FeatureCard({ icon, title, children }) {
  return (
    <article className="feature-card">
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

export default FeatureCard
