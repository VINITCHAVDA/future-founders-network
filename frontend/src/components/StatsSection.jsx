import { useEffect, useRef, useState } from 'react'

const stats = [
  { endValue: 2400, label: 'Students', icon: '🎓' },
  { endValue: 35, label: 'Chapters', icon: '🌐' },
  { endValue: 120, label: 'Events', icon: '🎤' },
  { endValue: 850, label: 'Posts', icon: '📝' },
]

const animationDuration = 1800

function formatCount(value) {
  return `${Math.round(value).toLocaleString()}+`
}

function StatsSection() {
  const sectionRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const sectionElement = sectionRef.current

    if (!sectionElement) {
      return undefined
    }

    const startCounter = () => setHasStarted(true)

    if (!('IntersectionObserver' in window)) {
      startCounter()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(sectionElement)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const reducedMotionFrameId = requestAnimationFrame(() => {
        setCounts(stats.map((stat) => stat.endValue))
      })

      return () => cancelAnimationFrame(reducedMotionFrameId)
    }

    let animationFrameId
    let startTime = null

    const animateCounter = (currentTime) => {
      if (!startTime) {
        startTime = currentTime
      }

      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / animationDuration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setCounts(stats.map((stat) => stat.endValue * easedProgress))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCounter)
      }
    }

    animationFrameId = requestAnimationFrame(animateCounter)

    return () => cancelAnimationFrame(animationFrameId)
  }, [hasStarted])

  return (
    <section className="stats-section" aria-labelledby="stats-heading" ref={sectionRef}>
      <div className="stats-header animate-fade-up">
        <p className="eyebrow">Community growth</p>
        <h2 id="stats-heading">Growing Future Founders Community</h2>
        <p>
          Connecting students, entrepreneurs, mentors, and startup communities across India.
        </p>
      </div>

      <div className="stats-cards" aria-label="Future Founders Network statistics">
        {stats.map((stat, index) => (
          <article className={`stat-card pro-stat-card animate-scale-in stagger-${index + 1}`} key={stat.label}>
            <span className="stat-icon" aria-hidden="true">{stat.icon}</span>
            <strong className="stat-number" aria-label={`${formatCount(stat.endValue)} ${stat.label}`}>
              {formatCount(counts[index])}
            </strong>
            <span className="stat-label">{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
