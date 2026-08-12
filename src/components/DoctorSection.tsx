import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { doctors } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function DoctorSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    const header = sectionRef.current.querySelector('.doc-header')
    if (header) {
      gsap.fromTo(
        header.querySelectorAll('.reveal-line'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    }

    const cards = sectionRef.current.querySelectorAll('.doc-card')
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      },
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-40 bg-graphite-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="doc-header mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold-400" />
            <span className="reveal-line text-gold-300 text-xs tracking-widest3 uppercase opacity-0">
              Expert Team
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light text-cream-50 leading-tight">
            <span className="reveal-line block opacity-0">
              Surgeons who combine
            </span>
            <span className="reveal-line block italic text-gold-300 opacity-0">
              science with artistry.
            </span>
          </h2>
        </div>

        {/* Doctors */}
        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          {doctors.map((doc, i) => (
            <div
              key={doc.name}
              className="doc-card relative overflow-hidden bg-graphite-900 group opacity-0"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="article"
              aria-label={`${doc.name}, ${doc.title}`}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', maxHeight: '70vh' }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/40 to-transparent" />
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs text-gold-300 tracking-widest2 uppercase mb-2">
                  {doc.specialization}
                </p>
                <h3 className="font-display text-3xl font-light text-cream-50 mb-1">
                  {doc.name}
                </h3>
                <p className="text-sm text-graphite-100 mb-4">{doc.title}</p>

                {/* Credentials — reveal on hover */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: hovered === i ? '120px' : '0px', opacity: hovered === i ? 1 : 0 }}
                >
                  <div className="border-t border-white/10 pt-4 space-y-1.5">
                    {doc.credentials.map((c) => (
                      <p key={c} className="text-xs text-graphite-100 font-light">
                        — {c}
                      </p>
                    ))}
                    <p className="text-xs text-gold-300 mt-2">{doc.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
