import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ChapterCard from '../components/ChapterCard'
import EventCard from '../components/EventCard'

function Home() {
  const [chapters, setChapters] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    Promise.all([api.get('/chapters'), api.get('/events')]).then(([chapterRes, eventRes]) => {
      setChapters(chapterRes.data.data.slice(0, 3))
      setEvents(eventRes.data.data.slice(0, 3))
    })
  }, [])

  return (
    <>
      <section className="hero-section">
        <div>
          <p className="eyebrow">Student Business Networking Platform</p>
          <h1>Build your founder network before graduation.</h1>
          <p className="hero-copy">
            Future Founders Network helps students create profiles, join local chapters, register for startup events, publish ideas, and connect with other builders.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/register">Create Student Account</Link>
            <Link className="btn btn-ghost" to="/events">Explore Events</Link>
          </div>
        </div>
        <div className="hero-panel">
          <span className="stat-number">500+</span>
          <p>student founders, mentors, and chapter leaders ready to collaborate.</p>
        </div>
      </section>

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
