# SANDO – Sandwich Premium (web para comerciantes)

Web de una sola página: sabores, tamaños, cómo quedan en el local, cómo funciona el pedido, condiciones y preguntas frecuentes.

## Ver la web en tu compu
1. Instalá [Node.js](https://nodejs.org) (versión LTS).
2. En una terminal, dentro de esta carpeta:
   ```
   npm install
   npm run dev
   ```
3. Abrí el link que aparece (algo como `http://localhost:5173`).

## Cómo cambiar textos
**Todo se cambia en un solo archivo: `src/content/site.config.js`.**
- Al principio del archivo está la lista de lo que falta completar (busca la palabra **PENDIENTE**).
- Un campo vacío (`''`) **no se muestra** en la web. No hace falta borrar nada.
- **Sabores:** bloque `variedades` (hasta 6). `ilustracion` elige el dibujo (`jamon` o `salame`). Opcionales: ingredientes, pan, peso, vida útil. El selector "Con / Sin mayonesa" es solo visual: no envía nada.
- **Tamaños y medidas:** `tamanos` y `unidadMedidas` (hoy en cm: confirmar con el dueño).
- **Condiciones, pasos y preguntas frecuentes:** secciones `condiciones`, `funciona` y `faq`.
- **Dónde y cómo los preparamos:** completá `lugar.zona`, `lugar.espacio` y `lugar.higiene`. Cada tarjeta vacía se oculta; si las tres están vacías, la sección entera desaparece (también del menú).
- **WhatsApp:** `contacto.whatsapp`, formato internacional sin "+" ni espacios. Ej.: `5492235551234`.
- **Ocultar una sección:** en `secciones` poné `false`.
- **Animaciones:** sección `animaciones`. La transición "sándwich que aplasta" está implementada pero apagada (`transicionSandwich: false`); para probarla ponelo en `true`.
- **Colores:** sección `colores`.

## Cómo cambiar imágenes
Copiá los archivos en `public/images/` con **estos nombres** (sirve .png, .jpg, .jpeg, .webp o .svg). Todas son opcionales: si falta una, la web usa su ilustración y nunca queda un hueco.

| Archivo | Qué hace |
|---|---|
| `logo.png` | Logo de SANDO (header, hero y pie). Se muestra sin deformarse |
| `hero-sandwich.png` | Reemplaza al sándwich ilustrado del círculo del hero. Mejor PNG con fondo transparente; se ajusta al círculo sin deformarse |
| `variedad-1.png`, `variedad-2.png` | Foto de cada sabor (reemplaza la ilustración de la tarjeta) |
| `local.jpg` | Foto de los sándwiches en un local. **Si no existe, la sección "Cómo quedan en tu local" no se muestra ni aparece en el menú** |
| `og-image.jpg` | Imagen que se ve al compartir el link por WhatsApp (1200×630) |

Los nombres base (sin extensión) se pueden cambiar en `sitio`, `sandwiches.variedades` y `enLocal` del config.
Tip: usá imágenes livianas (menos de ~250 KB). Se pueden achicar gratis en [squoosh.app](https://squoosh.app).

## WhatsApp
Hay solo dos botones: el flotante (abajo a la derecha) y el de la sección Contacto. Los dos usan el mismo mensaje prellenado, que se cambia en `contacto.mensaje` del config. El número va en `contacto.whatsapp`.

## Cómo publicar la web gratis
Generá la versión final: `npm run build` (crea la carpeta `dist/`, que es la web).
- **Netlify (la más fácil):** entrá a [app.netlify.com/drop](https://app.netlify.com/drop) y arrastrá la carpeta `dist`.
- **Vercel:** subí el proyecto a GitHub, en [vercel.com](https://vercel.com) elegí "Add New → Project" y "Deploy".
- **GitHub Pages:** subí el contenido de `dist/` a una rama `gh-pages` y activala en Settings → Pages.

Después de publicar, copiá el link final en `sitio.url` del config y volvé a publicar: así se ve la imagen al compartir por WhatsApp.

## Cómo actualizarla
1. Cambiá lo que necesites en `site.config.js` o en `public/images/`.
2. `npm run build`.
3. Volvé a subir `dist/` (Netlify) o hacé `git push` (Vercel/GitHub).

## Notas técnicas
React + Vite + Framer Motion, todo estático. Colores como variables CSS. Respeta "reducir movimiento" del dispositivo. El título, la descripción, Open Graph y los datos estructurados se generan desde el config (`vite.config.js`).
