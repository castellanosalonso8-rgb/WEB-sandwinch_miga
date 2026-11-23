import config from './content/site.config.js'
import imagenes from 'virtual:imagenes'

export const waLink = (texto = config.contacto.mensaje, numero = config.contacto.whatsapp) => {
  const base = numero ? `https://wa.me/${numero}` : 'https://wa.me/'
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base
}

const EXT = ['png', 'jpg', 'jpeg', 'webp', 'svg']
// Devuelve el archivo real de public/images/ para un nombre con o sin extensión, o null si no existe.
export const resolveImg = (base) => {
  if (!base) return null
  if (imagenes.includes(base)) return base
  const ext = EXT.find((e) => imagenes.includes(`${base}.${e}`))
  return ext ? `${base}.${ext}` : null
}

export const imgUrl = (nombre) => `${import.meta.env.BASE_URL}images/${nombre}`

export const instagramUrl = (usuario) => `https://www.instagram.com/${usuario}/`

// Una tarjeta vacía no se muestra; si las tres están vacías, la sección "lugar" se oculta.
export const lugarItems = () => {
  const l = config.lugar
  return [
    [l.etiquetas.zona, l.zona],
    [l.etiquetas.espacio, l.espacio],
    [l.etiquetas.higiene, l.higiene],
  ].filter(([, v]) => v && String(v).trim())
}

export const seccionActiva = (id) => {
  if (!config.secciones[id]) return false
  if (id === 'enLocal') return !!resolveImg(config.enLocal.foto)
  if (id === 'lugar') return lugarItems().length > 0
  return true
}

export const ordenSecciones = ['sandwiches', 'enLocal', 'funciona', 'condiciones', 'faq', 'lugar', 'contacto']

export const cm = (n) => String(n).replace('.', ',')
