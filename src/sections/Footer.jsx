import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Why Join", href: "#why-join" },
  { label: "Schedule", href: "#schedule" },
  { label: "FAQ", href: "#faq" },
];

// Fixed bubble positions;no Math.random so paint is stable
const BUBBLES = [
  { size: 6, left: "8%", delay: "0s", dur: "7s" },
  { size: 4, left: "22%", delay: "1.4s", dur: "9s" },
  { size: 8, left: "38%", delay: "0.6s", dur: "6s" },
  { size: 5, left: "55%", delay: "2.2s", dur: "8s" },
  { size: 7, left: "70%", delay: "0.3s", dur: "7.5s" },
  { size: 4, left: "84%", delay: "1.8s", dur: "10s" },
  { size: 3, left: "15%", delay: "3.1s", dur: "8.5s" },
  { size: 5, left: "48%", delay: "4s", dur: "6.5s" },
  { size: 6, left: "91%", delay: "1.1s", dur: "9.5s" },
];

const SOCIAL = [
  { icon: "fa-instagram", href: "#", label: "Instagram" },
  // { icon: 'fa-discord',   href: '#', label: 'Discord'   },
  {
    icon: "fa-github",
    href: "https://github.com/ElliottStarosta/Atlas",
    label: "GitHub",
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const colsRef = useRef([]);
  const ctaRef = useRef(null);
  const seafloorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const footer = footerRef.current;
    if (!footer) return;

    // Pre-hide
    gsap.set([logoRef.current, ctaRef.current], { opacity: 0, y: 32 });
    gsap.set(colsRef.current.filter(Boolean), { opacity: 0, y: 24 });
    gsap.set(seafloorRef.current, {
      scaleX: 0,
      transformOrigin: "center bottom",
    });

    const ctx = gsap.context(() => {
      const st = { trigger: footer, start: "top 88%", once: true };

      // Seafloor expands first
      gsap.to(seafloorRef.current, {
        scrollTrigger: st,
        scaleX: 1,
        duration: 1.1,
        ease: "power3.out",
      });

      // Logo
      gsap.to(logoRef.current, {
        scrollTrigger: st,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });

      // Columns stagger
      gsap.to(colsRef.current.filter(Boolean), {
        scrollTrigger: st,
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.25,
      });

      // CTA
      gsap.to(ctaRef.current, {
        scrollTrigger: st,
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
        delay: 0.5,
      });

      // Bioluminescent pulse on the deep-sea floor strip
      gsap.to(".footer-bio-glow", {
        scrollTrigger: { trigger: footer, start: "top 80%", once: true },
        opacity: 0.65,
        duration: 2,
        ease: "power2.inOut",
        stagger: { each: 0.4, from: "center" },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        /* Bubble rise */
        @keyframes ftBubbleRise {
          0%   { transform: translate3d(0, 0, 0);           opacity: 0;  }
          10%  {                                              opacity: 0.6;}
          90%  {                                              opacity: 0.3;}
          100% { transform: translate3d(var(--bx,4px),-80px,0);opacity: 0;}
        }
        .ft-bubble {
          animation: ftBubbleRise var(--dur,8s) ease-in var(--del,0s) infinite;
          will-change: transform, opacity;
        }

        /* Bioluminescent blobs */
        @keyframes bioBlob {
          0%,100% { opacity: 0.08;transform: scale(1);   }
          50%     { opacity: 0.22;transform: scale(1.08);}
        }
        .footer-bio-glow {
          animation: bioBlob var(--bio-dur, 4s) ease-in-out var(--bio-del, 0s) infinite;
          opacity: 0;
        }

        /* Seafloor plants sway */
        @keyframes ftSway {
          0%,100% { transform: rotate(-6deg) skewX(-1deg);}
          50%     { transform: rotate(6deg)  skewX(1deg); }
        }
        @keyframes ftSwayR {
          0%,100% { transform: rotate(6deg)  skewX(1deg); }
          50%     { transform: rotate(-6deg) skewX(-1deg);}
        }
        .ft-sway  { transform-origin: bottom center;animation: ftSway  5s ease-in-out infinite;}
        .ft-sway2 { transform-origin: bottom center;animation: ftSwayR 6.5s ease-in-out infinite;}

        /* Fish drift */
        @keyframes ftFishDrift {
          0%   { transform: translateX(-180px);opacity: 0;  }
          5%   {                                opacity: 0.55;}
          95%  {                                opacity: 0.5; }
          100% { transform: translateX(calc(100vw + 200px));opacity: 0;}
        }
        .ft-fish { animation: ftFishDrift 28s linear 2s infinite;will-change: transform;}

        /* Depth gradient overlay */
        .ft-depth {
          background: linear-gradient(180deg,
            rgba(3,12,26,0)   0%,
            rgba(3,12,26,0.5) 40%,
            rgba(2,8,18,0.85) 100%
          );
        }

        /* Social link hover */
        .ft-social-btn {
          display: flex;align-items: center;justify-content: center;
          width: 38px;height: 38px;border-radius: 50%;
          border: 1px solid rgba(56,189,248,0.28);
          background: rgba(3,80,140,0.2);
          color: rgba(125,211,252,0.7);
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
          text-decoration: none;
          font-size: 0.85rem;
        }
        .ft-social-btn:hover {
          background: rgba(3,105,161,0.45);
          border-color: rgba(56,189,248,0.7);
          color: #e0f7ff;
          transform: translateY(-3px);
          box-shadow: 0 0 18px rgba(56,189,248,0.35);
        }

        /* Nav link */
        .ft-nav-link {
          color: rgba(125,211,252,0.55);
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 2px;
        }
        .ft-nav-link::after {
          content: '';
          position: absolute;left: 0;bottom: 0;
          width: 0;height: 1px;
          background: linear-gradient(90deg, #38bdf8, #a7f3d0);
          transition: width 0.3s;
        }
        .ft-nav-link:hover { color: #e0f7ff;}
        .ft-nav-link:hover::after { width: 100%;}

        @media (prefers-reduced-motion: reduce) {
          .ft-bubble, .ft-sway, .ft-sway2, .ft-fish, .footer-bio-glow { animation: none !important;}
        }
          .btn-ocean-glass {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.5rem;
  border-radius: 50px;
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #e8f8ff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  background: transparent;
  border: none;
  text-decoration: none;
  isolation: isolate;
  transition: transform 0.4s cubic-bezier(0.34,1.5,0.32,1), filter 0.3s;
  cursor: pointer;
}
.btn-ocean-glass::before {
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
    .btn-ocean-glass::after {
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
    .btn-ocean-glass:hover {
      transform: translateY(-4px) scale(1.04);
      filter: drop-shadow(0 10px 24px rgba(56,189,248,0.35));
    }
    .btn-ocean-glass:hover::before {
      border-color: rgba(255,255,255,0.45);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.32),
        0 8px 28px rgba(0,0,0,0.2),
        0 0 44px rgba(56,189,248,0.3);
    }
      `}</style>

      <footer
        ref={footerRef}
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #040f1a 0%, #030c18 60%, #020810 100%)",
        }}
      >
        {/* Bioluminescent floor blobs */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ zIndex: 1 }}
        >
          {[
            {
              w: 180,
              l: "8%",
              col: "rgba(56,189,248,0.18)",
              dur: "5s",
              del: "0s",
            },
            {
              w: 120,
              l: "28%",
              col: "rgba(167,243,208,0.15)",
              dur: "6.5s",
              del: "1.2s",
            },
            {
              w: 200,
              l: "52%",
              col: "rgba(56,189,248,0.12)",
              dur: "4.8s",
              del: "2.8s",
            },
            {
              w: 150,
              l: "72%",
              col: "rgba(125,211,252,0.14)",
              dur: "7s",
              del: "0.6s",
            },
            {
              w: 100,
              l: "88%",
              col: "rgba(167,243,208,0.13)",
              dur: "5.5s",
              del: "1.9s",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="footer-bio-glow absolute rounded-full"
              style={{
                width: b.w,
                height: b.w * 0.45,
                left: b.l,
                bottom: -b.w * 0.22,
                background: `radial-gradient(ellipse at 50% 100%, ${b.col}, transparent 70%)`,
                filter: "blur(18px)",
                "--bio-dur": b.dur,
                "--bio-del": b.del,
              }}
            />
          ))}
        </div>

        {/* Seafloor strip */}
        <div
          ref={seafloorRef}
          className="pointer-events-none absolute bottom-0 left-0 w-full h-2"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.35) 30%, rgba(125,211,252,0.5) 50%, rgba(56,189,248,0.35) 70%, transparent)",
            boxShadow: "0 0 22px rgba(56,189,248,0.3)",
          }}
        />

        {/* Rising bubbles */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ zIndex: 3, height: "100%" }}
        >
          {BUBBLES.map((b, i) => (
            <div
              key={i}
              className="ft-bubble absolute rounded-full"
              style={{
                width: b.size,
                height: b.size,
                left: b.left,
                bottom: 4,
                "--dur": b.dur,
                "--del": b.delay,
                "--bx": i % 2 === 0 ? "5px" : "-4px",
                background:
                  "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.55), transparent 62%)",
                border: "1px solid rgba(125,211,252,0.3)",
              }}
            />
          ))}
        </div>

        {/* Seafloor plants */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full"
          style={{ zIndex: 4 }}
        >
          <img
            src="/images/seaweed-left.png"
            alt=""
            className="ft-sway  absolute bottom-0 left-0"
            style={{
              height: "clamp(60px,10vh,120px)",
              width: "auto",
              opacity: 0.55,
            }}
          />
          <img
            src="/images/seaweed-right.png"
            alt=""
            className="ft-sway2 absolute bottom-0 right-0"
            style={{
              height: "clamp(55px,9vh,110px)",
              width: "auto",
              opacity: 0.5,
            }}
          />
          <img
            src="/images/coral-left.png"
            alt=""
            className="absolute bottom-0 left-6 hidden sm:block"
            style={{
              height: "clamp(40px,7vh,80px)",
              width: "auto",
              opacity: 0.45,
            }}
          />
          <img
            src="/images/coral-right.png"
            alt=""
            className="absolute bottom-0 right-6 hidden sm:block"
            style={{
              height: "clamp(40px,7vh,80px)",
              width: "auto",
              opacity: 0.45,
            }}
          />
        </div>

        {/* Small fish */}
        <div
          className="pointer-events-none absolute"
          style={{ zIndex: 3, bottom: "28%", left: 0, width: "100%" }}
        >
          <img
            src="/images/fish-school.png"
            alt=""
            className="ft-fish"
            style={{
              width: 180,
              maxWidth: "38vw",
              height: "auto",
              opacity: 0.45,
              filter: "drop-shadow(0 0 6px rgba(56,189,248,0.2))",
            }}
          />
        </div>

        {/* Light rays */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 2 }}
        >
          {[
            { left: "15%", rot: 3, del: "0s", dur: "5s" },
            { left: "42%", rot: -4, del: "1.8s", dur: "6.5s" },
            { left: "68%", rot: 2, del: "0.7s", dur: "4.5s" },
            { left: "88%", rot: -3, del: "2.5s", dur: "7s" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: r.left,
                top: 0,
                width: "1.5px",
                height: "60%",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
                transform: `rotate(${r.rot}deg)`,
                transformOrigin: "top center",
                animation: `rayShimmer ${r.dur} ease-in-out ${r.del} infinite`,
              }}
            />
          ))}
        </div>

        {/* Depth vignette */}
        <div
          className="ft-depth pointer-events-none absolute inset-0"
          style={{ zIndex: 2 }}
        />

        {/*  CONTENT  */}
        <div
          className="relative mx-auto max-w-6xl px-4 sm:px-8"
          style={{
            zIndex: 10,
            paddingTop: "3rem",
            paddingBottom: "clamp(4rem,10vh,6rem)",
          }}
        >
          {/* Top: Logo + tagline + social */}
          <div
            ref={logoRef}
            className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12"
          >
            <div className="flex flex-col items-center sm:items-start gap-3">
              <img
                src="/images/atlas-white.png"
                alt="ATLAS"
                style={{
                  height: 42,
                  width: "auto",
                  filter: "drop-shadow(0 0 18px rgba(56,189,248,0.45))",
                }}
              />
              {/* <p className="font-body text-xs text-center sm:text-left"
                 style={{ color: 'rgba(125,211,252,0.45)', maxWidth: '26ch', lineHeight: 1.6 }}>
                EOM Hackathon Club &nbsp;·&nbsp;Earl of March S.S., Kanata, ON
              </p> */}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="ft-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fa-brands ${s.icon}`} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Divider wave */}
          <div
            className="w-full mb-12"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg,transparent,rgba(56,189,248,0.25) 30%,rgba(56,189,248,0.25) 70%,transparent)",
            }}
          />

          {/* Middle: 3-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-14">
            {/* Col 1;Quick links */}
            <div ref={(el) => (colsRef.current[0] = el)}>
              <p
                className="font-body text-xs font-semibold uppercase tracking-[0.22em] mb-5"
                style={{ color: "rgba(56,189,248,0.6)" }}
              >
                <i className="fa-solid fa-water mr-2" aria-hidden />
                Navigate
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="ft-nav-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2;Event info */}
            <div ref={(el) => (colsRef.current[1] = el)}>
              <p
                className="font-body text-xs font-semibold uppercase tracking-[0.22em] mb-5"
                style={{ color: "rgba(56,189,248,0.6)" }}
              >
                <i className="fa-solid fa-calendar-day mr-2" aria-hidden />
                The Event
              </p>
              <ul className="space-y-2.5">
                {[
                  { icon: "fa-clock", text: "May 2, 2026 · 8 AM – 8 PM" },
                  {
                    icon: "fa-location-dot",
                    text: "Earl of March S.S., Kanata, ON",
                  },
                  { icon: "fa-users", text: "Up to 3 per team" },
                  {
                    icon: "fa-circle-check",
                    text: "Free entry · meals · prizes",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <i
                      className={`fa-solid ${item.icon} mt-0.5 text-xs shrink-0`}
                      style={{ color: "rgba(56,189,248,0.55)" }}
                      aria-hidden
                    />
                    <span
                      className="font-body text-xs leading-relaxed"
                      style={{ color: "rgba(125,211,252,0.5)" }}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3;Tagline / deep-sea quote */}
            <div
              ref={(el) => (colsRef.current[2] = el)}
              className="flex flex-col justify-between"
            >
              <div>
                <p
                  className="font-body text-xs font-semibold uppercase tracking-[0.22em] mb-5"
                  style={{ color: "rgba(56,189,248,0.6)" }}
                >
                  <i className="fa-solid fa-anchor mr-2" aria-hidden />
                  Dive In
                </p>
                <blockquote
                  className="font-nature leading-snug mb-4"
                  style={{
                    fontSize: "clamp(1.1rem,2.2vw,1.4rem)",
                    color: "#e8fbff",
                    textShadow: "0 0 24px rgba(14,165,233,0.3)",
                  }}
                >
                  "The ocean is where big ideas learn to breathe."
                </blockquote>
                <p
                  className="font-body text-xs"
                  style={{ color: "rgb(62, 194, 255)" }}
                >
                  - ATLAS Hackathon, 2026
                </p>
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl px-6 sm:px-8 py-6"
            style={{
              background:
                "linear-gradient(130deg, rgba(3,65,115,0.45) 0%, rgba(3,18,38,0.75) 100%)",
              border: "1px solid rgba(56,189,248,0.3)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 50px rgba(14,165,233,0.08)",
            }}
          >
            <div>
              <p
                className="font-nature mb-1"
                style={{
                  fontSize: "clamp(1.2rem,2.5vw,1.6rem)",
                  color: "#e8fbff",
                  textShadow: "0 0 30px rgba(14,165,233,0.35)",
                }}
              >
                Ready to build something epic?
              </p>
              <p
                className="font-body text-xs"
                style={{ color: "rgba(125,211,252,0.5)" }}
              >
                Spots are limited;the deep sea doesn't wait.
              </p>
            </div>
            <a        href="https://docs.google.com/forms/d/e/1FAIpQLSd4f3gWsZd8umu6Twox6C-dSfYnQV9MGrcfHdy2Rv61DNO1Sg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ocean-glass shrink-0 text-sm whitespace-nowrap"
            >
              <span>
                <i className="fa-solid fa-anchor mr-2" aria-hidden />
                Register, it's free!
              </span>
            </a>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              borderTop: "1px solid rgba(56,189,248,0.08)",
              paddingTop: "1.5rem",
            }}
          >
            <p
              className="font-body text-xs"
              style={{ color: "rgba(53, 191, 245, 0.75)" }}
            >
              &copy;{year} ATLAS Hackathon · Earl of March Secondary School,
              Kanata, ON
            </p>
            <p
              className="font-body text-xs flex items-center gap-1.5"
              style={{ color: "rgba(53, 191, 245, 0.75)" }}
            >
              <i
                className="fa-solid fa-fish"
                style={{ color: "rgba(25, 251, 255, 0.75)" }}
                aria-hidden
              />
              Made with code &amp; caffeine
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
