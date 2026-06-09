function SectionHeader({ eyebrow, title, children, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className="section-copy">{children}</p>}
    </div>
  )
}

export default SectionHeader
