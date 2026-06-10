function FeatureCard({ icon, title, children, animationClass = '' }) {
  return (
    <article className={`feature-card animate-scale-in ${animationClass}`}>
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

export default FeatureCard
