import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Who can participate in ATLAS?",
    a: "ATLAS is open to all students at Earl of March Secondary School and the surrounding Kanata area. No experience required, and all skill levels and disciplines are welcome.",
    icon: "fa-users",
    color: "#7dd3fc",
  },
  {
    q: "How much does it cost to join?",
    a: "ATLAS is completely free to attend! We provide meals, snacks, and all the workspace you need. Just show up ready to build.",
    icon: "fa-tag",
    color: "#a7f3d0",
  },
  {
    q: "Do I need to know how to code?",
    a: "Absolutely not. Designers, project managers, writers, artists--everyone has a role. The best teams have diverse skills. If you can think creatively and work with others, you belong here.",
    icon: "fa-code",
    color: "#c084fc",
  },
  {
    q: "Can I come without a team?",
    a: "Yes! We have a team-matching session at the start of the day. You can show up solo and we'll pair you with other participants. Teams are capped at 3 members.",
    icon: "fa-user-plus",
    color: "#fbbf24",
  },
  {
    q: "What do I need to bring?",
    a: "Bring your laptop, charger, and any software you'll need pre-installed. We'll provide everything else;including food, Wi-Fi, and a good time.",
    icon: "fa-laptop",
    color: "#38bdf8",
  },
  {
    q: "What kinds of projects can we build?",
    a: "Anything goes;apps, games, hardware hacks, websites, tools, art installations. The theme is announced at 9 AM on the day of, so come with an open mind and flexible ideas.",
    icon: "fa-wand-magic-sparkles",
    color: "#f97316",
  },
  {
    q: "Will there be mentors available?",
    a: "Yes! Industry volunteers and experienced builders will be on-site from the moment hacking starts. They're there to help you ideate, debug, and push through blocks.",
    icon: "fa-person-chalkboard",
    color: "#a7f3d0",
  },
  {
    q: "How are projects judged?",
    a: "Projects are evaluated on creativity, technical execution, impact, and presentation. There are multiple prize categories including Best Overall, Best Design, and Most Creative.",
    icon: "fa-trophy",
    color: "#fbbf24",
  },
  {
    q: "What if I have dietary restrictions?",
    a: "Let us know when you register! We do our best to accommodate all dietary needs for the provided meals and snacks.",
    icon: "fa-utensils",
    color: "#7dd3fc",
  },
];

// Deterministic bubble presets for the background
const BG_BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 4 + (i % 7) * 3,
  left: `${3 + ((i * 5.4) % 92)}%`,
  dur: `${12 + (i % 6) * 1.8}s`,
  delay: `${-(i * 1.3) % 16}s`,
  bx: `${((i * 5) % 12) - 6}px`,
}));

const RAYS = [
  { left: "7%", h: "65%", rot: 3, delay: "0s", dur: "4.8s" },
  { left: "20%", h: "80%", rot: -4, delay: "1.9s", dur: "5.5s" },
  { left: "38%", h: "70%", rot: 2, delay: "0.6s", dur: "4.2s" },
  { left: "56%", h: "58%", rot: -3, delay: "2.4s", dur: "5.0s" },
  { left: "72%", h: "75%", rot: 4, delay: "1.1s", dur: "3.9s" },
  { left: "88%", h: "50%", rot: -2, delay: "3.0s", dur: "6.2s" },
];

