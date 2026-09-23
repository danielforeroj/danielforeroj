import { Post, PostType } from '../../types';

// Written in 2025, before posts had their own files. Moved here unchanged.
const post: Post = {
  type: PostType.BLOG,
  title: 'Fuck Web3 Jargon',
  slug: 'fuck-web3-jargon',
  date: '2025-11-06T20:15:00Z',
  excerpt: 'If your product needs a glossary to sign up, you don’t have a product problem, you have a language problem. This is a field guide to killing crypto-speak, writing for real people, and shipping UX that converts.',
  // Same claims as the excerpt, tightened to 157 characters so search surfaces
  // show the whole sentence instead of cutting it mid-clause.
  metaDescription: 'If your product needs a glossary, you have a language problem. A field guide to killing crypto-speak, writing for real people, and shipping UX that converts.',
  content_md: `
# Fuck Web3 Jargon

## Key Takeaways
- **Plain language converts.** Jargon increases cognitive load and erodes trust. Evidence from usability research shows clear, concise language improves comprehension and task completion for *experts and non-experts alike*. :contentReference[oaicite:0]{index=0}  
- **Trust is fragile.** Most people still doubt crypto’s reliability and safety, confusing language makes that worse. Speak human, show fees, show risks, and make the first step easy. :contentReference[oaicite:1]{index=1}  
- **UX, not hype, is the barrier.** The biggest adoption blocker isn’t regulation or throughput, it’s user experience. Reduce jargon and design progressive disclosure for wallets, fees, and signing. :contentReference[oaicite:2]{index=2}  
- **Design for answer engines.** Write short, extractable explanations (and FAQ schema) so AI/answer engines quote *you* when people ask “What is gas?” or “How do smart wallets work?” (AEO/GEO). :contentReference[oaicite:3]{index=3}  
- **Make it bilingual by default.** If you care about LATAM, ship Spanish/Portuguese microcopy that avoids literal translations of crypto slang and explains actions in local terms.

---

## The Cost of Crypto-Speak

Crypto didn’t stall because blockchains can’t do more transactions. It stalled because too many products assume everyone wants to learn a new language before they can do anything useful.

Users are trying to solve simple jobs, send money, buy a thing, prove ownership, access a perk. When the path is lined with unexplained compounds like “AA wallets,” “zk-SNARKs,” “gas oracles,” and “MEV protection,” many bounce. The research is boring but blunt: **clarity beats cleverness**. Professionals, not just novices, prefer plain language; cognitive load kills conversion during forms and onboarding. :contentReference[oaicite:4]{index=4}

Trust is also a language. When **63% of Americans say they aren’t confident that the current ways to invest in or use crypto are reliable and safe**, every ambiguous word, “stake,” “farm,” “airdrop”, adds friction. You won’t earn confidence with cooler jargon; you earn it with plain words, transparent fees, and predictable outcomes. :contentReference[oaicite:5]{index=5}

---

## The Principle: Write for People, Not Practitioners

Plain language isn’t “dumbing down.” It’s **designing for understanding** so more people can use your product successfully, including experts who are busy and want to move fast. The UK government’s plain-language standard says it well: it improves comprehension for users with different literacy levels and for readers who speak English as an additional language. That is LATAM product reality. :contentReference[oaicite:6]{index=6}

---

## The Five Places Jargon Kills Conversion (and How to Fix Each)

### 1) Wallet Creation & First Signature
**Problem:** “Create a non-custodial account, back up your seed, sign a message.”  
**Fix:** *Progressive disclosure.* Start with social/email sign-in or embedded smart wallets. Use microcopy that explains *why* we’re asking for a signature in one line (“We use a quick signature to verify it’s you, no fees, no spending”). If you support smart wallets, say what that changes: “No seed phrases to store. Recover with your email + a backup.” Smart-wallet onboarding exists, describe it in human terms. :contentReference[oaicite:7]{index=7}

**Before → After**  
“Sign this ECDSA message” → “Quick check: tap ‘Approve’ so we know this account is yours. This doesn’t move funds.”

### 2) Fees and “Gas”
**Problem:** “Estimated gas: 0.0023 ETH (base + priority).”  
**Fix:** Show a *total in local currency* first. “Network fee: $0.19 (paid to the network to process your transaction).” Add a “Why a fee?” tooltip with 2 sentences. Stop treating “gas” like a sacred term.

**Before → After**  
“Your gas limit is 21000” → “Network fee: $0.09, this pays computers to process your transfer.”

### 3) Risk & Reversibility
**Problem:** “On-chain transactions are immutable. DYOR.”  
**Fix:** Use adult language: “On-chain transfers can’t be undone. Double-check the address. If something looks wrong, stop and chat with support.”

**Before → After**  
“DYOR NFA” → “This isn’t financial advice. Learn how returns and fees work before you invest.”

### 4) Privacy & Proofs
**Problem:** “We use zk-SNARKs so your data stays private.”  
**Fix:** Explain the *benefit*: “You can prove you’re eligible without sharing your data.” If you need a name, add it after: “(This uses a privacy math trick called a ‘zero-knowledge proof.’)” For readers who care, link to a short explainer. :contentReference[oaicite:8]{index=8}

**Before → After**  
“Anonymous KYC via ZKPs” → “Prove you’re over 18 without uploading your ID.”

### 5) Rewards & Airdrops
**Problem:** “Stake LP tokens to farm points and qualify for retroactive airdrops.”  
**Fix:** Translate rewards into the user’s win. “Hold your pass to unlock lower trading fees and early access. You’ll also earn points that can be redeemed later.”

---

## The “Say It Straight” Style Guide (Steal This)

**Write like this:**
- Use **one-line purpose statements** at the top of screens: “Send money fast with a clear fee before you pay.”  
- Prefer **verbs to nouns**: “Send,” “Swap,” “Sell” over “Settlement,” “Liquidity,” “Realization.”  
- **Define once, nearby.** If you must use a crypto term, explain it in 9 to 20 words the first time.  
- **Use examples.** “If you send \$100, you’ll see the total fee and the exact amount the other person receives.”  
- **Brevity wins.** Aim for 8 to 14 words per sentence in prompts and helper text.

**Avoid like the plague:**
- “DYOR” (say “Learn how it works before you invest”)  
- “Non-custodial mnemonic seed” (say “Recovery phrase you must keep private”)  
- “Slippage tolerance” (say “Price may change by up to X% while your trade is processing”)  
- “Bridging” (say “Move your funds from Network A to Network B”)  
- “Liquidity event” (say “When withdrawals/trades open”)

---

## LATAM: Language and Culture Notes You Can’t Skip

- **Local currency and fees** by default (ARS, COP, MXN, PEN, BRL). People decide with local numbers first.  
- **Spanish ≠ Spanish.** Pick a neutral Latin American Spanish for UI, avoid region-specific slang, and write for 6th to 8th grade reading level.  
- **Portuguese matters.** If Brazil is on your roadmap, invest in native PT-BR copy.  
- **Explain compliance choices** plainly: “To follow local rules, some features aren’t available in your country yet.”  
- **Influencers ≠ journalists.** People do get news from creators, but you’re responsible for accuracy; never outsource risk language. :contentReference[oaicite:9]{index=9}  
- **Scam context.** Regulators have flagged a flood of misleading promotions. Be explicit about risks, eligibility, and who your product is for. Plain risk language is part of trust. :contentReference[oaicite:10]{index=10}

---

## Microcopy Makeovers (Copy-and-Paste)

**Email/Sign-Up**  
- Before: “Create a Web3-native, self-custodial wallet with optional MPC recovery.”  
- After: “Create your account. You control it. Recover with your email if you lose your phone.”

**Transactions**  
- Before: “Approve contract interaction; set gas limit and priority fee.”  
- After: “Review and approve. You’ll see the total, including the network fee, before you pay.”

**Security**  
- Before: “Never disclose your seed phrase.”  
- After: “Write down your recovery phrase and keep it offline. Anyone who sees it can take your money.”

**Support**  
- Before: “Due to the immutable nature of blockchain, refunds are not possible.”  
- After: “On-chain transfers can’t be reversed. If something looks wrong, stop and contact us.”

**ZK/Privacy**  
- Before: “Eligibility is proven using zk-SNARKs.”  
- After: “Prove you qualify without sharing your data (uses a privacy-proof method).” :contentReference[oaicite:11]{index=11}

---

## Patterns That Replace Jargon with UX

1) **Progressive disclosure**  
Put advanced settings (gas, slippage, networks) behind “Advanced” accordions. Use sensible defaults. This reduces thinking during critical steps, exactly how you reduce cognitive load in forms. :contentReference[oaicite:12]{index=12}

2) **Explainer drawers**  
One-tap “What is this?” panels: 2 sentences + a diagram. No new tab, no medium post.

3) **Local totals and receipts**  
Show the final amount the recipient gets, the fee, and the time estimate. In local currency first.

4) **Smart wallets, explained in one beat**  
“Create a wallet in seconds, no seed phrase. Recover with your email or a backup device.” (Then add a “Learn more” for people who want the cryptography details.) :contentReference[oaicite:13]{index=13}

5) **Default safety**  
Warnings in plain language for risky actions (“This token has a history of price swings. Double-check before you trade.”). Don’t rely on abbreviations like “NFA.” Regulators are watching misleading promos, your words must be clear. :contentReference[oaicite:14]{index=14}

---

## AEO/GEO: How to Win the “What Is Gas?” Query

Answer engines and LLMs increasingly summarize results. You want your explanations cited when users ask simple questions. Do this on your docs/blog:

- Start each explainer with a **90 to 120-word answer box** that defines the thing and the user benefit.  
- Add **FAQ schema** (JSON-LD) with 4 to 6 direct Q&As (“How much are network fees?”, “Are transactions reversible?”).  
- Use **tables** for comparisons (networks, fees, limits) and **bold labels** for key entities (Base, Polygon, Brazil).  
- Publish **author pages** with credentials and link to external **primary sources** (whitepapers, audits).  
- Keep pages fast and accessible. :contentReference[oaicite:15]{index=15}

---

## Metrics: Prove That Plain Language Pays

Track changes from a jargon-heavy baseline to your new copy:

- **Onboarding completion rate** (account created → first successful action)  
- **Time on critical step** (should go down)  
- **Support ticket tags** (seed phrase, gas, slippage, network)  
- **Mis-send rate / wrong network attempts**  
- **Trust indicators** (“I understand the fees,” “I know how to recover my account”)  
- **Return visits** after first action

If you can, run a usability test: task + think-aloud + SUS/UMUX scores. Government service manuals have simple, battle-tested guidance on user research cadence, steal it. :contentReference[oaicite:16]{index=16}

---

## Implementation Playbook (Two Weeks)

**Day 1 to 2: Inventory & intent**  
List every place jargon appears: onboarding screens, modals, settings, docs, emails, alerts. Note the user’s *intent* on each screen in one sentence.

**Day 3 to 5: Rewrite**  
Apply the style guide, microcopy makeovers, and bilingual pass. Replace abbreviations with sentences. Add “why this matters” tooltips.

**Day 6 to 7: AEO/GEO pass**  
Convert top 10 FAQs into short answer boxes + FAQ schema. Publish author pages for your PM/engineer who owns each explainer.

**Day 8 to 10: UX patterns**  
Add progressive disclosure and local-currency totals. If you support smart wallets, describe recovery in one sentence on the creation screen.

**Day 11 to 14: Test & ship**  
Run 5 to 8 user tests in your target market (WhatsApp recruitment works in LATAM). Compare completion rates and edit ruthlessly.

---

## “But Our Users Are Advanced”

Great. Advanced users love speed and clarity. \`gasPrice\` and \`nonce\` still exist, just hide them under **Advanced**. Experts will find the knobs; everyone else gets a paved road.

And for the truly technical concepts (like ZK proofs), respect the reader with a plain description first, then link to the math. “Prove you qualify without sharing data” is always the *first* sentence; “zk-SNARK” is the *label*, not the pitch. :contentReference[oaicite:17]{index=17}

---

## The Stakes

People store recovery phrases in Notes apps, paste them into chats, and fall for fake support accounts, not because they’re careless, but because we made security **linguistic**, not **obvious**. Your words are part of your defense-in-depth. (And yes, wallets remain hard; even researchers flag usability as a core problem.) :contentReference[oaicite:18]{index=18}

---

## The Pledge

If your product needs a glossary to sign up, it needs a rewrite. Start with one journey. Replace each crypto-ism with a sentence a smart 12-year-old understands. Add local totals, show risks in human words, and design defaults that make the right action the easy action.

Jargon is a habit. Clarity is a strategy. Choose the one that compounds.
`,
  tags: ['web3', 'ux', 'product', 'marketing', 'plain-language', 'latam', 'seo', 'aeo', 'privacy', 'wallets'],
  es: {
    title: 'A la mierda la jerga Web3',
    excerpt: 'Si tu producto necesita un glosario para que la gente se registre, no tienes un problema de producto, tienes un problema de lenguaje. Esta es una guía de campo para acabar con la jerga cripto, escribir para gente real y lanzar una UX que convierte.',
    metaDescription: 'Si tu producto necesita un glosario, tienes un problema de lenguaje. Guía para acabar con la jerga cripto, escribir para gente real y lanzar UX que convierte.',
    tags: ['web3', 'ux', 'producto', 'marketing', 'lenguaje-claro', 'latam', 'seo', 'aeo', 'privacidad', 'wallets'],
    content_md: `
# A la mierda la jerga Web3

## Puntos clave
- **El lenguaje claro convierte.** La jerga aumenta la carga cognitiva y erosiona la confianza. La evidencia de la investigación en usabilidad muestra que un lenguaje claro y conciso mejora la comprensión y la finalización de tareas *tanto para expertos como para no expertos*.  
- **La confianza es frágil.** La mayoría de la gente todavía duda de la confiabilidad y la seguridad de cripto, y el lenguaje confuso lo empeora. Habla como humano, muestra las comisiones, muestra los riesgos y haz que el primer paso sea fácil.  
- **La barrera es la UX, no el hype.** El mayor obstáculo para la adopción no es la regulación ni la capacidad de procesamiento, es la experiencia de usuario. Reduce la jerga y diseña con revelación progresiva para wallets, comisiones y firmas.  
- **Diseña para los motores de respuesta.** Escribe explicaciones cortas y fáciles de extraer (y schema de FAQ) para que los motores de AI y de respuesta te citen *a ti* cuando la gente pregunte "¿Qué es el gas?" o "¿Cómo funcionan las smart wallets?" (AEO/GEO).  
- **Hazlo bilingüe por defecto.** Si te importa LATAM, lanza microcopy en español y portugués que evite las traducciones literales del slang cripto y explique las acciones en términos locales.

---

## El costo de hablar en cripto

Cripto no se estancó porque las blockchains no puedan procesar más transacciones. Se estancó porque demasiados productos asumen que todo el mundo quiere aprender un idioma nuevo antes de poder hacer algo útil.

Los usuarios intentan resolver tareas simples: enviar plata, comprar algo, demostrar que algo es suyo, acceder a un beneficio. Cuando el camino está lleno de compuestos sin explicar como "AA wallets", "zk-SNARKs", "gas oracles" y "MEV protection", muchos se van. La investigación es aburrida pero directa: **la claridad le gana a la astucia**. Los profesionales, no solo los principiantes, prefieren el lenguaje claro; la carga cognitiva mata la conversión en los formularios y el onboarding.

La confianza también es un lenguaje. Cuando **el 63% de los estadounidenses dice que no confía en que las formas actuales de invertir en cripto o usarlo sean confiables y seguras**, cada palabra ambigua, "stake", "farm", "airdrop", suma fricción. No te vas a ganar la confianza con jerga más cool; te la ganas con palabras simples, comisiones transparentes y resultados predecibles.

---

## El principio: escribe para personas, no para especialistas

El lenguaje claro no es "simplificar de más". Es **diseñar para que te entiendan**, para que más personas puedan usar tu producto con éxito, incluidos los expertos que están ocupados y quieren avanzar rápido. El estándar de lenguaje claro del gobierno del Reino Unido lo dice bien: mejora la comprensión para usuarios con distintos niveles de alfabetización y para lectores que hablan inglés como segunda lengua. Esa es la realidad de producto en LATAM.

---

## Los cinco lugares donde la jerga mata la conversión (y cómo arreglar cada uno)

### 1) Creación de la wallet y primera firma
**Problema:** "Crea una cuenta no custodial, respalda tu semilla, firma un mensaje."  
**Solución:** *Revelación progresiva.* Empieza con inicio de sesión social o por correo, o con smart wallets integradas. Usa microcopy que explique en una línea *por qué* pedimos una firma ("Usamos una firma rápida para verificar que eres tú, sin comisiones y sin gastar nada"). Si soportas smart wallets, di qué cambia con eso: "No tienes que guardar seed phrases. Recupera tu cuenta con tu correo + un respaldo." El onboarding con smart wallets existe, descríbelo en términos humanos.

**Antes → Después**  
"Firma este mensaje ECDSA" → "Verificación rápida: toca 'Aprobar' para que sepamos que esta cuenta es tuya. Esto no mueve fondos."

### 2) Comisiones y "gas"
**Problema:** "Gas estimado: 0.0023 ETH (base + prioridad)."  
**Solución:** Muestra primero un *total en moneda local*. "Comisión de red: $0.19 (se le paga a la red para procesar tu transacción)." Agrega un tooltip de "¿Por qué hay una comisión?" con 2 frases. Deja de tratar "gas" como un término sagrado.

**Antes → Después**  
"Tu gas limit es 21000" → "Comisión de red: $0.09, esto les paga a los computadores que procesan tu transferencia."

### 3) Riesgo y reversibilidad
**Problema:** "Las transacciones on-chain son inmutables. DYOR."  
**Solución:** Usa lenguaje de adultos: "Las transferencias on-chain no se pueden deshacer. Revisa bien la dirección. Si algo se ve raro, detente y escríbele a soporte."

**Antes → Después**  
"DYOR NFA" → "Esto no es asesoría financiera. Aprende cómo funcionan los rendimientos y las comisiones antes de invertir."

### 4) Privacidad y pruebas
**Problema:** "Usamos zk-SNARKs para que tus datos sigan siendo privados."  
**Solución:** Explica el *beneficio*: "Puedes demostrar que cumples los requisitos sin compartir tus datos." Si necesitas un nombre, agrégalo después: "(Esto usa un truco matemático de privacidad llamado 'prueba de conocimiento cero'.)" Para los lectores a los que les interese, enlaza una explicación corta.

**Antes → Después**  
"KYC anónimo vía ZKPs" → "Demuestra que eres mayor de 18 sin subir tu documento de identidad."

### 5) Recompensas y airdrops
**Problema:** "Haz stake de tus LP tokens para farmear puntos y calificar para airdrops retroactivos."  
**Solución:** Traduce las recompensas en lo que gana el usuario. "Conserva tu pase para desbloquear comisiones de trading más bajas y acceso anticipado. También ganarás puntos que podrás redimir más adelante."

---

## La guía de estilo "Dilo directo" (róbatela)

**Escribe así:**
- Usa **frases de propósito de una línea** en la parte superior de las pantallas: "Envía plata rápido, con una comisión clara antes de pagar."  
- Prefiere **verbos a sustantivos**: "Enviar", "Cambiar", "Vender" en lugar de "Liquidación", "Liquidez", "Realización".  
- **Define una vez, cerca.** Si tienes que usar un término cripto, explícalo en 9 a 20 palabras la primera vez.  
- **Usa ejemplos.** "Si envías \$100, verás la comisión total y el monto exacto que recibe la otra persona."  
- **Lo breve gana.** Apunta a 8 a 14 palabras por frase en los mensajes y los textos de ayuda.

**Evita como la peste:**
- "DYOR" (di "Aprende cómo funciona antes de invertir")  
- "Semilla mnemónica no custodial" (di "Frase de recuperación que debes mantener privada")  
- "Tolerancia de slippage" (di "El precio puede cambiar hasta un X% mientras se procesa tu operación")  
- "Bridging" (di "Mueve tus fondos de la Red A a la Red B")  
- "Evento de liquidez" (di "Cuando se abran los retiros/las operaciones")

---

## LATAM: notas de lenguaje y cultura que no te puedes saltar

- **Moneda local y comisiones** por defecto (ARS, COP, MXN, PEN, BRL). La gente decide primero con números locales.  
- **El español ≠ el español.** Elige un español latinoamericano neutro para la UI, evita el slang de una región específica y escribe para un nivel de lectura de 6.º a 8.º grado.  
- **El portugués importa.** Si Brasil está en tu roadmap, invierte en copy nativo en PT-BR.  
- **Explica las decisiones de cumplimiento** con palabras simples: "Para cumplir con las normas locales, algunas funciones todavía no están disponibles en tu país."  
- **Influencers ≠ periodistas.** La gente sí se informa a través de creadores, pero la responsabilidad por la precisión es tuya; nunca tercerices el lenguaje sobre riesgos.  
- **Contexto de estafas.** Los reguladores han señalado una avalancha de promociones engañosas. Sé explícito sobre los riesgos, los requisitos y para quién es tu producto. El lenguaje claro sobre riesgos es parte de la confianza.

---

## Microcopy renovado (para copiar y pegar)

**Correo/Registro**  
- Antes: "Crea una wallet Web3 nativa y autocustodiada con recuperación MPC opcional."  
- Después: "Crea tu cuenta. Tú la controlas. Recupérala con tu correo si pierdes el celular."

**Transacciones**  
- Antes: "Aprueba la interacción con el contrato; define el gas limit y la priority fee."  
- Después: "Revisa y aprueba. Verás el total, incluida la comisión de red, antes de pagar."

**Seguridad**  
- Antes: "Nunca reveles tu seed phrase."  
- Después: "Anota tu frase de recuperación y guárdala fuera de internet. Cualquiera que la vea puede quedarse con tu plata."

**Soporte**  
- Antes: "Debido a la naturaleza inmutable de la blockchain, no es posible hacer reembolsos."  
- Después: "Las transferencias on-chain no se pueden revertir. Si algo se ve raro, detente y contáctanos."

**ZK/Privacidad**  
- Antes: "La elegibilidad se demuestra usando zk-SNARKs."  
- Después: "Demuestra que cumples los requisitos sin compartir tus datos (usa un método de prueba que protege tu privacidad)."

---

## Patrones que reemplazan la jerga con UX

1) **Revelación progresiva**  
Pon las configuraciones avanzadas (gas, slippage, redes) detrás de acordeones de "Avanzado". Usa valores por defecto sensatos. Esto reduce lo que hay que pensar en los pasos críticos, exactamente como se reduce la carga cognitiva en los formularios.

2) **Paneles explicativos**  
Paneles de "¿Qué es esto?" a un toque: 2 frases + un diagrama. Sin pestaña nueva, sin post de Medium.

3) **Totales locales y comprobantes**  
Muestra el monto final que recibe el destinatario, la comisión y el tiempo estimado. Primero en moneda local.

4) **Smart wallets, explicadas en un solo paso**  
"Crea una wallet en segundos, sin seed phrase. Recupérala con tu correo o con un dispositivo de respaldo." (Después agrega un "Más información" para quienes quieran los detalles criptográficos.)

5) **Seguridad por defecto**  
Advertencias en lenguaje claro para las acciones riesgosas ("Este token tiene un historial de cambios bruscos de precio. Revisa bien antes de operar."). No dependas de abreviaturas como "NFA". Los reguladores están vigilando las promociones engañosas, tus palabras tienen que ser claras.

---

## AEO/GEO: cómo ganar la búsqueda "¿Qué es el gas?"

Los motores de respuesta y los LLMs resumen los resultados cada vez más. Quieres que citen tus explicaciones cuando los usuarios hacen preguntas simples. Haz esto en tu documentación/blog:

- Empieza cada explicación con una **caja de respuesta de 90 a 120 palabras** que defina la cosa y el beneficio para el usuario.  
- Agrega **schema de FAQ** (JSON-LD) con 4 a 6 preguntas y respuestas directas ("¿Cuánto cuestan las comisiones de red?", "¿Las transacciones se pueden revertir?").  
- Usa **tablas** para las comparaciones (redes, comisiones, límites) y **etiquetas en negrita** para las entidades clave (Base, Polygon, Brasil).  
- Publica **páginas de autor** con credenciales y enlaza a **fuentes primarias** externas (whitepapers, auditorías).  
- Mantén las páginas rápidas y accesibles.

---

## Métricas: demuestra que el lenguaje claro paga

Mide los cambios desde una línea base llena de jerga hasta tu nuevo copy:

- **Tasa de finalización del onboarding** (cuenta creada → primera acción exitosa)  
- **Tiempo en el paso crítico** (debería bajar)  
- **Etiquetas de tickets de soporte** (seed phrase, gas, slippage, red)  
- **Tasa de envíos errados / intentos en la red equivocada**  
- **Indicadores de confianza** ("Entiendo las comisiones", "Sé cómo recuperar mi cuenta")  
- **Visitas de regreso** después de la primera acción

Si puedes, haz una prueba de usabilidad: tarea + pensar en voz alta + puntajes SUS/UMUX. Los manuales de servicios del gobierno tienen guías simples y probadas en batalla sobre la cadencia de la investigación con usuarios, róbatelas.

---

## Plan de implementación (dos semanas)

**Día 1 a 2: Inventario e intención**  
Haz una lista de cada lugar donde aparece jerga: pantallas de onboarding, modales, configuración, documentación, correos, alertas. Anota en una frase la *intención* del usuario en cada pantalla.

**Día 3 a 5: Reescritura**  
Aplica la guía de estilo, el microcopy renovado y la pasada bilingüe. Reemplaza las abreviaturas con frases. Agrega tooltips de "por qué esto importa".

**Día 6 a 7: Pasada de AEO/GEO**  
Convierte las 10 preguntas frecuentes principales en cajas de respuesta cortas + schema de FAQ. Publica páginas de autor para el PM o ingeniero dueño de cada explicación.

**Día 8 a 10: Patrones de UX**  
Agrega revelación progresiva y totales en moneda local. Si soportas smart wallets, describe la recuperación en una frase en la pantalla de creación.

**Día 11 a 14: Prueba y lanza**  
Haz de 5 a 8 pruebas con usuarios en tu mercado objetivo (reclutar por WhatsApp funciona en LATAM). Compara las tasas de finalización y edita sin piedad.

---

## "Pero nuestros usuarios son avanzados"

Genial. A los usuarios avanzados les encantan la velocidad y la claridad. \`gasPrice\` y \`nonce\` siguen existiendo, solo escóndelos bajo **Avanzado**. Los expertos van a encontrar los controles; todos los demás reciben un camino pavimentado.

Y para los conceptos de verdad técnicos (como las pruebas ZK), respeta al lector con una descripción simple primero y después enlaza a las matemáticas. "Demuestra que cumples los requisitos sin compartir datos" siempre es la *primera* frase; "zk-SNARK" es la *etiqueta*, no el argumento de venta.

---

## Lo que está en juego

La gente guarda sus frases de recuperación en apps de notas, las pega en chats y cae con cuentas falsas de soporte, no porque sea descuidada, sino porque volvimos la seguridad algo **lingüístico**, no algo **obvio**. Tus palabras son parte de tu defensa en profundidad. (Y sí, las wallets siguen siendo difíciles; hasta los investigadores señalan la usabilidad como un problema central.)

---

## El compromiso

Si tu producto necesita un glosario para que la gente se registre, necesita una reescritura. Empieza con un solo recorrido. Reemplaza cada criptoísmo por una frase que entendería un niño inteligente de 12 años. Agrega totales locales, muestra los riesgos con palabras humanas y diseña valores por defecto que hagan que la acción correcta sea la acción fácil.

La jerga es un hábito. La claridad es una estrategia. Elige la que se capitaliza.
`
  }
};

export default post;
