import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../content/site.config.js'
import { useAnim } from '../AnimContext.jsx'
import { Reveal, SectionHead, WaIcon } from './Common.jsx'
import { PlanchaDiagram, SandwichIllustration } from './Art.jsx'
import { cm, imgUrl, lugarItems, resolveImg, waLink } from '../utils.js'

/* ---------- NUESTROS SÁNDWICHES ---------- */
function VarCard({ v, i }) {
  const { on } = useAnim()
  const s = config.sandwiches
  const e = s.etiquetas
  const [mayo, setMayo] = useState(true)
  const foto = resolveImg(v.foto)
  const lift = on.revelado
    ? { whileHover: { y: -6 }, whileTap: { y: -3 }, transition: { type: 'spring', stiffness: 300, damping: 18 } }
    : {}
  const datos = [
    [e.ingredientes, (v.ingredientes || []).filter(Boolean).join(', ')],
    [e.pan, v.pan],
    [e.peso, v.peso],
    [e.vidaUtil, v.vidaUtil],
  ].filter(([, val]) => val && String(val).trim())
  const gid = `mayo-${v.id}`
  return (
    <Reveal delay={i * 0.08} className="vwrap">
      <motion.article className="vcard" {...lift}>
        <div className="vcard__art">
          {foto ? (
            <img className="vcard__photo" src={imgUrl(foto)} alt={`${v.nombre}, sándwich de miga`} loading="lazy" decoding="async" />
          ) : (
            <SandwichIllustration className="sandart" tipo={v.ilustracion} mayo={mayo} />
          )}
          {s.simple ? <span className="vcard__badge">{s.simple}</span> : null}
        </div>
        <div className="vcard__body">
          <h3 className="vcard__name">{v.nombre}</h3>
          {datos.length ? (
            <dl className="vcard__meta">
              {datos.map(([k, val]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="mayo">
            <p className="mayo__t" id={gid}>{s.mayo.titulo}</p>
            <div className="mayo__opts" role="radiogroup" aria-labelledby={gid}>
              {[
                [true, s.mayo.con],
                [false, s.mayo.sin],
              ].map(([val, txt]) => (
                <button
                  key={txt}
                  type="button"
                  role="radio"
                  aria-checked={mayo === val}
                  className={`pill ${mayo === val ? 'is-on' : ''}`}
                  onClick={() => setMayo(val)}
                >
                  {txt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export function Sandwiches() {
  const s = config.sandwiches
  const lista = s.variedades.slice(0, 6)
  return (
    <section className="sec sec--big" id="sandwiches" aria-labelledby="sandwiches-t">
      <div className="wrap">
        <SectionHead id="sandwiches" titulo={s.titulo} bajada={s.bajada} />
        <div className={`vgrid vgrid--${lista.length}`}>
          {lista.map((v, i) => (
            <VarCard key={v.id} v={v} i={i} />
          ))}
        </div>


        <div className="formats">
          <h3 className="sub">{s.formatosTitulo}</h3>
          <ul className="formats__grid">
            {s.formatos.map((f) => (
              <Reveal as="li" key={f.titulo} className="format">
                <strong>{f.titulo}</strong>
                <span>{f.texto}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="sizes">
          <h3 className="sub">{s.tamanosTitulo}</h3>
          <div className="sizes__grid">
            {s.tamanos.map((t, i) => (
              <Reveal key={t.id} className="size" delay={i * 0.08}>
                <PlanchaDiagram filas={t.filas} nombre={t.nombre} />
                <div className="size__txt">
                  <h4>{t.nombre}</h4>
                  <p className="size__dim">
                    {cm(t.medidas[0])} × {cm(t.medidas[1])} {s.unidadMedidas}
                  </p>
                  <p className="size__qty">
                    <strong>{t.porPlancha}</strong> por plancha
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="tablewrap">
            <table className="sizetable">
              <caption className="sr">{s.tamanosTitulo}</caption>
              <thead>
                <tr>
                  <th scope="col">{s.etiquetas.tamano}</th>
                  <th scope="col">{s.etiquetas.medidas}</th>
                  <th scope="col">{s.etiquetas.porPlancha}</th>
                </tr>
              </thead>
              <tbody>
                {s.tamanos.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">{t.nombre}</th>
                    <td>
                      {cm(t.medidas[0])} × {cm(t.medidas[1])} {s.unidadMedidas}
                    </td>
                    <td>{t.porPlancha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.tamanosNota ? <p className="sizes__note">{s.tamanosNota}</p> : null}
        </div>
      </div>
    </section>
  )
}

/* ---------- CÓMO QUEDAN EN TU LOCAL ---------- */
export function EnLocal() {
  const l = config.enLocal
  const foto = resolveImg(l.foto)
  if (!foto) return null
  return (
    <section className="sec sec--alt sec--big" id="enLocal" aria-labelledby="enLocal-t">
      <div className="wrap">
        <SectionHead id="enLocal" titulo={l.titulo} bajada={l.bajada} />
        <Reveal className="bigphoto">
          <div className="img" style={{ aspectRatio: '16 / 10' }}>
            <img src={imgUrl(foto)} alt={l.alt} loading="lazy" decoding="async" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- CÓMO FUNCIONA ---------- */
export function Funciona() {
  const f = config.funciona
  return (
    <section className="sec" id="funciona" aria-labelledby="funciona-t">
      <div className="wrap">
        <SectionHead id="funciona" titulo={f.titulo} />
        <ol className="how">
          {f.pasos.map((p, i) => (
            <Reveal as="li" key={p.titulo} className="how__item" delay={i * 0.08}>
              <span className="how__n" aria-hidden="true">{i + 1}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="how__extra">
          {f.aclaracion ? <p className="how__tip">{f.aclaracion}</p> : null}
          <p className="days">
            <span className="days__l">{f.diasEtiqueta}</span>
            {f.dias.map((d, i) => (
              <span key={d} className="days__d">
                {d}
                {i < f.dias.length - 1 ? <i aria-hidden="true"> · </i> : null}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- CONDICIONES ---------- */
const ICONOS = {
  minimo: (
    <path d="M4 8h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 8Zm4-1a4 4 0 0 1 8 0" />
  ),
  entrega: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  pago: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  frio: <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 4l3 2 3-2M9 20l3-2 3 2" />,
}

export function Condiciones() {
  const c = config.condiciones
  return (
    <section className="sec sec--dark" id="condiciones" aria-labelledby="condiciones-t">
      <div className="wrap">
        <SectionHead id="condiciones" titulo={c.titulo} />
        <ul className="conds">
          {c.items.map((it, i) => (
            <Reveal as="li" key={it.titulo} className="cond" delay={i * 0.07}>
              <span className="cond__ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONOS[it.icono] || ICONOS.minimo}
                </svg>
              </span>
              <div>
                <h3>{it.titulo}</h3>
                <p>{it.valor}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="cta">
          {c.nota ? <p>{c.nota}</p> : null}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- PREGUNTAS FRECUENTES ---------- */
export function Faq() {
  const f = config.faq
  const s = config.sandwiches
  const [abierta, setAbierta] = useState(0)
  const { reduced } = useAnim()
  const tamanos = s.tamanos
    .map((t) => `${t.nombre.toLowerCase()} (${cm(t.medidas[0])} × ${cm(t.medidas[1])} ${s.unidadMedidas}, entran ${t.porPlancha} por plancha)`)
    .join('; ')
  const texto = (r) => r.replace('{tamanos}', tamanos)
  return (
    <section className="sec sec--alt" id="faq" aria-labelledby="faq-t">
      <div className="wrap wrap--narrow">
        <SectionHead id="faq" titulo={f.titulo} />
        <div className="faq">
          {f.items.map((it, i) => {
            const open = abierta === i
            return (
              <Reveal key={it.pregunta} className={`faq__item ${open ? 'is-open' : ''}`} delay={Math.min(i, 4) * 0.04}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={open}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setAbierta(open ? -1 : i)}
                  >
                    <span>{it.pregunta}</span>
                    <span className="faq__icon" aria-hidden="true">{open ? '–' : '+'}</span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.26, ease: 'easeOut' }}
                    >
                      <p>{texto(it.respuesta)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
        {f.textoDuda ? (
          <Reveal className="faq__more">
            <p>{f.textoDuda}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

/* ---------- DÓNDE Y CÓMO LOS PREPARAMOS (compacta; se oculta si está vacía) ---------- */
export function Lugar() {
  const l = config.lugar
  const items = lugarItems()
  if (!items.length) return null
  return (
    <section className="sec sec--compact" id="lugar" aria-labelledby="lugar-t">
      <div className="wrap wrap--narrow">
        <SectionHead id="lugar" titulo={l.titulo} />
        <div className="place">
          {items.map(([k, v]) => (
            <Reveal key={k} className="place__item">
              <h3>{k}</h3>
              <p>{v}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- CONTACTO ---------- */
export function Contacto() {
  const c = config.contacto
  const s = config.contactoSeccion
  return (
    <section className="sec sec--alt" id="contacto" aria-labelledby="contacto-t">
      <div className="wrap wrap--narrow">
        <SectionHead id="contacto" titulo={s.titulo} bajada={s.bajada} />
        <Reveal className="contact">
          {c.whatsapp ? (
            <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WaIcon size={20} />
              {config.textos.whatsappBoton}
            </a>
          ) : null}
          {c.instagram ? (
            <a className="btn btn--outline" href={`https://www.instagram.com/${c.instagram}/`} target="_blank" rel="noopener noreferrer">
              {s.instagramTexto} @{c.instagram}
            </a>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
