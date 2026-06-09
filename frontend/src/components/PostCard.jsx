function PostCard({ post }) {
  return (
    <article className="card post-card">
      {post.image && <img src={post.image} alt={post.title} />}
      <div className="card-topline">
        <span className="badge">{post.status || 'approved'}</span>
        <span>By {post.user?.name || 'Founder'}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </article>
  )
}

export default PostCard
