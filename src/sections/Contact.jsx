import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdypevz";

const BUBBLES = [
  { size: 6, left: "6%", delay: "0s", dur: "8s" },
  { size: 4, left: "18%", delay: "1.5s", dur: "10s" },
  { size: 9, left: "32%", delay: "0.4s", dur: "7s" },
  { size: 5, left: "51%", delay: "2.8s", dur: "9s" },
  { size: 7, left: "67%", delay: "0.9s", dur: "8.5s" },
  { size: 4, left: "79%", delay: "1.9s", dur: "11s" },
  { size: 6, left: "91%", delay: "3.3s", dur: "7.5s" },
  { size: 3, left: "44%", delay: "4.1s", dur: "9.5s" },
  { size: 5, left: "24%", delay: "5.2s", dur: "6.5s" },
  { size: 8, left: "87%", delay: "0.2s", dur: "12s" },
];

const RAYS = [
  { left: "8%", rot: 4, del: "0s", dur: "5s" },
  { left: "24%", rot: -3, del: "1.7s", dur: "6.5s" },
  { left: "48%", rot: 2, del: "0.8s", dur: "4.8s" },
  { left: "72%", rot: -4, del: "2.4s", dur: "7s" },
  { left: "90%", rot: 3, del: "1.1s", dur: "5.5s" },
];

const CREATURES = [
  {
    src: "/images/jelly-pink.png",
    cls: "ct-float-a",
    style: { right: "3%", top: "12%", width: "min(110px,18vw)" },
    opacity: 0.75,
  },
  {
    src: "/images/jelly-teal.png",
    cls: "ct-float-b",
    style: { left: "2%", top: "38%", width: "min(80px,14vw)" },
    opacity: 0.65,
  },
  {
    src: "/images/octopus.png",
    cls: "ct-float-c",
    style: { right: "8%", top: "52%", width: "min(90px,15vw)" },
    opacity: 0.5,
  },
  {
    src: "/images/jelly-gold.png",
    cls: "ct-float-a",
    style: { left: "5%", top: "70%", width: "min(70px,12vw)" },
    opacity: 0.6,
  },
];

