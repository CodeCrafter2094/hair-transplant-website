import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase, BlogPost } from '../lib/supabase'
import Footer from '../components/Footer'
import { ChevronLeft, Calendar, User, Tag, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

gsap.registerPlugin(ScrollTrigger)

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data, error }) => {
        if (error || !data) { navigate('/blog'); return }
        setPost(data)

        // Related posts (same category, exclude current)
        supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image_url, featured_image_alt, category, published_at, author, tags, status, created_at, updated_at, content, published_at, featured_image_caption, seo_title, seo_description, canonical_url, og_title, og_description, og_image_url, twitter_title, twitter_description, twitter_image_url, twitter_card_type, schema_type, schema_extra')
          .eq('status', 'published')
          .eq('category', data.category || '')
          .neq('id', data.id)
          .limit(2)
          .then(({ data: rel }) => setRelated(rel || []))

        setLoading(false)
      })
  }, [slug, navigate])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !heroRef.current || !post) return

    gsap.fromTo(
      heroRef.current.querySelectorAll('.reveal-line'),
      { yPercent: 110 },
      { yPercent: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.4,
        scrollTrigger: { trigger: contentRef.current, start: 'top 90%' }
      })
    }
  }, [post])

  // Inject SEO tags
  useEffect(() => {
    if (!post) return

    document.title = post.seo_title || post.title

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
      el.content = content
    }
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
      el.content = content
    }

    if (post.seo_description) setMeta('description', post.seo_description)
    setOg('og:title', post.og_title || post.seo_title || post.title)
    if (post.og_description || post.seo_description)
      setOg('og:description', post.og_description || post.seo_description || '')
    if (post.og_image_url) setOg('og:image', post.og_image_url)

    setMeta('twitter:card', post.twitter_card_type || 'summary_large_image')
    setMeta('twitter:title', post.twitter_title || post.og_title || post.title)
    if (post.twitter_description || post.og_description)
      setMeta('twitter:description', post.twitter_description || post.og_description || '')
    if (post.twitter_image_url) setMeta('twitter:image', post.twitter_image_url)

    // Schema.org JSON-LD
    const schemaId = 'blog-post-schema'
    let schemaEl = document.getElementById(schemaId) as HTMLScriptElement | null
    if (!schemaEl) {
      schemaEl = document.createElement('script')
      schemaEl.id = schemaId
      schemaEl.type = 'application/ld+json'
      document.head.appendChild(schemaEl)
    }
    schemaEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': post.schema_type || 'BlogPosting',
      headline: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      image: post.featured_image_url || undefined,
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at,
      author: { '@type': 'Person', name: post.author },
      publisher: {
        '@type': 'Organization',
        name: 'Antalya Hair Transplant',
        url: window.location.origin,
      },
      url: post.canonical_url || window.location.href,
      ...(post.schema_extra || {}),
    })

    return () => {
      document.getElementById(schemaId)?.remove()
    }
  }, [post])

  if (loading) {
    return (
      <div className="bg-graphite-900 min-h-screen flex items-center justify-center">
        <div className="text-graphite-200 text-sm animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="bg-graphite-900 min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-0 px-6 lg:px-10 max-w-4xl mx-auto" ref={heroRef}>
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-graphite-200 hover:text-cream-50 text-xs tracking-wider uppercase transition-colors mb-10"
        >
          <ChevronLeft size={13} />
          All Articles
        </Link>

        {/* Category + date */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {post.category && (
            <span className="text-xs text-gold-300 tracking-widest uppercase border border-gold-400/30 px-2.5 py-1">
              {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="flex items-center gap-1.5 text-xs text-graphite-200">
              <Calendar size={11} />
              {new Date(post.published_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-graphite-200">
            <User size={11} />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-light text-cream-50 leading-tight mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2rem,5vw,4rem)]">{post.title}</span>
          </div>
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-graphite-100 text-lg font-light leading-relaxed mb-10 max-w-2xl">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {(post.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {(post.tags || []).map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs text-graphite-300 bg-graphite-800 px-3 py-1">
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Featured image */}
      {post.featured_image_url && (
        <figure className="max-w-5xl mx-auto px-6 lg:px-10 mb-14">
          <img
            src={post.featured_image_url}
            alt={post.featured_image_alt || post.title}
            className="w-full max-h-[60vh] object-cover"
          />
          {post.featured_image_caption && (
            <figcaption className="text-xs text-graphite-300 mt-2 text-center tracking-wider">
              {post.featured_image_caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Content */}
      <section className="px-6 lg:px-10 max-w-3xl mx-auto pb-24" ref={contentRef}>
        {post.content ? (
          <div className="prose-blog">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-graphite-200 text-sm italic">No content available.</p>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="border-t border-white/8" />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-20 px-6 lg:px-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-gold-300 text-xs tracking-widest3 uppercase">Related Articles</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link key={rel.id} to={`/blog/${rel.slug}`} className="group block">
                {rel.featured_image_url && (
                  <div className="overflow-hidden aspect-video bg-graphite-800 mb-4">
                    <img
                      src={rel.featured_image_url}
                      alt={rel.featured_image_alt || rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="font-display text-xl text-cream-50 font-light group-hover:text-gold-300 transition-colors mb-2">
                  {rel.title}
                </h3>
                {rel.excerpt && (
                  <p className="text-graphite-100 text-sm font-light line-clamp-2">{rel.excerpt}</p>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs text-gold-300 mt-3 tracking-wider uppercase border-b border-gold-400/30 pb-0.5 group-hover:border-gold-400 transition-colors">
                  Read more <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-10 max-w-5xl mx-auto pb-24">
        <div className="border border-gold-400/20 p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-cream-50 font-display text-2xl lg:text-3xl font-light mb-2">
              Ready to take the next step?
            </p>
            <p className="text-graphite-100 text-sm font-light max-w-md">
              Book a free consultation and speak with our specialist about your goals.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-9 py-4 bg-gold-400 text-graphite-900 text-sm tracking-wider uppercase font-medium hover:bg-gold-300 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Free Consultation
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
