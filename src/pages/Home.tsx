import Hero from '../components/Hero'
import TrustSection from '../components/TrustSection'
import BeforeAfter from '../components/BeforeAfter'
import Techniques from '../components/Techniques'
import Testimonials from '../components/Testimonials'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustSection />
      <BeforeAfter />
      <Techniques />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
