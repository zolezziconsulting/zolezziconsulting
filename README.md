# ZOLEZZI Consulting

**Estudios de mercado** · Viabilidad · Competencia · Pricing

Sitio single-page. HTML, CSS y JavaScript sin dependencias ni build, más una única
Cloudflare Pages Function para el formulario.

## Qué vende el sitio

Reestructurado el 2026-08-07. Antes eran mandatos largos de consultoría comercial y
go-to-market; ahora son **tres estudios independientes** más la ejecución:

| # | Servicio | Pregunta que responde | Entregable |
|---|----------|-----------------------|------------|
| 01 | Viabilidad de negocio en zona | ¿Dónde? | Score de viabilidad + recomendación de enfoque |
| 02 | Análisis de competencia | ¿Contra quién? | Matriz comparativa + mapa de posicionamiento + huecos |
| 03 | Estudio de pricing | ¿A cuánto? | Rango recomendado + escenarios |

Los tres se venden **por separado** porque cada uno responde una pregunta de negocio
distinta. Lo único que comparten es la lista de competidores: el 02 la levanta y el 03
puede reutilizarla, y eso —no un descuento arbitrario— es lo que justifica el paquete.

Los apartados «Qué no incluye» de cada estudio **no son relleno legal**: son el mecanismo
que impide que los tres se confundan entre sí y acaben fusionados en un servicio genérico
de investigación. Si se borran, vuelve el solapamiento.

**La firma NO vende nada más.** El 2026-08-09 se eliminaron por completo las secciones de
marketing digital (SEO, GEO, Google Business Profile, Google Ads) y de tecnología (web,
automatización, IA, infraestructura, seguridad, cumplimiento). No fue una poda de catálogo:
fue una decisión de enfoque. La página entera —menú, desafíos, metodología, FAQ, formulario,
pie y datos estructurados— está escrita para que se entienda que solo hay un tipo de
servicio. Si vuelve a añadirse un servicio de ejecución, hay que revisar la FAQ: una de las
seis preguntas vende justamente lo contrario, que no ejecutamos lo que recomendamos, y ese
es hoy el argumento de independencia de la firma.

**La captación va por WhatsApp.** Es el único botón de la página. El formulario sigue
existiendo para quien prefiera contar el caso por escrito, y se llega a él por «Contacto»
del menú; los botones que llevaban a él se retiraron el 2026-08-09. El enlace de WhatsApp
lleva el mensaje precargado, así que el visitante solo tiene que pulsar enviar: eso vive en
`WA_NUM` y `WA_MSG` de `main.js`, no en el marcado.

## Estructura

```
index.html            Hero, desafíos, los tres estudios, metodología,
                      FAQ, CTA, contacto y pie
assets/css/styles.css Sistema de diseño completo
assets/js/main.js     Cabecera, menú móvil, revelados, raíles de scroll,
                      acordeón y formulario
assets/fonts/         Inter (variable, subset latin, autoalojada)
assets/img/           og-v2.jpg (1200×630) y apple-touch-icon.png
functions/api/        contact.js — pasarela del formulario
favicon.svg  robots.txt  sitemap.xml  site.webmanifest
_headers  _redirects
```

`assets/fonts/bodoni-moda-latin.woff2` es un resto del concepto anterior: ya no se declara
ni se precarga, así que ningún navegador lo pide. Se puede borrar.

## Ver en local

```bash
npx --yes wrangler pages dev . --port 8788 --compatibility-date=2026-08-07
```

Hay que usar **wrangler y no un servidor estático**: es lo único que aplica `_headers`,
`_redirects` y la Function de `/api/contact`. Con `npx serve` la página se ve, pero el
formulario devuelve 404 y no hay ni una cabecera de seguridad, así que no sirve para
comprobar nada de eso. No uses `file://`: las rutas son absolutas y no cargarían.

Para probar el formulario **sin enviar correo de verdad**, crea un `.dev.vars` (está en
`.gitignore`) apuntando a un receptor local y reinicia wrangler —solo lee ese archivo al
arrancar—:

```
FORMSPREE_ENDPOINT="http://127.0.0.1:8791/"
```

## Formulario: la pasarela de `/api/contact`

