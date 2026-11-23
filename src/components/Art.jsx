import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* Sándwich de miga triangular ilustrado (capas apiladas) */
export function SandwichArt({ className, title = 'Sándwich de miga' }) {
  const uid = useId().replace(/:/g, '')
  const tri =
    'M150 22 Q160 20 167 32 L268 196 Q277 213 260 217 L40 217 Q23 213 32 196 L133 32 Q140 20 150 22 Z'
  return (
    <svg className={className} viewBox="0 0 300 270" role="img" aria-label={title}>
      <defs>
        <pattern id={`p${uid}`} width="14" height="12" patternUnits="userSpaceOnUse">
          <ellipse cx="3" cy="3" rx="1.4" ry="1" fill="#E3D2AB" />
          <ellipse cx="10" cy="9" rx="1.1" ry="0.8" fill="#E3D2AB" />
        </pattern>
      </defs>
      <ellipse cx="150" cy="255" rx="110" ry="10" fill="rgba(0,0,0,.14)" />
      {/* capas (de abajo hacia arriba) */}
      <path d={tri} transform="translate(0 34)" fill="#E9D9B3" stroke="#B89A5E" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={tri} transform="translate(0 27)" fill="#7BA05B" stroke="#4F7A3A" strokeWidth="2" strokeLinejoin="round" />
      <path d={tri} transform="translate(0 20)" fill="#E9A39A" stroke="#C97A70" strokeWidth="2" strokeLinejoin="round" />
      <path d={tri} transform="translate(0 13)" fill="#F2C75C" stroke="#C49A3A" strokeWidth="2" strokeLinejoin="round" />
      <path d={tri} transform="translate(0 6)" fill="#F7EBD0" stroke="#B89A5E" strokeWidth="2.5" strokeLinejoin="round" />
      {/* tapa */}
      <path d={tri} fill="#FBF3DD" stroke="#B89A5E" strokeWidth="3" strokeLinejoin="round" />
      <path d={tri} fill={`url(#p${uid})`} />
      <path d="M150 62 L205 150" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

/* Rebanada de pan para la transición. `lado` = 'top' | 'bottom' */
export function BreadSlice({ lado }) {
  const uid = useId().replace(/:/g, '')
  const arriba = lado === 'top'
  return (
    <div className={`slice slice--${lado}`} aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern id={`bp${uid}`} width="38" height="30" patternUnits="userSpaceOnUse">
            <ellipse cx="7" cy="8" rx="3.2" ry="2.2" fill="#E6D4AA" />
            <ellipse cx="25" cy="20" rx="2.4" ry="1.7" fill="#E6D4AA" />
            <ellipse cx="32" cy="5" rx="1.6" ry="1.1" fill="#EBDDB8" />
            <ellipse cx="14" cy="26" rx="1.8" ry="1.2" fill="#EBDDB8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#FBF3DD" />
        <rect width="100%" height="100%" fill={`url(#bp${uid})`} />
      </svg>
      {/* borde tostado externo */}
      <div className={`slice__crust slice__crust--${lado}`} />
      {/* relleno asomando en la unión */}
      <svg
        className={`slice__fill slice__fill--${lado}`}
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {arriba ? (
          <>
            <path d="M0 0 H400 V14 Q380 28 360 14 T320 14 T280 14 T240 14 T200 14 T160 14 T120 14 T80 14 T40 14 T0 14 Z" fill="#F2C75C" />
          </>
        ) : (
          <>
            <path d="M0 40 H400 V24 Q380 8 360 24 T320 24 T280 24 T240 24 T200 24 T160 24 T120 24 T80 24 T40 24 T0 24 Z" fill="#7BA05B" />
          </>
        )}
      </svg>
    </div>
  )
}

const TRI =
  'M150 22 Q160 20 167 32 L268 196 Q277 213 260 217 L40 217 Q23 213 32 196 L133 32 Q140 20 150 22 Z'

/* Esquema de una plancha dividida en `filas` x 2 porciones (4, 6 u 8) */
export function PlanchaDiagram({ filas = 2, nombre }) {
  const W = 92
  const H = 112
  const cw = W / 2
  const ch = H / filas
  return (
    <svg className="plancha" viewBox="-4 -4 100 120" role="img" aria-label={`Plancha dividida en ${filas * 2} porciones (${nombre})`}>
      <rect x="0" y="0" width={W} height={H} rx="6" fill="#FBF3DD" stroke="#B89A5E" strokeWidth="2.5" />
      {Array.from({ length: filas - 1 }, (_, i) => (
        <line key={`h${i}`} x1="0" x2={W} y1={ch * (i + 1)} y2={ch * (i + 1)} stroke="#CC6428" strokeWidth="2" strokeDasharray="5 4" />
      ))}
      <line x1={cw} x2={cw} y1="0" y2={H} stroke="#CC6428" strokeWidth="2" strokeDasharray="5 4" />
      {Array.from({ length: filas * 2 }, (_, i) => (
        <text
          key={i}
          x={(i % 2) * cw + cw / 2}
          y={Math.floor(i / 2) * ch + ch / 2 + 4}
          textAnchor="middle"
          fontSize={filas > 3 ? 11 : 13}
          fontWeight="700"
          fill="#4A4A2B"
          fontFamily="inherit"
        >
          {i + 1}
        </text>
      ))}
    </svg>
  )
}

/* ---------------------------------------------------------------
   Ilustración por sabor, con las capas de relleno visibles.
   tipo: 'jamon' | 'salame'   ·   mayo: true/false (animado)
   --------------------------------------------------------------- */
const PAN = '#FBF3DD'
const BORDE = '#D9A35F'

function Ruffle({ y, color, stroke, x0 = 38, x1 = 262, n = 11, d = 9 }) {
  const w = (x1 - x0) / n
  let path = `M${x0} ${y - 8}`
  for (let i = 0; i < n; i++) path += ` q${w / 2} ${d * 2} ${w} 0`
  path += ` L${x1} ${y - 26} L${x0} ${y - 26} Z`
  return <path d={path} fill={color} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
}

export function SandwichIllustration({ tipo = 'jamon', mayo = true, className }) {
  const uid = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const t = reduced ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 16 }
  const scaleAbout = 'translate(150 217) scale(1.04 1) translate(-150 -217)'

  const pan = (dy) => (
    <>
      <path d={TRI} transform={`translate(0 ${dy})`} fill={PAN} stroke={BORDE} strokeWidth="4.5" strokeLinejoin="round" />
      <path d={TRI} transform={`translate(0 ${dy})`} fill={`url(#c${uid})`} />
    </>
  )

  const jamon = (
    <g transform="translate(0 78)">
      <path d={TRI} transform={scaleAbout} fill="#F0A6AC" stroke="#CF7A84" strokeWidth="2.5" strokeLinejoin="round" />
      <Ruffle y={217} color="#F0A6AC" stroke="#CF7A84" />
    </g>
  )
  const salame = (
    <g transform="translate(0 78)">
      <path d={TRI} transform={scaleAbout} fill="#9E3434" stroke="#6E2020" strokeWidth="2.5" strokeLinejoin="round" />
      {[62, 92, 122, 152, 182, 212, 240].map((cx, i) => (
        <g key={cx} transform={`translate(${cx} ${219 + (i % 2) * 3})`}>
          <circle r="16" fill="#B7403B" stroke="#6E2020" strokeWidth="2.5" />
          <circle cx="-5" cy="-4" r="2.6" fill="#EFB0A6" />
          <circle cx="6" cy="3" r="2.2" fill="#EFB0A6" />
          <circle cx="-3" cy="7" r="1.8" fill="#EFB0A6" />
          <circle cx="7" cy="-7" r="1.6" fill="#EFB0A6" />
        </g>
      ))}
    </g>
  )
  const queso = (
    <g transform="translate(0 52)">
      <path d={TRI} transform={scaleAbout} fill="#F5CD50" stroke="#C9A02A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M210 217 L264 217 L248 242 Z" fill="#F5CD50" stroke="#C9A02A" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="96" cy="209" r="4" fill="#E2AF2E" />
      <circle cx="170" cy="212" r="3" fill="#E2AF2E" />
      <circle cx="226" cy="207" r="3.4" fill="#E2AF2E" />
    </g>
  )

  return (
    <svg className={className} viewBox="0 0 300 350" role="img" aria-label={`Sándwich de ${tipo === 'salame' ? 'salame' : 'jamón'} y queso${mayo ? ' con mayonesa' : ' sin mayonesa'}`}>
      <defs>
        <pattern id={`c${uid}`} width="16" height="13" patternUnits="userSpaceOnUse">
          <ellipse cx="4" cy="4" rx="1.5" ry="1" fill="#EBDDB8" />
          <ellipse cx="12" cy="10" rx="1.2" ry="0.9" fill="#EBDDB8" />
        </pattern>
      </defs>
      <ellipse cx="150" cy="338" rx="112" ry="9" fill="rgba(60,40,10,.18)" />
      {/* de abajo hacia arriba */}
      {pan(104)}
      {tipo === 'salame' ? salame : jamon}
      {queso}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
        initial={false}
        animate={{ opacity: mayo ? 1 : 0, scaleY: mayo ? 1 : 0.2 }}
        transition={t}
      >
        <g transform="translate(0 26)">
          <path d={TRI} transform={'translate(150 217) scale(1.02 1) translate(-150 -217)'} fill="#FFFDF2" stroke="#E6DDB8" strokeWidth="2.5" strokeLinejoin="round" />
          <Ruffle y={217} color="#FFFDF2" stroke="#E6DDB8" d={7} n={9} x0={44} x1={256} />
        </g>
      </motion.g>
      <motion.g initial={false} animate={{ y: mayo ? 0 : 26 }} transition={t}>
        {pan(0)}
        <path d="M150 62 L205 150" stroke="#fff" strokeOpacity=".7" strokeWidth="6" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}
