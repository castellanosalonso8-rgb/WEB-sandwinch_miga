import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.join(root, 'public', 'images')
const VIRTUAL = 'virtual:imagenes'
const RESOLVED = '\0' + VIRTUAL

const listImages = () =>
  fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir).filter((f) => !f.startsWith('.')) : []

const EXT = ['png', 'jpg', 'jpeg', 'webp', 'svg']
const findImg = (base) => {
  if (!base) return null
  const imgs = listImages()
  if (imgs.includes(base)) return base
  const e = EXT.find((x) => imgs.includes(`${base}.${x}`))
  return e ? `${base}.${e}` : null
}

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Plugin propio de SANDO:
//  1) expone la lista de imágenes que existen en public/images (así nunca se pide una imagen que no está)
//  2) inyecta título, descripción, Open Graph y JSON-LD en el HTML leyendo src/content/site.config.js
function sandoPlugin() {
  return {
    name: 'sando',
    resolveId(id) {
      if (id === VIRTUAL) return RESOLVED
    },
    load(id) {
      if (id === RESOLVED) return `export default ${JSON.stringify(listImages())}`
    },
    configureServer(server) {
      server.watcher.add(imagesDir)
      const reload = (f) => {
        if (!f.startsWith(imagesDir)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    },
    async transformIndexHtml(html) {
      const file = path.join(root, 'src/content/site.config.js')
      const cfg = (await import(pathToFileURL(file).href + '?t=' + Date.now())).default
      const s = cfg.sitio
      const url = (s.url || '').replace(/\/$/, '')
      const ogFile = findImg(s.imagenCompartir)
      const logoFile = findImg(s.logo)
      const hasOg = ogFile && url
      const hasLogo = logoFile && url

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: s.nombre,
        description: s.descripcion,
        ...(url ? { url } : {}),
        ...(hasLogo ? { logo: `${url}/images/${logoFile}` } : {}),
        ...(cfg.contacto.instagram
          ? { sameAs: [`https://www.instagram.com/${cfg.contacto.instagram}/`] }
          : {}),
      }

      const head = [
        `<title>${esc(s.titulo)}</title>`,
        `<meta name="description" content="${esc(s.descripcion)}" />`,
        `<meta name="theme-color" content="${esc(cfg.colores.naranja)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="es_AR" />`,
        `<meta property="og:site_name" content="${esc(s.nombre)}" />`,
        `<meta property="og:title" content="${esc(s.titulo)}" />`,
        `<meta property="og:description" content="${esc(s.descripcion)}" />`,
        url ? `<meta property="og:url" content="${esc(url)}/" />` : '',
        hasOg ? `<meta property="og:image" content="${esc(url)}/images/${esc(ogFile)}" />` : '',
        `<meta name="twitter:card" content="${hasOg ? 'summary_large_image' : 'summary'}" />`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
      ]
        .filter(Boolean)
        .join('\n    ')

      return html.replace('<!--SANDO_HEAD-->', head).replace('%LANG%', esc(s.idioma || 'es-AR'))
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), sandoPlugin()],
})