Hasta el 2026-08-07 el `action` del formulario era el endpoint de Formspree escrito en el
HTML. Cualquiera que abriese el código fuente —o cualquier robot que rastrease la página—
se llevaba una URL contra la que enviar formularios saltándose el sitio. Con la cuota
mensual de Formspree, eso es un buzón inutilizado en una tarde.

Ahora el navegador solo conoce `/api/contact`. `functions/api/contact.js` comprueba que el
origen es este mismo sitio, valida en servidor, descarta los campos que no estén en su
lista blanca, corta los saltos de línea de los campos de una sola línea —inyección de
cabeceras de correo— y reenvía. El endpoint real nunca se sirve al cliente.

### Configuración pendiente (una vez, en el panel de Cloudflare)

> Workers & Pages → el proyecto → Settings → Variables and Secrets
> `FORMSPREE_ENDPOINT` = `https://formspree.io/f/XXXXXXXX` **como secreto**

Mientras no exista esa variable, la Function usa el endpoint de respaldo que ya estaba
publicado en el HTML, así que el formulario **no se rompe** con este despliegue. En cuanto
la variable esté puesta conviene **rotar el formulario en Formspree** y borrar el respaldo
de `contact.js`: el viejo queda en el historial de este repositorio, que es público.

Lo que la Function no puede hacer sola es limitar por IP —haría falta un binding de KV— ni
resolver un captcha. Si aparece spam, el siguiente paso es Cloudflare Turnstile más la
restricción de dominio del propio panel de Formspree.

## Seguridad: `_headers` y `_redirects`

`_headers` publica CSP, HSTS, COOP, `Permissions-Policy`, `X-Content-Type-Options`,
`X-Frame-Options` y `Referrer-Policy`. Tres cosas que cuestan un rato descubrir:

- **Las reglas se SUMAN, no se sustituyen.** Declarar `Cross-Origin-Resource-Policy` en
  `/*` y otra vez en `/assets/img/*` produce la cabecera literal
  `same-origin, cross-origin`, que no es un valor válido. Por eso CORP va ruta por ruta.
- **`_headers` no alcanza a las Functions.** `/api/contact` salía sin ninguna cabecera de
  seguridad; se las pone `contact.js` por su cuenta.
- **La CSP autoriza el script en línea POR HASH**, no con `'unsafe-inline'`. Si se toca esa
  única línea de `index.html`, hay que recalcular el hash o el sitio se queda sin
  JavaScript:

  ```bash
  node -e "console.log(require('crypto').createHash('sha256').update(\"document.documentElement.classList.add('js');\").digest('base64'))"
  ```

`_redirects` tapa `README.md` y `.gitignore`. El proyecto de Pages publica la raíz del
repositorio tal cual, así que **todo archivo suelto queda servido en el dominio**:
`https://zolezziconsulting.com/README.md` devolvía este documento con `text/markdown` e
indexable. Si se añade otro archivo de trabajo en la raíz, hay que añadirlo también ahí.

## Al cambiar la imagen Open Graph: RENOMBRARLA

`_headers` marca `/assets/img/*` como `immutable` durante un año y la etiqueta `og:image` no
admite `?v=`. Sobrescribir el archivo **no sirve**: ni el CDN ni —lo importante— LinkedIn,
WhatsApp y Facebook la refrescan, porque cachean la vista previa por URL. Hay que **cambiar
el nombre** (`og.jpg` → `og-v2.jpg` → …) y actualizar las cuatro referencias de `index.html`:
`og:image`, `twitter:image` y el `logo` e `image` del JSON-LD.

## Al tocar CSS o JS: subir `?v=`

`_headers` cachea `/assets/css/*` y `/assets/js/*` como `immutable` durante un año y los
archivos no llevan hash en el nombre. Por eso `index.html` los enlaza con `?v=N`. **Hay que
subir ese número en cada cambio** o los visitantes recurrentes seguirán con la versión
vieja. Va por `v=23`.

## Adaptación a móvil: la trampa del `min-width: auto`

Corregido el 2026-08-07, después de que el sitio se viera **al 75 % en móvil**. Merece
apartado porque son tres fallos distintos con la misma forma y volverán si alguien añade
contenido ancho:

