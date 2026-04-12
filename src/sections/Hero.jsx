import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import CountdownTimer from '../components/CountdownTimer'

export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(t)
  }, [])

  /* No scroll-linked parallax — it was causing jank with layered images + blend modes. */

  useEffect(() => {
    if (!loaded || !contentRef.current) return
    const q = gsap.utils.selector(contentRef.current)
    const items = q('.hero-reveal-item')
    gsap.set(items, { opacity: 0, y: 26 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.085,
      ease: 'power3.out',
      delay: 0.04,
    })
  }, [loaded])

  const jellies = [
    { src: '/images/jelly-pink.png', cls: 'jelly-float', w: 170, style: { right: '4%', top: '10%' }, delay: '0s' },
    { src: '/images/jelly-teal.png', cls: 'jelly-float2', w: 140, style: { right: '19%', top: '52%' }, delay: '1.8s' },
    { src: '/images/jelly-gold__1_.png', cls: 'jelly-float3', w: 120, style: { left: '4%', top: '56%' }, delay: '3.1s' },
  ]

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-24 sm:pb-28"
      style={{ paddingTop: 80 }}
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img src="/images/hero-bg-1.png" alt="" className="h-full w-full object-cover" style={{ opacity: 0.75 }} />
      </div>
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img
          src="/images/hero-bg-2.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.35, mixBlendMode: 'screen' }}
        />
      </div>
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <img
          src="/images/hero-bg-3.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.45, mixBlendMode: 'multiply' }}
        />
      </div>
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <img
          src="/images/hero-bg-4.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.2, mixBlendMode: 'color-dodge' }}
        />
      </div>

      <div
        className="pointer-events-none absolute"
        style={{ zIndex: 4, bottom: '26%', width: '100%', left: 0 }}
      >
        <img
          src="/images/fish-school.png"
          alt=""
          className="fish-drift"
          style={{
            width: 260,
            maxWidth: '55vw',
            height: 'auto',
            opacity: 0.65,
            filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.25))',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 5,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(7,30,51,0.1) 0%, rgba(7,30,51,0.65) 80%)',
        }}
      />

      {/* Blend into About + room for the wave “shelf” below coral */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full"
        style={{
          zIndex: 5,
          height: '52%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(6,24,42,0.18) 36%, rgba(6,24,42,0.62) 68%, rgba(6,24,42,0.92) 88%, #06182a 100%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 6 }}>
        {[
          { left: '10%', h: '60%', rot: 3, delay: '0s', dur: '4s' },
          { left: '25%', h: '70%', rot: -4, delay: '1.4s', dur: '5s' },
          { left: '42%', h: '75%', rot: 2, delay: '0.7s', dur: '3.6s' },
          { left: '60%', h: '62%', rot: -3, delay: '2.1s', dur: '4.5s' },
          { left: '76%', h: '55%', rot: 4, delay: '0.4s', dur: '5.5s' },
          { left: '89%', h: '48%', rot: -2, delay: '1.9s', dur: '4.2s' },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: r.left,
              top: 0,
              width: '1.5px',
              height: r.h,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
              transform: `rotate(${r.rot}deg)`,
              transformOrigin: 'top center',
              animation: `rayShimmer ${r.dur} ease-in-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Seabed plants behind the wave lip (lower z than wave) so the curve covers their bases */}
      <img
        src="/images/seaweed-left.png"
        alt=""
        className="seaweed-sway pointer-events-none absolute bottom-0 left-0"
        style={{ zIndex: 7, height: '40vh', width: 'auto', maxWidth: 110 }}
      />
      <img
        src="/images/seaweed-right.png"
        alt=""
        className="seaweed-sway-reverse pointer-events-none absolute bottom-0 right-0"
        style={{ zIndex: 7, height: '38vh', width: 'auto', maxWidth: 110 }}
      />
      <img
        src="/images/coral-left.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-6 hidden sm:block"
        style={{ zIndex: 7, height: '22vh', width: 'auto', opacity: 0.88 }}
      />
      <img
        src="/images/coral-right.png"
        alt=""
        className="pointer-events-none absolute bottom-0 right-6 hidden sm:block"
        style={{ zIndex: 7, height: '22vh', width: 'auto', opacity: 0.88 }}
      />

      {/* Wave draws on top of seabed fringe */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full leading-none"
        style={{ zIndex: 12 }}
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 110"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[68px] sm:h-[88px] md:h-[100px]"
        >
          <path
            fill="#06182a"
            d="M0,42 C200,8 320,96 480,48 C640,0 760,102 920,52 C1080,4 1180,88 1320,44 C1380,22 1410,38 1440,32 L1440,110 L0,110 Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 14 }}>
        {jellies.map((j, i) => (
          <img
            key={i}
            src={j.src}
            alt=""
            className={`absolute ${j.cls}`}
            style={{
              width: j.w,
              height: 'auto',
              ...j.style,
              animationDelay: j.delay,
              filter: 'drop-shadow(0 0 22px rgba(56,189,248,0.4))',
            }}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-8"
        style={{ zIndex: 20 }}
      >
        <div className="hero-reveal-item mb-6 flex items-center gap-2">
          <span
            className="font-body text-xs font-medium uppercase tracking-[0.25em] text-aqua-light/80"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
          >
            <i className="fa-solid fa-location-dot mr-2 text-teal" />
            Earl of March Secondary · Kanata, ON
          </span>
        </div>

        <div
          className="hero-reveal-item mb-5 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
          style={{
            background: 'linear-gradient(105deg, rgba(3,105,161,0.45) 0%, rgba(2,60,100,0.35) 100%)',
            border: '1px solid rgba(56,189,248,0.5)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 24px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
        >
          <i className="fa-solid fa-calendar-days shrink-0 text-xs text-aqua-mid" aria-hidden />
          <span
            className="font-nature text-sky-blue"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
              lineHeight: 1.2,
              letterSpacing: '0.02em',
              textShadow: '0 1px 12px rgba(0,0,0,0.45), 0 0 20px rgba(56,189,248,0.25)',
            }}
          >
            May 2nd, 2026
          </span>
          <span className="text-aqua-light/30 text-sm select-none">·</span>
          <span
            className="font-nature text-sky-blue"
            style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.88rem)', letterSpacing: '0.02em' }}
          >
            8 AM – 8 PM
          </span>
        </div>

        <p
          className="hero-reveal-item font-nature mb-3 text-3xl leading-tight text-sky-blue sm:text-4xl md:text-5xl"
          style={{ textShadow: '0 0 50px rgba(14,165,233,0.6)' }}
        >
          12 hours. One Saturday.
        </p>
        <p className="hero-reveal-item font-nature mb-6 text-2xl leading-tight text-gradient-ocean sm:text-3xl md:text-4xl">
          Unlimited ideas.
        </p>
        <p className="hero-reveal-item hero-subtitle mb-10 max-w-xl font-body text-base leading-relaxed text-aqua-light/85 sm:text-lg">
          Dive in and build something the world hasn&apos;t seen yet.
        </p>

        <div className="hero-reveal-item mb-10 flex w-full flex-col items-center">
          <p className="mb-4 flex items-center justify-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-aqua-light/60">
            <img src="/images/hourglass.png" alt="" style={{ height: 22, width: 'auto', display: 'inline' }} />
            Countdown to dive-in
          </p>
          <CountdownTimer />
        </div>

        <div className="hero-reveal-item flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd4f3gWsZd8umu6Twox6C-dSfYnQV9MGrcfHdy2Rv61DNO1Sg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ocean-cta btn-ocean-cta--bubble-primary text-base"
          >
            {/* <img className="btn-ocean-cta__bubble" src="/images/jelly-teal.png" alt="" aria-hidden /> */}
            <i className="fa-solid fa-anchor btn-ocean-cta__icon" aria-hidden />
            <span className="btn-ocean-cta__label">Register now — it&apos;s free</span>
          </a>
          <a href="#about" className="btn-ocean-cta btn-ocean-cta--bubble-secondary text-base">
            {/* <img className="btn-ocean-cta__bubble" src="/images/jelly-pink.png" alt="" aria-hidden /> */}
            <i className="fa-solid fa-compass btn-ocean-cta__icon" aria-hidden />
            <span className="btn-ocean-cta__label">Learn what awaits below</span>
          </a>
        </div>
      </div>
    </section>
  )
}
