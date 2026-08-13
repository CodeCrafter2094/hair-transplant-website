import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase, BlogPost } from '../lib/supabase'
import Footer from '../components/Footer'
import { ChevronRight, Calendar, User, Tag } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    if (heroRef.current) {
      const lines = heroRef.current.querySelectorAll('.reveal-line')
      gsap.fromTo(lines, { yPercent: 110 }, {
        yPercent: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      const sub = heroRef.current.querySelector('.sub-fade')
      if (sub) gsap.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6 })
    }
  }, [])

  useEffect(() => {
    if (loading || !gridRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const cards = gridRef.current.querySelectorAll('.post-card')
    gsap.fromTo(cards, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
    })
  }, [loading, activeCategory])

  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]))]
  const filtered = activeCategory === 'all' ? posts : posts.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-graphite-900 min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-widest3 uppercase">Knowledge & Insights</span>
        </div>
        <h1 className="font-display mb-6">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light text-cream-50 leading-tight">
              Hair Transplant
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[clamp(2.5rem,7vw,6rem)] font-light italic text-gold-300 leading-tight">
              Blog & Guide
            </span>
          </div>
        </h1>
        <p className="sub-fade text-graphite-100 text-lg font-light max-w-xl opacity-0">
          Expert articles on hair restoration, techniques, recovery and what to expect — written by our surgical team.
        </p>
      </section>

      {/* Category filter */}
      {categories.length > 1 && (
        <section className="px-6 lg:px-10 max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors ${
                  activeCategory === cat
                    ? 'bg-gold-400 text-graphite-900 font-medium'
                    : 'border border-white/15 text-graphite-100 hover:text-cream-50 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="pb-28 px-6 lg:px-10 max-w-7xl mx-auto" ref={gridRef}>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-graphite-800 aspect-video mb-4" />
                <div className="bg-graphite-800 h-4 w-3/4 mb-2" />
                <div className="bg-graphite-800 h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-white/5">
            <p className="text-graphite-200 text-sm">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} featured={i === 0 && activeCategory === 'all'} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

function PostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`post-card group block opacity-0 ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`overflow-hidden bg-graphite-800 mb-5 ${featured ? 'aspect-[16/7]' : 'aspect-video'}`}>
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.featured_image_alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-graphite-500 text-xs tracking-widest uppercase">No Image</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-3">
        {post.category && (
          <span className="text-xs text-gold-300 tracking-widest uppercase border border-gold-400/30 px-2.5 py-1">
            {post.category}
          </span>
        )}
        {post.published_at && (
          <span className="flex items-center gap-1.5 text-xs text-graphite-200">
            <Calendar size={11} />
            {new Date(post.published_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className={`font-display font-light text-cream-50 leading-tight mb-3 group-hover:text-gold-300 transition-colors ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
        {post.title}
      </h2>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-graphite-100 text-sm font-light leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
      )}

      {/* Author + Read more */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-graphite-200">
          <User size={11} />
          {post.author}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-gold-300 tracking-wider uppercase border-b border-gold-400/30 pb-0.5 group-hover:border-gold-400 transition-colors">
          Read more
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      {/* Tags */}
      {(post.tags || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {(post.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs text-graphite-300 bg-graphite-800 px-2 py-0.5">
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
