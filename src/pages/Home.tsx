import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  MessageCircle,
  Plane,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import Footer from '../components/Footer'
import HeroParticleField from '../components/HeroParticleField'

const phoneDisplay = '+44 7988 487251'
const phoneDigits = '447988487251'
const defaultWhatsApp = `https://wa.me/${phoneDigits}?text=Hello%2C%20I%27d%20like%20a%20private%20hair%20transplant%20assessment.`

const techniques = [
  {
    id: 'fue',
    name: 'FUE',
    full: 'Follicular Unit Extraction',
    summary: 'Individual follicular units are extracted from the donor area and placed into a clinically planned hairline.',
    suited: 'Often considered when avoiding a linear donor scar is important.',
    note: 'Your donor capacity, hair calibre and pattern of loss determine whether it is suitable.',
  },
  {
    id: 'dhi',
    name: 'DHI',
    full: 'Direct Hair Implantation',
    summary: 'An implantation pen is used to place prepared grafts with close control over direction, angle and depth.',
    suited: 'May be discussed for focused placement and selected density goals.',
    note: 'The label alone does not decide quality; planning and medical execution matter more.',
  },
  {
    id: 'sapphire',
    name: 'Sapphire FUE',
    full: 'Sapphire-assisted channel creation',
    summary: 'A variation of FUE in which sapphire blades are used during recipient-site preparation.',
    suited: 'May be considered according to the recipient area and the clinical plan.',
    note: 'No technique is universally best. Suitability should follow an individual assessment.',
  },
]

const questions = [
  {
    q: 'How do I know how many grafts I need?',
    a: 'A useful estimate needs clear photos of your hairline, top, crown and donor area, plus your age and hair-loss history. A graft number given without this context is not a personalised plan.',
  },
  {
    q: 'Which is better: FUE, DHI or Sapphire FUE?',
    a: 'There is no universal winner. Donor quality, area to cover, hair characteristics and the proposed design all matter. The technique should follow your assessment—not the other way around.',
  },
  {
    q: 'Can a hair transplant result be guaranteed?',
    a: 'No responsible clinic can guarantee an identical outcome for every person. Candidacy, donor supply, healing, aftercare and progressive hair loss can influence the result. Ask for realistic ranges and risks for your case.',
  },
  {
    q: 'What should I send for an initial assessment?',
    a: 'Four well-lit photos are a strong start: front hairline, top, crown and donor area at the back. Add your age, any previous procedures, medication and the result you hope to achieve.',
  },
  {
    q: 'When should I book flights?',
    a: 'Wait until your assessment, treatment plan, dates and inclusions are confirmed in writing. The team can then clarify arrival, procedure and follow-up timing before you make travel commitments.',
  },
]

