import { useEffect, useRef, useState } from 'react'

const hoverSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  '[role="button"]',
  '.navbar a',
  '.card',
  '.feature-card',
  '.chapter-card',
  '.event-card',
  '.post-card',
  '.post-feed-card',
  '.auth-card',
  '.form-card',
  '.stat-card',
  '.story-card',
  '.footer-card',
  '.panel-card',
  '.table-card',
].join(', ')

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const ringPosition = useRef({ x: 0, y: 0 })
  const animationFrame = useRef(null)
  const hoverState = useRef(false)
  const ringScale = useRef(1)
  const dotScale = useRef(1)
  const [isEnabled, setIsEnabled] = useState(false)
  const isVisibleRef = useRef(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateCursorSupport = () => {
      setIsEnabled(finePointerQuery.matches && !reducedMotionQuery.matches)
    }

    updateCursorSupport()
    finePointerQuery.addEventListener('change', updateCursorSupport)
    reducedMotionQuery.addEventListener('change', updateCursorSupport)

    return () => {
      finePointerQuery.removeEventListener('change', updateCursorSupport)
      reducedMotionQuery.removeEventListener('change', updateCursorSupport)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove('custom-cursor-enabled')
      return undefined
    }

    document.body.classList.add('custom-cursor-enabled')

    const moveCursor = (event) => {
      const nextPosition = { x: event.clientX, y: event.clientY }

      if (!isVisibleRef.current) {
        ringPosition.current = nextPosition
      }

      mousePosition.current = nextPosition

      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }
      const shouldHover = event.target instanceof Element && Boolean(event.target.closest(hoverSelector))

      if (hoverState.current !== shouldHover) {
        hoverState.current = shouldHover
        setIsHovering(shouldHover)
      }
    }

    const hideCursor = () => {
      isVisibleRef.current = false
      setIsVisible(false)
      hoverState.current = false
      setIsHovering(false)
    }

    const animateCursor = () => {
      const dot = dotRef.current
      const ring = ringRef.current

      if (dot && ring) {
        const targetRingScale = hoverState.current ? 1.48 : 1
        const targetDotScale = hoverState.current ? 0.76 : 1

        ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * 0.18
        ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * 0.18
        ringScale.current += (targetRingScale - ringScale.current) * 0.18
        dotScale.current += (targetDotScale - dotScale.current) * 0.22

        dot.style.transform = `translate3d(${mousePosition.current.x}px, ${mousePosition.current.y}px, 0) translate(-50%, -50%) scale(${dotScale.current})`
        ring.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) translate(-50%, -50%) scale(${ringScale.current})`
      }

      animationFrame.current = requestAnimationFrame(animateCursor)
    }

    animationFrame.current = requestAnimationFrame(animateCursor)
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      document.body.classList.remove('custom-cursor-enabled')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
      document.removeEventListener('mouseleave', hideCursor)

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  const cursorClassName = [
    isVisible ? 'cursor-visible' : '',
    isHovering ? 'cursor-hover' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <span ref={dotRef} className={`custom-cursor-dot ${cursorClassName}`} aria-hidden="true" />
      <span ref={ringRef} className={`custom-cursor-ring ${cursorClassName}`} aria-hidden="true" />
    </>
  )
}

export default CustomCursor
