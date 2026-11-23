import { useState } from 'react'
import { motion } from 'framer-motion'
import config from '../content/site.config.js'
import { useAnim } from '../AnimContext.jsx'
import { imgUrl, resolveImg } from '../utils.js'

/* Logo: respeta la proporción original (alto fijo, ancho automático) */
export function Logo({ height = 44, className = '' }) {
  const [failed, setFailed] = useState(false)
  const logo = resolveImg(config.sitio.logo)
  const existe = logo && !failed
  const label = `${config.sitio.nombre} – ${config.sitio.subtitulo}`
  if (existe) {
    return (
      <img
        className={`logo-img ${className}`}
        src={imgUrl(logo)}
        alt={label}
        style={{ height, width: 'auto' }}
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <span
      className={`logo-fb ${className}`}
      style={{ width: height, height, fontSize: height * 0.19 }}
      role="img"
      aria-label={label}
    >
      <span className="logo-fb__crown" aria-hidden="true">♛</span>
      <span className="logo-fb__name">{config.sitio.nombre}</span>
    </span>
  )
}

/* Aparición al scrollear */
export function Reveal({ children, delay = 0, y = 24, as = 'div', className, ...rest }) {
  const { on } = useAnim()
  const Tag = as
  if (!on.revelado) return <Tag className={className} {...rest}>{children}</Tag>
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}

export function SectionHead({ id, titulo, bajada }) {
  return (
    <Reveal className="sechead">
      <h2 id={`${id}-t`} className="h2">{titulo}</h2>
      <span className="sechead__rule" aria-hidden="true" />
      {bajada ? <p className="lead">{bajada}</p> : null}
    </Reveal>
  )
}

export function WaIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.1L2 22l5.05-1.5A9.94 9.94 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3 .88.9-2.92-.2-.31a8.1 8.1 0 1 1 6.85 3.69Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.1 3.65.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}
