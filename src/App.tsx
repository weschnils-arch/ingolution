import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [dataLost, setDataLost] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const triggerDataLoss = useCallback(() => {
    if (dataLost) return
    setDataLost(true)

    const overlay = overlayRef.current
    if (!overlay) return

    gsap.fromTo(overlay,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          setShowContent(true)

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              ScrollTrigger.refresh()

              gsap.to(overlay, {
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                  overlay.style.pointerEvents = 'none'

                  const problemSection = document.getElementById('problem')
                  if (problemSection && lenisRef.current) {
                    lenisRef.current.scrollTo(problemSection, { duration: 1.5 })
                  }
                },
              })
            })
          })
        },
      }
    )
  }, [dataLost])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      <Cursor />
      <Nav />

      <Hero onTriggerDataLoss={triggerDataLoss} />

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div
        ref={contentRef}
        style={{
          opacity: showContent ? 1 : 0,
          maxHeight: showContent ? 'none' : '0',
          overflow: showContent ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease',
        }}
      >
        <Problem />
        <Solution />
        <Process />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
