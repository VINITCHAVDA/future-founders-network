import { useEffect, useState } from 'react'
import ChapterCard from '../components/ChapterCard'
import api, { getApiError } from '../services/api'

const emptyChapter = { name: '', city: '', description: '', status: 'active' }

function ManageChapters() {
  const [chapters, setChapters] = useState([])
  const [form, setForm] = useState(emptyChapter)
  const [editId, setEditId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [message, setMessage] = useState('')

  const loadChapters = () => api.get('/chapters').then((response) => setChapters(response.data.data))

  useEffect(() => {
    loadChapters()
  }, [])

  const saveChapter = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      const response = editId ? await api.put(`/admin/chapters/${editId}`, form) : await api.post('/admin/chapters', form)
      setMessage(response.data.message)
      setForm(emptyChapter)
      setEditId('')
      loadChapters()
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  const deleteChapter = async () => {
    setMessage('')
    try {
      const response = await api.delete(`/admin/chapters/${deleteId}`)
      setMessage(response.data.message)
      setDeleteId('')
      loadChapters()
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  return (
    <section className="page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Manage chapters</h1>
      {message && <p className="alert">{message}</p>}
      <form className="inline-form" onSubmit={saveChapter}>
        <input placeholder="Edit ID optional" value={editId} onChange={(e) => setEditId(e.target.value)} />
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn btn-primary" type="submit">{editId ? 'Update Chapter' : 'Create Chapter'}</button>
      </form>
      <div className="inline-form compact">
        <input placeholder="Chapter ID to delete" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        <button className="btn btn-danger" type="button" onClick={deleteChapter}>Delete Chapter</button>
      </div>
      <div className="grid three">{chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} />)}</div>
    </section>
  )
}

export default ManageChapters
