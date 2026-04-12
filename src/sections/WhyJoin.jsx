import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDivider from "../components/WaveDivider";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: "fa-bolt",
    title: "Push Beyond Limits",
    body: "Tackle real engineering challenges with limited time and unlimited creativity. Discover what you're actually capable of when the clock is ticking.",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.3)",
  },
  {
    icon: "fa-handshake",
    title: "Build Real Connections",
    body: "Meet mentors, industry volunteers, and future collaborators who share your passion for building cool things.",
    color: "#a7f3d0",
    glow: "rgba(167,243,208,0.3)",
  },
  {
    icon: "fa-trophy",
    title: "Win Prizes",
    body: "Compete for cash prizes and special category awards. Recognition that looks great on any portfolio or resume.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.3)",
  },
  {
    icon: "fa-palette",
    title: "Any Skill Welcome",
    body: "No coding? No problem. Designers, artists, writers, and entrepreneurs are just as valuable as engineers.",
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
  },
  {
    icon: "fa-burger",
    title: "Free Food & Fun",
    body: "We keep the energy high all day. Snacks, music, mini-challenges, and a closing ceremony that celebrates everyone.",
    color: "#fef9c3",
    glow: "rgba(254,249,195,0.25)",
  },
  {
    icon: "fa-rocket",
    title: "Ship Something Real",
    body: "In I2 hours you'll go from idea to demo. That momentum stays with you forever.",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.3)",
  },
];

const CREATURES = [
  {
    src: "/images/manta.png",
    cls: "jelly-float",
    style: {
      width: "clamp(80px, 12vw, 200px)",
      right: "3%",
      top: "4%",
      opacity: 0.4,
    },
    delay: "0s",
  },
  {
    src: "/images/jelly-teal.png",
    cls: "jelly-float2",
    style: { width: 75, left: "2%", top: "42%" },
    delay: "2.2s",
  },
  {
    src: "/images/jelly-gold__1_.png",
    cls: "jelly-float3",
    style: { width: 65, right: "10%", top: "62%" },
    delay: "1.1s",
  },
  {
    src: "/images/fish-school.png",
    cls: "fish-drift",
    style: { width: 200, top: "28%", opacity: 0.4 },
    delay: "4s",
  },
];

const AMBIENT_BUBBLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 5 + (i % 6) * 4,
  left: `${(i * 5.1 + 2) % 94}%`,
  dur: `${6 + (i % 5) * 1.6}s`,
  delay: `${(i * 0.9) % 8}s`,
  opacity: 0.1 + (i % 4) * 0.05,
}));

