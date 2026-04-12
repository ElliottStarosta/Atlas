import React, { useState, useEffect, useRef } from 'react'

const links = [
  { label: 'About', href: '#about', icon: 'fa-water' },
  { label: 'Why Join', href: '#why-join', icon: 'fa-fish' },
  { label: 'Schedule', href: '#schedule', icon: 'fa-calendar-day' },
  { label: 'FAQ', href: '#faq', icon: 'fa-circle-info' },
  { label: 'Contact', href: '#contact', icon: 'fa-envelope' },
]

const NAV_BUBBLES = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  size: 2 + (i % 4),
  left: `${8 + i * 10}%`,
  dur: `${2.8 + (i % 5) * 0.55}s`,
  delay: `${(i * 0.6) % 3}s`,
}))

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [revealed, setRevealed] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const secs = ['about', 'why-join', 'schedule', 'faq', 'contact']
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i])
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(`#${secs[i]}`); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80)
    return () => clearTimeout(t)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <style>{`
        @keyframes navDrop {
          0%   { transform: translateY(-110%); opacity: 0; }
          60%  { transform: translateY(6px);   opacity: 1; }
          80%  { transform: translateY(-3px); }
          100% { transform: translateY(0);     opacity: 1; }
        }
        .nav-revealed {
          animation: navDrop 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .nav-scrolled .nav-wave-border { opacity: 1; }

        @keyframes navBubbleRise {
          0%   { transform: translateY(0) scale(1);   opacity: 0;   }
          15%  {                                       opacity: 0.55;}
          85%  {                                       opacity: 0.35;}
          100% { transform: translateY(-52px) scale(1.15); opacity: 0; }
        }
        .nav-bubble {
          position: absolute;
          bottom: 4px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55), transparent 65%);
          border: 1px solid rgba(125,211,252,0.3);
          animation: navBubbleRise var(--nb-dur, 3s) ease-in var(--nb-delay, 0s) infinite;
          pointer-events: none;
        }

        .nav-link-item {
          position: relative;
          color: rgba(186,230,252,0.88);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          font-family: 'Rubik', sans-serif;
          transition: color 0.2s;
          padding: 0.25rem 0;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #38bdf8, #a7f3d0);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link-item:hover,
        .nav-link-item.is-active { color: #e0f7ff; }
        .nav-link-item:hover::after,
        .nav-link-item.is-active::after { width: 100%; }

        .btn-register {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.35rem;
          border-radius: 50px;
          font-family: 'Rubik', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: #e0f7ff;
          background: linear-gradient(130deg, rgba(3,105,161,0.7) 0%, rgba(2,55,100,0.8) 100%);
          border: 1px solid rgba(56,189,248,0.5);
          box-shadow: 0 0 18px rgba(14,165,233,0.18), inset 0 1px 0 rgba(255,255,255,0.12);
          overflow: hidden;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-register::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(130deg, rgba(56,189,248,0.18), rgba(167,243,208,0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-register:hover {
          border-color: rgba(56,189,248,0.8);
          box-shadow: 0 0 30px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.16);
          transform: translateY(-1px);
        }
        .btn-register:hover::before { opacity: 1; }
        .btn-register span { position: relative; z-index: 1; display: flex; align-items: center; gap: 0.45rem; }

        @keyframes rippleOut {
          0%   { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; }
        }
        .btn-register-ripple {
          position: absolute;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(56,189,248,0.4);
          top: 50%; left: 50%;
          transform: translate(-50%,-50%) scale(0);
          animation: rippleOut 0.55s ease-out forwards;
          pointer-events: none;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          color: rgba(186,230,252,0.85);
          font-family: 'Rubik', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s, padding-left 0.2s;
          text-decoration: none;
        }
        .mobile-link:hover { color: #e0f7ff; padding-left: 6px; }
        .mobile-link:last-of-type { border-bottom: none; }
        .mobile-link-icon {
          width: 28px; height: 28px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(3,105,161,0.35);
          border: 1px solid rgba(56,189,248,0.2);
          flex-shrink: 0;
          font-size: 0.7rem;
          color: rgba(56,189,248,0.85);
        }

        .ham-line {
          display: block;
          width: 22px; height: 2px;
          background: rgba(125,211,252,0.9);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s, width 0.3s;
          transform-origin: center;
        }
        .ham-open .ham-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; width: 0; }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
      `}</style>

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'nav-scrolled py-2' : 'py-4'}
          ${revealed ? 'nav-revealed' : 'opacity-0'}`}
        style={{
          background: scrolled
            ? 'linear-gradient(180deg, rgba(4,18,34,0.88) 0%, rgba(5,26,46,0.82) 100%)'
            : 'linear-gradient(180deg, rgba(4,18,34,0.55) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'blur(4px)',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'blur(4px)',
          willChange: 'transform',
        }}
      >
        <div className="nav-wave-border" />

        {scrolled && NAV_BUBBLES.map(b => (
          <div
            key={b.id}
            className="nav-bubble"
            style={{
              width: b.size, height: b.size,
              left: b.left,
              '--nb-dur': b.dur,
              '--nb-delay': b.delay,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-2 shrink-0"
            onClick={close}
            style={{ filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.3))' }}
          >
            <img src="/images/atlas-white.png" alt="ATLAS" className="h-9 w-auto" />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav-link-item ${active === l.href ? 'is-active' : ''}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Register CTA — desktop only, wrapped so hidden/flex works correctly */}
          <div className="hidden md:flex">
            <RegisterButton />
          </div>

          {/* Hamburger */}
          <button
            className={`flex md:hidden flex-col gap-[5px] p-2 ${open ? 'ham-open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden transition-all duration-350 ease-in-out overflow-hidden ${open ? 'max-h-[420px]' : 'max-h-0'}`}
        >
          <div className="px-6 py-3 pb-5">
            <nav>
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={close} className="mobile-link">
                  <span className="mobile-link-icon">
                    <i className={`fa-solid ${l.icon}`} aria-hidden />
                  </span>
                  {l.label}
                </a>
              ))}
            </nav>

            {open && (
              <div className="pt-4 flex justify-center">
                <RegisterButton onClick={close} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

function RegisterButton({ onClick }) {
  const [ripple, setRipple] = useState(false)

  const handleClick = () => {
    setRipple(false)
    requestAnimationFrame(() => setRipple(true))
    onClick?.()
  }

  return (
    <a
      href="https://forms.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-register"
      onClick={handleClick}
    >
      {ripple && (
        <span
          className="btn-register-ripple"
          onAnimationEnd={() => setRipple(false)}
        />
      )}
      <span>
        <i className="fa-solid fa-anchor" aria-hidden />
        Register
      </span>
    </a>
  )
}