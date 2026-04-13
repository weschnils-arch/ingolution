import { useEffect, useRef, useState } from 'react'
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
        <Problem />
        <Solution />
        <Process />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
