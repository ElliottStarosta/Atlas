import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative pt-12 pb-8 border-t"
      style={{
        background: '#040f1a',
        borderColor: 'rgba(56,189,248,0.1)',
      }}
    >
      {/* Coral bottom decoration */}
      <div className="flex justify-between items-end pointer-events-none mb-6 px-4">
        <img
          src="/images/coral-left.png"
          alt=""
          style={{ height: 80, width: 'auto', opacity: 0.35 }}
        />
        <img
          src="/images/coral-right.png"
          alt=""
          style={{ height: 80, width: 'auto', opacity: 0.35 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <img
              src="/images/atlas-white.png"
              alt="ATLAS"
              style={{ height: 36, width: 'auto' }}
              className="mb-2 mx-auto md:mx-0"
            />
            <p className="text-aqua-light/40 font-body text-xs">
              EOM Hackathon Club · Earl of March Secondary School
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap gap-6 justify-center">
              {['About','Why Join','Schedule','FAQ','Contact'].map(l => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(' ', '-')}`}
                    className="text-aqua-light/50 hover:text-aqua-light text-xs font-body tracking-wide transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <span><i className="fa-solid fa-anchor mr-2" />Register — May 2nd</span>
          </a>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-aqua-light/25 font-body text-xs">
            &copy; {year} ATLAS Hackathon · Earl of March Secondary School, Kanata, ON
          </p>
          <p className="text-aqua-light/20 font-body text-xs flex items-center gap-1">
            <i className="fa-solid fa-fish text-deep-teal" />
            Made with code &amp; caffeine
          </p>
        </div>
      </div>
    </footer>
  )
}