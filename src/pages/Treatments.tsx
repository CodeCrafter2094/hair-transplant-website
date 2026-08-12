import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Techniques from '../components/Techniques'
import Footer from '../components/Footer'
import FinalCTA from '../components/FinalCTA'

gsap.registerPlugin(ScrollTrigger)

export default function Treatments() {
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
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">Our Techniques</span>
        </div>
        <h1 className="font-display mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light text-cream-50 leading-tight">
              Advanced
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light italic text-gold-300 leading-tight">
              Treatments
            </span>
          </div>
        </h1>
        <p className="text-graphite-100 text-lg font-light max-w-xl">
          We offer the most advanced hair restoration techniques available — tailored to
          your unique anatomy and aesthetic goals.
        </p>
      </section>

      {/* Technique cards — reuse component, suppress its internal header */}
      <Techniques />

      {/* Extra info block */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-px bg-white/5">
          {[
            {
              title: 'Local Anaesthesia',
              desc: 'All procedures are performed under local anaesthesia. You remain fully awake and comfortable throughout.',
            },
            {
              title: 'Single-Day Procedure',
              desc: 'Most transplants are completed in a single day, allowing you to return to your hotel the same evening.',
            },
            {
              title: 'Lifetime Guarantee',
              desc: 'Transplanted follicles are genetically resistant to hair loss — the results are permanent.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-graphite-900 p-10">
              <h3 className="font-display text-2xl text-gold-300 font-light mb-4">{item.title}</h3>
              <p className="text-graphite-100 font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  )
}
