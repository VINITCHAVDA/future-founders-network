import { Link } from 'react-router-dom'

function FloatingBubble() {
  return (
    <Link className="floating-bubble" to="/register" aria-label="Join Future Founders">
      <span className="floating-bubble-icon" aria-hidden="true">🚀</span>
      <span className="floating-bubble-tooltip" role="tooltip">Join Future Founders</span>
    </Link>
  )
}

export default FloatingBubble
