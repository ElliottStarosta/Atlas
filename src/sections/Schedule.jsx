import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    time:    '8:00 AM',
    title:   'Check In',
    body:    'Doors open. Grab your badge, meet your team, and settle in. Opening ceremony with team introductions and theme announcement.',
    icon:    'fa-door-open',
    color:   '#7dd3fc',
    glow:    'rgba(125,211,252,0.45)',
  },
  {
    time:    '9:00 AM',
    title:   'Hacking Begins',
    body:    'The clock starts. Teams receive the prompt and the sprint begins. Mentors are available from the first minute.',
    icon:    'fa-code',
    color:   '#a7f3d0',
    glow:    'rgba(167,243,208,0.45)',
    highlight: true,
  },
  {
    time:    '10:30 AM',
    title:   'Workshop: Design Basics',
    body:    'Optional 45-min workshop on UI/UX fundamentals — perfect for non-designers who want their project to look great.',
    icon:    'fa-pen-ruler',
    color:   '#c084fc',
    glow:    'rgba(192,132,252,0.4)',
    tag:     'Optional',
  },
  {
    time:    '12:00 PM',
    title:   'Lunch Break',
    body:    'Free lunch provided. A great chance to share early progress, get feedback from mentors, and recharge for the second half.',
    icon:    'fa-utensils',
    color:   '#fbbf24',
    glow:    'rgba(251,191,36,0.4)',
  },
  {
    time:    '1:00 PM',
    title:   'Workshop: APIs & Tools',
    body:    'Optional 45-min deep-dive on popular APIs, Firebase, and rapid prototyping tools to accelerate your build.',
    icon:    'fa-plug',
    color:   '#c084fc',
    glow:    'rgba(192,132,252,0.4)',
    tag:     'Optional',
  },
  {
    time:    '3:00 PM',
    title:   'Mentor Check-In',
    body:    'Mentors do a round of tables. Teams pitch their current state in 60 seconds and get direct, honest feedback.',
    icon:    'fa-comments',
    color:   '#38bdf8',
    glow:    'rgba(56,189,248,0.45)',
  },
  {
    time:    '6:00 PM',
    title:   'Presentations Begin',
    body:    'Each team gets 4 minutes to present and 2 minutes Q&A with judges. All participants are encouraged to watch.',
    icon:    'fa-display',
    color:   '#f97316',
    glow:    'rgba(249,115,22,0.45)',
    highlight: true,
  },
  {
    time:    '7:30 PM',
    title:   'Awards Ceremony',
    body:    'Judges announce winners for all prize categories. Special awards, shoutouts, and closing remarks from organizers.',
    icon:    'fa-trophy',
    color:   '#fbbf24',
    glow:    'rgba(251,191,36,0.5)',
    highlight: true,
  },
  {
    time:    '8:00 PM',
    title:   'Wrap-Up & Goodbye',
    body:    'Final photo ops, collect your swag, and bask in the glow of having shipped something real in a day. You did it.',
    icon:    'fa-star',
    color:   '#a7f3d0',
    glow:    'rgba(167,243,208,0.4)',
    highlight: true,
  },
]

const RAYS = [
  { left: '5%',  h: '60%', rot:  3, delay: '0s',   dur: '4.4s' },
  { left: '18%', h: '75%', rot: -4, delay: '1.5s', dur: '5.2s' },
  { left: '35%', h: '68%', rot:  2, delay: '0.7s', dur: '3.9s' },
  { left: '55%', h: '55%', rot: -3, delay: '2.1s', dur: '4.8s' },
  { left: '72%', h: '72%', rot:  4, delay: '0.3s', dur: '5.6s' },
  { left: '88%', h: '50%', rot: -2, delay: '1.9s', dur: '4.1s' },
]

const FISH = [
  { id: 'fa', top: '15%', w: 190, dur: 32, delay: -8,  rtl: false },
  { id: 'fb', top: '42%', w: 145, dur: 44, delay: -22, rtl: true  },
  { id: 'fc', top: '68%', w: 170, dur: 38, delay: -14, rtl: false },
  { id: 'fd', top: '85%', w: 115, dur: 52, delay: -30, rtl: true  },
]

