import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer site-footer">
      <div>
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark">FFN</span>
          <span>Future Founders Network</span>
        </Link>
        <p>Professional networking, events, chapters, and startup support for student founders.</p>
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/chapters">Chapters</Link>
        <Link to="/events">Events</Link>
        <Link to="/posts">Posts</Link>
      </div>
      <p>© 2026 Future Founders Network. Learn. Network. Build. Launch.</p>
    </footer>
  )
}

export default Footer