1. **`grid-column` que sobrevive al media query.** `.sec__grid--wide .sec__head` tiene
   especificidad (0,2,0) y el media query lo anulaba con `.sec__head` (0,1,0). Los media
   queries no añaden especificidad, así que perdía: seguían existiendo 12 pistas de rejilla
   con 32 px de hueco —352 px— dentro de un contenedor de 334. El documento medía 504 px en
   una pantalla de 375 y el navegador encogía la página entera.
2. **`min-width: auto` en los ítems de rejilla.** Un ítem no baja del min-content de lo que
   lleva dentro. La matriz comparativa, con sus 480 px de `min-width`, ensanchaba su pista,
   luego la rejilla, luego el documento. De ahí `.sec__grid > * { min-width: 0 }` y lo mismo
   en `.ftr__col`.
3. **Absolutos que escapan del contenedor con scroll.** Los `.vh` de las celdas son
   `position: absolute`; sin `position: relative` en `.tscroll`, su bloque contenedor era el
   `.sec__grid` de la sección y conservaban su posición estática dentro de la tabla de
   480 px, fuera del recorte.

Los tres titulares grandes llevan `min(clamp(…), Nvw)`. El `clamp` deja de encoger por
debajo de unos 420 px mientras el contenedor sigue estrechándose, y la línea más larga se
parte en dos —lo que rompe `.mask`, que anima UNA línea por `.ln`—. **Si se escribe un
titular más largo que los actuales hay que volver a medir y bajar el coeficiente.**

Comprobado sin desbordamiento ni reescalado en 320, 375, 414, 768, 1024, 1180 y 1440 px.

## Desplegar

**El dominio de producción es `https://zolezziconsulting.com`** y se sirve desde este
repositorio de GitHub (`zolezziconsulting/zolezziconsulting`). Un `git push` a `main` publica.

```bash
git push
```

El dominio `zolezzi.digital` que aparecía antes en canonical, Open Graph, JSON-LD, `robots.txt`
y `sitemap.xml` **nunca llegó a existir** —el DNS no resolvía—, así que el canonical mandaba a
Google a un dominio muerto y las vistas previas al compartir salían sin imagen. Corregido el
2026-07-30. Si algún día cambia el dominio, hay que tocarlo en esos tres archivos a la vez.

Existe además un proyecto antiguo de Cloudflare Pages, `zolezzi-digital`, servido por Direct
Upload en `zolezzi-digital.pages.dev`. **Ese sí es independiente de GitHub** y sigue mostrando
una versión vieja; no confundirlo con producción. Para publicar ahí haría falta:

```bash
npx wrangler pages deploy <carpeta> --project-name zolezzi-digital --branch main
```

y borrar antes el `README.md` de la carpeta, porque un Direct Upload sirve público todo lo
que subas.

## Sistema de diseño

> ⚠ **La web se separó del Brand Book el 2026-07-30, a petición expresa.** El manual no
> contempla celeste ni turquesa, y la nueva identidad los necesita para las series de gráfico
> y la iconografía. Consecuencia asumida: **la web ya no casa con el book ni con el Instagram**,
> que siguen en la gama anterior (`#0a2cdf`, `#111d9a`). Este es el punto de divergencia; si
> algún día se rehace el manual, hay que partir de aquí.

**Los colores viven en `assets/css/tokens.css`**, única fuente de verdad. Se enlaza con
`<link>` **antes** de styles.css y **nunca con `@import`**: sin bundler, un `@import` obliga
a descargar y parsear styles.css antes de siquiera pedir el otro archivo, y eso bloquea el
render en serie.

`styles.css` no usa esos nombres directamente: mantiene una **capa de alias** en su `:root`
(`--canvas: var(--bg-base)`, `--rule: var(--borde)`…). Así los ~200 usos repartidos por la
hoja no tuvieron que renombrarse. Si añades un token, decláralo en tokens.css y mapéalo ahí.

