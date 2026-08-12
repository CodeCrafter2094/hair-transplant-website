import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { techniques } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function Techniques() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const imgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    const header = sectionRef.current.querySelector('.tech-header')
    if (header) {
      const lines = header.querySelectorAll('.reveal-line')
      gsap.fromTo(
        lines,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    }
  }, [])

  const handleSelect = (i: number) => {
    if (i === active) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      )
    }
    setActive(i)
  }

  const tech = techniques[active]

  return (
    <section
      id="techniques"
      ref={sectionRef}
      className="py-24 lg:py-40 bg-graphite-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="tech-header mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold-400" />
            <span className="reveal-line text-gold-300 text-xs tracking-widest3 uppercase opacity-0">
              Our Techniques
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light text-cream-50 leading-tight">
            <span className="reveal-line block opacity-0">
              Advanced methods.
            </span>
            <span className="reveal-line block italic text-gold-300 opacity-0">
              Refined artistry.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-center">
          {/* Left — selector tabs */}
          <div className="space-y-px mb-10 lg:mb-0">
            {techniques.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleSelect(i)}
                className={`w-full text-left p-8 border-b transition-all duration-300 group ${
                  active === i
                    ? 'border-gold-400/30 bg-graphite-700'
                    : 'border-white/5 hover:bg-graphite-700/50'
                }`}
                aria-pressed={active === i}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span
                        className={`font-display text-3xl font-light transition-colors ${
                          active === i ? 'text-gold-300' : 'text-graphite-100'
                        }`}
                      >
                        {t.name}
                      </span>
                    </div>
                    <p
                      className={`text-xs tracking-wider uppercase transition-colors ${
                        active === i ? 'text-graphite-100' : 'text-graphite-200'
                      }`}
                    >
                      {t.fullName}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      active === i
                        ? 'border-gold-400 bg-gold-400/10'
                        : 'border-white/10 group-hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all ${
                        active === i ? 'bg-gold-400' : 'bg-transparent'
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right — content + image */}
          <div className="relative">
            {/* Image */}
            <div
              ref={imgRef}
              className="relative overflow-hidden mb-8"
              style={{ aspectRatio: '4/3' }}
            >
              {techniques.map((t, i) => (
                <div
                  key={t.id}
                  className={`absolute inset-0 transition-opacity duration-600 ${
                    active === i ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={active !== i}
                >
                  <img
                    src={t.image}
                    alt={`${t.name} technique`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-800/80 to-transparent" />
                </div>
              ))}
            </div>

            {/* Content */}
            <div ref={contentRef}>
              <p className="text-graphite-100 font-light leading-relaxed mb-6">
                {tech.description}
              </p>
              <ul className="space-y-3">
                {tech.advantages.map((adv) => (
                  <li key={adv} className="flex items-center gap-3">
                    <Check size={14} className="text-gold-400 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-graphite-100 font-light">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
