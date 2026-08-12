import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faqs } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.faq-item'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      },
    )
  }, [])

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-40 bg-graphite-900 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">
            Questions
          </span>
        </div>
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light text-cream-50 leading-tight mb-16">
          Everything you need<br />
          <span className="italic text-gold-300">to know.</span>
        </h2>

        {/* FAQ items */}
        <div className="space-y-px">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item border-b border-white/8 opacity-0"
            >
              <button
                className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span
                  className={`font-light text-base transition-colors ${
                    openIndex === i ? 'text-cream-50' : 'text-graphite-100 group-hover:text-cream-100'
                  }`}
                >
                  {faq.question}
                </span>
                <Plus
                  size={18}
                  className={`shrink-0 text-gold-400 transition-transform duration-300 mt-0.5 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: openIndex === i ? '300px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="pb-7 text-graphite-100 font-light leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
