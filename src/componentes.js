/* ================================================================
   Piezas reutilizables de marcado.
   ----------------------------------------------------------------
   Cada una recibe datos ya traducidos y devuelve HTML. No conocen el
   idioma: eso lo resuelven los archivos de i18n. Así una misma
   estructura sirve a las dos versiones y es imposible que la inglesa
   se quede con una sección de menos.
   ================================================================ */
const { esc } = require('./layout');

/* Titular partido en líneas. Cada línea va en su propia máscara y
   sube por separado. El último tramo puede llevar la costura. */
const display = (lineas, clase, id, opciones = {}) => {
  const { costura = false, atenuada = false, estilo = '' } = opciones;
  const total = lineas.length;
  return `<h2 class="${clase} rev-lines"${id ? ` id="${id}"` : ''}${estilo ? ` style="${estilo}"` : ''}>
${lineas.map((l, i) => {
  const ultima = i === total - 1;
  const cl = ultima && costura ? ' class="seam-text"' : (ultima && atenuada ? ' class="dim"' : '');
  return `        <span class="rev-line"><span${cl}>${esc(l)}</span></span>`;
}).join('\n')}
      </h2>`;
};

const displayH1 = (lineas, opciones = {}) =>
  display(lineas, 'd1 hero__title', null, opciones).replace('<h2 ', '<h1 ').replace('</h2>', '</h1>');

/* Cabecera de sección en dos columnas: numeral y titular a la
   izquierda, entradilla a la derecha. */
const cabeceraSeccion = (eyebrow, lineas, id, lead, opciones = {}) => `
      <div class="cols cols--head">
        <div>
          <p class="eyebrow rev">${esc(eyebrow)}</p>
          ${display(lineas, 'd2', id, { estilo: 'margin-top:1.25rem', ...opciones })}
        </div>
        ${lead ? `<p class="lead rev" style="--d:.2s">${esc(lead)}</p>` : '<div></div>'}
      </div>`;

/* Cabecera de sección a una columna, cuando no hay entradilla. */
const cabeceraSimple = (eyebrow, lineas, id, opciones = {}) => `
      <p class="eyebrow rev">${esc(eyebrow)}</p>
      ${display(lineas, 'd2', id, { estilo: 'margin-top:1.25rem', ...opciones })}`;

const tarjetas = (lista, columnas = 2) => `
      <div class="grid grid--${columnas}" style="margin-top:clamp(2.5rem,5vw,3.5rem)">
${lista.map(([k, d], i) => `        <article class="card rev"${i ? ` style="--d:.${Math.min(i * 7, 48)}s"` : ''}>
          <h3 class="card__k">${esc(k)}</h3>
          <p class="card__d">${esc(d)}</p>
        </article>`).join('\n')}
      </div>`;

/* El corredor: estaciones sobre un raíl que va del azul al turquesa.
   El degradado NO es decorativo: es el argumento entero en una
   línea, la tecnología entra global y sale negocio local. */
const corredor = (pasos) => `
      <div class="flow">
        <div class="flow__rail" aria-hidden="true"></div>
        <ol class="flow__steps${pasos.length === 4 ? ' flow__steps--4' : ''}">
${pasos.map(([t, d], i) => `          <li class="flow__i"${i ? ` style="--d:.${i}s"` : ''}>
            <div class="flow__dot" aria-hidden="true">0${i + 1}</div>
            <h3 class="flow__t">${esc(t)}</h3>
            <p class="flow__d">${esc(d)}</p>
          </li>`).join('\n')}
        </ol>
      </div>`;

const etiquetas = (lista) => `<ul class="tags">
${lista.map(x => `            <li>${esc(x)}</li>`).join('\n')}
          </ul>`;

/* Inventario numerado. Para listas largas: ocho tarjetas serían una
   pared, ocho filas con filete se leen de un vistazo. */
const inventario = (lista, desplazamiento = 0) => `<ul class="inv rev"${desplazamiento ? ' style="--d:.15s"' : ''}>
${lista.map(([t, d], i) => `            <li><span class="inv__n">${String(i + 1 + desplazamiento).padStart(2, '0')}</span><span><strong>${esc(t)}</strong><span class="inv__d">${esc(d)}</span></span></li>`).join('\n')}
          </ul>`;

