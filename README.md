# Zolezzi Solutions

**Desarrollo de mercado y representación comercial en el Perú para tecnología empresarial
internacional.**

Sitio bilingüe de cuatro rutas —ocho páginas— generado con un script de Node sin
dependencias. El HTML resultante se versiona y Cloudflare Pages lo publica tal cual, sin
paso de compilación en el servidor.

> La marca visible es **Zolezzi Solutions**. La razón social sigue siendo **Zolezzi
> Consulting** y el dominio sigue siendo `zolezziconsulting.com`. Esa asimetría es
> deliberada: la razón social solo aparece en el pie y en `legalName` del JSON-LD.

## Qué vende el sitio

La empresa conecta proveedores tecnológicos internacionales con oportunidades comerciales en
el Perú. Tiene **dos públicos con prioridades distintas**, y toda la arquitectura responde a
eso:

| Público | Prioridad | Ruta | Llamada a la acción |
|---|---|---|---|
| Empresas tecnológicas internacionales | **Principal** | `/technology-partners/` | Explorar una colaboración |
| Empresas e instituciones peruanas | Secundaria | `/soluciones/` | Plantear mi caso |

La portada **bifurca en las dos puertas inmediatamente después del titular**, antes de
cualquier explicación: quien llega sabiendo lo que busca no recorre la página entera ni lee
el contenido del otro público.

### Lo que NO se puede escribir aquí

Son reglas de negocio, no de estilo, y están anotadas en los dos archivos de idioma:

- **No se afirma representar a ninguna marca.** No hay acuerdos firmados que lo permitan.
  Por eso la portada tiene una sección de **qué tipo de solución buscamos** en lugar de una
  retícula de partners: dice algo verdadero, le sirve al proveedor para autoevaluarse y no
  insinúa relaciones que no existen.
- **No se promete exclusividad, volumen de clientes, ingresos ni plazos de cierre.** La
  página de proveedores lo niega explícitamente, que además funciona como señal de seriedad.
- **No hay clientes, logotipos, cifras, premios ni testimonios.** Ninguno es público.
- La credibilidad se construye con el método —el proceso, el criterio de evaluación, el
  modelo de remuneración— no con adjetivos.

## El generador

```bash
node build.js
```

Escribe las ocho páginas y el `sitemap.xml` a partir de una sola copia de la cabecera, el
pie y los textos.

```
src/i18n/es.js      Todo el texto en español
src/i18n/en.js      Todo el texto en inglés, misma estructura clave por clave
src/layout.js       Cabeza, cabecera, cajón móvil, pie, hreflang y rutas
src/componentes.js  Piezas de marcado reutilizables
src/pages.js        Las cuatro páginas (solo el cuerpo del <main>)
build.js            Renderiza 4 páginas × 2 idiomas + sitemap
```

**El HTML generado se versiona en el repositorio.** El proyecto de Cloudflare publica
estáticos sin build, y cambiarlo exigiría tocar el panel. El flujo es: editar `src/`,
ejecutar `node build.js`, revisar el diff y hacer push. **Si editas un `index.html` a mano,
el siguiente build lo pisa.**

`_redirects` y `robots.txt` tapan `/src/` y `/build.js`: viven en la raíz del repositorio y
sin eso Cloudflare los serviría en el dominio.

### Paridad entre idiomas

Los dos archivos de i18n tienen la misma estructura, clave por clave. Para comprobar que no
falta nada traducido:

```bash
node -e "const a=require('./src/i18n/es'),b=require('./src/i18n/en');const k=o=>{const r=[];(function w(x,p){for(const n of Object.keys(x)){const v=x[n],q=p?p+'.'+n:n;v&&typeof v==='object'&&!Array.isArray(v)?w(v,q):r.push(q)}})(o,'');return r.sort()};console.log(JSON.stringify(k(a))===JSON.stringify(k(b))?'paridad OK':'DESAJUSTE')"
```

### Rutas e idiomas

El español vive en la raíz —conserva las URLs que ya estaban indexadas— y el inglés bajo
`/en/`. Cada página declara `hreflang` para ambas versiones más `x-default` al español, y el
sitemap repite esas alternativas: si solo una página apunta a la otra, Google ignora el par.

El selector de idioma son **dos enlaces reales** a la misma página en el otro idioma, no un
desplegable con JavaScript: funciona sin scripts y lo sigue un rastreador.

## Identidad «Doble Puerta», clave clara

**La paleta codifica el modelo de negocio.** No es decoración: cada bloque pertenece a un
ámbito y el color dice de cuál.

