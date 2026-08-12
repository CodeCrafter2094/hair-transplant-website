import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ResultSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const overlayTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    // Parallax on image
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { y: -60 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }

    // Text fade in
    if (textRef.current) {
      const lines = textRef.current.querySelectorAll('.text-line')
      gsap.fromTo(
        lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      )
    }

    // Overlay text movement
    if (overlayTextRef.current) {
      gsap.fromTo(
        overlayTextRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        },
      )
    }

    // Mask reveal
    if (sectionRef.current) {
      const mask = sectionRef.current.querySelector('.img-reveal-mask')
      if (mask) {
        gsap.fromTo(
          mask,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          },
        )
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-graphite-900"
    >
      {/* Full-bleed image */}
      <div className="img-reveal-mask absolute inset-0">
        <div ref={imgRef} className="absolute inset-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&q=85"
            alt=""
            role="presentation"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite-900 via-graphite-900/70 to-graphite-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 w-full">
        <div className="max-w-2xl" ref={textRef}>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-line text-gold-300 text-xs tracking-widest3 uppercase opacity-0">
              The Outcome
            </span>
          </div>

          <h2 className="font-display mb-8">
            <div className="overflow-hidden">
              <span className="text-line block text-[clamp(2.5rem,6vw,5rem)] font-light text-cream-50 leading-tight opacity-0">
                Results that look
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="text-line block text-[clamp(2.5rem,6vw,5rem)] font-light italic text-gold-300 leading-tight opacity-0">
                completely natural.
              </span>
            </div>
          </h2>

          <p className="text-line text-graphite-100 text-lg font-light leading-relaxed mb-10 opacity-0">
            Our surgeons design hairlines that frame your face precisely — not just
            filling in hair, but restoring the exact density and direction that makes
            results undetectable.
          </p>

          <div
            className="text-line opacity-0 inline-flex items-center gap-3 text-sm text-gold-300 tracking-wider uppercase border-b border-gold-400/30 pb-1 cursor-pointer hover:border-gold-400 transition-colors"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Start your transformation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Floating stat */}
        <div
          ref={overlayTextRef}
          className="absolute bottom-12 right-8 lg:right-16 glass-gold p-8 max-w-xs opacity-0 hidden lg:block"
        >
          <p className="font-display text-5xl text-gold-300 mb-2">98%</p>
          <p className="text-sm text-graphite-100 tracking-wider">
            of patients report being highly satisfied with their results at 12 months.
          </p>
        </div>
      </div>
    </section>
  )
}
