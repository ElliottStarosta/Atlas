import React, { useState } from 'react'
import WaveDivider from '../components/WaveDivider'

const faqs = [
  {
    q: 'Who can participate in ATLAS?',
    a: 'ATLAS is open to all students at Earl of March Secondary School and the surrounding Kanata area. No experience required — all skill levels and disciplines are welcome.',
  },
  {
    q: 'How much does it cost to join?',
    a: 'ATLAS is completely free to attend! We provide meals, snacks, and all the workspace you need. Just show up ready to build.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'Absolutely not. Designers, project managers, writers, artists — everyone has a role. The best teams have diverse skills. If you can think creatively and work with others, you belong here.',
  },
  {
    q: 'Can I come without a team?',
    a: 'Yes! We have a team-matching session at the start of the day. You can show up solo and we\'ll pair you with other participants. Teams are capped at 3 members.',
  },
  {
    q: 'What do I need to bring?',
    a: 'Bring your laptop, charger, and any software you\'ll need pre-installed. We\'ll provide everything else — including food, Wi-Fi, and a good time.',
  },
  {
    q: 'What kinds of projects can we build?',
    a: 'Anything goes — apps, games, hardware hacks, websites, tools, art installations. The theme is announced at 9 AM on the day of, so come with an open mind and flexible ideas.',
  },
  {
    q: 'Will there be mentors available?',
    a: 'Yes! Industry volunteers and experienced builders will be on-site from the moment hacking starts. They\'re there to help you ideate, debug, and push through blocks.',
  },
  {
    q: 'How are projects judged?',
    a: 'Projects are evaluated on creativity, technical execution, impact, and presentation. There are multiple prize categories including Best Overall, Best Design, and Most Creative.',
  },
  {
    q: 'What if I have dietary restrictions?',
    a: 'Let us know when you register! We do our best to accommodate all dietary needs for the provided meals and snacks.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx(prev => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #071e33 0%, #0c4a6e 60%, #071e33 100%)' }}
    >
      {/* Bubbles tile */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'url(/images/bubbles-tile.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '350px 350px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-teal font-body font-semibold mb-4">
            <i className="fa-solid fa-circle-question mr-2" />FAQs
          </p>
          <h2 className="font-nature text-4xl sm:text-5xl text-sky-blue mb-4">
            Got questions?
          </h2>
          <p className="text-aqua-light/70 font-body text-base">
            We've answered the most common ones below. Still curious?{' '}
            <a href="#contact" className="text-teal underline underline-offset-2 hover:text-aqua-light transition-colors">
              Drop us a message.
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2 mb-16">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="faq-item rounded-xl overflow-hidden"
              style={{ background: 'rgba(7,30,51,0.5)', border: '1px solid rgba(56,189,248,0.12)' }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                onClick={() => toggle(i)}
              >
                <span className="font-body font-semibold text-sky-blue text-sm sm:text-base group-hover:text-aqua-light transition-colors">
                  {f.q}
                </span>
                <i
                  className={`fa-solid fa-chevron-down text-aqua-mid text-sm flex-shrink-0 transition-transform duration-300 ${
                    openIdx === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div className={`faq-answer ${openIdx === i ? 'open' : ''}`}>
                <div className="px-6 pb-5">
                  <p className="text-aqua-light/70 font-body text-sm leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Crab CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-8 p-8 rounded-2xl"
             style={{ background: 'rgba(3,105,161,0.15)', border: '1px solid rgba(56,189,248,0.2)' }}>
          <img
            src="/images/crab.png"
            alt="ATLAS Crab mascot"
            className="jelly-float3 flex-shrink-0"
            style={{ height: 120, width: 'auto', filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.3))' }}
          />
          <div>
            <p className="font-nature text-2xl text-gradient-gold mb-2">
              Still have questions?
            </p>
            <p className="text-aqua-light/70 font-body text-sm mb-4">
              Our crab is busy coding, but the team is ready to chat.
            </p>
            <a href="#contact" className="btn-outline text-sm px-6 py-3">
              <i className="fa-solid fa-envelope mr-2" />Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <WaveDivider fill="#071e33" />
      </div>
    </section>
  )
}