/* ── Formulario ──────────────────────────────────────────────
   Un solo constructor para los dos formularios del sitio. El campo
   oculto `tipo` es lo que permite a la Function distinguirlos y
   poner un asunto distinto en cada correo. */
const campo = (f, { id, name, label, tipo = 'text', req = false, err = '', auto = '', ph = '', modo = '' }) => `
            <div class="f">
              <label for="${id}">${esc(label)}${req ? ' <span aria-hidden="true">*</span>' : ''}</label>
              <input id="${id}" name="${name}" type="${tipo}"${auto ? ` autocomplete="${auto}"` : ''}${modo ? ` inputmode="${modo}"` : ''}${ph ? ` placeholder="${esc(ph)}"` : ''}${req ? ` required aria-describedby="e-${name}"` : ''}>
              ${req ? `<p class="err" id="e-${name}" hidden>${esc(err)}</p>` : ''}
            </div>`;

const selector = (f, { id, name, label, opciones }) => `
            <div class="f">
              <label for="${id}">${esc(label)}</label>
              <select id="${id}" name="${name}">
                <option value="">${esc(f.elija)}</option>
${opciones.map(o => `                <option>${esc(o)}</option>`).join('\n')}
              </select>
            </div>`;

const fila = (a, b) => `          <div class="form__row">${a}${b}
          </div>`;

const formulario = (f, { tipo, boton, filas, mensaje, placeholder }) => `
        <form class="form rev" id="form" data-contact action="/api/contact" method="POST" novalidate style="--d:.2s">
          <input type="hidden" name="tipo" value="${esc(tipo)}">
${filas.join('\n')}

          <div class="f">
            <label for="f-msg">${esc(mensaje)} <span aria-hidden="true">*</span></label>
            <textarea id="f-msg" name="mensaje" rows="5" required aria-describedby="e-mensaje" placeholder="${esc(placeholder)}"></textarea>
            <p class="err" id="e-mensaje" hidden>${esc(f.campos.mensajeErr)}</p>
          </div>

          <div class="hp" aria-hidden="true">
            <label for="f-gotcha">${esc(f.noRellenar)}</label>
            <input id="f-gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
          </div>

          <div class="form__foot">
            <button class="btn" id="submit" type="submit"><span id="submit-t">${esc(boton)}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
            <p class="form__fine">${esc(f.fino)}</p>
          </div>

          <p class="form__msg" id="form-msg" role="status" hidden
             data-ok="${esc(f.ok)}" data-error="${esc(f.error)}" data-revisar="${esc(f.revisar)}" data-enviando="${esc(f.enviando)}"></p>
        </form>`;

/* Las dos puertas: la pieza de conversión del sitio. Separa los dos
   públicos ANTES de que ninguno tenga que leer el contenido del
   otro. El filete superior —azul a la izquierda, turquesa a la
   derecha— dice de quién es cada una sin una sola palabra. */
const puertas = (global, local, hrefGlobal, hrefLocal, compacta = false) => `
      <div class="doors">
        <a class="door door--global rev" href="${hrefGlobal}"${compacta ? ' style="min-height:0"' : ''}>
          <p class="door__kind">${esc(global.kind)}</p>
          <p class="door__t">${esc(global.t)}</p>
          ${global.d ? `<p class="door__d">${esc(global.d)}</p>` : ''}
          <span class="door__go">${esc(global.go)}<svg aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </a>
        <a class="door door--local rev" style="--d:.1s${compacta ? ';min-height:0' : ''}" href="${hrefLocal}">
          <p class="door__kind">${esc(local.kind)}</p>
          <p class="door__t">${esc(local.t)}</p>
          ${local.d ? `<p class="door__d">${esc(local.d)}</p>` : ''}
          <span class="door__go">${esc(local.go)}<svg aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </a>
      </div>`;

module.exports = {
  display, displayH1, cabeceraSeccion, cabeceraSimple, tarjetas, corredor,
  etiquetas, inventario, campo, selector, fila, formulario, puertas, esc
};
