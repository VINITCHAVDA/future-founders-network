import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import api, { getApiError } from '../services/api'
import { isAuthenticated } from '../services/authService'

function Posts() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ title: '', description: '', image: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const loadPosts = () => api.get('/posts').then((response) => setPosts(response.data.data))

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
    <section className="page-shell">
      <p className="eyebrow">Community posts</p>
      <h1>Share wins, ideas, and updates</h1>
      {message && <p className="alert">{message}</p>}
      <form className="inline-form" onSubmit={handleSubmit}>
        <input placeholder="Post title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <textarea placeholder="Describe your idea or update" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Create Post'}</button>
      </form>
      <div className="grid three">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  )
}

export default Posts
