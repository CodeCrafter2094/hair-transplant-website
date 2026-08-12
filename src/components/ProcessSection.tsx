import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !pinRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: `+=${processSteps.length * 100}%`,
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const idx = Math.min(
          processSteps.length - 1,
          Math.floor(self.progress * processSteps.length),
        )
        setActiveStep(idx)
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-graphite-900"
      style={{ height: `${(processSteps.length + 1) * 100}vh` }}
    >
      <div
        ref={pinRef}
        className="relative h-screen flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left — content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-20 lg:py-0 z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-gold-300 text-xs tracking-widest3 uppercase">
              The Journey
            </span>
          </div>

          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream-50 leading-tight mb-12">
            Every step,<br />
            <span className="italic text-gold-300">thoughtfully crafted.</span>
          </h2>

          {/* Steps list */}
          <div className="space-y-0">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`border-l-2 pl-8 py-5 cursor-pointer transition-all duration-500 ${
                  activeStep === i
                    ? 'border-gold-400'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setActiveStep(i)}
                role="tab"
                aria-selected={activeStep === i}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveStep(i)}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-xs font-mono tracking-wider mt-1 transition-colors ${
                      activeStep === i ? 'text-gold-300' : 'text-graphite-200'
                    }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3
                      className={`font-display text-xl font-light transition-colors ${
                        activeStep === i ? 'text-cream-50' : 'text-graphite-100'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        activeStep === i ? 'max-h-32 mt-2 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-sm text-graphite-100 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative flex-1 overflow-hidden">
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeStep === i ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={activeStep !== i}
            >
              <img
                ref={(el) => { imgRefs.current[i] = el }}
                src={step.image}
                alt={`Step ${step.number}: ${step.title}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-graphite-900 via-graphite-900/20 to-transparent lg:via-transparent lg:from-transparent" />

              {/* Step number overlay */}
              <div className="absolute bottom-8 right-8 text-right">
                <p className="font-display text-[8rem] font-light text-white/5 leading-none select-none">
                  {step.number}
                </p>
              </div>
            </div>
          ))}

          {/* Progress bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5">
            <div
              className="bg-gold-400 transition-all duration-500 ease-out w-full"
              style={{
                height: `${((activeStep + 1) / processSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
