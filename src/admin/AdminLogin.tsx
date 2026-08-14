/// <reference types="vite/client" />
import { useState } from 'react'

interface Props {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    setTimeout(() => {
      const correct = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
      if (password === correct) {
        sessionStorage.setItem('admin_auth', 'true')
        onLogin()
      } else {
        setError(true)
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-graphite-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-gold-300 text-xs tracking-widest3 uppercase mb-3">Admin Panel</p>
          <h1 className="font-display text-3xl text-cream-50 font-light">Blog Management</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-graphite-100 tracking-wider uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-graphite-800 border border-white/10 text-cream-50 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/60 transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs tracking-wider">Incorrect password.</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gold-400 text-graphite-900 py-3 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
