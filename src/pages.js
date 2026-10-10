/* ================================================================
   Las cuatro páginas. Cada una devuelve solo el cuerpo del <main>;
   la cabeza, la cabecera y el pie los pone layout.js.
   ----------------------------------------------------------------
   El RITMO de ámbitos es intencionado y no se debe alterar a la
   ligera: el hero abre en azul profundo —es la entrada de marca— y
   a partir de ahí manda el hueso. Los bloques en azul se reservan a
   lo que pertenece al lado del proveedor internacional. Si todo
   acaba en azul, el sistema deja de significar y queda un sitio
   oscuro más.
   ================================================================ */
const { RUTAS, EMAIL, LINKEDIN, waUrl } = require('./layout');
const C = require('./componentes');
const { esc } = C;

/* ── Portada ─────────────────────────────────────────────────── */
function home(t) {
  const h = t.home;
  return `
  <section class="deep hero">
    <div class="hero__field" aria-hidden="true"></div>
    <div class="hero__field hero__field--warm" aria-hidden="true"></div>
    <div class="shell hero__in">
      <p class="eyebrow rev">${esc(h.eyebrow)}</p>
      ${C.displayH1(h.h1, { costura: true, estilo: 'margin-top:clamp(1.25rem,2.5vw,2rem)' })}
      <p class="lead hero__lead rev" style="--d:.35s">${esc(h.lead)}</p>
      <div class="hero__cta rev" style="--d:.5s">
        <a class="btn" href="${RUTAS.partners[t.lang]}"><span>${esc(h.ctaPrimaria)}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="btn btn--ghost" href="${RUTAS.solutions[t.lang]}"><span>${esc(h.ctaSecundaria)}</span></a>
      </div>
      <dl class="hero__meta rev" style="--d:.62s">
${h.meta.map(([k, v]) => `        <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n')}
      </dl>
    </div>
  </section>

  <!-- Las dos puertas, inmediatamente después del titular: quien
       llega sabiendo lo que busca no recorre la página entera. -->
  <section class="band band--tight" aria-labelledby="t-puertas">
    <div class="shell">
      <h2 class="vh" id="t-puertas">${esc(h.puertasTitulo)}</h2>
      ${C.puertas(h.puertaGlobal, h.puertaLocal, RUTAS.partners[t.lang], RUTAS.solutions[t.lang])}
    </div>
  </section>

  <section class="band" id="modelo" aria-labelledby="t-modelo">
    <div class="shell">
      ${C.cabeceraSeccion(h.modeloEyebrow, h.modeloH2, 't-modelo', h.modeloLead, { atenuada: true })}
      ${C.corredor(h.pasos)}
    </div>
  </section>

  <section class="deep band" id="alcance" aria-labelledby="t-alcance">
    <div class="shell">
      ${C.cabeceraSimple(h.alcanceEyebrow, h.alcanceH2, 't-alcance', { atenuada: true })}
      <div class="cols" style="margin-top:clamp(2.5rem,5vw,3.5rem)">
        <div class="rev">
          <h3 class="micro" style="margin-bottom:1.25rem">${esc(h.categoriasK)}</h3>
          ${C.etiquetas(h.categorias)}
        </div>
        <div class="rev local" style="--d:.15s">
          <h3 class="micro" style="margin-bottom:1.25rem">${esc(h.sectoresK)}</h3>
          ${C.etiquetas(h.sectores)}
        </div>
      </div>
      <p class="small rev" style="--d:.25s; margin-top:clamp(2rem,4vw,2.75rem); max-width:74ch; padding-top:1.5rem; border-top:1px solid var(--rule)">${esc(h.alcanceNota)}</p>
    </div>
  </section>

  <section class="band" id="porque" aria-labelledby="t-porque">
    <div class="shell">
      ${C.cabeceraSimple(h.porqueEyebrow, h.porqueH2, 't-porque', { atenuada: true })}
      ${C.tarjetas(h.porque, 2)}
    </div>
  </section>

  <!-- Sustituye a la antigua retícula de «partners» con huecos
       vacíos. Decir QUÉ buscamos es honesto, le sirve al proveedor
       para autoevaluarse y no insinúa representaciones que no
       existen. -->
  <section class="band" id="buscamos" aria-labelledby="t-buscamos">
    <div class="shell">
      ${C.cabeceraSeccion(h.buscamosEyebrow, h.buscamosH2, 't-buscamos', h.buscamosLead, { atenuada: true })}
      ${C.tarjetas(h.buscamos, 2)}
    </div>
  </section>

  <section class="deep band" aria-labelledby="t-cta">
    <div class="shell">
      ${C.display(h.ctaH2, 'd2', 't-cta', { costura: true, estilo: 'max-width:18ch' })}
      <p class="lead rev" style="--d:.2s; margin-top:1.5rem">${esc(h.ctaLead)}</p>
      <div style="margin-top:clamp(2rem,4vw,3rem)">
        ${C.puertas(h.ctaGlobal, h.ctaLocal, RUTAS.partners[t.lang], RUTAS.solutions[t.lang], true)}
      </div>
    </div>
  </section>

  <section class="band" id="contacto" aria-labelledby="t-contacto">
    <div class="shell">
      <div class="cols cols--head">
        <div>
          <p class="eyebrow rev">${esc(h.contactoEyebrow)}</p>
          ${C.display(h.contactoH2, 'd2', 't-contacto', { estilo: 'margin-top:1.25rem' })}
        </div>
        <div class="rev" style="--d:.2s">
          <p class="lead">${esc(h.contactoLead)}</p>
          <div class="contact" style="margin-top:2rem">
            <a class="contact__i" href="${waUrl(t)}" target="_blank" rel="noopener">
              <span class="contact__k">${esc(h.contacto.whatsapp)}</span>
              <span class="contact__v">+51 941 519 053</span>
            </a>
            <a class="contact__i" href="mailto:${EMAIL}">
              <span class="contact__k">${esc(h.contacto.correo)}</span>
              <span class="contact__v ftr__mail">${EMAIL}</span>
            </a>
            <a class="contact__i" href="${LINKEDIN}" target="_blank" rel="noopener">
              <span class="contact__k">${esc(h.contacto.linkedin)}</span>
              <span class="contact__v">Zolezzi Solutions</span>
            </a>
            <div class="contact__i">
              <span class="contact__k">${esc(h.contacto.horario)}</span>
              <span class="contact__v">${esc(h.contacto.horarioV)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── Empresas tecnológicas ───────────────────────────────────── */
function partners(t) {
  const p = t.partners, f = t.form, c = f.campos;
  const filas = [
    C.fila(
      C.campo(f, { id: 'f-empresa', name: 'empresa', label: c.empresa, req: true, err: c.empresaErr, auto: 'organization' }),
      C.campo(f, { id: 'f-web', name: 'web', label: c.web, modo: 'url', ph: 'company.com' })
    ),
    C.fila(
      C.campo(f, { id: 'f-nombre', name: 'nombre', label: c.nombre, req: true, err: c.nombreErr, auto: 'name' }),
      C.campo(f, { id: 'f-cargo', name: 'cargo', label: c.cargo, auto: 'organization-title' })
    ),
    C.fila(
      C.campo(f, { id: 'f-email', name: 'email', label: c.email, tipo: 'email', req: true, err: c.emailErr, auto: 'email' }),
      C.campo(f, { id: 'f-tel', name: 'telefono', label: c.telefono, tipo: 'tel', auto: 'tel', modo: 'tel' })
    ),
    C.fila(
      C.campo(f, { id: 'f-pais', name: 'pais', label: c.pais, auto: 'country-name' }),
      C.selector(f, { id: 'f-categoria', name: 'categoria', label: c.categoria, opciones: p.categorias })
    ),
    C.fila(
      C.selector(f, { id: 'f-objetivo', name: 'presencia', label: c.objetivo, opciones: p.objetivos }),
      C.selector(f, { id: 'f-modelo', name: 'area', label: c.colaboracion, opciones: p.modelos })
    )
  ];

  return `
  <section class="deep hero">
    <div class="hero__field" aria-hidden="true"></div>
    <div class="shell hero__in">
      <p class="eyebrow rev">${esc(p.eyebrow)}</p>
      ${C.displayH1(p.h1, { costura: true, estilo: 'margin-top:clamp(1.25rem,2.5vw,2rem)' })}
      <p class="lead hero__lead rev" style="--d:.35s">${esc(p.lead)}</p>
      <p class="rev" style="--d:.5s; margin-top:clamp(2rem,4vw,2.75rem)">
        <a class="btn" href="#form"><span>${esc(p.cta)}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </p>
    </div>
  </section>

  <section class="band" aria-labelledby="t-friccion">
    <div class="shell">
      ${C.cabeceraSeccion(p.friccionEyebrow, p.friccionH2, 't-friccion', p.friccionLead, { atenuada: true })}
      ${C.tarjetas(p.friccion, 3)}
    </div>
  </section>

  <section class="deep band" aria-labelledby="t-hacemos">
    <div class="shell">
      ${C.cabeceraSeccion(p.hacemosEyebrow, p.hacemosH2, 't-hacemos', p.hacemosLead)}
      <div class="cols" style="margin-top:clamp(2.5rem,5vw,3.5rem)">
        ${C.inventario(p.hacemos.slice(0, 4))}
        ${C.inventario(p.hacemos.slice(4), 4)}
      </div>
    </div>
  </section>

  <section class="band" aria-labelledby="t-proceso">
    <div class="shell">
      ${C.cabeceraSimple(p.procesoEyebrow, p.procesoH2, 't-proceso', { atenuada: true })}
      ${C.corredor(p.proceso)}
    </div>
  </section>

  <section class="band" id="colaboracion" aria-labelledby="t-colab">
    <div class="shell" style="border-top:1px solid var(--rule); padding-top:clamp(3rem,6vw,5rem)">
      ${C.cabeceraSeccion(p.colaboracionEyebrow, p.colaboracionH2, 't-colab', p.colaboracionLead, { atenuada: true })}
      ${C.tarjetas(p.colaboracion, 2)}
      <p class="small rev" style="margin-top:clamp(2rem,4vw,2.75rem); max-width:74ch; padding-top:1.5rem; border-top:1px solid var(--rule)">${esc(p.colaboracionNota)}</p>
    </div>
  </section>

  <section class="deep band" id="form" aria-labelledby="t-form">
    <div class="shell">
      <div class="cols cols--head">
        <div>
          <p class="eyebrow rev">${esc(p.formEyebrow)}</p>
          ${C.display(p.formH2, 'd2', 't-form', { costura: true, estilo: 'margin-top:1.25rem' })}
          <p class="body rev" style="--d:.2s; margin-top:1.5rem">${esc(p.formLead)}</p>
        </div>
        ${C.formulario(f, {
          tipo: 'Technology Partner',
          boton: p.formBoton,
          filas,
          mensaje: c.mensaje,
          placeholder: p.msgPlaceholder
        })}
      </div>
    </div>
  </section>`;
}

/* ── Empresas peruanas ───────────────────────────────────────── */
function solutions(t) {
  const s = t.solutions, f = t.form, c = f.campos;
  const filas = [
    C.fila(
      C.campo(f, { id: 'f-empresa', name: 'empresa', label: c.empresa, req: true, err: c.empresaErr, auto: 'organization' }),
      C.selector(f, { id: 'f-sector', name: 'sector', label: c.sector, opciones: s.sectores })
    ),
    C.fila(
      C.campo(f, { id: 'f-nombre', name: 'nombre', label: c.nombre, req: true, err: c.nombreErr, auto: 'name' }),
      C.campo(f, { id: 'f-cargo', name: 'cargo', label: c.cargo, auto: 'organization-title' })
    ),
    C.fila(
      C.campo(f, { id: 'f-email', name: 'email', label: c.email, tipo: 'email', req: true, err: c.emailErr, auto: 'email' }),
      C.campo(f, { id: 'f-tel', name: 'telefono', label: c.telefono, tipo: 'tel', auto: 'tel', modo: 'tel' })
    ),
    C.selector(f, { id: 'f-area', name: 'area', label: c.area, opciones: s.areas })
  ];

  return `
  <!-- Mismo lienzo de marca que la otra página, pero con «local»:
       el acento pasa a turquesa y el visitante peruano reconoce que
       está en su lado del sitio sin que nadie se lo diga. -->
  <section class="deep local hero">
    <div class="hero__field hero__field--warm" aria-hidden="true" style="bottom:auto;top:-12%;right:-6%"></div>
    <div class="shell hero__in">
      <p class="eyebrow rev">${esc(s.eyebrow)}</p>
      ${C.displayH1(s.h1, { costura: true, estilo: 'margin-top:clamp(1.25rem,2.5vw,2rem)' })}
      <p class="lead hero__lead rev" style="--d:.35s">${esc(s.lead)}</p>
      <p class="rev" style="--d:.5s; margin-top:clamp(2rem,4vw,2.75rem)">
        <a class="btn" href="#form"><span>${esc(s.cta)}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </p>
    </div>
  </section>

  <section class="local band" aria-labelledby="t-problemas">
    <div class="shell">
      ${C.cabeceraSeccion(s.problemasEyebrow, s.problemasH2, 't-problemas', s.problemasLead, { atenuada: true })}
      ${C.tarjetas(s.problemas, 3)}
    </div>
  </section>

  <section class="local band" aria-labelledby="t-como">
    <div class="shell" style="border-top:1px solid var(--rule); padding-top:clamp(3rem,6vw,5rem)">
      ${C.cabeceraSeccion(s.comoEyebrow, s.comoH2, 't-como', s.comoLead, { atenuada: true })}
      ${C.corredor(s.como)}
    </div>
  </section>

  <section class="local band" aria-labelledby="t-sectores">
    <div class="shell" style="border-top:1px solid var(--rule); padding-top:clamp(3rem,6vw,5rem)">
      ${C.cabeceraSimple(s.sectoresEyebrow, s.sectoresH2, 't-sectores', { atenuada: true })}
      <div class="rev" style="--d:.15s; margin-top:clamp(2rem,4vw,2.75rem)">
        ${C.etiquetas(s.sectores.filter(x => x !== 'Otro' && x !== 'Other'))}
      </div>
      <p class="small rev" style="--d:.25s; margin-top:clamp(2rem,4vw,2.75rem); max-width:74ch; padding-top:1.5rem; border-top:1px solid var(--rule)">${esc(s.sectoresNota)}</p>
    </div>
  </section>

  <section class="deep local band" id="form" aria-labelledby="t-form">
    <div class="shell">
      <div class="cols cols--head">
        <div>
          <p class="eyebrow rev">${esc(s.formEyebrow)}</p>
          ${C.display(s.formH2, 'd2', 't-form', { costura: true, estilo: 'margin-top:1.25rem' })}
          <p class="body rev" style="--d:.2s; margin-top:1.5rem">${esc(s.formLead)}</p>
          <p class="rev" style="--d:.3s; margin-top:1.5rem">
            <a class="lnk" href="${waUrl(t)}" target="_blank" rel="noopener">${esc(s.waLink)}<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
          </p>
        </div>
        ${C.formulario(f, {
          tipo: 'Solution enquiry',
          boton: s.formBoton,
          filas,
          mensaje: c.mensaje,
          placeholder: s.msgPlaceholder
        })}
      </div>
    </div>
  </section>`;
}

/* ── Nosotros ────────────────────────────────────────────────── */
function about(t) {
  const a = t.about;
  return `
  <section class="deep hero">
    <div class="hero__field" aria-hidden="true"></div>
    <div class="shell hero__in">
      <p class="eyebrow rev">${esc(a.eyebrow)}</p>
      ${C.displayH1(a.h1, { costura: true, estilo: 'margin-top:clamp(1.25rem,2.5vw,2rem)' })}
      <p class="lead hero__lead rev" style="--d:.35s">${esc(a.lead)}</p>
    </div>
  </section>

  <section class="band" aria-labelledby="t-modelo">
    <div class="shell">
      ${C.cabeceraSeccion(a.modeloEyebrow, a.modeloH2, 't-modelo', a.modeloLead, { atenuada: true })}
      ${C.tarjetas(a.modelo, 2)}
    </div>
  </section>

  <section class="deep band" aria-labelledby="t-criterio">
    <div class="shell">
      ${C.cabeceraSimple(a.criterioEyebrow, a.criterioH2, 't-criterio', { atenuada: true })}
      ${C.tarjetas(a.criterio, 2)}
    </div>
  </section>

  <!-- Bloque de perfil. Dice algo verdadero —que el trato es
       directo— y no inventa trayectoria, años, cargos ni formación.
       Se rellena cuando haya biografía real. -->
  <section class="band" aria-labelledby="t-perfil">
    <div class="shell">
      <div class="cols cols--head">
        <div>
          <p class="eyebrow rev">${esc(a.perfilEyebrow)}</p>
          ${C.display(a.perfilH2, 'd2', 't-perfil', { atenuada: true, estilo: 'margin-top:1.25rem' })}
        </div>
        <div class="rev" style="--d:.2s">
          <p class="lead">${esc(a.perfilTexto)}</p>
          <p class="small" style="margin-top:1.5rem">${esc(a.perfilNota)}</p>
          <p style="margin-top:1.5rem">
            <a class="lnk" href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="deep band" aria-labelledby="t-cta">
    <div class="shell">
      ${C.display(a.ctaH2, 'd2', 't-cta', { costura: true, estilo: 'max-width:18ch' })}
      <p class="lead rev" style="--d:.2s; margin-top:1.5rem">${esc(a.ctaLead)}</p>
      <div class="hero__cta rev" style="--d:.3s; margin-top:clamp(2rem,4vw,2.5rem)">
        <a class="btn" href="${RUTAS.partners[t.lang]}#form"><span>${esc(a.ctaGlobal)}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="btn btn--ghost" href="${RUTAS.solutions[t.lang]}#form"><span>${esc(a.ctaLocal)}</span></a>
      </div>
    </div>
  </section>`;
}

module.exports = { home, partners, solutions, about };
