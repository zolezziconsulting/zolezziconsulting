/* ================================================================
   ZOLEZZI Consulting — Concepto «Monolito»
   Sin dependencias. Un solo manejador de scroll, throttled con rAF:
   cabecera, barra de progreso, inversión sobre bloques negros y
   relleno del raíl del proceso comparten el mismo frame.
   ================================================================ */
(function () {
  'use strict';

  var WA_NUM = '51954715846';
  var WA_MSG = 'Hola, vi la web de Zolezzi Consulting y me gustaría cotizar un servicio.';
  var WA = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(WA_MSG);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };

  /* ── Enlaces de WhatsApp ─────────────────────────────────── */
  Array.prototype.forEach.call(document.querySelectorAll('[data-wa]'), function (a) {
    a.href = WA;
  });

  /* ── Scroll: cabecera, progreso, inversión y raíl ────────── */
  var hdr = document.getElementById('hdr');
  var bar = document.getElementById('hdr-bar');
  // Raíles que se llenan con el scroll: la metodología y el diagrama
  // del enfoque comparten el mismo mecanismo (--p sobre el contenedor).
  var rails = [document.getElementById('proc')].filter(Boolean);
  // EL HERO TIENE QUE ESTAR EN ESTA LISTA. Es un bloque oscuro como los
  // demás —la hoja le da los mismos tokens en `.hero, .sec--dark, .cta,
  // .ftr`— pero no lleva la clase .sec--dark, así que se quedaba fuera
  // del selector y la cabecera nunca se invertía nada más cargar.
  // Resultado medido: la marca «ZOLEZZI» salía en #0C1A22 sobre el
  // #0A1720 del hero, 1.03:1, y el hover del menú igual. Invisibles
  // justo en el primer pantallazo de la página.
  var darks = document.querySelectorAll('.hero, .sec--dark, .cta, .ftr');
  var ticking = false;

  function frame() {
    ticking = false;

    /* Primero todas las lecturas del DOM y después todas las
       escrituras. Intercalarlas obliga al navegador a recalcular el
       estilo en mitad de cada frame de scroll. */

    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var scrollable = document.documentElement.scrollHeight - vh;

    // La cabecera se invierte cuando su línea media cae sobre un bloque negro.
    var mid = hdr.getBoundingClientRect().height / 2;
    var inv = false;
    for (var i = 0; i < darks.length; i++) {
      var r = darks[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) { inv = true; break; }
    }

    // Cada raíl se llena según avanza su lista por la línea de foco
    // (60% de la altura de ventana).
    var fills = rails.map(function (el) {
      var r = el.getBoundingClientRect();
      return clamp((vh * 0.6 - r.top) / r.height).toFixed(4);
    });

    // 80px: por debajo de eso la cabecera sigue transparente sobre el
    // hero, que es lo que da la sensación de que flota.
    hdr.classList.toggle('is-scrolled', y > 80);
    hdr.classList.toggle('is-inv', inv);
    bar.style.setProperty('--p', scrollable > 0 ? clamp(y / scrollable).toFixed(4) : '0');
    rails.forEach(function (el, i) { el.style.setProperty('--p', fills[i]); });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  frame();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ── Menú móvil ──────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  function setDrawer(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      drawer.hidden = false;
      requestAnimationFrame(function () {
        // El rAF puede llegar muy tarde si la pestaña no está pintando o si
        // hay un doble toque. Sin esta comprobación la clase acabaría sobre
        // un cajón que ya se mandó cerrar.
        if (burger.getAttribute('aria-expanded') === 'true') drawer.classList.add('is-open');
      });
    } else {
      drawer.classList.remove('is-open');
      window.setTimeout(function () {
        if (burger.getAttribute('aria-expanded') === 'false') drawer.hidden = true;
      }, reduce ? 0 : 350);
    }
  }

  burger.addEventListener('click', function () {
    setDrawer(burger.getAttribute('aria-expanded') !== 'true');
  });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) setDrawer(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setDrawer(false);
      burger.focus();
    }
  });

  /* ── Revelado progresivo ─────────────────────────────────── */

  // El hero entra siempre al cargar. Confiarlo al observador dejaba la
  // fila inferior invisible en pantallas altas, donde cae fuera del
  // rootMargin negativo y parece que falta contenido.
  requestAnimationFrame(function () {
    Array.prototype.forEach.call(
      document.querySelectorAll('.hero .rv, .hero .mask'),
      function (el) { el.classList.add('is-in'); }
    );
  });

  // .stall, .zon y .prc entran por su clase .rv, así que no necesitan
  // mención aparte. .fnl y .rad salieron con el embudo y el radial.
  var revealables = document.querySelectorAll('.rv, .mask, .proc__i, .tl, .dash');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
      // El margen superior enorme da por revelado todo lo que queda por
      // encima de la ventana. Sin él, saltar con un enlace de anclaje y
      // volver hacia arriba dejaba secciones enteras en blanco: el
      // observador nunca las vio intersecar.
    }, { rootMargin: '9999px 0px -10% 0px', threshold: 0.1 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  }

  /* El manejador del radial de go-to-market vivía aquí. Salió el
     2026-08-07 con el servicio que ilustraba, junto con el embudo
     comercial. Para recuperarlo: git log -S'rad-gtm' -- assets/js/main.js */

  /* ── Contadores ──────────────────────────────────────────────
     Animan una sola vez, al entrar en pantalla. Con movimiento
     reducido saltan directamente al valor final: un número que sube
     solo es exactamente lo que esa preferencia pide evitar. */
  var counters = document.querySelectorAll('[data-count]');

  function runCount(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var pre = el.getAttribute('data-pre') || '';
    var suf = el.getAttribute('data-suf') || '';
    // Formato peruano: coma para millares y punto para decimales, que
    // es justo al revés que en España. Sin esto, 1240 salía «1240».
    var write = function (v) {
      el.textContent = pre + v.toLocaleString('es-PE', {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec
      }) + suf;
    };

    if (reduce) return write(end);

    var t0 = 0;
    var dur = 1300;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      // Mismo easing que el resto de la página, para que el número
      // frene igual que frenan los bloques al revelarse.
      write(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCount(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: .6 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  } else {
    Array.prototype.forEach.call(counters, runCount);
  }

  /* ── Desplegable «Servicios» ─────────────────────────────────
     Se abre al pasar el puntero y también al pulsar, porque en táctil
     y con teclado no hay hover. El <button> lleva aria-expanded y el
     panel se oculta con [hidden], no solo con CSS: así el contenido no
     existe para el lector de pantalla mientras está cerrado. */
  var srvBtn = document.getElementById('nav-srv');
  var srvMenu = document.getElementById('nav-srv-menu');

  if (srvBtn && srvMenu) {
    var srvGrp = srvBtn.parentNode;
    var hoverable = window.matchMedia('(hover: hover)');

    var setSrv = function (open) {
      srvBtn.setAttribute('aria-expanded', String(open));
      srvMenu.hidden = !open;
    };

    srvBtn.addEventListener('click', function () {
      setSrv(srvBtn.getAttribute('aria-expanded') !== 'true');
    });

    // Solo con puntero real. En táctil, `pointerenter` llega junto al
    // toque y el par enter+click abriría y cerraría en el mismo gesto.
    srvGrp.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch' || !hoverable.matches) return;
      setSrv(true);
    });
    srvGrp.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'touch' || !hoverable.matches) return;
      setSrv(false);
    });

    // Un enlace del panel cierra el menú; si no, al volver de la
    // sección el panel seguiría desplegado sobre el contenido.
    srvMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setSrv(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || srvBtn.getAttribute('aria-expanded') !== 'true') return;
      setSrv(false);
      srvBtn.focus();
    });

    // Pulsar fuera cierra. Con focusin se cubre además el tabulado:
    // al salir del grupo con el teclado el panel se recoge solo.
    document.addEventListener('pointerdown', function (e) {
      if (!srvGrp.contains(e.target)) setSrv(false);
    });
    document.addEventListener('focusin', function (e) {
      if (!srvGrp.contains(e.target)) setSrv(false);
    });
  }

  /* ── Sección activa en el menú ───────────────────────────────
     El vigía se guía por `data-spy` y no por el href, porque
     «Servicios» es un botón sin destino que representa TRES secciones.
     Cada entrada declara qué ids ilumina y aquí solo se comprueba
     pertenencia. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[data-spy]'));
  var ids = [];
  links.forEach(function (a) {
    a.getAttribute('data-spy').split(/\s+/).forEach(function (id) {
      if (id && ids.indexOf(id) === -1) ids.push(id);
    });
  });
  var targets = ids
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    var visible = new Map();
    var subLinks = srvMenu
      ? Array.prototype.slice.call(srvMenu.querySelectorAll('a'))
      : [];

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible.set(e.target.id, e.intersectionRatio); });

      var top = '';
      var best = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > best) { best = ratio; top = id; }
      });

      links.forEach(function (a) {
        var on = a.getAttribute('data-spy').split(/\s+/).indexOf(top) !== -1;
        a.classList.toggle('is-active', on);
        // aria-current solo en enlaces: en el botón del grupo no
        // designa una página y sobra.
        if (on && a.tagName === 'A') { a.setAttribute('aria-current', 'true'); }
        else { a.removeAttribute('aria-current'); }
      });

      // Dentro del panel se marca además el servicio concreto.
      subLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + top);
      });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    targets.forEach(function (s) { spy.observe(s); });
  }

  /* El manejador de pestañas de «Casos de uso» vivía aquí. La sección
     no existe en el marcado desde hace varias fases —querySelectorAll
     devolvía siempre cero— así que se retiró junto con su CSS. */

  /* ── Preguntas frecuentes ────────────────────────────────── */
  var faqs = Array.prototype.slice.call(document.querySelectorAll('.faq__q'));

  faqs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__i');
      var open = btn.getAttribute('aria-expanded') === 'true';

      // Acordeón de una sola respuesta abierta.
      faqs.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq__i').classList.remove('is-open');
      });

      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('is-open');
      }
    });
  });

  /* ── Formulario → Formspree ──────────────────────────────── */
  var form = document.getElementById('form');
  var submit = document.getElementById('submit');
  // La etiqueta vive en su propio span: escribir sobre el botón entero
  // se llevaría por delante el svg de la flecha.
  var submitT = document.getElementById('submit-t');
  var msg = document.getElementById('form-msg');

  function fieldError(input, show) {
    var wrap = input.closest('.f');
    var box = wrap.querySelector('.err');
    wrap.classList.toggle('is-err', show);
    if (box) box.hidden = !show;
    input.setAttribute('aria-invalid', String(show));
  }

  function isValid(input) {
    var v = input.value.trim();
    if (!input.required) return true;
    if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    return v.length > 1;
  }

  function say(text, bad) {
    msg.textContent = text;
    msg.classList.toggle('form__msg--ko', !!bad);
    msg.hidden = false;
  }

  var sending = false;

  form.addEventListener('submit', function (e) {
    // Sin fetch disponible dejamos que el navegador haga el POST nativo a Formspree.
    if (!window.fetch) return;
    e.preventDefault();

    // Corta el reenvío por doble clic o por Enter mientras la petición está en vuelo.
    if (sending) return;

    var fields = Array.prototype.slice.call(form.querySelectorAll('.f input, .f textarea'));
    var invalid = null;

    fields.forEach(function (input) {
      var bad = !isValid(input);
      fieldError(input, bad);
      if (bad && !invalid) invalid = input;
    });

    if (invalid) {
      say('Revise los campos marcados antes de enviar.', true);
      invalid.focus();
      return;
    }

    sending = true;
    msg.hidden = true;
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    submitT.textContent = 'Enviando…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        say('Gracias. Hemos recibido su mensaje y le responderemos en un día hábil.');
      })
      .catch(function () {
        say('No pudimos enviar su mensaje. Vuelva a intentarlo o escríbanos por WhatsApp.', true);
      })
      .then(function () {
        sending = false;
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
        submitT.textContent = 'Enviar mensaje';
      });
  });

  form.addEventListener('input', function (e) {
    var el = e.target;
    var wrap = el.closest('.f');
    if (wrap && wrap.classList.contains('is-err')) fieldError(el, !isValid(el));
  });

  /* ── Año en el footer ────────────────────────────────────── */
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
