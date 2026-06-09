import { useEffect, useState } from 'react'
import ChapterCard from '../components/ChapterCard'
import api, { getApiError } from '../services/api'
import { isAuthenticated } from '../services/authService'

function Chapters() {
  const [chapters, setChapters] = useState([])
  const [message, setMessage] = useState('')
  const [joiningId, setJoiningId] = useState(null)

  useEffect(() => {
    api.get('/chapters').then((response) => setChapters(response.data.data))
  }, [])

  const handleJoin = async (id) => {
    if (!isAuthenticated()) {
      setMessage('Please login before joining a chapter.')
      return
    }

    setJoiningId(id)
    setMessage('')
    try {
      const response = await api.post(`/chapters/${id}/join`)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setJoiningId(null)
    }
  }

  return (
    <section className="page-shell">
      <p className="eyebrow">Chapters</p>
      <h1>Join a local founder chapter</h1>
      {message && <p className="alert">{message}</p>}
      <div className="grid three">
        {chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} onJoin={handleJoin} joining={joiningId === chapter.id} />)}
      </div>
    </section>
  )
}

export default Chapters