const INFO_ITEMS = [
  {
    icon: "fa-location-dot",
    label: "Location",
    value: "Earl of March S.S., Kanata, ON",
  },
  {
    icon: "fa-calendar-days",
    label: "Date",
    value: "May 2, 2026 · 8 AM – 8 PM",
  },
  {
    icon: "fa-envelope",
    label: "Email",
    value: "earlhackclub@gmail.com",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formCardRef = useRef(null);
  const infoRef = useRef(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");// idle | sending | success | error
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.set([".ct-eyebrow", ".ct-headline", ".ct-sub"], {
      opacity: 0,
      y: 32,
      force3D: true,
    });
    gsap.set(formCardRef.current, { opacity: 0, y: 40, force3D: true });
    gsap.set(infoRef.current, { opacity: 0, x: 30, force3D: true });

    const ctx = gsap.context(() => {
      // Header stagger
      gsap.to([".ct-eyebrow", ".ct-headline", ".ct-sub"], {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 84%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        force3D: true,
      });

      // Form card slides up
      gsap.to(formCardRef.current, {
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 88%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        force3D: true,
      });

      // Info panel slides in from right
      gsap.to(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 88%",
          once: true,
        },
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.2,
        force3D: true,
      });

      // Creature parallax
      section.querySelectorAll(".ct-creature").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -55 : 55,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // Animate the button
    gsap.to(".ct-submit-btn", {
      scale: 0.97,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
    });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
        // Success ripple animation
        gsap.fromTo(
          ".ct-success-msg",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        /* Bubble rise */
        @keyframes ctBubbleRise {
          0%   { transform: translate3d(0, 0, 0);                 opacity: 0;  }
          8%   {                                                    opacity: 0.55;}
          90%  {                                                    opacity: 0.35;}
          100% { transform: translate3d(var(--bx, 5px), -100vh, 0);opacity: 0;}
        }
        .ct-bubble {
          animation: ctBubbleRise var(--dur,9s) ease-in var(--del,0s) infinite;
          will-change: transform, opacity;
        }

        /* Ray shimmer */
        @keyframes ctRay {
          0%,100% { opacity: 0.08;}
          50%     { opacity: 0.22;}
        }
        .ct-ray { animation: ctRay var(--rdur,5s) ease-in-out var(--rdel,0s) infinite;}

        /* Creature floats */
        @keyframes ctFloatA {
          0%,100% { transform: translateY(0px) rotate(-3deg);}
          50%     { transform: translateY(-20px) rotate(3deg);}
        }
        @keyframes ctFloatB {
          0%,100% { transform: translateY(0px) rotate(2deg);}
          50%     { transform: translateY(-26px) rotate(-2deg);}
        }
        @keyframes ctFloatC {
          0%,100% { transform: translateY(0px) rotate(-1.5deg);}
          50%     { transform: translateY(-16px) rotate(2deg);}
        }
        .ct-float-a { animation: ctFloatA 7s ease-in-out infinite;will-change: transform;}
        .ct-float-b { animation: ctFloatB 9s ease-in-out infinite;will-change: transform;}
        .ct-float-c { animation: ctFloatC 6s ease-in-out infinite;will-change: transform;}

        /* Input field */
        .ct-input {
          width: 100%;
          background: rgba(3, 30, 58, 0.55);
          border: 1.5px solid rgba(56, 189, 248, 0.2);
          border-radius: 14px;
          padding: 0.85rem 1.1rem;
          color: #e0f7ff;
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          -webkit-appearance: none;
        }
        .ct-input::placeholder { color: rgba(125, 211, 252, 0.35);}
        .ct-input:focus {
          border-color: rgba(56, 189, 248, 0.7);
          background: rgba(3, 40, 76, 0.65);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12), 0 0 24px rgba(56, 189, 248, 0.1);
        }
        .ct-input.is-filled {
          border-color: rgba(167, 243, 208, 0.45);
        }
        textarea.ct-input { resize: none;min-height: 130px;line-height: 1.6;}

        /* Label */
        .ct-label {
          display: block;
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(125, 211, 252, 0.55);
          margin-bottom: 0.45rem;
          transition: color 0.2s;
        }
        .ct-field:focus-within .ct-label {
          color: rgba(56, 189, 248, 0.9);
        }

        /* Field focus ring glow */
        .ct-field {
          position: relative;
        }
        .ct-field::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 15px;
          background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(167,243,208,0.1));
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s;
          z-index: -1;
        }
        .ct-field:focus-within::after { opacity: 1;}

        /* Submit button */
        .ct-submit-btn {
          position: relative;
          width: 100%;
          padding: 0.95rem 2rem;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
          color: #f0fbff;
          font-family: 'Poppins', system-ui, sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .ct-submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .ct-submit-btn:hover:not(:disabled)::before { opacity: 1;}
        .ct-submit-btn:hover:not(:disabled) {
          box-shadow: 0 0 36px rgba(14,165,233,0.55), 0 6px 20px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .ct-submit-btn:disabled { opacity: 0.65;cursor: not-allowed;}
        .ct-submit-btn span { position: relative;z-index: 1;}

        /* Sending spinner */
        @keyframes ctSpin {
          to { transform: rotate(360deg);}
        }
        .ct-spinner {
          width: 16px;height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ctSpin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Info card item */
        .ct-info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(56,189,248,0.1);
        }
        .ct-info-item:last-of-type { border-bottom: none;}
        .ct-info-icon {
          width: 40px;height: 40px;
          border-radius: 12px;
          display: flex;align-items: center;justify-content: center;
          background: rgba(3,80,140,0.4);
          border: 1px solid rgba(56,189,248,0.28);
          flex-shrink: 0;
          font-size: 0.85rem;
          color: rgba(56,189,248,0.85);
          box-shadow: 0 0 14px rgba(56,189,248,0.15);
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .ct-info-item:hover .ct-info-icon {
          box-shadow: 0 0 24px rgba(56,189,248,0.35);
          border-color: rgba(56,189,248,0.55);
        }

        /* Depth backdrop on form card */
        .ct-card-shimmer {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.03) 50%,
            transparent 60%
          );
          background-size: 200% auto;
          animation: ctCardShimmer 4s linear infinite;
          pointer-events: none;
        }
        @keyframes ctCardShimmer {
          0%   { background-position: -200% center;}
          100% { background-position:  200% center;}
        }

        /* Seabed sway */
        @keyframes ctSway {
          0%,100% { transform: rotate(-6deg);}
          50%     { transform: rotate(6deg); }
        }
        @keyframes ctSwayR {
          0%,100% { transform: rotate(6deg); }
          50%     { transform: rotate(-6deg);}
        }
        .ct-sway  { transform-origin: bottom center;animation: ctSway  5.5s ease-in-out infinite;}
        .ct-sway2 { transform-origin: bottom center;animation: ctSwayR 7s ease-in-out infinite;}

        /* Fish drift */
        @keyframes ctFishDrift {
          0%   { transform: translateX(-220px);opacity: 0;}
          6%   { opacity: 0.5;}
          94%  { opacity: 0.45;}
          100% { transform: translateX(calc(100vw + 240px));opacity: 0;}
        }
        .ct-fish { animation: ctFishDrift 30s linear 4s infinite;will-change: transform;}

        @media (prefers-reduced-motion: reduce) {
          .ct-bubble, .ct-ray, .ct-float-a, .ct-float-b, .ct-float-c,
          .ct-sway, .ct-sway2, .ct-fish, .ct-card-shimmer { animation: none !important;}
        }

        
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #071e33 0%, #061626 25%, #07202e 55%, #071e33 100%)",
          paddingTop: "clamp(4rem,8vw,7rem)",
          paddingBottom: "clamp(5rem,10vw,9rem)",
        }}
      >
        {/* Caustic light overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
              radial-gradient(ellipse 55% 45% at 80% 20%, rgba(34,211,238,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 15% 70%, rgba(14,165,233,0.06) 0%, transparent 58%),
              radial-gradient(ellipse 70% 55% at 50%  5%, rgba(56,189,248,0.05) 0%, transparent 52%)
            `,
            }}
          />
        </div>

        {/* Light rays */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {RAYS.map((r, i) => (
            <div
              key={i}
              className="ct-ray"
              style={{
                position: "absolute",
                left: r.left,
                top: 0,
                width: "1.5px",
                height: "65%",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
                transform: `rotate(${r.rot}deg)`,
                transformOrigin: "top center",
                "--rdur": r.dur,
                "--rdel": r.del,
              }}
            />
          ))}
        </div>

        {/* Rising bubbles */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ zIndex: 2, height: "100%" }}
        >
          {BUBBLES.map((b, i) => (
            <div
              key={i}
              className="ct-bubble absolute rounded-full"
              style={{
                width: b.size,
                height: b.size,
                left: b.left,
                bottom: "-2%",
                "--dur": b.dur,
                "--del": b.delay,
                "--bx": i % 2 === 0 ? "6px" : "-5px",
                background:
                  "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.55), transparent 62%)",
                border: "1px solid rgba(125,211,252,0.28)",
              }}
            />
          ))}
        </div>

        {/* Floating creatures */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 3 }}
        >
          {CREATURES.map((c, i) => (
            <img
              key={i}
              src={c.src}
              alt=""
              className={`ct-creature ${c.cls} absolute`}
              style={{
                ...c.style,
                height: "auto",
                opacity: c.opacity,
                filter: "drop-shadow(0 0 16px rgba(56,189,248,0.32))",
              }}
            />
          ))}
        </div>

        {/* Small drifting fish */}
        <div
          className="pointer-events-none absolute"
          style={{ zIndex: 3, bottom: "30%", left: 0, width: "100%" }}
        >
          <img
            src="/images/fish-school.png"
            alt=""
            className="ct-fish"
            style={{
              width: 200,
              maxWidth: "40vw",
              height: "auto",
              opacity: 0.45,
              filter: "drop-shadow(0 0 8px rgba(56,189,248,0.22))",
            }}
          />
        </div>

        {/* Seabed */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full"
          style={{ zIndex: 4 }}
        >
          <img
            src="/images/seaweed-left.png"
            alt=""
            className="ct-sway  absolute bottom-0 left-0 hidden sm:block"
            style={{
              height: "clamp(60px,9vh,110px)",
              width: "auto",
              opacity: 0.5,
            }}
          />
          <img
            src="/images/seaweed-right.png"
            alt=""
            className="ct-sway2 absolute bottom-0 right-0 hidden sm:block"
            style={{
              height: "clamp(55px,8vh,100px)",
              width: "auto",
              opacity: 0.45,
            }}
          />
          <img
            src="/images/coral-left.png"
            alt=""
            className="absolute bottom-0 left-8 hidden md:block"
            style={{
              height: "clamp(40px,6vh,75px)",
              width: "auto",
              opacity: 0.5,
            }}
          />
          <img
            src="/images/coral-right.png"
            alt=""
            className="absolute bottom-0 right-8 hidden md:block"
            style={{
              height: "clamp(40px,6vh,75px)",
              width: "auto",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 3,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(7,30,51,0.04) 0%, rgba(7,30,51,0.5) 90%)",
          }}
        />

        {/*  CONTENT  */}
        <div
          className="relative mx-auto max-w-6xl px-4 sm:px-6"
          style={{ zIndex: 10 }}
        >
          {/* Header */}
          <div ref={headerRef} className="text-center mb-14">
            <div className="ct-eyebrow mb-4 flex items-center justify-center gap-2">
              <span
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to right,transparent,rgba(56,189,248,0.5))",
                }}
              />
              <span
                className="font-body text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: "#5ecfff" }}
              >
                <i className="fa-solid fa-envelope mr-2" aria-hidden />
                Get In Touch
              </span>
              <span
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to left,transparent,rgba(56,189,248,0.5))",
                }}
              />
            </div>

            <h2
              className="ct-headline font-nature leading-[1.06] mb-4"
              style={{
                fontSize: "clamp(2.2rem,5.5vw,3.8rem)",
                color: "#e8fbff",
                textShadow: "0 0 50px rgba(14,165,233,0.35)",
              }}
            >
              Send us a{" "}
              <span
                className="text-gradient-ocean"
                style={{ textShadow: "none" }}
              >
                message.
              </span>
            </h2>

            <p
              className="ct-sub font-body text-base leading-relaxed mx-auto"
              style={{ color: "rgba(186,230,252,0.68)", maxWidth: "44ch" }}
            >
              Questions, partnerships, or just want to say hey;we surface for
              every message.
            </p>
          </div>

          {/* 2-column layout */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
            {/* FORM CARD */}
            <div
              ref={formCardRef}
              className="relative rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  "linear-gradient(150deg, rgba(3,65,120,0.42) 0%, rgba(4,18,38,0.88) 100%)",
                border: "1.5px solid rgba(56,189,248,0.25)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 48px rgba(0,0,0,0.4), 0 0 60px rgba(14,165,233,0.06)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* card shimmer */}
              <div className="ct-card-shimmer" />

              {/* Specular highlight */}
              <div
                className="pointer-events-none absolute rounded-[28px]"
                style={{
                  inset: 0,
                  background:
                    "radial-gradient(ellipse 65% 35% at 25% 8%, rgba(255,255,255,0.1) 0%, transparent 55%)",
                }}
              />

              {/* Success state */}
              {status === "success" ? (
                <div className="ct-success-msg flex flex-col items-center justify-center gap-5 py-14 text-center">
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 38% 30%, rgba(167,243,208,0.25), transparent 65%)",
                      border: "1.5px solid rgba(167,243,208,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 30px rgba(167,243,208,0.3)",
                    }}
                  >
                    <i
                      className="fa-solid fa-check text-2xl"
                      style={{ color: "#a7f3d0" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-nature mb-2"
                      style={{
                        fontSize: "clamp(1.5rem,3vw,2rem)",
                        color: "#e8fbff",
                        textShadow: "0 0 30px rgba(14,165,233,0.35)",
                      }}
                    >
                      Message received!
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: "rgba(125,211,252,0.6)" }}
                    >
                      We'll get back to you as soon as we surface.
                    </p>
                  </div>
                  <img
                    src="/images/jelly-teal.png"
                    alt=""
                    style={{
                      width: 70,
                      height: "auto",
                      opacity: 0.7,
                      filter: "drop-shadow(0 0 18px rgba(56,189,248,0.4))",
                      animation: "ctFloatA 7s ease-in-out infinite",
                    }}
                  />
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-body text-xs uppercase tracking-[0.2em] transition-colors"
                    style={{
                      color: "rgba(56,189,248,0.55)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#7dd3fc")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(56,189,248,0.55)")
                    }
                  >
                    <i className="fa-solid fa-arrow-left mr-2" />
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div className="ct-field">
                      <label htmlFor="ct-name" className="ct-label">
                        <i className="fa-solid fa-user mr-1.5" aria-hidden />
                        Name
                      </label>
                      <input
                        id="ct-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={`ct-input ${formState.name ? "is-filled" : ""}`}
                      />
                    </div>

                    {/* Email */}
                    <div className="ct-field">
                      <label htmlFor="ct-email" className="ct-label">
                        <i
                          className="fa-solid fa-envelope mr-1.5"
                          aria-hidden
                        />
                        Email
                      </label>
                      <input
                        id="ct-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={`ct-input ${formState.email ? "is-filled" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="ct-field mb-5">
                    <label htmlFor="ct-subject" className="ct-label">
                      <i className="fa-solid fa-tag mr-1.5" aria-hidden />
                      Subject
                    </label>
                    <input
                      id="ct-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What's this about?"
                      value={formState.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      className={`ct-input ${formState.subject ? "is-filled" : ""}`}
                    />
                  </div>

                  {/* Message */}
                  <div className="ct-field mb-6">
                    <label htmlFor="ct-message" className="ct-label">
                      <i
                        className="fa-solid fa-comment-dots mr-1.5"
                        aria-hidden
                      />
                      Message
                    </label>
                    <textarea
                      id="ct-message"
                      name="message"
                      required
                      placeholder="Drop your question, idea, or anything on your mind..."
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`ct-input ${formState.message ? "is-filled" : ""}`}
                    />
                  </div>

                  {/* Error state */}
                  {status === "error" && (
                    <p
                      className="font-body text-xs mb-4 flex items-center gap-2"
                      style={{ color: "#f97316" }}
                    >
                      <i
                        className="fa-solid fa-triangle-exclamation"
                        aria-hidden
                      />
                      Something went wrong;check your Formspree endpoint and
                      try again.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="ct-submit-btn"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <span className="ct-spinner" />
                        <span>Sending…</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-paper-plane" aria-hidden />
                        Send message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* INFO PANEL */}
            <div ref={infoRef} className="flex flex-col gap-5">
              {/* Contact info card */}
              <div
                className="relative rounded-[24px] p-6"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(3,55,105,0.38) 0%, rgba(4,15,32,0.85) 100%)",
                  border: "1px solid rgba(56,189,248,0.22)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="pointer-events-none absolute rounded-[24px]"
                  style={{
                    inset: 0,
                    background:
                      "radial-gradient(ellipse 70% 40% at 85% 10%, rgba(255,255,255,0.08) 0%, transparent 55%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/35"
                      style={{ background: "rgba(3,105,161,0.45)" }}
                    >
                      <i
                        className="fa-solid fa-anchor text-xs text-aqua-mid"
                        aria-hidden
                      />
                    </span>
                    <span
                      className="font-body text-xs font-semibold uppercase tracking-[0.22em]"
                      style={{ color: "rgba(125,211,252,0.55)" }}
                    >
                      Find us here
                    </span>
                  </div>

                  <div>
                    {INFO_ITEMS.map((item, i) => (
                      <div key={i} className="ct-info-item">
                        <div className="ct-info-icon">
                          <i className={`fa-solid ${item.icon}`} aria-hidden />
                        </div>
                        <div>
                          <p
                            className="font-body text-[10px] uppercase tracking-[0.2em] mb-0.5"
                            style={{ color: "rgba(56,189,248,0.45)" }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="font-body text-sm"
                            style={{
                              color: "rgba(224,247,255,0.8)",
                              lineHeight: 1.4,
                            }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick question prompts */}
              <div
                className="relative rounded-[24px] p-6"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(2,40,80,0.35) 0%, rgba(3,12,28,0.82) 100%)",
                  border: "1px solid rgba(56,189,248,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p
                  className="font-body text-xs font-semibold uppercase tracking-[0.22em] mb-4"
                  style={{ color: "rgba(125,211,252,0.5)" }}
                >
                  <i className="fa-solid fa-bolt mr-2" aria-hidden />
                  Quick questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Registration?",
                    "Team matching?",
                    "Sponsorship?",
                    "Volunteer?",
                    "Prizes?",
                    "Schedule?",
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          subject: q.replace("?", ""),
                        }))
                      }
                      className="font-body text-xs rounded-full px-3 py-1.5 transition-all duration-200"
                      style={{
                        background: "rgba(3,80,140,0.3)",
                        border: "1px solid rgba(56,189,248,0.22)",
                        color: "rgba(125,211,252,0.7)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(3,105,161,0.5)";
                        e.currentTarget.style.borderColor =
                          "rgba(56,189,248,0.5)";
                        e.currentTarget.style.color = "#e0f7ff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(3,80,140,0.3)";
                        e.currentTarget.style.borderColor =
                          "rgba(56,189,248,0.22)";
                        e.currentTarget.style.color = "rgba(125,211,252,0.7)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <p
                  className="font-body text-xs mt-3"
                  style={{ color: "rgba(125,211,252,0.75)" }}
                >
                  Tap a topic to pre-fill the subject field.
                </p>
              </div>

              {/* Octopus mascot deco */}
              <div className="hidden lg:flex justify-center pt-2">
                <img
                  src="/images/clown.png"
                  alt=""
                  className="ct-float-b"
                  style={{
                    width: 90,
                    height: "auto",
                    opacity: 0.65,
                    filter: "drop-shadow(0 0 18px rgba(249,115,22,0.3))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top wave (from FAQ/previous section) */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-full"
          style={{ zIndex: 5 }}
        >
          <svg
            viewBox="0 0 1440 70"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block w-full"
            style={{ height: "clamp(40px,5vw,70px)" }}
          >
            <path
              d="M0,35 C240,70 480,5 720,35 C960,65 1200,10 1440,35 L1440,0 L0,0 Z"
              fill="#071e33"
            />
          </svg>
        </div>

        {/* Bottom wave → footer */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full"
          style={{ zIndex: 12 }}
        >
          <svg
            viewBox="0 0 1440 110"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block w-full"
            style={{ height: "clamp(60px,8vw,100px)" }}
          >
            <path
              d="M0,60 C180,20 360,95 540,50 C720,8 900,85 1080,42 C1260,4 1360,62 1440,40 L1440,110 L0,110 Z"
              fill="rgba(4,10,22,0.45)"
            />
            <path
              d="M0,72 C220,28 440,105 660,58 C840,22 1020,90 1200,48 C1320,20 1400,68 1440,52 L1440,110 L0,110 Z"
              fill="#040f1a"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
