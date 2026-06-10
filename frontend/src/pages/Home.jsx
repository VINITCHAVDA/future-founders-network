import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ChapterCard from '../components/ChapterCard'
import EventCard from '../components/EventCard'
import FeatureCard from '../components/FeatureCard'
import PostCard from '../components/PostCard'
import SectionHeader from '../components/SectionHeader'
import StatsSection from '../components/StatsSection'

const sampleChapters = [
  { id: 'sample-1', name: 'Campus Founders Club', city: 'New York', description: 'A hands-on chapter for students building first products and finding co-founders.', status: 'active', events_count: 8, chapter_members_count: 180 },
  { id: 'sample-2', name: 'Tech Builders Circle', city: 'San Francisco', description: 'A technical community focused on MVPs, demos, and early customer discovery.', status: 'active', events_count: 12, chapter_members_count: 240 },
  { id: 'sample-3', name: 'Social Impact Startups', city: 'Austin', description: 'Students using entrepreneurship to solve campus, city, and community problems.', status: 'active', events_count: 6, chapter_members_count: 96 },
]

const sampleEvents = [
  { id: 'event-1', title: 'Founder Mixer Night', description: 'Meet builders, pitch ideas casually, and find collaborators for your next startup sprint.', event_date: '2026-07-10', event_time: '18:00', location: 'Innovation Hub', status: 'upcoming', type: 'Networking' },
  { id: 'event-2', title: 'MVP Launch Workshop', description: 'Learn how to scope, validate, and ship a useful MVP without overbuilding.', event_date: '2026-07-18', event_time: '16:30', location: 'Startup Lab', status: 'upcoming', type: 'Workshop' },
  { id: 'event-3', title: 'Pitch Practice Studio', description: 'Practice your pitch with peer feedback and a simple investor-ready story format.', event_date: '2026-07-25', event_time: '17:00', location: 'Business School Hall', status: 'upcoming', type: 'Pitch' },
]

const samplePosts = [
  { id: 'post-1', author: 'Ava Johnson', role: 'Student Founder', date: '2h ago', title: 'Looking for a design co-founder', description: 'I am validating a student budgeting app and would love to meet product designers interested in fintech.', tags: ['CoFounder', 'Fintech'], likes: 42, comments: 11 },
  { id: 'post-2', author: 'Liam Chen', role: 'CS Student', date: 'Yesterday', title: 'Demo day lessons from our first MVP', description: 'The biggest lesson: talk to users before writing code. We changed our onboarding after five interviews.', tags: ['MVP', 'Lessons'], likes: 35, comments: 8 },
]

function Home() {
  const [chapters, setChapters] = useState(sampleChapters)
  const [events, setEvents] = useState(sampleEvents)
  const [posts, setPosts] = useState(samplePosts)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    Promise.all([api.get('/chapters'), api.get('/events'), api.get('/posts')])
      .then(([chapterRes, eventRes, postRes]) => {
        setChapters(chapterRes.data.data.slice(0, 3))
        setEvents(eventRes.data.data.slice(0, 3))
        setPosts(postRes.data.data.slice(0, 2))
      })
      .catch(() => {
        setNotice('Showing sample content. Start the Laravel API to load live platform data.')
      })
  }, [])

  return (
    <>
      <section className="hero-section startup-hero animate-fade-up">
        <div className="hero-content">
          <p className="eyebrow">Student Startup Ecosystem</p>
          <h1 className="animate-fade-up stagger-1">Build your network. Launch your future.</h1>
          <p className="hero-copy animate-fade-up stagger-2">
            Future Founders Network connects ambitious students with chapters, events, mentors, startup resources, and a trusted community feed.
          </p>
          <div className="hero-actions animate-fade-up stagger-3">
            <Link className="btn btn-primary" to="/register">Join Network</Link>
            <Link className="btn btn-outline" to="/chapters">Explore Chapters</Link>
          </div>
        </div>
        <div className="hero-spotlight animate-scale-in stagger-4">
          <span className="spotlight-label">Live community</span>
          <h2>Where student founders meet co-founders, mentors, and early supporters.</h2>
          <div className="mini-list">
            <span>✓ Founder profiles</span>
            <span>✓ Chapter events</span>
            <span>✓ Startup posts</span>
          </div>
        </div>
      </section>

      <StatsSection />

      {notice && <section className="section notice-section"><p className="alert">{notice}</p></section>}

      <section className="section animate-fade-up">
        <SectionHeader eyebrow="Why join" title="Everything a student founder needs to start smarter" align="center">
          Learn with peers, meet future teammates, and turn ideas into practical startup experiments.
        </SectionHeader>
        <div className="grid four">
          <FeatureCard icon="🤝" title="Networking" animationClass="stagger-1">Meet founders, operators, creators, and students from nearby campuses.</FeatureCard>
          <FeatureCard icon="🎤" title="Events" animationClass="stagger-2">Discover workshops, pitch nights, panels, and demo days built for students.</FeatureCard>
          <FeatureCard icon="🧭" title="Mentorship" animationClass="stagger-3">Find guidance from chapter leaders, alumni, and startup ecosystem partners.</FeatureCard>
          <FeatureCard icon="🚀" title="Startup Support" animationClass="stagger-4">Share updates, get feedback, validate ideas, and build momentum.</FeatureCard>
        </div>
      </section>

      <section className="section split-section animate-fade-up">
        <div>
          <SectionHeader eyebrow="Chapters" title="Find your local startup circle" />
          <div className="grid stacked">
            {chapters.map((chapter, index) => <ChapterCard key={chapter.id} chapter={chapter} animationClass={`stagger-${index + 1}`} />)}
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="Upcoming events" title="Learn and connect this month" />
          <div className="grid stacked">
            {events.map((event, index) => <EventCard key={event.id} event={event} animationClass={`stagger-${index + 1}`} />)}
          </div>
        </div>
      </section>

      <section className="section alt-section animate-fade-up">
        <SectionHeader eyebrow="Community feed" title="Latest founder conversations" align="center" />
        <div className="feed-grid compact-feed">
          {posts.map((post, index) => <PostCard key={post.id} post={post} animationClass={`stagger-${index + 1}`} />)}
        </div>
      </section>
    </>
  )
}

export default Home
