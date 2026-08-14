import { useEffect, useState } from 'react'
import { supabase, BeforeAfterCase } from '../lib/supabase'
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react'

interface Props {
  onNew: () => void
  onEdit: (c: BeforeAfterCase) => void
}

export default function CaseList({ onNew, onEdit }: Props) {
  const [cases, setCases] = useState<BeforeAfterCase[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('before_after_cases')
      .select('*')
      .order('order_index', { ascending: true })
    setCases(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const toggle = async (c: BeforeAfterCase) => {
    await supabase.from('before_after_cases').update({ published: !c.published }).eq('id', c.id)
    fetch()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this case?')) return
    await supabase.from('before_after_cases').delete().eq('id', id)
    fetch()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl text-cream-50 font-light">Before &amp; After Cases</h2>
          <p className="text-graphite-100 text-sm mt-1">
            {cases.length} total · {cases.filter(c => c.published).length} published
          </p>
        </div>
        <button onClick={onNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors">
          <Plus size={15} /> New Case
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-graphite-200 text-sm">Loading...</div>
      ) : cases.length === 0 ? (
        <div className="text-center py-16 border border-white/5">
          <p className="text-graphite-200 text-sm mb-4">No cases yet.</p>
          <button onClick={onNew} className="text-gold-300 text-sm underline underline-offset-4">
            Add first case
          </button>
        </div>
      ) : (
        <div className="space-y-px">
          {cases.map(c => (
            <div key={c.id}
              className="flex items-center gap-4 bg-graphite-800 px-5 py-4 group hover:bg-graphite-700 transition-colors">
              <GripVertical size={14} className="text-graphite-400 flex-shrink-0" />

              {/* Thumbnails */}
              <div className="flex gap-2 flex-shrink-0">
                <img src={c.before_url} alt="before"
                  className="w-12 h-12 object-cover opacity-60" />
                <img src={c.after_url} alt="after"
                  className="w-12 h-12 object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-cream-50 text-sm font-medium truncate">{c.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs tracking-wider ${c.published ? 'text-green-400' : 'text-graphite-200'}`}>
                    {c.published ? 'published' : 'draft'}
                  </span>
                  {c.technique && <span className="text-xs text-graphite-300">· {c.technique}</span>}
                  {c.grafts && <span className="text-xs text-graphite-300">· {c.grafts}</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggle(c)} title={c.published ? 'Unpublish' : 'Publish'}
                  className="p-2 text-graphite-200 hover:text-gold-300 transition-colors">
                  {c.published ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button onClick={() => onEdit(c)} title="Edit"
                  className="p-2 text-graphite-200 hover:text-cream-50 transition-colors">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => remove(c.id)} title="Delete"
                  className="p-2 text-graphite-200 hover:text-red-400 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