| Token | Valor | Uso |
|---|---|---|
| `--bg-base` | `#F1F5F7` | Fondo de página. **Nunca blanco puro** |
| `--bg-surface` | `#FFFFFF` | Solo tarjetas |
| `--bg-tint` | `#E8F4F6` | Secciones alternas |
| `--bg-dark` · `--bg-dark-alt` | `#0A1720` · `#12242F` | Secciones oscuras y sus tarjetas |
| `--ink` · `--ink-soft` · `--ink-invert` | `#0C1A22` · `#47606D` · `#EAF4F6` | Tinta |
| `--turquesa` · `--celeste` | `#10B5B0` · `#3BB8E8` | Rellenos, iconos, gráficos |
| `--teal-deep` | `#0B6E7F` | **Texto y enlaces sobre claro** |
| `--acento` | `#7DE3DE` | Detalles sobre oscuro |
| `--borde` | `#D7E3E8` | Filetes |
| `--gradiente` | 100deg, celeste → turquesa | **Solo dos destinos** |

Ritmo de fondos: hero, tecnología, CTA y pie en oscuro; consultoría y contacto en blanco;
metodología en tint; el resto hereda `--bg-base`.

### Reglas de color que no se pueden romper

- **Turquesa y celeste están prohibidos como texto sobre fondo claro.** Dan 2.26–2.54:1 y
  2.03–2.28:1, por debajo incluso del 3:1 que la WCAG exige a un elemento gráfico. Sobre
  claro, toda tinta de marca va en `--teal-deep` (5.27–5.91:1).
- **Sobre turquesa, la tinta va OSCURA.** Blanco sobre turquesa da 2.54:1; con `--bg-dark`
  queda en 7.14:1. Aplica a la pill de desafíos, a los nodos del radial y a cualquier
  elemento futuro con relleno de marca.
- **El botón con `--gradiente` usa `--btn-fg: var(--bg-dark)`, no `var(--ink)`.** Dentro del
  hero el ámbito oscuro reasigna `--ink` a `--ink-invert` y el texto salía claro sobre el
  gradiente: 2.28:1. `--bg-dark` no se voltea nunca.
- **`--gradiente` solo en dos sitios:** la línea destacada del H1 (`.hl`) y el botón CTA
  principal (`.btn--grad`).
- `.hl` usa `background-clip: text` dentro de `@supports`, **con el respaldo declarado
  primero**: sin él, `color: transparent` dejaría el titular invisible donde no se soporte.
- Sobre oscuro, los tonos intermedios se **derivan** de `--ink-invert` con `color-mix` y
  respaldo estático delante. No son colores nuevos.

**Contraste: 37 pares de la fase 4 + los 15 de los visuales nuevos, todos por encima de AA.**
El más ajustado de la tanda nueva es `.mini__k` sobre las tarjetas oscuras, 4.92:1; le sigue
el rótulo de la banda de la meseta sobre el turquesa al 14 %, 5.13:1.

Al medir, dos trampas que ya costaron un falso diagnóstico:

- **Hay que componer el alfa.** Los fondos translúcidos (`.geo__cite` al 7 %, el cuadrante
  de la matriz al 8 %, la banda de la meseta al 14 %) dan falsos negativos si se leen como
  opacos.
- **En un `<text>` de SVG el color es `fill`, no `color`,** y su fondo suele ser un `<rect>`
  hermano, no un ancestro del DOM. Medir `getComputedStyle().color` y subir por
  `parentElement` da resultados sin ningún sentido (16:1 donde hay 6:1, 1,1:1 donde hay
  7,1:1). Además `getComputedStyle` puede devolver `color(srgb 0.52 0.57 0.59)`: un parser
  que asuma `rgb(0-255)` lo lee como negro casi puro.

### Visuales de servicio

**Trece**, todos en SVG y CSS, sin librerías. Todos con `role="img"` y `<title>`.

| # | Clase | Sección | Qué argumenta |
|---|---|---|---|
| 1 | `.fnl` | Consultoría comercial | El embudo que se rediseña |
| 2 | `.rad` | Marketing estratégico | Las siete piezas del plan |
| 3 | `.geo` | SEO & GEO | Buscador clásico vs. respuesta con IA |
| 4 | `.dash` | Publicidad | Panel de campaña con contadores |
| 5 | `.mock` | Diseño web | Tres tipos de sitio |
| 6 | `.flw` | Soluciones e IA | Un dato recorriendo cuatro sistemas |
| 7 | `.stall` | Desafíos | La meseta: el crecimiento no capturado |
| 8 | `.proc__bar` | Metodología | Roadmap de seis fases con puertas |
| 9 | `.mx` | Marketing estratégico | Matriz de priorización 2×2 |
| 10 | `.arq` | SEO & GEO | Arquitectura de contenidos y enlazado |
| 11 | `.upt` | Infraestructura | Franja de disponibilidad de 30 días |
| 12 | `.lyr` | Seguridad | Capas de defensa |
| 13 | `.doc` | Cumplimiento | El expediente legal |

