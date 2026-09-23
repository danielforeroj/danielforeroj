import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Your AI Does Not Know Your Company',
  slug: 'your-ai-does-not-know-your-company',
  date: '2026-01-28T14:00:00Z',
  excerpt:
    'The model is not the bottleneck. The context is. Most companies ask a general assistant a question only their own systems can answer, and then blame the model for guessing.',
  metaDescription:
    'The model is not the bottleneck, the context is. Why company questions need a context layer, what breaks without one, and how to build it in the right order.',
  tags: ['ai', 'context', 'data', 'agents', 'operations', 'enterprise'],
  content_md: `
# Your AI Does Not Know Your Company

## Key Takeaways
- **A general assistant knows the world. It does not know your customer.** That gap is not a model problem, it is a context problem.
- **Bad context does not produce silence, it produces confident answers.** The failure mode is a plausible sentence, not an error message.
- **Retrieval is not one thing.** Keyword search still beats embeddings on real enterprise corpora, and the winning setups use both.
- **Identity resolution is the unglamorous core.** One customer across four systems that disagree is the actual problem.
- **Build the context layer first, then agents.** Agents inherit whatever the context layer gets wrong, and act on it.

---

Every week someone shows me an assistant that answers questions about their business. Then I ask it something only their business can answer. How much does this client owe us, what did we promise them in October, why did this account stop buying.

The demo ends there, or worse, it does not. It answers anyway.

That is the part most people miss. When a model lacks context it does not stop. It produces a fluent, structurally correct, entirely invented answer. Grounding is what changes that behaviour, and grounding is work you do, not a setting you enable.

## The evidence is boring and consistent

Salesforce surveyed data leaders at the end of 2025 and found that 26 percent of an organization's data is considered untrustworthy, and that 70 percent of respondents believe their most valuable insights sit in data they cannot access. ([Salesforce, November 2025](https://www.salesforce.com/news/stories/data-analytics-trends-2026/))

Informatica's 2026 survey of 600 data leaders put the same thing more bluntly: 57 percent named data reliability as the top barrier to moving AI from pilot to production, and roughly half called it the primary blocker for agentic AI specifically. Sixty nine percent already have generative AI in production. Seventy six percent say governance is behind how employees already use it. ([Informatica, January 2026](https://www.informatica.com/about-us/news/news-releases/2026/01/20260127-new-global-cdo-report-reveals-data-governance-and-ai-literacy-as-key-accelerators-in-ai-adoption.html))

Read those two together. Production is not the hard part any more. Trust is.

And it is not only enterprise anxiety. Stanford researchers tested legal research tools that are built on retrieval, over a preregistered set of queries, and still measured hallucination rates of 17 percent and 33 percent depending on the product. ([Stanford RegLab](https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/)) These are products sold specifically on being grounded. Grounding reduces invention. It does not delete it.

## What a context layer actually is

Not a chatbot. Not a vector database. Not a dashboard with a text box on top.

A context layer is the thing that reads the systems a company already runs, resolves them into one record per subject, keeps what matters with where it came from, and hands that out as context to whatever is about to answer or act.

Three properties make it real:

1. **It indexes what already exists.** No migration. If the answer requires the client to reorganise their business first, the project dies in month two.
2. **It separates observed from inferred.** What a customer said is not the same as what a model concluded about them. A conclusion with no evidence behind it should be refused at the moment it is created, not caught later.
3. **It serves bounded, cited context.** The block that goes to the model says what it contains and what it left out. That is the part nobody else in the category wants to answer, and it is the part that makes the output auditable.

We built On Duty around exactly that shape, and the design constraint that mattered most was agnosticism. A business will not have one AI. It will have the assistant its team already pays for, the one embedded in a tool it bought, something a developer wired up, and whatever it adopts next year. Each of those knows a different slice and none of them knows the customer. The context layer sits underneath all of them.

## Identity is the real problem

Here is the test I use. Take a customer who wrote to support on WhatsApp, paid an invoice, appears in the CRM under a slightly different company name, and has a contract in a shared drive. Ask the system to tell you about that customer.

If it returns four different people, you do not have a context problem, you have an identity problem, and every AI feature you build on top of it will inherit that.

The research on entity resolution is honest about the difficulty: across benchmarks from hundreds of records to five million, no single matching algorithm wins everywhere, precision and recall need separate mechanisms, and one false positive can silently merge two unrelated companies into one entity through transitive closure. ([arXiv, July 2026](https://arxiv.org/abs/2607.26298))

That last failure is the dangerous one. A missed match looks like missing data. A wrong match looks like an answer.

## Retrieval is not solved, and it is not one technique

The industry spent two years assuming embeddings were the answer. Then people measured on real corpora.

A benchmark built on around half a million documents in real formats, Slack, Gmail, Drive, tickets, code, found plain keyword search reaching 68.8 percent correctness against 51.4 percent for dense vector search, and vector search dropping to 32.8 percent on semantic questions. ([EnterpriseRAG-Bench, May 2026](https://arxiv.org/abs/2605.05253))

Keyword search is not fashionable. It is very good at names, invoice numbers, product codes and acronyms, which is most of what anyone actually asks a business system.

More context is also not automatically better. Anthropic's engineering team describes context rot, where recall degrades as the context window fills, and recommends passing identifiers and retrieving just in time rather than dumping everything in. ([Anthropic, September 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents))

## The order that works

- **Inventory first.** List the systems where customer truth actually lives. It is usually more than the client thinks and includes at least one spreadsheet nobody admits to.
- **Resolve identity second.** One record per customer, with the conflicts surfaced rather than averaged away.
- **Then answering.** A question box over a resolved record, with citations, before anything writes to a system.
- **Then action.** And when something is about to act on a customer, a decision runs first. That is a different post, and the reason Selah exists.

Most teams run this backwards. They buy the agent, then discover the agent needs context, then discover the context needs identity, then discover identity needs the data work nobody funded.

## The uncomfortable summary

If a model gets your business wrong, the honest question is not which model you are using. It is whether anything in your stack could have told it the right answer.

Usually the answer is no. The information existed. It was in four systems, under three spellings, with no one responsible for reconciling them. The model did not hallucinate your company. It described the version of your company your systems describe.

## FAQ

- **Is this just RAG?** Retrieval is one mechanism inside it. A context layer also owns identity, provenance and what gets refused, which retrieval alone does not.
- **Do we need it if we only use ChatGPT internally?** More, not less. A general assistant with no grounded context is exactly the configuration that invents confidently.
- **How long does it take?** The indexing is fast. The identity work takes as long as your worst system, and that is the honest estimate to give your board.
`,
  es: {
    title: 'Tu AI no conoce tu empresa',
    excerpt:
      'El cuello de botella no es el modelo. Es el contexto. La mayoría de las empresas le hacen a un asistente general una pregunta que solo sus propios sistemas pueden responder, y luego culpan al modelo por adivinar.',
    metaDescription:
      'El cuello de botella no es el modelo, es el contexto. Por qué tu empresa necesita una capa de contexto, qué se rompe sin ella y en qué orden construirla.',
    tags: ['ai', 'contexto', 'datos', 'agentes', 'operaciones', 'empresas'],
    content_md: `
# Tu AI no conoce tu empresa

## Puntos clave
- **Un asistente general conoce el mundo. No conoce a tu cliente.** Esa brecha no es un problema del modelo, es un problema de contexto.
- **Un mal contexto no produce silencio, produce respuestas seguras.** El modo de falla es una frase plausible, no un mensaje de error.
- **La recuperación no es una sola cosa.** La búsqueda por palabras clave todavía le gana a los embeddings en corpus empresariales reales, y las configuraciones ganadoras usan ambas.
- **La resolución de identidad es el núcleo poco glamoroso.** Un mismo cliente en cuatro sistemas que no coinciden entre sí es el problema real.
- **Primero construye la capa de contexto, después los agentes.** Los agentes heredan todo lo que la capa de contexto tenga mal, y actúan con base en eso.

---

Cada semana alguien me muestra un asistente que responde preguntas sobre su negocio. Entonces le pregunto algo que solo su negocio puede responder. Cuánto nos debe este cliente, qué le prometimos en octubre, por qué esta cuenta dejó de comprar.

Ahí termina la demo, o peor, no termina. Responde de todas formas.

Esa es la parte que la mayoría no ve. Cuando a un modelo le falta contexto, no se detiene. Produce una respuesta fluida, estructuralmente correcta y completamente inventada. El grounding es lo que cambia ese comportamiento, y el grounding es trabajo que tú haces, no una opción que activas.

## La evidencia es aburrida y consistente

Salesforce encuestó a líderes de datos a finales de 2025 y encontró que el 26 por ciento de los datos de una organización se considera poco confiable, y que el 70 por ciento de los encuestados cree que sus insights más valiosos están en datos a los que no pueden acceder. ([Salesforce, noviembre de 2025](https://www.salesforce.com/news/stories/data-analytics-trends-2026/))

La encuesta 2026 de Informatica a 600 líderes de datos lo dijo de forma más directa: el 57 por ciento señaló la confiabilidad de los datos como la principal barrera para llevar la AI de piloto a producción, y cerca de la mitad la señaló como el principal obstáculo específicamente para la AI agéntica. El sesenta y nueve por ciento ya tiene AI generativa en producción. El setenta y seis por ciento dice que la gobernanza va por detrás de cómo los empleados ya la usan. ([Informatica, enero de 2026](https://www.informatica.com/about-us/news/news-releases/2026/01/20260127-new-global-cdo-report-reveals-data-governance-and-ai-literacy-as-key-accelerators-in-ai-adoption.html))

Lee esas dos juntas. La producción ya no es la parte difícil. La confianza sí.

Y no es solo ansiedad de las grandes empresas. Investigadores de Stanford probaron herramientas de investigación jurídica construidas sobre recuperación, con un conjunto de consultas preregistrado, y aun así midieron tasas de alucinación del 17 y el 33 por ciento según el producto. ([Stanford RegLab](https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/)) Son productos que se venden precisamente por estar anclados en fuentes. El grounding reduce la invención. No la elimina.

## Qué es realmente una capa de contexto

No es un chatbot. No es una base de datos vectorial. No es un dashboard con una caja de texto encima.

Una capa de contexto es lo que lee los sistemas que una empresa ya opera, los resuelve en un solo registro por sujeto, guarda lo que importa junto con su origen, y entrega eso como contexto a lo que sea que esté a punto de responder o actuar.

Tres propiedades la hacen real:

1. **Indexa lo que ya existe.** Sin migración. Si la solución exige que el cliente primero reorganice su negocio, el proyecto muere en el segundo mes.
2. **Separa lo observado de lo inferido.** Lo que dijo un cliente no es lo mismo que lo que un modelo concluyó sobre él. Una conclusión sin evidencia detrás debe rechazarse en el momento en que se crea, no detectarse después.
3. **Entrega contexto acotado y citado.** El bloque que va al modelo dice qué contiene y qué dejó por fuera. Esa es la parte que nadie más en la categoría quiere responder, y es la parte que hace que el resultado sea auditable.

Construimos On Duty exactamente con esa forma, y la restricción de diseño que más importó fue el agnosticismo. Una empresa no va a tener una sola AI. Va a tener el asistente por el que su equipo ya paga, el que viene integrado en una herramienta que compró, algo que conectó un desarrollador y lo que sea que adopte el próximo año. Cada uno conoce una porción distinta y ninguno conoce al cliente. La capa de contexto está por debajo de todos.

## La identidad es el problema real

Esta es la prueba que uso. Toma un cliente que le escribió a soporte por WhatsApp, pagó una factura, aparece en el CRM con un nombre de empresa ligeramente distinto y tiene un contrato en una carpeta compartida. Pídele al sistema que te hable de ese cliente.

Si te devuelve cuatro personas distintas, no tienes un problema de contexto, tienes un problema de identidad, y cada funcionalidad de AI que construyas encima lo va a heredar.

La investigación sobre resolución de entidades es honesta sobre la dificultad: en benchmarks que van de cientos de registros a cinco millones, ningún algoritmo de matching gana en todos los casos, la precisión y el recall necesitan mecanismos separados, y un solo falso positivo puede fusionar en silencio dos empresas sin relación en una sola entidad por clausura transitiva. ([arXiv, julio de 2026](https://arxiv.org/abs/2607.26298))

Esa última falla es la peligrosa. Una coincidencia que no se detecta parece un dato faltante. Una coincidencia equivocada parece una respuesta.

## La recuperación no está resuelta, y no es una sola técnica

La industria pasó dos años asumiendo que los embeddings eran la respuesta. Luego la gente midió en corpus reales.

Un benchmark construido sobre cerca de medio millón de documentos en formatos reales, Slack, Gmail, Drive, tickets, código, encontró que la búsqueda simple por palabras clave alcanzaba 68.8 por ciento de acierto frente a 51.4 por ciento de la búsqueda vectorial densa, y que la búsqueda vectorial caía a 32.8 por ciento en preguntas semánticas. ([EnterpriseRAG-Bench, mayo de 2026](https://arxiv.org/abs/2605.05253))

La búsqueda por palabras clave no está de moda. Es muy buena con nombres, números de factura, códigos de producto y siglas, que es la mayor parte de lo que cualquiera le pregunta en realidad a un sistema de negocio.

Más contexto tampoco es automáticamente mejor. El equipo de ingeniería de Anthropic describe el context rot, en el que el recall se degrada a medida que se llena la ventana de contexto, y recomienda pasar identificadores y recuperar justo a tiempo en lugar de meterlo todo. ([Anthropic, septiembre de 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents))

## El orden que funciona

- **Primero, el inventario.** Haz la lista de los sistemas donde realmente vive la verdad sobre tus clientes. Normalmente son más de los que el cliente cree e incluyen por lo menos una hoja de cálculo que nadie admite tener.
- **Segundo, resolver la identidad.** Un registro por cliente, con los conflictos a la vista en lugar de promediados.
- **Después, responder.** Una caja de preguntas sobre un registro resuelto, con citas, antes de que cualquier cosa escriba en un sistema.
- **Después, actuar.** Y cuando algo esté a punto de actuar sobre un cliente, primero corre una decisión. Ese es otro post, y la razón por la que existe Selah.

La mayoría de los equipos lo hace al revés. Compran el agente, luego descubren que el agente necesita contexto, luego descubren que el contexto necesita identidad, luego descubren que la identidad necesita el trabajo de datos que nadie financió.

## El resumen incómodo

Si un modelo se equivoca sobre tu negocio, la pregunta honesta no es qué modelo estás usando. Es si algo en tu stack le podría haber dado la respuesta correcta.

Normalmente la respuesta es no. La información existía. Estaba en cuatro sistemas, escrita de tres formas distintas, sin nadie responsable de conciliarlas. El modelo no alucinó tu empresa. Describió la versión de tu empresa que describen tus sistemas.

## Preguntas frecuentes

- **¿Esto no es solo RAG?** La recuperación es un mecanismo dentro de ella. Una capa de contexto también se encarga de la identidad, la procedencia y lo que se rechaza, cosa que la recuperación sola no hace.
- **¿La necesitamos si solo usamos ChatGPT internamente?** Más, no menos. Un asistente general sin contexto anclado es exactamente la configuración que inventa con total seguridad.
- **¿Cuánto tiempo toma?** La indexación es rápida. El trabajo de identidad toma lo que tome tu peor sistema, y esa es la estimación honesta que debes darle a tu junta directiva.
`,
  },
};

export default post;
