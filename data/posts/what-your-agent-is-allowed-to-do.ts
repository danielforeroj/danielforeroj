import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'What Your Agent Is Allowed To Do',
  slug: 'what-your-agent-is-allowed-to-do',
  date: '2025-12-18T14:00:00Z',
  excerpt:
    'Everyone is asking what their agent can do. Almost nobody has written down what it may do. Capability arrived first, permission is arriving late, and the order matters.',
  metaDescription:
    'Everyone asks what an agent can do. Few have written down what it may do. Why permission has to be decided before execution, not reviewed afterwards.',
  tags: ['ai', 'agents', 'governance', 'security', 'selah', 'operations'],
  content_md: `
# What Your Agent Is Allowed To Do

## Key Takeaways
- **Capability is not permission.** Tool access answers what an agent can do. Nothing in most stacks answers what it may do.
- **The risk is the action, not the model.** A wrong sentence is embarrassing. A wrong refund is money.
- **Deciding after the fact is not governance, it is a log.** The decision has to happen before the call executes.
- **Prompt injection makes the agent's own reasoning an untrusted input.** Guardrails inside the prompt are advice, not control.
- **Fully autonomous is usually the wrong goal.** The useful goal is autonomy inside declared limits.

---

This was the year agents got hands. Tool calling became standard, the protocol for connecting models to systems consolidated fast, and by December the Model Context Protocol had been donated to a foundation with platinum members from every major cloud and model vendor, roughly 97 million monthly SDK downloads and around ten thousand active servers behind it. ([Model Context Protocol, December 2025](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/))

Connecting a model to a real system went from a project to an afternoon.

What did not arrive at the same speed is the answer to a different question. Not what can this agent reach. What is it allowed to do with what it reaches.

## The two questions are not the same

Capability is a technical property. The agent has a token, an endpoint and a schema. It can send the message, update the record, issue the credit, change the price.

Permission is a business property. Under what conditions, on which accounts, up to what amount, at what hour, by whose authority, with what evidence.

Almost every stack I audit has an excellent answer to the first and no answer at all to the second, or rather, one answer, buried in a prompt, phrased as a polite instruction. Please do not issue refunds over one hundred dollars. Please confirm with a human before contacting a customer.

That is not a control. That is a request made to a system that was designed to be persuadable.

## Why the prompt is the wrong place for the rule

Two reasons, and the second is the one that ends the argument.

The first is that a rule written in a prompt is subject to the same probabilistic process as everything else in the prompt. It usually works. Usually is not a control.

The second is prompt injection. An agent that reads a customer email, a web page, a PDF or a ticket is reading text it did not write and cannot trust. That text reaches the same context window as your instructions. If the agent's own reasoning can be steered by content it retrieved, then any limit that lives inside that reasoning can be steered too.

This is the structural point that changes how you build. The agent's plan is an untrusted artifact. You can use it, you cannot rely on it to enforce anything.

So the enforcement has to sit outside the agent, in the path between deciding and doing, where a policy you wrote evaluates a proposed action and returns a verdict the agent cannot argue with.

## Before, not after

Most of what is sold as AI governance is observability. Traces, logs, dashboards, a record of what the agent did and why. That work is necessary and I am not dismissing it. But a log tells you what happened. It does not prevent it.

If an agent refunds the wrong customer, an excellent trace of the wrong refund is an excellent record of a loss.

The decision has to happen before execution. An agent proposes an action, a policy engine evaluates it against rules that exist outside the model, and returns one of three answers: permit, hold, deny. Permit executes. Deny does not, and says why. Hold goes to a person, with the context needed to decide, and it waits.

That is the shape we built Selah around, and three design choices in it are the ones that survive contact with production.

**It is fail closed.** If the decision engine is unavailable, the action does not happen. The opposite default, allow when the checker is down, means your safety property disappears exactly when your infrastructure is unhealthy, which is the moment it is most needed.

**It is fast enough not to be removed.** A control that adds noticeable latency to every action gets disabled by the first engineer under delivery pressure. The budget is single digit milliseconds, not seconds, and that constraint shapes the whole design.

**Every decision is recorded in a tamper evident log.** Not because an auditor will ask, though they will. Because a permit and a deny are both claims about what your policy said at a moment in time, and those claims need to be checkable later.

## What to write down, concretely

You do not need a product to start. You need a document, and most teams have never written it.

For each agent, and for each tool it can reach:

1. **Actions.** Which specific operations. Not "the CRM", the four operations it may perform in the CRM.
2. **Limits.** Amounts, counts per hour, which record types, which customer segments, which environments.
3. **Conditions.** What must be true first. Identity verified. Balance confirmed. Contract active. Evidence attached.
4. **Escalation.** What goes to a person, who that person is, how fast they must respond, and what happens if they do not. An undefined timeout is a decision nobody made.
5. **Irreversibility.** Which actions cannot be undone. Those get the strictest treatment regardless of how routine they look.

Write it for the agent you already have in production. The exercise takes an afternoon and it tends to be uncomfortable, because the honest answer to several rows is we do not know, and that is precisely the finding.

## The objection, answered

The objection I hear is that this slows the agent down and defeats the purpose.

It does slow some actions down. Deliberately. The alternative is not a faster agent, it is a faster incident.

And it is worth being precise about what governance costs. Reading, summarising, drafting, retrieving, analysing: none of that needs a gate. The gate belongs on the small set of actions that touch money, customers, credentials, production systems or anything you cannot take back. In most workflows that is a minority of the calls and the majority of the risk.

Governance does not make AI less useful. Bad governance, the kind that reviews everything or nothing, makes it unusable.

## Where this goes

Agents will get more capable. Tool ecosystems will keep consolidating. The interesting constraint over the next few years is not what a model can do, it is what an organisation can responsibly let it do, and who can prove it.

Intelligence without control is not intelligence. It is exposure with a good user interface.

## FAQ

- **Is this not what an API key already does?** A key says who is calling. It does not say whether this particular call, on this account, for this amount, right now, is allowed.
- **Can the model not check its own policy?** It can, and it is worth doing as a first filter. It should not be the last word. A system should not be the only judge of whether it is allowed to act.
- **Where do we start?** Take the one action your agent performs that you would not want to explain to a customer. Put a rule in front of that.
`,
  es: {
    title: 'Lo que tu agente tiene permitido hacer',
    excerpt:
      'Todo el mundo pregunta qué puede hacer su agente. Casi nadie ha dejado por escrito qué le está permitido hacer. La capacidad llegó primero, el permiso está llegando tarde, y el orden importa.',
    metaDescription:
      'Todos preguntan qué puede hacer un agente. Pocos han escrito qué le está permitido. Por qué el permiso se decide antes de ejecutar, no se revisa después.',
    tags: ['ai', 'agentes', 'gobernanza', 'seguridad', 'selah', 'operaciones'],
    content_md: `
# Lo que tu agente tiene permitido hacer

## Puntos clave
- **Capacidad no es permiso.** El acceso a herramientas responde qué puede hacer un agente. Nada en la mayoría de los stacks responde qué le está permitido hacer.
- **El riesgo es la acción, no el modelo.** Una frase equivocada da vergüenza. Un reembolso equivocado es dinero.
- **Decidir después de los hechos no es gobernanza, es un log.** La decisión tiene que ocurrir antes de que se ejecute la llamada.
- **El prompt injection convierte el propio razonamiento del agente en un input no confiable.** Las barreras de protección dentro del prompt son consejos, no control.
- **Lo totalmente autónomo suele ser la meta equivocada.** La meta útil es autonomía dentro de límites declarados.

---

Este fue el año en que los agentes consiguieron manos. El tool calling se volvió estándar, el protocolo para conectar modelos con sistemas se consolidó rápido, y para diciembre el Model Context Protocol había sido donado a una fundación con miembros platino de todos los grandes proveedores de nube y de modelos, con cerca de 97 millones de descargas mensuales del SDK y alrededor de diez mil servidores activos detrás. ([Model Context Protocol, diciembre de 2025](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/))

Conectar un modelo a un sistema real pasó de ser un proyecto a ser cosa de una tarde.

Lo que no llegó a la misma velocidad es la respuesta a una pregunta distinta. No a qué puede llegar este agente. Qué tiene permitido hacer con aquello a lo que llega.

## Las dos preguntas no son la misma

La capacidad es una propiedad técnica. El agente tiene un token, un endpoint y un esquema. Puede enviar el mensaje, actualizar el registro, emitir el crédito, cambiar el precio.

El permiso es una propiedad del negocio. Bajo qué condiciones, en qué cuentas, hasta qué monto, a qué hora, con la autoridad de quién, con qué evidencia.

Casi todos los stacks que audito tienen una respuesta excelente para la primera y ninguna respuesta para la segunda, o mejor dicho, una sola respuesta, enterrada en un prompt, redactada como una instrucción amable. Por favor no emitas reembolsos de más de cien dólares. Por favor confirma con un humano antes de contactar a un cliente.

Eso no es un control. Es una petición hecha a un sistema que fue diseñado para dejarse persuadir.

## Por qué el prompt es el lugar equivocado para la regla

Dos razones, y la segunda es la que cierra la discusión.

La primera es que una regla escrita en un prompt está sujeta al mismo proceso probabilístico que todo lo demás en el prompt. Normalmente funciona. Normalmente no es un control.

La segunda es el prompt injection. Un agente que lee el correo de un cliente, una página web, un PDF o un ticket está leyendo texto que no escribió y en el que no puede confiar. Ese texto llega a la misma ventana de contexto que tus instrucciones. Si el propio razonamiento del agente puede ser manipulado por contenido que recuperó, entonces cualquier límite que viva dentro de ese razonamiento también puede ser manipulado.

Este es el punto estructural que cambia cómo construyes. El plan del agente es un artefacto no confiable. Puedes usarlo, pero no puedes depender de él para hacer cumplir nada.

Así que el cumplimiento tiene que estar fuera del agente, en el camino entre decidir y hacer, donde una política que tú escribiste evalúa una acción propuesta y devuelve un veredicto que el agente no puede discutir.

## Antes, no después

La mayor parte de lo que se vende como gobernanza de AI es observabilidad. Trazas, logs, dashboards, un registro de lo que hizo el agente y por qué. Ese trabajo es necesario y no lo estoy descartando. Pero un log te dice lo que pasó. No lo evita.

Si un agente le hace un reembolso al cliente equivocado, una traza excelente del reembolso equivocado es un registro excelente de una pérdida.

La decisión tiene que ocurrir antes de la ejecución. Un agente propone una acción, un motor de políticas la evalúa contra reglas que existen fuera del modelo y devuelve una de tres respuestas: permitir, retener, denegar. Permitir ejecuta. Denegar no, y dice por qué. Retener va a una persona, con el contexto necesario para decidir, y espera.

Esa es la forma alrededor de la cual construimos Selah, y hay tres decisiones de diseño en ella que son las que sobreviven al contacto con producción.

**Falla en cerrado.** Si el motor de decisiones no está disponible, la acción no ocurre. El comportamiento por defecto opuesto, permitir cuando el verificador está caído, significa que tu propiedad de seguridad desaparece justo cuando tu infraestructura no está sana, que es el momento en que más se necesita.

**Es lo bastante rápido como para que no lo quiten.** Un control que agrega una latencia notoria a cada acción termina desactivado por el primer ingeniero con presión de entrega. El presupuesto es de milisegundos de un dígito, no de segundos, y esa restricción define todo el diseño.

**Cada decisión queda registrada en un log que deja evidencia de cualquier manipulación.** No porque un auditor lo vaya a pedir, aunque lo va a pedir. Sino porque tanto un permitir como un denegar son afirmaciones sobre lo que decía tu política en un momento dado, y esas afirmaciones tienen que poder verificarse después.

## Qué dejar por escrito, en concreto

No necesitas un producto para empezar. Necesitas un documento, y la mayoría de los equipos nunca lo ha escrito.

Para cada agente, y para cada herramienta a la que puede llegar:

1. **Acciones.** Qué operaciones específicas. No "el CRM", sino las cuatro operaciones que puede realizar en el CRM.
2. **Límites.** Montos, cantidades por hora, qué tipos de registro, qué segmentos de clientes, qué entornos.
3. **Condiciones.** Qué tiene que ser cierto primero. Identidad verificada. Saldo confirmado. Contrato activo. Evidencia adjunta.
4. **Escalamiento.** Qué va a una persona, quién es esa persona, qué tan rápido debe responder y qué pasa si no responde. Un tiempo límite sin definir es una decisión que nadie tomó.
5. **Irreversibilidad.** Qué acciones no se pueden deshacer. Esas reciben el tratamiento más estricto, sin importar qué tan rutinarias parezcan.

Escríbelo para el agente que ya tienes en producción. El ejercicio toma una tarde y suele ser incómodo, porque la respuesta honesta a varias filas es no sabemos, y ese es precisamente el hallazgo.

## La objeción, respondida

La objeción que escucho es que esto vuelve más lento al agente y le quita el sentido.

Sí vuelve más lentas algunas acciones. A propósito. La alternativa no es un agente más rápido, es un incidente más rápido.

Y vale la pena ser preciso sobre lo que cuesta la gobernanza. Leer, resumir, redactar, recuperar, analizar: nada de eso necesita un punto de control. El punto de control va en el pequeño conjunto de acciones que tocan dinero, clientes, credenciales, sistemas de producción o cualquier cosa que no puedas deshacer. En la mayoría de los flujos de trabajo eso es una minoría de las llamadas y la mayoría del riesgo.

La gobernanza no hace que la AI sea menos útil. La mala gobernanza, la que revisa todo o nada, la vuelve inutilizable.

## Hacia dónde va esto

Los agentes serán más capaces. Los ecosistemas de herramientas se seguirán consolidando. La restricción interesante en los próximos años no es lo que un modelo puede hacer, es lo que una organización puede dejarle hacer de forma responsable, y quién puede demostrarlo.

La inteligencia sin control no es inteligencia. Es exposición con una buena interfaz de usuario.

## Preguntas frecuentes

- **¿Esto no es lo que ya hace una API key?** Una API key dice quién está llamando. No dice si esta llamada en particular, en esta cuenta, por este monto, en este momento, está permitida.
- **¿El modelo no puede revisar su propia política?** Puede, y vale la pena hacerlo como primer filtro. No debería tener la última palabra. Un sistema no debería ser el único juez de si tiene permitido actuar.
- **¿Por dónde empezamos?** Toma la única acción que realiza tu agente y que no querrías tener que explicarle a un cliente. Ponle una regla por delante.
`,
  },
};

export default post;
