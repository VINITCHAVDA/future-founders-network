import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Chapters', path: '/chapters' },
  { label: 'Events', path: '/events' },
  { label: 'Posts', path: '/posts' },
]

const platformLinks = [
  { label: 'Join Now', path: '/register' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
  { label: 'Community', path: '/posts' },
]

const socialLinks = ['LinkedIn', 'Instagram', 'GitHub']

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-accent-line" aria-hidden="true"></div>

      <div className="footer-grid">
        <section className="footer-card footer-brand-card">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">FFN</span>
            <span>Future Founders Network</span>
          </Link>
          <p>
            A student startup and business networking platform connecting future entrepreneurs, founders, mentors, and communities.
          </p>
          <div className="footer-socials" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a key={social} href="#top" aria-label={`${social} profile`}>
                {social}
              </a>
            ))}
          </div>
        </section>

        <section className="footer-card">
          <h3>Quick Links</h3>
          <nav className="footer-link-list" aria-label="Footer quick links">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.path}>{link.label}</Link>
            ))}
          </nav>
        </section>

        <section className="footer-card">
          <h3>Platform</h3>
          <nav className="footer-link-list" aria-label="Footer platform links">
            {platformLinks.map((link) => (
              <Link key={link.label} to={link.path}>{link.label}</Link>
            ))}
          </nav>
        </section>

        <section className="footer-card">
          <h3>Contact</h3>
          <div className="footer-contact-list">
            <p><span>Email</span> support@futurefounders.com</p>
            <p><span>Location</span> India</p>
          </div>
          <Link className="btn btn-outline footer-cta" to="/register">Join the Network</Link>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Future Founders Network. All rights reserved.</p>
        <p>Learn. Network. Build. Launch.</p>
      </div>
    </footer>
  )
}

export default Footer
