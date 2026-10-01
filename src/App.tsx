
import { useState, useEffect } from 'react'

import {
  NOMBRE_FESTEJADO as UNCLE_NAME, DE_PARTE_DE as FROM_NAME, EDAD,
  FECHA_EVENTO as EVENT_DATE, FECHA_TEXTO as EVENT_DATE_LABEL, HORA_TEXTO as EVENT_TIME,
  MES_ANIO_PIE, LUGAR_NOMBRE as VENUE_NAME, LUGAR_DIRECCION as VENUE_ADDRESS,
  MAPA_EMBED_URL, MAPA_LINK, VESTIMENTA_TITULO, VESTIMENTA_DETALLE as DRESS_CODE,
  FECHA_LIMITE_RSVP as RSVP_DEADLINE, MUSICA_URL, FOTO_PORTADA,
  GALERIA as GALLERY, PROGRAMA as PROGRAM, DESEOS, RSVP_URL,
  FRASE_SUPERIOR, TEXTO_PORTADA, TEXTO_BOTON,FOTO_PORTADA_MOVIL, TEXTO_SOBRE, FIRMA
} from './datos'

// Nombre del invitado desde el enlace: ?para=Familia-Perez → "Familia Perez"
// Sin ?para= el sobre dice "Para ti"
const INVITADO = typeof window !== 'undefined'
  ? (new URLSearchParams(window.location.search).get('para') ?? '').replace(/[-_]+/g, ' ').trim().slice(0, 60)
  : ''

// ── Hooks ────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

// ── Envelope Intro ───────────────────────────────────────────────

function EnvelopeScreen({ onOpen, onStart }: { onOpen: () => void; onStart: () => void }) {
  const [stage, setStage] = useState<'idle' | 'opening'>('idle')

  const handleOpen = () => {
    // La música debe iniciarse dentro del clic (los navegadores bloquean el autoplay)
    if (stage === 'opening') return
    onStart()
    setStage('opening')
    // Secuencia: sello se rompe → solapa se abre → la carta sale → fundido
    setTimeout(onOpen, 2000)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #14254F 0%, #030912 70%)',
        transition: 'opacity 0.6s ease 1.4s',
        opacity: stage === 'opening' ? 0 : 1,
      }}
    >
      {/* Stars */}
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.15,
          }}
        />
      ))}

      {/* Sobre */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Abrir la invitación"
        onClick={handleOpen}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleOpen() }}
        className={'relative w-full max-w-[420px] rounded-md text-center cursor-pointer ' + (stage === 'opening' ? 'env-opening' : 'float-anim')}
        style={{
          perspective: '900px',
          background: 'linear-gradient(180deg, #112249 0%, #0B1836 100%)',
          border: '1px solid rgba(212,175,106,0.45)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,106,0.15)',
        }}
      >
        {/* Pliegues inferiores del sobre */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-24 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L50 25 L100 100" fill="none" stroke="rgba(212,175,106,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Solapa superior (se abre hacia arriba al tocar) */}
        <svg className="env-flap absolute top-0 inset-x-0 w-full h-[120px] pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="solapa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A2C5B" />
              <stop offset="100%" stopColor="#12224A" />
            </linearGradient>
          </defs>
          <path d="M0 0 H100 L50 100 Z" fill="url(#solapa)" stroke="rgba(212,175,106,0.55)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Sello de cera en la punta de la solapa (decorativo: todo el sobre abre) */}
        <div className="env-seal absolute left-1/2 top-[72px] -ml-12 w-24 h-24 z-30">
          <div
            className="wax-pulse w-24 h-24 rounded-full flex items-center justify-center border-2 border-gold-light/70"
            style={{ background: 'radial-gradient(circle at 35% 30%, #F6E2B3 0%, #D4AF6A 45%, #8F6A2E 100%)' }}
          >
            <div className="w-[4.6rem] h-[4.6rem] rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(26,18,6,0.35)' }}>
              <span className="leading-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '2rem', color: '#2A1D08' }}>
                {EDAD}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido (la "carta" que sale del sobre) */}
        <div className="env-letter relative px-6 pt-[190px] pb-12">
          <p className="font-outfit text-gold-light text-sm uppercase tracking-[0.3em] mb-6">Invitación especial</p>

          <p className="font-outfit text-cream/70 text-sm uppercase tracking-widest mb-1">De</p>
          <p className="text-champagne text-2xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>{FROM_NAME}</p>

          {INVITADO ? (
            <>
              <p className="font-outfit text-cream/70 text-sm uppercase tracking-widest mb-1">Para</p>
              <p
                className="text-gold-gradient glow-gold leading-[1.15] pb-1 break-words"
                style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(2.6rem, 11vw, 3.8rem)' }}
              >
                {INVITADO}
              </p>
            </>
          ) : (
            <p
              className="text-gold-gradient glow-gold leading-[1.15] pb-1"
              style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(3rem, 13vw, 4.2rem)' }}
            >
              Para ti
            </p>
          )}

          <StarDivider />

          <p className="italic text-cream/90 text-lg leading-snug mt-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            {TEXTO_SOBRE}
          </p>

          <span className="btn-gold pulse-ring inline-flex items-center gap-2 rounded-full px-8 py-3.5 mt-8 font-outfit font-semibold text-sm uppercase tracking-[0.15em]">
            Abrir invitación
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" /></svg>
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Shared Components ────────────────────────────────────────────

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-gold rounded-2xl w-[4.6rem] h-[5.6rem] sm:w-24 sm:h-28 md:w-36 md:h-36 flex flex-col items-center justify-center gap-1 md:gap-2">
      <span
        className="text-gold-gradient tabular-nums leading-none"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.9rem, 6vw, 3.6rem)', fontWeight: 700 }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-outfit font-medium text-cream text-[0.68rem] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.2em] md:tracking-[0.3em]">
        {label}
      </span>
    </div>
  )
}

