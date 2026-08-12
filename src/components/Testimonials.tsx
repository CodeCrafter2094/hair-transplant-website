import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.reveal-el'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      },
    )
  }, [])

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!reduced && quoteRef.current && metaRef.current) {
        setAnimating(true)
        gsap.to([quoteRef.current, metaRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setActive(idx)
            gsap.fromTo(
              [quoteRef.current, metaRef.current],
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                onComplete: () => setAnimating(false),
              },
            )
          },
        })
      } else {
        setActive(idx)
      }
    },
    [animating],
  )

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((active + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-40 bg-graphite-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-20 reveal-el opacity-0">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">
            Patient Stories
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Large quote */}
          <div>
            {/* Decorative quote mark */}
            <div className="font-display text-[8rem] text-gold-400/20 leading-none mb-4 select-none reveal-el opacity-0">
              "
            </div>

            <blockquote ref={quoteRef}>
              <p className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-light text-cream-50 leading-relaxed italic">
                {t.quote}
              </p>
            </blockquote>

            <div ref={metaRef} className="mt-10 flex items-center gap-5">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-cream-100 font-light">{t.name}</p>
                <p className="text-xs text-graphite-100 tracking-wider">
                  {t.country} · {t.procedure}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation + indicators */}
          <div className="flex flex-col gap-10">
            {/* All testimonials preview */}
            <div className="space-y-px">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-full text-left p-5 transition-all duration-300 border-l-2 ${
                    active === i
                      ? 'border-gold-400 bg-graphite-700/50'
                      : 'border-white/5 hover:border-white/20 hover:bg-graphite-700/20'
                  }`}
                  aria-label={`View testimonial from ${item.name}`}
                  aria-pressed={active === i}
                >
                  <p className="text-sm text-graphite-100 font-light line-clamp-2">
                    {item.quote.replace(/"/g, '')}
                  </p>
                  <p className="text-xs text-graphite-200 mt-2 tracking-wider">
                    {item.name} · {item.country}
                  </p>
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3 reveal-el opacity-0">
              <button
                onClick={prev}
                className="w-12 h-12 border border-white/10 flex items-center justify-center text-graphite-100 hover:border-gold-400/60 hover:text-gold-300 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 border border-white/10 flex items-center justify-center text-graphite-100 hover:border-gold-400/60 hover:text-gold-300 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex items-center gap-2 ml-4">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-px transition-all duration-300 ${
                      active === i ? 'w-8 bg-gold-400' : 'w-3 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