export default function WhyJoin() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const creaturesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.78, y: 36 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.075,
          },
        );
      });

      creaturesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: (i % 2 === 0 ? -1 : 1) * 65,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, i) => {
    const card = cardsRef.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(card, {
      rotateX: -dy * 6,
      rotateY: dx * 6,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (i) => {
    const card = cardsRef.current[i];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.55,
      ease: "elastic.out(1, 0.55)",
    });
  };

  return (
    <section
      id="why-join"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #071e33 0%, #0c4a6e 45%, #071e33 100%)",
      }}
    >
      {/* Ambient rising bubbles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {AMBIENT_BUBBLES.map((b) => (
          <div
            key={b.id}
            style={{
              position: "absolute",
              bottom: `-${b.size * 2}px`,
              left: b.left,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              border: "1px solid rgba(125,211,252,0.22)",
              background:
                "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.2), transparent 65%)",
              animation: `ambBubbleRise ${b.dur} ease-in ${b.delay} infinite`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* Light rays */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          { left: "12%", rot: 4, delay: "0s", dur: "6.5s" },
          { left: "35%", rot: -3, delay: "2.2s", dur: "7s" },
          { left: "62%", rot: 5, delay: "1s", dur: "5.8s" },
          { left: "85%", rot: -5, delay: "3.1s", dur: "8s" },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.left,
              top: 0,
              width: "1.5px",
              height: "55%",
              background:
                "linear-gradient(to bottom, rgba(56,189,248,0.15), transparent)",
              transform: `rotate(${r.rot}deg)`,
              transformOrigin: "top center",
              animation: `rayShimmer ${r.dur} ease-in-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating creatures */}
      {CREATURES.map((c, i) => (
        <img
          key={i}
          ref={(el) => (creaturesRef.current[i] = el)}
          src={c.src}
          alt=""
          className={`pointer-events-none absolute ${c.cls}`}
          style={{
            zIndex: 2,
            height: "auto",
            filter: "drop-shadow(0 0 16px rgba(56,189,248,0.28))",
            animationDelay: c.delay,
            ...c.style,
          }}
        />
      ))}

      {/* Coral */}
      {/* <img src="/images/coral-left.png" alt=""
        className="pointer-events-none absolute bottom-10 left-0 hidden sm:block"
        style={{ zIndex: 2, height: '16vh', width: 'auto', opacity: 0.5 }} /> */}
      {/* <img src="/images/coral-right.png" alt=""
        className="pointer-events-none absolute bottom-10 right-0 hidden sm:block"
        style={{ zIndex: 2, height: '16vh', width: 'auto', opacity: 0.5 }} /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20"
          style={{ opacity: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-teal font-body font-semibold mb-5 flex items-center justify-center gap-2">
            <i className="fa-solid fa-compass" /> Six Reasons
          </p>
          <h2 className="font-nature text-4xl sm:text-5xl lg:text-6xl text-sky-blue mb-5 leading-tight">
            Dive in <span className="text-gradient-ocean">head‑first.</span>
          </h2>
          <p className="text-aqua-light/70 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            ATLAS isn't just a competition. It's 12 hours that can change how
            you see what you're capable of.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="wj-card group"
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              style={{ "--cc": r.color, "--cg": r.glow }}
            >
              {/* Soap-bubble highlight sheen top-left */}
              <div className="wj-card__sheen" />

              {/* Rising bubble cluster;decorative, bottom-right */}
              <div className="wj-card__bubbles" aria-hidden>
                {[17, 11, 7, 4].map((sz, bi) => (
                  <span
                    key={bi}
                    className="wj-bdot"
                    style={{
                      width: sz,
                      height: sz,
                      animationDuration: `${2.1 + bi * 0.55}s`,
                      animationDelay: `${bi * 0.38}s`,
                    }}
                  />
                ))}
              </div>

              {/* Icon orb */}
              <div className="wj-card__orb mb-5">
                <i
                  className={`fa-solid ${r.icon} text-xl`}
                  style={{ color: r.color }}
                />
              </div>

              <h3
                className="font-nature mb-3 leading-snug"
                style={{ color: r.color, fontSize: "1.5rem" }}
              >
                {r.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(186,230,252,0.68)" }}
              >
                {r.body}
              </p>

              {/* Glow bar */}
              <div className="wj-card__bar mt-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <WaveDivider fill="#071e33" />
      </div>

      <style>{`
        @keyframes ambBubbleRise {
          0%   { transform: translateY(0) translateX(0); opacity: 0;}
          8%   { opacity: 1;}
          50%  { transform: translateY(-42vh) translateX(7px);}
          92%  { opacity: 0.5;}
          100% { transform: translateY(-96vh) translateX(-5px);opacity: 0;}
        }

        @keyframes wjBdotFloat {
          0%, 100% { transform: translateY(0) scale(1);}
          50%       { transform: translateY(-9px) scale(1.07);}
        }

        /* Card base 
           Key fix: border-radius is subtly squircle-ish (slightly more on the bottom),
           NOT an oval;content fits perfectly. Bubble feel comes from the sheen + glow. */
        .wj-card {
          position: relative;
          border-radius: 22px;
          padding: 2rem 1.75rem 1.75rem;
          overflow: hidden;
          cursor: default;
          transform-style: preserve-3d;
          will-change: transform;
          background: linear-gradient(
            148deg,
            rgba(5,28,56,0.84) 0%,
            rgba(6,42,74,0.7) 55%,
            rgba(3,18,40,0.9) 100%
          );
          border: 1px solid rgba(125,211,252,0.15);
          box-shadow:
            0 0 0 1px rgba(56,189,248,0.05),
            inset 0 1px 0 rgba(255,255,255,0.07),
            0 10px 36px rgba(0,0,0,0.4);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .wj-card:hover {
          border-color: color-mix(in srgb, var(--cc) 50%, transparent);
          box-shadow:
            0 0 0 1px rgba(56,189,248,0.09),
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 16px 52px rgba(0,0,0,0.44),
            0 0 48px var(--cg);
        }

        /* Soap-bubble top-left highlight */
        .wj-card__sheen {
          position: absolute;
          top: -18%;
          left: -10%;
          width: 58%;
          height: 52%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 36% 32%,
            rgba(255,255,255,0.072) 0%,
            transparent 66%
          );
          pointer-events: none;
          opacity: 0.75;
          transition: opacity 0.35s;
        }
        .wj-card:hover .wj-card__sheen { opacity: 1;}

        /* Bubble cluster */
        .wj-card__bubbles {
          position: absolute;
          bottom: 12px;
          right: 14px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
          pointer-events: none;
        }

        .wj-bdot {
          display: block;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.26);
          background: radial-gradient(circle at 33% 28%, rgba(255,255,255,0.17), transparent 60%);
          opacity: 0;
          transition: opacity 0.28s;
          animation: wjBdotFloat ease-in-out infinite;
        }
        .wj-card:hover .wj-bdot { opacity: 1;}

        /* Icon orb */
        .wj-card__orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: radial-gradient(circle at 36% 30%, rgba(255,255,255,0.09), transparent 62%);
          border: 1px solid rgba(125,211,252,0.2);
          box-shadow: 0 0 16px var(--cg, rgba(56,189,248,0.18));
          transition: box-shadow 0.3s, transform 0.35s;
        }
        .wj-card:hover .wj-card__orb {
          box-shadow: 0 0 30px var(--cg, rgba(56,189,248,0.38));
          transform: scale(1.1) rotate(-5deg);
        }

        /* Glow bar */
        .wj-card__bar {
          height: 1.5px;
          width: 48%;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--cc, #38bdf8), transparent);
          opacity: 0;
          transition: opacity 0.32s, width 0.38s;
        }
        .wj-card:hover .wj-card__bar {
          opacity: 1;
          width: 70%;
        }
      `}</style>
    </section>
  );
}
