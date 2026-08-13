import { FormEvent, useEffect, useState } from 'react'
import { ArrowUpRight, Camera, MessageCircle, ShieldCheck } from 'lucide-react'
import Footer from '../components/Footer'

const phone = '447988487251'

export default function Contact() {
  const [form, setForm] = useState({ name: '', age: '', goal: '', timing: '' })

  useEffect(() => {
    document.title = 'Private Hair Transplant Assessment | Antalya'
    window.scrollTo({ top: 0, behavior: 'auto' })
    const description = 'Start a private, pressure-free hair transplant assessment for Antalya through the UK WhatsApp line.'
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', 'https://turkeyhairtransplantantalya.com/contact')
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', 'https://turkeyhairtransplantantalya.com/contact')
  }, [])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const message = [`Hello, I would like a private hair transplant assessment.`, `Name: ${form.name}`, `Age: ${form.age || 'Not provided'}`, `Goal: ${form.goal}`, `Timing: ${form.timing || 'Flexible'}`].join('\n')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="contact-page" id="main-content">
      <section className="contact-shell">
        <div className="contact-copy">
          <div className="inner-page-code"><span>CONTACT</span><i />PRIVATE / UK LINE</div>
          <h1>Start with a conversation,{' '}<em>not a commitment.</em></h1>
          <p>Tell us what you want to understand. Your answers stay in this browser until you choose to continue in WhatsApp.</p>
          <div className="contact-protocol">
            <div><Camera size={19} /><span><b>Four useful photos</b>Front, top, crown and donor area</span></div>
            <div><ShieldCheck size={19} /><span><b>Private by design</b>You decide what is sent</span></div>
          </div>
        </div>
        <form className="contact-form lead-form" onSubmit={submit}>
          <div className="form-progress"><span>PRIVATE ASSESSMENT</span><span>WHATSAPP</span></div>
          <label>Your name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="How should we address you?" /></label>
          <div className="form-row">
            <label>Age <span>(optional)</span><input inputMode="numeric" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="e.g. 38" /></label>
            <label>Preferred timing <span>(optional)</span><select value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })}><option value="">Flexible</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Researching only</option></select></label>
          </div>
          <label>Your main goal<textarea required rows={4} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="For example: restore the hairline and understand crown coverage" /></label>
          <button className="button button-whatsapp" data-magnetic type="submit"><MessageCircle size={19} /> Continue in WhatsApp <ArrowUpRight size={17} /></button>
          <p className="form-disclaimer">This form does not confirm candidacy or provide medical advice.</p>
        </form>
      </section>
      <Footer />
    </main>
  )
}
