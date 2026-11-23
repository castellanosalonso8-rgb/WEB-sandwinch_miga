import { motion } from 'framer-motion'
import config from '../content/site.config.js'
import { useAnim } from '../AnimContext.jsx'
import { Logo } from './Common.jsx'
import { SandwichArt } from './Art.jsx'
import { cm, imgUrl, resolveImg } from '../utils.js'

export default function Hero() {
  const { on, navigateTo } = useAnim()
  const s = config.sandwiches
  const heroImg = resolveImg(config.sitio.heroSandwich)

  // Entrada del sándwich: caída con rebote; si está apagada, fade suave
  const sandwichMotion = on.caida
    ? {
        initial: { y: -420, rotate: -12, opacity: 0 },
        animate: { y: 0, rotate: 0, opacity: 1 },
        transition: {
          y: { type: 'spring', stiffness: 130, damping: 9, mass: 1.1, delay: 0.2 },
          rotate: { type: 'spring', stiffness: 90, damping: 9, delay: 0.2 },
          opacity: { duration: 0.2, delay: 0.2 },
        },
      }
    : { initial: false }

  return (
    <>
      <section className="hero" id="inicio" aria-labelledby="hero-t">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <Logo height={96} className="hero__logo" />
            <h1 id="hero-t" className="hero__title">
              {config.sitio.nombre}
              <small>{config.sitio.subtitulo}</small>
            </h1>
            <p className="hero__lead">{config.sitio.eslogan}</p>
            <div className="hero__cta">
              <a
                className="btn"
                href="#sandwiches"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('sandwiches')
                }}
              >
                {config.textos.conocenos}
              </a>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__disc">
              <motion.div className="hero__sandwich" {...sandwichMotion}>
                {heroImg ? (
                  <img className="hero__img" src={imgUrl(heroImg)} alt="Sándwich de miga SANDO" decoding="async" />
                ) : (
                  <SandwichArt />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="strip" aria-label="Sabores y tamaños">
        <div className="wrap strip__grid">
          <div className="strip__col">
            <h2 className="strip__t">Sabores</h2>
            <ul className="strip__chips">
              {s.variedades.map((v) => (
                <li key={v.id}>{v.nombre}</li>
              ))}
            </ul>
          </div>
          <div className="strip__col">
            <h2 className="strip__t">Tamaños</h2>
            <ul className="strip__chips">
              {s.tamanos.map((t) => (
                <li key={t.id}>
                  {t.nombre} <span>{cm(t.medidas[0])} × {cm(t.medidas[1])} {s.unidadMedidas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
