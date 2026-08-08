/* ================================================================
   POST /api/contact — pasarela del formulario de contacto
   ----------------------------------------------------------------
   Cloudflare Pages ejecuta como Function todo lo que viva en
   `functions/`. Esta ruta existe por un motivo concreto: hasta el
   2026-08-07 el `action` del formulario era el endpoint de Formspree
   escrito en el HTML, así que CUALQUIERA que abriese el código fuente
   —o cualquier robot que rastrease la página— se llevaba una URL
   contra la que enviar formularios directamente, sin pasar por el
   sitio. Con la cuota mensual de Formspree eso es un buzón inutilizado
   en una tarde.

   Ahora el navegador solo conoce `/api/contact`. El endpoint real vive
   en una variable de entorno del proyecto de Pages y nunca se sirve al
   cliente.

   CONFIGURACIÓN (una vez, en el panel de Cloudflare):
     Workers & Pages → el proyecto → Settings → Variables and Secrets
     FORMSPREE_ENDPOINT = https://formspree.io/f/XXXXXXXX   (secreto)
   Mientras no se defina, se usa FORMSPREE_RESPALDO de aquí abajo, que
   es el endpoint que ya estaba publicado en el HTML: así el formulario
   no se rompe con este despliegue. En cuanto la variable esté puesta
   conviene ROTAR el formulario en Formspree y borrar el respaldo; el
   viejo queda expuesto en el historial de este repositorio, que es
   público.

   Lo que esta función NO puede hacer sola: limitar por IP (haría falta
   un binding de KV) ni resolver un captcha. Si aparece spam, el
   siguiente paso es Cloudflare Turnstile más la restricción de dominio
   del propio panel de Formspree.
   ================================================================ */

const FORMSPREE_RESPALDO = 'https://formspree.io/f/mdaqjygn';

/* Cuerpo máximo aceptado. El campo de texto libre admite 4000
   caracteres; 32 KB deja margen de sobra para eso y para las cabeceras
   del multipart, y corta en seco cualquier intento de enviar un
   volcado por el formulario. */
const MAX_CUERPO = 32 * 1024;

/* Los mismos nombres que el marcado. Cualquier campo que no esté aquí
   se descarta: un atacante no puede inyectar campos extra al correo. */
const CAMPOS = {
  nombre:   { max: 120,  requerido: true },
  empresa:  { max: 160,  requerido: false },
  email:    { max: 160,  requerido: true },
  telefono: { max: 40,   requerido: false },
  servicio: { max: 90,   requerido: false },
  mensaje:  { max: 4000, requerido: true }
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Corta en el primer salto de línea o retorno de carro. Es lo que
   impide inyectar cabeceras en el correo que Formspree compone a
   partir de estos valores. Solo se aplica a los campos de una línea. */
function unaLinea(v) {
  return v.split(/[\r\n]/)[0];
}

/* `_headers` solo alcanza a los assets estáticos: las respuestas de una
   Function salen sin ninguna de esas cabeceras. Comprobado. Así que las
   pone aquí. La CSP es la mínima que necesita la página de respaldo de
   más abajo —hoja propia y nada más—, y para el JSON sobra, pero no
   estorba y evita que las dos ramas diverjan. */
const SEGURIDAD = {
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex, nofollow',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'cross-origin-opener-policy': 'same-origin',
  'content-security-policy':
    "default-src 'none'; style-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
};

function json(estado, cuerpo) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { ...SEGURIDAD, 'content-type': 'application/json; charset=utf-8' }
  });
}

/* Respaldo para el envío nativo del navegador, que solo ocurre si
   `fetch` no existe y por tanto tampoco corre el JS que pinta el aviso
   en la página. Se apoya en la hoja del sitio, sin estilos en línea:
   la CSP de `_headers` los bloquearía. */