- **Ámbito global** — azul profundo `#071A2E` y azul señal `#2F5BFF`. El lado del proveedor
  internacional.
- **Ámbito local** — hueso `#F6F6F3` y turquesa `#0E9AA7`. El lado de la empresa peruana.
- **La costura** — el único degradado del sistema, azul → turquesa, con un solo significado:
  el punto donde la tecnología global se convierte en negocio local. Vive en el raíl del
  diagrama, en la barra de progreso y en la diagonal del logotipo. En ningún otro sitio.

Domina el claro. El azul profundo se reserva al hero y a los bloques de ámbito global, donde
su peso significa algo. Si todo acaba en azul, el sistema deja de significar.

El ámbito se declara con `.deep` y/o `.local`, que **reasignan los tokens** en su alcance.
Cualquier componente escrito contra los alias (`--canvas`, `--fg`, `--rule`, `--accent`) se
adapta solo. Uno que declare un color literal romperá esa inversión.

### Cuatro reglas de contraste que no se pueden romper

Todas medidas, no estimadas:

1. Sobre relleno `--signal` la tinta va **blanca** (5.17:1).
2. Como texto sobre claro se usa `--signal-ink` (6.55:1), no `--signal` (4.78, sin margen).
3. Sobre relleno `--teal` la tinta va **oscura** (5.18:1); la blanca se queda en 3.39. Es el
   error más fácil de cometer con un turquesa.
4. Como texto sobre claro se usa `--teal-ink` (5.13:1). `--teal` solo vale como relleno o
   elemento gráfico: de tinta sobre hueso da 3.13.

La paleta **no tiene rojo a propósito**: el estado de error del formulario se marca con tinta
fuerte y doble grosor, que además no depende de distinguir colores.

### Logotipo

La **Z** se lee como tres piezas: barra superior = tecnología global, barra inferior =
mercado peruano, y la **diagonal es el puente**. Por eso lleva el degradado de la costura y
es la única pieza que lo lleva.

Vive en `favicon.svg` y, duplicado, en el sprite que genera `layout.js`. Los colores van
literales: un favicon se sirve suelto y no puede enlazar la hoja de estilos. **Si cambia la
paleta hay que actualizarlos a mano en los dos sitios**, más el generador de imágenes.

### Tipografías

**Archivo** para titulares, **Inter** para todo lo demás. Variables, subset latin y
autoalojadas, por rendimiento y porque un tercero menos es un vector de seguimiento menos.

## Ver en local

```bash
npx --yes wrangler pages dev . --port 8788 --compatibility-date 2026-09-21
```

Hay que usar **wrangler y no un servidor estático**: es lo único que aplica `_headers`,
`_redirects` y la Function de `/api/contact`.

**Cuidado con las instancias zombis.** Si el puerto ya está ocupado por un wrangler anterior,
el nuevo no arranca pero el script sigue, y las peticiones las atiende el viejo con el código
de antes de tus cambios. Antes de dudar del código, comprueba quién tiene el puerto:

```bash
powershell "Get-NetTCPConnection -State Listen -LocalPort 8788 | Select OwningProcess"
```

`pkill` no se lleva los `workerd` hijos en Windows: hay que cerrar los procesos `node` cuya
línea de comandos contenga `wrangler` y después todos los `workerd`.

### Probar los formularios sin enviar correo de verdad

Crea un `.dev.vars` (está en `.gitignore`) apuntando a un receptor local **y reinicia
wrangler después**, porque solo lee ese archivo al arrancar. Comprueba que el binding aparece
listado en el arranque **antes** de enviar nada:

```
FORMSPREE_ENDPOINT="http://127.0.0.1:8797/"
```

## Formularios: la pasarela `/api/contact`

Los dos formularios envían a una Cloudflare Pages Function, **nunca al proveedor de correo
directamente**: el endpoint real jamás se sirve al cliente. La Function comprueba que el
origen es el propio sitio, valida en servidor, descarta cualquier campo fuera de su lista
blanca, corta los saltos de línea en los campos de una sola línea —inyección de cabeceras de
correo— y reenvía. El asunto lleva el tipo de formulario y la empresa, con lo que se tría la
bandeja sin abrir el correo.

Los textos de validación y confirmación **no viven en el JavaScript**: viajan en atributos
`data-` del propio aviso, puestos por el generador en el idioma de la página. Si estuvieran
en `main.js`, la versión inglesa mostraría avisos en español justo cuando algo falla.

### Configuración pendiente (una vez, en el panel de Cloudflare)

