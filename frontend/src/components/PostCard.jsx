function PostCard({ post, animationClass = '' }) {
  const author = post.user?.name || post.author || 'Student Founder'
  const role = post.role || post.user?.profile?.course || 'Founder Member'
  const tags = post.tags || ['Startup', 'Networking']

  return (
    <article className={`post-feed-card animate-scale-in ${animationClass}`}>
      {post.image && <img className="post-image" src={post.image} alt={post.title} />}
      <div className="post-author-row">
        <span className="avatar small">{author.charAt(0)}</span>
        <div>
          <strong>{author}</strong>
          <span>{role} · {post.date || 'Today'}</span>
        </div>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description || post.content}</p>
      <div className="tag-row">
        {tags.map((tag) => <span key={tag}>#{tag}</span>)}
      </div>
      <div className="post-actions">
        <span>👏 {post.likes ?? 24} likes</span>
        <span>💬 {post.comments ?? 6} comments</span>
        <span>↗ Share</span>
      </div>
    </article>
  )
}

export default PostCard
