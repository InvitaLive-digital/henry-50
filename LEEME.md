# Invitación 50 años

## Editar la información
Todo está en **src/datos.ts** (nombre, fecha, lugar, mapa, fotos, música, programa, mensajes).
Colores y tipografías: **src/index.css** (bloque `@theme`).
Diseño/estructura: **src/App.tsx** (solo si quieres cambiar secciones).

Fotos y música propias → ponlas en `public/` y en datos.ts escribe `'./mi-foto.jpg'`.

## Usar
1. Instala Node.js 20 o superior.
2. En esta carpeta: `npm install`
3. Vista previa en vivo: `npm run dev`
4. Versión final para publicar: `npm run build` → sube el contenido de `dist/` (Netlify, Vercel, GitHub Pages, hosting propio).

## Importante
El formulario guarda en Google Sheets, envía correos y avisa por WhatsApp una vez configurado.
Instrucciones: apps-script/LEEME-RSVP.md