Los seis primeros son de la fase 4. **Del 7 al 13 entraron el 2026-07-31**, cuando se pidió
que la web «demostrara en vez de explicar». El criterio de esa tanda: *cada pieza tiene que
argumentar algo que el texto ya no necesite decir*. Ninguna es decorativa y ninguna se
añadió a una sección que ya tuviera visual suficiente —por eso Publicidad no recibió el
gráfico de segmentación que se llegó a plantear: marketing ya era la sección más visual de
la página (8,2 palabras por cada 100 px) y el problema estaba en otra parte—.

**`.svis` es el envoltorio común de todos ellos y ahora sí tiene reglas.** Existía desde la
fase 4 como gancho sin una sola declaración, y el espaciado resultante estaba justo al
revés de lo que pide la lectura: los visuales que van tras su rótulo `h4` tenían 13 px de
aire y los que van tras una lista, **cero**. Hoy: `.svis` separa 1,5–2,25 rem y
`.svc__k--wide + .svis` vuelve a apretar a 0,75 rem, porque un rótulo nombra a lo que tiene
debajo.

**El texto dentro de un SVG escala con su `viewBox`, no con la raíz.** En un móvil de 390 px
la meseta se dibuja a 0,73 y la matriz a 0,79, así que un rótulo declarado a 9 px acababa
renderizado a 6,5 px reales. El bloque de 760 px sube el tamaño de `.stall__lb`, `.stall__gl`,
`.mx__ql`, `.mx__at`, `.mx__bl`, `.arq__pl` y `.lyr__t` para compensar la escala. **Si algún
día cambia el `viewBox` de uno de esos gráficos hay que recalcular su factor.**

En el roadmap de metodología, `.proc__bar` comparte `max-width: 54ch` con `.proc__d`. No es
casualidad estética: si las pistas no midieran todas lo mismo, comparar la duración de una
etapa con otra —el único punto del gráfico— sería falso. **Cualquier cambio a uno de los dos
hay que hacerlo a los dos.** Los tramos no se solapan porque el rótulo promete que ninguna
etapa empieza sin la conclusión de la anterior; si algún día se admite solapar fases, hay
que cambiar los números o el gráfico estaría mintiendo.

En el radial, los nodos se posicionan por **`left`/`top` en porcentaje, no por
`transform: translate()`**: los porcentajes de `translate` se refieren al tamaño del propio
elemento, así que un nodo con texto más largo quedaría más lejos del centro. Por debajo de
760 px el radial se convierte en lista apilada — a 390 px un nodo se salía y dos se montaban
sobre el centro.

### Movimiento

Los visuales envuelven su animación en `@media (prefers-reduced-motion: no-preference)`.
**El resto de la hoja usa la convención inversa** —un bloque `reduce` al final que lo
neutraliza todo—. Conviven por historia. Ese bloque `reduce` da además el **estado final** de
cada visual, porque `transition-duration: .01ms` hace las transiciones instantáneas, no
inexistentes: un elemento que arranca en `opacity: 0` seguiría dependiendo del observador.

Prohibido: parallax, texto letra por letra, autoplay y cualquier animación de más de 600 ms.

### La onda

Haz de líneas del Brand Book anterior. Sigue en marketing, CTA y pie; **se retiró del hero**,
donde ahora hay un halo radial de `--acento` al 8 %. Una sola trayectoria (`#wv`) repetida 48
veces por `<use>`. `vector-effect: non-scaling-stroke` es imprescindible o el escalado engorda
el trazo; `pointer-events: none` también, porque cubre secciones enteras.

Tipografía: **Inter**, variable y autoalojada. Sin peticiones a Google Fonts. La jerarquía la
da el tamaño, nunca el grosor.

