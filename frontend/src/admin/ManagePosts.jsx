import { useState } from 'react'
import api, { getApiError } from '../services/api'

function ManagePosts() {
  const [postId, setPostId] = useState('')
  const [message, setMessage] = useState('')

  const reviewPost = async (action) => {
    setMessage('')
    try {
      const response = await api.put(`/admin/posts/${postId}/${action}`)
      setMessage(response.data.message)
      setPostId('')
    } catch (error) {
      setMessage(getApiError(error))
    }
  }

  return (
    <section className="page-shell narrow">
      <div className="form-card wide">
        <p className="eyebrow">Admin</p>
        <h1>Review posts</h1>
        <p>Enter a pending post ID, then approve or reject it.</p>
        {message && <p className="alert">{message}</p>}
        <label>Post ID<input value={postId} onChange={(e) => setPostId(e.target.value)} /></label>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={() => reviewPost('approve')}>Approve Post</button>
          <button className="btn btn-ghost" type="button" onClick={() => reviewPost('reject')}>Reject Post</button>
        </div>
      </div>
    </section>
  )
}

export default ManagePosts
