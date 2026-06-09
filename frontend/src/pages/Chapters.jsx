import { useEffect, useMemo, useState } from 'react'
import ChapterCard from '../components/ChapterCard'
import EmptyState from '../components/EmptyState'
import SectionHeader from '../components/SectionHeader'
import api, { getApiError } from '../services/api'
import { isAuthenticated } from '../services/authService'

const sampleChapters = [
  { id: 'chapter-1', name: 'Campus Founders Club', city: 'New York', description: 'Weekly founder circles, pitch practice, and peer accountability for student entrepreneurs.', status: 'active', events_count: 8, chapter_members_count: 180 },
  { id: 'chapter-2', name: 'Tech Builders Circle', city: 'San Francisco', description: 'A home for technical students building MVPs, SaaS tools, and AI products.', status: 'active', events_count: 12, chapter_members_count: 240 },
  { id: 'chapter-3', name: 'Social Impact Startups', city: 'Austin', description: 'Students building mission-driven ventures for education, climate, and local communities.', status: 'active', events_count: 6, chapter_members_count: 96 },
  { id: 'chapter-4', name: 'Creative Commerce Lab', city: 'Boston', description: 'For students launching creator businesses, brands, marketplaces, and media projects.', status: 'active', events_count: 5, chapter_members_count: 75 },
]

function Chapters() {
  const [chapters, setChapters] = useState(sampleChapters)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [joiningId, setJoiningId] = useState(null)

  useEffect(() => {
    api.get('/chapters')
      .then((response) => setChapters(response.data.data.length ? response.data.data : sampleChapters))
      .catch(() => setMessage('Showing sample chapters. Start the Laravel API to load live chapter data.'))
  }, [])

  const filteredChapters = useMemo(() => {
    const keyword = search.toLowerCase()
    return chapters.filter((chapter) => {
      return chapter.name?.toLowerCase().includes(keyword) || chapter.city?.toLowerCase().includes(keyword)
    })
  }, [chapters, search])

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
      <div className="directory-header">
        <SectionHeader eyebrow="Chapters" title="Join a local founder community">
          Browse student-led startup chapters by city, community focus, and momentum. Each chapter helps members meet collaborators and attend curated events.
        </SectionHeader>
        <div className="search-panel">
          <label htmlFor="chapter-search">Search chapters</label>
          <input id="chapter-search" placeholder="Search by name or city" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>

      {message && <p className="alert">{message}</p>}

      {filteredChapters.length ? (
        <div className="grid three directory-grid">
          {filteredChapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} onJoin={handleJoin} joining={joiningId === chapter.id} />
          ))}
        </div>
      ) : (
        <EmptyState title="No chapters found">Try searching another city or chapter name.</EmptyState>
      )}
    </section>
  )
}

export default Chapters
