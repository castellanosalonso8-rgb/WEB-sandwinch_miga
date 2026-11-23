import { AnimProvider } from './AnimContext.jsx'
import { Footer, FloatingWhatsApp, Header } from './components/Chrome.jsx'
import Hero from './components/Hero.jsx'
import { Marquee, SandwichTransition } from './components/Effects.jsx'
import { Condiciones, Contacto, EnLocal, Faq, Funciona, Lugar, Sandwiches } from './components/Sections.jsx'
import { seccionActiva } from './utils.js'

export default function App() {
  const on = seccionActiva
  return (
    <AnimProvider>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        {on('hero') && <Hero />}
        <Marquee />
        {on('sandwiches') && <Sandwiches />}
        {on('enLocal') && <EnLocal />}
        {on('funciona') && <Funciona />}
        {on('condiciones') && <Condiciones />}
        {on('faq') && <Faq />}
        {on('lugar') && <Lugar />}
        {on('contacto') && <Contacto />}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SandwichTransition />
    </AnimProvider>
  )
}
