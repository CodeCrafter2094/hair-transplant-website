import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProcessSection from '../components/ProcessSection'
import DoctorSection from '../components/DoctorSection'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !heroRef.current) return

    const lines = heroRef.current.querySelectorAll('.reveal-line')
    gsap.fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2 },
    )
  }, [])

  return (
    <div className="bg-graphite-900 min-h-screen">
      {/* Page Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">Step by Step</span>
        </div>
        <h1 className="font-display mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light text-cream-50 leading-tight">
              Your Journey
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light italic text-gold-300 leading-tight">
              with Us
            </span>
          </div>
        </h1>
        <p className="text-graphite-100 text-lg font-light max-w-xl">
          From the first consultation to your final follow-up — every step is guided,
          transparent, and designed around your comfort.
        </p>
      </section>

      <ProcessSection />
      <DoctorSection />
      <Footer />
    </div>
  )
}
