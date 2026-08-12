import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Pin a section for scroll-driven storytelling (process section)
 */
export function createProcessScrollPin(
  container: Element,
  progressCallback: (progress: number) => void,
) {
  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: '+=400%',
    pin: true,
    scrub: 0.5,
    onUpdate: (self) => progressCallback(self.progress),
  })
}

/**
 * Navbar scroll behavior
 */
export function navbarScroll(navbar: Element) {
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  })
}

/**
 * Refresh all ScrollTriggers (call after layout changes)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
