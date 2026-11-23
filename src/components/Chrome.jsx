import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../content/site.config.js'
import { useAnim } from '../AnimContext.jsx'
import { Logo, WaIcon } from './Common.jsx'
import { instagramUrl, ordenSecciones, seccionActiva, waLink } from '../utils.js'

export function Header() {
  const { navigateTo, reduced } = useAnim()
  const [abierto, setAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activas = ordenSecciones.filter((id) => seccionActiva(id) && config.menu[id])

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => {
    if (!abierto) return
    const f = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', f)
    return () => window.removeEventListener('keydown', f)
  }, [abierto])

  const ir = (e, id) => {
    e.preventDefault()
    setAbierto(false)
    navigateTo(id)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="wrap header__bar">
        <a
          href="#inicio"
          className="header__brand"
          aria-label={`${config.sitio.nombre} – ir al inicio`}
          onClick={(e) => {
            e.preventDefault()
            setAbierto(false)
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
          }}
        >
          <Logo height={44} />
          <span className="header__name">
            <strong>{config.sitio.nombre}</strong>
            <small>{config.sitio.subtitulo}</small>
          </span>
        </a>

        <nav className="header__nav" aria-label="Principal">
          {config.menuEscritorio
            .filter((id) => seccionActiva(id))
            .map((id) => (
              <a key={id} href={`#${id}`} onClick={(e) => ir(e, id)}>
                {config.menu[id]}
              </a>
            ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="burger"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setAbierto((v) => !v)}
          >
            <span className={`burger__ico ${abierto ? 'is-open' : ''}`} aria-hidden="true">
              <i /><i /><i />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.nav
            id="menu-movil"
            className="mobmenu"
            aria-label="Menú"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <ul>
              {activas.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => ir(e, id)}>
                    {config.menu[id]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export function FloatingWhatsApp() {
  const { on } = useAnim()
  if (!config.contacto.botonFlotante) return null
  return (
    <a
      className={`fab ${on.pulsoWhatsApp ? 'fab--pulse' : ''}`}
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <WaIcon size={30} />
    </a>
  )
}

export function Footer() {
  const c = config.contacto
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo height={64} />
          <p>{config.footer.texto}</p>
        </div>
        <div className="footer__links">
          {c.instagram ? (
            <a href={instagramUrl(c.instagram)} target="_blank" rel="noopener noreferrer">
              Instagram @{c.instagram}
            </a>
          ) : null}
        </div>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} {config.sitio.nombre} – {config.sitio.subtitulo}. {config.footer.derechos}
      </p>
    </footer>
  )
}