function StarDivider() {
  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,106,0.8))' }} />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF6A" style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,106,0.8))' }}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
      <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,106,0.8))' }} />
    </div>
  )
}

// Tarjeta con marco dorado recto y esquinas marcadas (estilo art déco)
function DecoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="deco-card reveal">
      {['tl', 'tr', 'bl', 'br'].map(c => <span key={c} className={`deco-corner deco-${c}`} />)}
      {children}
    </div>
  )
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="reveal text-center mb-6">
      <p className="gold-lines font-outfit text-gold-light text-[0.8rem] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.4em] mb-5">{tag}</p>
      <h2 className="text-gold-gradient glow-gold text-4xl md:text-5xl leading-tight pb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
        {title}
      </h2>
      <StarDivider />
    </div>
  )
}

// Audio único para toda la invitación (se inicia al abrir el sobre)
// Se guarda en window para reutilizar siempre el mismo reproductor
// (evita que queden dos canciones sonando al recargar el código en desarrollo)
const w = typeof window !== 'undefined' ? (window as unknown as { __musicaInvitacion?: HTMLAudioElement }) : null
const audio = w ? (w.__musicaInvitacion ??= new Audio()) : null
if (audio) {
  const src = new URL(MUSICA_URL, document.baseURI).href
  if (audio.src !== src) audio.src = src
  audio.loop = true
  audio.preload = 'auto'
}

// true cuando la persona ya usó el botón: desde ahí solo manda el botón
let userControlled = false

