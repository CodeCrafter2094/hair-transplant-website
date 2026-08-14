import { useEffect } from 'react'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import Footer from './Footer'

const whatsapp = 'https://wa.me/447988487251?text=Hello%2C%20I%27d%20like%20a%20private%20hair%20transplant%20assessment.'

export type InnerPageItem = {
  label: string
  title: string
  body: string
  points: string[]
  image?: string
}

type InnerPageProps = {
  pageCode: string
  title: string
  accent: string
  intro: string
  documentTitle: string
  items: InnerPageItem[]
  closingTitle: string
  closingText: string
}

export default function InnerPage({ pageCode, title, accent, intro, documentTitle, items, closingTitle, closingText }: InnerPageProps) {
  useEffect(() => {
    document.title = documentTitle
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', `https://turkeyhairtransplantantalya.com${window.location.pathname}`)
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', intro)
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', documentTitle)
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', intro)
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', `https://turkeyhairtransplantantalya.com${window.location.pathname}`)

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll<HTMLElement>('[data-page-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [documentTitle, intro])

  return (
    <main className="inner-page" id="main-content">
      <section className="inner-hero" data-code={pageCode}>
        <div className="inner-hero-copy">
          <div className="inner-page-code"><span>{pageCode}</span><i />ANTALYA / UK</div>
          <h1>{title}{' '}<em>{accent}</em></h1>
          <p>{intro}</p>
          <a className="button button-primary" data-magnetic href={whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Ask about my case <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="inner-hero-object" aria-hidden="true">
          <div className="inner-orbit orbit-a" /><div className="inner-orbit orbit-b" />
          <div className="inner-core"><span>{pageCode}</span></div>
          <div className="inner-axis axis-x" /><div className="inner-axis axis-y" />
        </div>
        <div className="inner-hero-foot"><span>Scroll to explore</span><i /><b>{String(items.length).padStart(2, '0')} chapters</b></div>
      </section>

      <section className="inner-content">
        <aside className="inner-index" data-page-reveal>
          <p>On this page</p>
          {items.map((item, index) => <a href={`#chapter-${index + 1}`} key={item.title}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</a>)}
        </aside>
        <div className="inner-chapters">
          {items.map((item, index) => (
            <article id={`chapter-${index + 1}`} key={item.title} data-page-reveal>
              <div className="chapter-meta"><span>{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b></div>
              <h2>{item.title}</h2>
              {item.image && (
                <div className="chapter-image">
                  <img
                    src={item.image}
                    alt={`${item.title} technique`}
                    loading="lazy"
                  />
                </div>
              )}
              <p>{item.body}</p>
              <ul>{item.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-closing" data-page-reveal>
        <div><h2>{closingTitle}</h2><p>{closingText}</p></div>
        <a href={whatsapp} target="_blank" rel="noreferrer">Start private assessment <ArrowUpRight size={18} /></a>
      </section>
      <Footer />
    </main>
  )
}
