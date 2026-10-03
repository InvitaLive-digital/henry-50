// ╔══════════════════════════════════════════════════════════════╗
// ║  EDITA AQUÍ TODA LA INFORMACIÓN DE LA INVITACIÓN              ║
// ║  (no necesitas tocar App.tsx para cambiar textos ni fotos)    ║
// ╚══════════════════════════════════════════════════════════════╝

// ── Datos principales ────────────────────────────────────────────
export const NOMBRE_FESTEJADO = 'Henry'
export const DE_PARTE_DE = NOMBRE_FESTEJADO // aparece como "De:" en el sobre
export const FIRMA = 'Su familia' // firma del pie de página
// Frase debajo del nombre del invitado en el sobre
export const TEXTO_SOBRE = `Te invitamos a celebrar los 50 años de ${NOMBRE_FESTEJADO}`
// Para personalizar el sobre agrega ?para=Nombre al enlace (usa - en lugar de espacios):
//   https://tu-invitacion.com/?para=Familia-Perez   →  "Para Familia Perez"
//   https://tu-invitacion.com/                      →  "Para ti"
export const EDAD = 50

// Fecha y hora REAL del evento (formato: AAAA-MM-DDTHH:MM:SS) → usada por la cuenta regresiva
export const FECHA_EVENTO = new Date('2026-10-10T11:00:00')
export const FECHA_TEXTO = 'Sábado, 10 de Octubre del 2026'
export const HORA_TEXTO = '11:00 AM'
export const MES_ANIO_PIE = 'Octubre 2026' // aparece en el pie de página

// ── Lugar ────────────────────────────────────────────────────────
export const LUGAR_NOMBRE = 'Pilcomayo'
export const LUGAR_DIRECCION = 'Esquina Jr. Incas y Balsas'
// En Google Maps: Compartir → Insertar un mapa → copia SOLO el valor de src="..."
export const MAPA_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3901.7622163438486!2d-75.24739122493871!3d-12.059874888177967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDAzJzM1LjYiUyA3NcKwMTQnNDEuMyJX!5e0!3m2!1ses!2spe!4v1790832841985!5m2!1ses!2spe'
export const MAPA_LINK = 'https://maps.app.goo.gl/TrdS9N3npZ23Zsgi8'

// ── Detalles ─────────────────────────────────────────────────────
export const VESTIMENTA_TITULO = 'Formal / Cocktail'
export const VESTIMENTA_DETALLE = 'Formal · Colores: azul marino, plateado y negro'
export const FECHA_LIMITE_RSVP = '   04 de Octubre, 2026'

// ── Multimedia ───────────────────────────────────────────────────
// Puedes usar archivos propios: colócalos en la carpeta /public y escribe './nombre.jpg'
// Coloca tu canción en public/musica/ con el nombre cancion.mp3 (o cambia el nombre aquí)
export const MUSICA_URL = './musica/Forasterito_soy.mp3'
export const FOTO_PORTADA = './img/PORTADA_BANNER.png'
export const FOTO_PORTADA_MOVIL = './img/PORTADA_MOBILE.png'
// wide: true = la foto ocupa 2 columnas
export const GALERIA = [
  { url: './img/IMG_8.jpeg', alt: 'Decoración 50 años', wide: true },
  { url: './img/IMG_2.jpeg', alt: 'Globos de celebración', wide: false },
  { url: './img/IMG_3.jpeg', alt: 'Pastel 50 años', wide: false },
  { url: './img/IMG_4.jpeg', alt: 'Decoración dorada', wide: false },
  { url: './img/IMG_5.jpeg', alt: 'Flores de celebración', wide: false },
  { url: './img/IMG_7.png', alt: 'Ambiente elegante', wide: true },
  { url: './img/IMG_1.jpeg', alt: 'Celebración especial', wide: false },
  { url: './img/IMG_9.jpg', alt: 'Momento festivo', wide: false },
  { url: './img/IMG_6.png', alt: 'Noche de celebración', wide: false },
]

// ── Programa ─────────────────────────────────────────────────────
export const PROGRAMA = [
  { time: '11:00 AM', title: 'Misa de acción de gracias', desc: 'Iniciamos con una breve misa para agradecer por la vida de Henry.' },
  { time: 'Después de la misa', title: 'Recepción de invitados', desc: 'Bienvenida y reencuentro con familiares y amigos.' },
  { time: '12:30 PM', title: 'Palabras y brindis', desc: 'Unas palabras de la familia y un brindis en honor a Henry.' },
  { time: '01:00 PM', title: 'Almuerzo de celebración', desc: 'Compartimos la mesa en este día tan especial.' },
  { time: '02:30 PM', title: 'Cerveceada', desc: 'Brindis y cerveceada entre familia y amigos.' },
  { time: '03:00 PM', title: 'Palpa', desc: 'Entrega de presentes y muestras de cariño para Henry.' },
  { time: '05:00 PM', title: 'Hora Loca', desc: 'Baile, alegría y mucha energía para todos.' },
  { time: '06:00 PM', title: 'Cumpleaños feliz', desc: 'Cantamos juntos por sus 50 años.' },
  { time: 'Hasta las 10:00 PM', title: 'Baile y celebración', desc: 'Seguimos festejando junto a familiares y amigos.' },
]

// ── Mensajes de ejemplo (sección "Deja tu deseo") ────────────────
export const DESEOS = [
  { author: 'La familia', text: '¡Que este nuevo capítulo esté lleno de salud, amor y aventuras!' },
  { author: 'Los amigos', text: 'Cincuenta años de hacer este mundo más alegre. ¡Brindamos por ti!' },
  { author: 'Todos', text: `Tu sonrisa ha iluminado nuestras vidas. ¡Feliz medio siglo, ${NOMBRE_FESTEJADO}!` },
]

// ── Confirmaciones (RSVP) ────────────────────────────────────────
// Pega aquí la URL de tu Google Apps Script (termina en /exec). Ver apps-script/LEEME-RSVP.md
// Si lo dejas vacío (''), el formulario solo muestra "¡Confirmado!" sin guardar nada.
export const RSVP_URL = 'https://script.google.com/macros/s/AKfycbwPeyjnkfBNnQP1oJEAsepYvYral92guQMYp1dFqe1wv2DoKHwTYMbY1Kl7uaxsEo8OVw/exec'

// ── Textos de la portada ─────────────────────────────────────────
export const FRASE_SUPERIOR = 'Queremos celebrar este momento contigo'
export const TEXTO_PORTADA =
  '50 años de historias, aprendizajes y momentos que merecen celebrarse. Te invitamos a acompañarlo en un día muy especial.'
export const TEXTO_BOTON = 'Te esperamos · Descubre más'

// ── Crédito al pie de la invitación ──────────────────────────────
export const CREDITO_WEB = 'https://invitalive.pe'
// Enlace del Instagram de Invitalive, ej: 'https://instagram.com/invitalive.pe'
// (si está vacío, no se muestra el ícono)
export const INSTAGRAM_URL = ''
