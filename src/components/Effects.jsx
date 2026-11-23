import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import config from '../content/site.config.js'
import { useAnim } from '../AnimContext.jsx'
import { BreadSlice } from './Art.jsx'

/* Transición "sándwich que aplasta" (apagada por defecto: animaciones.transicionSandwich) */
export function SandwichTransition() {
  const { transitionRef, on } = useAnim()
  const top = useAnimationControls()
  const bottom = useAnimationControls()
  const [activo, setActivo] = useState(false)
  const ocupado = useRef(false)

  useEffect(() => {
    if (!on.transicion) return
    transitionRef.current = async (mid) => {
      if (ocupado.current) {
        mid?.()
        return
      }
      ocupado.current = true
      setActivo(true)
      top.set({ y: '-102%' })
      bottom.set({ y: '102%' })
      const spring = { type: 'spring', stiffness: 240, damping: 11, mass: 0.9 }
      await Promise.all([top.start({ y: '0%', transition: spring }), bottom.start({ y: '0%', transition: spring })])
      await new Promise((r) => setTimeout(r, 280))
      mid?.()
      await new Promise((r) => setTimeout(r, 120))
      const abre = { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
      await Promise.all([top.start({ y: '-102%', transition: abre }), bottom.start({ y: '102%', transition: abre })])
      setActivo(false)
      ocupado.current = false
    }
    return () => {
      transitionRef.current = null
    }
  }, [on.transicion, transitionRef, top, bottom])

  if (!on.transicion) return null
  return (
    <div className="sandtrans" style={{ visibility: activo ? 'visible' : 'hidden' }} aria-hidden="true">
      <motion.div className="sandtrans__half sandtrans__half--top" initial={{ y: '-102%' }} animate={top}>
        <BreadSlice lado="top" />
      </motion.div>
      <motion.div className="sandtrans__half sandtrans__half--bottom" initial={{ y: '102%' }} animate={bottom}>
        <BreadSlice lado="bottom" />
      </motion.div>
    </div>
  )
}

/* Marquesina (apagada por defecto: animaciones.marquesina) */
export function Marquee() {
  const { on } = useAnim()
  const frases = config.marquesina || []
  if (!config.animaciones.marquesina || !frases.length) return null
  const fila = (suf) => (
    <ul className="marquee__row" aria-hidden={suf === 'b' ? 'true' : undefined} key={suf}>
      {frases.map((f, i) => (
        <li key={`${suf}${i}`}>
          {f}
          <span className="marquee__dot" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" role="region" aria-label="Frases destacadas">
      {on.marquesina ? (
        <div className="marquee__track">
          {fila('a')}
          {fila('b')}
        </div>
      ) : (
        <ul className="marquee__row marquee__row--wrap">
          {frases.map((f, i) => (
            <li key={i}>
              {f}
              <span className="marquee__dot" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