export default function Home() {
  const [activeTechnique, setActiveTechnique] = useState(0)
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', age: '', goal: '', timing: '' })

  useEffect(() => {
    document.title = 'Turkey Hair Transplant Antalya | Private WhatsApp Assessment'
    const description = 'Considering a Turkey hair transplant in Antalya? Start with a private WhatsApp photo assessment and understand your technique, donor area and travel steps.'
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', 'https://turkeyhairtransplantantalya.com/')
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', 'https://turkeyhairtransplantantalya.com/')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer.observe(element))

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = document.documentElement.dataset.motion === 'reduced'
    const hero = document.querySelector<HTMLElement>('.hero')
    const heroContent = document.querySelector<HTMLElement>('.hero-content')
    const heroPlan = document.querySelector<HTMLElement>('.hero-plan')
    const heroImage = document.querySelector<HTMLElement>('.hero-media img')
    const tiltSurfaces = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt-surface]'))
    let frame = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let scrollProgress = 0

    const renderDepth = () => {
      currentX += (targetX - currentX) * 0.09
      currentY += (targetY - currentY) * 0.09
      if (heroContent) heroContent.style.transform = `translate3d(${currentX * -5}px, ${currentY * -3 - scrollProgress * 58}px, ${24 - scrollProgress * 34}px)`
      if (heroPlan) heroPlan.style.transform = `perspective(900px) rotateX(${currentY * -2.5 + scrollProgress * 7}deg) rotateY(${currentX * 3.5}deg) translate3d(${currentX * 8}px, ${currentY * 6 + scrollProgress * 44}px, ${38 - scrollProgress * 90}px) scale(${1 - scrollProgress * 0.08})`
      if (heroImage) heroImage.style.transform = `translate3d(${currentX * 4}px, ${currentY * 3 + scrollProgress * 24}px, 0) scale(${1.045 + scrollProgress * 0.055})`
      frame = requestAnimationFrame(renderDepth)
    }

    const onHeroScroll = () => {
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1)
      scrollProgress = Math.min(Math.max(-rect.top / distance, 0), 1)
    }

    const onHeroPointer = (event: PointerEvent) => {
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const onHeroLeave = () => {
      targetX = 0
      targetY = 0
    }

    const tiltCleanups = finePointer && !reducedMotion ? tiltSurfaces.map((surface) => {
      const move = (event: PointerEvent) => {
        const rect = surface.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        surface.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translate3d(0, -2px, 0)`
      }
      const leave = () => {
        surface.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
      }
      surface.addEventListener('pointermove', move)
      surface.addEventListener('pointerleave', leave)
      return () => {
        surface.removeEventListener('pointermove', move)
        surface.removeEventListener('pointerleave', leave)
      }
    }) : []

    if (finePointer && !reducedMotion && hero) {
      hero.addEventListener('pointermove', onHeroPointer)
      hero.addEventListener('pointerleave', onHeroLeave)
      window.addEventListener('scroll', onHeroScroll, { passive: true })
      onHeroScroll()
      frame = requestAnimationFrame(renderDepth)
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      hero?.removeEventListener('pointermove', onHeroPointer)
      hero?.removeEventListener('pointerleave', onHeroLeave)
      window.removeEventListener('scroll', onHeroScroll)
      tiltCleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  const submitAssessment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = [
      'Hello, I would like a private hair transplant assessment.',
      `Name: ${form.name}`,
      `Age: ${form.age || 'Not provided'}`,
      `Main goal: ${form.goal}`,
      `Preferred timing: ${form.timing || 'Flexible'}`,
      'I can send my front, top, crown and donor-area photos here.',
    ].join('\n')
    window.open(`https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  const active = techniques[activeTechnique]

  return (
    <main id="main-content">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <HeroParticleField />
        <div className="hero-media" aria-hidden="true">
          <img src="/assets/antalya-hair-transplant-hero.png" alt="" />
          <div className="hero-wash" />
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-ring orbit-ring-one" />
          <span className="orbit-ring orbit-ring-two" />
          <span className="orbit-point" />
        </div>

        <div className="hero-content">
          <div className="hero-proof">
            <span className="live-dot" aria-hidden="true" />
            UK WhatsApp line · {phoneDisplay}
          </div>
          <h1 id="hero-title">
            Turkey hair transplant,
            <span className="echo-title" data-text="planned around you.">
              {Array.from({ length: 3 }, (_, index) => (
                <span className={`echo-trail echo-${index + 1}`} aria-hidden="true" key={index}>planned around you.</span>
              ))}
              <em>planned around you.</em>
            </span>
          </h1>
          <p className="hero-lead">
            Start with a private photo assessment. Understand your donor area, possible techniques and travel steps before you make a decision.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" data-magnetic href={defaultWhatsApp} target="_blank" rel="noreferrer">
              <MessageCircle size={19} aria-hidden="true" />
              Get my private assessment
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="text-link" href="#how-it-starts">See how it starts <ArrowRight size={16} /></a>
          </div>
          <p className="hero-fineprint">No deposit to start · Share photos only when you are ready</p>
        </div>

        <div className="hero-plan" aria-label="Assessment preview">
          <div className="plan-topline"><span>PERSONAL PLAN</span><span>ANTALYA / UK</span></div>
          <div className="hairline-diagram" aria-hidden="true">
            <svg viewBox="0 0 360 150" role="presentation">
              <path className="face-line" d="M78 128C68 97 74 54 103 31c26-21 82-25 116-5 38 22 54 72 39 105" />
              <path className="planned-line" d="M98 63c34-26 99-28 145 2" />
              <path className="measure-line" d="M93 78h155" />
              <circle cx="98" cy="63" r="4" /><circle cx="243" cy="65" r="4" />
            </svg>
          </div>
          <div className="plan-grid">
            <span><b>01</b> Hairline</span>
            <span><b>02</b> Donor area</span>
            <span><b>03</b> Technique</span>
            <span><b>04</b> Travel</span>
          </div>
          <p>Illustrative planning preview. Your recommendation requires an individual clinical assessment.</p>
        </div>

          <div className="hero-scroll" aria-hidden="true"><span /> Scroll into the plan</div>
        </div>
      </section>

      <section className="decision-strip" aria-label="What the assessment covers">
        <div><Camera size={18} /><span>Photo-led first review</span></div>
        <div><Stethoscope size={18} /><span>Technique follows suitability</span></div>
        <div><ShieldCheck size={18} /><span>Private, pressure-free start</span></div>
        <div><Plane size={18} /><span>Travel steps clarified before booking</span></div>
      </section>

      <section className="proof-section" aria-labelledby="proof-title">
        <div className="proof-heading" data-reveal>
          <h2 id="proof-title">A result photo is only useful when its context is visible.</h2>
          <p>Before-and-after evidence should help you compare—not simply impress you. Ask for cases documented with the same standards.</p>
        </div>
        <div className="proof-deck" data-reveal>
          {[
            { code: 'ANGLE', title: 'Consistent viewpoint', text: 'Compare the same angle, distance, lighting and hair condition.', mark: 'A' },
            { code: 'TIME', title: 'Mature follow-up', text: 'Always ask when the after image was captured and what changed over time.', mark: '12M' },
            { code: 'MATCH', title: 'Comparable profile', text: 'Look for a similar loss pattern, donor profile and realistic coverage goal.', mark: 'M' },
          ].map((item, index) => (
            <article className={`proof-card proof-card-${index + 1}`} key={item.code} data-tilt-surface>
              <div className="proof-card-top"><span>{item.code}</span><b>CASE STANDARD</b></div>
              <div className="proof-orb" aria-hidden="true"><span>{item.mark}</span><i /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="proof-note"><span>Evidence protocol</span><i /><b>Ask for cases matched to you</b></div>
      </section>

      <section className="section section-light" id="how-it-starts">
        <div className="section-heading" data-reveal>
          <h2>You do not need another promise. You need a plan you can inspect.</h2>
          <p>A good first conversation should reduce uncertainty, not rush you toward a date.</p>
        </div>

        <div className="assessment-sequence">
          <article data-reveal>
            <div className="sequence-icon"><Camera size={23} /></div>
            <span>About two minutes</span>
            <h3>Send four clear photos</h3>
            <p>Front hairline, top, crown and donor area. Natural daylight and dry hair make the first review more useful.</p>
          </article>
          <div className="sequence-connector" aria-hidden="true"><ArrowRight /></div>
          <article data-reveal>
            <div className="sequence-icon"><Stethoscope size={23} /></div>
            <span>Clinical context</span>
            <h3>Discuss your suitability</h3>
            <p>Your loss pattern, donor supply, medical history and expectations shape the conversation—not a one-size-fits-all package.</p>
          </article>
          <div className="sequence-connector" aria-hidden="true"><ArrowRight /></div>
          <article data-reveal>
            <div className="sequence-icon"><CircleCheck size={23} /></div>
            <span>Before you decide</span>
            <h3>Review the written plan</h3>
            <p>Confirm the proposed technique, responsibilities, likely timeline, inclusions and aftercare before committing to travel.</p>
          </article>
        </div>
      </section>

      <section className="section technique-section" id="techniques">
        <div className="technique-intro" data-reveal>
          <h2>The technique is a decision, not a sales label.</h2>
          <p>Explore the differences, then let individual suitability lead the recommendation.</p>
        </div>

        <div className="technique-console" data-reveal>
          <div className="technique-tabs" role="tablist" aria-label="Hair transplant techniques">
            {techniques.map((technique, index) => (
              <button
                key={technique.id}
                type="button"
                role="tab"
                aria-selected={activeTechnique === index}
                aria-controls="technique-panel"
                onClick={() => setActiveTechnique(index)}
              >
                <span>{technique.name}</span>
                <small>{technique.full}</small>
              </button>
            ))}
          </div>

          <div className="technique-panel" id="technique-panel" role="tabpanel">
            <div className="technique-visual" data-tilt-surface aria-hidden="true">
              <span className="follicle follicle-a" /><span className="follicle follicle-b" />
              <span className="follicle follicle-c" /><span className="follicle follicle-d" />
              <div className="density-line" />
              <p>{active.name}</p>
            </div>
            <div className="technique-copy" key={active.id}>
              <span className="tech-code">METHOD / {active.name}</span>
              <h3>{active.full}</h3>
              <p>{active.summary}</p>
              <dl>
                <div><dt>Why it may be discussed</dt><dd>{active.suited}</dd></div>
                <div><dt>Important context</dt><dd>{active.note}</dd></div>
              </dl>
              <a href={defaultWhatsApp} target="_blank" rel="noreferrer">Ask which may suit me <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="journey-copy" data-reveal>
          <h2>From the UK to Antalya, with the unknowns made visible.</h2>
          <p>Your exact plan may differ. This is the decision sequence to confirm before you travel.</p>
          <a className="text-link light" href={defaultWhatsApp} target="_blank" rel="noreferrer">Ask about my timeline <ArrowUpRight size={16} /></a>
        </div>
        <ol className="journey-list">
          {[
            ['Private assessment', 'Share photos, history and the outcome you are hoping for.'],
            ['Written treatment plan', 'Review suitability, proposed method and the details that still need confirmation.'],
            ['Travel confirmation', 'Only book once dates, arrival instructions and inclusions are clear in writing.'],
            ['In-person examination', 'The clinical team should verify the plan and hairline before any procedure.'],
            ['Aftercare and follow-up', 'Leave with clear washing, medication and contact instructions for your case.'],
          ].map(([title, copy], index) => (
            <li key={title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <Check size={18} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section className="section antalya-section" id="why-antalya">
        <div className="antalya-visual" data-reveal data-tilt-surface>
          <div className="antalya-type" aria-hidden="true">ANTALYA</div>
          <div className="route-line" aria-hidden="true"><span>LONDON</span><i /><b>AYT</b></div>
        </div>
        <div className="antalya-copy" data-reveal>
          <h2>Choose Antalya for the plan—not only the destination.</h2>
          <p>Travel can make treatment feel like a package. Keep the clinical questions separate: who examines you, who performs each stage, what happens if the plan changes, and how follow-up works once you are home.</p>
          <ul>
            <li><Check size={17} /> Ask for named clinical responsibilities</li>
            <li><Check size={17} /> Confirm every inclusion in writing</li>
            <li><Check size={17} /> Understand the aftercare contact path</li>
            <li><Check size={17} /> Leave room for an in-person plan change</li>
          </ul>
        </div>
      </section>

      <section className="section faq-section" id="questions">
        <div className="faq-heading" data-reveal>
          <h2>Questions worth asking before you book.</h2>
          <p>Clear answers are part of good care. Start here, then ask the clinic how each answer applies to you.</p>
        </div>
        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = openQuestion === index
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q} data-reveal>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`answer-${index}`}
                  onClick={() => setOpenQuestion(isOpen ? null : index)}
                >
                  <span>{item.q}</span><ChevronDown size={20} aria-hidden="true" />
                </button>
                <div className="faq-answer" id={`answer-${index}`} role="region"><div><p>{item.a}</p></div></div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="lead-section" id="assessment">
        <div className="lead-copy" data-reveal>
          <h2>Turn your questions into a useful WhatsApp conversation.</h2>
          <p>Complete the short brief. We will open WhatsApp with your answers ready to send; you remain in control of what is shared.</p>
          <div className="privacy-note"><ShieldCheck size={19} /><span>Your details stay in your browser until you choose to send the message in WhatsApp.</span></div>
        </div>

        <form className="lead-form" onSubmit={submitAssessment} data-reveal>
          <div className="form-progress"><span>PRIVATE ASSESSMENT</span><span>1 / 1</span></div>
          <label>
            Your name
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="How should we address you?"
            />
          </label>
          <div className="form-row">
            <label>
              Age <span>(optional)</span>
              <input
                inputMode="numeric"
                value={form.age}
                onChange={(event) => setForm({ ...form, age: event.target.value })}
                placeholder="e.g. 38"
              />
            </label>
            <label>
              Preferred timing <span>(optional)</span>
              <select value={form.timing} onChange={(event) => setForm({ ...form, timing: event.target.value })}>
                <option value="">I am flexible</option>
                <option>Within 1–3 months</option>
                <option>Within 3–6 months</option>
                <option>Just researching</option>
              </select>
            </label>
          </div>
          <label>
            What would you most like to improve?
            <textarea
              required
              rows={3}
              value={form.goal}
              onChange={(event) => setForm({ ...form, goal: event.target.value })}
              placeholder="For example: receding hairline and thinning crown"
            />
          </label>
          <button className="button button-whatsapp" data-magnetic type="submit">
            <MessageCircle size={19} /> Continue securely in WhatsApp <ArrowUpRight size={17} />
          </button>
          <p className="form-disclaimer">This form does not provide medical advice or confirm suitability.</p>
        </form>
      </section>

      <a className="floating-whatsapp" data-magnetic href={defaultWhatsApp} target="_blank" rel="noreferrer" aria-label="Start a private assessment on WhatsApp">
        <MessageCircle size={22} /><span>WhatsApp assessment</span>
      </a>
      <Footer />
    </main>
  )
}
