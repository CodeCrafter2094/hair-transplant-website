import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeUp } from '../animations/revealAnimations'
import { Link } from 'react-router-dom'
import { clinicData } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    if (headRef.current) {
      const lines = headRef.current.querySelectorAll('.reveal-line')
      fadeUp(lines, sectionRef.current, { stagger: 0.1 })
    }

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card')
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        },
      )
    }
  }, [])

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-24 lg:py-36 bg-graphite-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headRef} className="mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-gold-300 text-xs tracking-widest3 uppercase reveal-line">
              Patient Outcomes
            </span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="reveal-line font-display text-[clamp(2rem,5vw,4.5rem)] font-light text-cream-50 leading-tight">
              Results that speak
            </h2>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="reveal-line font-display text-[clamp(2rem,5vw,4.5rem)] font-light italic text-gold-300 leading-tight">
              for themselves.
            </h2>
          </div>
          <div className="overflow-hidden mt-6">
            <p className="reveal-line text-graphite-100 text-lg font-light max-w-lg">
              Actual patient before &amp; after photos are shared privately during your
              free consultation — preserving patient privacy and giving you the most
              accurate picture of what's possible for your case.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-16"
        >
          {clinicData.stats.map((s) => (
            <div key={s.label} className="stat-card bg-graphite-800 px-8 py-10 text-center opacity-0">
              <p className="font-display text-[clamp(2.5rem,5vw,4rem)] text-gold-300 font-light leading-none mb-3">
                {s.value}{s.suffix}
              </p>
              <p className="text-xs text-graphite-100 tracking-widest uppercase leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div className="border border-gold-400/20 p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-cream-50 font-display text-2xl lg:text-3xl font-light mb-2">
              See results for your specific case.
            </p>
            <p className="text-graphite-100 text-sm font-light max-w-md">
              During your free consultation, our surgeons share real patient outcomes
              matched to your hair loss profile and goals.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-9 py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors duration-300 whitespace-nowrap flex-shrink-0"
          >
            Book Free Consultation
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
