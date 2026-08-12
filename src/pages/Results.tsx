import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight, Lock, Eye, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Results() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    if (heroRef.current) {
      const lines = heroRef.current.querySelectorAll('.reveal-line')
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2 },
      )
      const sub = heroRef.current.querySelector('.sub-fade')
      if (sub) {
        gsap.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6 })
      }
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.info-card')
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        },
      )
    }
  }, [])

  return (
    <div className="bg-graphite-900 min-h-screen">
      {/* Page Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">
            Patient Outcomes
          </span>
        </div>

        <h1 className="font-display mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light text-cream-50 leading-tight">
              Real Results,
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light italic text-gold-300 leading-tight">
              Shared Privately.
            </span>
          </div>
        </h1>

        <p className="sub-fade text-graphite-100 text-lg font-light max-w-xl opacity-0">
          We respect our patients' privacy. Actual before &amp; after photos are shared
          one-on-one during your free consultation, matched to your specific hair loss
          profile and treatment goals.
        </p>
      </section>

      {/* Stats bar */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {[
            { val: '5,000+', label: 'Procedures performed' },
            { val: '98%', label: 'Patient satisfaction' },
            { val: '40+', label: 'Countries served' },
            { val: '15+', label: 'Years of experience' },
          ].map((s) => (
            <div key={s.label} className="bg-graphite-900 px-6 py-8 text-center">
              <p className="font-display text-3xl text-gold-300 font-light">{s.val}</p>
              <p className="text-xs text-graphite-100 tracking-wider uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why private section */}
      <section className="pb-20 px-6 lg:px-10 max-w-7xl mx-auto" ref={cardsRef}>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Lock size={22} className="text-gold-400" aria-hidden="true" />,
              title: 'Patient Privacy First',
              desc: 'Our patients trust us with their personal journey. We never publish identifiable photos without explicit written consent.',
            },
            {
              icon: <Eye size={22} className="text-gold-400" aria-hidden="true" />,
              title: 'Matched to Your Case',
              desc: 'During your consultation, we show you results from patients with a similar hair loss pattern, graft count, and technique — so you see what\'s genuinely achievable for you.',
            },
            {
              icon: <Calendar size={22} className="text-gold-400" aria-hidden="true" />,
              title: 'Free & No Obligation',
              desc: 'Our consultations are completely free. Ask to see as many cases as you need before making any decision.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="info-card opacity-0 border border-white/8 p-8 flex flex-col gap-5"
            >
              <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div>
                <h3 className="font-display text-lg text-cream-50 font-light mb-2">
                  {card.title}
                </h3>
                <p className="text-graphite-100 text-sm font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="border border-gold-400/20 p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-cream-50 font-display text-2xl lg:text-3xl font-light mb-3">
              Ready to see what's possible for you?
            </p>
            <p className="text-graphite-100 text-sm font-light max-w-md">
              Book a free consultation and our surgeons will walk you through real
              patient outcomes relevant to your hair loss stage and goals.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors duration-300 whitespace-nowrap flex-shrink-0"
          >
            Book Free Consultation
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
