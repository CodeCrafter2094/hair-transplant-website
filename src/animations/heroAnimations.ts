import gsap from 'gsap'

/**
 * Hero entrance animation sequence
 */
export function runHeroAnimation(refs: {
  bg: Element | null
  eyebrow: Element | null
  lines: NodeListOf<Element> | Element[]
  ctas: Element | null
  scroll: Element | null
  stats: Element | null
}) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 1. BG scale-up
  if (refs.bg) {
    tl.fromTo(refs.bg, { scale: 1.1 }, { scale: 1, duration: 2, ease: 'power2.out' }, 0)
  }

  // 2. Eyebrow label
  if (refs.eyebrow) {
    tl.fromTo(
      refs.eyebrow,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.3,
    )
  }

  // 3. Headline lines word by word
  if (refs.lines.length) {
    tl.fromTo(
      refs.lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.12 },
      0.5,
    )
  }

  // 4. CTAs
  if (refs.ctas) {
    tl.fromTo(
      refs.ctas,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.2,
    )
  }

  // 5. Scroll indicator
  if (refs.scroll) {
    tl.fromTo(
      refs.scroll,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.6,
    )
  }

  // 6. Stats bar
  if (refs.stats) {
    tl.fromTo(
      refs.stats,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.4,
    )
  }

  return tl
}
