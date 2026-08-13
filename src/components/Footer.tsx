import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const whatsapp = 'https://wa.me/447988487251?text=Hello%2C%20I%27d%20like%20a%20private%20hair%20transplant%20assessment.'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <div className="footer-brand">Turkey Hair Transplant <span>Antalya</span></div>
          <p>Clear planning for people considering hair restoration in Antalya.</p>
        </div>
        <div className="footer-nav">
          <Link to="/results">Results</Link>
          <Link to="/techniques">Techniques</Link>
          <Link to="/journey">Your journey</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <a className="footer-whatsapp" data-magnetic href={whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={19} />
          <span><small>WhatsApp</small>+44 7988 487251</span>
          <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Turkey Hair Transplant Antalya</span>
        <span>Information on this site is general and does not replace individual medical advice.</span>
      </div>
    </footer>
  )
}
