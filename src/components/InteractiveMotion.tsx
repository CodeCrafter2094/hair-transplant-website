import { useEffect } from 'react'

export default function InteractiveMotion() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = document.documentElement.dataset.motion === 'reduced'
    if (!finePointer || reducedMotion) return

    document.body.classList.add('has-custom-cursor')
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const ring = document.querySelector<HTMLElement>('.cursor-ring')
    if (!dot || !ring) return

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let frame = 0

    const render = () => {
      ringX += (pointerX - ringX) * 0.14
      ringY += (pointerY - ringY) * 0.14
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate3d(-50%, -50%, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`
      frame = requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      document.body.classList.add('cursor-active')
      const interactive = (event.target as Element | null)?.closest('a, button, input, textarea, select')
      document.body.classList.toggle('cursor-hover', Boolean(interactive))
    }

    const onPointerLeave = () => document.body.classList.remove('cursor-active')
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const cleanups = magneticElements.map((element) => {
      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect()
        const x = (event.clientX - rect.left - rect.width / 2) * 0.14
        const y = (event.clientY - rect.top - rect.height / 2) * 0.14
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      const leave = () => {
        element.style.transform = 'translate3d(0, 0, 0)'
      }
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', leave)
      return () => {
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', leave)
      }
    })

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      cleanups.forEach((cleanup) => cleanup())
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
      document.body.classList.remove('has-custom-cursor', 'cursor-active', 'cursor-hover')
    }
  }, [])

  return (
    <div className="cursor-system" aria-hidden="true">
      <span className="cursor-dot" />
      <span className="cursor-ring" />
    </div>
  )
}
