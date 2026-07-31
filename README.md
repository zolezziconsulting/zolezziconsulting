# ZOLEZZI Consulting

**Consultoría estratégica** · Strategy · Marketing · Technology

Sitio single-page. HTML, CSS y JavaScript sin dependencias ni build. Se despliega
subiendo la carpeta tal cual.

## Estructura

```
index.html            Hero, desafíos, consultoría (comercial + marketing
                      estratégico), marketing digital (SEO/GEO, publicidad,
                      diseño web), tecnología (4 servicios), metodología,
                      FAQ, CTA, contacto y pie
assets/css/styles.css Sistema de diseño completo
assets/js/main.js     Cabecera, menú móvil, revelados, raíles de scroll,
                      pestañas, acordeón y formulario
assets/fonts/         Inter (variable, subset latin, autoalojada)
assets/img/           og-v2.jpg (1200×630) y apple-touch-icon.png
favicon.svg  robots.txt  sitemap.xml  site.webmanifest  _headers
```

`assets/fonts/bodoni-moda-latin.woff2` es un resto del concepto anterior: ya no se declara
ni se precarga, así que ningún navegador lo pide. Se puede borrar.

## Ver en local

```bash
npx --yes serve . -l 5173
```

Abrir `http://localhost:5173`. No uses `file://`: las rutas son absolutas y no cargarían.

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
vieja. Va por `v=18`.

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

**Contraste: 37 pares de texto/fondo de todas las secciones medidos, todos por encima de AA.**
El más ajustado es la pill de desafíos, 5.27:1. Al medir hay que **componer el alfa**: los
fondos translúcidos (`.geo__cite` al 7 %) dan falsos negativos si se leen como opacos.

### Visuales de servicio

Seis, todos en SVG y CSS, sin librerías: embudo (`.fnl`), radial de Go-to-Market (`.rad`),
las dos superficies de SEO/GEO (`.geo`), panel de campaña (`.dash`), mockups de web
(`.mock`) y flujo de sistemas (`.flw`). Todos con `role="img"` y `<title>`.

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
