import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Results from './pages/Results'
import Treatments from './pages/Treatments'
import Process from './pages/Process'
import Contact from './pages/Contact'
import InteractiveMotion from './components/InteractiveMotion'
import MotionControl from './components/MotionControl'
import PageLoader from './components/PageLoader'
import AdminPanel from './admin/AdminPanel'
import Blog from './pages/Blog'
import BlogPostPage from './pages/BlogPost'
import BeforeAfterPage from './pages/BeforeAfterPage'

gsap.registerPlugin(ScrollTrigger)

function Layout() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => { lenis.raf(time * 1000) })
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <>
      <PageLoader />
      <InteractiveMotion />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/techniques" element={<Treatments />} />
        <Route path="/journey" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/before-after" element={<BeforeAfterPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <MotionControl />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}
