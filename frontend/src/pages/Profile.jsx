import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get('/profile').then((response) => setUser(response.data.data))
  }, [])

  if (!user) return <section className="page-shell"><p>Loading profile...</p></section>

  return (
    <section className="page-shell narrow">
      <div className="profile-header">
        <div className="avatar">{user.name?.charAt(0)}</div>
        <div>
          <p className="eyebrow">Founder profile</p>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="detail-grid">
        <span><strong>Phone</strong>{user.profile?.phone || 'Not added'}</span>
        <span><strong>City</strong>{user.profile?.city || 'Not added'}</span>
        <span><strong>College</strong>{user.profile?.college || 'Not added'}</span>
        <span><strong>Course</strong>{user.profile?.course || 'Not added'}</span>
        <span><strong>Skills</strong>{user.profile?.skills || 'Not added'}</span>
        <span><strong>Bio</strong>{user.profile?.bio || 'Not added'}</span>
      </div>
      <Link className="btn btn-primary" to="/profile/edit">Edit Profile</Link>
    </section>
  )
}

export default Profile
