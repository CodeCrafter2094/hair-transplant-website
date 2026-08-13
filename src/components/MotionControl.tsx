import { useEffect, useState } from 'react'
import { Activity, Pause } from 'lucide-react'

type MotionMode = 'full' | 'reduced'

export default function MotionControl() {
  const [mode] = useState<MotionMode>(() =>
    document.documentElement.dataset.motion === 'full' ? 'full' : 'reduced',
  )

  useEffect(() => {
    document.documentElement.dataset.motion = mode
  }, [mode])

  const toggle = () => {
    const next: MotionMode = mode === 'full' ? 'reduced' : 'full'
    localStorage.setItem('site-motion', next)
    document.documentElement.dataset.motion = next
    window.location.reload()
  }

  return (
    <button
      className="motion-control"
      type="button"
      onClick={toggle}
      aria-label={mode === 'full' ? 'Reduce website motion' : 'Enable full website motion'}
    >
      {mode === 'full' ? <Activity size={14} /> : <Pause size={14} />}
      <span>Motion</span>
      <b>{mode === 'full' ? 'On' : 'Reduced'}</b>
    </button>
  )
}
