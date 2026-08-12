import { useEffect, useRef } from 'react'
import { Award, Users, Star, Globe } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeUp, revealLines, countUp } from '../animations/revealAnimations'
import { clinicData } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

const icons = [Award, Users, Star, Globe]

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    const lines = headlineRef.current?.querySelectorAll('.headline-line')
    if (lines) revealLines(lines, sectionRef.current)
    if (subRef.current) fadeUp(subRef.current, sectionRef.current, { delay: 0.3 })
    if (statsRef.current) fadeUp(statsRef.current, sectionRef.current, { delay: 0.4 })

    // Count-up for each stat
    clinicData.stats.forEach((stat, i) => {
      const el = statRefs.current[i]
      if (el && sectionRef.current) {
        countUp(el, stat.value, stat.suffix, sectionRef.current)
      }
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-graphite-900 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #c9a05a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c9a05a 0%, transparent 40%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">
            Our Promise
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <div className="overflow-hidden">
            <p className="headline-line font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light text-cream-50 leading-tight">
              Natural results.
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="headline-line font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light text-cream-50 leading-tight">
              Surgical precision.
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="headline-line font-display text-[clamp(2.5rem,6vw,5.5rem)] italic text-gold-300 leading-tight">
              Lasting confidence.
            </p>
          </div>
        </div>

        <p
          ref={subRef}
          className="max-w-xl text-graphite-100 font-light leading-relaxed text-lg mb-20 opacity-0"
        >
          We combine advanced techniques with an artistic eye for natural hairline design.
          Every procedure is a collaboration between science and aesthetics — tailored
          precisely to you.
        </p>

        {/* Stats grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 opacity-0"
        >
          {clinicData.stats.map((stat, i) => {
            const Icon = icons[i]
            return (
              <div
                key={stat.label}
                className="bg-graphite-900 p-8 lg:p-10 group hover:bg-graphite-800 transition-colors duration-300"
              >
                <Icon
                  size={20}
                  className="text-gold-400 mb-6 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <div className="font-display text-4xl lg:text-5xl font-light text-cream-50 mb-2">
                  <span
                    ref={(el) => { statRefs.current[i] = el }}
                  >
                    0{stat.suffix}
                  </span>
                </div>
                <p className="text-sm text-graphite-100 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