function playMusic() {
  if (userControlled) return
  audio?.play().catch(() => {})
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!audio) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    setPlaying(!audio.paused)

    // Si la música aún no suena, arranca con el primer toque en la página
    // (excepto si ese toque es sobre el propio botón de música)
    const start = (e: PointerEvent) => {
      if ((e.target as Element).closest('[data-music-btn]')) return
      window.removeEventListener('pointerdown', start)
      if (audio.paused) playMusic()
    }
    window.addEventListener('pointerdown', start)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      window.removeEventListener('pointerdown', start)
    }
  }, [])

  const toggle = () => {
    if (!audio) return
    userControlled = true
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <button
      data-music-btn
      onClick={toggle}
      aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 backdrop-blur-md shrink-0 transition-opacity hover:opacity-90"
      style={{
        background: 'rgba(6,12,28,0.75)',
        border: '1px solid rgba(212,175,106,0.5)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <span
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'radial-gradient(circle at 35% 30%, #F6E2B3 0%, #D4AF6A 50%, #9C7433 100%)', boxShadow: '0 0 14px rgba(212,175,106,0.45)' }}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A1206">
            <rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A1206">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </span>
      <span className="flex gap-0.5 items-end h-4">
        {[3, 5, 4, 6, 3].map((h, i) => (
          <span
            key={i}
            className={'w-0.5 rounded-full ' + (playing ? 'eq-bar' : '')}
            style={{ height: `${h * 2.5}px`, background: '#D4AF6A', opacity: playing ? 1 : 0.35, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </button>
  )
}

function FloatingRSVP() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', pointerEvents: visible ? 'auto' : 'none' }}
    >
      <a
        href="#rsvp"
        className="btn-gold pulse-ring flex items-center gap-2.5 rounded-full pl-4 pr-5 py-3 font-outfit font-semibold text-sm uppercase tracking-wider"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        Confirmar Asistencia
      </a>
    </div>
  )
}

// Lluvia corta de confeti dorado y azul (al confirmar asistencia)
function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 90 }, (_, i) => ({
      left: Math.random() * 100,
      size: 6 + Math.random() * 7,
      delay: Math.random() * 0.6,
      dur: 2.2 + Math.random() * 1.6,
      dx: (Math.random() - 0.5) * 160,
      rot: 360 + Math.random() * 720,
      color: ['#F1D9A6', '#D4AF6A', '#9C7433', '#FFF3D6', '#1A2C5B', '#3A5BB0'][i % 6],
      round: i % 4 === 0,
    })),
  )
  const [show, setShow] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setShow(false), 4500)
    return () => clearTimeout(id)
  }, [])
  if (!show) return null
  return (
    <div className="confetti fixed inset-0 z-[90] pointer-events-none overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            background: p.color,
            borderRadius: p.round ? '50%' : '1px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            '--dx': `${p.dx}px`,
            '--rot': `${p.rot}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

function RSVPSection() {
  const [form, setForm] = useState({ name: INVITADO, email: '', phone: '', guests: '1', diet: '', message: '' })
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!RSVP_URL) { setDone(true); return } // sin script configurado: solo muestra el mensaje
    setSending(true)
    try {
      // Se envía como text/plain para evitar bloqueos CORS con Google Apps Script
      const res = await fetch(RSVP_URL, { method: 'POST', body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({ ok: true }))
      if (data.ok === false) throw new Error(data.error || 'Error')
      setDone(true)
    } catch {
      setError('No pudimos registrar tu confirmación. Revisa tu conexión e inténtalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  if (done) {
    return (
      <div className="text-center py-16 px-4">
        <Confetti />
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-7 border-2 border-gold"
          style={{ boxShadow: '0 0 40px rgba(212,175,106,0.3)' }}
        >
          <svg className="w-9 h-9 text-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-playfair text-4xl text-gold-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>¡Confirmado!</h3>
        <p className="font-cormorant text-cream/90 text-[1.35rem] md:text-2xl leading-relaxed">
          Gracias, <span className="text-cream font-medium">{form.name}</span>.<br />
          Tu asistencia ha sido registrada. ¡Con mucho cariño te esperamos!
          {form.email && <><br /><span className="text-cream/40 text-base">Te enviamos una confirmación a {form.email}</span></>}
        </p>
        <p className="font-playfair italic text-gold/60 text-xl mt-8" style={{ fontFamily: 'Playfair Display, serif' }}>
          "Hasta pronto en la celebración"
        </p>
      </div>
    )
  }

  const field = [
    'w-full rounded-lg px-4 py-3 font-outfit text-cream text-base',
    'placeholder:text-cream/40 focus:outline-none transition-colors',
    'bg-white/5 border border-gold/35 focus:border-gold/70',
  ].join(' ')

  const label = 'block font-outfit text-cream/80 text-sm uppercase tracking-wider mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Nombre completo *</label>
          <input required className={field} placeholder="Tu nombre" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className={label}>Teléfono / WhatsApp *</label>
          <input required className={field} placeholder="+51 999 999 999" value={form.phone} onChange={set('phone')} />
        </div>
      </div>
      <div>
        <label className={label}>Correo electrónico</label>
        <input type="email" className={field} placeholder="tucorreo@ejemplo.com" value={form.email} onChange={set('email')} />
      </div>
      <div >
        <div>
          <label className={label}>Asistentes</label>
          <select className={field + ' cursor-pointer'} value={form.guests} onChange={set('guests')}>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n} className="bg-[#060C1C]">
                {n} {n === 1 ? 'persona' : 'personas'}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={label}>Mensaje para {UNCLE_NAME}</label>
        <textarea
          rows={3}
          className={field + ' resize-none'}
          placeholder={`Escríbele algo especial a ${UNCLE_NAME}…`}
          value={form.message}
          onChange={set('message')}
        />
      </div>
      {error && <p className="font-outfit text-red-300 text-sm text-center">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="btn-gold w-full py-4 rounded-full font-outfit font-semibold text-base uppercase tracking-[0.2em]"
      >
        {sending ? 'Enviando…' : 'Confirmar Asistencia'}
      </button>
    </form>
  )
}

// ── Main App ─────────────────────────────────────────────────────

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [navBg, setNavBg] = useState(false)
  const time = useCountdown(EVENT_DATE)

  // Aparición suave de los elementos .reveal al llegar a ellos con el scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setNavBg(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Envelope intro ── */}
      {!envelopeOpen && <EnvelopeScreen onStart={playMusic} onOpen={() => setEnvelopeOpen(true)} />}

      {/* ── Invitation ── */}
      <div
        className="min-h-screen overflow-x-hidden"
        style={{
          background: '#060C1C',
          color: '#F7EFE2',
          fontFamily: 'Outfit, system-ui, sans-serif',
          transition: 'opacity 0.7s ease 0.2s',
          opacity: envelopeOpen ? 1 : 0,
        }}
      >

        {/* ── Menú superior ── */}
        <nav
          className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
          style={{
            background: navBg ? 'rgba(6,12,28,0.88)' : 'linear-gradient(to bottom, rgba(6,12,28,0.6), transparent)',
            borderBottom: navBg ? '1px solid rgba(212,175,106,0.2)' : '1px solid transparent',
            backdropFilter: navBg ? 'blur(12px)' : 'none',
            padding: navBg ? '10px 0' : '22px 0',
          }}
        >
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <a href="#" className="relative leading-none">
              <span
                className="text-gold-gradient glow-gold"
                style={{ fontFamily: 'Great Vibes, cursive', fontSize: navBg ? '1.9rem' : '2.4rem', transition: 'font-size 0.4s' }}
              >
                {UNCLE_NAME}
              </span>
              <span className="block h-px w-2/3 mt-0.5" style={{ background: 'linear-gradient(to right, rgba(212,175,106,0.9), transparent)' }} />
            </a>
            <div className="flex items-center gap-10">
              <div className="hidden md:flex gap-10">
                {[
                  { label: 'Galería', href: '#galería' },
                  { label: 'Programa', href: '#programa' },
                  { label: 'Ubicación', href: '#ubicación' },
                  { label: 'RSVP', href: '#rsvp' },
                ].map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="nav-link font-outfit text-cream/85 text-xs uppercase tracking-[0.25em] hover:text-gold-light transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              {/* Música: arriba a la derecha */}
              <MusicPlayer />
            </div>
          </div>
        </nav>
        <FloatingRSVP />

        {/* ── Portada ── */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Foto de fondo — en celular se enfoca hacia la izquierda (ajusta el % a tu foto) */}
        {/* Celular */}
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${FOTO_PORTADA_MOVIL})` }}
        />
        {/* Computadora */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${FOTO_PORTADA})` }}
        />
          {/* Capa azul en celular: la foto queda de fondo y el texto se lee bien
              (sube/baja el 0.62 para más/menos oscuridad) */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: 'rgba(6,12,28,0.62)' }}
          />
          {/* Oscurecimiento central para que el texto se lea, bordes más visibles */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(6,12,28,0.78) 0%, rgba(6,12,28,0.45) 60%, rgba(6,12,28,0.25) 100%)' }}
          />
          {/* Transición suave hacia la siguiente sección */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(6,12,28,0.35) 0%, transparent 25%, transparent 70%, #060C1C 100%)' }}
          />

          <div className="relative z-10 w-full max-w-4xl px-5 pt-28 pb-16 md:py-32 flex flex-col items-center">
            <p className="fade-up gold-lines text-legible w-full font-outfit font-medium text-cream text-[0.8rem] sm:text-sm uppercase tracking-[0.2em] md:tracking-[0.5em] mb-4 md:mb-6">
              {FRASE_SUPERIOR}
            </p>

            <h1
              className="fade-up glow-gold leading-[1.15]"
              style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(5rem, 20vw, 11rem)', animationDelay: '0.15s' }}
            >
              <span className="text-gold-gradient text-shine">{UNCLE_NAME}</span>
            </h1>
            {/* trazo dorado bajo el nombre */}
            <div
              className="h-[2px] w-40 md:w-72 -mt-2 md:-mt-4 mb-5 rounded-full"
              style={{ background: 'linear-gradient(to right, transparent, #F1D9A6, transparent)', boxShadow: '0 0 12px rgba(241,217,166,0.8)' }}
            />

            <p
              className="fade-up gold-lines text-legible w-full text-gold-light uppercase text-xl sm:text-2xl md:text-3xl tracking-[0.18em] md:tracking-[0.35em] mb-5"
              style={{ fontFamily: 'Playfair Display, serif', animationDelay: '0.3s' }}
            >
              Celebra sus {EDAD} años
            </p>

            <p
              className="fade-up text-legible font-cormorant font-medium text-cream text-[1.35rem] md:text-2xl leading-snug max-w-2xl mb-5"
              style={{ animationDelay: '0.45s' }}
            >
              {TEXTO_PORTADA}
            </p>

            <p
              className="fade-up gold-lines text-legible w-full font-cormorant font-semibold text-gold-light text-xl md:text-2xl mb-8 md:mb-10"
              style={{ animationDelay: '0.6s' }}
            >
              {EVENT_DATE_LABEL} · {EVENT_TIME}
            </p>

            {/* Cuenta regresiva */}
            <div className="fade-up flex justify-center gap-1.5 sm:gap-4 md:gap-5 mb-10" style={{ animationDelay: '0.75s' }}>
              <CountdownUnit value={time.days} label="Días" />
              <CountdownUnit value={time.hours} label="Horas" />
              <CountdownUnit value={time.minutes} label="Minutos" />
              <CountdownUnit value={time.seconds} label="Segundos" />
            </div>

            <a
              href="#galería"
              className="fade-up btn-gold inline-flex items-center gap-3 rounded-full px-7 md:px-10 py-4 font-outfit font-semibold text-sm md:text-base uppercase tracking-[0.15em]"
              style={{ animationDelay: '0.9s' }}
            >
              {TEXTO_BOTON}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <svg className="w-5 h-5 text-gold/70 animate-bounce mt-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ── Message ── */}
        <section className="py-10 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader tag="Una historia, muchos momentos" title="50 años que merecen celebrarse" />
            <p className="reveal font-cormorant text-cream/90 text-[1.35rem] md:text-2xl leading-relaxed">
              Llegar a los 50 es mirar atrás con gratitud, recordar cada camino recorrido y valorar a las personas que hicieron especial cada etapa. Hoy queremos celebrar su vida, sus historias compartidas, sus aprendizajes, sus sonrisas y todo lo que aún le queda por vivir.
            </p>
            <p className="reveal font-cormorant text-cream/90 text-[1.35rem] md:text-2xl leading-relaxed mt-5">
              Esta celebración no estaría completa sin las personas que han sido parte de su historia. Por eso, queremos compartir este día contigo.
            </p>
            <blockquote className="reveal mt-12 font-cormorant text-2xl md:text-3xl text-gold-light italic leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              Hay momentos que se recuerdan para siempre. Este queremos vivirlo juntos.
            </blockquote>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section id="galería" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeader tag="Momentos especiales" title="Galería de Recuerdos" />

            {/* 10-photo asymmetric grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
              {GALLERY.map((photo, i) => {
                const isWide = photo.wide
                const isTall = i === 1
                return (
                  <button
                    key={i}
                    onClick={() => setLightbox(photo.url)}
                    className={[
                      'reveal relative overflow-hidden rounded-xl group',
                      isWide ? 'col-span-2' : 'col-span-1',
                      isTall ? 'row-span-2' : 'row-span-1',
                    ].join(' ')}
                    style={{ background: 'rgba(14,29,64,0.4)', transitionDelay: `${(i % 3) * 100}ms` }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                      style={{ background: 'linear-gradient(to top, rgba(14,29,64,0.8) 0%, transparent 60%)' }}
                    >
                      <span className="font-outfit text-cream/80 text-xs uppercase tracking-widest">{photo.alt}</span>
                    </div>
                    {/* Blue tint on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(212,175,106,0.08)' }}
                    />
                  </button>
                )
              })}
            </div>

            {/* <p className="text-center font-outfit text-cream/30 text-xs mt-5 uppercase tracking-widest">
              Haz clic en las fotos para ampliarlas
            </p> */}
          </div>
        </section>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(6,12,28,0.96)' }}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-cream/40 hover:text-cream transition-colors">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={lightbox.replace('w=500', 'w=1200').replace('w=900', 'w=1400')}
              alt="Vista ampliada"
              className="max-w-full max-h-[88vh] rounded-2xl object-contain"
              onClick={e => e.stopPropagation()}
              style={{ boxShadow: '0 30px 80px rgba(212,175,106,0.2)' }}
            />
          </div>
        )}

        {/* ── Program ── */}
        <section id="programa" className="deco-bg deco-rombos py-14 px-4 sm:px-6" style={{ '--glow-x': '15%', '--glow-y': '30%' } as React.CSSProperties}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader tag="Un día para celebrar" title="Programa de la Celebración" />
            <DecoCard>
            <div className="relative">
              <div className="absolute left-[1.1rem] top-1 bottom-1 w-px" style={{ background: 'rgba(212,175,106,0.3)' }} />
              {PROGRAM.map((item, i) => (
                <div key={i} className="reveal flex gap-6 mb-2 last:mb-0 group" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div
                    className="shrink-0 w-[2.2rem] h-[2.2rem] rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                    style={{ border: '1px solid rgba(212,175,106,0.45)', background: '#0B1733' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{ background: 'rgba(212,175,106,0.6)' }}
                    />
                  </div>
                  <div className="pt-0.5">
                    <p className="font-outfit text-gold-light text-sm uppercase tracking-widest mb-1">{item.time}</p>
                    <p className="font-playfair text-[1.35rem] text-cream " style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</p>
                    <p className="font-outfit text-cream/75 text-base mb-3">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            </DecoCard>
          </div>
        </section>

        {/* ── Location ── */}
        <section id="ubicación" className="deco-bg deco-diagonal py-14 px-4 sm:px-6" style={{ '--glow-x': '85%', '--glow-y': '40%' } as React.CSSProperties}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="El lugar del encuentro" title="Ubicación" />
            <DecoCard>
            <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start">
              <div className="md:col-span-3">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: '1px solid rgba(212,175,106,0.15)', boxShadow: '0 0 60px rgba(212,175,106,0.06)' }}
                >
                  <iframe
                    src={MAPA_EMBED_URL}
                    width="100%"
                    height="340"
                    style={{ border: 0, filter: 'grayscale(35%) sepia(25%) brightness(0.8) contrast(1.05)' }}
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación del evento"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-7">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
                    tag: 'Dirección', title: VENUE_NAME, sub: VENUE_ADDRESS,
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />,
                    tag: 'Fecha y hora', title: EVENT_DATE_LABEL, sub: `${EVENT_TIME} · Almuerzo y baile`,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ border: '1px solid rgba(212,175,106,0.25)', background: 'rgba(212,175,106,0.05)' }}
                    >
                      <svg className="w-5 h-5 text-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="font-outfit text-gold-light text-sm uppercase tracking-widest mb-0.5">{item.tag}</p>
                      <p className="font-playfair text-cream text-xl leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</p>
                      <p className="font-outfit text-cream/75 text-base mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <a
                  href={MAPA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-outfit text-gold-light text-sm uppercase tracking-widest rounded-full px-5 py-3 hover:opacity-80 transition-opacity"
                  style={{ border: '1px solid rgba(212,175,106,0.3)' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Abrir en Google Maps
                </a>
              </div>
            </div>
            </DecoCard>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="deco-bg deco-abanicos py-14 px-4 sm:px-6" style={{ '--glow-x': '50%', '--glow-y': '20%' } as React.CSSProperties}>
          <div className="max-w-2xl mx-auto">
            <SectionHeader tag="¿Nos acompañas?" title="Confirma tu Asistencia" />
            <br />
            <p className="text-center font-outfit text-cream/80 text-base mb-10 -mt-8">
              Por favor confirma antes del {' '}
              <span className="text-gold-light">{RSVP_DEADLINE}</span>
            </p>
            <DecoCard>
              <RSVPSection />
            </DecoCard>
          </div>
        </section>

        {/* ── Wishes ── */}
        {/* <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader tag="Mensajes del corazón" title="Deja tu Deseo" />
            <p className="font-outfit text-cream/50 text-base leading-relaxed mb-10">
              Comparte un mensaje especial para {UNCLE_NAME}. Todos los deseos serán presentados durante la celebración.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DESEOS.map((w, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-left"
                  style={{
                    border: '1px solid rgba(212,175,106,0.15)',
                    background: 'linear-gradient(135deg, rgba(212,175,106,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  }}
                >
                  <p className="font-playfair italic text-cream/65 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    "{w.text}"
                  </p>
                  <p className="font-outfit text-gold/55 text-xs uppercase tracking-widest">— {w.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ── Footer ── */}
        <footer className="py-16 px-6 border-t text-center" style={{ borderColor: 'rgba(212,175,106,0.1)' }}>
          <div
            className="text-gold-gradient glow-gold leading-[1.2] mb-3"
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3.5rem' }}
          >
            {UNCLE_NAME}
          </div>
          <p className="font-outfit text-cream/70 text-base tracking-widest uppercase">{EDAD} Años · {MES_ANIO_PIE}</p>
          <StarDivider />
          <p className="font-outfit text-cream/60 text-base mt-6">Te esperamos con cariño · {FIRMA}</p>
        </footer>

      </div>
    </>
  )
}
