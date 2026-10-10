/* ================================================================
   English. Same structure as es.js, key for key.
   ----------------------------------------------------------------
   This is NOT a literal translation. English is the language of the
   primary audience —founders and commercial leads at international
   technology companies— so it is written as native commercial
   English, not as Spanish with English words.

   The same non-negotiable rules apply:
   · We never claim to represent a brand. No signed agreements allow
     it, and a site that boasts of representations it does not have
     collapses on the first call.
   · No promises of exclusivity, pipeline volume, revenue or timing.
   · No clients, logos, figures, awards or testimonials.
   · Credibility comes from the method, not from adjectives.
   ================================================================ */
module.exports = {
  lang: 'en',

  meta: {
    ogAlt: 'Zolezzi Solutions — global technology, Peruvian market'
  },

  /* El mensaje precargado de WhatsApp. Va en el marcado y no en
     main.js para que un visitante de la versión inglesa no reciba
     un texto en español al pulsar enviar. */
  wa: { mensaje: "Hello, I would like information about your services." },

  nav: {
    principal: 'Main navigation',
    movil: 'Mobile navigation',
    saltar: 'Skip to main content',
    inicioAria: 'Zolezzi Solutions, go to homepage',
    cambiarIdioma: 'View this page in Spanish',
    abrirMenu: 'Open menu',
    cerrarMenu: "Close menu",
    home: 'Home',
    partners: 'Technology companies',
    solutions: 'Solutions',
    about: 'About',
    cta: 'Get in touch'
  },

  pie: {
    aria: 'Footer',
    claim: 'Market development and commercial representation in Peru for international enterprise technology.',
    col1: 'Who we work with',
    col2: 'How we work',
    col3: 'Contact',
    modelo: 'The model',
    alcance: 'Sectors and technologies',
    colaboracion: 'Partnership models',
    derechos: 'All rights reserved.',
    razonSocial: 'Registered as Zolezzi Consulting · Peru'
  },

  form: {
    enviar: 'Send',
    enviando: 'Sending…',
    fino: 'We use your details only to reply to this enquiry.',
    ok: 'Thank you. We have received your message and will reply within one business day.',
    error: 'We could not send your message. Please try again or reach us on WhatsApp.',
    revisar: 'Please check the highlighted fields before sending.',
    noRellenar: 'Do not fill in',
    elija: 'Select an option',
    campos: {
      empresa: 'Company', empresaErr: 'Please tell us your company name.',
      nombre: 'Full name', nombreErr: 'Please tell us your name.',
      cargo: 'Role',
      email: 'Work email', emailErr: 'Please enter a valid email, for example name@company.com.',
      telefono: 'Phone',
      pais: 'Country',
      web: 'Website',
      categoria: 'Technology category',
      objetivo: 'What you are looking for in Peru',
      colaboracion: 'Partnership you want to explore',
      sector: 'Sector',
      area: 'Your function',
      mensaje: 'Message', mensajeErr: 'Please tell us briefly what this is about.'
    }
  },

  /* ── Homepage ─────────────────────────────────────────────── */
  home: {
    titulo: 'Zolezzi Solutions | Market development in Peru for international technology',
    desc: 'We help international technology companies explore and build commercial opportunities in Peru: local buyer knowledge, identification of prospective customers and the first conversations opened on your behalf.',
    ogTitulo: 'Global technology. Peruvian market. One local partner.',
    ogDesc: 'Market development and commercial representation in Peru for international technology companies.',

    eyebrow: 'Market development · Commercial representation · Peru',
    h1: ['Global technology.', 'Peruvian market.', 'One local partner.'],
    lead: 'We help international technology companies explore and build commercial opportunities in Peru. We know what local organisations actually buy, we identify who your solution fits, and we open the first conversations.',
    ctaPrimaria: 'Explore a partnership',
    ctaSecundaria: "I'm looking for a solution",
    meta: [
      ['Model', 'Market development and commercial representation'],
      ['Focus', 'B2B enterprise technology'],
      ['Market', 'Peru']
    ],

    puertasTitulo: 'Choose your starting point',
    puertaGlobal: {
      kind: 'International technology companies',
      t: 'You want to explore the Peruvian market.',
      d: 'We assess whether your solution fits, identify which organisations need it, and develop the first commercial opportunities. Without you setting up a local operation.',
      go: 'How we work with vendors'
    },
    puertaLocal: {
      kind: 'Peruvian organisations',
      t: 'You need to solve a problem with technology.',
      d: 'Tell us what you need. If a solution exists, we find it and bring the vendor into the conversation.',
      go: 'See how we help'
    },

    modeloEyebrow: '01 — The model',
    modeloH2: ['Entering a market', 'is not having a', 'translated deck.'],
    modeloLead: 'A solution that already works elsewhere rarely fails in Peru for technical reasons. It fails because nobody local knows who to call, what budget exists, or at what point in the year the decision is actually made.',
    pasos: [
      ['We learn the solution', 'What it does, who it serves, how it sells today and what makes it different from what is already here.'],
      ['We assess the fit', 'We test the proposition against what the Peruvian market buys, its regulatory context and its level of maturity. This can end in a no.'],
      ['We map the opportunity', 'Segments, types of organisation and the functions with a problem your solution genuinely solves.'],
      ['We define the partnership', 'Scope, working model, responsibilities and next steps. In writing, before anything starts.'],
      ['We develop the business', 'First conversations, commercial follow-up and relationship building with the accounts that move forward.']
    ],

    alcanceEyebrow: '02 — Scope',
    alcanceH2: ['Which technology', 'and for which sector.'],
    categoriasK: 'Technology categories',
    sectoresK: 'Sectors',
    categorias: [
      'Applied artificial intelligence',
      'Process automation',
      'Customer service and conversational automation',
      'Banking and insurance technology',
      'Data analytics and business intelligence',
      'Fraud prevention and risk management',
      'Enterprise cybersecurity',
      'Sales automation and productivity',
      'Enterprise SaaS platforms'
    ],
    sectores: [
      'Banking and financial services',
      'Fintech',
      'Insurance',
      'Telecommunications',
      'Education and training',
      'Retail',
      'Energy and mining',
      'Healthcare',
      'Public sector'
    ],
    alcanceNota: 'Our most direct access today is in financial services, where risk, compliance and security requirements make specialised technology most urgent. Neither list is a closed catalogue: when a solid solution appears with a real problem to solve here, we assess it.',

    porqueEyebrow: '03 — Why a local partner',
    porqueH2: ['Someone already', 'in the room.'],
    porque: [
      ['We know the buyer', 'How a Peruvian organisation decides, who signs, which functions have to weigh in, and how long that path really takes.'],
      ['Presence without fixed structure', 'Commercial activity in the country without incorporating an entity or hiring a team while the opportunity is still being validated.'],
      ['A single counterpart', 'The vendor talks to one contact and so does the Peruvian customer. Nobody is left between two parties who do not understand each other.'],
      ['We assess before we promise', 'If we do not see a path for your solution in this market, we tell you in the first conversation.']
    ],

    buscamosEyebrow: '04 — What we look for',
    buscamosH2: ['The kind of solution', 'we work with.'],
    buscamosLead: 'We work with a small number of solutions at a time so each one gets real attention. We do not publish brand names: until an agreement allows it, naming a vendor on this site would claim a relationship that is not formalised.',
    buscamos: [
      ['A product in real use', 'With customers in production in at least one market. We do not bring the Peruvian buyer technology that is still being validated.'],
      ['Long-cycle B2B sales', 'Solutions bought by committees and technical functions, not individual users. That is where a local partner changes the outcome.'],
      ['A recognisable problem', 'One the Peruvian customer can name without being taught the category first. If the category has to be created, the path is a different one.'],
      ['Willingness to show up', 'Demos and proofs of concept with your technical team. We provide the commercial presence; the product depth stays yours.']
    ],

    ctaH2: ['Two different', 'conversations.'],
    ctaLead: 'Tell us which side you are on and we will reply within one business day.',
    ctaGlobal: { kind: 'I have a technology', t: 'I want to explore the Peruvian market.', go: 'Explore a partnership' },
    ctaLocal: { kind: "I'm looking for technology", t: 'I need to solve a specific problem.', go: 'Describe my case' },

    contactoEyebrow: '05 — Contact',
    contactoH2: ['Let us talk.'],
    contactoLead: 'Reach us through whichever channel suits you. If you would rather set out your case in writing, each page has its own form.',
    contacto: {
      whatsapp: 'WhatsApp', correo: 'Email', linkedin: 'LinkedIn',
      horario: 'Hours', horarioV: 'Mon to Fri · 9:00–18:00 (GMT-5)'
    }
  },

  /* ── Technology companies (the most important page) ───────── */
  partners: {
    titulo: 'For technology companies | Enter the Peruvian market with a local partner',
    desc: 'Market development and commercial representation in Peru for international technology companies: fit assessment, prospect identification, first conversations and partnership models.',
    ogTitulo: 'Bring your technology to the Peruvian market',
    ogDesc: 'We assess the fit, identify the opportunity and open the first commercial conversations in Peru.',

    eyebrow: 'For technology companies',
    h1: ['Enter Peru with', 'someone who is', 'already inside.'],
    lead: 'We assess whether your solution has a path in this market, identify which organisations it solves a real problem for, and open the first conversations. You decide how much you commit, and when.',
    cta: 'Explore a partnership',

    friccionEyebrow: '01 — Where it breaks',
    friccionH2: ['The product', 'is not the problem.'],
    friccionLead: 'Expansions into smaller markets rarely fail on technology. They fail on distance: nobody local stands behind the solution and the cycle quietly stalls.',
    friccion: [
      ['Cold email opens no doors', 'Peruvian enterprise buyers do not answer vendors with no local reference. The conversation starts with someone already in the circuit.'],
      ['The cycle is long and in person', 'Committees, risk, legal and procurement. Carrying that process from another time zone and another language burns budget before close.'],
      ['A subsidiary is disproportionate', 'Incorporating an entity and hiring a team to validate a hypothesis is an expensive bet on something still unproven.']
    ],

    hacemosEyebrow: '02 — What we do',
    hacemosH2: ['Market development', 'on your behalf.'],
    hacemosLead: 'Scope is agreed in writing before anything starts. Not every partnership includes everything: we activate what the stage of the opportunity actually needs.',
    hacemos: [
      ['Market intelligence', 'What gets bought today, at what reference price, under which regulations, and who else is offering it.'],
      ['Opportunity identification', 'Segments, organisations and specific functions with a problem your solution solves.'],
      ['Opening conversations', 'First contact with the people who decide, and qualification of real interest before we take up your time.'],
      ['Relationship development', 'Sustained commercial follow-up on the accounts that progress, in the customer’s language and time zone.'],
      ['Support through demos', 'Coordinating demonstrations and proofs of concept alongside your technical team.'],
      ['Adapting the message', 'Value proposition and materials shaped to how buying actually happens here, not translated literally.'],
      ['Channel exploration', 'Integrators, consultancies and partners already working inside the account, when the model calls for it.'],
      ['Local commercial presence', 'A counterpart in the country for the customer, during evaluation and after it.']
    ],

    procesoEyebrow: '03 — How we start',
    procesoH2: ['Five steps,', 'no commitment.'],
    proceso: [
      ['Exploratory call', 'You tell us what your solution does, who it serves and what you are looking for in Peru. No cost, no commitment.'],
      ['Fit assessment', 'We check whether demand, budget and a real path exist. If we do not see it, we say so.'],
      ['Opportunity map', 'Segments, types of organisation and the first accounts that would make sense.'],
      ['Partnership agreement', 'Scope, working model, responsibilities and compensation. In writing.'],
      ['Commercial activity', 'Opening conversations, follow-up and regular reporting in whatever format you already use.']
    ],

    colaboracionEyebrow: '04 — Partnership models',
    colaboracionH2: ['The model is decided', 'after the assessment,', 'not before.'],
    colaboracionLead: 'There are several ways to work together and none of them is right by default. It depends on your product, how it is delivered, and how much you want to commit at an early stage.',
    colaboracion: [
      ['Business development', 'We identify and open opportunities on your behalf, with a defined and reviewable scope. This is the most common starting point.'],
      ['Commercial representation', 'We act as your local counterpart in front of the customer, with your brand at the front. This requires a formal agreement.'],
      ['Referrals', 'We bring you qualified opportunities and you run the sales process. The lightest way to begin.'],
      ['Distribution or resale', 'Where the product and the contractual framework allow it and the local customer needs in-country invoicing.']
    ],
    colaboracionNota: 'We do not offer exclusivity up front, and we do not guarantee sales volume, number of prospects or time to close. Anyone promising that before seeing your product is selling an expectation.',

    formEyebrow: '05 — First contact',
    formH2: ['Tell us what', 'you have built.'],
    formLead: 'This is enough to prepare a useful first conversation. We reply within one business day, and if we do not see a fit we will say so in that first reply.',
    formBoton: 'Request a conversation',
    categorias: [
      'Applied artificial intelligence',
      'Process automation',
      'Customer service and conversational automation',
      'Banking and insurance technology',
      'Data analytics',
      'Fraud prevention and risk',
      'Cybersecurity',
      'Sales automation',
      'Enterprise SaaS platform',
      'Other'
    ],
    objetivos: [
      'Exploring whether Peru makes sense',
      'Decided to enter, looking for a local partner',
      'We have some traction and want to grow',
      'Looking for channel or distribution'
    ],
    modelos: [
      'Not sure yet',
      'Business development',
      'Commercial representation',
      'Referrals',
      'Distribution or resale'
    ],
    msgPlaceholder: 'What problem your solution solves, for what kind of customer, and what you expect from a local partner.'
  },

  /* ── Peruvian organisations ───────────────────────────────── */
  solutions: {
    titulo: 'Enterprise technology solutions in Peru | Zolezzi Solutions',
    desc: 'Tell us what you need to solve — customer service, automation, data, risk or security — and we find the right technology, local or international, and bring the vendor into the conversation.',
    ogTitulo: 'What do you need to solve?',
    ogDesc: 'We help you find the technology that solves your problem and bring the vendor to the table.',

    eyebrow: 'For Peruvian organisations',
    h1: ['What do you', 'need to solve?'],
    lead: 'There is technology that solves your problem and is not sold here today. Tell us what you need: we find the solution, bring the vendor into the conversation and stay with you through the evaluation.',
    cta: 'Describe my case',

    problemasEyebrow: '01 — Where we start',
    problemasH2: ['With the problem,', 'not the product.'],
    problemasLead: 'People who arrive asking for a specific category often need a different one. We start by understanding what is failing and by when you need a decision.',
    problemas: [
      ['Customer service', 'Response times, channel saturation, and processes that depend on people for repetitive work.'],
      ['Process automation', 'Operations run by hand, documented in spreadsheets, that do not scale with volume.'],
      ['Sales productivity', 'Sales teams without useful information at the moment of decision, and follow-up lost between tools.'],
      ['Information management', 'Scattered data, ungoverned and hard to turn into a defensible decision.'],
      ['Financial services', 'Origination, assessment and compliance processes with regulatory demands the current tooling does not cover.'],
      ['Applied artificial intelligence', 'Where it genuinely adds value in your operation, and where it is just an expensive project with no return.'],
      ['Risk and security', 'Fraud, operational continuity, access control and exposure of critical information.']
    ],

    comoEyebrow: '02 — How it works',
    comoH2: ['From the problem', 'to the decision.'],
    comoLead: 'We do not sell licences and we do not charge for the search. We are compensated by the technology vendor, so exploring an option costs you nothing.',
    como: [
      ['You describe the challenge', 'The specific problem, what you have already tried and what constraints you have.'],
      ['We find the technology', 'Among the solutions we know and, where needed, in the international market.'],
      ['Demo and pilot', 'We coordinate the demonstration with the vendor and, where it makes sense, a proof of concept in your own environment.'],
      ['Decision and rollout', 'You contract directly with the vendor. We stay in the conversation.']
    ],

    sectoresEyebrow: '03 — Sectors',
    sectoresH2: ['Organisations with', 'critical operations.'],
    sectoresNota: 'Our most direct access today is in financial services, where risk, compliance and security requirements make specialised technology most urgent. We work with any organisation whose operation cannot stop.',

    formEyebrow: '04 — Your case',
    formH2: ['Tell us', 'the problem.'],
    formLead: 'The more specific the challenge, the more useful the first conversation. We reply within one business day.',
    formBoton: 'Send enquiry',
    waLink: 'Or reach us on WhatsApp',
    sectores: [
      'Banking and financial services', 'Fintech', 'Insurance', 'Telecommunications',
      'Education and training', 'Retail', 'Energy and mining', 'Healthcare', 'Public sector', 'Other'
    ],
    areas: [
      'Technology / IT', 'Information security', 'Risk', 'Compliance',
      'Operations', 'Commercial', 'Finance', 'Executive', 'Other'
    ],
    msgPlaceholder: 'The specific problem, what you have already evaluated and by when you need a decision.'
  },

  /* ── About ────────────────────────────────────────────────── */
  about: {
    titulo: 'About | Zolezzi Solutions',
    desc: 'Zolezzi Solutions is a Peruvian market development and commercial representation firm for international enterprise technology. How we work and how we assess an opportunity.',
    ogTitulo: 'About | Zolezzi Solutions',
    ogDesc: 'A lean commercial firm connecting international technology with real needs in Peruvian organisations.',

    eyebrow: 'About',
    h1: ['A commercial firm,', 'not a consultancy.'],
    lead: 'Zolezzi Solutions exists to close a specific gap: there is technology Peruvian organisations need that never arrives, and there are vendors with no way in short of building an entire operation.',

    modeloEyebrow: '01 — The model',
    modeloH2: ['How we', 'get paid.'],
    modeloLead: 'We state it here because it shapes everything else, and because any serious vendor will ask within the first five minutes.',
    modelo: [
      ['We are paid by the vendor', 'The commercial relationship and the compensation come from the technology company, not from the Peruvian buyer. For the local organisation, exploring an option costs nothing.'],
      ['We do not buy or resell stock', 'We are not a distributor holding inventory. Where the model requires local invoicing, that is agreed separately and in writing.'],
      ['A few solutions at a time', 'Commercial attention does not divide indefinitely. We would rather work properly with a few than appear to work with many.'],
      ['No heavy structure', 'No offices per brand, no dedicated teams per account. That is what makes it possible to start small and grow only if the opportunity justifies it.']
    ],

    criterioEyebrow: '02 — The criteria',
    criterioH2: ['What we check', 'before saying yes.'],
    criterio: [
      ['Is there budget?', 'A problem existing is not enough. There has to be a function with an allocated line or the standing to request one.'],
      ['Who decides, and when?', 'A buying cycle nobody can describe is a cycle that does not close.'],
      ['What is already installed?', 'Replacing something that works is slow and expensive. The opportunity is usually where nothing exists yet.'],
      ['Does it fit what we do?', 'If the sale does not need local presence, the customer does not need us, and we say so.']
    ],

    perfilEyebrow: '03 — Who is behind this',
    perfilH2: ['Who you', 'will be talking to.'],
    /* PENDING REAL DETAILS. No invented track record, years, titles
       or education. This block gets filled in when the client
       supplies a biography; meanwhile it states something true,
       which is that the contact is direct. */
    perfilTexto: 'Zolezzi Solutions is small and deliberately lean. There are no layers: the person you have the first conversation with is the one who will run your account and the one who will sit across from the Peruvian customer.',
    perfilNota: 'If you would like the detail of the track record before a call, ask on LinkedIn or by email and we will send it over.',

    ctaH2: ['Shall we carry on', 'the conversation?'],
    ctaLead: 'A thirty-minute call is enough to know whether there is something worth exploring.',
    ctaGlobal: 'I have a technology',
    ctaLocal: "I'm looking for a solution"
  }
};
