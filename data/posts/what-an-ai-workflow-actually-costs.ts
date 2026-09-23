import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'What An AI Workflow Actually Costs',
  slug: 'what-an-ai-workflow-actually-costs',
  date: '2026-05-26T14:00:00Z',
  excerpt:
    'Per-token pricing tells you almost nothing about what a workflow costs to run. The cost lives in tokens you did not plan for: retries, reasoning, context you resend, and agents talking to agents.',
  metaDescription:
    'Token prices tell you little about what an AI workflow costs. Where the cost actually lives, what caching and batching change, and how to budget per task.',
  tags: ['ai', 'cost', 'unit-economics', 'agents', 'operations', 'infrastructure'],
  content_md: `
# What An AI Workflow Actually Costs

## Key Takeaways
- **Budget per task, not per token.** Nobody sells a customer a million tokens.
- **The expensive tokens are the ones you did not write.** Reasoning, retries, resent context, agents talking to agents.
- **Caching and batching are the two largest levers, and both are structural.** They change how you design the workflow, not just a config value.
- **Prices fall, and they fall unevenly.** Design so that swapping a model is a routing decision, not a rewrite.
- **The cheapest workflow is the one that does not run.** Filtering before inference beats optimising inference.

---

The question I get from founders is always the same. What does this cost to run. The answer they expect is a price per million tokens. That number is real, and it tells you almost nothing.

It is like pricing a delivery business by the litre of fuel. Correct, and useless for deciding whether the route makes money.

## Where the cost actually is

Four categories, roughly in order of how often they surprise people.

**Reasoning tokens.** Models that think before answering bill that thinking at output rates, and you do not get to read it. OpenAI's own guidance tells developers to reserve around 25,000 tokens for reasoning and output when sizing a request. ([OpenAI](https://developers.openai.com/api/docs/guides/reasoning)) A prompt of 400 words can generate a bill dominated by text nobody will ever see.

**Multiplication by architecture.** Agents use several times more tokens than a chat turn, and multi-agent systems are roughly an order of magnitude beyond that. Anthropic put the multipliers at about 4x for agents and about 15x for multi-agent, and found token usage alone explained 80 percent of performance variance in their research system. ([Anthropic, June 2025](https://www.anthropic.com/engineering/multi-agent-research-system)) Read that twice. Most of the quality gain people attribute to clever orchestration is bought with tokens.

**Resent context.** Every turn of a long conversation resends the history. A twenty turn support thread does not cost twenty units, it costs something closer to the sum of a growing prefix, unless you cache.

**Retries and fallbacks.** Measured on production traffic through a gateway, 3.5 percent of requests completed only after a fallback to another model, but those requests carried 5.1 percent of tokens and 4.9 percent of cost. Failures concentrate in long context agent calls, which are the expensive ones. ([Vercel, May 2026](https://vercel.com/blog/ai-gateway-production-index))

## The two levers that matter

**Caching.** On Anthropic's pricing, writing to the cache costs 1.25x base input for the short lived tier and 2x for the longer one, while a cache read costs 0.1x. That means you are ahead after a single read at the short tier, and after two at the long one. ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)) OpenAI prices cached input at a tenth of uncached for its current models, with a minimum cacheable prefix. ([OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching))

The design consequence is what matters. Caching rewards a stable prefix. If your system prompt, tool definitions and company context sit at the front and do not change, you pay full price once. If you interpolate a timestamp or a customer name into the top of the prompt, you invalidate everything behind it and pay full price every call. I have watched a team cut cost by a quarter by moving two lines of a prompt.

**Batching.** Fifty percent off at the major providers for work that can wait. Enrichment, classification, summarising yesterday, scoring a backlog. Anthropic lets batching stack with caching. ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing))

Most workflows that people build as real time are not real time. Nobody needs a lead scored in 900 milliseconds. Somebody decided it felt better.

## Budget per task

Take the workflow, estimate tokens for one complete task including retries, multiply by price, then divide the monthly cost by the number of tasks. That number is the one you can put in a business case, next to what the task costs when a person does it.

For engineering work there is now a public reference point. Anthropic documents enterprise Claude Code usage at around 13 dollars per developer per active day, and 150 to 250 dollars per developer per month, with 90 percent of users under 30 dollars per active day. ([Anthropic](https://code.claude.com/docs/en/costs))

Two things about that number. It is small against a salary. And it is highly variable, which is why the useful control is not a lower price, it is a ceiling per task and an alert when it moves.

## Cheap tokens are not the same as cheap answers

The instinct, when a bill arrives, is to move everything to a smaller model. Sometimes that works. Sometimes the smaller model needs three attempts, a longer prompt, and a repair step, and you have spent more to get a worse answer more slowly.

The pattern that has held up for us is boring and effective:

1. **Filter before inference.** Rules and code first. The cheapest call is the one you do not make, and a surprising share of items in any queue can be routed without a model at all.
2. **Route by consequence.** Small model for classification and extraction, large model for the judgement call, human for the irreversible one.
3. **Cache the stable, batch the patient.**
4. **Cap the loop.** Every agent gets a maximum number of steps and a budget. An agent without a ceiling will happily spend your month on one stubborn task.
5. **Measure cost per successful task**, not per call. A cheap call that fails is not cheap.

## Prices move, so do not marry a model

Inference prices have been falling fast and unevenly. Epoch AI's analysis puts the rate of decline at anywhere from 9x to 900x per year depending on the task, and around 40x per year for GPT-4 level performance on hard science questions. ([Epoch AI, March 2025](https://epoch.ai/data-insights/llm-inference-price-trends)) That study is dated now, which is itself the point: any number I quote here has a shelf life.

What follows from that is architectural. Keep the model behind an interface. Keep prompts in data, not scattered through code. Keep an eval suite that can tell you whether a swap is actually an upgrade, because the cheap new model that looks equivalent on the vendor's benchmark may not be equivalent on your work.

## What this looks like when it is done right

A workflow with a known cost per task, a ceiling, an alert, and a routing table. A prefix that stays stable so the cache earns its keep. A batch job for everything that can wait until tonight. A hard limit on agent steps. And a number you can say out loud to a client: this costs us X per case, they were paying Y, here is the difference.

That last sentence is the whole business case. Everything above it is plumbing.
`,
  es: {
    title: 'Lo que realmente cuesta un flujo de trabajo con AI',
    excerpt:
      'El precio por token casi no te dice nada sobre lo que cuesta operar un flujo de trabajo. El costo está en los tokens que no planeaste: reintentos, razonamiento, contexto que vuelves a enviar y agentes hablando con agentes.',
    metaDescription:
      'El precio por token dice poco del costo de un flujo con AI. Dónde está el costo real, qué cambian el caché y los lotes, y cómo presupuestar por tarea.',
    tags: ['ai', 'costos', 'economía-unitaria', 'agentes', 'operaciones', 'infraestructura'],
    content_md: `
# Lo que realmente cuesta un flujo de trabajo con AI

## Puntos clave
- **Presupuesta por tarea, no por token.** Nadie le vende a un cliente un millón de tokens.
- **Los tokens caros son los que tú no escribiste.** Razonamiento, reintentos, contexto reenviado, agentes hablando con agentes.
- **El caché y el procesamiento por lotes son las dos palancas más grandes, y ambas son estructurales.** Cambian cómo diseñas el flujo de trabajo, no solo un valor de configuración.
- **Los precios bajan, y bajan de forma desigual.** Diseña para que cambiar de modelo sea una decisión de enrutamiento, no una reescritura.
- **El flujo de trabajo más barato es el que no corre.** Filtrar antes de la inferencia le gana a optimizar la inferencia.

---

La pregunta que me hacen los fundadores siempre es la misma. Cuánto cuesta operar esto. La respuesta que esperan es un precio por millón de tokens. Ese número es real, y casi no te dice nada.

Es como ponerle precio a un negocio de domicilios por litro de combustible. Correcto, e inútil para decidir si la ruta deja plata.

## Dónde está realmente el costo

Cuatro categorías, más o menos en orden de qué tan seguido sorprenden a la gente.

**Tokens de razonamiento.** Los modelos que piensan antes de responder cobran ese pensamiento a tarifa de salida, y tú no puedes leerlo. La propia guía de OpenAI les dice a los desarrolladores que reserven alrededor de 25,000 tokens para razonamiento y salida al dimensionar una solicitud. ([OpenAI](https://developers.openai.com/api/docs/guides/reasoning)) Un prompt de 400 palabras puede generar una factura dominada por texto que nadie va a ver nunca.

**Multiplicación por arquitectura.** Los agentes usan varias veces más tokens que un turno de chat, y los sistemas multiagente están más o menos un orden de magnitud por encima de eso. Anthropic calculó los multiplicadores en cerca de 4x para agentes y cerca de 15x para multiagente, y encontró que el uso de tokens por sí solo explicaba el 80 por ciento de la variación en desempeño de su sistema de investigación. ([Anthropic, junio de 2025](https://www.anthropic.com/engineering/multi-agent-research-system)) Léelo dos veces. La mayor parte de la ganancia en calidad que la gente le atribuye a una orquestación ingeniosa se compra con tokens.

**Contexto reenviado.** Cada turno de una conversación larga reenvía el historial. Un hilo de soporte de veinte turnos no cuesta veinte unidades, cuesta algo más cercano a la suma de un prefijo que crece, a menos que uses caché.

**Reintentos y modelos de respaldo.** Medido sobre tráfico de producción a través de un gateway, el 3.5 por ciento de las solicitudes se completó solo después de pasar a otro modelo de respaldo, pero esas solicitudes cargaron el 5.1 por ciento de los tokens y el 4.9 por ciento del costo. Las fallas se concentran en llamadas de agentes con contexto largo, que son las caras. ([Vercel, mayo de 2026](https://vercel.com/blog/ai-gateway-production-index))

## Las dos palancas que importan

**Caché.** Con los precios de Anthropic, escribir en el caché cuesta 1.25x la entrada base en el nivel de corta duración y 2x en el más largo, mientras que una lectura del caché cuesta 0.1x. Eso significa que sales ganando después de una sola lectura en el nivel corto, y después de dos en el largo. ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)) OpenAI cobra la entrada en caché a una décima parte de la que no está en caché para sus modelos actuales, con un prefijo mínimo cacheable. ([OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching))

La consecuencia de diseño es lo que importa. El caché premia un prefijo estable. Si tu system prompt, tus definiciones de herramientas y el contexto de tu empresa van al principio y no cambian, pagas precio completo una vez. Si interpolas una marca de tiempo o el nombre de un cliente en la parte de arriba del prompt, invalidas todo lo que viene detrás y pagas precio completo en cada llamada. He visto a un equipo reducir el costo en una cuarta parte moviendo dos líneas de un prompt.

**Procesamiento por lotes.** Cincuenta por ciento de descuento en los principales proveedores para el trabajo que puede esperar. Enriquecimiento, clasificación, resumir lo de ayer, calificar un backlog. Anthropic permite combinar el procesamiento por lotes con el caché. ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing))

La mayoría de los flujos de trabajo que la gente construye en tiempo real no necesitan ser en tiempo real. Nadie necesita un lead calificado en 900 milisegundos. Alguien decidió que se sentía mejor.

## Presupuesta por tarea

Toma el flujo de trabajo, estima los tokens de una tarea completa incluyendo reintentos, multiplica por el precio y luego divide el costo mensual entre el número de tareas. Ese es el número que puedes poner en un caso de negocio, al lado de lo que cuesta la tarea cuando la hace una persona.

Para el trabajo de ingeniería ya hay un punto de referencia público. Anthropic documenta el uso empresarial de Claude Code en alrededor de 13 dólares por desarrollador por día activo, y de 150 a 250 dólares por desarrollador al mes, con el 90 por ciento de los usuarios por debajo de 30 dólares por día activo. ([Anthropic](https://code.claude.com/docs/en/costs))

Dos cosas sobre ese número. Es pequeño frente a un salario. Y es muy variable, por eso el control útil no es un precio más bajo, es un techo por tarea y una alerta cuando se mueve.

## Tokens baratos no son lo mismo que respuestas baratas

El instinto, cuando llega una factura, es pasar todo a un modelo más pequeño. A veces funciona. A veces el modelo más pequeño necesita tres intentos, un prompt más largo y un paso de corrección, y terminaste gastando más para obtener una respuesta peor, y más lento.

El patrón que nos ha funcionado es aburrido y efectivo:

1. **Filtra antes de la inferencia.** Primero reglas y código. La llamada más barata es la que no haces, y una proporción sorprendente de los elementos de cualquier cola se puede enrutar sin ningún modelo.
2. **Enruta según la consecuencia.** Modelo pequeño para clasificación y extracción, modelo grande para la decisión de criterio, humano para la irreversible.
3. **Guarda en caché lo estable, manda por lotes lo que puede esperar.**
4. **Ponle tope al ciclo.** Cada agente recibe un número máximo de pasos y un presupuesto. Un agente sin techo va a gastarse feliz tu mes en una sola tarea terca.
5. **Mide el costo por tarea exitosa**, no por llamada. Una llamada barata que falla no es barata.

## Los precios se mueven, así que no te cases con un modelo

Los precios de inferencia han bajado rápido y de forma desigual. El análisis de Epoch AI ubica la tasa de caída entre 9x y 900x por año según la tarea, y alrededor de 40x por año para un desempeño nivel GPT-4 en preguntas difíciles de ciencia. ([Epoch AI, marzo de 2025](https://epoch.ai/data-insights/llm-inference-price-trends)) Ese estudio ya está desactualizado, y justamente ese es el punto: cualquier número que cite aquí tiene fecha de vencimiento.

Lo que se desprende de eso es arquitectónico. Mantén el modelo detrás de una interfaz. Mantén los prompts en datos, no regados por el código. Mantén una suite de evals que te pueda decir si un cambio de modelo es realmente una mejora, porque el modelo nuevo y barato que parece equivalente en el benchmark del proveedor puede no ser equivalente en tu trabajo.

## Cómo se ve esto cuando está bien hecho

Un flujo de trabajo con un costo conocido por tarea, un techo, una alerta y una tabla de enrutamiento. Un prefijo que se mantiene estable para que el caché se pague solo. Un proceso por lotes para todo lo que puede esperar hasta la noche. Un límite estricto de pasos por agente. Y un número que le puedes decir en voz alta a un cliente: esto nos cuesta X por caso, ellos pagaban Y, esta es la diferencia.

Esa última frase es todo el caso de negocio. Todo lo que está arriba es plomería.
`,
  },
};

export default post;
