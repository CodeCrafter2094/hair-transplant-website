import { clinicData, navLinks } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-graphite-800 border-t border-white/5 py-16"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-cream-100 tracking-widest2 mb-4">
              {clinicData.name}
            </p>
            <p className="text-sm text-graphite-100 font-light leading-relaxed max-w-xs">
              Premium hair restoration in the heart of Istanbul. Natural results,
              surgical precision, lasting confidence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-graphite-200 tracking-widest2 uppercase mb-6">
              Navigation
            </p>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-graphite-100 hover:text-cream-100 transition-colors font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-graphite-200 tracking-widest2 uppercase mb-6">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-graphite-100 font-light" role="list">
              <li>
                <a
                  href={`tel:${clinicData.phone}`}
                  className="hover:text-cream-100 transition-colors"
                  aria-label={`Call us at ${clinicData.phone}`}
                >
                  {clinicData.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinicData.email}`}
                  className="hover:text-cream-100 transition-colors"
                  aria-label={`Email us at ${clinicData.email}`}
                >
                  {clinicData.email}
                </a>
              </li>
              <li>{clinicData.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-graphite-200">
          <p>© {year} {clinicData.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream-100 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cream-100 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
