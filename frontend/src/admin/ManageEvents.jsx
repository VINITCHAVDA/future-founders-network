import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import api, { getApiError } from '../services/api'

const emptyEvent = { title: '', description: '', event_date: '', event_time: '', location: '', chapter_id: '', status: 'upcoming' }

function ManageEvents() {
  const [events, setEvents] = useState([])
  const [form, setForm] = useState(emptyEvent)
  const [editId, setEditId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [message, setMessage] = useState('')

  const loadEvents = () => api.get('/events').then((response) => setEvents(response.data.data))

  useEffect(() => {
    loadEvents()
  }, [])

  const saveEvent = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      const response = editId ? await api.put(`/admin/events/${editId}`, form) : await api.post('/admin/events', form)
      setMessage(response.data.message)
      setForm(emptyEvent)
      setEditId('')
      loadEvents()
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  const deleteEvent = async () => {
    setMessage('')
    try {
      const response = await api.delete(`/admin/events/${deleteId}`)
      setMessage(response.data.message)
      setDeleteId('')
      loadEvents()
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  return (
    <section className="page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Manage events</h1>
      {message && <p className="alert">{message}</p>}
      <form className="inline-form" onSubmit={saveEvent}>
        <input placeholder="Edit ID optional" value={editId} onChange={(e) => setEditId(e.target.value)} />
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} required />
        <input type="time" value={form.event_time} onChange={(e) => setForm({ ...form, event_time: e.target.value })} required />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <input placeholder="Chapter ID" value={form.chapter_id} onChange={(e) => setForm({ ...form, chapter_id: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn btn-primary" type="submit">{editId ? 'Update Event' : 'Create Event'}</button>
      </form>
      <div className="inline-form compact">
        <input placeholder="Event ID to delete" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        <button className="btn btn-danger" type="button" onClick={deleteEvent}>Delete Event</button>
      </div>
      <div className="grid three">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>
    </section>
  )
}

export default ManageEvents