> Workers & Pages → el proyecto → Settings → Variables and Secrets
> `FORMSPREE_ENDPOINT` = `https://formspree.io/f/XXXXXXXX` **como secreto**

Mientras no exista, la Function usa el endpoint de respaldo del código, así que el formulario
**no se rompe**. Una vez puesta conviene **rotar el formulario en Formspree** y borrar el
respaldo: el viejo está en el historial de este repositorio, que es público.

## Seguridad

`_headers` publica CSP, HSTS, COOP, `Permissions-Policy`, `X-Content-Type-Options`,
`X-Frame-Options` y `Referrer-Policy`. Tres cosas que cuestan un rato descubrir:

- **Las reglas se SUMAN, no se sustituyen.** Declarar `Cross-Origin-Resource-Policy` en `/*`
  y otra vez en `/assets/img/*` produce la cabecera literal `same-origin, cross-origin`, que
  no es válida. Por eso CORP va ruta por ruta.
- **`_headers` no alcanza a las Functions.** Sus cabeceras se las pone `contact.js`.
- **La CSP autoriza el script en línea POR HASH**, no con `'unsafe-inline'`. Las ocho páginas
  llevan exactamente la misma línea para que el hash sea único. Si se toca:

  ```bash
  node -e "console.log(require('crypto').createHash('sha256').update(\"document.documentElement.classList.add('js');\").digest('base64'))"
  ```

`frame-ancestors 'none'` impide enmarcar el sitio, también desde el propio origen. Es
correcto, pero rompe cualquier diagnóstico que intente cargar una página en un `<iframe>`.

## Al tocar CSS o JS: subir la versión

`_headers` cachea `/assets/css/*` y `/assets/js/*` como `immutable` durante un año. El
generador los enlaza con `?v=N` desde la constante **`V` de `src/layout.js`**: se sube ahí
una sola vez y las ocho páginas quedan actualizadas. Va por `v=8`.

Durante el desarrollo esto muerde: si editas el CSS y recargas sin subir `V`, el navegador
sigue sirviendo el anterior y parece que tu cambio no hace nada.

## Al cambiar la imagen Open Graph: RENOMBRARLA

`/assets/img/*` es `immutable` un año y `og:image` no admite `?v=`. Sobrescribir el archivo
no refresca ni el CDN ni LinkedIn, WhatsApp o Facebook, que cachean la vista previa por URL.
Hay que **cambiar el nombre** y actualizarlo en `src/layout.js`, que es el único sitio donde
aparece.

Las imágenes se generan con un script de Node que escribe el PNG a mano con `zlib`: en esta
máquina no hay ImageMagick ni Python, y el `convert` del PATH es el **conversor de sistema de
archivos de Windows** — no lo invoques.

## Adaptación: cinco trampas que ya mordieron

Comprobado sin desbordamiento ni reescalado en **320, 390 y escritorio** en las ocho páginas,
y con las **98 líneas de titular** medidas una a una para que ninguna se parta.

1. **Un estilo en línea gana a cualquier regla de la hoja.** Un `grid-template-columns` en
   línea anulaba el media query que vuelve vertical el diagrama en móvil: el documento se iba
   a 386px en una pantalla de 320 y la hamburguesa quedaba fuera de pantalla.
2. **Los media queries no añaden especificidad.** `.hero__meta > div:not(:first-child)` es
   (0,2,1) y le ganaba a `.hero__meta > div` (0,1,1) dentro del media query.
3. **`min-width: 0` en los hijos de toda rejilla.** Un ítem de rejilla no baja del min-content
   de su contenido; basta una pieza ancha para deformar el documento entero.
4. **El techo en vw protege el móvil; el máximo en rem protege el escritorio.** Los titulares
   de sección viven en la columna estrecha de `.cols--head`, que a 1440px mide 503px y no los
   1280 del carril. **Si se escribe un titular más largo hay que volver a medir**, porque una
   línea partida rompe el recorte de `.rev-line`.
5. **Sin JavaScript no hay observador que ponga `.in`**, así que todo lo que arranque oculto
   necesita su regla `html:not(.js)`. Para verlo hay que quitar la clase `js` en caliente **y
   esperar a que las transiciones asienten**; si se mide justo después se leen valores a medio
   camino y parece que todo está roto.

## Desplegar

Dominio de producción **`https://zolezziconsulting.com`**, servido desde el repositorio de
GitHub `zolezziconsulting/zolezziconsulting`. Un `git push` a `main` publica, con un par de
minutos de retraso.

```bash
node build.js && git add -A && git commit && git push
```
