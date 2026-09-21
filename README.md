# Zolezzi Solutions

**Representación comercial de tecnología empresarial internacional en el Perú.**

Sitio de tres páginas. HTML, CSS y JavaScript sin dependencias ni sistema de compilación,
más una única Cloudflare Pages Function para los formularios.

> La razón social sigue siendo **Zolezzi Consulting** y el dominio sigue siendo
> `zolezziconsulting.com`. Toda la experiencia visible al usuario dice **Zolezzi Solutions**.
> Esa asimetría es deliberada; la razón social solo aparece en el pie y en el JSON-LD
> (`legalName`).

## Qué vende el sitio

Reposicionamiento completo del 2026-09-21. La empresa dejó de ser una consultora de estudios
de mercado y pasa a ser el **puente comercial entre tecnología internacional y el mercado
peruano**. Tiene dos públicos y el sitio se organiza entero alrededor de esa dualidad:

| Público | Página | Qué busca | Llamada a la acción |
|---|---|---|---|
| Fabricantes de tecnología B2B del extranjero | `/technology-partners/` | Entrar al mercado peruano | Become a Technology Partner |
| Empresas e instituciones peruanas | `/soluciones/` | Encontrar tecnología especializada | Plantear mi caso |

La portada cuenta el modelo y **bifurca en las dos puertas antes de cualquier explicación**:
quien llega sabiendo lo que busca no tiene que recorrer la página entera ni leer el contenido
del otro público.

**Lo que NO se puede hacer aquí:** inventar clientes, logotipos, cifras, años de experiencia,
certificaciones o casos de éxito. No hay ninguno público todavía. La sección de Technology
Partners está construida con huecos explícitamente marcados como preparados, y ese es su
estado correcto hasta que lleguen datos reales.

### Para rellenar un partner

En `index.html`, sección `#partners`: sustituir una `<article class="partner partner--slot">`
por una ficha real con nombre del fabricante, país, categoría y una línea de qué resuelve, y
quitarle el modificador `--slot` (que es lo que le da el borde punteado de «espacio
reservado»). No hay que tocar nada más: la retícula lleva borde por tarjeta y hueco real, así
que funciona con cualquier número de fichas.

## Identidad «Doble Puerta»

**La paleta codifica el modelo de negocio.** No es decoración: cada bloque pertenece a un
ámbito y el color dice de cuál.

- **Ámbito global** — fondo noche `#070B14` y azul señal `#2F5BFF`. Frío y profundo. Es el
  lado del fabricante de tecnología.
- **Ámbito local** — fondo hueso `#F4F3EF` y ámbar `#DC4C08`. Cálido y claro. Es el lado del
  comprador peruano.
- **La costura** — el único degradado del sistema, y con un solo significado: el punto donde
  la tecnología global se convierte en negocio local. Vive en el raíl del diagrama de entrada
  al mercado, en la barra de progreso y en la diagonal del logotipo.

Si algún día se usa el ámbar para hablar de tecnología global o el azul para el mercado
local, el sistema deja de significar y pasa a ser adorno.

El ámbito se declara con la clase `.night` y/o `.local`, que **reasignan los tokens** en su
propio alcance. Cualquier componente escrito contra los alias (`--canvas`, `--fg`, `--rule`,
`--accent`) se adapta solo. Un componente que declare un color literal romperá esa inversión.

### Tres reglas de contraste que no se pueden romper

Todas medidas con un comprobador WCAG, no estimadas:

1. Sobre un relleno de `--signal` la tinta va **blanca** (5.17:1). En oscuro daría 3.81.
2. Como texto sobre fondo claro se usa `--signal-ink` (6.39:1), no `--signal`, que se queda
   en 4.66 y no deja margen.
3. Sobre un relleno de `--ember` la tinta va **oscura** (4.76:1); en blanco daría 4.13.
   `--ember-glow`, más brillante, **solo vale sobre noche**: sobre hueso cae a 2.57.

### Logotipo

La **Z** se lee como tres piezas: barra superior = tecnología global, barra inferior =
mercado peruano, y la **diagonal es el puente**, que es literalmente el negocio. Por eso la
diagonal lleva el degradado de la costura y es la única pieza que lo lleva.

