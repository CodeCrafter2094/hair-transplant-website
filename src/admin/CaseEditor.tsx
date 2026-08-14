import { useState, useRef } from 'react'
import { supabase, BeforeAfterCase } from '../lib/supabase'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'

interface Props {
  item: BeforeAfterCase | null
  onBack: () => void
  onSaved: () => void
}

type Form = {
  title: string
  technique: string
  grafts: string
  months: string
  before_url: string
  after_url: string
  order_index: number
  published: boolean
}

const empty: Form = {
  title: '', technique: '', grafts: '', months: '',
  before_url: '', after_url: '', order_index: 0, published: false,
}

export default function CaseEditor({ item, onBack, onSaved }: Props) {
  const [form, setForm] = useState<Form>(
    item ? {
      title: item.title, technique: item.technique || '',
      grafts: item.grafts || '', months: item.months || '',
      before_url: item.before_url, after_url: item.after_url,
      order_index: item.order_index, published: item.published,
    } : { ...empty }
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState<'before' | 'after' | null>(null)
  const beforeRef = useRef<HTMLInputElement>(null)
  const afterRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof Form, v: unknown) => setForm(p => ({ ...p, [k]: v }))

  const upload = async (file: File, field: 'before_url' | 'after_url') => {
    const side = field === 'before_url' ? 'before' : 'after'
    setUploading(side)
    const ext = file.name.split('.').pop()
    const path = `cases/${Date.now()}-${side}.${ext}`
    const { data, error } = await supabase.storage
      .from('blog-images').upload(path, file, { cacheControl: '3600' })
    if (error) { setError(error.message); setUploading(null); return }
    const { data: url } = supabase.storage.from('blog-images').getPublicUrl(data.path)
    set(field, url.publicUrl)
    setUploading(null)
  }

  const handleSave = async (pub?: boolean) => {
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.before_url) { setError('Before image is required.'); return }
    if (!form.after_url) { setError('After image is required.'); return }
    setSaving(true); setError(null)
    const payload = { ...form, published: pub !== undefined ? pub : form.published }
    let err
    if (item) {
      ;({ error: err } = await supabase.from('before_after_cases').update(payload).eq('id', item.id))
    } else {
      ;({ error: err } = await supabase.from('before_after_cases').insert([payload]))
    }
    setSaving(false)
    if (err) { setError(err.message); return }
    onSaved()
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-graphite-100 hover:text-cream-50 text-sm transition-colors">
          <ArrowLeft size={15} /> Back to cases
        </button>
        <div className="flex gap-2">
          <button onClick={() => handleSave(false)} disabled={saving}
            className="px-4 py-2 border border-white/15 text-cream-50 text-sm tracking-wider hover:border-white/30 transition-colors disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors disabled:opacity-50">
            <Save size={14} />
            {saving ? 'Saving...' : form.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-400/10 border border-red-400/30 text-red-300 text-sm flex items-center justify-between">
          {error} <button onClick={() => setError(null)}><X size={14} /></button>
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs text-graphite-100 tracking-wider uppercase">Title *</label>
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
            className="admin-input" placeholder="e.g. Crown & Hairline Restoration" />
        </div>

        {/* Technique / Grafts / Months */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-graphite-100 tracking-wider uppercase">Technique</label>
            <select value={form.technique} onChange={e => set('technique', e.target.value)}
              className="admin-input bg-graphite-800">
              <option value="">— Select —</option>
              <option>FUE</option>
              <option>DHI</option>
              <option>Sapphire FUE</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-graphite-100 tracking-wider uppercase">Grafts</label>
            <input type="text" value={form.grafts} onChange={e => set('grafts', e.target.value)}
              className="admin-input" placeholder="e.g. 3,200 Grafts" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-graphite-100 tracking-wider uppercase">Time Post-Op</label>
            <input type="text" value={form.months} onChange={e => set('months', e.target.value)}
              className="admin-input" placeholder="e.g. 12 months post-op" />
          </div>
        </div>

        {/* Order */}
        <div className="space-y-1.5">
          <label className="text-xs text-graphite-100 tracking-wider uppercase">Display Order</label>
          <input type="number" value={form.order_index}
            onChange={e => set('order_index', Number(e.target.value))}
            className="admin-input w-32" min={0} />
          <p className="text-xs text-graphite-300">Lower number = shown first</p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(['before', 'after'] as const).map(side => {
            const field = side === 'before' ? 'before_url' : 'after_url'
            const ref = side === 'before' ? beforeRef : afterRef
            const url = form[field]
            return (
              <div key={side} className="border border-white/8 p-5 space-y-4">
                <p className="text-xs text-gold-300 tracking-widest uppercase">
                  {side === 'before' ? 'Before Image *' : 'After Image *'}
                </p>
                <div className="flex gap-2">
                  <input type="text" value={url} onChange={e => set(field, e.target.value)}
                    className="admin-input flex-1" placeholder="https://... or upload" />
                  <button onClick={() => ref.current?.click()}
                    disabled={uploading === side}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-gold-400/40 text-gold-300 text-xs hover:border-gold-400 transition-colors disabled:opacity-50 whitespace-nowrap">
                    <Upload size={13} />
                    {uploading === side ? '...' : 'Upload'}
                  </button>
                  <input ref={ref} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) upload(f, field) }} />
                </div>
                {url && (
                  <div className="relative">
                    <img src={url} alt={side}
                      className={`w-full aspect-video object-cover ${side === 'before' ? 'grayscale' : ''}`} />
                    <span className="absolute top-2 left-2 glass px-2 py-0.5 text-xs uppercase tracking-wider text-cream-100">
                      {side}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom save */}
      <div className="mt-10 pt-6 flex justify-end gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => handleSave(false)} disabled={saving}
          className="px-6 py-3 border border-white/15 text-cream-50 text-sm tracking-wider hover:border-white/30 transition-colors disabled:opacity-50">
          Save Draft
        </button>
        <button onClick={() => handleSave(true)} disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors disabled:opacity-50">
          <Save size={14} />
          {saving ? 'Saving...' : 'Publish Case'}
        </button>
      </div>
    </div>
  )
}
