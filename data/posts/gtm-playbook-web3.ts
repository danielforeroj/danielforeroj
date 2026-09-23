import { Post, PostType } from '../../types';

// Written in 2025, before posts had their own files. Moved here unchanged.
const post: Post = {
  type: PostType.BLOG,
  title: 'My GTM Playbook for Web3',
  slug: 'gtm-playbook-web3',
  date: '2025-11-06T20:00:00Z',
  excerpt: 'A field-tested, no-fluff go-to-market playbook for Web3 teams. Pragmatic strategy, hybrid funnels, onchain activation, and an operating cadence that turns momentum into defensibility, now with AI SEO/AEO tactics that get you cited by answer engines.',
  // Same claims as the excerpt, tightened to 150 characters. The AEO clause is
  // the differentiating one, so it is what survives the cut.
  metaDescription: 'A field-tested go-to-market playbook for Web3 teams: hybrid funnels, onchain activation, operating cadence, and AI SEO/AEO tactics that get you cited.',
  content_md: `
# My GTM Playbook for Web3

## Key Takeaways
- **AI SEO (AEO/GEO) first.** Structure pages so answer engines (Google AI Overviews, Perplexity, ChatGPT) can lift concise answers, cite you, and send qualified traffic. Focus on direct Q&A blocks, entities, schema, author pages, and sources. :contentReference[oaicite:0]{index=0}  
- **Plain language over crypto-speak.** If a sentence needs a glossary, rewrite it.  
- **Hybrid funnels win.** Use Web2 distribution (SEO, email, partnerships) with Web3 primitives (onchain credentials, fee discounts) to prove value fast.  
- **Design the first onchain action.** One action that demonstrates real utility, no vanity mints.  
- **Operate weekly.** A boring, repeatable test cadence beats one-off stunts.  
- **Measure what matters.** Tie off-chain attribution to onchain behavior and lifetime value, not vanity mints or airdrop farmers.  
- **Partners are a system.** L1/L2s, wallets, and on/off-ramps become distribution when incentives echo your user’s success.

---

## AI SEO for Web3 GTM (AEO/GEO): How to Get Cited by Answer Engines

**Answer Engine Optimization (AEO)** means structuring content so AI systems can extract a clean, trustworthy answer and *mention your brand* in their responses. In practice, that means: (1) concise, scannable answers up top; (2) clear entities (people, projects, chains, regions) throughout; (3) schema markup (FAQPage/HowTo/Article) in JSON-LD; (4) visible author expertise and citations; and (5) fast pages. These tactics increase your odds of being quoted by AI Overviews and tools like Perplexity, exactly where early-stage users now discover products. :contentReference[oaicite:1]{index=1}

Closely related, **Generative Engine Optimization (GEO)** is the broader practice of shaping content for AI platforms that synthesize answers (ChatGPT, Perplexity, Gemini). The play is to combine authority signals (brand/author expertise and sources) with technically structured content that’s easy for LLMs to parse, think tight answer boxes, schema, tables, definitions, and FAQs that mirror real queries. :contentReference[oaicite:2]{index=2}

### A fast AEO/GEO checklist you can implement this week
- **Lead with a 90 to 120 word answer box** that directly solves the query (“What is X?”, “How do I do Y on Base/Polygon?”). Place it above the fold, then expand. :contentReference[oaicite:3]{index=3}  
- **Mark up content with schema** (Article, FAQPage, HowTo). For Web3 docs, add FAQ blocks for fees, eligibility, networks, and KYC status, then ship JSON-LD. :contentReference[oaicite:4]{index=4}  
- **Strengthen author pages + E-E-A-T signals** (bio, credentials, LinkedIn/X, speaking, notable work). AI systems and modern search reward identifiable experts. :contentReference[oaicite:5]{index=5}  
- **Cite primary sources** (audits, docs, whitepapers, fee tables). LLMs prefer content with references they can quote. :contentReference[oaicite:6]{index=6}  
- **Structure for extraction**: descriptive H2/H3s, bullets, tables, glossaries of chain-specific terms, and short definitions. :contentReference[oaicite:7]{index=7}  
- **Ship speed**: compress images, lazy-load embeds, and monitor Core Web Vitals. Slow pages get less visibility, human and machine. :contentReference[oaicite:8]{index=8}

*How this plugs into Web3 GTM:* publish plain-language explainers (EN/ES) with the answer box + FAQ schema, then map them to your **first onchain action** (credential, fee discount, or trial credit). Your AEO/GEO pages become persistent top-of-funnel that AI surfaces, while your product delivers a quick, verified win.

---

## Principles I Do Not Compromise

1) **Plain language beats crypto-speak.** Talk to a normal person. If a sentence needs a glossary, rewrite it.  
2) **Product-Market-Network Fit.** PMF is not enough. You need to fit into the networks where your users already coordinate: Telegram groups, X lists, Discord servers, local WhatsApp communities, vertical forums.  
3) **Progressive disclosure.** Start off-chain. Move on-chain when it improves the user’s outcome. Remove unnecessary wallet walls.  
4) **Trust by default.** Transparent fees, doxxed leadership or credible validators, third-party security, clear disclaimers, and responsible geography controls.  
5) **Distribution is a system, not a stunt.** Reproducible motions that can be taught to new hires and partners.  
6) **Hybrid funnels win.** Web2 tactics with Web3 primitives. Newsletters plus allowlists, SEO plus quests, events plus onchain credentials.  
7) **Speed and antifragility.** Weekly experiments and fast decision cycles. Systems that benefit from volatility rather than break.

---

## The GTM Spine: Step by Step

### 1) Define ICPs and Jobs To Be Done

Write short profiles that are painfully specific. Include one sentence for the core job to be done and the switching trigger.

- **Segment:** DeFi power users in LATAM saving in stablecoins to escape currency risk.  
  **JTBD:** Move money into a safer, yield-bearing asset quickly, with low fees, and the ability to cash out locally.  
  **Trigger:** Local currency dips 5 percent in a week or card limits change.

- **Segment:** Prosumers in gaming communities looking for provable ownership and secondary sale liquidity.  
  **JTBD:** Acquire, flex, and trade in-game assets without getting scammed or locked in.

For each ICP define their wallet maturity, risk tolerance, KYC comfort, preferred channels, and the single metric that screams success. If you cannot do this in two pages, you do not have focus yet.

**Artifact:** ICP one-pagers with JTBD, channels, first action, activation hurdle, value proof.

---

### 2) Craft a Category Narrative You Can Defend

Pick a simple, non-jargon statement that names the problem, stakes a position, and promises a win the user can feel. Use this four-part template:

- **Problem:** What normal people experience today.  
- **Enemy:** The status quo that makes it worse.  
- **Promise:** The better future in plain words.  
- **Proof:** The receipts you can show.

Example: “Sending money across borders is slow and expensive. Banks make it hard and take their cut. We make it instant and affordable with stable settlement and transparent fees. You can test it in five minutes with a free credit and see the rate before you send.”

**Artifacts:** One-page narrative, FAQ with hard questions, bilingual variants if you operate in LATAM or non-English markets.

---

### 3) Distribution Thesis: Owned, Earned, Paid, Partner

Stop treating distribution like a random act of virality. Write your stack.

- **Owned:** Website that loads fast, a blog with real POV, an email list, a docs site that non-devs can read, and a founder’s X/LinkedIn presence that sounds human.  
- **Earned:** Thought-leadership with strong data, founder interviews on relevant podcasts, niche communities where you answer questions before you pitch.  
- **Paid:** Tactical, not default. Performance ads to amplify what is already working. Campaigns with clear postback and fraud checks.  
- **Partner:** Layer-1s and Layer-2s, wallets, on/off-ramps, analytics partners, creator affiliates. Map who benefits if you win.

**Artifacts:** Channel map with goals, inputs, and cadence. Partner matrix with intros, value exchange, and next action.

---

### 4) The First Onchain Action

Design the smallest meaningful onchain action that proves the product’s promise, not a vanity mint.

- **Credential with value:** Finish onboarding and receive a non-transferable credential that unlocks lower fees or early features.  
- **Quest with purpose:** Do the core action once, see the benefit in minutes, and earn something that actually matters in product.  
- **Economic rewards with guardrails:** Fee discounts, credits, or loyalty points with clear, sustainable economics.

Subsidize fees intelligently at the start. Remove anything that looks like a cash grab or confusing airdrop math.

**Artifacts:** Activation spec with UX flow, fee policy, abuse rules, and the success metric to declare the test done.

---

### 5) Funnel Architecture: Off-chain to On-chain

**Top of funnel:** SEO for real questions (and now AEO/GEO-optimized answer boxes), founder POV on X, short product demos, and localized content. :contentReference[oaicite:9]{index=9}  
**Mid funnel:** Email nurture with a three-part sequence: problem story, proof demo, and a clear next step.  
**Activation:** Progressive wallet connection. Social logins first, then unlock wallet-required features when the user wants the benefit.  
**Post-activation:** In-product journeys and automated lifecycle emails. A “Do the next thing” nudge inside the app, not just on social.

**Artifacts:** Funnel map, email sequences, product tours, and event tracking plan.

---

### 6) Data and Attribution That Works in Web3

You need both off-chain analytics and onchain context.

- **Off-chain:** UTMs, event tracking, postbacks to measure performance, fraud filters.  
- **Onchain context:** Track the first transaction, the cost to acquire it, and the user’s behavior over time.  
- **North-star:** Choose one. For a consumer app it might be weekly active transacting users. For a protocol it might be quality developers shipping and TVL from non-incentivized activity.

**Artifacts:** Metrics glossary, dashboard mockups, data QA checklist.

---

### 7) Content Engine That Compounds

Content is a system, not a viral lottery ticket.

- **Founder POV:** A weekly note that says something useful.  
- **Explainers:** Plain-language posts that answer the top ten questions your support team sees, each with an AEO-friendly answer box and FAQ schema. :contentReference[oaicite:10]{index=10}  
- **Data stories:** One chart that proves a claim and a paragraph that teaches something.  
- **Local language:** If you care about LATAM, ship Spanish and Portuguese.  
- **User stories:** Screenshots and specifics. Cut the fluff.

**Artifacts:** Editorial calendar, reusable templates, headline bank, visual system.

---

### 8) Community Without the Cult

Community is earned by usefulness. Start small.

- **Office hours:** 60 minutes a week to help real users.  
- **Contributor path:** Clear roles for moderators, translators, researchers.  
- **Feedback rituals:** Monthly “you asked, we shipped” threads.  
- **Boundaries:** Publish rules. Enforce them.

**Artifacts:** Community charter, contributor ladder, moderation scripts.

---

### 9) Growth Loops You Can Prove

Loops beat one-off campaigns. Start with one loop and tune it.

- **Referral loop:** Reward both sides with something that improves in-product economics.  
- **Creator loop:** Trackable links, fast payouts, and creative freedom.  
- **Partner loop:** Feature integrations that add real capability, not just logos.  
- **Data loop:** New users create better data which improves matching or pricing which earns more users.

**Artifacts:** Loop diagrams, incentive math, fraud rules, review cadence.

---

### 10) Events That Drive Pipeline

Conferences, side events, and salons work when they are specific.

- **Before:** Publish your schedule and a short value promise.  
- **During:** Capture proof. Short interviews, micro-demos, and curated intros.  
- **After:** Ship a recap with names and results.  
- **IRL to URL:** Convert every handshake into a trackable follow-up in 24 hours.

**Artifacts:** Event brief, target list, shot list, and post-event follow-up template.

---

### 11) PR That Actually Helps GTM

PR is not the GTM. It is an amplifier. Treat it like one.

- **Message market fit:** Announcements tied to real milestones, not wishful roadmaps.  
- **Founder readiness:** Media training and tight narratives.  
- **Editorial targets:** Reporters who understand your category and value proof.

**Artifacts:** Messaging doc, reporter map, press kit, and a calendar of real milestones.

---

### 12) Compliance and Geography

Respect the law. This is non-negotiable.

- Publish clear disclaimers and eligibility.  
- Run geo-controls where required.  
- Avoid making economic promises you cannot keep.  
- Document risk policies and refresh them.

**Artifacts:** Compliance checklist, geo-policy, and reviewer sign-offs.

---

### 13) AI Inside the GTM

Deploy practical marketing agents to remove toil and increase speed.

- **Research agent:** Competitive scans, keyword briefs, community sentiment.  
- **Content agent:** First drafts for posts, emails, release notes that a human polishes.  
- **Community agent:** Triage repetitive questions and route edge cases.  
- **Attribution agent:** Weekly anomaly detection across campaigns.

Keep humans in the loop for tone, judgment, and sensitive topics.

**Artifacts:** Agent SOPs, review gates, prompt library.

---

### 14) Week-to-Week Operating Cadence

A boring cadence beats chaotic genius.

- **Monday:** Review top metrics and last week’s experiments. Pick this week’s tests.  
- **Tuesday to Thursday:** Ship the work. Remove blockers same day.  
- **Friday:** Publish the changelog and lessons learned.  
- **Monthly:** Reset the narrative and partner priorities based on proof.

**Artifacts:** Weekly scorecard, experiment log, monthly narrative refresh.

---

### 15) Team Shape: When to Hire What

- **Zero to One:** Founder-led GTM with a generalist growth operator and a strong designer-writer. PR and performance are fractional.  
- **One to Ten:** Add lifecycle marketing, community ops, and a partnerships lead who can speak product.  
- **Ten Plus:** Pod model per market or vertical. Keep a small editorial braintrust to protect voice.

**Artifacts:** Role scorecards, onboarding docs, competency matrix.

---

## The First 90 Days: A Realistic Path

**Phase 1: Focus and Proof**  
Ship the narrative, ICPs, and first onchain action. Launch the baseline funnel and one content lane. Measure one north-star and two drivers.

**Phase 2: Loops and Partners**  
Add a referral or creator loop. Turn two partners into distribution, not just logos. Start a weekly founder note and monthly “you asked we shipped.”

**Phase 3: Scale What Works**  
Increase paid only behind proven winners. Localize content for priority geos. Add one more loop. Improve your attribution so you can defend spend.

---

## Common Failure Modes To Avoid

- **Token before traction.** Incentives without product value become liabilities.  
- **Community as entitlement.** Without boundaries and purpose you get noise, not support.  
- **Event tourism.** Photos do not equal pipeline. Meetings do.  
- **PR as product.** Announcements cannot carry weak retention.  
- **Attribution theater.** Dashboards without decisions waste time.

---

## Mini Case Notes

- **LATAM consumer finance:** The shift from abstract onchain rewards to concrete fee reductions and fast off-ramps doubled activation and cut support tickets.  
- **Creator partnerships:** Smaller creators with real credibility outperformed big names by a wide margin when incentives were aligned to in-product outcomes.  
- **Hybrid funnel:** Email plus simple quests beat “connect wallet first” by a lot. People adopt when they see value before they risk assets.

---

## What You Can Steal Today

- A one-page narrative people can repeat  
- ICPs with JTBD and triggers  
- A first onchain action that proves value  
- A weekly operating cadence and a short experiment backlog  
- A partner list where each partner clearly wins when your user wins

Ship those artifacts in the next two weeks and you will feel momentum. Sustain the cadence for two months and you will have a real GTM machine.

If you want help pressure testing your ICPs, designing the first onchain action, implementing AEO/GEO (answer boxes + schema + author pages), or turning partners into distribution, reach out. I’ll point you to the fastest path and the traps to avoid.
`,
  tags: ['web3', 'marketing', 'gtm', 'growth', 'latam', 'ai', 'seo', 'aeo', 'geo'],
  es: {
    title: 'Mi playbook de GTM para Web3',
    excerpt: 'Un playbook de go-to-market probado en campo y sin relleno para equipos Web3. Estrategia pragmática, funnels híbridos, activación onchain y una cadencia operativa que convierte el impulso en una ventaja defendible, ahora con tácticas de AI SEO/AEO para que los motores de respuesta te citen.',
    metaDescription: 'Un playbook de go-to-market probado para equipos Web3: funnels híbridos, activación onchain, cadencia operativa y tácticas de AI SEO/AEO para que te citen.',
    tags: ['web3', 'marketing', 'gtm', 'crecimiento', 'latam', 'ai', 'seo', 'aeo', 'geo'],
    content_md: `
# Mi playbook de GTM para Web3

## Puntos clave
- **Primero AI SEO (AEO/GEO).** Estructura tus páginas para que los motores de respuesta (Google AI Overviews, Perplexity, ChatGPT) puedan extraer respuestas concisas, citarte y enviarte tráfico calificado. Enfócate en bloques directos de pregunta y respuesta, entidades, schema, páginas de autor y fuentes.
- **Lenguaje sencillo por encima de la jerga cripto.** Si una frase necesita un glosario, reescríbela.
- **Los funnels híbridos ganan.** Usa distribución Web2 (SEO, email, alianzas) con primitivas Web3 (credenciales onchain, descuentos en comisiones) para demostrar valor rápido.
- **Diseña la primera acción onchain.** Una acción que demuestre utilidad real, nada de mints de vanidad.
- **Opera cada semana.** Una cadencia de pruebas aburrida y repetible le gana a los golpes de efecto aislados.
- **Mide lo que importa.** Conecta la atribución off-chain con el comportamiento onchain y el valor de vida del cliente, no con mints de vanidad ni con cazadores de airdrops.
- **Los partners son un sistema.** Las L1/L2, las wallets y los on/off-ramps se vuelven distribución cuando los incentivos reflejan el éxito de tu usuario.

---

## AI SEO para el GTM de Web3 (AEO/GEO): cómo lograr que los motores de respuesta te citen

**Answer Engine Optimization (AEO)** significa estructurar el contenido para que los sistemas de AI puedan extraer una respuesta limpia y confiable y *mencionar tu marca* en sus respuestas. En la práctica, eso implica: (1) respuestas concisas y fáciles de escanear al principio; (2) entidades claras (personas, proyectos, cadenas, regiones) a lo largo del texto; (3) marcado schema (FAQPage/HowTo/Article) en JSON-LD; (4) experiencia visible del autor y citas; y (5) páginas rápidas. Estas tácticas aumentan tus probabilidades de que te citen AI Overviews y herramientas como Perplexity, justo donde los usuarios en etapa temprana descubren productos hoy.

Muy relacionado, **Generative Engine Optimization (GEO)** es la práctica más amplia de adaptar el contenido para plataformas de AI que sintetizan respuestas (ChatGPT, Perplexity, Gemini). La jugada es combinar señales de autoridad (experiencia de la marca o del autor y fuentes) con contenido técnicamente estructurado que sea fácil de interpretar para los LLMs: piensa en cajas de respuesta compactas, schema, tablas, definiciones y preguntas frecuentes que reflejen búsquedas reales.

### Un checklist rápido de AEO/GEO que puedes implementar esta semana
- **Abre con una caja de respuesta de 90 a 120 palabras** que resuelva directamente la consulta (“¿Qué es X?”, “¿Cómo hago Y en Base/Polygon?”). Ubícala en la parte visible sin hacer scroll y luego amplía.
- **Marca el contenido con schema** (Article, FAQPage, HowTo). Para la documentación Web3, agrega bloques de preguntas frecuentes sobre comisiones, elegibilidad, redes y estado de KYC, y luego publica el JSON-LD.
- **Fortalece las páginas de autor y las señales de E-E-A-T** (bio, credenciales, LinkedIn/X, charlas, trabajos destacados). Los sistemas de AI y la búsqueda moderna premian a los expertos identificables.
- **Cita fuentes primarias** (auditorías, documentación, whitepapers, tablas de comisiones). Los LLMs prefieren contenido con referencias que puedan citar.
- **Estructura para la extracción**: H2/H3 descriptivos, viñetas, tablas, glosarios de términos específicos de cada cadena y definiciones cortas.
- **Prioriza la velocidad**: comprime imágenes, carga los embeds de forma diferida (lazy-load) y monitorea los Core Web Vitals. Las páginas lentas tienen menos visibilidad, tanto para humanos como para máquinas.

*Cómo encaja esto en el GTM de Web3:* publica explicaciones en lenguaje sencillo (EN/ES) con la caja de respuesta y el schema de preguntas frecuentes, y luego conéctalas con tu **primera acción onchain** (credencial, descuento en comisiones o crédito de prueba). Tus páginas de AEO/GEO se convierten en una parte alta del funnel persistente que la AI muestra, mientras tu producto entrega una victoria rápida y verificada.

---

## Principios que no negocio

1) **El lenguaje sencillo le gana a la jerga cripto.** Háblale a una persona normal. Si una frase necesita un glosario, reescríbela.
2) **Product-Market-Network Fit.** El PMF no es suficiente. Necesitas encajar en las redes donde tus usuarios ya se coordinan: grupos de Telegram, listas de X, servidores de Discord, comunidades locales de WhatsApp, foros verticales.
3) **Revelación progresiva.** Empieza off-chain. Pasa a on-chain cuando eso mejore el resultado del usuario. Quita los muros de wallet innecesarios.
4) **Confianza por defecto.** Comisiones transparentes, liderazgo con identidad pública o validadores creíbles, seguridad verificada por terceros, disclaimers claros y controles geográficos responsables.
5) **La distribución es un sistema, no un golpe de efecto.** Movimientos reproducibles que se les puedan enseñar a nuevos empleados y a partners.
6) **Los funnels híbridos ganan.** Tácticas Web2 con primitivas Web3. Newsletters más allowlists, SEO más quests, eventos más credenciales onchain.
7) **Velocidad y antifragilidad.** Experimentos semanales y ciclos de decisión rápidos. Sistemas que se benefician de la volatilidad en lugar de romperse.

---

## La columna vertebral del GTM: paso a paso

### 1) Define los ICPs y los Jobs To Be Done

Escribe perfiles cortos que sean dolorosamente específicos. Incluye una frase para el trabajo principal por hacer y el detonante del cambio.

- **Segmento:** usuarios avanzados de DeFi en LATAM que ahorran en stablecoins para escapar del riesgo cambiario.
  **JTBD:** mover dinero a un activo más seguro y que genere rendimiento, rápido, con comisiones bajas y con la posibilidad de retirar localmente.
  **Detonante:** la moneda local cae 5 por ciento en una semana o cambian los límites de la tarjeta.

- **Segmento:** prosumidores en comunidades gamer que buscan propiedad demostrable y liquidez para la reventa.
  **JTBD:** adquirir, presumir y negociar activos del juego sin que los estafen ni queden atrapados.

Para cada ICP define su madurez con wallets, su tolerancia al riesgo, su comodidad con el KYC, sus canales preferidos y la única métrica que grita éxito. Si no puedes hacerlo en dos páginas, todavía no tienes foco.

**Entregable:** one-pagers de ICP con JTBD, canales, primera acción, obstáculo de activación y prueba de valor.

---

### 2) Construye una narrativa de categoría que puedas defender

Elige una declaración simple y sin jerga que nombre el problema, tome una posición y prometa una victoria que el usuario pueda sentir. Usa esta plantilla de cuatro partes:

- **Problema:** lo que las personas normales viven hoy.
- **Enemigo:** el statu quo que lo empeora.
- **Promesa:** el futuro mejor, en palabras sencillas.
- **Prueba:** las evidencias que puedes mostrar.

Ejemplo: “Enviar dinero entre países es lento y caro. Los bancos lo complican y se quedan con su tajada. Nosotros lo hacemos instantáneo y asequible, con liquidación estable y comisiones transparentes. Puedes probarlo en cinco minutos con un crédito gratis y ver la tasa antes de enviar”.

**Entregables:** narrativa de una página, preguntas frecuentes con las preguntas difíciles y variantes bilingües si operas en LATAM o en mercados que no hablan inglés.

---

### 3) Tesis de distribución: propia, ganada, pagada, de partners

Deja de tratar la distribución como un acto aleatorio de viralidad. Escribe tu stack.

- **Propia:** un sitio web que cargue rápido, un blog con un punto de vista real, una lista de email, un sitio de documentación que puedan leer quienes no son desarrolladores y una presencia del founder en X/LinkedIn que suene humana.
- **Ganada:** liderazgo de opinión con datos sólidos, entrevistas al founder en podcasts relevantes y comunidades de nicho donde respondes preguntas antes de vender.
- **Pagada:** táctica, no por defecto. Anuncios de performance para amplificar lo que ya funciona. Campañas con postback claro y controles de fraude.
- **De partners:** Layer-1s y Layer-2s, wallets, on/off-ramps, partners de analítica, creadores afiliados. Mapea quién se beneficia si tú ganas.

**Entregables:** mapa de canales con objetivos, insumos y cadencia. Matriz de partners con presentaciones, intercambio de valor y siguiente acción.

---

### 4) La primera acción onchain

Diseña la acción onchain significativa más pequeña que demuestre la promesa del producto, no un mint de vanidad.

- **Credencial con valor:** termina el onboarding y recibe una credencial no transferible que desbloquea comisiones más bajas o funciones anticipadas.
- **Quest con propósito:** haz la acción principal una vez, ve el beneficio en minutos y gana algo que de verdad importe dentro del producto.
- **Recompensas económicas con límites:** descuentos en comisiones, créditos o puntos de lealtad con una economía clara y sostenible.

Subsidia las comisiones con inteligencia al principio. Elimina cualquier cosa que parezca un intento de sacar plata o unas cuentas de airdrop confusas.

**Entregables:** especificación de activación con flujo de UX, política de comisiones, reglas contra abuso y la métrica de éxito para dar la prueba por terminada.

---

### 5) Arquitectura del funnel: de off-chain a on-chain

**Parte alta del funnel:** SEO para preguntas reales (y ahora cajas de respuesta optimizadas para AEO/GEO), el punto de vista del founder en X, demos cortas del producto y contenido localizado.
**Mitad del funnel:** nurturing por email con una secuencia de tres partes: la historia del problema, una demo que lo pruebe y un siguiente paso claro.
**Activación:** conexión progresiva de la wallet. Primero logins sociales, y luego desbloquea las funciones que requieren wallet cuando el usuario quiera el beneficio.
**Post-activación:** recorridos dentro del producto y emails automatizados de ciclo de vida. Un empujón de “Haz lo siguiente” dentro de la app, no solo en redes sociales.

**Entregables:** mapa del funnel, secuencias de email, tours del producto y plan de tracking de eventos.

---

### 6) Datos y atribución que funcionan en Web3

Necesitas tanto analítica off-chain como contexto onchain.

- **Off-chain:** UTMs, tracking de eventos, postbacks para medir el desempeño, filtros de fraude.
- **Contexto onchain:** rastrea la primera transacción, el costo de adquirirla y el comportamiento del usuario en el tiempo.
- **North-star:** elige una. Para una app de consumo podría ser los usuarios activos semanales que transaccionan. Para un protocolo podría ser los desarrolladores de calidad que lanzan productos y el TVL proveniente de actividad sin incentivos.

**Entregables:** glosario de métricas, mockups de dashboards y checklist de control de calidad de datos.

---

### 7) Un motor de contenido que se acumula

El contenido es un sistema, no un billete de lotería viral.

- **Punto de vista del founder:** una nota semanal que diga algo útil.
- **Explicativos:** publicaciones en lenguaje sencillo que respondan las diez preguntas principales que ve tu equipo de soporte, cada una con una caja de respuesta amigable para AEO y schema de preguntas frecuentes.
- **Historias con datos:** una gráfica que pruebe una afirmación y un párrafo que enseñe algo.
- **Idioma local:** si te importa LATAM, publica en español y en portugués.
- **Historias de usuarios:** capturas de pantalla y detalles concretos. Quita el relleno.

**Entregables:** calendario editorial, plantillas reutilizables, banco de titulares y sistema visual.

---

### 8) Comunidad sin culto

La comunidad se gana siendo útil. Empieza en pequeño.

- **Horas de atención:** 60 minutos a la semana para ayudar a usuarios reales.
- **Ruta para colaboradores:** roles claros para moderadores, traductores e investigadores.
- **Rituales de feedback:** hilos mensuales de “lo pediste, lo lanzamos”.
- **Límites:** publica las reglas. Hazlas cumplir.

**Entregables:** carta de la comunidad, escalera de colaboradores y guiones de moderación.

---

### 9) Growth loops que puedas demostrar

Los loops le ganan a las campañas aisladas. Empieza con un loop y afínalo.

- **Loop de referidos:** recompensa a ambas partes con algo que mejore la economía dentro del producto.
- **Loop de creadores:** links rastreables, pagos rápidos y libertad creativa.
- **Loop de partners:** integraciones destacadas que agreguen una capacidad real, no solo logos.
- **Loop de datos:** los nuevos usuarios generan mejores datos, lo que mejora el matching o el pricing, lo que atrae más usuarios.

**Entregables:** diagramas de loops, cálculo de incentivos, reglas contra fraude y cadencia de revisión.

---

### 10) Eventos que generan pipeline

Las conferencias, los side events y los salones funcionan cuando son específicos.

- **Antes:** publica tu agenda y una promesa de valor corta.
- **Durante:** captura pruebas. Entrevistas cortas, micro-demos y presentaciones curadas.
- **Después:** publica un resumen con nombres y resultados.
- **De IRL a URL:** convierte cada apretón de manos en un seguimiento rastreable en 24 horas.

**Entregables:** brief del evento, lista de objetivos, lista de tomas y plantilla de seguimiento post-evento.

---

### 11) PR que de verdad ayuda al GTM

El PR no es el GTM. Es un amplificador. Trátalo como tal.

- **Message market fit:** anuncios atados a hitos reales, no a roadmaps de ilusiones.
- **Preparación del founder:** media training y narrativas bien afinadas.
- **Objetivos editoriales:** periodistas que entiendan tu categoría y valoren las pruebas.

**Entregables:** documento de mensajes, mapa de periodistas, press kit y un calendario de hitos reales.

---

### 12) Cumplimiento y geografía

Respeta la ley. Esto no es negociable.

- Publica disclaimers y condiciones de elegibilidad claros.
- Aplica controles geográficos donde se requieran.
- Evita hacer promesas económicas que no puedas cumplir.
- Documenta las políticas de riesgo y actualízalas.

**Entregables:** checklist de cumplimiento, política geográfica y aprobaciones de los revisores.

---

### 13) AI dentro del GTM

Despliega agentes de marketing prácticos para eliminar el trabajo pesado y ganar velocidad.

- **Agente de investigación:** análisis de la competencia, briefs de keywords, sentimiento de la comunidad.
- **Agente de contenido:** primeros borradores de publicaciones, emails y notas de lanzamiento que luego pule un humano.
- **Agente de comunidad:** filtra las preguntas repetitivas y deriva los casos límite.
- **Agente de atribución:** detección semanal de anomalías en todas las campañas.

Mantén a los humanos en el proceso para el tono, el criterio y los temas sensibles.

**Entregables:** SOPs de los agentes, puntos de revisión y biblioteca de prompts.

---

### 14) Cadencia operativa semana a semana

Una cadencia aburrida le gana al genio caótico.

- **Lunes:** revisa las métricas principales y los experimentos de la semana pasada. Elige las pruebas de esta semana.
- **De martes a jueves:** entrega el trabajo. Elimina los bloqueos el mismo día.
- **Viernes:** publica el changelog y los aprendizajes.
- **Mensual:** reajusta la narrativa y las prioridades de partners con base en la evidencia.

**Entregables:** scorecard semanal, bitácora de experimentos y actualización mensual de la narrativa.

---

### 15) La forma del equipo: cuándo contratar qué

- **De cero a uno:** GTM liderado por el founder, con un operador de growth generalista y un perfil fuerte de diseño y redacción. PR y performance son fraccionales.
- **De uno a diez:** suma marketing de ciclo de vida, operaciones de comunidad y un líder de alianzas que sepa hablar de producto.
- **De diez en adelante:** modelo de pods por mercado o vertical. Mantén un pequeño grupo editorial de confianza para proteger la voz.

**Entregables:** scorecards por rol, documentos de onboarding y matriz de competencias.

---

## Los primeros 90 días: un camino realista

**Fase 1: foco y prueba**
Lanza la narrativa, los ICPs y la primera acción onchain. Pon en marcha el funnel base y una línea de contenido. Mide una north-star y dos palancas.

**Fase 2: loops y partners**
Agrega un loop de referidos o de creadores. Convierte a dos partners en distribución, no solo en logos. Empieza una nota semanal del founder y un “lo pediste, lo lanzamos” mensual.

**Fase 3: escala lo que funciona**
Aumenta la inversión pagada solo detrás de ganadores comprobados. Localiza el contenido para las geografías prioritarias. Agrega un loop más. Mejora tu atribución para que puedas defender el gasto.

---

## Errores comunes que debes evitar

- **Token antes que tracción.** Los incentivos sin valor de producto se vuelven pasivos.
- **La comunidad como derecho adquirido.** Sin límites ni propósito, obtienes ruido, no apoyo.
- **Turismo de eventos.** Las fotos no son pipeline. Las reuniones sí.
- **El PR como producto.** Los anuncios no pueden sostener una retención débil.
- **Teatro de atribución.** Los dashboards sin decisiones hacen perder el tiempo.

---

## Mini notas de casos

- **Finanzas de consumo en LATAM:** el cambio de recompensas onchain abstractas a reducciones concretas de comisiones y off-ramps rápidos duplicó la activación y redujo los tickets de soporte.
- **Alianzas con creadores:** los creadores más pequeños con credibilidad real superaron por amplio margen a los grandes nombres cuando los incentivos estaban alineados con resultados dentro del producto.
- **Funnel híbrido:** email más quests sencillas le ganó por mucho a “conecta tu wallet primero”. La gente adopta cuando ve el valor antes de arriesgar sus activos.

---

## Lo que puedes robarte hoy

- Una narrativa de una página que la gente pueda repetir
- ICPs con JTBD y detonantes
- Una primera acción onchain que demuestre valor
- Una cadencia operativa semanal y un backlog corto de experimentos
- Una lista de partners donde cada partner gana claramente cuando gana tu usuario

Termina esos entregables en las próximas dos semanas y vas a sentir el impulso. Sostén la cadencia durante dos meses y vas a tener una verdadera máquina de GTM.

Si quieres ayuda para poner a prueba tus ICPs, diseñar la primera acción onchain, implementar AEO/GEO (cajas de respuesta + schema + páginas de autor) o convertir a tus partners en distribución, escríbeme. Te voy a mostrar el camino más rápido y las trampas que debes evitar.
`
  }
};

export default post;
