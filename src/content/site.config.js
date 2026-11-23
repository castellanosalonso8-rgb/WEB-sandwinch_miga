/* =====================================================================
   SANDO – ÚNICO ARCHIVO PARA EDITAR TEXTOS, DATOS Y OPCIONES
   ---------------------------------------------------------------------
   · Acá está todo lo que se puede cambiar sin tocar código.
   · Un campo vacío ('') NO se muestra en la web. No hace falta borrar nada.
   · Las imágenes van en public/images/ (ver LEEME.txt de esa carpeta).
     Si falta una foto, la web muestra un dibujo de reemplazo.
   · No se importa nada acá adentro (tiene que ser un archivo "puro").

   PENDIENTE DE COMPLETAR (resumen; cada punto está marcado en el archivo con "PENDIENTE"):
     1. Logo: public/images/logo.png (PNG de al menos 600 px de alto, o el original en alta calidad)
     2. Número de WhatsApp real (contacto.whatsapp)
     3. Instagram real (contacto.instagram) o dejarlo vacío para ocultarlo
     4. Link final de la web (sitio.url) e imagen para compartir (public/images/og-image)
     5. Fotos y PNG propios (todo opcional, ver "IMÁGENES" abajo): variedad-1, variedad-2, hero-sandwich, local, logo
     6. Confirmar con el dueño las medidas y la unidad (sandwiches.unidadMedidas)
     7. Sección "Dónde y cómo los preparamos": zona, espacio, higiene (lugar.*)
        Mientras estén vacíos, la sección no se muestra ni aparece en el menú.
     8. Opcional: peso, vida útil, ingredientes y tipo de pan de cada sabor
   ===================================================================== */

