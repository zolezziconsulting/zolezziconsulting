/* ================================================================
   Plantilla común: cabeza, cabecera, cajón móvil y pie.
   ----------------------------------------------------------------
   Existe por una razón concreta: el sitio es bilingüe y tiene cuatro
   páginas, o sea OCHO archivos HTML. Mantener a mano ocho copias de
   la cabecera, el pie y los metadatos garantiza que antes o después
   se desincronicen —un enlace nuevo en el menú que solo aparece en
   cinco de ellas—. Aquí hay una sola copia.

   El HTML generado SÍ se versiona en el repositorio: el proyecto de
   Cloudflare Pages publica archivos estáticos sin paso de
   compilación, y cambiar eso exigiría tocar el panel. Así que se
   ejecuta `node build.js` y se sube el resultado.
   ================================================================ */

const RUTAS = {
  home:      { es: '/',                     en: '/en/' },
  partners:  { es: '/technology-partners/', en: '/en/technology-partners/' },
  solutions: { es: '/soluciones/',          en: '/en/solutions/' },
  about:     { es: '/nosotros/',            en: '/en/about/' }
};

const SITIO = 'https://zolezziconsulting.com';
const WA_NUM = '51941519053';
const EMAIL = 'zolezziconsulting@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/company/zolezzi-digitalgrowth/';
const INSTAGRAM = 'https://www.instagram.com/zolezziconsulting/';

/* Versión de los assets. `_headers` los marca `immutable` un año y no
   llevan hash en el nombre, así que esto es lo único que fuerza a un
   visitante recurrente a bajarse el CSS nuevo. SUBIRLO EN CADA CAMBIO
   de styles.css, tokens.css o main.js. */
const V = 8;

/* URL completa de WhatsApp con el mensaje precargado. Se arma aquí
   y no en el navegador para que el enlace funcione sin JavaScript. */
const waUrl = (t) => 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(t.wa.mensaje);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* El sprite. La marca va duplicada en cada página en vez de en un
   archivo aparte porque un `<use href="otro.svg#id">` externo es una
   petición más y, sobre todo, no hereda `currentColor`. */
const sprite = () => `
<svg class="vh" aria-hidden="true" focusable="false" width="0" height="0">
  <defs>
    <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12h15m-6.5-6.5L19 12l-6.5 6.5"/></symbol>
    <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></symbol>
    <!-- La marca. Tres piezas: barra global, puente, barra local.
         La diagonal lleva el degradado de la costura y es la única
         pieza que lo lleva: ES el negocio. -->
    <symbol id="i-zs" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#071A2E"/>
      <path fill="#8AA6FF" d="M12 14h40v8H12z"/>
      <path fill="url(#zs-seam)" d="M52 22 39 22 12 42 25 42z"/>
      <path fill="#5FD8E4" d="M12 42h40v8H12z"/>
    </symbol>
    <linearGradient id="zs-seam" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8AA6FF"/>
      <stop offset="1" stop-color="#5FD8E4"/>
    </linearGradient>
  </defs>
</svg>`;

const marca = (t) => `
    <a class="brand" href="${RUTAS.home[t.lang]}" aria-label="${esc(t.nav.inicioAria)}">
      <svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true"><use href="#i-zs"/></svg>
      <span class="brand__txt">
        <span class="brand__name">ZOLEZZI</span>
        <span class="brand__sub">Solutions</span>
      </span>
    </a>`;

/* Selector de idioma. Son DOS ENLACES reales a la misma página en el
   otro idioma, no un desplegable con JavaScript: así funciona sin
   scripts, lo sigue un rastreador y el `hreflang` de la cabeza y el
   del enlace dicen lo mismo. */
const idiomas = (t, clave) => {
  const otro = t.lang === 'es' ? 'en' : 'es';
  return `
      <a class="lang" href="${RUTAS[clave][otro]}" hreflang="${otro}" lang="${otro}"
         aria-label="${esc(t.nav.cambiarIdioma)}">
        <svg aria-hidden="true"><use href="#i-globe"/></svg>
        <span><b>${t.lang.toUpperCase()}</b> / ${otro.toUpperCase()}</span>
      </a>`;
};

const navEnlaces = (t, clave, claseBase) =>
  ['partners', 'solutions', 'about'].map(k => {
    const aqui = k === clave;
    return `<a class="${claseBase}${aqui ? ' is-here' : ''}" href="${RUTAS[k][t.lang]}"${aqui ? ' aria-current="page"' : ''}>${esc(t.nav[k])}</a>`;
  }).join('\n      ');

