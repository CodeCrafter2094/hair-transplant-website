import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { runHeroAnimation } from '../animations/heroAnimations'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(
      Boolean,
    ) as Element[]

    runHeroAnimation({
      bg: bgRef.current,
      eyebrow: eyebrowRef.current,
      lines,
      ctas: ctasRef.current,
      scroll: scrollRef.current,
      stats: statsRef.current,
    })
  }, [])

  const handleScrollDown = () => {
    const next = document.getElementById('trust')
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero — Premium Hair Transplant"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-animate"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1800&q=85"
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/50 to-graphite-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-900/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-900/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="inline-flex items-center gap-3 text-gold-300 text-xs tracking-widest3 uppercase font-light mb-8 opacity-0"
        >
          <span className="inline-block w-8 h-px bg-gold-400" />
          Premium Hair Restoration
          <span className="inline-block w-8 h-px bg-gold-400" />
        </span>

        {/* Headline */}
        <h1 className="font-display mb-10 overflow-hidden" aria-label="Your new confidence starts here">
          <div className="overflow-hidden">
            <span
              ref={line1Ref}
              className="block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none text-cream-50 tracking-tight"
              style={{ display: 'block' }}
            >
              Your New
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={line2Ref}
              className="block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none text-gold-300 tracking-tight italic"
              style={{ display: 'block' }}
            >
              Confidence
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={line3Ref}
              className="block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none text-cream-50 tracking-tight"
              style={{ display: 'block' }}
            >
              Starts Here.
            </span>
          </div>
        </h1>

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="flex flex-col sm:flex-row items-start gap-4 opacity-0 mb-16 lg:mb-20"
        >
          <Link
            to="/contact"
            className="group relative px-8 py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium overflow-hidden hover:bg-gold-300 transition-colors duration-300 inline-flex items-center gap-3"
          >
            Free Consultation
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/results"
            className="group px-8 py-4 border border-cream-100/30 text-cream-100 text-sm tracking-wider uppercase font-light hover:border-cream-100/60 transition-colors duration-300 inline-flex items-center gap-3"
          >
            View Results
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 opacity-0 cursor-pointer group"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleScrollDown()}
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-1">
            <ArrowDown
              size={14}
              className="text-graphite-100 group-hover:text-gold-300 transition-colors animate-bounce"
            />
          </div>
          <span className="text-xs text-graphite-100 tracking-widest2 uppercase">
            Scroll
          </span>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        ref={statsRef}
        className="absolute bottom-0 right-0 hidden lg:flex opacity-0"
      >
        <div className="glass flex divide-x divide-white/5">
          {[
            { val: '15+', label: 'Years' },
            { val: '5000+', label: 'Procedures' },
            { val: '98%', label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label} className="px-8 py-5 text-center">
              <p className="font-display text-2xl text-gold-300 font-light">{s.val}</p>
              <p className="text-xs text-graphite-100 tracking-wider uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
