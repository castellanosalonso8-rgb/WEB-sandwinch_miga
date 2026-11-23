import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import config from './content/site.config.js'

const Ctx = createContext(null)
export const useAnim = () => useContext(Ctx)

const toVar = (k) => '--' + k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

function applyColors(tokens) {
  const style = document.documentElement.style
  Object.entries(tokens).forEach(([k, v]) => style.setProperty(toVar(k), v))
}

export function AnimProvider({ children }) {
  const reduced = !!useReducedMotion()
  const flags = config.animaciones

  const on = useMemo(
    () => ({
      revelado: !!flags.revelado && !reduced,
      caida: !!flags.caida && !reduced,
      pulsoWhatsApp: !!flags.pulsoWhatsApp && !reduced,
      marquesina: !!flags.marquesina && !reduced,
      transicion: !!flags.transicionSandwich && !reduced,
    }),
    [flags, reduced]
  )

  const transitionRef = useRef(null)

  const scrollToId = useCallback(
    (id, instant) => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: instant || reduced ? 'auto' : 'smooth', block: 'start' })
    },
    [reduced]
  )

  const navigateTo = useCallback(
    (id) => {
      const usa = on.transicion && transitionRef.current && (flags.transicionAlNavegar || []).includes(id)
      if (usa) transitionRef.current(() => scrollToId(id, true))
      else scrollToId(id)
    },
    [on.transicion, flags.transicionAlNavegar, scrollToId]
  )

  useEffect(() => {
    applyColors(config.colores)
  }, [])

  return (
    <Ctx.Provider value={{ reduced, on, transitionRef, navigateTo, scrollToId }}>{children}</Ctx.Provider>
  )
}
