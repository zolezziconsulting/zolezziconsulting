/* ================================================================
   Generador del sitio.  node build.js
   ----------------------------------------------------------------
   Escribe las ocho páginas HTML —cuatro × dos idiomas— más el
   sitemap, a partir de una sola copia de la cabecera, el pie y los
   textos.

   EL HTML GENERADO SE VERSIONA. El proyecto de Cloudflare Pages
   publica archivos estáticos sin paso de compilación, así que el
   flujo es: editar `src/`, ejecutar `node build.js`, revisar el
   diff y hacer push. Si se edita un `index.html` a mano, el
   siguiente build lo pisa.
   ================================================================ */
const fs = require('fs');
const path = require('path');

const { pagina, RUTAS, SITIO } = require('./src/layout');
const paginas = require('./src/pages');
const es = require('./src/i18n/es');
const en = require('./src/i18n/en');

const IDIOMAS = { es, en };

/* Dónde aterriza cada ruta en el disco. Cloudflare Pages sirve
   `carpeta/index.html` en `/carpeta/`, que es lo que da las URLs
   limpias sin configuración extra. */
const archivoDe = (ruta) =>
  ruta === '/' ? 'index.html' : path.join(ruta.replace(/^\/|\/$/g, ''), 'index.html');

/* ── Datos estructurados ─────────────────────────────────────
   La organización se declara UNA vez, en la portada en español, con
   un @id estable. Las demás páginas la referencian por ese @id en
   lugar de repetirla: duplicar la ficha en ocho páginas es la forma
   más rápida de que las ocho acaben diciendo cosas distintas. */
const ORG_ID = SITIO + '/#organizacion';

function organizacion(t) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Zolezzi Solutions',
    legalName: 'Zolezzi Consulting',
    url: SITIO + '/',
    logo: SITIO + '/favicon.svg',
    image: SITIO + '/assets/img/og-zs.png',
    slogan: t.home.ogTitulo,
    description: t.home.desc,
    telephone: '+51941519053',
    email: 'zolezziconsulting@gmail.com',
    areaServed: { '@type': 'Country', name: 'Peru' },
    address: { '@type': 'PostalAddress', addressCountry: 'PE' },
    knowsLanguage: ['es', 'en'],
    knowsAbout: [
      'Market entry', 'Market development', 'Commercial representation',
      'Business development', 'Channel development', 'Enterprise technology',
      'Applied artificial intelligence', 'Process automation',
      'Fraud prevention', 'Risk management', 'Cybersecurity',
      'Data analytics', 'Enterprise SaaS'
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'business partnerships',
      email: 'zolezziconsulting@gmail.com',
      telephone: '+51941519053',
      availableLanguage: ['es', 'en']
    }],
    sameAs: [
      'https://www.linkedin.com/company/zolezzi-digitalgrowth/',
      'https://www.instagram.com/zolezziconsulting/'
    ]
  };
}

const servicio = (t, nombre, tipo, descripcion, audiencia) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: nombre,
  serviceType: tipo,
  description: descripcion,
  areaServed: { '@type': 'Country', name: 'Peru' },
  provider: { '@id': ORG_ID },
  audience: { '@type': 'BusinessAudience', audienceType: audiencia },
  availableLanguage: ['es', 'en']
});

const sobre = (t) => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: t.about.titulo,
  description: t.about.desc,
  mainEntity: { '@id': ORG_ID }
});

/* ── Construcción ────────────────────────────────────────────── */
const DEFINICIONES = [
  {
    clave: 'home',
    cuerpo: paginas.home,
    datos: (t) => t.home,
    jsonLd: (t) => organizacion(t)
  },
  {
    clave: 'partners',
    cuerpo: paginas.partners,
    datos: (t) => t.partners,
    jsonLd: (t) => servicio(
      t,
      t.lang === 'es' ? 'Desarrollo de mercado y representación comercial en el Perú'
                      : 'Market development and commercial representation in Peru',
      'Business development',
      t.partners.desc,
      t.lang === 'es' ? 'Empresas tecnológicas internacionales'
                      : 'International technology companies'
    )
  },
  {
    clave: 'solutions',
    cuerpo: paginas.solutions,
    datos: (t) => t.solutions,
    jsonLd: (t) => servicio(
      t,
      t.lang === 'es' ? 'Búsqueda y acceso a tecnología empresarial'
                      : 'Enterprise technology sourcing and access',
      'Technology sourcing',
      t.solutions.desc,
      t.lang === 'es' ? 'Empresas e instituciones peruanas'
                      : 'Peruvian companies and institutions'
    )
  },
  {
    clave: 'about',
    cuerpo: paginas.about,
    datos: (t) => t.about,
    jsonLd: (t) => sobre(t)
  }
];

let escritos = 0;
const rutasGeneradas = [];

for (const def of DEFINICIONES) {
  for (const lang of ['es', 'en']) {
    const t = IDIOMAS[lang];
    const d = def.datos(t);
    const html = pagina({
      t,
      clave: def.clave,
      titulo: d.titulo,
      descripcion: d.desc,
      ogTitulo: d.ogTitulo,
      ogDesc: d.ogDesc,
      jsonLd: def.jsonLd(t),
      cuerpo: def.cuerpo(t)
    });

    const destino = archivoDe(RUTAS[def.clave][lang]);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, html);
    rutasGeneradas.push(RUTAS[def.clave][lang]);
    escritos++;
    console.log('  ' + destino.padEnd(38) + (html.length / 1024).toFixed(1).padStart(6) + ' KB');
  }
}

/* El sitemap incluye las ocho URLs con sus alternativas recíprocas.
   Sin los `xhtml:link` Google trata las dos versiones como páginas
   distintas y acaba eligiendo una por su cuenta. */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${DEFINICIONES.flatMap(def => ['es', 'en'].map(lang => `  <url>
    <loc>${SITIO}${RUTAS[def.clave][lang]}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${SITIO}${RUTAS[def.clave].es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITIO}${RUTAS[def.clave].en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITIO}${RUTAS[def.clave].es}"/>
    <changefreq>monthly</changefreq>
    <priority>${def.clave === 'home' ? '1.0' : def.clave === 'partners' ? '0.9' : '0.8'}</priority>
  </url>`)).join('\n')}
</urlset>
`;
fs.writeFileSync('sitemap.xml', sitemap);

console.log('\n  sitemap.xml                             ' + (sitemap.length / 1024).toFixed(1).padStart(5) + ' KB');
console.log('\n' + escritos + ' páginas generadas en ' + rutasGeneradas.length + ' rutas.');
