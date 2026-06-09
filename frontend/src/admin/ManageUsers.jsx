import { useEffect, useState } from 'react'
import api, { getApiError } from '../services/api'

function ManageUsers() {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  const loadUsers = () => api.get('/admin/users').then((response) => setUsers(response.data.data))

  useEffect(() => {
    loadUsers()
  }, [])

  const updateStatus = async (id, status) => {
    setMessage('')
    try {
      const response = await api.put(`/admin/users/${id}/status`, { status })
      setMessage(response.data.message)
      loadUsers()
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  return (
    <section className="page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Manage users</h1>
      {message && <p className="alert">{message}</p>}
      <div className="table-card">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.status}</td>
                <td><button className="btn btn-ghost" type="button" onClick={() => updateStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}>Toggle</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ManageUsers
