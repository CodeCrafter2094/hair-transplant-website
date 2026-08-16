import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Results', description: 'How to assess real evidence', href: '/results' },
  { label: 'Before & After', description: 'Real patient transformations', href: '/before-after' },
  { label: 'Techniques', description: 'FUE, DHI and Sapphire FUE', href: '/techniques' },
  { label: 'Your journey', description: 'From photos to follow-up', href: '/journey' },
  { label: 'Blog', description: 'Hair transplant guides & tips', href: '/blog' },
  { label: 'Contact', description: 'Start a private assessment', href: '/contact' },
]

const whatsappUrl =
  'https://wa.me/447988487251?text=Hello%2C%20I%27d%20like%20a%20private%20hair%20transplant%20assessment.'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className={`site-header ${scrolled || location.pathname !== '/' ? 'is-scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="nav-shell" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Turkey Hair Transplant Antalya home">
          <span className="brand-copy">
            <span className="brand-line1">Turkey Hair Transplant</span>
            <span className="brand-line2">Antalya</span>
          </span>
        </Link>

        <ul className="nav-links" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <Link className={location.pathname === link.href ? 'is-active' : ''} to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <a className="nav-whatsapp" data-magnetic href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={17} aria-hidden="true" />
          <span>Private assessment</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="menu-toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-heading">
            <p>Explore the clinic</p>
            <span>Antalya / UK private line</span>
          </div>
          <div className="mobile-route-list">
            {links.map((link, index) => (
              <Link key={link.href} to={link.href} tabIndex={menuOpen ? 0 : -1} className={location.pathname === link.href ? 'is-active' : ''}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><b>{link.label}</b><small>{link.description}</small></div>
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="mobile-menu-footer">
            <a className="mobile-wa" href={whatsappUrl} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
              <MessageCircle size={18} /> Start on WhatsApp
            </a>
            <p>+44 7988 487251</p>
          </div>
        </div>
      </div>
    </header>
  )
}