export default function Schedule() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])
  const headerRef  = useRef(null)

  const [bgBubbles] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id:    i,
      size:  3 + (i % 6) * 2,
      left:  `${2 + (i * 6) % 95}%`,
      dur:   `${10 + (i % 7) * 1.2}s`,
      delay: `${-(i * 1.1) % 14}s`,
      bx:    `${((i * 4) % 10) - 5}px`,
    }))
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    if (!section) return

    // Pre-hide header elements
    gsap.set(['.sch3-eyebrow', '.sch3-headline', '.sch3-sub'], {
      opacity: 0, y: 30, force3D: true,
    })

    // Pre-hide every card — alternate float direction
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, {
        opacity: 0,
        x: i % 2 === 0 ? -44 : 44,
        y: 16,
        scale: 0.95,
        force3D: true,
      })
    })

    const ctx = gsap.context(() => {
      // Header stagger
      gsap.to(['.sch3-eyebrow', '.sch3-headline', '.sch3-sub'], {
        scrollTrigger: { trigger: headerRef.current, start: 'top 84%', once: true },
        opacity: 1, y: 0,
        duration: 0.7, stagger: 0.1, ease: 'power3.out', force3D: true,
      })

      // Individual ScrollTrigger per card — each animates as it scrolls into view
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          opacity: 1, x: 0, y: 0, scale: 1,
          duration: 0.65,
          ease: 'back.out(1.3)',
          force3D: true,
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @keyframes sch3Rise {
          0%   { transform: translate3d(0,0,0); opacity:0; }
          8%   { opacity:0.45; }
          100% { transform: translate3d(var(--bx,0),-110vh,0); opacity:0; }
        }
        .sch3-bg-bubble {
          animation: sch3Rise var(--dur,12s) ease-in var(--del,0s) infinite;
          will-change: transform, opacity;
        }

        @keyframes sch3Ray {
          0%,100% { opacity:0.08; }
          50%     { opacity:0.20; }
        }
        .sch3-ray { animation: sch3Ray var(--rdur,4s) ease-in-out var(--rdel,0s) infinite; }

        @keyframes sch3LTR {
          from { transform: translateX(-280px); }
          to   { transform: translateX(calc(100vw + 280px)); }
        }
        @keyframes sch3RTL {
          from { transform: translateX(calc(100vw + 280px)) scaleX(-1); }
          to   { transform: translateX(-280px) scaleX(-1); }
        }
        .sch3-fish-ltr { animation: sch3LTR var(--fdur,30s) linear var(--fdel,0s) infinite; will-change:transform; backface-visibility:hidden; display:block; }
        .sch3-fish-rtl { animation: sch3RTL var(--fdur,30s) linear var(--fdel,0s) infinite; will-change:transform; backface-visibility:hidden; display:block; }

        @keyframes sch3Float {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%     { transform: translateY(-13px) rotate(2deg); }
        }
        @keyframes sch3Glide {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50%     { transform: translateY(-17px) rotate(1deg); }
        }
        @keyframes sch3Sway {
          0%,100% { transform: rotate(-5deg) translateY(0); }
          50%     { transform: rotate(5deg) translateY(-8px); }
        }
        .sch3-float { animation: sch3Float 7s  ease-in-out infinite; will-change:transform; }
        .sch3-glide { animation: sch3Glide 11s ease-in-out infinite; will-change:transform; }
        .sch3-sway  { animation: sch3Sway   9s ease-in-out infinite; will-change:transform; }

        /* Bubble card shape — rounded pill with bubble specular */
        .sch3-bubble-card {
          border-radius: 40px;
          /* NO overflow:hidden so text is never clipped */
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease;
        }
        .sch3-bubble-card:hover {
          transform: translateY(-5px) scale(1.015) !important;
        }

        @keyframes sch3Shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .sch3-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.09) 50%, transparent);
          background-size: 200% auto;
          animation: sch3Shimmer 3.5s linear infinite;
          border-radius: 40px;
        }

        @keyframes sch3Pulse {
          0%,100% { box-shadow: 0 0 0 0 var(--pc, rgba(56,189,248,.55)); }
          50%     { box-shadow: 0 0 0 7px transparent; }
        }
        .sch3-icon-pulse { animation: sch3Pulse 2.6s ease-in-out infinite; }

        /* Thread connecting bubbles */
        .sch3-thread {
          width: 2px;
          background: linear-gradient(to bottom, rgba(56,189,248,.28), rgba(56,189,248,.05));
          border-radius: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sch3-bg-bubble, .sch3-ray, .sch3-fish-ltr, .sch3-fish-rtl,
          .sch3-float, .sch3-glide, .sch3-sway, .sch3-shimmer, .sch3-icon-pulse
          { animation: none !important; }
          .sch3-bubble-card:hover { transform: none !important; }
        }
      `}</style>

      <section
        id="schedule"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{
          background:'linear-gradient(180deg,#04111f 0%,#061828 18%,#072035 42%,#082a45 66%,#093252 86%,#0a3860 100%)',
          paddingTop:'6rem',
          paddingBottom:'9rem',
        }}
      >
        {/* Caustic light */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex:0 }}>
          <div style={{ position:'absolute', inset:0, background:`
            radial-gradient(ellipse 60% 50% at 78% 14%, rgba(34,211,238,.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 14% 68%, rgba(14,165,233,.06) 0%, transparent 55%),
            radial-gradient(ellipse 80% 55% at 50% 2%,  rgba(56,189,248,.05) 0%, transparent 50%)
          ` }} />
        </div>

        {/* Rays */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex:1 }}>
          {RAYS.map((r,i) => (
            <div key={i} className="sch3-ray" style={{
              position:'absolute', left:r.left, top:0, width:'1.5px', height:r.h,
              background:'linear-gradient(to bottom,rgba(255,255,255,.2),transparent)',
              transform:`rotate(${r.rot}deg)`, transformOrigin:'top center',
              '--rdur':r.dur, '--rdel':r.delay,
            }} />
          ))}
        </div>

        {/* Background bubbles */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" style={{ zIndex:2, height:'100%' }}>
          {bgBubbles.map(b => (
            <div key={b.id} className="sch3-bg-bubble absolute rounded-full" style={{
              width:b.size, height:b.size, left:b.left, bottom:'-2%',
              '--dur':b.dur, '--del':b.delay, '--bx':b.bx,
              background:'radial-gradient(circle at 34% 26%,rgba(255,255,255,.55),transparent 60%)',
              border:'1px solid rgba(125,211,252,.22)',
            }} />
          ))}
        </div>

        {/* Fish */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex:3 }}>
          {FISH.map(f => (
            <div key={f.id} style={{ position:'absolute', top:f.top, left:0, width:'100%', height:`${Math.round(f.w*0.46)}px`, isolation:'isolate' }}>
              <img src="/images/fish-school.png" alt=""
                   className={f.rtl ? 'sch3-fish-rtl' : 'sch3-fish-ltr'}
                   style={{ width:f.w, height:'auto', opacity:0.13,
                            filter:'drop-shadow(0 0 8px rgba(56,189,248,.2))',
                            '--fdur':`${f.dur}s`, '--fdel':`${f.delay}s` }} />
            </div>
          ))}
        </div>

        {/* Creatures */}
        <img src="/images/crab.png"     alt="" className="sch3-float pointer-events-none absolute hidden md:block"
             style={{ zIndex:4, right:'2%', top:'6%', width:'min(88px,13vw)', opacity:.65, filter:'drop-shadow(0 0 18px rgba(56,189,248,.35))' }} />
        <img src="/images/seahorse-pink.png"     alt="" className="sch3-float pointer-events-none absolute hidden lg:block"
             style={{ zIndex:4, left:'1.5%', top:'30%', width:'min(68px,10vw)', opacity:.55, animationDelay:'2s', filter:'drop-shadow(0 0 14px rgba(236,72,153,.3))' }} />
        <img src="/images/seahorse-pink.png"     alt="" className="sch3-float pointer-events-none absolute hidden lg:block"
             style={{ zIndex:4, left:'5%', top:'30%', width:'min(80px,10vw)', opacity:.55, animationDelay:'3s', filter:'drop-shadow(0 0 14px rgba(236,72,153,.3))' }} />
        <img src="/images/turtle.png"         alt="" className="sch3-glide pointer-events-none absolute hidden lg:block"
             style={{ zIndex:4, right:'2.5%', top:'36%', width:'min(108px,14vw)', opacity:.5, filter:'drop-shadow(0 0 12px rgba(56,189,248,.2))' }} />
        <img src="/images/seahorse-yellow.png"          alt="" className="sch3-glide pointer-events-none absolute hidden xl:block"
             style={{ zIndex:4, right:'1%', top:'56%', width:'min(122px,15vw)', opacity:.42, animationDelay:'3.5s', filter:'drop-shadow(0 0 16px rgba(56,189,248,.2))' }} />
        <img src="/images/fish-school.png"           alt="" className="sch3-sway pointer-events-none absolute hidden md:block"
             style={{ zIndex:4, right:'2%', bottom:'14%', width:'min(76px,11vw)', opacity:.58, filter:'drop-shadow(0 0 10px rgba(251,191,36,.25))' }} />
        <img src="/images/jelly-gold__1_.png" alt="" className="sch3-float pointer-events-none absolute hidden md:block"
             style={{ zIndex:4, left:'2%', bottom:'18%', width:'min(74px,11vw)', opacity:.52, animationDelay:'5s', filter:'drop-shadow(0 0 14px rgba(234,179,8,.25))' }} />
        <img src="/images/octopus.png"        alt="" className="sch3-float pointer-events-none absolute hidden xl:block"
             style={{ zIndex:4, left:'1.5%', top:'14%', width:'min(78px,10vw)', opacity:.45, animationDelay:'1.5s', filter:'drop-shadow(0 0 12px rgba(56,189,248,.25))' }} />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0" style={{
          zIndex:5, background:'radial-gradient(ellipse at 50% 0%,rgba(4,17,31,.03) 0%,rgba(4,17,31,.48) 88%)',
        }} />

        {/* ══ CONTENT ══ */}
        <div className="relative mx-auto px-4 sm:px-6" style={{ zIndex:10, maxWidth:660 }}>

          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <div className="sch3-eyebrow mb-4 flex items-center justify-center gap-2">
              <span className="h-px w-10" style={{ background:'linear-gradient(to right,transparent,rgba(56,189,248,.5))' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.28em]" style={{ color:'#5ecfff' }}>
                <i className="fa-solid fa-calendar-days mr-2" aria-hidden />May 2nd Schedule
              </span>
              <span className="h-px w-10" style={{ background:'linear-gradient(to left,transparent,rgba(56,189,248,.5))' }} />
            </div>

            <h2 className="sch3-headline font-nature leading-[1.06] mb-4"
                style={{ fontSize:'clamp(2.2rem,5.5vw,3.8rem)', color:'#e8fbff', textShadow:'0 0 50px rgba(14,165,233,.35)' }}>
              Your{' '}
              <span className="text-gradient-ocean" style={{ textShadow:'none' }}>12 hours,</span>
              <br />mapped out.
            </h2>

            <p className="sch3-sub font-body text-base leading-relaxed mx-auto"
               style={{ color:'rgba(186,230,252,.72)', maxWidth:'40ch' }}>
              From first badge to final bow — every moment of your day at Earl of March Secondary School.
            </p>
          </div>

          {/* ── Bubble chain ── */}
          <div className="flex flex-col items-center">
            {events.map((e, i) => {
              const isLast = i === events.length - 1
              return (
                <React.Fragment key={i}>

                  {/* Bubble card */}
                  <div
                    ref={el => { cardRefs.current[i] = el }}
                    className="sch3-bubble-card w-full relative"
                    style={{
                      background: e.highlight
                        ? 'linear-gradient(150deg,rgba(3,70,130,.60) 0%,rgba(4,20,40,.92) 100%)'
                        : 'linear-gradient(150deg,rgba(4,28,56,.46) 0%,rgba(3,12,28,.78) 100%)',
                      border:`1.5px solid ${e.color}${e.highlight ? '55' : '28'}`,
                      boxShadow: e.highlight
                        ? `inset 0 1px 0 rgba(255,255,255,.14), 0 8px 40px rgba(0,0,0,.35), 0 0 50px ${e.glow}18`
                        : `inset 0 1px 0 rgba(255,255,255,.07), 0 4px 24px rgba(0,0,0,.2)`,
                      backdropFilter:'blur(12px)',
                      padding:'1.4rem 1.75rem',
                    }}
                  >
                    {/* Shimmer on highlights */}
                    {e.highlight && (
                      <div className="sch3-shimmer pointer-events-none absolute inset-0" />
                    )}

                    {/* Specular highlight at top — the "bubble" sheen */}
                    <div className="pointer-events-none absolute rounded-full"
                         style={{
                           top:10, left:'20%', right:'20%', height:3,
                           background:'linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)',
                           filter:'blur(1px)',
                         }} />

                    {/* Card content */}
                    <div className="relative z-10 flex items-start gap-4">

                      {/* Icon */}
                      <div
                        className={`shrink-0 flex items-center justify-center rounded-full ${e.highlight ? 'sch3-icon-pulse' : ''}`}
                        style={{
                          width:44, height:44, marginTop:2,
                          background:`radial-gradient(circle at 38% 30%,${e.color}2e,${e.color}0c 70%)`,
                          border:`1.5px solid ${e.color}55`,
                          boxShadow: e.highlight ? `0 0 16px ${e.glow}` : 'none',
                          '--pc': e.glow,
                        }}
                      >
                        <i className={`fa-solid ${e.icon}`} style={{ color:e.color, fontSize:15 }} aria-hidden />
                      </div>

                      {/* Text — no overflow:hidden anywhere, text wraps freely */}
                      <div style={{ flex:1 }}>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
                          <span className="font-nature"
                                style={{ fontSize:'clamp(1rem,2.5vw,1.25rem)', lineHeight:1.2,
                                         color: e.highlight ? '#e8fbff' : e.color,
                                         textShadow: e.highlight ? `0 0 20px ${e.glow}` : 'none' }}>
                            {e.title}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-body text-xs px-2.5 py-0.5 rounded-full font-medium"
                                  style={{ background:`${e.color}18`, color:e.color,
                                           border:`1px solid ${e.color}38`, letterSpacing:'0.04em', lineHeight:1.5 }}>
                              {e.time}
                            </span>
                            {e.tag && (
                              <span className="font-body text-xs px-2 py-0.5 rounded-full"
                                    style={{ background:'rgba(192,132,252,.14)', color:'#c084fc',
                                             border:'1px solid rgba(192,132,252,.32)', lineHeight:1.5 }}>
                                {e.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="font-body text-sm leading-relaxed" style={{ color:'rgba(186,230,252,.65)' }}>
                          {e.body}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Thread between bubbles */}
                  {!isLast && (
                    <div className="sch3-thread" style={{ height:24 }} />
                  )}

                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Wave lip into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full" style={{ zIndex:12 }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg"
               preserveAspectRatio="none" className="block w-full"
               style={{ height:'clamp(55px,7vw,95px)' }}>
            <path d="M0,50 C240,100 480,5 720,50 C960,95 1200,10 1440,50 L1440,100 L0,100 Z" fill="#06182a" />
          </svg>
        </div>
      </section>
    </>
  )
}