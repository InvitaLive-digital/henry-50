# Configurar las confirmaciones (≈10 minutos)

Cuando alguien confirma en la invitación:
- se guarda una fila en tu hoja de Google Sheets;
- te llega un **correo** con sus datos, el total de confirmados y un botón para **agradecerle por WhatsApp**;
- al invitado le llega un **correo de agradecimiento** (solo si escribió su correo);
- opcional: te llega un **WhatsApp automático** avisando que alguien confirmó.

## 1. Crear la hoja y pegar el código
1. Entra a https://sheets.new y ponle un nombre, ej. "Confirmaciones Henry 50".
2. Menú **Extensiones → Apps Script**.
3. Borra todo lo que aparece y pega el contenido completo de `Codigo.gs`.
4. En el bloque `CONFIG` cambia:
   - `CORREO_ANFITRION`: el correo donde quieres recibir los avisos.
   - `LUGAR` y `MAPA_LINK`: dirección y enlace de Google Maps del local.
5. Guarda (💾).

## 2. Autorizar y probar
1. Arriba, en el selector de funciones, elige **probar** y pulsa **▶ Ejecutar**.
2. Google pedirá permisos → "Revisar permisos" → tu cuenta → **"Configuración avanzada" → "Ir a (proyecto) (no seguro)"** → Permitir.
   (El aviso de "app no verificada" es normal: el script es tuyo.)
3. Debe aparecer la pestaña **Confirmaciones** con una fila "Prueba" y te llegarán 2 correos. Luego borra esa fila.

## 3. Publicarlo y conectarlo a la invitación
1. **Implementar → Nueva implementación** → ⚙️ tipo **Aplicación web**.
2. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier persona** (o "Cualquier usuario").
3. Pulsa **Implementar** y copia la URL (termina en `/exec`).
4. Pégala en `src/datos.ts`:
   ```ts
   export const RSVP_URL = 'https://script.google.com/macros/s/XXXX/exec'
   ```
5. Vuelve a publicar la invitación (`npm run build`).

⚠️ Si después cambias el código del script: **Implementar → Gestionar implementaciones → ✏️ → Versión: Nueva versión → Implementar**. Así la URL no cambia.

## 4. (Opcional) Aviso automático a tu WhatsApp — CallMeBot
1. Guarda en tus contactos el número que indica https://www.callmebot.com/blog/free-api-whatsapp-messages/
2. Envíale por WhatsApp exactamente: `I allow callmebot to send me messages`
3. Te responderá con tu **apikey**.
4. En `CONFIG`: `WHATSAPP_NUMERO: '51999999999'` (tu número) y `WHATSAPP_APIKEY: 'la-clave'`.
5. Guarda y crea una **nueva versión** (ver ⚠️ arriba). Ejecuta `probar` para comprobarlo.

## Límites
- Gmail gratuito: ~100 correos al día (cada confirmación usa hasta 2) → ~50 confirmaciones diarias.
- CallMeBot es gratuito y solo puede escribir a **tu** número; no envía mensajes a los invitados.
  Para agradecerles por WhatsApp usa el botón verde del correo o el enlace de la columna "Responder por WhatsApp".
