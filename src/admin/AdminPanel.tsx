import { useState } from 'react'
import AdminLogin from './AdminLogin'
import PostList from './PostList'
import PostEditor from './PostEditor'
import CaseList from './CaseList'
import CaseEditor from './CaseEditor'
import { BlogPost, BeforeAfterCase } from '../lib/supabase'
import { LogOut, FileText, Images } from 'lucide-react'

type Section = 'blog' | 'cases'
type BlogView = 'list' | 'new' | 'edit'
type CaseView = 'list' | 'new' | 'edit'

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true')
  const [section, setSection] = useState<Section>('blog')

  // Blog state
  const [blogView, setBlogView] = useState<BlogView>('list')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  // Cases state
  const [caseView, setCaseView] = useState<CaseView>('list')
  const [editingCase, setEditingCase] = useState<BeforeAfterCase | null>(null)

  const logout = () => { sessionStorage.removeItem('admin_auth'); setAuthed(false) }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  const tabs = [
    { id: 'blog' as Section, label: 'Blog Posts', icon: <FileText size={15} /> },
    { id: 'cases' as Section, label: 'Before & After', icon: <Images size={15} /> },
  ]

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
            <span className="text-xs text-graphite-200 tracking-wider uppercase">Admin</span>
          </div>
          <button onClick={logout}
            className="inline-flex items-center gap-2 text-graphite-200 hover:text-cream-50 text-xs tracking-wider uppercase transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Section tabs */}
        <div className="max-w-5xl mx-auto px-6 flex gap-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setSection(t.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase transition-colors ${
                section === t.id
                  ? 'text-gold-300 border-b-2 border-gold-400 -mb-px'
                  : 'text-graphite-200 hover:text-cream-50'
              }`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Blog section */}
        {section === 'blog' && blogView === 'list' && (
          <PostList
            onNew={() => { setEditingPost(null); setBlogView('new') }}
            onEdit={p => { setEditingPost(p); setBlogView('edit') }}
          />
        )}
        {section === 'blog' && (blogView === 'new' || blogView === 'edit') && (
          <PostEditor
            post={editingPost}
            onBack={() => setBlogView('list')}
            onSaved={() => setBlogView('list')}
          />
        )}

        {/* Cases section */}
        {section === 'cases' && caseView === 'list' && (
          <CaseList
            onNew={() => { setEditingCase(null); setCaseView('new') }}
            onEdit={c => { setEditingCase(c); setCaseView('edit') }}
          />
        )}
        {section === 'cases' && (caseView === 'new' || caseView === 'edit') && (
          <CaseEditor
            item={editingCase}
            onBack={() => setCaseView('list')}
            onSaved={() => setCaseView('list')}
          />
        )}
      </main>
    </div>
  )
}
