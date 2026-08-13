import { useEffect, useState } from 'react'
import { supabase, BlogPost } from '../lib/supabase'
import { Plus, Edit2, Trash2, Eye, EyeOff, Search } from 'lucide-react'

interface Props {
  onNew: () => void
  onEdit: (post: BlogPost) => void
}

export default function PostList({ onNew, onEdit }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  const toggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from('blog_posts')
      .update({
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null,
      })
      .eq('id', post.id)
    if (!error) fetchPosts()
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeleting(id)
    await supabase.from('blog_posts').delete().eq('id', id)
    setDeleting(null)
    fetchPosts()
  }

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl text-cream-50 font-light">Blog Posts</h2>
          <p className="text-graphite-100 text-sm mt-1">
            {posts.length} total · {posts.filter((p) => p.status === 'published').length} published
          </p>
        </div>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors"
        >
          <Plus size={15} />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-300" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-graphite-800 border border-white/10 text-cream-50 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-400/60 transition-colors"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-xs tracking-wider uppercase transition-colors ${
                filter === f
                  ? 'bg-gold-400 text-graphite-900 font-medium'
                  : 'bg-graphite-800 text-graphite-100 hover:text-cream-50 border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-20 text-graphite-200 text-sm">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-white/5">
          <p className="text-graphite-200 text-sm mb-4">No posts found.</p>
          <button onClick={onNew} className="text-gold-300 text-sm underline underline-offset-4">
            Create your first post
          </button>
        </div>
      ) : (
        <div className="space-y-px">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 bg-graphite-800 px-5 py-4 group hover:bg-graphite-700 transition-colors"
            >
              {/* Featured image thumbnail */}
              {post.featured_image_url ? (
                <img
                  src={post.featured_image_url}
                  alt=""
                  className="w-12 h-12 object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 bg-graphite-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-graphite-300 text-xs">IMG</span>
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-cream-50 text-sm font-medium truncate">{post.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-xs tracking-wider ${
                      post.status === 'published' ? 'text-green-400' : 'text-graphite-200'
                    }`}
                  >
                    {post.status}
                  </span>
                  {post.category && (
                    <span className="text-xs text-graphite-300">· {post.category}</span>
                  )}
                  <span className="text-xs text-graphite-300">
                    · {new Date(post.created_at).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleStatus(post)}
                  title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                  className="p-2 text-graphite-200 hover:text-gold-300 transition-colors"
                >
                  {post.status === 'published' ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button
                  onClick={() => onEdit(post)}
                  title="Edit"
                  className="p-2 text-graphite-200 hover:text-cream-50 transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  disabled={deleting === post.id}
                  title="Delete"
                  className="p-2 text-graphite-200 hover:text-red-400 transition-colors disabled:opacity-50"
                >
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
