function StatusMessage({ children, type = 'info' }) {
  if (!children) return null

  return <p className={`alert ${type === 'error' ? 'error' : ''}`}>{children}</p>
}

export default StatusMessage
