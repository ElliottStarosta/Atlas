import React, { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12',    label: 'Hours',       icon: 'fa-clock'        },
  { value: '50+',   label: 'Hackers',     icon: 'fa-users'        },
  { value: '≤ 3',   label: 'Per team',    icon: 'fa-user-group'   },
  { value: '∞',     label: 'Ideas',       icon: 'fa-lightbulb'    },
  { value: 'May 2', label: '8 AM – 8 PM', icon: 'fa-calendar-day' },
]

const checklist = [
  { icon: 'fa-laptop',     title: 'Laptop + charger', body: 'A power strip makes you a legend at the table.' },
  { icon: 'fa-utensils',   title: 'Skip the snacks',  body: 'We feed the fleet — flag allergies on the signup form.' },
  { icon: 'fa-microphone', title: 'A clear story',    body: 'Judges reward a crisp demo in minutes, not a tour of every file.' },
  { icon: 'fa-users',      title: 'Your crew',        body: 'Up to 3 per team — all skill levels welcome.' },
]

const lightRays = [
  { left: '8%',  h: '65%', rot:  4, delay: '0s',   dur: '4.2s' },
  { left: '22%', h: '80%', rot: -3, delay: '1.6s', dur: '5.1s' },
  { left: '38%', h: '72%', rot:  2, delay: '0.9s', dur: '3.8s' },
  { left: '55%', h: '60%', rot: -4, delay: '2.3s', dur: '4.7s' },
  { left: '70%', h: '78%', rot:  3, delay: '0.3s', dur: '5.5s' },
  { left: '85%', h: '55%', rot: -2, delay: '1.8s', dur: '4.0s' },
]

// id, vertical %, pixel width, duration (s), delay (s), right-to-left?
const FISH = [
  { id: 'a', top: '18%', w: 220, dur: 26, delay: -6,  rtl: false },
  { id: 'b', top: '8%',  w: 140, dur: 34, delay: -20, rtl: true  },
  { id: 'c', top: '42%', w: 180, dur: 42, delay: -10, rtl: false },
  { id: 'd', top: '60%', w: 120, dur: 38, delay: -28, rtl: true  },
  { id: 'e', top: '75%', w: 150, dur: 48, delay: -36, rtl: true  },
]