Vive en `favicon.svg` y, duplicado, en el sprite de las tres páginas. Los colores van
literales y no por token: un favicon se sirve suelto y no puede enlazar la hoja de estilos.
**Si cambia la paleta hay que actualizarlos a mano en los cuatro sitios**, más el generador
de imágenes.

### Tipografías

**Archivo** para titulares, **Inter** para todo lo demás. Ambas variables, subset latin y
autoalojadas, por rendimiento y porque un tercero menos es un vector de seguimiento menos.
Ninguna tercera familia.

## Estructura

```
index.html                     Portada: hero, las dos puertas, el corredor,
                               alcance, partners, argumento, CTA y contacto
technology-partners/index.html Para fabricantes extranjeros + su formulario
soluciones/index.html          Para organizaciones peruanas + su formulario
assets/css/tokens.css          Paleta. Única fuente de verdad del color
assets/css/styles.css          Sistema completo
assets/js/main.js              Cabecera, cajón, revelado y formularios
assets/fonts/                  Archivo e Inter (variables, subset latin)
assets/img/                    og-zs.png (1200×630) y apple-touch-icon.png
functions/api/contact.js       Pasarela de los dos formularios
favicon.svg  robots.txt  sitemap.xml  site.webmanifest  _headers  _redirects
```

Las imágenes se generaron con un script de Node que escribe el PNG a mano con `zlib`: en
esta máquina no hay ImageMagick ni Python, y el `convert` del PATH es el **conversor de
sistema de archivos de Windows** — no lo invoques.

## Ver en local

```bash
npx --yes wrangler pages dev . --port 8788 --compatibility-date=2026-09-21
```

Hay que usar **wrangler y no un servidor estático**: es lo único que aplica `_headers`,
`_redirects` y la Function de `/api/contact`.

**Cuidado con las instancias zombis.** Si el puerto ya está ocupado por un wrangler anterior,
el nuevo no arranca pero el script sigue y las peticiones las atiende el viejo, con el código
de antes de tus cambios. Antes de dudar del código, comprueba quién tiene el puerto:

```bash
powershell "Get-NetTCPConnection -State Listen -LocalPort 8788 | Select OwningProcess"
```

`pkill` no se lleva los `workerd` hijos en Windows; para limpiar de verdad hay que cerrar los
procesos `node` cuya línea de comandos contenga `wrangler` y después los `workerd`.

### Probar los formularios sin enviar correo de verdad

Crea un `.dev.vars` (está en `.gitignore`) apuntando a un receptor local **y reinicia
wrangler después**, porque solo lee ese archivo al arrancar. Comprueba que el binding aparece
listado en el arranque antes de enviar nada:

```
FORMSPREE_ENDPOINT="http://127.0.0.1:8797/"
```

## Formularios: la pasarela `/api/contact`

Los dos formularios envían a una Cloudflare Pages Function, **nunca al proveedor de correo
directamente**: el endpoint real jamás se sirve al cliente. La Function comprueba que el
origen es el propio sitio, valida en servidor, descarta cualquier campo fuera de su lista
blanca, corta los saltos de línea en los campos de una sola línea —inyección de cabeceras de
correo— y reenvía. El asunto lleva el tipo de formulario y la empresa, que es con lo que se
tría la bandeja sin abrir el correo.

`tipo` distingue los dos formularios y viaja en un campo oculto. Los campos son un
superconjunto de ambos; casi todos opcionales salvo `empresa`, `nombre`, `email` y `mensaje`.

### Configuración pendiente (una vez, en el panel de Cloudflare)

> Workers & Pages → el proyecto → Settings → Variables and Secrets
> `FORMSPREE_ENDPOINT` = `https://formspree.io/f/XXXXXXXX` **como secreto**

Mientras no exista, la Function usa el endpoint de respaldo del código, así que el formulario
**no se rompe**. En cuanto la variable esté puesta conviene **rotar el formulario en
Formspree** y borrar el respaldo: el viejo está en el historial de este repositorio, que es
público.

## Seguridad

`_headers` publica CSP, HSTS, COOP, `Permissions-Policy`, `X-Content-Type-Options`,
`X-Frame-Options` y `Referrer-Policy`. Tres cosas que cuestan un rato descubrir:

