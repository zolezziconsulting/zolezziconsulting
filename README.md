# ZOLEZZI Consulting

**Revenue Strategy & Execution** · Strategy · Marketing · Technology

Sitio single-page. HTML, CSS y JavaScript sin dependencias ni build. Se despliega
subiendo la carpeta tal cual.

## Estructura

```
index.html            Toda la página: hero, problema, enfoque + diagrama,
                      capacidades, metodología, resultados, FAQ, CTA,
                      contacto y pie
assets/css/styles.css Sistema de diseño completo
assets/js/main.js     Cabecera, menú móvil, revelados, raíles de scroll,
                      pestañas, acordeón y formulario
assets/fonts/         Inter (variable, subset latin, autoalojada)
assets/img/           og.jpg (1200×630) y apple-touch-icon.png
favicon.svg  robots.txt  sitemap.xml  site.webmanifest  _headers
```

`assets/fonts/bodoni-moda-latin.woff2` es un resto del concepto anterior: ya no se declara
ni se precarga, así que ningún navegador lo pide. Se puede borrar.

## Ver en local

```bash
npx --yes serve . -l 5173
```

Abrir `http://localhost:5173`. No uses `file://`: las rutas son absolutas y no cargarían.

## Al tocar CSS o JS: subir `?v=`

`_headers` cachea `/assets/css/*` y `/assets/js/*` como `immutable` durante un año y los
archivos no llevan hash en el nombre. Por eso `index.html` los enlaza con `?v=N`. **Hay que
subir ese número en cada cambio** o los visitantes recurrentes seguirán con la versión
vieja. Va por `v=8`.

## Desplegar

**Cloudflare Pages**, proyecto `zolezzi-digital`, rama de producción `main`:

```bash
npx wrangler pages deploy <carpeta> --project-name zolezzi-digital --branch main
```

El despliegue **no sale de esta carpeta directamente**. Antes hay que copiar a una carpeta
de staging y allí:

1. **Borrar `README.md`.** Un Direct Upload sirve público todo lo que subas, este archivo
   incluido.
2. **Reescribir el dominio.** El código local apunta a `https://zolezzi.digital/`, que
   todavía no está comprado. En el staging hay que sustituirlo por
   `https://zolezzi-digital.pages.dev` en `index.html` (canonical, Open Graph, Twitter,
   JSON-LD), `robots.txt` y `sitemap.xml`.

## Sistema de diseño

Concepto **«Monolito»**: claro dominante, bloques negros a sangre como ritmo, Inter
monumental y una atmósfera cálida animada de fondo.

Los bloques oscuros (`.sec--dark`, `.cta`, `.ftr`) **no redefinen componentes**: reasignan
los tokens de color en su propio ámbito y todo lo de dentro se invierte solo. Cualquier
componente nuevo debe usar tokens, nunca colores literales, o romperá esa inversión.

| Token       | Claro     | Oscuro    | Uso                            |
|-------------|-----------|-----------|--------------------------------|
| `--canvas`  | `#fafaf8` | `#0b0b0c` | Lienzo                         |
| `--ink`     | `#0b0b0c` | `#fafaf8` | Texto principal                |
| `--ink-2`   | `#56565b` | `#a2a2a7` | Texto secundario               |
| `--ink-3`   | `#6f6f75` | `#7a7a80` | Etiquetas y metadatos          |
| `--rule`    | `#e3e3de` | 15% ink   | Filetes de 1px                 |
| `--maxw`    | `1340px`  |           | Ancho del **contenido**        |
| `--shell`   | `--maxw` + márgenes | | `max-width` de los contenedores |

La gama cálida vive en `--warm-1..5` como tripletes RGB, para poder darles alfa con
`rgb(var(--warm-3) / .26)`:

`#b3200a` · `#ff3b0f` · `#ff6a00` · `#ffa51f` · `#ffc531`

**Regla del color:** nunca como texto ni como relleno, solo como campo difuso. El ámbar
sobre el lienzo claro da 1.5:1 de contraste; usado como tinta sería ilegible. Por eso la
identidad de cada práctica y de cada capacidad del diagrama es un halo, no un color de
letra.

Dos capas fijas al viewport (`body::before/::after`) cubren las secciones claras y un campo
más denso (`.aura`) vive dentro del hero. Las duraciones de las derivas no son múltiplos
entre sí: al desfasarse, la composición nunca se repite.

Tipografía: **Inter** para todo, variable y autoalojada. Sin peticiones a Google Fonts. La
jerarquía la da el tamaño, nunca el grosor.

## Restricciones que no se ven en el código

- **Correo público: `zolezziconsulting@gmail.com`.** Aparece como `mailto:` en la sección
  Contacto y en el pie, y en el JSON-LD (`email` de la organización y del `contactPoint`).
  Hasta el 2026-07-29 no se publicaba ninguno; si vuelve a retirarse, hay que quitarlo de
  esos cuatro sitios.
- **El destino del formulario NO se configura aquí.** Formspree entrega al correo dado de
  alta en la cuenta del endpoint `mdaqjygn`; no existe ningún campo del HTML que lo cambie
  —lo retiraron justamente para que nadie pueda redirigir un formulario ajeno—. Para
  cambiarlo hay que entrar en formspree.io. Que el `mailto:` de la página apunte a una
  dirección no implica que el formulario entregue ahí.
- **No hay sección de tecnologías ni muro de logos.** Es una decisión de posicionamiento: la
  práctica *Technology* ya presenta la tecnología como capacidad al servicio de la
  estrategia. Una firma de consultoría no enseña sus herramientas.
- **El `<h2>` de sección tope en `2.875rem`** porque es lo que cabe en la columna pegajosa
  sin que la palabra más larga se salga. Para agrandarlo hay que ensanchar antes
  `.sec__head`.
- El formulario envía por **Formspree** (`fetch` con POST nativo de respaldo). Endpoint
  conectado y verificado: `https://formspree.io/f/mdaqjygn`. El campo `_gotcha` es un
  honeypot antispam; no tocarlo.
- El número de WhatsApp vive en la constante `WA_NUM` de `main.js` y se inyecta en los
  enlaces `[data-wa]`. También aparece en el JSON-LD.
- **`.drawer[hidden] { display: none }` no es redundante: es imprescindible.** El
  `[hidden]{display:none}` del navegador tiene especificidad casi nula y lo anula cualquier
  regla de clase que declare `display`. Sin esa línea el cajón queda invisible pero
  `position:fixed; inset:0` y clicable, y se come todos los clics de la página. Ya ocurrió
  una vez. Lo mismo vale para cualquier panel futuro que combine `[hidden]` con `display`.
