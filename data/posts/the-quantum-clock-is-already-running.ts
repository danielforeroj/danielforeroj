import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'The Quantum Clock Is Already Running',
  slug: 'the-quantum-clock-is-already-running',
  date: '2026-03-25T14:00:00Z',
  excerpt:
    'You do not need a quantum computer to be affected by one. The migration to post-quantum cryptography is already happening in your browser, and the part your company owns is the part nobody has started.',
  metaDescription:
    'Post-quantum migration is already happening in browsers while servers lag. What the standards say, what the estimates moved, and what to do this year.',
  tags: ['quantum', 'security', 'cryptography', 'infrastructure', 'governance'],
  content_md: `
# The Quantum Clock Is Already Running

## Key Takeaways
- **The migration started without you.** More than half of browser traffic already uses post-quantum key agreement. Servers are far behind.
- **The estimate for breaking RSA moved by an order of magnitude in one paper.** That is the real news of the last two years.
- **Harvest now, decrypt later is a motivated assumption, not a documented incident.** Say that honestly and the argument gets stronger, not weaker.
- **The standards exist. Signatures are the unfinished half.**
- **The work is inventory before cryptography.** You cannot migrate what you cannot list.

---

Quantum computing gets discussed as if it were a single future event that either arrives or does not. That framing is useless for anyone running a company.

The useful framing is a clock. Something you store or transmit today has a lifetime. If that lifetime extends past the date a sufficiently capable quantum computer exists, then your decision about encryption today is a decision about the future, whether or not you made it deliberately.

## The number that changed the conversation

In 2019, the reference estimate for factoring RSA-2048 was roughly 20 million noisy qubits running for about eight hours.

In May 2025, the same researcher published a revised estimate: under a week, with fewer than one million noisy qubits. Roughly a twentyfold reduction in the hardware requirement, achieved through better arithmetic, better error correcting codes and cheaper magic state preparation. ([arXiv, May 2025](https://arxiv.org/abs/2505.15917))

No new hardware was needed for that result. The algorithms got better. That is the part people miss when they track qubit counts as if they were the only variable: the target moves toward the hardware, not just the hardware toward the target.

Expert opinion has shifted with it. The 2025 Quantum Threat Timeline report, published this month, surveyed 26 experts and put the average likelihood of breaking RSA-2048 within a day, within ten years, at 28 to 49 percent depending on how the question was framed. That is the highest ten year figure in the seven years the survey has run. Sixty nine percent of respondents put the fifteen year likelihood at 50 percent or more. ([Global Risk Institute, March 2026](https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/))

Neither imminent nor irrelevant. Both of those positions are lazy.

## Half the internet already migrated and nobody noticed

Here is the fact that surprises every executive I show it to. Post-quantum key agreement went from 29 percent to 52 percent of human HTTPS traffic to Cloudflare over the course of 2025, and passed 60 percent by February 2026. ([Cloudflare, December 2025](https://blog.cloudflare.com/radar-2025-year-in-review/))

Your browser did that. You were not consulted.

The server side is where the gap is. As of late 2025, only a few percent of origin servers supported post-quantum key agreement. The traffic figure is high because a handful of very large front doors upgraded, not because the long tail did.

That asymmetry is the whole opportunity and the whole risk. The parts of your stack operated by someone else are being handled. The parts you operate are not.

## The standards are real, and one half is missing

The key encapsulation and signature standards were finalised in August 2024: ML-KEM, ML-DSA and SLH-DSA. ([NIST](https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization)) A backup key encapsulation mechanism, HQC, was selected in March 2025 with its own standard expected to follow. Guidance on using key encapsulation properly was finalised in September 2025. ([NIST SP 800-227](https://csrc.nist.gov/pubs/sp/800/227/final))

Shipping followed quickly in the places engineers control directly. OpenSSH added hybrid post-quantum key exchange in 9.9 and made it the default in 10.0 in April 2025, and later versions warn when a connection is not post-quantum. ([OpenSSH release notes](https://www.openssh.com/releasenotes.html)) OpenSSL 3.5 shipped the new algorithms the same month. Signal and Apple both moved messaging to post-quantum key agreement.

What has not happened is authentication. There is still no public post-quantum certificate in general use, and the sober expectation is first certificates during 2026 with broad browser trust later. ([Cloudflare, October 2025](https://blog.cloudflare.com/pq-2025/))

So the honest status is: confidentiality in transit is being solved now, identity is next, and identity is harder because it involves every certificate authority, every device that validates one, and every embedded system nobody has touched in nine years.

## On harvest now, decrypt later

The standard argument for urgency is that adversaries are recording encrypted traffic today to decrypt it once they can. It is a reasonable assumption. Long lived secrets exist, storage is cheap, and intelligence services collect.

I looked for the evidence and could not find a public, documented case. Government guidance frames it as a risk to manage, not an incident to report.

I say that in client conversations because the argument survives it. You do not need a proven interception to justify migrating data with a twenty year confidentiality requirement. Medical records, legal archives, identity documents, state communications, long term contracts. If the secret must hold until 2040, the question is not whether someone is recording, it is whether you would be comfortable if they were.

For a payment confirmation that is worthless in an hour, the honest answer is that this is not your priority. Say that too. Credibility on this topic comes from being willing to tell a client what does not matter.

## Regulators set dates, and dates are what move budgets

The UK guidance is the clearest published timeline: discovery and a migration plan by 2028, highest priority migration by 2031, complete by 2035. It was published in March 2025 and reviewed again this year without substantive change. ([NCSC](https://www.ncsc.gov.uk/guidance/pqc-migration-timelines))

The EU issued a coordinated implementation roadmap in June 2025 following the Commission recommendation of 2024. ([European Commission](https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography)) Germany's BSI requires hybrid deployment, classical and post-quantum together, rather than a straight replacement, and France's ANSSI takes the same position.

That hybrid requirement is worth understanding. It exists because the new algorithms are young, and a defect in one of them should not leave you with nothing. Anyone selling you a pure post-quantum deployment as more modern is selling you less safety, not more.

In the US, NIST's proposed deprecation timeline is still a draft rather than policy, which is a distinction worth keeping straight when someone quotes 2030 and 2035 at you as though they were law.

## What to actually do this year

1. **Inventory.** Every place you use cryptography, including the ones inside products you bought. This is the step everyone skips and the step that takes the longest. The UK timeline allocates three years to discovery and planning for a reason.
2. **Classify by lifetime.** How long does each secret need to hold. That single question sorts your whole estate into urgent, eventual, and irrelevant.
3. **Ask your vendors, in writing, on a date.** Not whether they support post-quantum cryptography. When, for which product, with which algorithms, in hybrid or not. The answers will vary enormously and the variance is the information.
4. **Turn on what is free.** Modern SSH and TLS stacks give you hybrid key agreement by upgrading. That is a maintenance ticket, not a project.
5. **Buy crypto agility, not algorithms.** Anything you procure now should let you change algorithm without changing product. That is the requirement that survives whatever gets standardised next.

## The verdict

I am not going to tell you a quantum computer will break your encryption next year. Nobody credible is saying that.

What I will tell you is that the estimate moved by twenty times in one paper, that your browser already migrated, that your servers probably have not, that regulators have published dates, and that the inventory step alone takes years.

The clock does not care whether you find the topic interesting.
`,
  es: {
    title: 'El reloj cuántico ya está corriendo',
    excerpt:
      'No necesitas un computador cuántico para que uno te afecte. La migración a la criptografía poscuántica ya está ocurriendo en tu navegador, y la parte que le toca a tu empresa es la que nadie ha empezado.',
    metaDescription:
      'La migración poscuántica ya ocurre en navegadores y los servidores van atrás. Qué dicen los estándares, qué cambió en las estimaciones y qué hacer este año.',
    tags: ['cuántica', 'seguridad', 'criptografía', 'infraestructura', 'gobernanza'],
    content_md: `
# El reloj cuántico ya está corriendo

## Puntos clave
- **La migración empezó sin ti.** Más de la mitad del tráfico de los navegadores ya usa acuerdo de claves poscuántico. Los servidores van muy atrás.
- **La estimación para romper RSA cambió en un orden de magnitud con un solo paper.** Esa es la verdadera noticia de los últimos dos años.
- **"Cosechar ahora, descifrar después" es un supuesto razonado, no un incidente documentado.** Dilo con honestidad y el argumento se vuelve más fuerte, no más débil.
- **Los estándares existen. Las firmas son la mitad que falta.**
- **El trabajo es inventario antes que criptografía.** No puedes migrar lo que no puedes listar.

---

Se habla de la computación cuántica como si fuera un único evento futuro que llega o no llega. Ese enfoque no le sirve de nada a quien dirige una empresa.

El enfoque útil es un reloj. Lo que almacenas o transmites hoy tiene una vida útil. Si esa vida útil se extiende más allá de la fecha en que exista un computador cuántico con suficiente capacidad, entonces tu decisión de cifrado de hoy es una decisión sobre el futuro, la hayas tomado a propósito o no.

## El número que cambió la conversación

En 2019, la estimación de referencia para factorizar RSA-2048 era de unos 20 millones de qubits ruidosos funcionando durante unas ocho horas.

En mayo de 2025, el mismo investigador publicó una estimación revisada: menos de una semana, con menos de un millón de qubits ruidosos. Aproximadamente una reducción de veinte veces en el requisito de hardware, lograda con mejor aritmética, mejores códigos de corrección de errores y una preparación de estados mágicos más barata. ([arXiv, mayo de 2025](https://arxiv.org/abs/2505.15917))

Ese resultado no necesitó hardware nuevo. Los algoritmos mejoraron. Esa es la parte que la gente pasa por alto cuando sigue el número de qubits como si fuera la única variable: el objetivo se acerca al hardware, no solo el hardware al objetivo.

La opinión de los expertos se movió con él. El informe Quantum Threat Timeline 2025, publicado este mes, encuestó a 26 expertos y ubicó la probabilidad promedio de romper RSA-2048 en menos de un día, dentro de diez años, entre 28 y 49 por ciento según cómo se formulara la pregunta. Es la cifra a diez años más alta en los siete años que lleva la encuesta. El sesenta y nueve por ciento de los encuestados ubicó la probabilidad a quince años en 50 por ciento o más. ([Global Risk Institute, marzo de 2026](https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/))

Ni inminente ni irrelevante. Las dos posturas son perezosas.

## La mitad de internet ya migró y nadie se dio cuenta

Este es el dato que sorprende a todos los ejecutivos a los que se lo muestro. El acuerdo de claves poscuántico pasó del 29 por ciento al 52 por ciento del tráfico HTTPS humano hacia Cloudflare a lo largo de 2025, y superó el 60 por ciento en febrero de 2026. ([Cloudflare, diciembre de 2025](https://blog.cloudflare.com/radar-2025-year-in-review/))

Eso lo hizo tu navegador. No te consultaron.

La brecha está del lado del servidor. A finales de 2025, solo un pequeño porcentaje de los servidores de origen soportaba acuerdo de claves poscuántico. La cifra de tráfico es alta porque un puñado de puertas de entrada muy grandes se actualizó, no porque lo hiciera la cola larga.

Esa asimetría es toda la oportunidad y todo el riesgo. Las partes de tu stack que opera otro se están resolviendo. Las partes que operas tú, no.

## Los estándares son reales, y falta una mitad

Los estándares de encapsulamiento de claves y de firma se finalizaron en agosto de 2024: ML-KEM, ML-DSA y SLH-DSA. ([NIST](https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization)) Un mecanismo de encapsulamiento de claves de respaldo, HQC, fue seleccionado en marzo de 2025, y se espera que su propio estándar llegue después. La guía sobre cómo usar correctamente el encapsulamiento de claves se finalizó en septiembre de 2025. ([NIST SP 800-227](https://csrc.nist.gov/pubs/sp/800/227/final))

La implementación llegó rápido en los lugares que los ingenieros controlan directamente. OpenSSH añadió intercambio de claves poscuántico híbrido en la 9.9 y lo volvió el predeterminado en la 10.0 en abril de 2025, y las versiones posteriores advierten cuando una conexión no es poscuántica. ([notas de versión de OpenSSH](https://www.openssh.com/releasenotes.html)) OpenSSL 3.5 incluyó los nuevos algoritmos ese mismo mes. Signal y Apple pasaron su mensajería a acuerdo de claves poscuántico.

Lo que no ha pasado es la autenticación. Todavía no hay ningún certificado público poscuántico de uso general, y la expectativa sensata es que los primeros certificados aparezcan durante 2026, con confianza amplia de los navegadores más adelante. ([Cloudflare, octubre de 2025](https://blog.cloudflare.com/pq-2025/))

Así que el estado honesto es este: la confidencialidad en tránsito se está resolviendo ahora, la identidad es lo siguiente, y la identidad es más difícil porque involucra a cada autoridad certificadora, a cada dispositivo que valida un certificado y a cada sistema embebido que nadie ha tocado en nueve años.

## Sobre "cosechar ahora, descifrar después"

El argumento estándar para la urgencia es que los adversarios están grabando hoy tráfico cifrado para descifrarlo en cuanto puedan. Es un supuesto razonable. Existen secretos de larga vida, el almacenamiento es barato y los servicios de inteligencia recolectan.

Busqué la evidencia y no encontré un caso público y documentado. Las guías gubernamentales lo plantean como un riesgo que hay que gestionar, no como un incidente que haya que reportar.

Lo digo en las conversaciones con clientes porque el argumento lo resiste. No necesitas una interceptación comprobada para justificar la migración de datos con un requisito de confidencialidad de veinte años. Historias clínicas, archivos legales, documentos de identidad, comunicaciones del Estado, contratos de largo plazo. Si el secreto debe sostenerse hasta 2040, la pregunta no es si alguien está grabando, sino si estarías tranquilo si lo estuvieran haciendo.

Para una confirmación de pago que no vale nada en una hora, la respuesta honesta es que esto no es tu prioridad. Dilo también. La credibilidad en este tema viene de estar dispuesto a decirle a un cliente qué no importa.

## Los reguladores ponen fechas, y las fechas son las que mueven presupuestos

La guía del Reino Unido es el cronograma publicado más claro: descubrimiento y plan de migración para 2028, migración de máxima prioridad para 2031, completa para 2035. Se publicó en marzo de 2025 y se revisó de nuevo este año sin cambios sustanciales. ([NCSC](https://www.ncsc.gov.uk/guidance/pqc-migration-timelines))

La UE emitió una hoja de ruta de implementación coordinada en junio de 2025, tras la recomendación de la Comisión de 2024. ([European Commission](https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography)) La BSI de Alemania exige un despliegue híbrido, clásico y poscuántico juntos, en lugar de un reemplazo directo, y la ANSSI de Francia tiene la misma postura.

Vale la pena entender ese requisito híbrido. Existe porque los nuevos algoritmos son jóvenes, y un defecto en uno de ellos no debería dejarte sin nada. Quien te venda un despliegue puramente poscuántico como algo más moderno te está vendiendo menos seguridad, no más.

En Estados Unidos, el cronograma de obsolescencia propuesto por el NIST sigue siendo un borrador y no una política, una distinción que conviene tener clara cuando alguien te cite 2030 y 2035 como si fueran ley.

## Qué hacer realmente este año

1. **Inventario.** Cada lugar donde usas criptografía, incluidos los que están dentro de productos que compraste. Este es el paso que todos se saltan y el que más tiempo toma. El cronograma del Reino Unido asigna tres años al descubrimiento y la planeación por una razón.
2. **Clasifica por vida útil.** Cuánto tiempo necesita sostenerse cada secreto. Esa sola pregunta ordena todo tu parque tecnológico en urgente, eventual e irrelevante.
3. **Pregúntales a tus proveedores, por escrito, con fecha.** No si soportan criptografía poscuántica. Cuándo, para qué producto, con qué algoritmos, en modo híbrido o no. Las respuestas van a variar enormemente, y esa variación es la información.
4. **Activa lo que es gratis.** Los stacks modernos de SSH y TLS te dan acuerdo de claves híbrido con solo actualizar. Eso es un ticket de mantenimiento, no un proyecto.
5. **Compra agilidad criptográfica, no algoritmos.** Todo lo que adquieras ahora debería permitirte cambiar de algoritmo sin cambiar de producto. Ese es el requisito que sobrevive a lo que sea que se estandarice después.

## El veredicto

No te voy a decir que un computador cuántico va a romper tu cifrado el próximo año. Nadie creíble está diciendo eso.

Lo que sí te digo es que la estimación se movió veinte veces con un solo paper, que tu navegador ya migró, que tus servidores probablemente no, que los reguladores publicaron fechas y que solo el paso de inventario toma años.

Al reloj no le importa si el tema te parece interesante.
`,
  },
};

export default post;
