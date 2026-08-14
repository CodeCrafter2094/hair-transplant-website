import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase, BeforeAfterCase } from '../lib/supabase'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Slider card ───────────────────────────────────────────────────────────────
function SliderCard({ item, index }: { item: BeforeAfterCase; index: number }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !cardRef.current) return
    gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.85, ease: 'power2.out',
      delay: (index % 2) * 0.15,
      scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
    })
  }, [index])

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging) updatePosition(e.clientX) }
    const onUp = () => setDragging(false)
    const onTouchMove = (e: TouchEvent) => { if (dragging) updatePosition(e.touches[0].clientX) }
    const onTouchEnd = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [dragging, updatePosition])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition(p => Math.max(2, p - 3))
    if (e.key === 'ArrowRight') setPosition(p => Math.min(98, p + 3))
  }

  return (
    <div ref={cardRef} className="opacity-0">
      {/* Meta */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {item.technique && (
            <span className="text-xs text-gold-300 tracking-widest uppercase border border-gold-400/30 px-2.5 py-1">
              {item.technique}
            </span>
          )}
          {item.grafts && (
            <span className="text-xs text-graphite-200 tracking-wider">{item.grafts}</span>
          )}
          {item.months && (
            <span className="text-xs text-graphite-300 tracking-wider">· {item.months}</span>
          )}
        </div>
        <h3 className="font-display text-xl text-cream-50 font-light">{item.title}</h3>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ aspectRatio: '4/3', cursor: dragging ? 'grabbing' : 'ew-resize' }}
        role="img"
        aria-label={`${item.title} before and after. Use arrow keys to compare.`}
      >
        {/* After */}
        <img src={item.after_url} alt={`After: ${item.title}`}
          className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} />

        {/* Before clipped */}
        <div className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={item.before_url} alt={`Before: ${item.title}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'grayscale(60%) brightness(0.75)' }}
            loading="lazy" draggable={false} />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 glass px-3 py-1 text-xs tracking-widest uppercase text-graphite-100">Before</span>
        <span className="absolute top-3 right-3 glass-gold px-3 py-1 text-xs tracking-widest uppercase text-gold-300">After</span>

        {/* Divider */}
        <div className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
          style={{ left: `${position}%` }} />

        {/* Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${position}%` }}>
          <div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6.5 5L2 10L6.5 15M13.5 5L18 10L13.5 15"
                stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Hint */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
          <span className="glass px-3 py-1.5 text-xs text-cream-100 tracking-wider opacity-60">
            ← drag to compare →
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="py-32 flex flex-col items-center justify-center text-center">
      {/* Icon */}
      <div className="w-20 h-20 border border-gold-400/20 flex items-center justify-center mb-8">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="2" y="6" width="13" height="20" rx="1" stroke="currentColor"
            strokeWidth="1.5" className="text-graphite-400" />
          <rect x="17" y="6" width="13" height="20" rx="1" stroke="currentColor"
            strokeWidth="1.5" className="text-gold-400/60" />
          <line x1="16" y1="4" x2="16" y2="28" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
          <circle cx="16" cy="16" r="3.5" fill="white" fillOpacity="0.15"
            stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
        </svg>
      </div>

      <div className="max-w-md">
        <p className="text-xs text-gold-300 tracking-widest uppercase mb-4">Coming Soon</p>
        <h2 className="font-display text-3xl lg:text-4xl text-cream-50 font-light mb-4 leading-tight">
          Patient results will be<br />
          <span className="italic text-gold-300">shared here.</span>
        </h2>
        <p className="text-graphite-100 text-sm font-light leading-relaxed mb-8">
          We are in the process of obtaining written consent from our patients to publish
          their before &amp; after photographs. Real results — no stock imagery, no
          composites.
        </p>
        <p className="text-graphite-300 text-xs tracking-wider leading-relaxed mb-10">
          In the meantime, actual case photos are shared privately during your free
          consultation, matched to your hair loss pattern and treatment goals.
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 px-9 py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors"
        >
          Book Free Consultation
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BeforeAfterPage() {
  const [cases, setCases] = useState<BeforeAfterCase[]>([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
    document.title = 'Before & After Results | Turkey Hair Transplant Antalya'

    supabase
      .from('before_after_cases')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        setCases(data || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !heroRef.current) return
    gsap.fromTo(
      heroRef.current.querySelectorAll('.reveal-line'),
      { yPercent: 110 },
      { yPercent: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
    const sub = heroRef.current.querySelector('.sub-fade')
    if (sub) gsap.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.55 })
  }, [])

  const filters = ['All', ...Array.from(new Set(cases.map(c => c.technique).filter(Boolean) as string[]))]
  const [activeFilter, setActiveFilter] = useState('All')
  const filtered = activeFilter === 'All' ? cases : cases.filter(c => c.technique === activeFilter)

  return (
    <div className="bg-graphite-900 min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">Real Patients</span>
        </div>
        <h1 className="font-display mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light text-cream-50 leading-tight">
              Before &amp; After
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light italic text-gold-300 leading-tight">
              Results Gallery
            </span>
          </div>
        </h1>
        <p className="sub-fade text-graphite-100 text-lg font-light max-w-xl opacity-0">
          Drag the slider to compare before and after. All procedures performed at our
          clinic in Antalya, Turkey.
        </p>
      </section>

      {/* Stats bar */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto mb-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {[
            { val: '5,000+', label: 'Procedures performed' },
            { val: '98%',    label: 'Patient satisfaction' },
            { val: '40+',    label: 'Countries served' },
            { val: '15+',    label: 'Years of experience' },
          ].map(s => (
            <div key={s.label} className="bg-graphite-900 px-6 py-7 text-center">
              <p className="font-display text-3xl text-gold-300 font-light">{s.val}</p>
              <p className="text-xs text-graphite-100 tracking-wider uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-28 px-6 lg:px-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-graphite-800 h-5 w-1/2 mb-3 rounded" />
                <div className="bg-graphite-800 aspect-[4/3]" />
              </div>
            ))}
          </div>
        ) : cases.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Technique filter — only show if cases exist */}
            {filters.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {filters.map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors ${
                      activeFilter === f
                        ? 'bg-gold-400 text-graphite-900 font-medium'
                        : 'border border-white/15 text-graphite-100 hover:text-cream-50 hover:border-white/30'
                    }`}>
                    {f}
                  </button>
                ))}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-12 lg:gap-14">
              {filtered.map((item, i) => (
                <SliderCard key={item.id} item={item} index={i} />
              ))}
            </div>

            <p className="mt-14 text-xs text-graphite-300 tracking-wider text-center max-w-lg mx-auto leading-relaxed">
              Photos published with written patient consent. Individual results vary based
              on hair loss stage, graft count and patient physiology.
            </p>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-24">
        <div className="border border-gold-400/20 p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-cream-50 font-display text-2xl lg:text-3xl font-light mb-2">
              Ready to see results for your case?
            </p>
            <p className="text-graphite-100 text-sm font-light max-w-md">
              Book a free consultation — we share relevant case photos matched to your
              hair loss profile.
            </p>
          </div>
          <Link to="/contact"
            className="group inline-flex items-center gap-3 px-9 py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors whitespace-nowrap flex-shrink-0">
            Free Consultation
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
