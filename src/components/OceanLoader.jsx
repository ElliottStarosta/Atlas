import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function OceanLoader({ onComplete }) {
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressFillRef = useRef(null)
  const textRef = useRef(null)
  const bubblesContainerRef = useRef(null)
  const [percent, setPercent] = useState(0)
  const [loadText, setLoadText] = useState('Preparing the dive...')

  const LOAD_PHRASES = [
    'Preparing the dive...',
    'Charging the tanks...',
    'Locating the reef...',
    'Briefing the crew...',
    'Dive in 3... 2... 1...',
  ]

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    // Lock scroll while loading
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Create the bubbles programmatically
    const bubbleContainer = bubblesContainerRef.current
    const numBubbles = 28
    const bubbleEls = []

    for (let i = 0; i < numBubbles; i++) {
      const b = document.createElement('div')
      const size = 4 + Math.random() * 18
      b.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        left: ${5 + Math.random() * 88}%;
        bottom: ${-size}px;
        background: radial-gradient(circle at 35% 28%, rgba(255,255,255,0.65), transparent 60%);
        border: 1px solid rgba(125,211,252,0.35);
        pointer-events: none;
      `
      bubbleContainer.appendChild(b)
      bubbleEls.push(b)

      // Animate each bubble rising
      gsap.to(b, {
        y: -(window.innerHeight + size + 40),
        x: (Math.random() - 0.5) * 80,
        opacity: 0,
        duration: 3.5 + Math.random() * 4,
        delay: Math.random() * 4,
        ease: 'power1.in',
        repeat: -1,
        repeatDelay: Math.random() * 2,
      })
    }

    // Animate logo entrance
    gsap.set(logoRef.current, { opacity: 0, y: 30, scale: 0.85 })
    gsap.to(logoRef.current, {
      opacity: 1, y: 0, scale: 1,
      duration: 1.1,
      ease: 'back.out(1.5)',
      delay: 0.3,
    })

    gsap.set(textRef.current, { opacity: 0, y: 16 })
    gsap.to(textRef.current, {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.8,
    })

    gsap.set(progressBarRef.current, { opacity: 0, scaleX: 0.6 })
    gsap.to(progressBarRef.current, {
      opacity: 1, scaleX: 1,
      duration: 0.7,
      ease: 'power2.out',
      delay: 1,
    })

    // Drive the fake progress
    const totalDuration = 2400 // ms

    const images = Array.from(document.images)
    let loaded = 0
    const total = Math.max(images.length, 1)

    const updateProgress = (val) => {
      const pct = Math.min(Math.round(val), 100)
      setPercent(pct)
      gsap.to(progressFillRef.current, {
        scaleX: pct / 100,
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'left center',
      })
      // Update phrase
      const phraseIdx = Math.floor((pct / 100) * (LOAD_PHRASES.length - 1))
      setLoadText(LOAD_PHRASES[phraseIdx])
    }

    // Count actual image loads
    const handleLoad = () => {
      loaded++
      const imgProgress = (loaded / total) * 100
      // Blend image progress with a minimum linear curve
      updateProgress(Math.max(imgProgress, (Date.now() - startTime) / totalDuration * 70))
    }

    const startTime = Date.now()
    images.forEach(img => {
      if (img.complete) handleLoad()
      else img.addEventListener('load', handleLoad, { once: true })
    })

    // Guaranteed minimum animation
    const ticker = gsap.to({ v: 0 }, {
      v: 100,
      duration: totalDuration / 1000,
      ease: 'power1.inOut',
      onUpdate() {
        updateProgress(this.targets()[0].v)
      },
      onComplete() {
        // Exit animation
        setPercent(100)
        setLoadText('Dive in 3... 2... 1...')

        setTimeout(() => {
          // Fade out content first
          gsap.to([logoRef.current, textRef.current, progressBarRef.current], {
            opacity: 0,
            y: -24,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.in',
          })
          // Slide entire overlay up off screen
          gsap.to(overlay, {
            y: '-100%',
            duration: 0.9,
            delay: 0.3,
            ease: 'power4.inOut',
            onComplete: () => {
              document.body.style.overflow = prev
              if (onComplete) onComplete()
              overlay.style.display = 'none'
            }
          })
        }, 400)
      }
    })

    return () => {
      ticker.kill()
      bubbleEls.forEach(b => b.remove())
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes loaderRay {
          0%,100% { opacity: 0.06; }
          50%     { opacity: 0.22; }
        }
        @keyframes loaderWave {
          0%   { d: path("M0,60 C200,30 400,90 600,55 C800,20 1000,80 1200,45 C1350,18 1430,52 1440,40 L1440,100 L0,100 Z"); }
          50%  { d: path("M0,50 C180,80 420,10 660,55 C860,88 1060,22 1260,58 C1360,72 1420,45 1440,52 L1440,100 L0,100 Z"); }
          100% { d: path("M0,60 C200,30 400,90 600,55 C800,20 1000,80 1200,45 C1350,18 1430,52 1440,40 L1440,100 L0,100 Z"); }
        }
        @keyframes loaderWave2 {
          0%   { d: path("M0,72 C220,38 480,98 720,60 C920,30 1120,88 1320,50 C1400,32 1430,58 1440,60 L1440,100 L0,100 Z"); }
          50%  { d: path("M0,65 C280,95 500,30 760,68 C940,94 1140,32 1360,64 C1410,72 1432,55 1440,58 L1440,100 L0,100 Z"); }
          100% { d: path("M0,72 C220,38 480,98 720,60 C920,30 1120,88 1320,50 C1400,32 1430,58 1440,60 L1440,100 L0,100 Z"); }
        }
        @keyframes jellyBob {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50%     { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes sonarRing {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes depthShimmer {
          0%,100% { opacity: 0.04; }
          50%     { opacity: 0.12; }
        }
        @keyframes anchorBob {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%     { transform: translateY(-10px) rotate(4deg); }
        }

        .loader-wave-path {
          animation: loaderWave 4s ease-in-out infinite;
        }
        .loader-wave-path2 {
          animation: loaderWave2 5s ease-in-out infinite;
        }
        .loader-jelly {
          animation: jellyBob 6s ease-in-out infinite;
        }
        .loader-sonar-ring {
          animation: sonarRing 2.5s ease-out infinite;
          transform-origin: center;
        }
        .loader-sonar-ring:nth-child(2) { animation-delay: 0.8s; }
        .loader-sonar-ring:nth-child(3) { animation-delay: 1.6s; }

        .loader-progress-fill {
          transform-origin: left center;
          transform: scaleX(0);
        }
      `}</style>

      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'linear-gradient(180deg, #071e33 0%, #0c3a58 40%, #071e33 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Caustic light overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 50% at 75% 25%, rgba(34,211,238,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 20% 65%, rgba(14,165,233,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 5%, rgba(56,189,248,0.07) 0%, transparent 50%)
          `
        }} />

        {/* Light rays */}
        {[
          { left: '8%', rot: 4, dur: '4.2s', del: '0s' },
          { left: '22%', rot: -3, dur: '5.1s', del: '1.6s' },
          { left: '40%', rot: 2, dur: '3.8s', del: '0.9s' },
          { left: '58%', rot: -4, dur: '4.7s', del: '2.3s' },
          { left: '75%', rot: 3, dur: '5.5s', del: '0.3s' },
          { left: '90%', rot: -2, dur: '4.0s', del: '1.8s' },
        ].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0,
            left: r.left, width: '1.5px', height: '65%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
            transform: `rotate(${r.rot}deg)`, transformOrigin: 'top center',
            animation: `loaderRay ${r.dur} ease-in-out ${r.del} infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Depth shimmer layers */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 55%)',
          animation: 'depthShimmer 3s ease-in-out infinite',
        }} />

        {/* Bubbles container */}
        <div ref={bubblesContainerRef} style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
        }} />

        {/* Decorative jellyfish - right */}
        <img
          src="/images/jelly-teal.png" alt=""
          className="loader-jelly"
          style={{
            position: 'absolute', right: '6%', top: '12%',
            width: 'clamp(60px, 10vw, 120px)', height: 'auto',
            opacity: 0.7, pointerEvents: 'none',
            filter: 'drop-shadow(0 0 22px rgba(56,189,248,0.5))',
          }}
        />
        <img
          src="/images/jelly-pink.png" alt=""
          className="loader-jelly"
          style={{
            position: 'absolute', left: '5%', top: '15%',
            width: 'clamp(50px, 8vw, 95px)', height: 'auto',
            opacity: 0.65, pointerEvents: 'none',
            animationDelay: '2.2s', animationDuration: '8s',
            filter: 'drop-shadow(0 0 18px rgba(236,72,153,0.4))',
          }}
        />
        <img
          src="/images/jelly-gold.png" alt=""
          className="loader-jelly"
          style={{
            position: 'absolute', right: '12%', bottom: '28%',
            width: 'clamp(40px, 6vw, 80px)', height: 'auto',
            opacity: 0.6, pointerEvents: 'none',
            animationDelay: '1.1s', animationDuration: '7s',
            filter: 'drop-shadow(0 0 14px rgba(234,179,8,0.35))',
          }}
        />

        {/* Fish drifting across */}
        <img
          src="/images/fish-school.png" alt=""
          style={{
            position: 'absolute',
            top: '28%', left: 0,
            width: 220, height: 'auto', opacity: 0.25,
            filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.3))',
            animation: 'loaderRay 4s ease-in-out 0s infinite', // placeholder, GSAP takes over
            pointerEvents: 'none',
          }}
        />

        {/* Animated bottom waves */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%',
          pointerEvents: 'none', zIndex: 2,
        }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: 'clamp(55px,9vw,100px)' }}>
            <path
              className="loader-wave-path2"
              d="M0,72 C220,38 480,98 720,60 C920,30 1120,88 1320,50 C1400,32 1430,58 1440,60 L1440,100 L0,100 Z"
              fill="rgba(3,80,140,0.35)"
            />
            <path
              className="loader-wave-path"
              d="M0,60 C200,30 400,90 600,55 C800,20 1000,80 1200,45 C1350,18 1430,52 1440,40 L1440,100 L0,100 Z"
              fill="rgba(5,30,60,0.55)"
            />
          </svg>
        </div>

        {/* Seabed decorations */}
        <img src="/images/seaweed-left.png" alt=""
          style={{
            position: 'absolute', bottom: 0, left: 0,
            height: 'clamp(50px,12vh,120px)', width: 'auto', opacity: 0.6,
            pointerEvents: 'none', zIndex: 3,
            transformOrigin: 'bottom center',
            animation: 'anchorBob 5.5s ease-in-out infinite',
          }}
        />
        <img src="/images/seaweed-right.png" alt=""
          style={{
            position: 'absolute', bottom: 0, right: 0,
            height: 'clamp(50px,11vh,110px)', width: 'auto', opacity: 0.55,
            pointerEvents: 'none', zIndex: 3,
            transformOrigin: 'bottom center',
            animation: 'anchorBob 7s ease-in-out 2s infinite reverse',
          }}
        />
        <img src="/images/coral-left.png" alt=""
          style={{
            position: 'absolute', bottom: 0, left: 24,
            height: 'clamp(35px,8vh,80px)', width: 'auto', opacity: 0.55,
            pointerEvents: 'none', zIndex: 3,
          }}
        />
        <img src="/images/coral-right.png" alt=""
          style={{
            position: 'absolute', bottom: 0, right: 24,
            height: 'clamp(35px,8vh,80px)', width: 'auto', opacity: 0.5,
            pointerEvents: 'none', zIndex: 3,
          }}
        />

        {/* Main content */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '2rem', padding: '0 1.5rem',
          maxWidth: 420, width: '100%',
        }}>
          {/* Logo + sonar rings */}
          <div ref={logoRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Sonar ping rings */}
            {[1,2,3].map(n => (
              <div key={n} className="loader-sonar-ring" style={{
                position: 'absolute',
                width: 70, height: 70,
                borderRadius: '50%',
                border: '1.5px solid rgba(56,189,248,0.4)',
                pointerEvents: 'none',
              }} />
            ))}

            {/* Logo */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'radial-gradient(circle at 35% 28%, rgba(3,120,200,0.6), rgba(3,60,100,0.9))',
              border: '1.5px solid rgba(125,211,252,0.5)',
              boxShadow: '0 0 30px rgba(56,189,248,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              position: 'relative', zIndex: 1,
            }}>
              <img src="/images/octopus.png" alt="ATLAS"
                style={{ height: 36, width: 'auto', filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.6))' }}
              />
            </div>
          </div>

          {/* Loading text */}
          <div ref={textRef} style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: '"Touch of Nature", cursive',
              fontSize: 'clamp(1.6rem,5vw,2.4rem)',
              color: '#e0f7ff',
              textShadow: '0 0 40px rgba(14,165,233,0.6)',
              lineHeight: 1.1,
              marginBottom: '0.4rem',
            }}>
              Diving deep…
            </p>
            <p style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontSize: '0.78rem',
              color: 'rgba(125,211,252,0.65)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'opacity 0.4s',
            }}>
              {loadText}
            </p>
          </div>

          {/* Progress bar */}
          <div ref={progressBarRef} style={{ width: '100%' }}>
            {/* Bar track */}
            <div style={{
              width: '100%', height: 6, borderRadius: 6,
              background: 'rgba(3,60,100,0.5)',
              border: '1px solid rgba(56,189,248,0.2)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Fill */}
              <div ref={progressFillRef} className="loader-progress-fill" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, #0ea5e9, #38bdf8, #a7f3d0)',
                borderRadius: 6,
                boxShadow: '0 0 12px rgba(56,189,248,0.6)',
              }} />
              {/* Shimmer overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                backgroundSize: '200% auto',
                animation: 'sch3Shimmer 1.5s linear infinite',
                borderRadius: 6,
              }} />
            </div>

            {/* Percent + depth label */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: '0.6rem',
            }}>
              <span style={{
                fontFamily: "'Touch of Nature', cursive",
                fontSize: '1.15rem', color: '#38bdf8',
                textShadow: '0 0 12px rgba(56,189,248,0.5)',
              }}>
                {percent}%
              </span>
              <span style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontSize: '0.65rem', color: 'rgb(56, 191, 248)',
                letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>
                {Math.round(percent * 30)}m depth
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}