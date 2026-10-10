/* ================================================================
   Español. Todo el texto visible del sitio vive aquí.
   ----------------------------------------------------------------
   Reglas de redacción que no se negocian, porque son las que
   mantienen la web defendible delante de un fundador extranjero:

   · NO se afirma representar a ninguna marca. No hay acuerdos
     firmados que lo permitan, y una web que presume de
     representaciones inexistentes se cae en la primera llamada.
   · NO se promete exclusividad, volumen de clientes, ingresos ni
     plazos de venta.
   · NO hay clientes, logotipos, cifras, premios ni testimonios.
   · La credibilidad se construye con el método, no con adjetivos.
   ================================================================ */
module.exports = {
  lang: 'es',

  meta: {
    ogAlt: 'Zolezzi Solutions — tecnología global, mercado peruano'
  },

  /* El mensaje precargado de WhatsApp. Va en el marcado y no en
     main.js para que un visitante de la versión inglesa no reciba
     un texto en español al pulsar enviar. */
  wa: { mensaje: "Hola, quisiera información sobre sus servicios." },

  nav: {
    principal: 'Navegación principal',
    movil: 'Navegación móvil',
    saltar: 'Saltar al contenido principal',
    inicioAria: 'Zolezzi Solutions, ir al inicio',
    cambiarIdioma: 'Ver esta página en inglés',
    abrirMenu: 'Abrir menú',
    cerrarMenu: "Cerrar menú",
    home: 'Inicio',
    partners: 'Empresas tecnológicas',
    solutions: 'Soluciones',
    about: 'Nosotros',
    cta: 'Hablemos'
  },

  pie: {
    aria: 'Pie de página',
    claim: 'Desarrollo de mercado y representación comercial en el Perú para tecnología empresarial internacional.',
    col1: 'Para quién',
    col2: 'Cómo trabajamos',
    col3: 'Contacto',
    modelo: 'El modelo',
    alcance: 'Sectores y tecnologías',
    colaboracion: 'Modelos de colaboración',
    derechos: 'Todos los derechos reservados.',
    razonSocial: 'Razón social: Zolezzi Consulting · Perú'
  },

  form: {
    enviar: 'Enviar',
    enviando: 'Enviando…',
    fino: 'Sus datos se usan solo para responder a esta consulta.',
    ok: 'Gracias. Hemos recibido su mensaje y le responderemos en un día hábil.',
    error: 'No pudimos enviar su mensaje. Vuelva a intentarlo o escríbanos por WhatsApp.',
    revisar: 'Revise los campos marcados antes de enviar.',
    noRellenar: 'No rellenar',
    elija: 'Seleccione una opción',
    campos: {
      empresa: 'Empresa', empresaErr: 'Indíquenos el nombre de la empresa.',
      nombre: 'Nombre y apellido', nombreErr: 'Indíquenos su nombre.',
      cargo: 'Cargo',
      email: 'Correo corporativo', emailErr: 'Escriba un correo válido, por ejemplo nombre@empresa.com.',
      telefono: 'Teléfono',
      pais: 'País',
      web: 'Sitio web',
      categoria: 'Categoría tecnológica',
      objetivo: 'Qué busca en el Perú',
      colaboracion: 'Colaboración que quiere explorar',
      sector: 'Sector',
      area: 'Área desde la que escribe',
      mensaje: 'Mensaje', mensajeErr: 'Cuéntenos brevemente de qué se trata.'
    }
  },

  /* ── Portada ──────────────────────────────────────────────── */
  home: {
    titulo: 'Zolezzi Solutions | Desarrollo de mercado en el Perú para tecnología internacional',
    desc: 'Ayudamos a empresas tecnológicas internacionales a explorar y desarrollar oportunidades comerciales en el Perú: conocimiento del comprador local, identificación de clientes potenciales y apertura de las primeras conversaciones.',
    ogTitulo: 'Tecnología global. Mercado peruano. Un socio local.',
    ogDesc: 'Desarrollo de mercado y representación comercial en el Perú para empresas tecnológicas internacionales.',

    eyebrow: 'Desarrollo de mercado · Representación comercial · Perú',
    h1: ['Tecnología global.', 'Mercado peruano.', 'Un socio local.'],
    lead: 'Ayudamos a empresas tecnológicas internacionales a explorar y desarrollar oportunidades comerciales en el Perú. Entendemos qué compran las empresas locales, identificamos a quién le sirve su solución y abrimos las primeras conversaciones.',
    ctaPrimaria: 'Explorar una colaboración',
    ctaSecundaria: 'Busco una solución',
    meta: [
      ['Modelo', 'Desarrollo de mercado y representación comercial'],
      ['Enfoque', 'Tecnología B2B para empresa'],
      ['Mercado', 'Perú']
    ],

    puertasTitulo: 'Elija su punto de entrada',
    puertaGlobal: {
      kind: 'Empresas tecnológicas internacionales',
      t: 'Quiere explorar el mercado peruano.',
      d: 'Evaluamos el encaje de su solución, identificamos a qué empresas les sirve y desarrollamos las primeras oportunidades comerciales. Sin que usted monte estructura local.',
      go: 'Cómo trabajamos con proveedores'
    },
    puertaLocal: {
      kind: 'Empresas peruanas',
      t: 'Busca resolver un problema con tecnología.',
      d: 'Cuéntenos la necesidad. Si existe una solución que la resuelve, la buscamos y traemos al proveedor a la conversación.',
      go: 'Ver cómo ayudamos'
    },

    modeloEyebrow: '01 — El modelo',
    modeloH2: ['Entrar a un mercado', 'no es tener un folleto', 'traducido.'],
    modeloLead: 'Una solución que ya funciona en otros mercados rara vez falla en el Perú por razones técnicas. Falla porque nadie local entiende a quién hay que llamar, qué presupuesto existe y en qué momento del año se decide.',
    pasos: [
      ['Conocemos la solución', 'Qué hace, a quién sirve, cómo se vende hoy y qué la diferencia de lo que ya existe aquí.'],
      ['Evaluamos el encaje', 'Contrastamos la propuesta con lo que el mercado peruano compra, su marco regulatorio y su nivel de madurez. Puede terminar en un no.'],
      ['Identificamos oportunidades', 'Segmentos, tipo de organización y áreas con un problema que su solución resuelve de verdad.'],
      ['Definimos la colaboración', 'Alcance, modelo de trabajo, responsabilidades y próximos pasos. Por escrito antes de empezar.'],
      ['Desarrollamos el negocio', 'Primeras conversaciones, seguimiento comercial y construcción de relación con las cuentas que avanzan.']
    ],

    alcanceEyebrow: '02 — Alcance',
    alcanceH2: ['Qué tecnología', 'y para qué sector.'],
    categoriasK: 'Categorías tecnológicas',
    sectoresK: 'Sectores',
    categorias: [
      'Inteligencia artificial aplicada',
      'Automatización de procesos',
      'Atención al cliente y automatización conversacional',
      'Tecnología para banca y seguros',
      'Analítica de datos e inteligencia de negocio',
      'Prevención del fraude y gestión de riesgos',
      'Ciberseguridad empresarial',
      'Automatización comercial y productividad de ventas',
      'Plataformas SaaS empresariales'
    ],
    sectores: [
      'Banca y servicios financieros',
      'Fintech',
      'Seguros',
      'Telecomunicaciones',
      'Educación y formación',
      'Retail',
      'Energía y minería',
      'Salud',
      'Sector público'
    ],
    alcanceNota: 'Nuestro acceso más directo hoy está en servicios financieros, donde las exigencias de riesgo, cumplimiento y seguridad hacen más urgente la tecnología especializada. Ninguna de estas listas es un catálogo cerrado: cuando aparece una solución sólida con un problema real que resolver aquí, se evalúa.',

    porqueEyebrow: '03 — Por qué un socio local',
    porqueH2: ['Alguien que ya está', 'en la sala.'],
    porque: [
      ['Conocemos al comprador', 'Cómo decide una empresa peruana, quién firma, qué áreas tienen que opinar y cuánto tarda realmente ese recorrido.'],
      ['Presencia sin estructura fija', 'Actividad comercial en el país sin constituir sociedad ni contratar equipo mientras la oportunidad todavía se está validando.'],
      ['Un solo interlocutor', 'El proveedor habla con una contraparte y el cliente peruano también. Nadie queda en medio de dos partes que no se entienden.'],
      ['Evaluamos antes de prometer', 'Si no vemos recorrido para su solución en este mercado, se lo decimos en la primera conversación.']
    ],

    buscamosEyebrow: '04 — Qué buscamos',
    buscamosH2: ['Qué tipo de solución', 'buscamos.'],
    buscamosLead: 'Trabajamos con pocas soluciones a la vez para poder dedicarles atención real. No publicamos marcas: mientras no exista un acuerdo que lo permita, nombrar a un proveedor en la web sería atribuirnos una relación que no está formalizada.',
    buscamos: [
      ['Producto en uso real', 'Con clientes en producción en al menos un mercado. No llevamos al comprador peruano tecnología que todavía se está validando.'],
      ['Venta B2B de ciclo largo', 'Soluciones que compran comités y áreas técnicas, no usuarios sueltos. Es donde un socio local cambia el resultado.'],
      ['Un problema reconocible', 'Que el cliente peruano pueda nombrar sin que se lo expliquen. Si hay que crear la categoría primero, el recorrido es otro.'],
      ['Disposición a acompañar', 'Demostraciones y pruebas con su equipo técnico. La presencia comercial la ponemos nosotros; la profundidad de producto sigue siendo suya.']
    ],

    ctaH2: ['Dos conversaciones', 'distintas.'],
    ctaLead: 'Díganos de qué lado está y le respondemos en un día hábil.',
    ctaGlobal: { kind: 'Tengo una tecnología', t: 'Quiero explorar el mercado peruano.', go: 'Explorar una colaboración' },
    ctaLocal: { kind: 'Busco una tecnología', t: 'Necesito resolver un problema concreto.', go: 'Plantear mi caso' },

    contactoEyebrow: '05 — Contacto',
    contactoH2: ['Hablemos.'],
    contactoLead: 'Escriba por el canal que le resulte más cómodo. Si prefiere contarnos el caso por escrito y con detalle, cada página tiene su formulario.',
    contacto: {
      whatsapp: 'WhatsApp', correo: 'Correo', linkedin: 'LinkedIn',
      horario: 'Horario', horarioV: 'Lun a Vie · 9:00–18:00 (GMT-5)'
    }
  },

  /* ── Empresas tecnológicas (página principal del sitio) ───── */
  partners: {
    titulo: 'Para empresas tecnológicas | Entrar al mercado peruano con un socio local',
    desc: 'Desarrollo de mercado y representación comercial en el Perú para empresas tecnológicas internacionales: evaluación de encaje, identificación de clientes potenciales, apertura de conversaciones y modelos de colaboración.',
    ogTitulo: 'Traiga su tecnología al mercado peruano',
    ogDesc: 'Evaluamos el encaje, identificamos oportunidades y abrimos las primeras conversaciones comerciales en el Perú.',

    eyebrow: 'Para empresas tecnológicas',
    h1: ['Entre al Perú', 'con alguien', 'que ya está dentro.'],
    lead: 'Evaluamos si su solución tiene recorrido en este mercado, identificamos a qué organizaciones les resuelve un problema real y abrimos las primeras conversaciones. Usted decide cuánto compromete y cuándo.',
    cta: 'Explorar una colaboración',

    friccionEyebrow: '01 — El punto de fricción',
    friccionH2: ['El producto', 'no es el problema.'],
    friccionLead: 'Las expansiones a mercados pequeños no suelen fracasar por la tecnología. Fracasan por distancia: nadie local responde por la solución y el ciclo se apaga solo.',
    friccion: [
      ['El correo en frío no abre puertas', 'El comprador enterprise peruano no responde a proveedores sin referencia local. La conversación empieza por alguien que ya está en el circuito.'],
      ['El ciclo es largo y presencial', 'Comités, áreas de riesgo, legal y compras. Sostener ese proceso desde otro huso horario y en otro idioma consume presupuesto antes del cierre.'],
      ['Montar filial es desproporcionado', 'Constituir sociedad y contratar equipo para validar una hipótesis es una apuesta cara sobre algo que todavía no se ha comprobado.']
    ],

    hacemosEyebrow: '02 — Qué hacemos',
    hacemosH2: ['Desarrollo comercial', 'por cuenta suya.'],
    hacemosLead: 'El alcance se acuerda por escrito antes de empezar. No todas las colaboraciones incluyen todo: se activa lo que la etapa de la oportunidad necesita.',
    hacemos: [
      ['Inteligencia de mercado', 'Qué se compra hoy, a qué precio de referencia, con qué marco regulatorio y quién más lo ofrece.'],
      ['Identificación de oportunidades', 'Segmentos, organizaciones y áreas concretas con un problema que su solución resuelve.'],
      ['Apertura de conversaciones', 'Primer contacto con las áreas que deciden y calificación de interés real antes de ocupar su agenda.'],
      ['Desarrollo de relación', 'Seguimiento comercial sostenido de las cuentas que avanzan, en idioma y huso horario del cliente.'],
      ['Acompañamiento en demostraciones', 'Coordinación de demos y pruebas de concepto junto a su equipo técnico.'],
      ['Adaptación del discurso', 'Propuesta de valor y materiales ajustados a cómo se compra aquí, no traducidos literalmente.'],
      ['Exploración de canal', 'Integradores, consultoras y socios que ya trabajan dentro de la cuenta, cuando el modelo lo pide.'],
      ['Presencia comercial local', 'Una contraparte en el país para el cliente, durante la evaluación y después de ella.']
    ],

    procesoEyebrow: '03 — Cómo empezamos',
    procesoH2: ['Cinco pasos,', 'sin compromiso.'],
    proceso: [
      ['Conversación exploratoria', 'Nos cuenta qué hace su solución, a quién sirve y qué busca en el Perú. Sin coste y sin compromiso.'],
      ['Evaluación de encaje', 'Revisamos si existe demanda, presupuesto y recorrido real. Si no lo vemos, se lo decimos.'],
      ['Mapa de oportunidad', 'Segmentos, tipo de organización y las primeras cuentas que tendrían sentido.'],
      ['Acuerdo de colaboración', 'Alcance, modelo de trabajo, responsabilidades y remuneración. Por escrito.'],
      ['Actividad comercial', 'Apertura de conversaciones, seguimiento y reporte periódico en el formato que usted use.']
    ],

    colaboracionEyebrow: '04 — Modelos de colaboración',
    colaboracionH2: ['El modelo se decide', 'después de evaluar,', 'no antes.'],
    colaboracionLead: 'Hay varias formas de trabajar juntos y ninguna es la correcta por defecto. Depende de su producto, de cómo se entrega y de cuánto quiera comprometer en una primera etapa.',
    colaboracion: [
      ['Desarrollo de negocio', 'Identificamos y abrimos oportunidades en su nombre, con un alcance acotado y revisable. Es el punto de partida más habitual.'],
      ['Representación comercial', 'Actuamos como su contraparte local frente al cliente, con su marca por delante. Requiere un acuerdo formal.'],
      ['Referidos', 'Le presentamos oportunidades calificadas y usted conduce el proceso comercial. El modelo más ligero para empezar.'],
      ['Distribución o reventa', 'Cuando el producto y el marco contractual lo permiten y el cliente local necesita facturación en el país.']
    ],
    colaboracionNota: 'No ofrecemos exclusividad de entrada ni garantizamos volumen de ventas, número de clientes potenciales ni plazos de cierre. Cualquiera que lo haga antes de conocer su producto está vendiendo una expectativa.',

    formEyebrow: '05 — Primer contacto',
    formH2: ['Cuéntenos', 'qué ha construido.'],
    formLead: 'Con esto basta para preparar una primera conversación útil. Respondemos en un día hábil, y si no vemos encaje se lo decimos en la primera respuesta.',
    formBoton: 'Solicitar una conversación',
    categorias: [
      'Inteligencia artificial aplicada',
      'Automatización de procesos',
      'Atención al cliente y automatización conversacional',
      'Tecnología para banca y seguros',
      'Analítica de datos',
      'Prevención del fraude y riesgos',
      'Ciberseguridad',
      'Automatización comercial',
      'Plataforma SaaS empresarial',
      'Otra'
    ],
    objetivos: [
      'Explorar si el mercado peruano tiene sentido',
      'Ya decidimos entrar y buscamos socio local',
      'Tenemos algún cliente y queremos crecer',
      'Buscamos canal o distribución'
    ],
    modelos: [
      'Todavía no lo sé',
      'Desarrollo de negocio',
      'Representación comercial',
      'Referidos',
      'Distribución o reventa'
    ],
    msgPlaceholder: 'Qué problema resuelve su solución, a qué tipo de cliente y qué espera de un socio local.'
  },

  /* ── Empresas peruanas ────────────────────────────────────── */
  solutions: {
    titulo: 'Soluciones tecnológicas para empresas en el Perú | Zolezzi Solutions',
    desc: 'Cuéntenos qué necesita resolver —atención al cliente, automatización, datos, riesgos o seguridad— y buscamos la tecnología adecuada, nacional o internacional, y traemos al proveedor a la conversación.',
    ogTitulo: '¿Qué necesita resolver?',
    ogDesc: 'Le ayudamos a encontrar la tecnología que resuelve su problema y traemos al proveedor a la mesa.',

    eyebrow: 'Para empresas peruanas',
    h1: ['¿Qué necesita', 'resolver?'],
    lead: 'Hay tecnología que resuelve su problema y que hoy no se vende aquí. Cuéntenos la necesidad: buscamos la solución, traemos al proveedor a la conversación y le acompañamos durante la evaluación.',
    cta: 'Plantear mi caso',

    problemasEyebrow: '01 — Por dónde empezamos',
    problemasH2: ['Por el problema,', 'no por el producto.'],
    problemasLead: 'Quien llega pidiendo una categoría concreta muchas veces necesita otra. Empezamos por entender qué está fallando y para cuándo necesita una decisión.',
    problemas: [
      ['Atención al cliente', 'Tiempos de respuesta, saturación de canales y procesos que dependen de personas para tareas repetitivas.'],
      ['Automatización de procesos', 'Operaciones que se hacen a mano, se documentan en hojas de cálculo y no escalan con el volumen.'],
      ['Productividad comercial', 'Equipos de venta sin información útil en el momento de decidir, y seguimiento que se pierde entre herramientas.'],
      ['Gestión de información', 'Datos dispersos, sin gobierno y difíciles de convertir en una decisión defendible.'],
      ['Servicios financieros', 'Procesos de originación, evaluación y cumplimiento con exigencias regulatorias que la herramienta actual no cubre.'],
      ['Inteligencia artificial aplicada', 'Dónde aporta valor real en su operación y dónde es solo un proyecto caro sin retorno.'],
      ['Riesgos y seguridad', 'Fraude, continuidad operativa, control de accesos y exposición de información crítica.']
    ],

    comoEyebrow: '02 — Cómo funciona',
    comoH2: ['Del problema', 'a la decisión.'],
    comoLead: 'No vendemos licencias ni cobramos por la búsqueda. Trabajamos por cuenta del proveedor tecnológico, así que para usted explorar una opción no tiene coste.',
    como: [
      ['Nos cuenta el reto', 'El problema concreto, qué han intentado ya y qué restricciones tienen.'],
      ['Buscamos la tecnología', 'Entre las soluciones que conocemos y, si hace falta, en el mercado internacional.'],
      ['Demostración y prueba', 'Coordinamos la demo con el proveedor y, si procede, una prueba sobre su propio entorno.'],
      ['Decisión y despliegue', 'Usted contrata directamente con el proveedor. Nosotros acompañamos la conversación.']
    ],

    sectoresEyebrow: '03 — Sectores',
    sectoresH2: ['Organizaciones con', 'operaciones críticas.'],
    sectoresNota: 'Nuestro acceso más directo hoy está en servicios financieros, que es donde las exigencias de riesgo, cumplimiento y seguridad hacen más urgente la tecnología especializada. Trabajamos con cualquier organización cuya operación no se pueda detener.',

    formEyebrow: '04 — Su caso',
    formH2: ['Cuéntenos', 'el problema.'],
    formLead: 'Cuanto más concreto sea el reto, más útil será la primera conversación. Respondemos en un día hábil.',
    formBoton: 'Enviar consulta',
    waLink: 'O escríbanos por WhatsApp',
    sectores: [
      'Banca y servicios financieros', 'Fintech', 'Seguros', 'Telecomunicaciones',
      'Educación y formación', 'Retail', 'Energía y minería', 'Salud', 'Sector público', 'Otro'
    ],
    areas: [
      'Tecnología / TI', 'Seguridad de la información', 'Riesgos', 'Cumplimiento',
      'Operaciones', 'Comercial', 'Finanzas', 'Dirección general', 'Otra'
    ],
    msgPlaceholder: 'El problema concreto, qué han evaluado ya y para cuándo necesitan una decisión.'
  },

  /* ── Nosotros ─────────────────────────────────────────────── */
  about: {
    titulo: 'Nosotros | Zolezzi Solutions',
    desc: 'Zolezzi Solutions es una firma peruana de desarrollo de mercado y representación comercial para tecnología empresarial internacional. Así trabajamos y así evaluamos una oportunidad.',
    ogTitulo: 'Nosotros | Zolezzi Solutions',
    ogDesc: 'Una firma comercial ágil que conecta tecnología internacional con necesidades reales de empresas peruanas.',

    eyebrow: 'Nosotros',
    h1: ['Una firma comercial,', 'no una consultora.'],
    lead: 'Zolezzi Solutions existe para resolver un desajuste concreto: hay tecnología que las empresas peruanas necesitan y que no llega, y hay proveedores que no tienen cómo entrar sin montar una operación entera.',

    modeloEyebrow: '01 — El modelo',
    modeloH2: ['Cómo ganamos', 'dinero.'],
    modeloLead: 'Lo decimos aquí porque condiciona todo lo demás y porque un proveedor serio lo va a preguntar en los primeros cinco minutos.',
    modelo: [
      ['Trabajamos por cuenta del proveedor', 'La relación comercial y la remuneración vienen de la empresa tecnológica, no del comprador peruano. Para la empresa local, explorar una opción no tiene coste.'],
      ['No compramos ni revendemos stock', 'No somos un distribuidor con inventario. Cuando el modelo pide facturación local se acuerda aparte y por escrito.'],
      ['Pocas soluciones a la vez', 'La atención comercial no se reparte indefinidamente. Preferimos trabajar bien con pocas que figurar con muchas.'],
      ['Sin estructura pesada', 'Sin oficinas por marca ni equipos dedicados por cuenta. Es lo que permite empezar pequeño y crecer solo si la oportunidad lo justifica.']
    ],

    criterioEyebrow: '02 — El criterio',
    criterioH2: ['Qué miramos antes', 'de decir que sí.'],
    criterio: [
      ['¿Existe presupuesto?', 'No basta con que el problema exista. Tiene que haber un área con partida asignada o con capacidad de pedirla.'],
      ['¿Quién decide y cuándo?', 'Un ciclo de compra que nadie puede describir es un ciclo que no se cierra.'],
      ['¿Qué hay ya instalado?', 'Sustituir algo que funciona es caro y lento. La oportunidad suele estar donde todavía no hay nada.'],
      ['¿Encaja con lo que hacemos?', 'Si la venta no necesita presencia local, el cliente no nos necesita y se lo decimos.']
    ],

    perfilEyebrow: '03 — Quién está detrás',
    perfilH2: ['Con quién', 'va a hablar.'],
    /* PENDIENTE DE DATOS REALES. No se inventa trayectoria, años,
       cargos ni formación. Este bloque se rellena cuando el cliente
       facilite su biografía; mientras tanto dice la verdad, que es
       que el trato es directo. */
    perfilTexto: 'Zolezzi Solutions es una firma pequeña y deliberadamente ágil. No hay capas: la persona con la que tiene la primera conversación es la que va a llevar su cuenta y la que va a sentarse delante del cliente peruano.',
    perfilNota: 'Si quiere conocer el detalle de la trayectoria antes de una llamada, pídalo por LinkedIn o por correo y se lo enviamos.',

    ctaH2: ['¿Seguimos', 'la conversación?'],
    ctaLead: 'Una llamada de treinta minutos basta para saber si hay algo que explorar.',
    ctaGlobal: 'Tengo una tecnología',
    ctaLocal: 'Busco una solución'
  }
};
