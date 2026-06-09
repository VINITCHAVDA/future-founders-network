import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ChapterCard from '../components/ChapterCard'
import EventCard from '../components/EventCard'

const featuredChapters = [
  {
    id: 'demo-nyc',
    name: 'NYC Student Founders',
    city: 'New York',
    description: 'A chapter for student founders building ventures in New York.',
    status: 'active',
    events_count: 3,
    chapter_members_count: 42,
  },
  {
    id: 'demo-bay',
    name: 'Bay Area Builders',
    city: 'San Francisco',
    description: 'Connect with technical founders, product designers, and campus operators.',
    status: 'active',
    events_count: 4,
    chapter_members_count: 58,
  },
  {
    id: 'demo-austin',
    name: 'Austin Startup Circle',
    city: 'Austin',
    description: 'Workshops, mentor nights, and launch support for student entrepreneurs.',
    status: 'active',
    events_count: 2,
    chapter_members_count: 31,
  },
]

const featuredEvents = [
  {
    id: 'demo-mixer',
    title: 'Founder Mixer Night',
    description: 'Meet student builders, share ideas, and find collaborators for your next project.',
    event_date: '2026-07-10',
    event_time: '18:00',
    location: 'Campus Innovation Hub',
    status: 'upcoming',
    chapter: { name: 'Future Founders Network' },
  },
  {
    id: 'demo-pitch',
    title: 'Student Pitch Sprint',
    description: 'Practice your pitch and receive practical feedback from mentors and peers.',
    event_date: '2026-07-17',
    event_time: '17:30',
    location: 'Startup Lab',
    status: 'upcoming',
    chapter: { name: 'Bay Area Builders' },
  },
  {
    id: 'demo-mvp',
    title: 'MVP Workshop',
    description: 'Turn a startup idea into a simple testable product roadmap.',
    event_date: '2026-07-24',
    event_time: '16:00',
    location: 'Entrepreneurship Center',
    status: 'upcoming',
    chapter: { name: 'Austin Startup Circle' },
  },
]

function Home() {
  const [chapters, setChapters] = useState(featuredChapters)
  const [events, setEvents] = useState(featuredEvents)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    Promise.all([api.get('/chapters'), api.get('/events')])
      .then(([chapterRes, eventRes]) => {
        setChapters(chapterRes.data.data.slice(0, 3))
        setEvents(eventRes.data.data.slice(0, 3))
      })
      .catch(() => {
        setNotice('Showing sample content. Start the Laravel API to load live chapters and events.')
      })
  }, [])

  return (
    <>
      <section className="hero-section">
        <div>
          <p className="eyebrow">Student Business Networking Platform</p>
          <h1>Future Founders Network</h1>
          <p className="hero-copy">
            Build your founder network before graduation. Create a profile, join a chapter, attend events, share startup updates, and apply for membership.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/register">Create Student Account</Link>
            <Link className="btn btn-ghost" to="/events">Explore Events</Link>
          </div>
        </div>
        <div className="hero-panel">
          <span className="stat-number">FFN</span>
          <p>A clean full-stack student entrepreneurship platform powered by React, Axios, React Router, Laravel, Sanctum, and MySQL.</p>
        </div>
      </section>

      {notice && <section className="section notice-section"><p className="alert">{notice}</p></section>}

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Chapters</p>
          <h2>Find your local startup circle</h2>
        </div>
        <div className="grid three">
          {chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Events</p>
          <h2>Attend founder-focused events</h2>
        </div>
        <div className="grid three">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </section>
    </>
  )
}

export default Home
