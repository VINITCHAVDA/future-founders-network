import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearAuth, getCurrentUser, isAuthenticated, isAdmin, logout } from '../services/authService'

function Navbar() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      clearAuth()
    }

    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">FFN</span>
        <span>Future Founders Network</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/chapters">Chapters</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        {isAuthenticated() && <NavLink to="/dashboard">Dashboard</NavLink>}
        {isAdmin() && <NavLink to="/admin/dashboard">Admin</NavLink>}
      </nav>

      <div className="nav-actions">
        {isAuthenticated() ? (
          <>
            <span className="user-pill">{user?.name}</span>
            <button className="btn btn-ghost" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Join Now</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
