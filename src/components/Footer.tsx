import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const whatsapp =
  'https://wa.me/447988487251?text=Hello%2C%20I%27d%20like%20a%20private%20hair%20transplant%20assessment.'

const navColumns = [
  {
    heading: 'Treatments',
    links: [
      { label: 'FUE Technique', href: '/techniques' },
      { label: 'DHI Technique', href: '/techniques' },
      { label: 'Sapphire FUE', href: '/techniques' },
      { label: 'Your Journey', href: '/journey' },
    ],
  },
  {
    heading: 'Clinic',
    links: [
      { label: 'Results', href: '/results' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-graphite-900 border-t border-white/5">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <span className="font-display text-xl text-cream-50 font-light tracking-wide">
                Turkey Hair Transplant{' '}
                <span className="text-gold-300">Antalya</span>
              </span>
            </Link>
            <p className="text-graphite-100 text-sm font-light leading-relaxed max-w-sm mb-8">
              Specialist hair restoration clinic in Antalya, Turkey. Combining surgical
              precision with an honest, patient-first approach.
            </p>

            {/* Contact info */}
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-graphite-100 hover:text-gold-300 transition-colors group"
                >
                  <MessageCircle size={14} className="text-gold-400 flex-shrink-0" />
                  <span>+44 7988 487 251</span>
                  <ArrowUpRight
                    size={12}
                    className="text-graphite-300 group-hover:text-gold-300 transition-colors"
                  />
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-graphite-100">
                <Phone size={14} className="text-gold-400 flex-shrink-0" />
                <span>+90 242 000 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-graphite-100">
                <Mail size={14} className="text-gold-400 flex-shrink-0" />
                <span>info@antalyahairtransplant.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-graphite-100">
                <MapPin size={14} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Lara Caddesi No:1, Antalya, Turkey</span>
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs text-gold-300 tracking-widest uppercase mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-graphite-100 hover:text-cream-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA bar */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-4 border border-green-500/25 px-6 py-4 hover:border-green-500/50 transition-colors mb-12"
        >
          <div className="flex items-center gap-3">
            <MessageCircle size={18} className="text-green-400" />
            <div>
              <p className="text-sm text-cream-50 font-medium">Start on WhatsApp</p>
              <p className="text-xs text-graphite-200 mt-0.5">
                Private hair transplant assessment — no obligation
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-graphite-300 group-hover:text-green-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
          />
        </a>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span className="text-xs text-graphite-300">
            © {new Date().getFullYear()} Turkey Hair Transplant Antalya. All rights reserved.
          </span>
          <span className="text-xs text-graphite-300 max-w-md text-left sm:text-right leading-relaxed">
            Information on this site is general in nature and does not replace individual
            medical advice.
          </span>
        </div>
      </div>
    </footer>
  )
}
