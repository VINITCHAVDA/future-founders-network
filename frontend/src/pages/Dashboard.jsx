import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState({ events: 0, chapters: 0, posts: 0, membership: 'Not applied' })

  useEffect(() => {
    Promise.all([api.get('/events'), api.get('/chapters'), api.get('/posts'), api.get('/profile')]).then(([events, chapters, posts, profile]) => {
      setStats({
        events: events.data.data.length,
        chapters: chapters.data.data.length,
        posts: posts.data.data.length,
        membership: profile.data.data.memberships?.[0]?.status || 'Not applied',
      })
    })
  }, [])

  return (
    <section className="page-shell">
      <p className="eyebrow">Student dashboard</p>
      <h1>Your founder command center</h1>
      <div className="stats-grid">
        <div className="stat-card"><strong>{stats.events}</strong><span>Total events</span></div>
        <div className="stat-card"><strong>{stats.chapters}</strong><span>Total chapters</span></div>
        <div className="stat-card"><strong>{stats.posts}</strong><span>Approved posts</span></div>
        <div className="stat-card"><strong>{stats.membership}</strong><span>Membership status</span></div>
      </div>
      <div className="quick-actions">
        <Link className="btn btn-primary" to="/profile/edit">Edit Profile</Link>
        <Link className="btn btn-ghost" to="/chapters">Join Chapter</Link>
        <Link className="btn btn-ghost" to="/membership">Apply Membership</Link>
      </div>
    </section>
  )
}

export default Dashboard
