import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(
    () => document.documentElement.dataset.motion === 'full' && sessionStorage.getItem('intro-seen') !== 'true',
  )

  useEffect(() => {
    if (!visible) return

    const duration = 1100
    const startedAt = performance.now()
    let frame = 0
    let exitTimer = 0
    let removeTimer = 0

    const update = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        frame = requestAnimationFrame(update)
      } else {
        sessionStorage.setItem('intro-seen', 'true')
        exitTimer = window.setTimeout(() => setExiting(true), 110)
        removeTimer = window.setTimeout(() => setVisible(false), 560)
      }
    }

    frame = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className={`page-loader ${exiting ? 'is-exiting' : ''}`} aria-hidden="true">
      <div className="loader-topline">
        <span>Entering Antalya</span>
        <span>Private planning system</span>
      </div>
      <div className="loader-count">{String(progress).padStart(2, '0')}</div>
      <div className="loader-bottom">
        <span>Turkey Hair Transplant</span>
        <div><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <span>{progress}%</span>
      </div>
    </div>
  )
}
