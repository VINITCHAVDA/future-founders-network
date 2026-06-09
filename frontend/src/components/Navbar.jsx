import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearAuth, getCurrentUser, isAuthenticated, isAdmin, logout } from '../services/authService'

function Navbar() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const menuId = 'primary-navigation'
  const navClass = (staggerClass) => ({ isActive }) => `${staggerClass} ${isActive ? 'active' : ''}`

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      clearAuth()
    }

    closeMenu()
    navigate('/login')
  }

  return (
    <header className="navbar animate-slide-down">
      <Link className="brand brand-animated" to="/" onClick={closeMenu}>
        <span className="brand-mark">FFN</span>
        <span>Future Founders Network</span>
      </Link>

      <button
        aria-label="Toggle navigation menu"
        aria-controls={menuId}
        aria-expanded={menuOpen}
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-panel ${menuOpen ? 'open' : ''}`} id={menuId}>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink className={navClass('stagger-1')} to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink className={navClass('stagger-2')} to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink className={navClass('stagger-3')} to="/chapters" onClick={closeMenu}>Chapters</NavLink>
          <NavLink className={navClass('stagger-4')} to="/events" onClick={closeMenu}>Events</NavLink>
          <NavLink className={navClass('stagger-4')} to="/posts" onClick={closeMenu}>Posts</NavLink>
          {isAuthenticated() && (
            <>
              <NavLink className={navClass('stagger-1')} to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
              <NavLink className={navClass('stagger-2')} to="/membership" onClick={closeMenu}>Membership</NavLink>
              <NavLink className={navClass('stagger-3')} to="/profile" onClick={closeMenu}>Profile</NavLink>
            </>
          )}
          {isAdmin() && <NavLink className={navClass('stagger-4')} to="/admin/dashboard" onClick={closeMenu}>Admin</NavLink>}
        </nav>

        <div className="nav-actions">
          {isAuthenticated() ? (
            <>
              <span className="user-pill">{user?.name || 'Member'}</span>
              <button className="btn btn-ghost" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost" to="/login" onClick={closeMenu}>Login</Link>
              <Link className="btn btn-primary" to="/register" onClick={closeMenu}>Join Now</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
