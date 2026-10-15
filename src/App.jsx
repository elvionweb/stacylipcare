import { useEffect, useRef, useState } from 'react'

import bracesInstall from './assets/braces-install.webp'
import bracesModel from './assets/braces-model.webp'
import bracesPromo from './assets/braces-promo.webp'
import beforeAfter from './assets/before-after.jpg'
import glossCollection from './assets/gloss-collection.jpg'
import herbalTea from './assets/herbal-tea.webp'
import lipCareSet from './assets/lip-care-set.webp'
import lipGlossShades from './assets/lip-gloss-shades.webp'
import storeBonnets from './assets/store-bonnets.jpg'

const PHONE_DISPLAY = '+234 807 303 4824'
const PHONE_TEL = '+2348073034824'
const wa = (text) => `https://wa.me/2348073034824?text=${encodeURIComponent(text)}`

/* Shared responsive classes */
const WRAP = 'mx-auto w-full max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8'
const H2 = 'font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl'
const EYEBROW = 'text-xs font-bold uppercase tracking-widest text-rose-500'

/* ---------- helpers ---------- */
function Reveal({ as: Tag = 'div', variant = 'reveal', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${variant} ${shown ? 'show' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function Img({ src, alt, className = '' }) {
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
}

const WhatsAppIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a12 12 0 0 0 5.7 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.200 12C2.200 6.600 6.600 2.200 12 2.200S21.800 6.600 21.800 12 17.400 21.700 12 21.700zm5.400-7.300c-.3-.1-1.800-.9-2-1s-.5-.1-.7.1-.8 1-1 1.200-.4.200-.7.100a8 8 0 0 1-4-3.500c-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-.9-2.200c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.500s1.100 2.900 1.200 3.100c.1.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.600.7.600-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400-.1-.1-.3-.2-.6-.3z" />
  </svg>
)

/* ---------- sections ---------- */
const links = [
  ['Services', '#services'],
  ['Gallery', '#gallery'],
  ['Fashion Braces', '#braces'],
  ['Contact', '#contact'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Close the mobile menu when the viewport grows to desktop, or on Escape
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    mq.addEventListener('change', onChange)
    document.addEventListener('keydown', onKey)
    return () => {
      mq.removeEventListener('change', onChange)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-white/90 shadow-sm backdrop-blur' : ''}`}>
      <div className={`${WRAP} flex items-center justify-between py-3 sm:py-4`}>
        <a href="#home" className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          Stacy<span className="italic text-rose-500">lipcare</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8" aria-label="Main">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-rose-500">{l}</a>
          ))}
          <a href={wa('Hello Stacylipcare, I would like to make an enquiry')} className="rounded-full bg-ink px-5 py-2.5 text-white transition hover:bg-rose-500">
            Chat Us
          </a>
        </nav>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/80 shadow lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rose-100 px-4 pb-6 pt-2 sm:px-6 lg:hidden">
          <div className="mx-auto max-w-md sm:max-w-none">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 font-medium">{l}</a>
            ))}
            <div className='flex justify-center'>
              <a href={wa('Hello Stacylipcare, I would like to make an enquiry')} className="mt-2 w-44 block rounded-full bg-rose-500 py-3 text-center font-bold text-white">
              Chat Us
            </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl sm:-right-32 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-rose-300/40 blur-3xl sm:-left-32 sm:h-80 sm:w-80" />
      <div className={`${WRAP} relative grid items-center gap-12 pb-20 sm:gap-14 lg:grid-cols-12 lg:pb-28`}>
        <div className="text-center lg:col-span-6 lg:text-left">
          <Reveal as="p" className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-500 sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Beauty · Style · Self Care
          </Reveal>
          <Reveal as="h1" delay={100} className="font-display text-[2.5rem] font-bold leading-[1.08] min-[400px]:text-4xl sm:text-6xl xl:text-7xl">
            Soft lips.<br />
            <span className="italic text-rose-500">Bold confidence.</span>
          </Reveal>
          <Reveal as="p" delay={200} className="mx-auto mt-4 md:mt-6 max-w-lg text-base leading-relaxed text-ink/80 sm:text-lg lg:mx-0">
            Lip care, glossy lip shades and stylish fashion braces, all in one beauty store in Lagos. Come as you are, leave feeling like yourself, only brighter.
          </Reveal>
          <Reveal delay={300} className="mt-6 md:mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:justify-center lg:justify-start">
            <div className="flex justify-center">
              <a href="#services" className="inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-3.5 font-bold transition hover:bg-ink hover:text-white sm:px-8 sm:py-4">
              Explore services
            </a>
            </div>
          </Reveal>
          <Reveal delay={300} className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-sm sm:gap-x-8 lg:justify-start">
            {[['3', 'Beauty services'], ['5+', 'Lip shades'], ['Lagos', 'Based in']].map(([n, l], i) => (
              <div key={l} className="flex items-center gap-5 sm:gap-8">
                {i > 0 && <div className="h-10 w-px bg-rose-200" />}
                <div className="text-left">
                  <p className="font-display text-2xl font-bold sm:text-3xl">{n}</p>
                  <p className="text-ink/60">{l}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal variant="reveal-right" className="relative mx-auto mb-4 md:mb-6 w-full max-w-sm sm:max-w-md lg:col-span-6 lg:mb-0 lg:max-w-none">
          <div className="grid grid-cols-6 gap-3 sm:gap-4">
            <div className="ph col-span-4 row-span-2 aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-xl shadow-rose-300/40 sm:rounded-[2rem]">
              <Img src={bracesModel} alt="Smiling client wearing fashion braces" />
            </div>
            <div className="ph col-span-2 aspect-square overflow-hidden rounded-2xl shadow-lg sm:rounded-3xl">
              <Img src={glossCollection} alt="Stacylipcare lip gloss shades" />
            </div>
            <div className="ph col-span-2 aspect-square overflow-hidden rounded-2xl shadow-lg sm:rounded-3xl">
              <Img src={lipCareSet} alt="Lip butter and lip scrub set" className="object-[30%_60%]" />
            </div>
          </div>
          <div className="absolute -bottom-5 left-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl sm:-left-4 sm:px-5 sm:py-3 lg:-left-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500 sm:text-xs">Chic. Trendy. You.</p>
            <p className="font-display text-base font-bold sm:text-lg">Fashion Braces</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Lip Care', 'Lip Gloss', 'Lip Butter', 'Lip Scrub', 'Fashion Braces', 'Soft Lips', 'Bold Confidence']
  const row = words.map((w) => `${w} ✦`)
  return (
    <div className="overflow-hidden bg-ink py-3 text-white sm:py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-base italic sm:gap-10 sm:text-lg">
        {[...row, ...row].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}

const services = [
  { n: '01', title: 'Lip Care', img: lipCareSet, pos: 'object-[30%_65%]', alt: 'Lip butter, lip scrub and lip brush set', text: 'Lip butter, lip scrub and care sets made to keep your lips soft, smooth and looking their best.', cta: 'Ask about lip care →', msg: 'Hello, I am interested in your lip care products' },
  { n: '02', title: 'Lip Gloss', img: lipGlossShades, pos: 'object-[50%_55%]', alt: 'Diamond Drip lip gloss in several shades', text: 'Glossy, shimmery shades from soft pinks to bold reds. Pick one, or build your own set.', cta: 'Order lip gloss →', msg: 'Hello, I would like to order lip gloss' },
  { n: '03', title: 'Fashion Braces', img: bracesInstall, pos: 'object-[50%_65%]', alt: 'Fashion braces being installed', text: 'Stylish decorative braces in different colours and designs, installed in-store. Book your slot today.', cta: 'Book fashion braces →', msg: 'Hello, I would like to book fashion braces' },
]

function Services() {
  return (
    <section id="services" className={`${WRAP} py-12 md:py-16 sm:py-20 lg:py-28`}>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className={EYEBROW}>What we do</Reveal>
        <Reveal as="h2" delay={100} className={`mt-3 ${H2}`}>
          Everything for your <span className="italic text-rose-500">pout &amp; smile</span>
        </Reveal>
      </div>
      {/* flex-wrap + centred: 1 col on phones, 2 on tablets (last card centred), 3 on desktop */}
      <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-6 sm:mt-14 sm:max-w-none">
        {services.map((s, i) => (
          <Reveal
            as="article"
            key={s.n}
            delay={i * 100}
            className="group w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-rose-100 transition hover:-translate-y-2 hover:shadow-xl sm:w-[calc(50%-0.75rem)] sm:rounded-[2rem] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="ph aspect-[4/3] overflow-hidden">
              <Img src={s.img} alt={s.alt} className={`${s.pos} transition duration-700 group-hover:scale-105`} />
            </div>
            <div className="p-6 sm:p-7">
              <span className={EYEBROW}>{s.n}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-ink/70">{s.text}</p>
              <a href={wa(s.msg)} className="mt-5 inline-flex items-center gap-2 py-1 font-bold text-rose-500 transition-all hover:gap-3">{s.cta}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Braces() {
  const perks = ['Adds style to your smile', 'Boosts your confidence', 'Comfortable to wear', 'Different colours & designs']
  return (
    <section id="braces" className="bg-ink text-white">
      <div className={`${WRAP} grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28`}>
        <Reveal variant="reveal-left" className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-300">Fashion Braces</p>
          <h2 className={`mt-3 ${H2}`}>
            Get that perfect smile <span className="italic text-rose-300">with style.</span>
          </h2>
          <p className="mt-5 max-w-lg text-white/70">
            Add a touch of sparkle to your smile with fashion braces in a range of colours and designs. Chic. Trendy. You.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-500 text-xs">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex justify-center
          ">
            <a href={wa('Hello, I would like to book fashion braces installation')} className="mt-8 inline-flex w-44 items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 font-bold shadow-lg shadow-rose-500/30 transition hover:-translate-y-0.5 hover:bg-rose-400 sm:w-auto">
             Book Now
          </a>
          </div>
          <p className="mt-5 max-w-md text-xs text-white/60">
            Fashion braces are decorative accessories and are not orthodontic treatment. For teeth alignment, please see a licensed dentist.
          </p>
        </Reveal>
        <Reveal variant="reveal-right" className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg sm:gap-4 lg:max-w-none">
          <div className="ph aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl"><Img src={bracesModel} alt="Client smiling with fashion braces holding the braces pack" /></div>
          <div className="ph mt-8 aspect-[3/4] overflow-hidden rounded-2xl sm:mt-10 sm:rounded-3xl"><Img src={bracesInstall} alt="Fashion braces installation in progress" className="object-[40%_65%]" /></div>
        </Reveal>
      </div>
    </section>
  )
}

const gallery = [
  { src: lipGlossShades, alt: 'Lip gloss shades and lip butter', cls: 'col-span-2 row-span-2', pos: 'object-[50%_50%]' },
  { src: beforeAfter, alt: 'Lip butter jars with a before and after comparison', cls: 'row-span-2', pos: 'object-[50%_55%]', note: 'Individual results vary' },
  { src: glossCollection, alt: 'Row of coloured lip glosses in the store', cls: 'row-span-2', pos: 'object-[40%_50%]' },
  { src: storeBonnets, alt: 'Stacylipcare store with satin bonnets', cls: 'col-span-2', pos: 'object-[50%_40%]' },
  { src: bracesPromo, alt: 'Past fashion braces promo poster', cls: 'row-span-2', pos: 'object-top', note: 'Past promo, ask for current pricing' },
  { src: lipCareSet, alt: 'Lip butter and lip scrub in hand', cls: 'row-span-2', pos: 'object-[30%_65%]' },
  { src: bracesModel, alt: 'Client with fashion braces', cls: 'col-span-2', pos: 'object-[50%_45%]' },
]

function Gallery() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % gallery.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + gallery.length) % gallery.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  const step = (d) => (e) => {
    e.stopPropagation()
    setActive((i) => (i + d + gallery.length) % gallery.length)
  }

  return (
    <section id="gallery" className={`${WRAP} py-14 sm:py-20 lg:py-28`}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Reveal as="p" className={EYEBROW}>Gallery</Reveal>
          <Reveal as="h2" delay={100} className={`mt-3 ${H2}`}>
            Inside the <span className="italic text-rose-500">store</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={200} className="max-w-sm text-ink/70">A peek at our products, shades and the happy faces behind them. Tap any photo to enlarge.</Reveal>
      </div>

      <div className="mt-10 grid auto-rows-[120px] grid-flow-dense grid-cols-2 gap-2.5 min-[480px]:auto-rows-[150px] sm:mt-12 sm:auto-rows-[180px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[210px] 2xl:auto-rows-[240px]">
        {gallery.map((g, i) => (
          <Reveal key={i} delay={(i % 3) * 100} className={`${g.cls} min-h-0 min-w-0`}>
            <button onClick={() => setActive(i)} className="ph group relative block h-full w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400 sm:rounded-3xl" aria-label={`Enlarge: ${g.alt}`}>
              <Img src={g.src} alt={g.alt} className={`${g.pos} transition duration-700 group-hover:scale-105`} />
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-3 sm:p-6" onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label="Image viewer">
          <button aria-label="Close" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink sm:right-5 sm:top-5" onClick={() => setActive(null)}>✕</button>
          <button aria-label="Previous photo" className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink sm:left-5" onClick={step(-1)}>‹</button>
          <button aria-label="Next photo" className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink sm:right-5" onClick={step(1)}>›</button>
          <figure className="flex max-h-full w-full max-w-3xl flex-col items-center px-10 sm:px-14" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[active].src} alt={gallery[active].alt} className="max-h-[78dvh] max-w-full rounded-2xl object-contain" />
            {gallery[active].note && <figcaption className="mt-3 text-center text-sm text-white/70">{gallery[active].note}</figcaption>}
          </figure>
        </div>
      )}
    </section>
  )
}

function Tea() {
  return (
    <section className="bg-rose-100/60">
      <div className={`${WRAP} grid items-center gap-8 py-10 md:scroll-py-16 sm:gap-10 sm:py-20 lg:grid-cols-2 lg:gap-14`}>
        <Reveal variant="reveal-left" className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white p-2.5 shadow-lg sm:rounded-[2rem] sm:p-3 lg:max-w-none">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl sm:rounded-3xl">
            <Img src={herbalTea} alt="Kynthera Herbals Detox and Spearmint herbal tea pouches" className="object-contain bg-[#e9ecea]" />
          </div>
        </Reveal>
        <Reveal variant="reveal-right" className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className={EYEBROW}>Also in store</p>
          <h2 className={`mt-3 ${H2}`}>Herbal teas <span className="italic text-rose-500">for queens</span></h2>
          <p className="mx-auto mt-5 max-w-lg text-ink/70 lg:mx-0">
            Kynthera Herbals teas in Detox and Spearmint, 30 tea bags per pouch. Message us to ask about availability.
          </p>
          <a href={wa('Hello, I would like to ask about the Kynthera herbal teas')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-rose-500">
            Ask about teas →
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Why() {
  const items = [
    ['💄', 'Many shades', 'From nude pinks to bold reds and more.'],
    ['🎀', 'Pretty packaging', 'Giftable sets that look as good as they feel.'],
    ['😁', 'Trendy braces', 'Colours and designs to match your vibe.'],
    ['💬', 'Easy ordering', 'Just send a message on WhatsApp.'],
  ]
  return (
    <section className={`${WRAP} py-14 md:py-16 sm:py-20`}>
      <Reveal as="h2" className={`mx-auto max-w-2xl text-center ${H2}`}>
        Why girls love <span className="italic text-rose-500">Stacylipcare</span>
      </Reveal>
      <div className="mt-10 grid gap-4 min-[480px]:grid-cols-2 sm:mt-12 sm:gap-6 lg:grid-cols-4">
        {items.map(([e, t, d], i) => (
          <Reveal key={t} delay={i * 100} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-rose-100 sm:p-7">
            <p className="text-3xl" aria-hidden="true">{e}</p>
            <h3 className="mt-3 font-display text-xl font-bold">{t}</h3>
            <p className="mt-2 text-sm text-ink/70">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-white">
      <div className={`${WRAP} grid gap-10 py-14 md:py-16 sm:py-20 lg:grid-cols-5 lg:py-28`}>
        <Reveal variant="reveal-left" className="lg:col-span-2">
          <p className={EYEBROW}>Contact</p>
          <h2 className={`mt-3 ${H2}`}>Let's make you <span className="italic text-rose-500">glow.</span></h2>
          <p className="mt-5 text-ink/70">Send us a message to order products or book your fashion braces appointment.</p>
          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 rounded-2xl bg-blush p-4 ring-1 ring-rose-100 transition hover:ring-rose-400 sm:p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-500 text-white" aria-hidden="true">📞</span>
              <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-widest text-ink/50">Call</span><span className="block break-words font-bold">{PHONE_DISPLAY}</span></span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl bg-blush p-4 ring-1 ring-rose-100 sm:p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-500 text-white" aria-hidden="true">📍</span>
              <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-widest text-ink/50">Visit</span><span className="block break-words font-bold">Stacylipcare Store, Lagos State, Nigeria</span></span>
            </div>
          </div>
        </Reveal>
        <Reveal variant="reveal-right" className="lg:col-span-3">
          <div className="h-[300px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-rose-100 min-[480px]:h-[360px] sm:h-[440px] sm:rounded-[2rem] lg:h-full lg:min-h-[480px]">
            <iframe
              title="Stacylipcare location in Lagos State"
              src="https://maps.google.com/maps?q=Lagos%20State%2C%20Nigeria&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-ink pb-[env(safe-area-inset-bottom)] text-white">
      <div className={`${WRAP} flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:py-10 sm:text-left`}>
        <div>
          <p className="font-display text-2xl font-bold">Stacy<span className="italic text-rose-300">lipcare</span></p>
          <p className="text-sm text-white/60">Soft Lips, Bold Confidence.</p>
        </div>

        {/* Builder Credit */}
        <p className="mt-6 text-xs sm:text-sm opacity-80 flex items-center justify-center gap-2">
          <img
              src="/logos.jpg"
              alt="Elvionweb Logo"
              className="w-8 h-8 object-contain"
          />
          Built by{" "}
          <a
            href="https://www.elvionweb.com"
        target="_blank"
          rel="noopener noreferrer"
        className="font-semibold underline underline-offset-4 hover:opacity-100 transition-opacity"
          >
          Elvionweb
          </a>
          </p>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Stacylipcare Store. All rights reserved.</p>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={wa('Hello Stacylipcare')}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  )
}

export default function App() {
  return (
    // overflow-x-clip stops slide-in animations / blurred blobs from causing sideways scroll on phones
    <div className="w-full overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Braces />
        <Gallery />
        <Tea />
        <Why />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

















// import { useEffect, useRef, useState } from 'react'

// import bracesInstall from './assets/braces-install.webp'
// import bracesModel from './assets/braces-model.webp'
// import bracesPromo from './assets/braces-promo.webp'
// import beforeAfter from './assets/before-after.jpg'
// import glossCollection from './assets/gloss-collection.jpg'
// import herbalTea from './assets/herbal-tea.webp'
// import lipCareSet from './assets/lip-care-set.webp'
// import lipGlossShades from './assets/lip-gloss-shades.webp'
// import storeBonnets from './assets/store-bonnets.jpg'

// const PHONE_DISPLAY = '+234 807 303 4824'
// const PHONE_TEL = '+2348073034824'
// const wa = (text) => `https://wa.me/2348073034824?text=${encodeURIComponent(text)}`

// /* ---------- helpers ---------- */
// function Reveal({ as: Tag = 'div', variant = 'reveal', delay = 0, className = '', children, ...rest }) {
//   const ref = useRef(null)
//   const [shown, setShown] = useState(false)
//   useEffect(() => {
//     const el = ref.current
//     if (!el) return
//     const io = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) {
//           setShown(true)
//           io.disconnect()
//         }
//       },
//       { threshold: 0.12 }
//     )
//     io.observe(el)
//     return () => io.disconnect()
//   }, [])
//   return (
//     <Tag
//       ref={ref}
//       style={{ transitionDelay: `${delay}ms` }}
//       className={`${variant} ${shown ? 'show' : ''} ${className}`}
//       {...rest}
//     >
//       {children}
//     </Tag>
//   )
// }

// function Img({ src, alt, className = '' }) {
//   return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
// }

// const WhatsAppIcon = ({ className = 'h-5 w-5' }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//     <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a12 12 0 0 0 5.7 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.200 12C2.200 6.600 6.600 2.200 12 2.200S21.800 6.600 21.800 12 17.400 21.700 12 21.700zm5.400-7.300c-.3-.1-1.800-.9-2-1s-.5-.1-.7.1-.8 1-1 1.200-.4.200-.7.100a8 8 0 0 1-4-3.500c-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-.9-2.200c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.500s1.100 2.900 1.200 3.100c.1.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.600.7.600-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400-.1-.1-.3-.2-.6-.3z" />
//   </svg>
// )

// /* ---------- sections ---------- */
// const links = [
//   ['Services', '#services'],
//   ['Gallery', '#gallery'],
//   ['Fashion Braces', '#braces'],
//   ['Contact', '#contact'],
// ]

// function Nav() {
//   const [open, setOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   useEffect(() => {
//     const on = () => setScrolled(window.scrollY > 20)
//     on()
//     window.addEventListener('scroll', on, { passive: true })
//     return () => window.removeEventListener('scroll', on)
//   }, [])
//   return (
//     <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-white/90 shadow-sm backdrop-blur' : ''}`}>
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
//         <a href="#home" className="font-display text-xl font-bold tracking-tight sm:text-2xl">
//           Stacy<span className="italic text-rose-500">lipcare</span>
//         </a>
//         <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
//           {links.map(([l, h]) => (
//             <a key={h} href={h} className="transition hover:text-rose-500">{l}</a>
//           ))}
//           <a href={wa('Hello Stacylipcare, I would like to make an enquiry')} className="rounded-full bg-ink px-5 py-2.5 text-white transition hover:bg-rose-500">
//             Chat on WhatsApp
//           </a>
//         </nav>
//         <button
//           aria-label={open ? 'Close menu' : 'Open menu'}
//           aria-expanded={open}
//           onClick={() => setOpen((o) => !o)}
//           className="grid h-11 w-11 place-items-center rounded-full bg-white/80 shadow md:hidden"
//         >
//           <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             {open ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
//           </svg>
//         </button>
//       </div>
//       {open && (
//         <div className="border-t border-rose-100 px-5 pb-6 pt-2 md:hidden">
//           {links.map(([l, h]) => (
//             <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 font-medium">{l}</a>
//           ))}
//           <a href={wa('Hello Stacylipcare, I would like to make an enquiry')} className="mt-2 block rounded-full bg-rose-500 py-3 text-center font-bold text-white">
//             Chat on WhatsApp
//           </a>
//         </div>
//       )}
//     </header>
//   )
// }

// function Hero() {
//   return (
//     <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
//       <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-rose-200/60 blur-3xl" />
//       <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" />
//       <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:pb-28">
//         <div className="lg:col-span-6">
//           <Reveal as="p" className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-500">
//             <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Beauty · Style · Self Care
//           </Reveal>
//           <Reveal as="h1" delay={100} className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl xl:text-7xl">
//             Soft lips.<br />
//             <span className="italic text-rose-500">Bold confidence.</span>
//           </Reveal>
//           <Reveal as="p" delay={200} className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
//             Lip care, glossy lip shades and stylish fashion braces, all in one beauty store in Lagos. Come as you are, leave feeling like yourself, only brighter.
//           </Reveal>
//           <Reveal delay={300} className="mt-9 flex flex-col gap-3 sm:flex-row">
//             <a href={wa('Hello Stacylipcare, I would like to place an order')} className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 font-bold text-white shadow-lg shadow-rose-500/30 transition hover:-translate-y-0.5 hover:bg-rose-600">
//               <WhatsAppIcon /> Order on WhatsApp
//             </a>
//             <a href="#services" className="inline-flex items-center justify-center rounded-full border-2 border-ink px-8 py-4 font-bold transition hover:bg-ink hover:text-white">
//               Explore services
//             </a>
//           </Reveal>
//           <Reveal delay={300} className="mt-10 flex items-center gap-6 text-sm sm:gap-8">
//             {[['3', 'Beauty services'], ['5+', 'Lip shades'], ['Lagos', 'Based in']].map(([n, l], i) => (
//               <div key={l} className="flex items-center gap-6 sm:gap-8">
//                 {i > 0 && <div className="h-10 w-px bg-rose-200" />}
//                 <div>
//                   <p className="font-display text-3xl font-bold">{n}</p>
//                   <p className="text-ink/60">{l}</p>
//                 </div>
//               </div>
//             ))}
//           </Reveal>
//         </div>

//         <Reveal variant="reveal-right" className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
//           <div className="grid grid-cols-6 gap-4">
//             <div className="ph col-span-4 row-span-2 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-xl shadow-rose-300/40">
//               <Img src={bracesModel} alt="Smiling client wearing fashion braces" />
//             </div>
//             <div className="ph col-span-2 aspect-square overflow-hidden rounded-3xl shadow-lg">
//               <Img src={glossCollection} alt="Stacylipcare lip gloss shades" />
//             </div>
//             <div className="ph col-span-2 aspect-square overflow-hidden rounded-3xl shadow-lg">
//               <Img src={lipCareSet} alt="Lip butter and lip scrub set" className="object-[30%_60%]" />
//             </div>
//           </div>
//           <div className="absolute -bottom-5 -left-2 rounded-2xl bg-white px-5 py-3 shadow-xl sm:-left-6">
//             <p className="text-xs font-bold uppercase tracking-widest text-rose-500">Chic. Trendy. You.</p>
//             <p className="font-display text-lg font-bold">Fashion Braces</p>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   )
// }

// function Marquee() {
//   const words = ['Lip Care', 'Lip Gloss', 'Lip Butter', 'Lip Scrub', 'Fashion Braces', 'Soft Lips', 'Bold Confidence']
//   const row = words.map((w) => `${w} ✦`)
//   return (
//     <div className="overflow-hidden bg-ink py-4 text-white" aria-hidden="true">
//       <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-lg italic">
//         {[...row, ...row].map((w, i) => <span key={i}>{w}</span>)}
//       </div>
//     </div>
//   )
// }

// const services = [
//   { n: '01', title: 'Lip Care', img: lipCareSet, pos: 'object-[30%_65%]', alt: 'Lip butter, lip scrub and lip brush set', text: 'Lip butter, lip scrub and care sets made to keep your lips soft, smooth and looking their best.', cta: 'Ask about lip care →', msg: 'Hello, I am interested in your lip care products' },
//   { n: '02', title: 'Lip Gloss', img: lipGlossShades, pos: 'object-[50%_55%]', alt: 'Diamond Drip lip gloss in several shades', text: 'Glossy, shimmery shades from soft pinks to bold reds. Pick one, or build your own set.', cta: 'Order lip gloss →', msg: 'Hello, I would like to order lip gloss' },
//   { n: '03', title: 'Fashion Braces', img: bracesInstall, pos: 'object-[50%_65%]', alt: 'Fashion braces being installed', text: 'Stylish decorative braces in different colours and designs, installed in-store. Book your slot today.', cta: 'Book fashion braces →', msg: 'Hello, I would like to book fashion braces' },
// ]

// function Services() {
//   return (
//     <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
//       <div className="mx-auto max-w-2xl text-center">
//         <Reveal as="p" className="text-xs font-bold uppercase tracking-widest text-rose-500">What we do</Reveal>
//         <Reveal as="h2" delay={100} className="mt-3 font-display text-4xl font-bold sm:text-5xl">
//           Everything for your <span className="italic text-rose-500">pout &amp; smile</span>
//         </Reveal>
//       </div>
//       <div className="mt-14 grid gap-6 md:grid-cols-3">
//         {services.map((s, i) => (
//           <Reveal as="article" key={s.n} delay={i * 100} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-rose-100 transition hover:-translate-y-2 hover:shadow-xl">
//             <div className="ph aspect-[4/3] overflow-hidden">
//               <Img src={s.img} alt={s.alt} className={`${s.pos} transition duration-700 group-hover:scale-105`} />
//             </div>
//             <div className="p-7">
//               <span className="text-xs font-bold uppercase tracking-widest text-rose-500">{s.n}</span>
//               <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
//               <p className="mt-3 text-ink/70">{s.text}</p>
//               <a href={wa(s.msg)} className="mt-5 inline-flex items-center gap-2 font-bold text-rose-500 transition-all hover:gap-3">{s.cta}</a>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   )
// }

// function Braces() {
//   const perks = ['Adds style to your smile', 'Boosts your confidence', 'Comfortable to wear', 'Different colours & designs']
//   return (
//     <section id="braces" className="bg-ink text-white">
//       <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
//         <Reveal variant="reveal-left">
//           <p className="text-xs font-bold uppercase tracking-widest text-rose-300">Fashion Braces</p>
//           <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
//             Get that perfect smile <span className="italic text-rose-300">with style.</span>
//           </h2>
//           <p className="mt-5 max-w-lg text-white/70">
//             Add a touch of sparkle to your smile with fashion braces in a range of colours and designs. Chic. Trendy. You.
//           </p>
//           <ul className="mt-8 grid gap-4 sm:grid-cols-2">
//             {perks.map((p) => (
//               <li key={p} className="flex items-start gap-3">
//                 <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-500 text-xs">✓</span>
//                 {p}
//               </li>
//             ))}
//           </ul>
//           <a href={wa('Hello, I would like to book fashion braces installation')} className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 font-bold shadow-lg shadow-rose-500/30 transition hover:-translate-y-0.5 hover:bg-rose-400">
//             <WhatsAppIcon /> Book on WhatsApp
//           </a>
//           <p className="mt-5 max-w-md text-xs text-white/50">
//             Fashion braces are decorative accessories and are not orthodontic treatment. For teeth alignment, please see a licensed dentist.
//           </p>
//         </Reveal>
//         <Reveal variant="reveal-right" className="grid grid-cols-2 gap-4">
//           <div className="ph aspect-[3/4] overflow-hidden rounded-3xl"><Img src={bracesModel} alt="Client smiling with fashion braces holding the braces pack" /></div>
//           <div className="ph mt-10 aspect-[3/4] overflow-hidden rounded-3xl"><Img src={bracesInstall} alt="Fashion braces installation in progress" className="object-[40%_65%]" /></div>
//         </Reveal>
//       </div>
//     </section>
//   )
// }

// const gallery = [
//   { src: lipGlossShades, alt: 'Lip gloss shades and lip butter', cls: 'col-span-2 row-span-2', pos: 'object-[50%_50%]' },
//   { src: beforeAfter, alt: 'Lip butter jars with a before and after comparison', cls: 'row-span-2', pos: 'object-[50%_55%]', note: 'Individual results vary' },
//   { src: glossCollection, alt: 'Row of coloured lip glosses in the store', cls: 'row-span-2', pos: 'object-[40%_50%]' },
//   { src: storeBonnets, alt: 'Stacylipcare store with satin bonnets', cls: 'col-span-2', pos: 'object-[50%_40%]' },
//   { src: bracesPromo, alt: 'Past fashion braces promo poster', cls: 'row-span-2', pos: 'object-top', note: 'Past promo, ask for current pricing' },
//   { src: lipCareSet, alt: 'Lip butter and lip scrub in hand', cls: 'row-span-2', pos: 'object-[30%_65%]' },
//   { src: bracesModel, alt: 'Client with fashion braces', cls: 'col-span-2', pos: 'object-[50%_45%]' },
// ]

// function Gallery() {
//   const [active, setActive] = useState(null)
//   useEffect(() => {
//     if (active === null) return
//     const onKey = (e) => e.key === 'Escape' && setActive(null)
//     document.addEventListener('keydown', onKey)
//     document.body.style.overflow = 'hidden'
//     return () => {
//       document.removeEventListener('keydown', onKey)
//       document.body.style.overflow = ''
//     }
//   }, [active])

//   return (
//     <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//         <div>
//           <Reveal as="p" className="text-xs font-bold uppercase tracking-widest text-rose-500">Gallery</Reveal>
//           <Reveal as="h2" delay={100} className="mt-3 font-display text-4xl font-bold sm:text-5xl">
//             Inside the <span className="italic text-rose-500">store</span>
//           </Reveal>
//         </div>
//         <Reveal as="p" delay={200} className="max-w-sm text-ink/70">A peek at our products, shades and the happy faces behind them. Tap any photo to enlarge.</Reveal>
//       </div>

//       <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 md:grid-cols-4">
//         {gallery.map((g, i) => (
//           <Reveal key={i} delay={(i % 3) * 100} className={`${g.cls}`}>
//             <button onClick={() => setActive(i)} className="ph group relative block h-full w-full overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400" aria-label={`Enlarge: ${g.alt}`}>
//               <Img src={g.src} alt={g.alt} className={`${g.pos} transition duration-700 group-hover:scale-105`} />
//             </button>
//           </Reveal>
//         ))}
//       </div>

//       {active !== null && (
//         <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-4" onClick={() => setActive(null)} role="dialog" aria-modal="true">
//           <button aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink" onClick={() => setActive(null)}>✕</button>
//           <figure className="max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
//             <img src={gallery[active].src} alt={gallery[active].alt} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
//             {gallery[active].note && <figcaption className="mt-3 text-center text-sm text-white/70">{gallery[active].note}</figcaption>}
//           </figure>
//         </div>
//       )}
//     </section>
//   )
// }

// function Tea() {
//   return (
//     <section className="bg-rose-100/60">
//       <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
//         <Reveal variant="reveal-left" className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg">
//           <div className="aspect-[3/2] overflow-hidden rounded-3xl">
//             <Img src={herbalTea} alt="Kynthera Herbals Detox and Spearmint herbal tea pouches" className="object-contain bg-[#e9ecea]" />
//           </div>
//         </Reveal>
//         <Reveal variant="reveal-right">
//           <p className="text-xs font-bold uppercase tracking-widest text-rose-500">Also in store</p>
//           <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Herbal teas <span className="italic text-rose-500">for queens</span></h2>
//           <p className="mt-5 max-w-lg text-ink/70">
//             Kynthera Herbals teas in Detox and Spearmint, 30 tea bags per pouch. Message us to ask about availability.
//           </p>
//           <a href={wa('Hello, I would like to ask about the Kynthera herbal teas')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-rose-500">
//             Ask about teas →
//           </a>
//         </Reveal>
//       </div>
//     </section>
//   )
// }

// function Why() {
//   const items = [
//     ['💄', 'Many shades', 'From nude pinks to bold reds and more.'],
//     ['🎀', 'Pretty packaging', 'Giftable sets that look as good as they feel.'],
//     ['😁', 'Trendy braces', 'Colours and designs to match your vibe.'],
//     ['💬', 'Easy ordering', 'Just send a message on WhatsApp.'],
//   ]
//   return (
//     <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
//       <Reveal as="h2" className="mx-auto max-w-2xl text-center font-display text-4xl font-bold sm:text-5xl">
//         Why girls love <span className="italic text-rose-500">Stacylipcare</span>
//       </Reveal>
//       <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {items.map(([e, t, d], i) => (
//           <Reveal key={t} delay={i * 100} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-rose-100">
//             <p className="text-3xl" aria-hidden="true">{e}</p>
//             <h3 className="mt-3 font-display text-xl font-bold">{t}</h3>
//             <p className="mt-2 text-sm text-ink/70">{d}</p>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   )
// }

// function Contact() {
//   return (
//     <section id="contact" className="bg-white">
//       <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-5 lg:py-28">
//         <Reveal variant="reveal-left" className="lg:col-span-2">
//           <p className="text-xs font-bold uppercase tracking-widest text-rose-500">Contact</p>
//           <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Let's make you <span className="italic text-rose-500">glow.</span></h2>
//           <p className="mt-5 text-ink/70">Send us a message to order products or book your fashion braces appointment.</p>
//           <div className="mt-8 space-y-4">
//             <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 rounded-2xl bg-blush p-5 ring-1 ring-rose-100 transition hover:ring-rose-400">
//               <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-500 text-white" aria-hidden="true">📞</span>
//               <span><span className="block text-xs font-bold uppercase tracking-widest text-ink/50">Call</span><span className="font-bold">{PHONE_DISPLAY}</span></span>
//             </a>
//             <div className="flex items-center gap-4 rounded-2xl bg-blush p-5 ring-1 ring-rose-100">
//               <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-500 text-white" aria-hidden="true">📍</span>
//               <span><span className="block text-xs font-bold uppercase tracking-widest text-ink/50">Visit</span><span className="font-bold">Stacylipcare Store, Lagos State, Nigeria</span></span>
//             </div>
//           </div>
//           <a href={wa('Hello Stacylipcare, I would like to make an enquiry')} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 sm:w-auto">
//             <WhatsAppIcon /> Message us on WhatsApp
//           </a>
//         </Reveal>
//         <Reveal variant="reveal-right" className="lg:col-span-3">
//           <div className="h-[380px] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-rose-100 sm:h-[480px] lg:h-full lg:min-h-[480px]">
//             <iframe
//               title="Stacylipcare location in Lagos State"
//               src="https://maps.google.com/maps?q=Lagos%20State%2C%20Nigeria&output=embed"
//               className="h-full w-full border-0"
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               allowFullScreen
//             />
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   )
// }

// function Footer() {
//   return (
//     <footer className="bg-ink text-white">
//       <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-center sm:flex-row sm:px-8 sm:text-left">
//         <div>
//           <p className="font-display text-2xl font-bold">Stacy<span className="italic text-rose-300">lipcare</span></p>
//           <p className="text-sm text-white/60">Soft Lips, Bold Confidence.</p>
//         </div>
//         <p className="text-sm text-white/50">© {new Date().getFullYear()} Stacylipcare Store. All rights reserved.</p>
//       </div>
//     </footer>
//   )
// }

// function FloatingWhatsApp() {
//   return (
//     <a href={wa('Hello Stacylipcare')} aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110">
//       <WhatsAppIcon className="h-7 w-7" />
//     </a>
//   )
// }

// export default function App() {
//   return (
//     <>
//       <Nav />
//       <main>
//         <Hero />
//         <Marquee />
//         <Services />
//         <Braces />
//         <Gallery />
//         <Tea />
//         <Why />
//         <Contact />
//       </main>
//       <Footer />
//       <FloatingWhatsApp />
//     </>
//   )
// }
