import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ── Dirección donde está publicada la invitación ─────────────────
// Necesaria para que al compartir el enlace (WhatsApp, Facebook) salga
// la foto de vista previa. Ej: 'https://henry50.netlify.app' (sin "/" al final)
const SITIO_URL = ''

// base: './' permite subir la carpeta dist/ a cualquier hosting (incluso en una subcarpeta)
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'vista-previa-enlace',
      transformIndexHtml: html => html.replaceAll('__SITIO_URL__', SITIO_URL.replace(/\/+$/, '')),
    },
  ],
})
