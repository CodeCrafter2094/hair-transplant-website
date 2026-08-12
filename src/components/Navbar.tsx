import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/siteData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-graphite-900/85 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-display text-lg font-light tracking-widest text-cream-100 hover:text-gold-300 transition-colors"
              aria-label="Antalya Hair Transplant — Home"
            >
              Antalya <span className="text-gold-300">Hair</span> Transplant
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className={`text-sm tracking-wider uppercase font-light transition-colors ${
                      isActive(link.href)
                        ? 'text-gold-300'
                        : 'text-graphite-100 hover:text-cream-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="group relative px-6 py-2.5 text-sm tracking-wider uppercase font-light overflow-hidden border border-gold-400/60 text-gold-300 hover:text-graphite-900 transition-colors duration-300 inline-block"
              >
                <span className="relative z-10">Free Consultation</span>
                <span className="absolute inset-0 bg-gold-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden text-cream-100 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-graphite-900/98 backdrop-blur-2xl flex flex-col justify-center px-8 transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="space-y-8" role="list">
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: 'transform 0.4s ease, opacity 0.4s ease',
              }}
            >
              <Link
                to={link.href}
                className="font-display text-4xl font-light text-cream-100 hover:text-gold-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mt-12"
          style={{
            transitionDelay: menuOpen ? '360ms' : '0ms',
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'transform 0.4s ease, opacity 0.4s ease',
          }}
        >
          <Link
            to="/contact"
            className="block w-full py-4 border border-gold-400/60 text-gold-300 text-sm tracking-widest uppercase text-center hover:bg-gold-400/10 transition-colors"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </>
  )
}
