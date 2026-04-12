import React from 'react'
import Navbar   from './components/Navbar.jsx'
import Hero     from './sections/Hero.jsx'
import About    from './sections/About.jsx'
import WhyJoin  from './sections/WhyJoin.jsx'
import Schedule from './sections/Schedule.jsx'
import FAQ      from './sections/FAQ.jsx'
import Contact  from './sections/Contact.jsx'
import Footer   from './sections/Footer.jsx'
import Bubbles from './components/Bubbles.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(180deg, #071e33 0%, #0c4a6e 50%, #071e33 100%)' }}>
      {/* Ambient floating bubbles overlay */}
      <Bubbles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyJoin />
        <Schedule />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}