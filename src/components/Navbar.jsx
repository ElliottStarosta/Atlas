import React, { useState, useEffect, useRef } from "react";

const links = [
  { label: "About", href: "#about", icon: "fa-water" },
  { label: "Why Join", href: "#why-join", icon: "fa-fish" },
  { label: "Schedule", href: "#schedule", icon: "fa-calendar-day" },
  { label: "FAQ", href: "#faq", icon: "fa-circle-info" },
  { label: "Contact", href: "#contact", icon: "fa-envelope" },
];

const NAV_BUBBLES = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  size: 2 + (i % 4),
  left: `${8 + i * 10}%`,
  dur: `${2.8 + (i % 5) * 0.55}s`,
  delay: `${(i * 0.6) % 3}s`,
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [revealed, setRevealed] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const secs = ["about", "why-join", "schedule", "faq", "contact"];
      let found = false;
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(`#${secs[i]}`);
          found = true;
          break;
        }
      }
      if (!found) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <style>{`
        /* Entry animation */
        @keyframes navDrop {
          0%   { transform: translateY(-110%);opacity: 0;}
          60%  { transform: translateY(6px);  opacity: 1;}
          80%  { transform: translateY(-3px);}
          100% { transform: translateY(0);    opacity: 1;}
        }
        .nav-revealed { animation: navDrop 0.75s cubic-bezier(0.22,1,0.36,1) forwards;}

        /* Scrolled bottom glow edge */
        .nav-scrolled::after {
          content: '';
          position: absolute;
          left: 0;right: 0;bottom: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(56,189,248,0.0) 5%,
            rgba(125,211,252,0.5) 30%,
            rgba(56,189,248,0.7) 50%,
            rgba(125,211,252,0.5) 70%,
            rgba(56,189,248,0.0) 95%,
            transparent 100%
          );
          box-shadow: 0 0 12px rgba(56,189,248,0.3);
        }

        /* Rising nav bubbles */
        @keyframes navBubbleRise {
          0%   { transform: translateY(0) scale(1);       opacity: 0;   }
          15%  {                                            opacity: 0.55;}
          85%  {                                            opacity: 0.35;}
          100% { transform: translateY(-52px) scale(1.15);opacity: 0;   }
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

        /* 
           NAV LINK ; underwater bioluminescent style
         */
        .nav-link-item {
          position: relative;
          color: rgba(186,230,252,0.7);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          font-family: 'Rubik', sans-serif;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.35rem 0.1rem 0.55rem;
          transition: color 0.3s ease;
          /* isolate so pseudo-elements don't bleed */
          isolation: isolate;
        }

        /* Ripple wave underline (SVG path drawn via stroke-dashoffset) */
        .nav-link-item::before {
          content: '';
          position: absolute;
          left: -4px;right: -4px;
          bottom: 0;
          height: 6px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 6' preserveAspectRatio='none'%3E%3Cpath d='M0,3 Q7.5,0 15,3 T30,3 T45,3 T60,3' stroke='%2338bdf8' stroke-width='1.5' fill='none' stroke-opacity='0.9'/%3E%3C/svg%3E")
            center / 60px 6px repeat-x;
          opacity: 0;
          transform: scaleX(0.6) translateY(2px);
          transform-origin: center bottom;
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
          filter: drop-shadow(0 0 4px rgba(56,189,248,0.8));
        }

        /* Bioluminescent glow capsule behind active link */
        .nav-link-item::after {
          display: none;
        }

        /* Hover state */
        .nav-link-item:hover {
          color: #bae6fd;
        }
        .nav-link-item:hover::before {
          opacity: 0.55;
          transform: scaleX(0.85) translateY(0);
        }
        
        /* Active state;full intensity */
        .nav-link-item.is-active {
          color: #e0f7ff;
          text-shadow: 0 0 18px rgba(56,189,248,0.55);
        }
        .nav-link-item.is-active::before {
          opacity: 1;
          transform: scaleX(1) translateY(0);
          /* animate the wave pattern scrolling sideways */
          animation: waveScroll 1.8s linear infinite;
          filter: drop-shadow(0 0 6px rgba(56,189,248,1)) drop-shadow(0 0 12px rgba(125,211,252,0.6));
        }
       

        /* Scrolling wave pattern on active underline */
        @keyframes waveScroll {
          from { background-position: 0 center;}
          to   { background-position: 60px center;}
        }

        

        /* Small bubble dots on active link */
        .nav-link-item.is-active .nav-link-dot {
          opacity: 1;
          animation: dotRise var(--dd, 1.6s) ease-in var(--ddy, 0s) infinite;
        }
        .nav-link-dot {
          position: absolute;
          bottom: 6px;
          width: var(--ds, 3px);
          height: var(--ds, 3px);
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(56,189,248,0.6));
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        @keyframes dotRise {
          0%   { transform: translateY(0) scale(1);  opacity: 0;  }
          20%  {                                       opacity: 0.9;}
          80%  {                                       opacity: 0.5;}
          100% { transform: translateY(-18px) scale(0.6);opacity: 0;}
        }

        /* 
           REGISTER BUTTON ; deep-sea glass bubble
         */
        .btn-register {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          font-family: 'Rubik', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e8f8ff;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
          background: transparent;
          border: none;
          text-decoration: none;
          isolation: isolate;
          transition: transform 0.4s cubic-bezier(0.34,1.5,0.32,1), filter 0.3s;
        }
        /* Glass shell */
        .btn-register::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 50px;
          background:
            radial-gradient(circle at 26% 28%, rgba(255,255,255,0.32) 0%, transparent 40%),
            radial-gradient(circle at 88% 80%, rgba(56,189,248,0.18) 0%, transparent 42%),
            rgba(3,90,150,0.12);
          border: 1.5px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(16px) saturate(1.3);
          -webkit-backdrop-filter: blur(16px) saturate(1.3);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.22),
            0 4px 20px rgba(0,0,0,0.18),
            0 0 30px rgba(56,189,248,0.14);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.4s cubic-bezier(0.34,1.5,0.32,1);
          z-index: -1;
        }
        /* Specular dot */
        .btn-register::after {
          content: '';
          position: absolute;
          top: 15%;left: 12%;
          width: min(34%, 1.4rem);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.65), transparent 58%);
          pointer-events: none;
          mix-blend-mode: overlay;
          animation: btnSpecPulse 4s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes btnSpecPulse {
          0%,100% { opacity: 0.6;transform: scale(1);}
          50%     { opacity: 0.9;transform: scale(1.08) translate(4%, -6%);}
        }
        .btn-register:hover {
          transform: translateY(-4px) scale(1.04);
          filter: drop-shadow(0 10px 24px rgba(56,189,248,0.35));
        }
        .btn-register:hover::before {
          border-color: rgba(255,255,255,0.45);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.32),
            0 8px 28px rgba(0,0,0,0.2),
            0 0 44px rgba(56,189,248,0.3);
          transform: scale(1.04);
        }
        .btn-register:active {
          transform: translateY(-1px) scale(1.01);
          transition-duration: 0.1s;
        }
        .btn-register-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.42rem;
        }

        /* Ripple */
        @keyframes rippleOut {
          0%   { transform: scale(0); opacity: 0.45;}
          100% { transform: scale(3); opacity: 0;}
        }
        .btn-register-ripple {
          position: absolute;
          width: 40px;height: 40px;
          border-radius: 50%;
          background: rgba(56,189,248,0.35);
          top: 50%;left: 50%;
          transform: translate(-50%,-50%) scale(0);
          animation: rippleOut 0.55s ease-out forwards;
          pointer-events: none;
          z-index: 3;
        }

        /* 
           MOBILE DRAWER
         */
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 0;
          color: rgba(186,230,252,0.8);
          font-family: 'Rubik', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s, padding-left 0.25s;
          text-decoration: none;
          border-bottom: 1px solid rgba(56,189,248,0.08);
          position: relative;
        }
        .mobile-link:last-of-type { border-bottom: none;}
        .mobile-link:hover  { color: #e0f7ff;padding-left: 8px;}
        .mobile-link.is-active-mobile {
          color: #e0f7ff;
        }
        .mobile-link.is-active-mobile .mobile-link-icon {
          background: rgba(3,105,161,0.55);
          border-color: rgba(56,189,248,0.5);
          box-shadow: 0 0 14px rgba(56,189,248,0.35);
        }
        .mobile-link-icon {
          width: 30px;height: 30px;
          border-radius: 9px;
          display: flex;align-items: center;justify-content: center;
          background: rgba(3,80,130,0.3);
          border: 1px solid rgba(56,189,248,0.18);
          flex-shrink: 0;
          font-size: 0.72rem;
          color: rgba(56,189,248,0.8);
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
        }

        /* Active indicator dot on mobile */
        .mobile-active-pip {
          position: absolute;
          right: 0;
          width: 6px;height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #38bdf8);
          box-shadow: 0 0 8px rgba(56,189,248,0.8);
          animation: pipPulse 2s ease-in-out infinite;
        }
        @keyframes pipPulse {
          0%,100% { box-shadow: 0 0 6px rgba(56,189,248,0.7);transform: scale(1);}
          50%     { box-shadow: 0 0 14px rgba(56,189,248,1); transform: scale(1.2);}
        }

        /* Hamburger */
        .ham-line {
          display: block;
          width: 22px;height: 2px;
          background: rgba(125,211,252,0.9);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s, width 0.3s;
          transform-origin: center;
        }
        .ham-open .ham-line:nth-child(1) { transform: translateY(6px)  rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0;width: 0;}
        .ham-open .ham-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg);}

        /* Drawer backdrop */
        .nav-drawer {
          background: linear-gradient(180deg,
            rgba(4,14,28,0.96) 0%,
            rgba(5,20,38,0.98) 100%
          );
          border-top: 1px solid rgba(56,189,248,0.12);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link-item.is-active::before,
          .nav-link-item.is-active::after,
          .nav-link-dot,
          .btn-register::after,
          .mobile-active-pip { animation: none !important;}
          .nav-link-item:hover,
          .btn-register:hover { transform: none !important;}
        }
      `}</style>

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? "nav-scrolled py-2" : "py-4"}
          ${revealed ? "nav-revealed" : "opacity-0"}`}
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(4,14,28,0.92) 0%, rgba(5,22,42,0.88) 100%)"
            : "linear-gradient(180deg, rgba(4,14,28,0.6) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "blur(6px)",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(1.5)"
            : "blur(6px)",
          willChange: "transform",
        }}
      >
        {/* Rising bubbles when scrolled */}
        {scrolled &&
          NAV_BUBBLES.map((b) => (
            <div
              key={b.id}
              className="nav-bubble"
              style={{
                width: b.size,
                height: b.size,
                left: b.left,
                "--nb-dur": b.dur,
                "--nb-delay": b.delay,
              }}
            />
          ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-2 shrink-0"
            onClick={close}
            style={{ filter: "drop-shadow(0 0 14px rgba(56,189,248,0.35))" }}
          >
            <img
              src="/images/atlas-white.png"
              alt="ATLAS"
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href} style={{ position: "relative" }}>
                  <a
                    href={l.href}
                    className={`nav-link-item ${isActive ? "is-active" : ""}`}
                  >
                    {l.label}

                    {/* Three tiny rising bubbles on the active link */}
                    {isActive && (
                      <>
                        <span
                          className="nav-link-dot"
                          style={{
                            "--ds": "2.5px",
                            "--dd": "1.4s",
                            "--ddy": "0s",
                            left: "15%",
                          }}
                        />
                        <span
                          className="nav-link-dot"
                          style={{
                            "--ds": "3px",
                            "--dd": "1.9s",
                            "--ddy": "0.5s",
                            left: "48%",
                          }}
                        />
                        <span
                          className="nav-link-dot"
                          style={{
                            "--ds": "2px",
                            "--dd": "1.6s",
                            "--ddy": "0.9s",
                            left: "75%",
                          }}
                        />
                      </>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Register CTA */}
          <div className="hidden md:flex">
            <RegisterButton />
          </div>

          {/* Hamburger */}
          <button
            className={`flex md:hidden flex-col gap-[5px] p-2 ${open ? "ham-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
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
          className={`md:hidden nav-drawer transition-all duration-300 ease-in-out overflow-hidden
            ${open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-6 py-2 pb-5">
            <nav>
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={close}
                    className={`mobile-link ${isActive ? "is-active-mobile" : ""}`}
                  >
                    <span className="mobile-link-icon">
                      <i className={`fa-solid ${l.icon}`} aria-hidden />
                    </span>
                    {l.label}
                    {isActive && <span className="mobile-active-pip" />}
                  </a>
                );
              })}
            </nav>

            {open && (
              <div className="pt-5 flex justify-center">
                <RegisterButton onClick={close} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

function RegisterButton({ onClick }) {
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(false);
    requestAnimationFrame(() => setRipple(true));
    onClick?.();
  };

  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSd4f3gWsZd8umu6Twox6C-dSfYnQV9MGrcfHdy2Rv61DNO1Sg/viewform?usp=header"
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
      <span className="btn-register-content">
        <i className="fa-solid fa-anchor" aria-hidden />
        Register
      </span>
    </a>
  );
}