const config = {
  /* ------------------------------------------------------------------
     DATOS GENERALES Y SEO
  ------------------------------------------------------------------ */
  sitio: {
    nombre: 'SANDO',
    subtitulo: 'Sandwich Premium',
    eslogan: 'Sándwiches de miga para kioscos, almacenes y cafeterías.',
    titulo: 'SANDO – Sandwich Premium | Sándwiches de miga para tu local',
    descripcion:
      'Sándwiches de miga de jamón y queso y de salame y queso, en 3 tamaños. Pedido mínimo: 4 sándwiches o 1 plancha. Entregas lunes, miércoles y viernes.',
    // PENDIENTE: link final de la web (ej. https://sando.vercel.app).
    // Hace falta para que la imagen se vea al compartir por WhatsApp.
    url: '',
    idioma: 'es-AR',
    /* IMÁGENES (carpeta public/images/). Se indica el nombre SIN extensión y la web
       acepta .png, .jpg, .jpeg, .webp o .svg. Si el archivo no existe, se usa la ilustración.
         logo            -> logo de SANDO (header, hero y footer). Respeta la proporción original.
         hero-sandwich   -> PNG (fondo transparente) que reemplaza al sándwich ilustrado del círculo del hero.
         variedad-1/-2   -> foto de cada sabor (reemplaza la ilustración de la tarjeta).
         local           -> foto de los sándwiches en un local. Si NO existe, esa sección no se muestra.
         og-image        -> imagen al compartir el link por WhatsApp (1200x630). */
    logo: 'logo', // PENDIENTE
    heroSandwich: 'hero-sandwich', // PENDIENTE (opcional)
    imagenCompartir: 'og-image', // PENDIENTE
  },

  /* ------------------------------------------------------------------
     COLORES (paleta del logo). Todo el color de la web sale de acá.
     "accion" es un naranja un poco más oscuro que el del logo para que
     el texto y los botones se lean bien.
  ------------------------------------------------------------------ */
  colores: {
    fondo: '#F3EAD6',
    fondoAlt: '#EADFC4',
    superficie: '#FBF6EA',
    titulo: '#4A4A2B',
    texto: '#3A3A22',
    textoSuave: '#5E5C3E',
    accion: '#A84A17',
    sobreAccion: '#FFFFFF',
    naranja: '#CC6428',
    dorado: '#C49A3A',
    linea: '#D9C8A2',
    oliva: '#4A4A2B',
    crema: '#D9C8A2',
  },

  /* ------------------------------------------------------------------
     SECCIONES: true = se muestra, false = se oculta
     (el orden en la página es fijo: hero, sándwiches, en tu local,
      cómo funciona, condiciones, preguntas, lugar, contacto)
  ------------------------------------------------------------------ */
  secciones: {
    hero: true,
    sandwiches: true,
    enLocal: true,
    funciona: true,
    condiciones: true,
    faq: true,
    lugar: true, // además se oculta sola si no tiene ningún texto cargado
    contacto: true,
  },

  // Textos del menú. Solo aparecen las secciones activas.
  menu: {
    sandwiches: 'Sándwiches',
    enLocal: 'En tu local',
    funciona: 'Cómo funciona',
    condiciones: 'Condiciones',
    faq: 'Preguntas',
    lugar: 'Dónde los preparamos',
    contacto: 'Contacto',
  },
  // Links que se ven en el menú de escritorio (el del celular muestra todos).
  menuEscritorio: ['sandwiches', 'funciona', 'condiciones', 'faq', 'contacto'],

  /* ------------------------------------------------------------------
     ANIMACIONES (true = activa, false = apagada)
     La web además respeta la opción "reducir movimiento" del dispositivo.
  ------------------------------------------------------------------ */
  animaciones: {
    revelado: true, // aparición al scrollear + tarjetas que se levantan al tocar/pasar el mouse
    caida: true, // el sándwich del hero entra con un pequeño rebote
    pulsoWhatsApp: true, // pulso discreto del botón flotante de WhatsApp
    marquesina: false, // cinta con frases (usa `marquesina` de abajo)
    transicionSandwich: false, // transición "sándwich que aplasta" (implementada, apagada)
    transicionAlNavegar: ['sandwiches', 'contacto'], // ids que la usan, solo si transicionSandwich es true
  },
  marquesina: ['Jamón y queso', 'Salame y queso', 'Entregas lunes, miércoles y viernes'],

  /* ------------------------------------------------------------------
     CONTACTO
  ------------------------------------------------------------------ */
  contacto: {
    // PENDIENTE: número de WhatsApp en formato internacional SIN "+" ni espacios.
    // Argentina celular: 549 + código de área sin 0 + número sin 15. Ej: 5492235551234
    whatsapp: '5492230000000',
    // PENDIENTE: confirmar usuario de Instagram (sin @). Vacío ('') = se oculta.
    instagram: 'sando.sandwich',
    botonFlotante: true,
    // Mensaje prellenado de WhatsApp (lo usan el botón flotante y el de Contacto)
    mensaje: 'Hola! Quería consultar por los sándwiches de SANDO.',
  },

  textos: {
    whatsappBoton: 'Escribinos por WhatsApp',
    conocenos: 'Conocenos',
  },

  /* ------------------------------------------------------------------
     NUESTROS SÁNDWICHES
  ------------------------------------------------------------------ */
  sandwiches: {
    titulo: 'Nuestros sándwiches',
    bajada: 'Sándwiches de miga. Elegí el sabor y fijate cómo viene.',
    simple: 'Simple (no triple)',
    mayo: { titulo: 'Vos elegís', con: 'Con mayonesa', sin: 'Sin mayonesa' },

    // Un bloque por sabor (podés sumar hasta 6). Los campos vacíos no se muestran.
    variedades: [
      {
        id: 'jamon-queso',
        nombre: 'Jamón y queso',
        ilustracion: 'jamon', // dibujo que se usa si no hay foto: 'jamon' | 'salame'
        foto: 'variedad-1', // PENDIENTE (opcional): foto real en public/images/
        // Opcionales: si están vacíos no se muestran
        ingredientes: [], // PENDIENTE (opcional): ej. ['Jamón cocido', 'Queso']
        pan: '', // PENDIENTE (opcional)
        peso: '', // PENDIENTE (opcional)
        vidaUtil: '', // PENDIENTE (opcional)
      },
      {
        id: 'salame-queso',
        nombre: 'Salame y queso',
        ilustracion: 'salame',
        foto: 'variedad-2', // PENDIENTE (opcional): foto real en public/images/
        ingredientes: [],
        pan: '',
        peso: '',
        vidaUtil: '',
      },
    ],

    // Formatos en que se venden
    formatosTitulo: 'Cómo los vendemos',
    formatos: [
      { titulo: 'En plancha', texto: 'Elegís entre 3 tamaños.' },
      { titulo: 'Empaquetado', texto: 'Un solo tamaño: el grande, cortado a la mitad en triángulos.' },
    ],

    // Tabla de tamaños.
    // CONFIRMAR con el dueño: unidad y medidas exactas.
    unidadMedidas: 'cm',
    tamanosTitulo: 'Tamaños',
    tamanosNota: 'Cada plancha se corta en 4, 6 u 8 sándwiches, según el tamaño.',
    tamanos: [
      { id: 'grande', nombre: 'Grande', medidas: [11.5, 12.5], porPlancha: 4, filas: 2 },
      { id: 'mediano', nombre: 'Mediano', medidas: [11.5, 8.5], porPlancha: 6, filas: 3 },
      { id: 'chico', nombre: 'Chico', medidas: [11.5, 6.5], porPlancha: 8, filas: 4 },
    ],
    etiquetas: {
      tamano: 'Tamaño',
      medidas: 'Medidas',
      porPlancha: 'Entran por plancha',
      ingredientes: 'Ingredientes',
      pan: 'Pan',
      peso: 'Peso',
      vidaUtil: 'Vida útil',
    },
  },

  /* ------------------------------------------------------------------
     CÓMO QUEDAN EN TU LOCAL
  ------------------------------------------------------------------ */
  enLocal: {
    titulo: 'Cómo quedan en tu local',
    bajada: 'Listos para exhibir en tu heladera o mostrador.',
    // Esta sección SOLO se muestra si existe public/images/local.(png|jpg|webp).
    // Si no existe, no se renderiza ni aparece en el menú.
    foto: 'local', // PENDIENTE
    alt: 'Sándwiches de SANDO presentados en un local',
  },

  /* ------------------------------------------------------------------
     CÓMO FUNCIONA
  ------------------------------------------------------------------ */
  funciona: {
    titulo: 'Cómo funciona',
    pasos: [
      { titulo: 'Probás una muestra', texto: 'Te dejamos una muestra en tu local, sin compromiso.' },
      {
        titulo: 'Nos escribís',
        texto: 'Nos contás qué te pareció y nos pasás tu pedido hasta las 19:00 hs del día anterior a la entrega.',
      },
      {
        titulo: 'Hacemos tu pedido',
        texto: 'Armamos tu pedido y lo llevamos a tu local los lunes, miércoles y viernes.',
      },
    ],
    aclaracion: 'Si querés recibirlo el viernes, pedilo hasta el jueves a las 19:00.',
    diasEtiqueta: 'Entregas:',
    dias: ['Lun', 'Mié', 'Vie'],
  },

  /* ------------------------------------------------------------------
     CONDICIONES
     icono: 'minimo' | 'entrega' | 'pago' | 'frio'
  ------------------------------------------------------------------ */
  condiciones: {
    titulo: 'Condiciones',
    items: [
      { icono: 'minimo', titulo: 'Pedido mínimo', valor: '4 sándwiches o 1 plancha' },
      { icono: 'entrega', titulo: 'Días de entrega', valor: 'Lunes, miércoles y viernes' },
      { icono: 'pago', titulo: 'Formas de pago', valor: 'Transferencia o efectivo' },
      { icono: 'frio', titulo: 'Conservación en tu local', valor: 'Siempre en heladera, bien frío (a menos de 4 °C)' },
    ],
    nota: 'No publicamos precios en la web: te pasamos la lista actualizada por WhatsApp.',
  },

  /* ------------------------------------------------------------------
     PREGUNTAS FRECUENTES
     En una respuesta, {tamanos} se reemplaza solo por la lista de tamaños de arriba.
  ------------------------------------------------------------------ */
  faq: {
    titulo: 'Preguntas frecuentes',
    textoDuda: '¿Tenés otra duda? Escribinos por WhatsApp.',
    items: [
      {
        pregunta: '¿Qué tamaño tienen exactamente?',
        respuesta: 'Hay 3 tamaños: {tamanos}. El empaquetado viene en tamaño grande.',
      },
      {
        pregunta: '¿Qué sabores tienen?',
        respuesta:
          'Jamón y queso, y salame y queso. Son sándwiches de miga simples (no triples) y los podés pedir con o sin mayonesa.',
      },
      {
        pregunta: '¿Cómo vienen los empaquetados?',
        respuesta: 'En tamaño grande, cortados a la mitad en triángulos.',
      },
      { pregunta: '¿Cuál es el pedido mínimo?', respuesta: '4 sándwiches o 1 plancha.' },
      {
        pregunta: '¿Qué días entregan y hasta cuándo puedo pedir?',
        respuesta:
          'Entregamos lunes, miércoles y viernes. Podés pedir hasta las 19:00 del día anterior a la entrega.',
      },
      { pregunta: '¿Cómo se paga?', respuesta: 'Por transferencia o en efectivo.' },
      {
        pregunta: '¿Cómo los conservo en mi local?',
        respuesta: 'Siempre en heladera, bien fríos (a menos de 4 °C).',
      },
      { pregunta: '¿Cuánto cuestan?', respuesta: 'Te pasamos la lista de precios actualizada por WhatsApp.' },
    ],
  },

  /* ------------------------------------------------------------------
     DÓNDE Y CÓMO LOS PREPARAMOS
     PENDIENTE: completar. Una tarjeta vacía no se muestra; si las tres
     están vacías, la sección entera se oculta (y sale del menú).
  ------------------------------------------------------------------ */
  lugar: {
    titulo: 'Dónde y cómo los preparamos',
    zona: '', // PENDIENTE: barrio y ciudad
    espacio: '', // PENDIENTE: cocina, equipamiento, orden y limpieza
    higiene: '', // PENDIENTE: habilitación municipal, libreta sanitaria, curso de manipulación de alimentos
    etiquetas: { zona: 'Zona', espacio: 'El espacio', higiene: 'Higiene y habilitación' },
  },

  /* ------------------------------------------------------------------
     CONTACTO Y FOOTER
  ------------------------------------------------------------------ */
  contactoSeccion: {
    titulo: 'Contacto',
    bajada: 'Escribinos por WhatsApp o seguinos en Instagram.',
    instagramTexto: 'Instagram',
  },
  footer: {
    texto: 'Sándwiches de miga para tu local.',
    derechos: 'Todos los derechos reservados.',
  },
}

export default config
