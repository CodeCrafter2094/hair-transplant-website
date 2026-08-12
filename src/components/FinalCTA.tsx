import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    const lines = sectionRef.current.querySelectorAll('.cta-line')
    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      },
    )

    const els = sectionRef.current.querySelectorAll('.cta-fade')
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      },
    )

    // Parallax bg
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { y: -50 },
        {
          y: 50,
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
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-graphite-900"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=1600&q=80"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-900/90 via-graphite-900/70 to-graphite-900/90" />
        <div className="absolute inset-0 bg-graphite-900/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center py-32">
        {/* Eyebrow */}
        <div className="cta-fade flex items-center justify-center gap-4 mb-12 opacity-0">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">
            Begin Your Journey
          </span>
          <div className="w-8 h-px bg-gold-400" />
        </div>

        {/* Headline */}
        <h2 className="font-display mb-8" aria-label="Your new look starts here">
          <div className="overflow-hidden">
            <span className="cta-line block text-[clamp(3rem,8vw,7rem)] font-light text-cream-50 leading-tight">
              Your new look
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="cta-line block text-[clamp(3rem,8vw,7rem)] font-light italic text-gold-300 leading-tight">
              starts here.
            </span>
          </div>
        </h2>

        <p className="cta-fade text-graphite-100 text-lg font-light max-w-xl mx-auto mb-12 opacity-0">
          Take the first step toward the confidence you deserve. Our team is ready to
          guide you through every stage of your transformation.
        </p>

        {/* CTA Button */}
        <div className="cta-fade opacity-0">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium overflow-hidden hover:bg-gold-300 transition-colors duration-300"
          >
            Free Consultation
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Secondary details */}
        <div className="cta-fade mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-graphite-200 tracking-wider uppercase opacity-0">
          <span>No commitment required</span>
          <span className="hidden sm:inline text-graphite-400">·</span>
          <span>Available in 40+ languages</span>
          <span className="hidden sm:inline text-graphite-400">·</span>
          <span>International patients welcome</span>
        </div>
      </div>
    </section>
  )
}