## Navegación y rutas de contacto

**Cinco entradas de primer nivel** (2026-08-01): Desafíos · Servicios · Metodología ·
Preguntas frecuentes · Contacto. Las tres capacidades cuelgan de «Servicios» en un
desplegable; antes competían en el mismo nivel que Contacto siendo la misma familia.

Los antetítulos numeran esa jerarquía: `01`, `02.1`, `02.2`, `02.3`, `03`, `04`, `05`. La
subnumeración no es un capricho: con cinco entradas y siete secciones, la alternativa era
repetir «02» tres veces —que se lee como un error— o desalinear menú y página.

Tres cosas del desplegable que se romperían con un descuido:

- **`.nav__menu[hidden] { display: none }` es imprescindible**, no redundante. Es la misma
  trampa que `.drawer[hidden]`: el `[hidden]` del navegador no tiene casi especificidad y lo
  pisa el `display: flex` de la clase. Sin esa línea el panel se queda abierto para siempre.
- **`.nav__menu::before` es un puente, no decoración.** Entre el botón y el panel hay 14 px
  de `margin-top` que quedan fuera de la caja del panel; al bajar el ratón, `pointerleave`
  saltaba y el menú se cerraba antes de llegar. El pseudoelemento extiende el área sensible
  esos 14 px. **Si cambia el `margin-top`, hay que cambiar su `top` y su `height` al mismo
  valor.**
- **Dentro del panel no se pueden usar `--ink`, `--ink-2` ni `--ink-3`:** en `.hdr.is-inv`
  apuntan a la gama invertida y el texto saldría casi blanco sobre blanco. Se usan
  `--ink-soft` y `--bg-dark`, que no se voltean en ningún ámbito.

El vigía de sección se guía por **`data-spy`**, no por el `href`, porque «Servicios» es un
`<button>` sin destino que representa tres secciones a la vez. Cada entrada declara qué ids
ilumina. Si se añade una sección al grupo, hay que añadir su id a ese atributo.

### Los dos caminos de contacto

Desde el 2026-08-01 no todos los botones van a WhatsApp, y la diferencia es comercial:

| Rótulo | Destino | Por qué |
|---|---|---|
| **Solicitar un diagnóstico** | `#contacto` (formulario) | Es la venta de consultoría. El formulario pide contexto por escrito, califica solo y deja constancia |
| **Solicitar un servicio específico** | WhatsApp | Encargo puntual; esa conversación funciona mejor en mensajería |
| Hablemos · WhatsApp · «¿No encuentra su desafío?» | WhatsApp | Contacto rápido, sin calificar |

Aparece en el hero, en el CTA previo a contacto y en el pie. **El rótulo «Solicitar
diagnóstico» tiene que llevar al formulario en los tres sitios**: si en uno abre WhatsApp, el
mismo texto hace dos cosas distintas según dónde se pulse.

## Restricciones que no se ven en el código

- **La fila de credibilidad del hero decía `[TODO]` en producción.** Hasta el 2026-07-31,
  tres de sus cuatro celdas se servían literalmente como «Experiencia **[TODO]** años»,
  «Empresas atendidas **[TODO]**» y «Sectores **[TODO]**» en `zolezziconsulting.com`, en el
  primer bloque que lee un director. Ahora las cuatro describen el **modelo** —alcance,
  responsable, interlocución, cobertura— y todas son comprobables contra la propia página,
  así que pueden estar publicadas sin riesgo.
  **Siguen faltando las cifras reales.** Cuando existan (años de experiencia, empresas
  atendidas, sectores), sustituyen a «Alcance» y «Cobertura»: un número comprobable pesa más
  que una descripción. Lo que no se puede volver a hacer es publicar un marcador de posición.

- **No se publican plazos, modelo de cobro ni precios.** El bloque `.feat__meta` de los dos
  servicios de consultoría —«Duración», «Modelo», «Recompra»— se retiró el 2026-08-01 por
  decisión comercial: al vender consultoría de ticket alto eso se conversa, no se publica.
  Se quitó también su CSS. **Esto gobierna las preguntas frecuentes:** ninguna puede hablar
  de precio ni de plazo contractual, o contradiría la misma decisión.

