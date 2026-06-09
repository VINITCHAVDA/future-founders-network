import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { getApiError } from '../services/api'

const emptyProfile = { phone: '', city: '', college: '', course: '', skills: '', bio: '', linkedin: '', github: '', photo: '' }

function EditProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyProfile)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/profile').then((response) => setForm({ ...emptyProfile, ...response.data.data.profile }))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await api.put('/profile', form)
      navigate('/profile')
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell narrow">
      <form className="form-card wide" onSubmit={handleSubmit}>
        <p className="eyebrow">Profile</p>
        <h1>Edit your founder profile</h1>
        {message && <p className="alert error">{message}</p>}
        <div className="form-grid">
          {Object.keys(emptyProfile).map((field) => (
            <label key={field} className={field === 'bio' || field === 'skills' ? 'span-two' : ''}>
              {field.replace('_', ' ')}
              {field === 'bio' || field === 'skills' ? (
                <textarea value={form[field] || ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
              ) : (
                <input value={form[field] || ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
              )}
            </label>
          ))}
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
      </form>
    </section>
  )
}

export default EditProfile