function pagina(estado, titulo, texto) {
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo} · ZOLEZZI Consulting</title>
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/styles.css">
</head><body><main class="sec"><div class="sec__grid"><div class="sec__head">
<h1 class="h2">${titulo}</h1><p class="sec__note">${texto}</p>
<p class="sec__note"><a class="lnk" href="/">Volver al inicio</a></p>
</div></div></main></body></html>`;
  return new Response(html, {
    status: estado,
    headers: { ...SEGURIDAD, 'content-type': 'text/html; charset=utf-8' }
  });
}

/* El navegador manda `Origin` en todo POST, también en los del mismo
   sitio. Se exige que coincida con el host de esta misma petición, lo
   que cubre producción, los despliegues de vista previa y el servidor
   local sin tener que mantener una lista de dominios. `Referer` es el
   respaldo para navegadores viejos que omiten `Origin`. */
function mismoSitio(request) {
  const propio = new URL(request.url).host;
  const cabecera = request.headers.get('Origin') || request.headers.get('Referer');
  if (!cabecera) return false;
  try {
    return new URL(cabecera).host === propio;
  } catch {
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const quiereJson = (request.headers.get('Accept') || '').includes('application/json');
  const fallo = (estado, texto) =>
    quiereJson
      ? json(estado, { ok: false, error: texto })
      : pagina(estado, 'No pudimos enviar su mensaje', texto);

  if (!mismoSitio(request)) {
    return fallo(403, 'La solicitud no procede de este sitio.');
  }

  const tipo = request.headers.get('Content-Type') || '';
  if (!/^(multipart\/form-data|application\/x-www-form-urlencoded)/.test(tipo)) {
    return fallo(415, 'Formato de envío no admitido.');
  }

  const declarado = Number(request.headers.get('Content-Length') || 0);
  if (declarado > MAX_CUERPO) {
    return fallo(413, 'El mensaje es demasiado largo.');
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return fallo(400, 'No pudimos leer el formulario.');
  }

  /* Trampa: el campo `_gotcha` está oculto y ningún visitante lo
     rellena. Se responde 200 a propósito —el robot cree que ha
     funcionado y no reintenta— pero no se reenvía nada. */
  const trampa = form.get('_gotcha');
  if (typeof trampa === 'string' && trampa.trim() !== '') {
    return quiereJson ? json(200, { ok: true }) : pagina(200, 'Gracias', 'Hemos recibido su mensaje.');
  }

  const datos = {};
  for (const [campo, regla] of Object.entries(CAMPOS)) {
    const bruto = form.get(campo);
    // Un File en un campo de texto significa marcado manipulado.
    const valor = typeof bruto === 'string' ? bruto.trim() : '';

    if (regla.requerido && valor.length < 2) {
      return fallo(422, 'Faltan datos obligatorios.');
    }
    if (valor.length > regla.max) {
      return fallo(422, 'Algún campo supera la longitud permitida.');
    }
    if (valor) datos[campo] = campo === 'mensaje' ? valor : unaLinea(valor);
  }

  if (!EMAIL.test(datos.email)) {
    return fallo(422, 'El correo no tiene un formato válido.');
  }

  const destino = env.FORMSPREE_ENDPOINT || FORMSPREE_RESPALDO;

  let respuesta;
  try {
    respuesta = await fetch(destino, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...datos,
        // Formspree usa `_replyto` para que «Responder» vaya al remitente.
        _replyto: datos.email,
        _subject: 'Consulta desde zolezziconsulting.com' + (datos.servicio ? ' · ' + datos.servicio : '')
      })
    });
  } catch {
    return fallo(502, 'El servicio de correo no respondió. Vuelva a intentarlo o escríbanos por WhatsApp.');
  }

  /* El error de arriba NUNCA se propaga tal cual: el cuerpo de una
     respuesta de Formspree puede nombrar el endpoint o la cuenta, y
     eso es justo lo que esta función existe para no enseñar. */
  if (!respuesta.ok) {
    return fallo(502, 'No pudimos entregar su mensaje. Vuelva a intentarlo o escríbanos por WhatsApp.');
  }

  return quiereJson
    ? json(200, { ok: true })
    : pagina(200, 'Gracias', 'Hemos recibido su mensaje y le responderemos en un día hábil.');
}

/* Cualquier otro método. Sin esto, un GET a /api/contact caería al
   manejador estático y devolvería un 404 genérico. */
export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...SEGURIDAD, Allow: 'POST' } });
  }
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { ...SEGURIDAD, 'content-type': 'text/plain; charset=utf-8', Allow: 'POST' }
  });
}
