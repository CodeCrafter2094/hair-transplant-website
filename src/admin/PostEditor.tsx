import { useState, useRef } from 'react'
import { supabase, BlogPost, BlogPostInsert } from '../lib/supabase'
import { ArrowLeft, Save, Upload, X, ChevronDown, ChevronUp } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'

interface Props {
  post: BlogPost | null
  onBack: () => void
  onSaved: () => void
}

type Tab = 'content' | 'seo' | 'og' | 'twitter' | 'schema'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const emptyPost: Partial<BlogPostInsert> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: 'Admin',
  category: '',
  tags: [],
  status: 'draft',
  published_at: null,
  featured_image_url: '',
  featured_image_alt: '',
  featured_image_caption: '',
  seo_title: '',
  seo_description: '',
  canonical_url: '',
  og_title: '',
  og_description: '',
  og_image_url: '',
  twitter_title: '',
  twitter_description: '',
  twitter_image_url: '',
  twitter_card_type: 'summary_large_image',
  schema_type: 'BlogPosting',
  schema_extra: null,
}

export default function PostEditor({ post, onBack, onSaved }: Props) {
  const [form, setForm] = useState<Partial<BlogPostInsert>>(
    post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content || '',
          author: post.author,
          category: post.category || '',
          tags: post.tags || [],
          status: post.status,
          published_at: post.published_at,
          featured_image_url: post.featured_image_url || '',
          featured_image_alt: post.featured_image_alt || '',
          featured_image_caption: post.featured_image_caption || '',
          seo_title: post.seo_title || '',
          seo_description: post.seo_description || '',
          canonical_url: post.canonical_url || '',
          og_title: post.og_title || '',
          og_description: post.og_description || '',
          og_image_url: post.og_image_url || '',
          twitter_title: post.twitter_title || '',
          twitter_description: post.twitter_description || '',
          twitter_image_url: post.twitter_image_url || '',
          twitter_card_type: post.twitter_card_type || 'summary_large_image',
          schema_type: post.schema_type || 'BlogPosting',
          schema_extra: post.schema_extra,
        }
      : { ...emptyPost }
  )

  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [schemaExpanded, setSchemaExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof BlogPostInsert, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleTitleChange = (value: string) => {
    set('title', value)
    if (!post) set('slug', slugify(value))
    if (!form.seo_title) set('seo_title', value)
    if (!form.og_title) set('og_title', value)
    if (!form.twitter_title) set('twitter_title', value)
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !(form.tags || []).includes(t)) {
      set('tags', [...(form.tags || []), t])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    set('tags', (form.tags || []).filter((t) => t !== tag))
  }

  const uploadImage = async (file: File, field: 'featured_image_url' | 'og_image_url' | 'twitter_image_url') => {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) {
      setError(`Upload failed: ${error.message}`)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(data.path)
    set(field, urlData.publicUrl)
    setUploading(false)
  }

  const handleSave = async (status?: 'draft' | 'published') => {
    if (!form.title?.trim()) { setError('Title is required.'); return }
    if (!form.slug?.trim()) { setError('Slug is required.'); return }

    setSaving(true)
    setError(null)

    const payload: Partial<BlogPostInsert> = {
      ...form,
      status: status || form.status,
      published_at:
        (status || form.status) === 'published' && !form.published_at
          ? new Date().toISOString()
          : form.published_at,
    }

    let err
    if (post) {
      ;({ error: err } = await supabase.from('blog_posts').update(payload).eq('id', post.id))
    } else {
      ;({ error: err } = await supabase.from('blog_posts').insert([payload]))
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    onSaved()
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'content', label: 'Content' },
    { id: 'seo', label: 'SEO' },
    { id: 'og', label: 'Open Graph' },
    { id: 'twitter', label: 'Twitter Card' },
    { id: 'schema', label: 'Schema' },
  ]

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-graphite-100 hover:text-cream-50 text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Back to posts
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs tracking-wider px-3 py-1 ${
              form.status === 'published'
                ? 'bg-green-400/15 text-green-400'
                : 'bg-graphite-700 text-graphite-200'
            }`}
          >
            {form.status}
          </span>
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2 border border-white/15 text-cream-50 text-sm tracking-wider hover:border-white/30 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? 'Saving...' : form.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-400/10 border border-red-400/30 text-red-300 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}><X size={14} /></button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-px mb-8 border-b border-white/8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-3 text-xs tracking-wider uppercase transition-colors ${
              activeTab === t.id
                ? 'text-gold-300 border-b-2 border-gold-400 -mb-px'
                : 'text-graphite-200 hover:text-cream-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── CONTENT TAB ─── */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <Field label="Title *">
            <input
              type="text"
              value={form.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="admin-input"
              placeholder="Post title"
            />
          </Field>

          <Field label="Slug *">
            <div className="flex gap-2">
              <input
                type="text"
                value={form.slug || ''}
                onChange={(e) => set('slug', slugify(e.target.value))}
                className="admin-input flex-1"
                placeholder="post-url-slug"
              />
              <button
                onClick={() => set('slug', slugify(form.title || ''))}
                className="px-3 py-2 bg-graphite-700 text-graphite-100 text-xs hover:text-cream-50 transition-colors whitespace-nowrap"
              >
                Auto
              </button>
            </div>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Author">
              <input
                type="text"
                value={form.author || ''}
                onChange={(e) => set('author', e.target.value)}
                className="admin-input"
              />
            </Field>
            <Field label="Category">
              <input
                type="text"
                value={form.category || ''}
                onChange={(e) => set('category', e.target.value)}
                className="admin-input"
                placeholder="e.g. Hair Transplant Tips"
              />
            </Field>
          </div>

          <Field label="Excerpt">
            <textarea
              value={form.excerpt || ''}
              onChange={(e) => set('excerpt', e.target.value)}
              className="admin-input h-20 resize-none"
              placeholder="Short summary shown in post listings..."
            />
          </Field>

          <Field label="Tags">
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                  className="admin-input flex-1"
                  placeholder="Add tag and press Enter"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-graphite-700 text-graphite-100 text-xs hover:text-cream-50 transition-colors"
                >
                  Add
                </button>
              </div>
              {(form.tags || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(form.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-graphite-700 text-graphite-100 text-xs"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* Featured Image */}
          <div className="border border-white/8 p-5 space-y-4">
            <p className="text-xs text-gold-300 tracking-widest uppercase">Featured Image</p>

            <div className="flex gap-3">
              <input
                type="text"
                value={form.featured_image_url || ''}
                onChange={(e) => set('featured_image_url', e.target.value)}
                className="admin-input flex-1"
                placeholder="https://... or upload below"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gold-400/40 text-gold-300 text-xs hover:border-gold-400 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                <Upload size={13} />
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) uploadImage(file, 'featured_image_url')
                }}
              />
            </div>

            {form.featured_image_url && (
              <img
                src={form.featured_image_url}
                alt="preview"
                className="w-full max-h-56 object-cover"
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Alt Text">
                <input
                  type="text"
                  value={form.featured_image_alt || ''}
                  onChange={(e) => set('featured_image_alt', e.target.value)}
                  className="admin-input"
                  placeholder="Describe the image for accessibility & SEO"
                />
              </Field>
              <Field label="Caption">
                <input
                  type="text"
                  value={form.featured_image_caption || ''}
                  onChange={(e) => set('featured_image_caption', e.target.value)}
                  className="admin-input"
                  placeholder="Optional caption shown below image"
                />
              </Field>
            </div>
          </div>

          {/* Content editor */}
          <Field label="Content">
            <div data-color-mode="dark">
              <MDEditor
                value={form.content || ''}
                onChange={(v) => set('content', v || '')}
                height={450}
                preview="edit"
              />
            </div>
          </Field>
        </div>
      )}

      {/* ─── SEO TAB ─── */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="border border-gold-400/15 p-5 bg-gold-400/5 text-xs text-graphite-100 leading-relaxed">
            SEO metadata controls how your post appears in search engine results. Title should be
            50–60 characters; description 150–160 characters.
          </div>

          <Field label="SEO Title" hint={`${(form.seo_title || '').length}/60 chars`}>
            <input
              type="text"
              value={form.seo_title || ''}
              onChange={(e) => set('seo_title', e.target.value)}
              className="admin-input"
              placeholder="Defaults to post title if empty"
              maxLength={70}
            />
            <CharBar value={form.seo_title || ''} max={60} />
          </Field>

          <Field label="Meta Description" hint={`${(form.seo_description || '').length}/160 chars`}>
            <textarea
              value={form.seo_description || ''}
              onChange={(e) => set('seo_description', e.target.value)}
              className="admin-input h-24 resize-none"
              placeholder="Compelling description for search results..."
              maxLength={180}
            />
            <CharBar value={form.seo_description || ''} max={160} />
          </Field>

          <Field label="Canonical URL">
            <input
              type="url"
              value={form.canonical_url || ''}
              onChange={(e) => set('canonical_url', e.target.value)}
              className="admin-input"
              placeholder="https://yourdomain.com/blog/post-slug (leave empty to auto-generate)"
            />
          </Field>

          {/* SERP Preview */}
          {(form.seo_title || form.title) && (
            <div className="border border-white/8 p-5">
              <p className="text-xs text-graphite-200 tracking-wider uppercase mb-4">
                Search Result Preview
              </p>
              <div className="space-y-1">
                <p className="text-xs text-green-400">
                  {form.canonical_url || `https://yourdomain.com/blog/${form.slug}`}
                </p>
                <p className="text-blue-400 text-lg leading-tight hover:underline cursor-pointer">
                  {form.seo_title || form.title || 'Post Title'}
                </p>
                <p className="text-graphite-100 text-sm leading-relaxed">
                  {form.seo_description || form.excerpt || 'Meta description will appear here...'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── OPEN GRAPH TAB ─── */}
      {activeTab === 'og' && (
        <div className="space-y-6">
          <div className="border border-gold-400/15 p-5 bg-gold-400/5 text-xs text-graphite-100 leading-relaxed">
            Open Graph tags control how your post appears when shared on Facebook, LinkedIn, and
            other platforms. OG image should be 1200×630px.
          </div>

          <Field label="OG Title">
            <input
              type="text"
              value={form.og_title || ''}
              onChange={(e) => set('og_title', e.target.value)}
              className="admin-input"
              placeholder="Defaults to SEO title or post title"
            />
          </Field>

          <Field label="OG Description">
            <textarea
              value={form.og_description || ''}
              onChange={(e) => set('og_description', e.target.value)}
              className="admin-input h-24 resize-none"
              placeholder="Description shown in social previews..."
            />
          </Field>

          <Field label="OG Image URL">
            <div className="flex gap-3">
              <input
                type="text"
                value={form.og_image_url || ''}
                onChange={(e) => set('og_image_url', e.target.value)}
                className="admin-input flex-1"
                placeholder="https://... (1200×630px recommended)"
              />
              <button
                onClick={() => set('og_image_url', form.featured_image_url || '')}
                className="px-3 py-2 bg-graphite-700 text-graphite-100 text-xs hover:text-cream-50 transition-colors whitespace-nowrap"
              >
                Use Featured
              </button>
            </div>
          </Field>

          {/* OG Preview */}
          {(form.og_title || form.title) && (
            <div className="border border-white/8 overflow-hidden">
              <p className="text-xs text-graphite-200 tracking-wider uppercase p-4 border-b border-white/8">
                Social Preview
              </p>
              {form.og_image_url && (
                <img src={form.og_image_url} alt="" className="w-full max-h-48 object-cover" />
              )}
              <div className="p-4 bg-graphite-700">
                <p className="text-xs text-graphite-200 uppercase tracking-wider mb-1">
                  yourdomain.com
                </p>
                <p className="text-cream-50 font-medium text-sm">
                  {form.og_title || form.seo_title || form.title}
                </p>
                <p className="text-graphite-100 text-xs mt-1 leading-relaxed">
                  {form.og_description || form.seo_description || form.excerpt}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TWITTER CARD TAB ─── */}
      {activeTab === 'twitter' && (
        <div className="space-y-6">
          <div className="border border-gold-400/15 p-5 bg-gold-400/5 text-xs text-graphite-100 leading-relaxed">
            Twitter Card tags control how your post appears when shared on X (Twitter). Use
            summary_large_image for a big image preview.
          </div>

          <Field label="Card Type">
            <select
              value={form.twitter_card_type || 'summary_large_image'}
              onChange={(e) => set('twitter_card_type', e.target.value)}
              className="admin-input"
            >
              <option value="summary_large_image">Summary Large Image</option>
              <option value="summary">Summary</option>
            </select>
          </Field>

          <Field label="Twitter Title">
            <input
              type="text"
              value={form.twitter_title || ''}
              onChange={(e) => set('twitter_title', e.target.value)}
              className="admin-input"
              placeholder="Defaults to OG title or post title"
            />
          </Field>

          <Field label="Twitter Description">
            <textarea
              value={form.twitter_description || ''}
              onChange={(e) => set('twitter_description', e.target.value)}
              className="admin-input h-24 resize-none"
            />
          </Field>

          <Field label="Twitter Image URL">
            <div className="flex gap-3">
              <input
                type="text"
                value={form.twitter_image_url || ''}
                onChange={(e) => set('twitter_image_url', e.target.value)}
                className="admin-input flex-1"
                placeholder="https://..."
              />
              <button
                onClick={() => set('twitter_image_url', form.og_image_url || form.featured_image_url || '')}
                className="px-3 py-2 bg-graphite-700 text-graphite-100 text-xs hover:text-cream-50 transition-colors whitespace-nowrap"
              >
                Use OG
              </button>
            </div>
          </Field>

          {/* Twitter Preview */}
          {(form.twitter_title || form.og_title || form.title) && (
            <div className="border border-white/8 overflow-hidden rounded">
              <p className="text-xs text-graphite-200 tracking-wider uppercase p-4 border-b border-white/8">
                X (Twitter) Preview
              </p>
              {form.twitter_image_url && (
                <img
                  src={form.twitter_image_url}
                  alt=""
                  className="w-full max-h-48 object-cover"
                />
              )}
              <div className="p-4 bg-graphite-700">
                <p className="text-cream-50 font-medium text-sm">
                  {form.twitter_title || form.og_title || form.title}
                </p>
                <p className="text-graphite-100 text-xs mt-1 leading-relaxed">
                  {form.twitter_description || form.og_description || form.excerpt}
                </p>
                <p className="text-graphite-300 text-xs mt-2">yourdomain.com</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── SCHEMA TAB ─── */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="border border-gold-400/15 p-5 bg-gold-400/5 text-xs text-graphite-100 leading-relaxed">
            Schema.org structured data helps search engines understand your content and can enable
            rich results (breadcrumbs, article info, etc.) in Google Search.
          </div>

          <Field label="Schema Type">
            <select
              value={form.schema_type || 'BlogPosting'}
              onChange={(e) => set('schema_type', e.target.value)}
              className="admin-input"
            >
              <option value="BlogPosting">BlogPosting</option>
              <option value="Article">Article</option>
              <option value="NewsArticle">NewsArticle</option>
              <option value="MedicalWebPage">MedicalWebPage</option>
            </select>
          </Field>

          {/* Auto-generated preview */}
          <div>
            <button
              onClick={() => setSchemaExpanded(!schemaExpanded)}
              className="flex items-center gap-2 text-xs text-graphite-200 tracking-wider uppercase hover:text-cream-50 transition-colors mb-3"
            >
              {schemaExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              Preview Auto-generated JSON-LD
            </button>
            {schemaExpanded && (
              <pre className="bg-graphite-800 border border-white/8 p-5 text-xs text-green-300 overflow-x-auto leading-relaxed rounded">
                {JSON.stringify(
                  {
                    '@context': 'https://schema.org',
                    '@type': form.schema_type || 'BlogPosting',
                    headline: form.seo_title || form.title,
                    description: form.seo_description || form.excerpt,
                    image: form.featured_image_url || undefined,
                    datePublished: form.published_at || new Date().toISOString(),
                    dateModified: new Date().toISOString(),
                    author: {
                      '@type': 'Person',
                      name: form.author || 'Admin',
                    },
                    publisher: {
                      '@type': 'Organization',
                      name: 'Antalya Hair Transplant',
                      url: 'https://yourdomain.com',
                    },
                    url: form.canonical_url || `https://yourdomain.com/blog/${form.slug}`,
                    ...(form.schema_extra || {}),
                  },
                  null,
                  2
                )}
              </pre>
            )}
          </div>

          <Field label="Extra Schema Fields (JSON)" hint="Optional — merged into the JSON-LD output">
            <textarea
              value={
                form.schema_extra ? JSON.stringify(form.schema_extra, null, 2) : ''
              }
              onChange={(e) => {
                try {
                  const parsed = e.target.value ? JSON.parse(e.target.value) : null
                  set('schema_extra', parsed)
                  setError(null)
                } catch {
                  // Let user finish typing
                }
              }}
              className="admin-input h-32 resize-none font-mono text-xs"
              placeholder={'{\n  "keywords": "hair transplant, FUE, Antalya"\n}'}
            />
          </Field>
        </div>
      )}

      {/* Bottom save bar */}
      <div className="mt-10 pt-6 border-t border-white/8 flex justify-end gap-3">
        <button
          onClick={() => handleSave('draft')}
          disabled={saving}
          className="px-6 py-3 border border-white/15 text-cream-50 text-sm tracking-wider hover:border-white/30 transition-colors disabled:opacity-50"
        >
          Save as Draft
        </button>
        <button
          onClick={() => handleSave('published')}
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? 'Saving...' : form.status === 'published' ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs text-graphite-100 tracking-wider uppercase">{label}</label>
        {hint && <span className="text-xs text-graphite-300">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function CharBar({ value, max }: { value: string; max: number }) {
  const len = value.length
  const pct = Math.min((len / max) * 100, 100)
  const color = len > max ? 'bg-red-400' : len > max * 0.85 ? 'bg-yellow-400' : 'bg-green-400'
  return (
    <div className="h-0.5 bg-graphite-700 mt-1.5">
      <div className={`h-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