const cabecera = (t, clave) => `
<header class="hdr" id="hdr">
  <div class="hdr__in">
    ${marca(t)}
    <nav class="nav" aria-label="${esc(t.nav.principal)}">
      ${navEnlaces(t, clave, 'nav__link')}
    </nav>
    <div class="hdr__end">
      ${idiomas(t, clave)}
      <a class="btn" href="${RUTAS.partners[t.lang]}#form"><span>${esc(t.nav.cta)}</span></a>
      <button class="burger" id="burger" type="button" aria-label="${esc(t.nav.abrirMenu)}" aria-expanded="false" aria-controls="drawer">
        <span></span><span></span>
      </button>
    </div>
  </div>
  <div class="hdr__bar" id="hdr-bar" aria-hidden="true"></div>
</header>

<div class="drawer" id="drawer" hidden>
  <nav class="drawer__nav" aria-label="${esc(t.nav.movil)}">
    <a href="${RUTAS.home[t.lang]}"><span class="drawer__n">01</span>${esc(t.nav.home)}</a>
    <a href="${RUTAS.partners[t.lang]}"><span class="drawer__n">02</span>${esc(t.nav.partners)}</a>
    <a href="${RUTAS.solutions[t.lang]}"><span class="drawer__n">03</span>${esc(t.nav.solutions)}</a>
    <a href="${RUTAS.about[t.lang]}"><span class="drawer__n">04</span>${esc(t.nav.about)}</a>
  </nav>
  <div class="drawer__foot">
    <a class="lnk" href="${waUrl(t)}" target="_blank" rel="noopener">WhatsApp</a>
    <a class="lnk" href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>
    ${idiomas(t, clave)}
  </div>
</div>`;

const pie = (t) => `
<footer class="deep ftr">
  <div class="shell">
    <div class="ftr__top">
      <div>
        ${marca(t)}
        <p class="ftr__claim">${esc(t.pie.claim)}</p>
      </div>

      <nav class="ftr__cols" aria-label="${esc(t.pie.aria)}">
        <div class="ftr__col">
          <h2>${esc(t.pie.col1)}</h2>
          <ul>
            <li><a href="${RUTAS.partners[t.lang]}">${esc(t.nav.partners)}</a></li>
            <li><a href="${RUTAS.solutions[t.lang]}">${esc(t.nav.solutions)}</a></li>
            <li><a href="${RUTAS.about[t.lang]}">${esc(t.nav.about)}</a></li>
          </ul>
        </div>
        <div class="ftr__col">
          <h2>${esc(t.pie.col2)}</h2>
          <ul>
            <li><a href="${RUTAS.home[t.lang]}#modelo">${esc(t.pie.modelo)}</a></li>
            <li><a href="${RUTAS.home[t.lang]}#alcance">${esc(t.pie.alcance)}</a></li>
            <li><a href="${RUTAS.partners[t.lang]}#colaboracion">${esc(t.pie.colaboracion)}</a></li>
          </ul>
        </div>
        <div class="ftr__col ftr__col--wide">
          <h2>${esc(t.pie.col3)}</h2>
          <ul>
            <li><a href="${waUrl(t)}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a class="ftr__mail" href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="ftr__bot">
      <p>&copy; <span id="year">2026</span> Zolezzi Solutions. ${esc(t.pie.derechos)}</p>
      <p>${esc(t.pie.razonSocial)}</p>
    </div>
  </div>
</footer>`;

/* `hreflang` recíproco y `x-default`. Las dos versiones se declaran
   en AMBAS páginas —si solo una apunta a la otra, Google ignora el
   par— y el `x-default` va al español, que es el idioma del dominio. */
const alternativas = (clave) => `
<link rel="alternate" hreflang="es" href="${SITIO}${RUTAS[clave].es}">
<link rel="alternate" hreflang="en" href="${SITIO}${RUTAS[clave].en}">
<link rel="alternate" hreflang="x-default" href="${SITIO}${RUTAS[clave].es}">`;

function pagina({ t, clave, titulo, descripcion, ogTitulo, ogDesc, jsonLd, cuerpo }) {
  const url = SITIO + RUTAS[clave][t.lang];
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<meta name="theme-color" content="#071A2E">
<link rel="canonical" href="${url}">
${alternativas(clave)}

<meta property="og:type" content="website">
<meta property="og:site_name" content="Zolezzi Solutions">
<meta property="og:locale" content="${t.lang === 'es' ? 'es_PE' : 'en_US'}">
<meta property="og:locale:alternate" content="${t.lang === 'es' ? 'en_US' : 'es_PE'}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(ogTitulo || titulo)}">
<meta property="og:description" content="${esc(ogDesc || descripcion)}">
<meta property="og:image" content="${SITIO}/assets/img/og-zs.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.meta.ogAlt)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(ogTitulo || titulo)}">
<meta name="twitter:description" content="${esc(ogDesc || descripcion)}">
<meta name="twitter:image" content="${SITIO}/assets/img/og-zs.png">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/tokens.css?v=${V}">
<link rel="stylesheet" href="/assets/css/styles.css?v=${V}">
<!-- Autorizado en la CSP POR HASH, no con 'unsafe-inline'. Las ocho
     páginas llevan exactamente esta línea para que el hash sea único.
     Si se cambia un carácter hay que recalcularlo en _headers. -->
<script>document.documentElement.classList.add('js');</script>
<script src="/assets/js/main.js?v=${V}" defer></script>

<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
</head>

<body data-menu-open="${esc(t.nav.abrirMenu)}" data-menu-close="${esc(t.nav.cerrarMenu)}">
<a class="skip" href="#contenido">${esc(t.nav.saltar)}</a>
${sprite()}
${cabecera(t, clave)}

<main id="contenido">
${cuerpo}
</main>
${pie(t)}

</body>
</html>
`;
}

module.exports = { pagina, waUrl, RUTAS, SITIO, WA_NUM, EMAIL, LINKEDIN, INSTAGRAM, esc, V };
