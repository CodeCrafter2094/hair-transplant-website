import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { clinicData } from '../data/siteData'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    technique: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lines = heroRef.current?.querySelectorAll('.reveal-line')
    if (lines) {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2 },
      )
    }

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.4 },
      )
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: send to your API / email service
    setSubmitted(true)
  }

  const contactDetails = [
    { icon: Phone, label: 'Phone', value: clinicData.phone, href: `tel:${clinicData.phone}` },
    { icon: Mail, label: 'Email', value: clinicData.email, href: `mailto:${clinicData.email}` },
    { icon: MapPin, label: 'Address', value: clinicData.address, href: '#' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 09:00 – 18:00', href: '#' },
  ]

  return (
    <div className="bg-graphite-900 min-h-screen">
      {/* Page Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">Get in Touch</span>
        </div>
        <h1 className="font-display mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light text-cream-50 leading-tight">
              Start Your
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light italic text-gold-300 leading-tight">
              Free Consultation
            </span>
          </div>
        </h1>
        <p className="text-graphite-100 text-lg font-light max-w-xl">
          Tell us about your goals and we'll design a personalised treatment plan — at no
          cost and with no obligation.
        </p>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact details */}
          <div>
            <div className="space-y-8 mb-16">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-graphite-200 tracking-wider uppercase mb-1">
                      {label}
                    </p>
                    <a
                      href={href}
                      className="text-cream-100 font-light hover:text-gold-300 transition-colors"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="relative overflow-hidden bg-graphite-800 border border-white/5"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Antalya, Turkey — Clinic Location"
                className="w-full h-full object-cover opacity-50"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass px-6 py-3 text-center">
                  <p className="text-xs text-graphite-100 tracking-wider uppercase">
                    Antalya, Turkey
                  </p>
                  <p className="text-sm text-cream-100 mt-1">{clinicData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col justify-center items-start">
              <div className="w-16 h-16 border border-gold-400/40 flex items-center justify-center mb-8">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#c9a05a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="font-display text-3xl text-cream-50 font-light mb-4">
                Message received.
              </h2>
              <p className="text-graphite-100 font-light">
                Thank you for reaching out. Our team will contact you within 24 hours to
                schedule your free consultation.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 opacity-0"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-graphite-100 tracking-wider uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-graphite-800 border border-white/10 px-4 py-3 text-cream-100 text-sm font-light placeholder-graphite-200 focus:outline-none focus:border-gold-400/60 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-graphite-100 tracking-wider uppercase mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-graphite-800 border border-white/10 px-4 py-3 text-cream-100 text-sm font-light placeholder-graphite-200 focus:outline-none focus:border-gold-400/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs text-graphite-100 tracking-wider uppercase mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-graphite-800 border border-white/10 px-4 py-3 text-cream-100 text-sm font-light placeholder-graphite-200 focus:outline-none focus:border-gold-400/60 transition-colors"
                    placeholder="+1 (000) 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="technique" className="block text-xs text-graphite-100 tracking-wider uppercase mb-2">
                    Interested In
                  </label>
                  <select
                    id="technique"
                    name="technique"
                    value={form.technique}
                    onChange={handleChange}
                    className="w-full bg-graphite-800 border border-white/10 px-4 py-3 text-cream-100 text-sm font-light focus:outline-none focus:border-gold-400/60 transition-colors appearance-none"
                  >
                    <option value="">Select technique</option>
                    <option value="fue">FUE</option>
                    <option value="dhi">DHI</option>
                    <option value="sapphire">Sapphire FUE</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-graphite-100 tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-graphite-800 border border-white/10 px-4 py-3 text-cream-100 text-sm font-light placeholder-graphite-200 focus:outline-none focus:border-gold-400/60 transition-colors resize-none"
                  placeholder="Tell us about your hair loss situation and goals..."
                />
              </div>

              <button
                type="submit"
                className="group relative w-full py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium overflow-hidden hover:bg-gold-300 transition-colors duration-300"
              >
                Send Message
              </button>

              <p className="text-xs text-graphite-200 text-center">
                We respond within 24 hours. Your information is kept strictly confidential.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
