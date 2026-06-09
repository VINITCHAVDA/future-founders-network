function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="page-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <p className="page-intro">{children}</p>}
    </div>
  )
}

export default PageHeader
