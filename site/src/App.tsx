import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './components/Hero'

const Problem = lazy(() => import('./components/Problem'))
const Solution = lazy(() => import('./components/Solution'))
const Process = lazy(() => import('./components/Process'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const CookieBanner = lazy(() => import('./components/CookieBanner'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [showContent] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

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

      <Hero />

      <div
        ref={contentRef}
        style={{
          opacity: showContent ? 1 : 0,
          maxHeight: showContent ? 'none' : '0',
          overflow: showContent ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease',
        }}
      >
        <Suspense fallback={null}>
          <Problem />
          <Solution />
          <Process />
          <Contact />
          <Footer />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
    </>
  )
}