- **Las reglas se SUMAN, no se sustituyen.** Declarar `Cross-Origin-Resource-Policy` en `/*`
  y otra vez en `/assets/img/*` produce la cabecera literal `same-origin, cross-origin`, que
  no es un valor válido. Por eso CORP va ruta por ruta.
- **`_headers` no alcanza a las Functions.** Sus cabeceras se las pone `contact.js`.
- **La CSP autoriza el script en línea POR HASH**, no con `'unsafe-inline'`. Las tres páginas
  llevan exactamente el mismo script de una línea para que el hash sea único. Si se toca:

  ```bash
  node -e "console.log(require('crypto').createHash('sha256').update(\"document.documentElement.classList.add('js');\").digest('base64'))"
  ```

`frame-ancestors 'none'` impide enmarcar el sitio, también desde el propio origen. Es
correcto, pero rompe cualquier diagnóstico que intente cargar una página en un `<iframe>`.

`_redirects` tapa `README.md` y `.gitignore`: el proyecto de Pages publica la raíz del
repositorio tal cual, así que **todo archivo suelto queda servido en el dominio**.

## Al tocar CSS o JS: subir `?v=`

`_headers` cachea `/assets/css/*` y `/assets/js/*` como `immutable` durante un año y los
archivos no llevan hash en el nombre. Por eso las tres páginas los enlazan con `?v=N`. **Hay
que subir ese número en cada cambio, y en las tres a la vez.** Va por `v=6`.

Durante el desarrollo esto muerde: si editas el CSS y recargas sin subir el número, el
navegador sigue sirviendo el anterior y parece que tu cambio no hace nada.

## Al cambiar la imagen Open Graph: RENOMBRARLA

`/assets/img/*` es `immutable` un año y `og:image` no admite `?v=`. Sobrescribir el archivo
no refresca ni el CDN ni —lo importante— LinkedIn, WhatsApp y Facebook, que cachean la vista
previa por URL. Hay que **cambiar el nombre** y actualizar las referencias en las tres
páginas: `og:image`, `twitter:image` y el `image` del JSON-LD de la portada.

## Adaptación: cuatro trampas que ya mordieron

Comprobado sin desbordamiento ni reescalado en **320, 390, 768 y 1440 px** en las tres
páginas, y sin que ningún titular de display se parta en dos líneas.

1. **Un estilo en línea gana a cualquier regla de la hoja.** Las dos páginas de público
   fijaban `grid-template-columns` en línea sobre `.flow__steps`, así que la regla que vuelve
   vertical el diagrama en móvil no se aplicaba nunca: el documento se iba a 386px en una
   pantalla de 320 y la hamburguesa quedaba fuera de pantalla. Ahora es la clase
   `.flow__steps--4`.
2. **Los media queries no añaden especificidad.** `.hero__meta > div:not(:first-child)` es
   (0,2,1) y le ganaba a un `.hero__meta > div` (0,1,1) dentro del media query. Hay que
   anular con el mismo peso.
3. **`min-width: 0` en los hijos de toda rejilla.** Un ítem de rejilla no baja del min-content
   de su contenido; basta una pieza ancha para deformar el documento entero.
4. **El techo en vw de los titulares protege el móvil; el máximo en rem protege el
   escritorio.** Los titulares de sección viven en la columna estrecha de `.cols--head`, que
   a 1440px mide 503px y no los 1280 del carril. **Si se escribe un titular más largo que los
   actuales hay que volver a medir**, porque una línea partida rompe el recorte de
   `.rev-line`.

Y una quinta que no es de adaptación pero se comprueba igual de mal: **sin JavaScript no hay
observador que ponga `.in`**, así que todo lo que arranque oculto necesita su regla
`html:not(.js)`. Para verlo hay que quitar la clase `js` en caliente **y esperar a que las
transiciones asienten**; si se mide justo después se leen valores a medio camino y parece que
todo está roto.

## Desplegar

Dominio de producción **`https://zolezziconsulting.com`**, servido desde el repositorio de
GitHub `zolezziconsulting/zolezziconsulting`. Un `git push` a `main` publica, con un par de
minutos de retraso.

```bash
git push
```
