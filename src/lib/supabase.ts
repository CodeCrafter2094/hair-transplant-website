import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: string
  created_at: string
  updated_at: string

  // Content
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  author: string
  category: string | null
  tags: string[] | null
  status: 'draft' | 'published'
  published_at: string | null

  // Featured image
  featured_image_url: string | null
  featured_image_alt: string | null
  featured_image_caption: string | null

  // SEO
  seo_title: string | null
  seo_description: string | null
  canonical_url: string | null

  // Open Graph
  og_title: string | null
  og_description: string | null
  og_image_url: string | null

  // Twitter Card
  twitter_title: string | null
  twitter_description: string | null
  twitter_image_url: string | null
  twitter_card_type: string

  // Schema.org
  schema_type: string
  schema_extra: Record<string, unknown> | null
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