// Each FAQ item rendered as a deep-sea scroll/tablet
function FaqItem({ item, index, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const itemRef = useRef(null);

  // Animate answer open/close with GSAP
  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0, y: -8 },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [isOpen]);

  const depthColors = [
    "rgba(3,105,161,0.45)",
    "rgba(2,80,130,0.40)",
    "rgba(4,60,100,0.42)",
  ];
  const bg = depthColors[index % 3];

  return (
    <div
      ref={itemRef}
      className="faq-deep-item"
      style={{ "--item-color": item.color }}
    >
      {/* Decorative pressure-rivet dots */}
      <div className="faq-rivets" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Bioluminescent edge glow when open */}
      {isOpen && <div className="faq-bio-glow" aria-hidden />}

      <button
        className="faq-trigger"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
      >
        {/* Icon in a porthole circle */}
        <span className="faq-porthole">
          <i
            className={`fa-solid ${item.icon}`}
            style={{ color: item.color, fontSize: 13 }}
            aria-hidden
          />
        </span>

        <span className="faq-question font-body">{item.q}</span>

        {/* Animated depth-gauge arrow */}
        <span
          className={`faq-gauge ${isOpen ? "faq-gauge--open" : ""}`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle
              cx="9"
              cy="9"
              r="8"
              stroke={item.color}
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <path
              d={isOpen ? "M5 11 L9 7 L13 11" : "M5 7 L9 11 L13 7"}
              stroke={item.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer panel */}
      <div
        ref={answerRef}
        className="faq-answer-wrap"
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <div className="faq-answer-inner font-body">
          {/* Sonar ping line separator */}
          <div className="faq-sonar-line" aria-hidden>
            <div className="faq-sonar-ping" />
          </div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);
  const octopusRef = useRef(null);
  const mantaRef = useRef(null);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    // Pre-hide
    gsap.set(
      [".faq-eyebrow", ".faq-headline", ".faq-subtext", ".faq-cta-card"],
      {
        opacity: 0,
        y: 32,
        force3D: true,
      },
    );
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: i % 2 === 0 ? -36 : 36,
        y: 12,
        force3D: true,
      });
    });
    if (octopusRef.current) gsap.set(octopusRef.current, { opacity: 0, x: 30 });
    if (mantaRef.current) gsap.set(mantaRef.current, { opacity: 0, x: -30 });

    const ctx = gsap.context(() => {
      // Header
      gsap.to([".faq-eyebrow", ".faq-headline", ".faq-subtext"], {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
      });

      // Each FAQ item as it scrolls in
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.4)",
          force3D: true,
        });
      });

      // CTA card
      gsap.to(".faq-cta-card", {
        scrollTrigger: {
          trigger: ".faq-cta-card",
          start: "top 90%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        force3D: true,
      });

      // Creatures
      if (octopusRef.current) {
        gsap.to(octopusRef.current, {
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
          opacity: 0.65,
          x: 0,
          duration: 1,
          ease: "power2.out",
        });
        // Gentle parallax drift
        gsap.to(octopusRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
      if (mantaRef.current) {
        gsap.to(mantaRef.current, {
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
          opacity: 0.5,
          x: 0,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(mantaRef.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* Section background */
        .faq-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #04111f 0%,
            #061526 12%,
            #071d36 28%,
            #082642 48%,
            #093050 68%,
            #0a3860 88%,
            #0b3f6a 100%
          );
          padding-top: 7rem;
          padding-bottom: 9rem;
        }

        /* Rays */
        @keyframes faqRay {
          0%,100% { opacity:0.07;}
          50%     { opacity:0.20;}
        }
        .faq-ray { animation: faqRay var(--rdur,4s) ease-in-out var(--rdel,0s) infinite;}

        /* Background bubbles */
        @keyframes faqBgBubble {
          0%   { transform: translate3d(0,0,0);opacity:0;}
          8%   { opacity:0.45;}
          92%  { opacity:0.3;}
          100% { transform: translate3d(var(--bx,0),-108vh,0);opacity:0;}
        }
        .faq-bg-bubble {
          animation: faqBgBubble var(--dur,14s) ease-in var(--del,0s) infinite;
          will-change: transform, opacity;
        }

        /* Creatures */
        @keyframes faqJellyFloat {
          0%,100% { transform: translateY(0) rotate(-3deg);}
          50%     { transform: translateY(-20px) rotate(3deg);}
        }
        @keyframes faqMantaGlide {
          0%,100% { transform: translateY(0) rotate(-1deg) scaleX(-1);}
          50%     { transform: translateY(-25px) rotate(1.5deg) scaleX(-1);}
        }
        .faq-octopus { animation: faqJellyFloat 8s ease-in-out infinite;will-change: transform;}
        .faq-manta   { animation: faqMantaGlide 11s ease-in-out 2s infinite;will-change: transform;}

        /* Seaweed at bottom */
        @keyframes faqSway {
          0%,100% { transform: rotate(-6deg) translateY(0);}
          50%     { transform: rotate(6deg) translateY(-6px);}
        }
        @keyframes faqSwayR {
          0%,100% { transform: rotate(6deg) translateY(0);}
          50%     { transform: rotate(-6deg) translateY(-5px);}
        }
        .faq-seaweed-l { transform-origin: bottom center;animation: faqSway  5.5s ease-in-out infinite;}
        .faq-seaweed-r { transform-origin: bottom center;animation: faqSwayR 6.2s ease-in-out infinite;}

        /* Fish drift */
        @keyframes faqFishLtr {
          from { transform: translateX(-260px);}
          to   { transform: translateX(calc(100vw + 260px));}
        }
        @keyframes faqFishRtl {
          from { transform: translateX(calc(100vw + 260px)) scaleX(-1);}
          to   { transform: translateX(-260px) scaleX(-1);}
        }
        .faq-fish-ltr { animation: faqFishLtr 38s linear -5s infinite;will-change: transform;display:block;}
        .faq-fish-rtl { animation: faqFishRtl 46s linear -20s infinite;will-change: transform;display:block;}

        /* Depth pressure particles */
        @keyframes pressureDot {
          0%   { transform: translateY(0) scale(1);opacity:0.6;}
          50%  { transform: translateY(-30px) scale(1.15);opacity:0.3;}
          100% { transform: translateY(-60px) scale(0.8);opacity:0;}
        }

        /* 
           FAQ ITEM;deep-sea pressure scroll / tablet
         */
        .faq-deep-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          /* Slightly different from a simple card;angled gradient like a submarine hull */
          background: linear-gradient(
            142deg,
            rgba(5, 30, 60, 0.72) 0%,
            rgba(3, 18, 40, 0.88) 55%,
            rgba(4, 22, 46, 0.80) 100%
          );
          border: 1px solid rgba(56,189,248,0.18);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -1px 0 rgba(0,0,0,0.3),
            0 6px 28px rgba(0,0,0,0.38);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 0;
        }
        .faq-deep-item:hover {
          border-color: color-mix(in srgb, var(--item-color) 38%, transparent);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.3),
            0 8px 36px rgba(0,0,0,0.42),
            0 0 32px color-mix(in srgb, var(--item-color) 12%, transparent);
        }

        /* Pressure rivet dots at corners */
        .faq-rivets {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .faq-rivets span {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 30%, rgba(125,211,252,0.5), rgba(56,189,248,0.15));
          border: 1px solid rgba(56,189,248,0.25);
        }
        .faq-rivets span:nth-child(1) { top: 10px;left: 12px;}
        .faq-rivets span:nth-child(2) { top: 10px;right: 12px;}
        .faq-rivets span:nth-child(3) { bottom: 10px;left: 12px;}
        .faq-rivets span:nth-child(4) { bottom: 10px;right: 12px;}

        /* Bioluminescent edge glow when open */
        .faq-bio-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          border-radius: 20px;
          box-shadow: inset 0 0 24px color-mix(in srgb, var(--item-color) 10%, transparent);
          animation: faqBioGlow 2s ease-in-out infinite alternate;
        }
        @keyframes faqBioGlow {
          from { box-shadow: inset 0 0 18px color-mix(in srgb, var(--item-color) 8%, transparent);}
          to   { box-shadow: inset 0 0 32px color-mix(in srgb, var(--item-color) 16%, transparent);}
        }

        /* Trigger button */
        .faq-trigger {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .faq-trigger:focus-visible {
          outline: 2px solid #67e8f9;
          outline-offset: -2px;
        }

        /* Porthole icon circle */
        .faq-porthole {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.1), transparent 60%);
          border: 1px solid color-mix(in srgb, var(--item-color) 40%, transparent);
          box-shadow:
            0 0 10px color-mix(in srgb, var(--item-color) 20%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.12);
          transition: box-shadow 0.3s;
        }
        .faq-trigger:hover .faq-porthole {
          box-shadow:
            0 0 18px color-mix(in srgb, var(--item-color) 35%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }

        /* Question text */
        .faq-question {
          flex: 1;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.45;
          color: rgba(224,247,255,0.9);
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .faq-trigger:hover .faq-question { color: #e0f7ff;}

        /* Depth-gauge arrow */
        .faq-gauge {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .faq-gauge--open { transform: rotate(180deg);}

        /* Answer panel */
        .faq-answer-wrap { overflow: hidden;}
        .faq-answer-inner {
          padding: 0 1.5rem 1.4rem;
          padding-left: calc(1.5rem + 34px + 1rem);/* align with question text */
        }

        /* Sonar separator */
        .faq-sonar-line {
          position: relative;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.25), transparent);
          margin-bottom: 1rem;
          overflow: visible;
        }
        .faq-sonar-ping {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px rgba(56,189,248,0.7);
          animation: sonarPing 2s ease-out infinite;
        }
        @keyframes sonarPing {
          0%   { left: 0%;box-shadow: 0 0 6px rgba(56,189,248,0.8);}
          100% { left: 100%;box-shadow: 0 0 0px rgba(56,189,248,0);}
        }

        .faq-answer-inner p {
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(125,211,252,0.65);
        }

        /* Kelp dividers between items */
        .faq-kelp-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 22px;
          gap: 6px;
          opacity: 0.4;
        }
        .faq-kelp-divider span {
          display: block;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(to top, rgba(56,189,248,0.6), transparent);
          animation: kelpWave var(--kd,3s) ease-in-out var(--kdel,0s) infinite alternate;
        }
        @keyframes kelpWave {
          0%   { transform: rotate(-4deg) scaleY(0.85);}
          100% { transform: rotate(4deg)  scaleY(1.15);}
        }

        /* CTA card */
        .faq-cta-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          padding: 2.5rem;
          background: linear-gradient(
            135deg,
            rgba(3,70,130,0.55) 0%,
            rgba(4,18,36,0.92) 100%
          );
          border: 1px solid rgba(56,189,248,0.35);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 0 50px rgba(14,165,233,0.12);
        }
        .faq-cta-card::before {
          content: '';
          position: absolute;
          top: -30%;left: -10%;
          width: 55%;height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.1), transparent 65%);
          pointer-events: none;
        }

        /* Pressure-depth strip (decorative left border) */
        .faq-depth-strip {
          position: absolute;
          left: 0;top: 20%;bottom: 20%;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--item-color),
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s;
        }
        .faq-deep-item:hover .faq-depth-strip { opacity: 0.6;}

        @media (prefers-reduced-motion: reduce) {
          .faq-ray, .faq-bg-bubble, .faq-octopus, .faq-manta,
          .faq-seaweed-l, .faq-seaweed-r, .faq-fish-ltr, .faq-fish-rtl,
          .faq-sonar-ping, .faq-bio-glow, .kelpWave
          { animation: none !important;}
        }

        .ct-register-btn {
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
        .ct-register-btn::before {
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
          transition: border-color 0.3s, box-shadow 0.3s;
          z-index: -1;
        }
        .ct-register-btn::after {
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
        .ct-register-btn:hover {
          transform: translateY(-4px) scale(1.04);
          filter: drop-shadow(0 10px 24px rgba(56,189,248,0.35));
        }
        .ct-register-btn:hover::before {
          border-color: rgba(255,255,255,0.45);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.32),
            0 8px 28px rgba(0,0,0,0.2),
            0 0 44px rgba(56,189,248,0.3);
        }
      `}</style>

      <section id="faq" ref={sectionRef} className="faq-section">
        {/* Light rays */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {RAYS.map((r, i) => (
            <div
              key={i}
              className="faq-ray"
              style={{
                position: "absolute",
                left: r.left,
                top: 0,
                width: "1.5px",
                height: r.h,
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
                transform: `rotate(${r.rot}deg)`,
                transformOrigin: "top center",
                "--rdur": r.dur,
                "--rdel": r.delay,
              }}
            />
          ))}
        </div>

        {/* Background rising bubbles */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ zIndex: 2, height: "100%" }}
        >
          {BG_BUBBLES.map((b) => (
            <div
              key={b.id}
              className="faq-bg-bubble absolute rounded-full"
              style={{
                width: b.size,
                height: b.size,
                left: b.left,
                bottom: "-2%",
                "--dur": b.dur,
                "--del": b.delay,
                "--bx": b.bx,
                background:
                  "radial-gradient(circle at 34% 27%, rgba(255,255,255,0.52), transparent 60%)",
                border: "1px solid rgba(125,211,252,0.2)",
              }}
            />
          ))}
        </div>

        {/* Fish swimming through */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 2 }}
        >
          <div
            style={{
              position: "absolute",
              top: "22%",
              left: 0,
              width: "100%",
              height: "100px",
              isolation: "isolate",
            }}
          >
            <img
              src="/images/fish-school.png"
              alt=""
              className="faq-fish-ltr"
              style={{
                width: 160,
                height: "auto",
                opacity: 0.12,
                filter: "drop-shadow(0 0 8px rgba(56,189,248,.22))",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "72%",
              left: 0,
              width: "100%",
              height: "80px",
              isolation: "isolate",
            }}
          >
            <img
              src="/images/fish-school.png"
              alt=""
              className="faq-fish-rtl"
              style={{
                width: 120,
                height: "auto",
                opacity: 0.1,
                filter: "drop-shadow(0 0 6px rgba(56,189,248,.18))",
              }}
            />
          </div>
        </div>

        {/* Decorative creatures */}
        <img
          ref={octopusRef}
          src="/images/octopus.png"
          alt=""
          className="faq-octopus pointer-events-none absolute"
          style={{
            zIndex: 3,
            right: "2%",
            top: "8%",
            width: "min(110px,16vw)",
            opacity: 0,
            filter: "drop-shadow(0 0 20px rgba(56,189,248,0.4))",
          }}
        />
        <img
          ref={mantaRef}
          src="/images/manta.png"
          alt=""
          className="faq-manta pointer-events-none absolute hidden lg:block"
          style={{
            zIndex: 3,
            left: "1%",
            bottom: "30%",
            width: "min(180px,18vw)",
            opacity: 0,
            filter: "drop-shadow(0 0 16px rgba(56,189,248,0.25))",
          }}
        />

        {/* Jellyfish decorations */}
        <img
          src="/images/jelly-teal.png"
          alt=""
          className="pointer-events-none absolute hidden md:block"
          style={{
            zIndex: 3,
            left: "3%",
            top: "15%",
            width: "min(70px,10vw)",
            opacity: 0.55,
            filter: "drop-shadow(0 0 14px rgba(56,189,248,0.35))",
            animation: "faqJellyFloat 9s ease-in-out 3s infinite",
          }}
        />
        <img
          src="/images/jelly-gold__1_.png"
          alt=""
          className="pointer-events-none absolute hidden lg:block"
          style={{
            zIndex: 3,
            right: "3.5%",
            bottom: "25%",
            width: "min(65px,9vw)",
            opacity: 0.5,
            filter: "drop-shadow(0 0 12px rgba(234,179,8,0.28))",
            animation: "faqJellyFloat 7s ease-in-out 1.5s infinite",
          }}
        />

        {/* Seaweed base */}
        <img
          src="/images/seaweed-left.png"
          alt=""
          className="faq-seaweed-l pointer-events-none absolute bottom-0 left-0"
          style={{
            zIndex: 4,
            height: "28vh",
            width: "auto",
            maxWidth: 80,
            opacity: 0.55,
          }}
        />
        <img
          src="/images/seaweed-right.png"
          alt=""
          className="faq-seaweed-r pointer-events-none absolute bottom-0 right-0"
          style={{
            zIndex: 4,
            height: "25vh",
            width: "auto",
            maxWidth: 75,
            opacity: 0.5,
          }}
        />
        <img
          src="/images/coral-left.png"
          alt=""
          className="pointer-events-none absolute bottom-0 left-8 hidden sm:block"
          style={{ zIndex: 4, height: "16vh", width: "auto", opacity: 0.6 }}
        />
        <img
          src="/images/coral-right.png"
          alt=""
          className="pointer-events-none absolute bottom-0 right-8 hidden sm:block"
          style={{ zIndex: 4, height: "16vh", width: "auto", opacity: 0.6 }}
        />

        {/* Caustic light overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 1,
            background: `
            radial-gradient(ellipse 60% 45% at 80% 20%, rgba(34,211,238,0.07) 0%, transparent 58%),
            radial-gradient(ellipse 50% 40% at 15% 70%, rgba(14,165,233,0.06) 0%, transparent 52%),
            radial-gradient(ellipse 90% 50% at 50% 0%,  rgba(56,189,248,0.05) 0%, transparent 45%)
          `,
          }}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 5,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(4,17,31,0.02) 0%, rgba(4,17,31,0.5) 90%)",
          }}
        />

        {/*  CONTENT  */}
        <div
          className="relative mx-auto max-w-3xl px-4 sm:px-6"
          style={{ zIndex: 10 }}
        >
          {/* Header */}
          <div ref={headerRef} className="text-center mb-14">
            <div className="faq-eyebrow mb-4 flex items-center justify-center gap-2">
              <span
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(56,189,248,0.5))",
                }}
              />
              <span
                className="font-body text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: "#5ecfff" }}
              >
                <i className="fa-solid fa-circle-question mr-2" aria-hidden />
                Deep Dive · FAQs
              </span>
              <span
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(56,189,248,0.5))",
                }}
              />
            </div>

            <h2
              className="faq-headline font-nature leading-[1.06] mb-5"
              style={{
                fontSize: "clamp(2.2rem,5.5vw,3.8rem)",
                color: "#e8fbff",
                textShadow: "0 0 50px rgba(14,165,233,0.35)",
              }}
            >
              Questions from the{" "}
              <span
                className="text-gradient-ocean"
                style={{ textShadow: "none" }}
              >
                deep.
              </span>
            </h2>

            <p
              className="faq-subtext font-body text-center mx-auto max-w-xl text-base leading-relaxed"
              style={{ color: "rgba(186,230,252,0.72)" }}
            >
              We've surfaced the most common ones below. Still have something
              bubbling up?{" "}
              <a
                href="#contact"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "#38bdf8" }}
              >
                Send us a message.
              </a>
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="flex flex-col gap-2.5 mb-14">
            {faqs.map((f, i) => (
              <React.Fragment key={i}>
                <div
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                >
                  {/* Depth-strip on left edge */}
                  <div
                    className="faq-deep-item"
                    style={{ "--item-color": f.color }}
                  >
                    <div className="faq-depth-strip" />
                    <div className="faq-rivets" aria-hidden>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    {openIdx === i && (
                      <div className="faq-bio-glow" aria-hidden />
                    )}

                    <button
                      className="faq-trigger"
                      onClick={() => toggle(i)}
                      aria-expanded={openIdx === i}
                    >
                      <span
                        className="faq-porthole"
                        style={{ "--item-color": f.color }}
                      >
                        <i
                          className={`fa-solid ${f.icon}`}
                          style={{ color: f.color, fontSize: 12 }}
                          aria-hidden
                        />
                      </span>
                      <span className="faq-question">{f.q}</span>
                      <span
                        className={`faq-gauge ${openIdx === i ? "faq-gauge--open" : ""}`}
                        aria-hidden
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="8"
                            stroke={f.color}
                            strokeOpacity="0.4"
                            strokeWidth="1"
                          />
                          <path
                            d={
                              openIdx === i
                                ? "M5 11 L9 7 L13 11"
                                : "M5 7 L9 11 L13 7"
                            }
                            stroke={f.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Animated answer panel */}
                    <AnswerPanel
                      isOpen={openIdx === i}
                      color={f.color}
                      answer={f.a}
                    />
                  </div>
                </div>

                {/* Kelp strand divider between items (not after last) */}
                {i < faqs.length - 1 && (
                  <div className="faq-kelp-divider" aria-hidden>
                    {[18, 12, 22, 10, 16, 8, 20].map((h, ki) => (
                      <span
                        key={ki}
                        style={{
                          height: h,
                          "--kd": `${2.2 + ki * 0.3}s`,
                          "--kdel": `${ki * 0.18}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA card */}
          <div className="faq-cta-card">
            <div
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 10% 50%, rgba(56,189,248,0.1), transparent 60%)",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-7">
              <img
                src="/images/crab.png"
                alt="ATLAS Crab"
                style={{
                  height: 110,
                  width: "auto",
                  flexShrink: 0,
                  filter: "drop-shadow(0 0 20px rgba(249,115,22,0.35))",
                  animation: "faqJellyFloat 6s ease-in-out infinite",
                }}
              />
              <div>
                <p
                  className="font-nature mb-2"
                  style={{
                    fontSize: "clamp(1.5rem,3vw,2rem)",
                    color: "#e8fbff",
                    textShadow: "0 0 30px rgba(14,165,233,0.3)",
                  }}
                >
                  Still have questions?
                </p>
                <p
                  className="font-body text-sm mb-5"
                  style={{ color: "rgba(125,211,252,0.65)" }}
                >
                  Our crab is busy debugging. But the humans on the team are
                  happy to chat.
                </p>
                <a href="#contact" className="ct-register-btn">
                  <span>
                    <i className="fa-solid fa-envelope mr-2" aria-hidden />
                    Get in touch
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave into footer */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full"
          style={{ zIndex: 12 }}
        >
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block w-full"
            style={{ height: "clamp(55px,7vw,95px)" }}
          >
            <path
              d="M0,45 C280,100 560,5 840,52 C1060,85 1260,15 1440,45 L1440,100 L0,100 Z"
              fill="#040f1a"
            />
          </svg>
        </div>
      </section>
    </>
  );
}

// Separate component so GSAP can target its DOM node cleanly
function AnswerPanel({ isOpen, color, answer }) {
  const ref = useRef(null);
  const prevOpen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isOpen && !prevOpen.current) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.42, ease: "power3.out" },
      );
    } else if (!isOpen && prevOpen.current) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.32, ease: "power2.in" });
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  return (
    <div ref={ref} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
      <div
        style={{
          padding: "0 1.5rem 1.35rem",
          paddingLeft: "calc(1.5rem + 34px + 1rem)",
        }}
      >
        {/* Sonar sweep line */}
        <div
          style={{
            position: "relative",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.22), transparent)",
            marginBottom: "0.9rem",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 7px ${color}`,
              animation: "sonarPing 2.5s ease-out infinite",
            }}
          />
        </div>
        <p
          className="font-body"
          style={{
            fontSize: "0.84rem",
            lineHeight: 1.72,
            color: "rgba(125,211,252,0.65)",
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}
