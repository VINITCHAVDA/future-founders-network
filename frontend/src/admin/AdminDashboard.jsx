import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/admin/dashboard').then((response) => setStats(response.data.data))
  }, [])

  if (!stats) return <section className="page-shell"><p>Loading admin dashboard...</p></section>

  return (
    <section className="page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Platform overview</h1>
      <div className="stats-grid">
        <div className="stat-card"><strong>{stats.total_users}</strong><span>Total users</span></div>
        <div className="stat-card"><strong>{stats.total_chapters}</strong><span>Total chapters</span></div>
        <div className="stat-card"><strong>{stats.total_events}</strong><span>Total events</span></div>
        <div className="stat-card"><strong>{stats.total_posts}</strong><span>Total posts</span></div>
        <div className="stat-card"><strong>{stats.pending_memberships}</strong><span>Pending memberships</span></div>
        <div className="stat-card"><strong>{stats.pending_posts}</strong><span>Pending posts</span></div>
      </div>
      <div className="admin-menu">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/chapters">Manage Chapters</Link>
        <Link to="/admin/events">Manage Events</Link>
        <Link to="/admin/posts">Manage Posts</Link>
        <Link to="/admin/memberships">Manage Memberships</Link>
      </div>
    </section>
  )
}

export default AdminDashboard
