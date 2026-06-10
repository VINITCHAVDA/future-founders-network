function EmptyState({ title, children, action }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">✨</span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}

export default EmptyState
