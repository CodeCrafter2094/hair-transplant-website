import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal a block of text lines (clip-path + y)
 */
export function revealLines(
  targets: gsap.TweenTarget,
  trigger?: Element | string,
  options?: { delay?: number; stagger?: number },
) {
  return gsap.fromTo(
    targets,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      stagger: options?.stagger ?? 0.1,
      delay: options?.delay ?? 0,
      scrollTrigger: trigger
        ? {
            trigger: trigger as Element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        : undefined,
    },
  )
}

/**
 * Fade + slide up
 */
export function fadeUp(
  targets: gsap.TweenTarget,
  trigger?: Element | string,
  options?: { delay?: number; stagger?: number; y?: number },
) {
  return gsap.fromTo(
    targets,
    { y: options?.y ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      stagger: options?.stagger ?? 0.12,
      delay: options?.delay ?? 0,
      scrollTrigger: trigger
        ? {
            trigger: trigger as Element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        : undefined,
    },
  )
}

/**
 * Image reveal with scale
 */
export function imageReveal(
  container: Element,
  img: Element,
  trigger?: Element | string,
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: (trigger as Element) ?? container,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  tl.fromTo(
    container,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
  ).fromTo(
    img,
    { scale: 1.2 },
    { scale: 1, duration: 1.4, ease: 'power2.out' },
    0,
  )

  return tl
}

/**
 * Count up number animation
 */
export function countUp(
  element: Element,
  target: number,
  suffix: string,
  trigger: Element,
) {
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      element.textContent = Math.round(obj.val) + suffix
    },
  })
}

/**
 * Parallax effect
 */
export function parallax(target: Element, yAmount: number = 60) {
  return gsap.fromTo(
    target,
    { y: -yAmount / 2 },
    {
      y: yAmount / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
}

/**
 * Horizontal line draw
 */
export function drawLine(target: Element, trigger: Element) {
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    },
  )
}
