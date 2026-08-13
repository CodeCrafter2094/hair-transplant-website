import { useState } from 'react'
import AdminLogin from './AdminLogin'
import PostList from './PostList'
import PostEditor from './PostEditor'
import { BlogPost } from '../lib/supabase'
import { LogOut } from 'lucide-react'

type View = 'list' | 'new' | 'edit'

export default function AdminPanel() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  )
  const [view, setView] = useState<View>('list')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />
  }

  return (
    <div className="min-h-screen bg-graphite-900">
      {/* Header */}
      <header className="border-b border-white/8 bg-graphite-900/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-lg text-cream-50 font-light">
              Antalya <span className="text-gold-300">Hair</span> Transplant
            </span>
            <span className="text-graphite-400">·</span>
            <span className="text-xs text-graphite-200 tracking-wider uppercase">Blog Admin</span>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-graphite-200 hover:text-cream-50 text-xs tracking-wider uppercase transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {view === 'list' && (
          <PostList
            onNew={() => { setEditingPost(null); setView('new') }}
            onEdit={(post) => { setEditingPost(post); setView('edit') }}
          />
        )}
        {(view === 'new' || view === 'edit') && (
          <PostEditor
            post={editingPost}
            onBack={() => setView('list')}
            onSaved={() => setView('list')}
          />
        )}
      </main>
    </div>
  )
}
