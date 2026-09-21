/* ================================================================
   ZOLEZZI SOLUTIONS — Sistema «Doble Puerta»
   ----------------------------------------------------------------
   Sin dependencias. Un solo manejador de scroll, limitado con rAF:
   la cabecera, la barra de progreso y la inversión sobre los bloques
   de noche comparten el mismo frame.

   El mismo archivo sirve a las tres páginas. Todo lo que pueda no
   existir en una de ellas se comprueba antes de usarlo.
   ================================================================ */
(function () {
  'use strict';

  /* ── WhatsApp ────────────────────────────────────────────────
     El mensaje viaja precargado en el enlace: quien pulsa llega a la
     conversación con el texto escrito y solo tiene que darle a
     enviar. Vive aquí y no en el marcado para no repetirlo en las
     tres páginas y que acaben desincronizándose. */
  var WA_NUM = '51941519053';
  var WA_MSG = 'Hola, quisiera información sobre sus servicios.';
  var WA = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(WA_MSG);

  Array.prototype.forEach.call(document.querySelectorAll('[data-wa]'), function (a) {
    a.href = WA;
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };

  /* ── Scroll: cabecera, inversión y progreso ──────────────────── */
  var hdr = document.getElementById('hdr');
  var bar = document.getElementById('hdr-bar');
  // Los bloques de ámbito oscuro. Incluye el pie: la cabecera también
  // tiene que invertirse cuando se llega al final de la página.
  var darks = document.querySelectorAll('.night');
  var ticking = false;

  function frame() {
    ticking = false;

    /* Primero todas las lecturas del DOM y después todas las
       escrituras. Intercalarlas obliga al navegador a recalcular el
       estilo en mitad de cada frame de scroll. */
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var scrollable = document.documentElement.scrollHeight - vh;

    // La cabecera se invierte cuando su línea media cae sobre un
    // bloque de noche.
    var mid = hdr.getBoundingClientRect().height / 2;
    var inv = false;
    for (var i = 0; i < darks.length; i++) {
      var r = darks[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) { inv = true; break; }
    }

    hdr.classList.toggle('is-stuck', y > 60);
    hdr.classList.toggle('is-night', inv);
    if (bar) {
      bar.style.setProperty('--p', scrollable > 0 ? clamp(y / scrollable).toFixed(4) : '0');
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  frame();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ── Menú móvil ──────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        drawer.hidden = false;
        requestAnimationFrame(function () {
          // El rAF puede llegar tarde si la pestaña no está pintando o
          // si hay un doble toque. Sin esta comprobación la clase
          // acabaría sobre un cajón que ya se mandó cerrar.
          if (burger.getAttribute('aria-expanded') === 'true') drawer.classList.add('is-open');
        });
      } else {
        drawer.classList.remove('is-open');
        window.setTimeout(function () {
          if (burger.getAttribute('aria-expanded') === 'false') drawer.hidden = true;
        }, reduce ? 0 : 300);
      }
    };

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
  }

  /* ── Revelado progresivo ─────────────────────────────────────
     Un solo observador para los cuatro mecanismos de entrada: el
     bloque que se desvanece, el titular que sube por línea, el raíl
     del corredor y el filete superior de cada puerta. */

  // El hero entra siempre al cargar. Confiarlo al observador dejaba
  // la parte baja invisible en pantallas altas, donde cae fuera del
  // rootMargin negativo y parece que falta contenido.
  requestAnimationFrame(function () {
    Array.prototype.forEach.call(
      document.querySelectorAll('.hero .rev, .hero .rev-lines'),
      function (el) { el.classList.add('in'); }
    );
  });

  var revealables = document.querySelectorAll('.rev, .rev-lines, .flow, .door');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
      // El margen superior enorme da por revelado todo lo que queda
      // por encima de la ventana. Sin él, llegar con un enlace de
      // anclaje y volver hacia arriba dejaba secciones en blanco: el
      // observador nunca las vio intersecar.
    }, { rootMargin: '9999px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  }

  /* ── Formulario → /api/contact ───────────────────────────────
     Genérico: sirve al de Technology Partners y al de Soluciones sin
     saber cuál es cuál. Los campos concretos los valida el servidor;
     aquí solo se comprueba lo imprescindible para no hacer viajar un
     envío que va a rebotar.

     El `action` apunta a una Cloudflare Pages Function, NO al
     proveedor de correo: el endpoint real nunca se sirve al cliente. */
  var form = document.querySelector('form[data-contact]');

  if (form) {
    var submit = document.getElementById('submit');
    // La etiqueta vive en su propio span: escribir sobre el botón
    // entero se llevaría por delante el svg de la flecha.
    var submitT = document.getElementById('submit-t');
    var msg = document.getElementById('form-msg');
    var sending = false;
    // La etiqueta original del botón, guardada para restaurarla al
    // terminar el envío sin tenerla escrita dos veces en el archivo.
    var label = submitT ? submitT.textContent : 'Enviar';

    var fieldError = function (input, show) {
      var wrap = input.closest('.f');
      if (!wrap) return;
      var box = wrap.querySelector('.err');
      wrap.classList.toggle('is-bad', show);
      if (box) box.hidden = !show;
      input.setAttribute('aria-invalid', String(show));
    };

    var isValid = function (input) {
      var v = input.value.trim();
      if (!input.required) return true;
      if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      return v.length > 1;
    };

    var say = function (text, bad) {
      msg.textContent = text;
      msg.classList.toggle('form__msg--bad', !!bad);
      msg.hidden = false;
    };

    form.addEventListener('submit', function (e) {
      // Sin fetch dejamos que el navegador haga el POST nativo: la
      // Function responde con una página de confirmación.
      if (!window.fetch) return;
      e.preventDefault();

      // Corta el reenvío por doble clic o por Enter mientras la
      // petición está en vuelo.
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
          submitT.textContent = label;
        });
    });

    form.addEventListener('input', function (e) {
      var el = e.target;
      var wrap = el.closest('.f');
      if (wrap && wrap.classList.contains('is-bad')) fieldError(el, !isValid(el));
    });
  }

  /* ── Año en el pie ───────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