- **Las seis preguntas frecuentes viven DOS veces en `index.html`:** en el marcado visible y
  en el JSON-LD de `FAQPage` de la cabecera, palabra por palabra. Cambiar una y no la otra
  publica datos estructurados que no coinciden con la página, y eso Google lo penaliza.
  Se reescribieron enteras el 2026-08-01: las anteriores eran del posicionamiento previo y
  sonaban a agencia. Las nuevas responden a encaje, qué incluye el diagnóstico, plazos,
  medición, convivencia con equipo o agencia, y qué pasa con lo ya hecho.

- **El hero no se invierte solo: hay que decírselo a `main.js`.** El selector `darks` incluye
  `.hero` además de `.sec--dark, .cta, .ftr`. La hoja da a los cuatro los mismos tokens
  oscuros, pero el hero no lleva la clase `.sec--dark`, así que se quedaba fuera del selector
  y la cabecera nunca se invertía al cargar: la marca «ZOLEZZI» salía a **1.03:1** sobre el
  hero —invisible— y el hover del menú igual. Corregido el 2026-08-01, con un respaldo en
  `html:not(.js) .hdr` por si el script no llega a ejecutarse. **Cualquier bloque oscuro
  nuevo tiene que entrar en ese selector o repetirá el fallo.**

- **Se retiró CSS y JS de secciones que ya no existen.** `.flow*` (el diagrama del enfoque),
  `.caps`/`.cap*` (capacidades), `.cases*` (casos de uso, con su manejador de pestañas
  completo en `main.js` y su `@keyframes panel-in`) y `.whys`/`.why`. Ninguna de esas clases
  aparecía en el marcado —`querySelectorAll` devolvía cero en las cuatro—, así que el
  navegador descargaba y parseaba ~280 líneas de reglas y un componente de teclado entero
  que no gobernaban nada. Si alguna de esas secciones vuelve, hay que recuperar su bloque
  del historial: `git log -S'.cases__tab' -- assets/css/styles.css`.

- **Correo público: `zolezziconsulting@gmail.com`.** Aparece como `mailto:` en la sección
  Contacto y en el pie, y en el JSON-LD (`email` de la organización y del `contactPoint`).
  Hasta el 2026-07-29 no se publicaba ninguno; si vuelve a retirarse, hay que quitarlo de
  esos cuatro sitios.
- **El destino del formulario NO se configura aquí.** Formspree entrega al correo dado de
  alta en la cuenta del endpoint `mdaqjygn`; no existe ningún campo del HTML que lo cambie
  —lo retiraron justamente para que nadie pueda redirigir un formulario ajeno—. Para
  cambiarlo hay que entrar en formspree.io. Que el `mailto:` de la página apunte a una
  dirección no implica que el formulario entregue ahí.
- **Ninguna cifra de la página es un resultado de cliente.** Los contadores de ROAS, CTR, CPC
  y conversiones son ejemplos de lectura y llevan el rótulo `.ilus` obligatorio: «ejemplo
  ilustrativo · no son resultados de un cliente». Presentar una cifra inventada como real
  sería publicidad engañosa. Si algún día hay datos reales con permiso del cliente, se
  sustituyen ahí mismo y se cambia el rótulo.
- **Las herramientas van en wordmark tipográfico, no en logotipo.** Redibujar marcas ajenas a
  mano se ve barato y es terreno de marca registrada. Se muestran Ahrefs, Semrush, Search
  Console, Analytics 4, Looker Studio y Business Profile; se dejaron fuera Screaming Frog y
  PageSpeed Insights por decisión de posicionamiento: son utilidades de oficio y bajan el
  conjunto.
- **Jerarquía del posicionamiento: la estrategia manda.** Marketing y Technology se presentan
  como capacidades de *ejecución*, no como oferta principal. El eje es
  diagnóstico → estrategia → ejecución. Aun así se conserva una línea en `.flow__note`
  aclarando que un mandato puede acotarse solo a ejecución: sin ella la web negaría que se
  pueda contratar solo marketing, y eso contradice el modelo de negocio real.
- **Las webs viven en Marketing, no en Technology.** Corporate Websites, Landing Pages y
  E-commerce son captación comercial. Technology es automatización, datos e integraciones.
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
