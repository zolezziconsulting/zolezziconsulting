# ZOLEZZI Consulting

**Consultoría estratégica** · Strategy · Marketing · Technology

Sitio single-page. HTML, CSS y JavaScript sin dependencias ni build. Se despliega
subiendo la carpeta tal cual.

## Estructura

```
index.html            Toda la página: hero, desafíos (9 tarjetas), cómo lo
                      resolvemos, capacidades, metodología, FAQ, CTA,
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
vieja. Va por `v=10`.

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

**La paleta sale del Brand Book**, muestreada de los píxeles de sus páginas, no aproximada
a ojo. Blanco dominante —en el book el 44-48% de cada página es blanco puro— y **ningún
fondo con degradado en ninguna parte**.

Los bloques de azul pleno (`.sec--dark`, `.cta`, `.ftr`) **no redefinen componentes**:
reasignan los tokens de color en su propio ámbito y todo lo de dentro se invierte solo.
Cualquier componente nuevo debe usar tokens, nunca colores literales, o romperá esa
inversión.

| Token        | Claro     | Azul pleno | Uso                            |
|--------------|-----------|------------|--------------------------------|
| `--canvas`   | `#ffffff` | `#0a2cdf`  | Lienzo (el pie usa `#111d9a`)  |
| `--canvas-2` | `#f4f7fe` | 8% blanco  | Tarjetas y bandas              |
| `--ink`      | `#1b1d21` | `#ffffff`  | Texto principal                |
| `--ink-2`    | `#4b5162` | `#c8d3fb`  | Texto secundario               |
| `--ink-3`    | `#636b7d` | `#a9baf7`  | Etiquetas y metadatos          |
| `--rule`     | `#dde6fa` | 22% blanco | Filetes de 1px                 |
| `--accent`   | `#0a2cdf` | `#ffffff`  | **Tinta estructural**          |

La rampa de marca vive en `--blue-1..5` como tripletes RGB:
`#111d9a` · `#0c24c6` · `#0a2cdf` · `#1a46d2` · `#dee7fb`

**La tinta no es negro puro:** `#1b1d21`, con sesgo azulado, tal como está en el book.

Contraste medido, todo por encima de AA: `--ink` 16.9:1 · `--ink-2` 7.9:1 · `--ink-3` 5.3:1
(**4.98:1 sobre `--canvas-2`, que es el peor caso** — `#6e7689` daba 4.24 y hubo que
oscurecerlo) · `--accent` 8.6:1 · blanco sobre azul pleno 8.6:1 · blanco sobre el pie 12.6:1.

### La onda

El dispositivo gráfico del book —un haz de líneas finas paralelas que ondulan— sustituye a
los degradados que había antes. Aparece en el hero, en la sección de enfoque, en el CTA y en
el pie.

Se dibuja con **una sola trayectoria** (`#wv` en el sprite) repetida 48 veces por `<use>`,
cada copia desplazada y con la amplitud algo mayor: eso reproduce el morfeo del book sin 48
trayectorias distintas y pesa unos pocos cientos de bytes. Detalles que importan:

- `vector-effect: non-scaling-stroke` en `.wave use`. Sin él, el escalado vertical de cada
  copia engordaría el trazo y el haz perdería la finura que lo define.
- El desvanecido de los extremos es **máscara de opacidad sobre el trazo**, no un degradado
  de color: el fondo sigue siendo blanco puro.
- `pointer-events: none`. La onda cubre secciones enteras en absoluto; sin esto se comería
  los clics, que es exactamente el fallo que ya ocurrió una vez con el cajón.

Los únicos `linear-gradient` que quedan en la hoja son esa máscara y la flecha del `select`.
**Ningún elemento renderizado tiene un fondo con degradado.**

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
