import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => {
      dot.classList.add('hover')
      ring.classList.add('hover')
    }
    const onLeave = () => {
      dot.classList.remove('hover')
      ring.classList.remove('hover')
    }

    const attachListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, [data-cursor]')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
      return interactives
    }

    window.addEventListener('mousemove', onMouseMove)
    let currentInteractives = attachListeners()

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      currentInteractives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      currentInteractives = attachListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    let raf: number
    const animate = () => {
      dot.style.left = pos.current.x + 'px'
      dot.style.top = pos.current.y + 'px'

      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      currentInteractives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}
