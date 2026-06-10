import { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import PostCard from '../components/PostCard'
import SectionHeader from '../components/SectionHeader'
import api, { getApiError } from '../services/api'
import { isAuthenticated } from '../services/authService'

const samplePosts = [
  { id: 'post-1', author: 'Ava Johnson', role: 'Business Student', date: '2h ago', title: 'Looking for a design co-founder', description: 'I am validating a budgeting app for college clubs and would love to meet a product designer interested in student fintech.', tags: ['CoFounder', 'Fintech'], likes: 42, comments: 11 },
  { id: 'post-2', author: 'Liam Chen', role: 'CS Student', date: 'Yesterday', title: 'What our MVP interviews taught us', description: 'We interviewed 12 students before writing code. The biggest surprise was that our first feature idea was not the actual pain point.', tags: ['MVP', 'CustomerDiscovery'], likes: 35, comments: 8 },
  { id: 'post-3', author: 'Mia Patel', role: 'Marketing Lead', date: '3 days ago', title: 'Pitch night recap and resources', description: 'Sharing the simple pitch structure our team used: problem, customer, insight, solution, traction, and ask.', tags: ['Pitch', 'Resources'], likes: 57, comments: 14 },
]

function Posts() {
  const [posts, setPosts] = useState(samplePosts)
  const [form, setForm] = useState({ title: '', description: '', image: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const loadPosts = () => {
    return api.get('/posts')
      .then((response) => setPosts(response.data.data.length ? response.data.data : samplePosts))
      .catch(() => setMessage('Showing sample posts. Start the Laravel API to load live community posts.'))
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isAuthenticated()) {
      setMessage('Please login before creating a post.')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      const response = await api.post('/posts', form)
      setMessage(response.data.message)
      setForm({ title: '', description: '', image: '' })
      loadPosts()
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell feed-page animate-fade-up">
      <SectionHeader eyebrow="Community feed" title="Share wins, ideas, questions, and startup progress">
        A professional student founder feed for updates, collaboration requests, event recaps, and practical lessons from building.
      </SectionHeader>

      {message && <p className="alert">{message}</p>}

      <div className="feed-layout">
        <aside className="create-post-panel animate-fade-up stagger-2">
          <div className="panel-card sticky-card">
            <p className="eyebrow">Create post</p>
            <h3>Start a conversation</h3>
            <p>Post a founder update, ask for feedback, or invite students to collaborate.</p>
            <form onSubmit={handleSubmit}>
              <label>Title<input placeholder="What are you sharing?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
              <label>Image URL<input placeholder="Optional visual link" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></label>
              <label>Content<textarea placeholder="Write your post" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></label>
              <button className="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Create Post'}</button>
            </form>
          </div>
        </aside>

        <div className="feed-grid">
          {posts.length ? posts.map((post, index) => <PostCard key={post.id} post={post} animationClass={`stagger-${(index % 4) + 1}`} />) : (
            <EmptyState title="No posts yet">Create the first community update for your chapter.</EmptyState>
          )}
        </div>
      </div>
    </section>
  )
}

export default Posts