export default function About() {
  const sectionRef = useRef(null)
  const [bubbleTier, setBubbleTier] = useState('desktop')

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setBubbleTier(mq.matches ? 'mobile' : 'desktop')
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    if (!section) return

    // Set hidden BEFORE first paint — prevents the visible-then-hidden flicker
    gsap.set([
      '.ab-eyebrow', '.ab-headline', '.ab-body',
      '.ab-stat-pill', '.ab-card-left', '.ab-card-checklist',
      '.ab-card-cta', '.ab-checklist-item',
    ], { opacity: 0, y: 24, force3D: true })

    const ctx = gsap.context(() => {
      const st = { trigger: section, start: 'top 80%', once: true }

      // Animate TO final state (not FROM) — no reflow, GPU only
      gsap.to(['.ab-eyebrow', '.ab-headline', '.ab-body'], {
        scrollTrigger: st,
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
        stagger: 0.07, force3D: true,
      })
      gsap.to('.ab-stat-pill', {
        scrollTrigger: st,
        opacity: 1, y: 0,
        duration: 0.5, stagger: 0.06, ease: 'power2.out',
        delay: 0.2, force3D: true,
      })
      gsap.to('.ab-card-left', {
        scrollTrigger: { trigger: '.ab-card-left',     start: 'top 88%', once: true },
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', force3D: true,
      })
      gsap.to('.ab-card-checklist', {
        scrollTrigger: { trigger: '.ab-card-checklist', start: 'top 88%', once: true },
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.08, force3D: true,
      })
      gsap.to('.ab-checklist-item', {
        scrollTrigger: { trigger: '.ab-card-checklist', start: 'top 85%', once: true },
        opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out', delay: 0.2, force3D: true,
      })
      gsap.to('.ab-card-cta', {
        scrollTrigger: { trigger: '.ab-card-cta', start: 'top 90%', once: true },
        opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.1, force3D: true,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const riseBubbles = useMemo(() => {
    const n = bubbleTier === 'mobile' ? 6 : 11
    return Array.from({ length: n }, (_, i) => ({
      id:    `r-${i}`,
      size:  3 + (i % 6) * 2,
      left:  2 + ((i * 37) % 94),
      dur:   11 + (i % 7) * 1.3,
      delay: (i * 0.85) % 13,
      bx:    `${((i * 4) % 9) - 4}px`,
    }))
  }, [bubbleTier])

  return (
    <>
      <style>{`
        /* ── Bubbles ── */
        @keyframes aboutRise {
          0%   { transform: translate3d(0,0,0);               opacity: 0;   }
          8%   {                                               opacity: 0.5; }
          100% { transform: translate3d(var(--bx,0),-110vh,0); opacity: 0;  }
        }
        .ab-bubble {
          animation: aboutRise var(--ab-dur,13s) ease-in var(--ab-delay,0s) infinite;
          will-change: transform, opacity;
        }

        /* ── Rays ── */
        @keyframes rayPulse {
          0%,100% { opacity: 0.10; }
          50%     { opacity: 0.24; }
        }
        .ab-ray { animation: rayPulse var(--ray-dur,4s) ease-in-out var(--ray-delay,0s) infinite; }

        /* ── Crab ── */
        @keyframes crabBob {
          0%,100% { transform: translateY(0)    rotate(-2deg); }
          50%     { transform: translateY(-7px) rotate(2deg);  }
        }
        .ab-crab { animation: crabBob 5.5s ease-in-out infinite; will-change: transform; }

        /* ── Jellies ── */
        @keyframes jFloat {
          0%,100% { transform: translateY(0px)  rotate(-3deg); }
          50%     { transform: translateY(-18px) rotate(3deg);  }
        }
        @keyframes jFloatTilt {
          0%,100% { transform: translateY(0px)  rotate(22deg); }
          50%     { transform: translateY(-18px) rotate(28deg); }
        }
        .ab-jelly-a         { animation: jFloat     7s  ease-in-out 0s   infinite; will-change: transform; }
        .ab-jelly-b         { animation: jFloat     9s  ease-in-out 1.8s infinite; will-change: transform; }
        .ab-jelly-c         { animation: jFloat     6s  ease-in-out 3.5s infinite; will-change: transform; }
        .ab-jelly-checklist { animation: jFloatTilt 9s  ease-in-out 1.8s infinite; will-change: transform; }

        /*
          ── FISH ──────────────────────────────────────────────────────────────
          Critical rules:
          1. Animate ONLY transform — GPU composited, zero layout cost.
          2. The <img> itself has NO left/right/position CSS — the keyframe
             owns 100% of the movement, so there is zero property conflict.
          3. Each fish img is display:block inside a full-width row div.
             The row div is position:absolute at the correct top %; the img
             starts off-screen via translateX and travels across.
          4. swimLTR: left-off-screen → right-off-screen
             swimRTL: same travel direction but img is scaleX(-1) so it faces left.
        ────────────────────────────────────────────────────────────────────── */
        @keyframes swimLTR {
          from { transform: translateX(-300px); }
          to   { transform: translateX(calc(100vw + 300px)); }
        }
        @keyframes swimRTL {
          from { transform: translateX(calc(100vw + 300px)) scaleX(-1); }
          to   { transform: translateX(-300px)              scaleX(-1); }
        }
        .fish-ltr {
          animation: swimLTR var(--fdur,30s) linear var(--fdel,0s) infinite;
          will-change: transform;
          backface-visibility: hidden;
          /* NO position, left, right, or top on this element */
          display: block;
        }
        .fish-rtl {
          animation: swimRTL var(--fdur,30s) linear var(--fdel,0s) infinite;
          will-change: transform;
          backface-visibility: hidden;
          display: block;
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-bubble, .ab-ray, .ab-crab,
          .ab-jelly-a, .ab-jelly-b, .ab-jelly-c, .ab-jelly-checklist,
          .fish-ltr, .fish-rtl { animation: none !important; }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative -mt-[2px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg,#06182a 0%,#071e35 15%,#082840 35%,#093354 60%,#0a3f66 85%,#0c4a6e 100%)',
          paddingBottom: 0,
        }}
      >
        {/* Caustic light */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse 60% 50% at 75% 30%, rgba(34,211,238,.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 45% at 18% 65%, rgba(14,165,233,.07) 0%, transparent 58%),
              radial-gradient(ellipse 80% 60% at 50%  5%, rgba(56,189,248,.06) 0%, transparent 50%)
            `,
          }} />
        </div>

        {/* Light rays */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          {lightRays.map((r, i) => (
            <div key={i} className="ab-ray" style={{
              position: 'absolute', left: r.left, top: 0,
              width: '1.5px', height: r.h,
              background: 'linear-gradient(to bottom,rgba(255,255,255,.22),transparent)',
              transform: `rotate(${r.rot}deg)`, transformOrigin: 'top center',
              '--ray-dur': r.dur, '--ray-delay': r.delay,
            }} />
          ))}
        </div>

        {/* Decorative jellies */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <img src="/images/jelly-teal.png"     alt="" className="ab-jelly-a absolute"
               style={{ right:'3%',top:'8%',width:'min(100px,18vw)',opacity:.75,filter:'drop-shadow(0 0 18px rgba(56,189,248,.35))' }} />
          <img src="/images/jelly-pink.png"     alt="" className="ab-jelly-b absolute hidden sm:block"
               style={{ left:'2%',top:'38%',width:'min(80px,16vw)',opacity:.65,filter:'drop-shadow(0 0 14px rgba(236,72,153,.30))' }} />
          <img src="/images/jelly-gold__1_.png" alt="" className="ab-jelly-c absolute hidden md:block"
               style={{ right:'9%',bottom:'22%',width:'min(90px,15vw)',opacity:.70,filter:'drop-shadow(0 0 16px rgba(234,179,8,.25))' }} />
        </div>

        {/* ══ FISH ══════════════════════════════════════════════════════════════
            Each fish lives in a position:absolute row-div at its vertical slot.
            The <img> inside uses ONLY the .fish-ltr / .fish-rtl class — no
            position, left, right, or top — so the keyframe has zero competition.
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex: 15 }}>
          {FISH.map((f) => (
            <div
              key={f.id}
              style={{
                position: 'absolute',
                top:      f.top,
                left:     0,
                width:    '100%',
                // Height just needs to contain the image; overflow:hidden on parent clips travel
                height:   `${Math.round(f.w * 0.46)}px`,
                // Establish a new stacking context so will-change doesn't bleed
                isolation: 'isolate',
              }}
            >
              <img
                src="/images/fish-school.png"
                alt=""
                className={f.rtl ? 'fish-rtl' : 'fish-ltr'}
                style={{
                  width:   f.w,
                  height:  'auto',
                  opacity: 0.18,
                  filter:  'drop-shadow(0 0 8px rgba(56,189,248,.25))',
                  '--fdur': `${f.dur}s`,
                  '--fdel': `${f.delay}s`,
                  // ← NO position/left/right/top here. Full stop.
                }}
              />
            </div>
          ))}
        </div>

        {/* Rising bubbles */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
             style={{ zIndex: 2, height: '100%' }}>
          {riseBubbles.map((b) => (
            <div key={b.id} className="ab-bubble absolute rounded-full" style={{
              width: b.size, height: b.size,
              left: `${b.left}%`, bottom: '-2%',
              '--ab-dur': `${b.dur}s`, '--ab-delay': `${b.delay}s`, '--bx': b.bx,
              background: 'radial-gradient(circle at 35% 28%,rgba(255,255,255,.5),transparent 62%)',
              border: '1px solid rgba(165,230,252,.22)',
            }} />
          ))}
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0"
             style={{ zIndex:3, background:'radial-gradient(ellipse at 50% 0%,rgba(6,24,42,.05) 0%,rgba(6,24,42,.55) 85%)' }} />

        {/* ══ CONTENT ══════════════════════════════════════════════════════════ */}
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 sm:pt-20 lg:pt-28 lg:pb-32"
             style={{ zIndex: 10 }}>

          <div className="ab-eyebrow mb-4 flex items-center gap-2">
            <span className="h-px flex-1 max-w-[3rem]"
                  style={{ background:'linear-gradient(to right,transparent,rgba(56,189,248,.5))' }} />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.28em]" style={{ color:'#5ecfff' }}>
              <i className="fa-solid fa-water mr-2" aria-hidden />About ATLAS
            </span>
            <span className="h-px flex-1 max-w-[3rem]"
                  style={{ background:'linear-gradient(to left,transparent,rgba(56,189,248,.5))' }} />
          </div>

          <h2 className="ab-headline font-nature text-center leading-[1.06] mb-5" style={{
            fontSize: 'clamp(2.2rem,5.5vw,4rem)',
            color: '#e8fbff',
            textShadow: '0 0 50px rgba(14,165,233,.35)',
          }}>
            Where students build<br />
            <span className="text-gradient-ocean" style={{ textShadow:'none' }}>the future in a day.</span>
          </h2>

          <p className="ab-body font-body text-center mx-auto max-w-2xl text-base leading-relaxed sm:text-lg mb-14"
             style={{ color:'rgba(224,247,255,.85)' }}>
            ATLAS is Earl of March's flagship hackathon — a 12-hour sprint where Kanata students team up,
            sketch ideas, argue about stack choices, and turn rough concepts into something demoable by
            nightfall. Open to everyone: first-timers, veterans, designers, and wildcards alike.
          </p>

          {/* Stat pills */}
          <div className="mb-16 flex flex-wrap justify-center gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label}
                   className="ab-stat-pill group flex items-center gap-3 rounded-full px-4 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
                   style={{
                     background:'rgba(3,105,161,.3)',
                     border:'1px solid rgba(56,189,248,.35)',
                     backdropFilter:'blur(8px)',
                     boxShadow:'inset 0 1px 0 rgba(255,255,255,.12)',
                   }}>
                <i className={`fa-solid ${s.icon} text-xs text-aqua-mid`} aria-hidden />
                <span className="font-nature text-sky-blue"
                      style={{ fontSize:'clamp(1.1rem,2.5vw,1.4rem)',lineHeight:1,textShadow:'0 0 16px rgba(56,189,248,.3)' }}>
                  {s.value}
                </span>
                <span className="font-body text-xs text-aqua-light/70">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">

            {/* Left card */}
            <div className="ab-card-left relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
                 style={{
                   background:'linear-gradient(145deg,rgba(3,80,140,.45) 0%,rgba(4,18,34,.88) 100%)',
                   border:'1px solid rgba(56,189,248,.3)',
                   boxShadow:'inset 0 1px 0 rgba(255,255,255,.12),0 8px 32px rgba(0,0,0,.25)',
                   minHeight:320,
                 }}>
              <div className="pointer-events-none absolute inset-0 rounded-3xl"
                   style={{ background:'radial-gradient(ellipse 70% 45% at 30% 12%,rgba(255,255,255,.12) 0%,transparent 55%)' }} />
              <div className="pointer-events-none absolute -top-12 -left-12 w-56 h-56 rounded-full"
                   style={{ background:'radial-gradient(circle,rgba(56,189,248,.18) 0%,transparent 65%)',opacity:.6 }} />
              {[
                {s:4,l:'12%',b:'10%',dur:'6s', del:'0s'  },
                {s:3,l:'30%',b:'5%', dur:'8s', del:'2.3s'},
                {s:5,l:'55%',b:'15%',dur:'7s', del:'1.1s'},
                {s:3,l:'75%',b:'7%', dur:'9s', del:'3.7s'},
              ].map((b,i) => (
                <div key={i} className="ab-bubble pointer-events-none absolute rounded-full" style={{
                  width:b.s,height:b.s,left:b.l,bottom:b.b,
                  '--ab-dur':b.dur,'--ab-delay':b.del,'--bx':'2px',
                  background:'radial-gradient(circle at 36% 30%,rgba(255,255,255,.5),transparent 62%)',
                  border:'1px solid rgba(165,230,252,.2)',
                }} />
              ))}

              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/40"
                        style={{ background:'rgba(3,105,161,.5)' }}>
                    <i className="fa-solid fa-hourglass-half text-xs text-aqua-mid" aria-hidden />
                  </span>
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-aqua-light/55">The format</span>
                </div>
                <p className="font-nature leading-[1.08] mb-4" style={{
                  fontSize:'clamp(1.9rem,4.2vw,2.8rem)',color:'#e8fbff',textShadow:'0 0 40px rgba(14,165,233,.3)',
                }}>
                  Twelve hours.<br />
                  <span className="text-gradient-ocean" style={{ textShadow:'none' }}>One shot.</span>
                </p>
                <p className="font-body text-sm leading-relaxed sm:text-base"
                   style={{ color:'rgba(186,230,252,.72)',maxWidth:'36ch' }}>
                  You argue about the idea for exactly as long as it deserves, then you build. When something
                  breaks you cut it and keep moving. By nightfall you've shipped something real — rough edges
                  and all. Stand up, tell the story, show what held.
                </p>
              </div>

              <img src="/images/jelly-gold.png" alt=""
                   className="ab-crab pointer-events-none select-none self-end mt-6 relative z-10"
                   style={{ width:'min(7.5rem,28vw)',filter:'drop-shadow(0 6px 16px rgba(0,0,0,.5))' }} />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              <div className="ab-card-checklist relative rounded-3xl p-6 sm:p-7 flex-1"
                   style={{
                     background:'linear-gradient(150deg,rgba(3,65,110,.38) 0%,rgba(4,18,34,.85) 100%)',
                     border:'1px solid rgba(56,189,248,.28)',
                     boxShadow:'inset 0 1px 0 rgba(255,255,255,.10)',
                   }}>
                <div className="pointer-events-none absolute inset-0 rounded-3xl"
                     style={{ background:'radial-gradient(ellipse 65% 40% at 80% 8%,rgba(255,255,255,.09) 0%,transparent 55%)' }} />
                <img src="/images/octopus.png" alt=""
                     className="ab-jelly-checklist pointer-events-none absolute"
                     style={{ right:'-18px',top:'-22px',width:'min(88px,22vw)',opacity:.55,
                              filter:'drop-shadow(0 0 14px rgba(56,189,248,.35))',zIndex:1 }} />
                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/40"
                          style={{ background:'rgba(3,105,161,.5)' }}>
                      <i className="fa-solid fa-bag-shopping text-xs text-aqua-mid" aria-hidden />
                    </span>
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-aqua-light/55">
                      Dry-bag checklist
                    </span>
                  </div>
                  <ul className="space-y-3.5 font-body">
                    {checklist.map((item,i) => (
                      <li key={i} className="ab-checklist-item flex gap-3.5 items-start">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-sky-400/25"
                              style={{ background:'rgba(3,105,161,.38)' }}>
                          <i className={`fa-solid ${item.icon} text-[11px]`}
                             style={{ color:'rgba(56,189,248,.85)' }} aria-hidden />
                        </span>
                        <div>
                          <span className="block text-sm font-semibold leading-snug"
                                style={{ color:'rgba(220,247,255,.9)' }}>{item.title}</span>
                          <span className="block text-xs leading-relaxed mt-0.5"
                                style={{ color:'rgba(125,211,252,.6)' }}>{item.body}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ab-card-cta relative overflow-hidden rounded-3xl p-6 sm:p-7 flex items-center justify-between gap-6"
                   style={{
                     background:'linear-gradient(130deg,rgba(2,55,100,.55) 0%,rgba(4,14,28,.92) 100%)',
                     border:'1px solid rgba(56,189,248,.4)',
                     boxShadow:'inset 0 1px 0 rgba(255,255,255,.14),0 0 40px rgba(14,165,233,.10)',
                   }}>
                <div className="pointer-events-none absolute inset-0 rounded-3xl"
                     style={{ background:'radial-gradient(ellipse 75% 60% at 10% 50%,rgba(56,189,248,.1) 0%,transparent 60%)' }} />
                <div className="relative z-10 min-w-0">
                  <p className="font-nature leading-tight mb-1" style={{
                    fontSize:'clamp(1.3rem,2.8vw,1.7rem)',color:'#e8fbff',textShadow:'0 0 24px rgba(14,165,233,.3)',
                  }}>Spots fill fast.</p>
                  <p className="font-body text-xs sm:text-sm" style={{ color:'rgba(125,211,252,.6)' }}>
                    Free · meals · swag · prizes — capped when the hall is full.
                  </p>
                </div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd4f3gWsZd8umu6Twox6C-dSfYnQV9MGrcfHdy2Rv61DNO1Sg/viewform?usp=header" target="_blank" rel="noopener noreferrer"
                   className="btn-primary shrink-0 text-sm" style={{ position:'relative',zIndex:10 }}>
                  <span><i className="fa-solid fa-anchor mr-2" aria-hidden />Register — it's free</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave lip */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full" style={{ zIndex: 12 }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg"
               preserveAspectRatio="none" className="block w-full"
               style={{ height:'clamp(60px,8vw,100px)' }}>
            <path d="M0,50 C300,100 600,10 900,55 C1100,85 1300,20 1440,50 L1440,100 L0,100 Z" fill="#0c4a6e" />
          </svg>
        </div>
      </section>
    </>
  )
}