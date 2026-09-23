import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Human In The Loop Is Not A Strategy',
  slug: 'human-in-the-loop-is-not-a-strategy',
  date: '2026-07-28T14:00:00Z',
  excerpt:
    'Put a human in the loop is the answer every executive gives and almost nobody designs. The measured approval rates say what is actually happening: people click yes.',
  metaDescription:
    'Put a human in the loop is the answer nobody designs. What approval data shows about rubber-stamping, and how to build oversight that actually catches things.',
  tags: ['ai', 'agents', 'governance', 'human-oversight', 'compliance', 'operations'],
  content_md: `
# Human In The Loop Is Not A Strategy

## Key Takeaways
- **Approval is not review.** Measured approval rates sit above 90 percent, and attention decays within a single session.
- **A person who approves everything has been converted into a liability shield.**
- **Oversight only works when it is rare, contextual and accountable.** Volume is the enemy.
- **Regulators are about to require it in Europe**, which will produce a wave of oversight that exists on paper.
- **Design the escalation, not the checkbox.** Who, how fast, with what context, and what happens when they are unavailable.

---

Every conversation about AI risk ends in the same sentence. We will keep a human in the loop.

It sounds like a control. Most of the time it is a sentence that lets a meeting end.

I have asked the follow up questions in enough rooms to know how it goes. Which human. Reviewing what exactly. With what information in front of them. How many of these per day. What is their response time. What happens at two in the morning. What happens when they are on holiday. What happens when they disagree with the agent.

The answers run out quickly, usually at question two.

## The measured version of what actually happens

This is no longer a matter of opinion. There is data, and it is uncomfortable.

Anthropic published usage figures for its coding agent showing that developers approve around 93 percent of permission prompts. ([Anthropic, March 2026](https://anthropic.com/engineering/claude-code-auto-mode))

Ninety three percent. These are technical users, reviewing actions in their own environment, on a system they chose, with the context right in front of them. That is the best case for human review and it is already close to a formality.

Attention also decays inside a single session. Anthropic's work on measuring agent autonomy found that new users turn on full auto approval in around 20 percent of sessions, while experienced users do it in over 40 percent, and that about 0.8 percent of agent actions are irreversible. ([Anthropic, February 2026](https://www.anthropic.com/research/measuring-agent-autonomy))

Two things follow. First, the people closest to the system trust it more over time, which is rational and also the mechanism by which oversight quietly disappears. Second, a small fraction of actions cannot be undone, which is exactly where review is worth something and exactly where it is least likely to be applied, because those actions look like all the others in the queue.

I will name the obvious caveat: a model vendor has a commercial interest in the conclusion that human approval is theatre. Weigh it accordingly. But the direction matches what anyone who has watched an approval queue already knows.

## Mandated oversight does not mean actual oversight

If you want evidence that a legal requirement is not a control, look at what happened with New York City's hiring algorithm law.

Researchers checked 391 employers subject to it. Eighteen had posted the required audit report. Thirteen had posted the required transparency notice. That is 4.6 percent and 3.3 percent, with enforcement already in effect. ([FAccT 2024](https://arxiv.org/abs/2406.01399))

The law existed. The oversight did not.

Now consider what is about to happen in Europe. The AI Act's high risk obligations, including Article 14 on human oversight, apply from 2 August 2026. The text requires systems to be designed so that they can be effectively overseen by natural persons, and requires those persons to have the competence, training and authority to intervene. ([EU AI Act, Article 14](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689))

Competence, training and authority. Read that against a 93 percent approval rate and you can predict the next two years: a large amount of documented oversight that does not oversee anything, and a smaller amount of real design work by teams that took it seriously.

The same pattern is coming to the United States by a different route. Colorado repealed and reenacted its AI act in May 2026, with obligations starting in January 2027 and a right for a consumer to request meaningful human review and reconsideration of a consequential decision. ([Colorado SB 26-189](https://leg.colorado.gov/bills/sb26-189)) Meaningful is doing a lot of work in that sentence, and it will be litigated.

## Why volume destroys oversight

The mechanism is simple and it is not about lazy people.

If a reviewer sees fifty requests an hour and 49 of them are fine, the rational strategy is to approve quickly. The cost of scrutinising everything is real and immediate. The cost of missing something is rare and deferred. Any system that produces high volume, low variance approval requests will train its reviewers into rubber stamps, and the better the agent gets, the faster that happens.

Which leads to the counterintuitive design rule: **fewer approvals produce better oversight.**

If you want a human decision to mean something, it has to be rare enough to deserve attention, and it has to arrive with enough context that thinking is possible.

## How to design it so it is not theatre

1. **Gate by consequence, not by category.** Do not review every message. Review every refund above a threshold, every credential change, every deletion, every first contact with a regulated customer. Most actions should never reach a person.
2. **Make hold a real state.** Permit, hold, deny. A hold has an owner, a deadline and a default. If nobody responds within the window, the action does not execute. A timeout that silently approves is not oversight, it is a delay.
3. **Give the reviewer the evidence, not the request.** What the agent proposes, why, what it read, what it left out, what it is uncertain about, and what happens if it is wrong. If the screen only shows an action and two buttons, you have built a lottery.
4. **Name the person, not the team.** Queues owned by everyone are owned by no one. Assign, with a backup, with hours.
5. **Measure the reviewers.** Approval rate, time spent, and how often review changed the outcome. If a queue runs at 99 percent approval, either the gate is set wrong or the review is not happening. Both are findings.
6. **Let them say no without friction.** If rejecting means writing a justification and defending it in a meeting, you have priced rejection out of the market.

## Human in the loop versus human on the loop

They are different and the distinction matters when you write a policy.

**In the loop** means the action waits for a person. It is correct for irreversible, high value, low volume actions. It costs latency and it consumes attention, so spend it deliberately.

**On the loop** means the action proceeds and a person monitors, samples and can stop the system. It is correct for high volume, reversible actions where waiting would break the workflow. It requires something people rarely build: an actual stop button, that someone is authorised to press, without a meeting.

Most organisations claim the first and operate the second. The gap between the claim and the operation is where the incident happens.

## The part I will keep repeating

Human in the loop is not a strategy unless you can name who, what they review, how fast they respond, and what happens when they are unavailable. Until those four answers exist, the phrase is not a safeguard, it is an assignment of blame that has not happened yet.

And if the honest answer is that nobody can review this at the volume it runs, then the correct response is not to add an approval screen. It is to write the policy that decides the routine cases without a person, so the person is only spending attention where it changes the outcome.
`,
  es: {
    title: 'Human in the loop no es una estrategia',
    excerpt:
      'Poner a un humano en el loop es la respuesta que da todo ejecutivo y que casi nadie diseña. Las tasas de aprobación medidas dicen lo que de verdad pasa: la gente hace clic en sí.',
    metaDescription:
      'Poner a un humano en el loop es la respuesta que nadie diseña. Qué dicen los datos sobre aprobar sin revisar y cómo diseñar supervisión que sí detecte fallas.',
    tags: ['ai', 'agentes', 'gobernanza', 'supervisión-humana', 'cumplimiento', 'operaciones'],
    content_md: `
# Human in the loop no es una estrategia

## Puntos clave
- **Aprobar no es revisar.** Las tasas de aprobación medidas están por encima del 90 por ciento, y la atención decae dentro de una misma sesión.
- **Una persona que lo aprueba todo quedó convertida en un escudo contra la responsabilidad.**
- **La supervisión solo funciona cuando es poco frecuente, contextual y con rendición de cuentas.** El volumen es el enemigo.
- **Los reguladores están a punto de exigirla en Europa**, lo que va a producir una ola de supervisión que existe en el papel.
- **Diseña la escalación, no la casilla de verificación.** Quién, qué tan rápido, con qué contexto y qué pasa cuando no está disponible.

---

Toda conversación sobre el riesgo de la AI termina con la misma frase. Vamos a mantener a un humano en el loop.

Suena a un control. La mayoría de las veces es una frase que permite terminar una reunión.

He hecho las preguntas de seguimiento en suficientes salas como para saber cómo va. ¿Qué humano? ¿Revisando exactamente qué? ¿Con qué información enfrente? ¿Cuántas de estas por día? ¿Cuál es su tiempo de respuesta? ¿Qué pasa a las dos de la mañana? ¿Qué pasa cuando está de vacaciones? ¿Qué pasa cuando no está de acuerdo con el agente?

Las respuestas se acaban rápido, normalmente en la segunda pregunta.

## La versión medida de lo que de verdad pasa

Esto ya no es cuestión de opinión. Hay datos, y son incómodos.

Anthropic publicó cifras de uso de su agente de programación que muestran que los desarrolladores aprueban alrededor del 93 por ciento de las solicitudes de permiso. ([Anthropic, marzo de 2026](https://anthropic.com/engineering/claude-code-auto-mode))

Noventa y tres por ciento. Son usuarios técnicos, revisando acciones en su propio entorno, en un sistema que eligieron, con el contexto justo enfrente. Ese es el mejor escenario para la revisión humana y ya está cerca de ser una formalidad.

La atención también decae dentro de una misma sesión. El trabajo de Anthropic para medir la autonomía de los agentes encontró que los usuarios nuevos activan la aprobación automática total en alrededor del 20 por ciento de las sesiones, mientras que los usuarios con experiencia lo hacen en más del 40 por ciento, y que cerca del 0.8 por ciento de las acciones de los agentes son irreversibles. ([Anthropic, febrero de 2026](https://www.anthropic.com/research/measuring-agent-autonomy))

De ahí salen dos cosas. Primero, las personas más cercanas al sistema confían más en él con el tiempo, lo cual es racional y también es el mecanismo por el que la supervisión desaparece sin hacer ruido. Segundo, una pequeña fracción de las acciones no se puede deshacer, que es justo donde la revisión vale algo y justo donde es menos probable que se aplique, porque esas acciones se ven como todas las demás en la cola.

Voy a nombrar la salvedad obvia: un proveedor de modelos tiene un interés comercial en la conclusión de que la aprobación humana es puro teatro. Tenlo en cuenta al leerlo. Pero la dirección coincide con lo que ya sabe cualquiera que haya visto una cola de aprobaciones.

## Supervisión obligatoria no significa supervisión real

Si quieres evidencia de que un requisito legal no es un control, mira lo que pasó con la ley de la ciudad de Nueva York sobre algoritmos de contratación.

Unos investigadores revisaron 391 empleadores sujetos a ella. Dieciocho habían publicado el informe de auditoría exigido. Trece habían publicado el aviso de transparencia exigido. Eso es 4.6 por ciento y 3.3 por ciento, con la aplicación de la ley ya vigente. ([FAccT 2024](https://arxiv.org/abs/2406.01399))

La ley existía. La supervisión no.

Ahora piensa en lo que está a punto de pasar en Europa. Las obligaciones de alto riesgo del AI Act, incluido el artículo 14 sobre supervisión humana, aplican desde el 2 de agosto de 2026. El texto exige que los sistemas se diseñen de forma que puedan ser supervisados eficazmente por personas físicas, y exige que esas personas tengan la competencia, la formación y la autoridad para intervenir. ([EU AI Act, artículo 14](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689))

Competencia, formación y autoridad. Lee eso frente a una tasa de aprobación del 93 por ciento y puedes predecir los próximos dos años: una gran cantidad de supervisión documentada que no supervisa nada, y una cantidad menor de trabajo de diseño real por parte de equipos que se lo tomaron en serio.

El mismo patrón está llegando a Estados Unidos por otra vía. Colorado derogó y volvió a promulgar su ley de AI en mayo de 2026, con obligaciones que empiezan en enero de 2027 y el derecho de un consumidor a solicitar una revisión humana significativa y la reconsideración de una decisión trascendental. ([Colorado SB 26-189](https://leg.colorado.gov/bills/sb26-189)) Significativa está cargando con mucho peso en esa frase, y eso se va a litigar.

## Por qué el volumen destruye la supervisión

El mecanismo es simple y no tiene que ver con gente perezosa.

Si un revisor ve cincuenta solicitudes por hora y 49 están bien, la estrategia racional es aprobar rápido. El costo de examinarlo todo es real e inmediato. El costo de que se te escape algo es poco frecuente y diferido. Cualquier sistema que produzca solicitudes de aprobación de alto volumen y baja varianza va a entrenar a sus revisores para aprobar en automático, y entre mejor sea el agente, más rápido pasa eso.

Lo que lleva a la regla de diseño contraintuitiva: **menos aprobaciones producen mejor supervisión.**

Si quieres que una decisión humana signifique algo, tiene que ser lo bastante poco frecuente como para merecer atención, y tiene que llegar con suficiente contexto como para que pensar sea posible.

## Cómo diseñarla para que no sea teatro

1. **Filtra por consecuencia, no por categoría.** No revises cada mensaje. Revisa cada reembolso por encima de un umbral, cada cambio de credenciales, cada eliminación, cada primer contacto con un cliente regulado. La mayoría de las acciones nunca debería llegar a una persona.
2. **Haz que la retención sea un estado real.** Permitir, retener, denegar. Una retención tiene un responsable, un plazo y un valor por defecto. Si nadie responde dentro de la ventana, la acción no se ejecuta. Un timeout que aprueba en silencio no es supervisión, es un retraso.
3. **Dale al revisor la evidencia, no la solicitud.** Qué propone el agente, por qué, qué leyó, qué dejó por fuera, de qué no está seguro y qué pasa si se equivoca. Si la pantalla solo muestra una acción y dos botones, construiste una lotería.
4. **Nombra a la persona, no al equipo.** Las colas que son de todos no son de nadie. Asigna, con un suplente, con horario.
5. **Mide a los revisores.** Tasa de aprobación, tiempo invertido y qué tan seguido la revisión cambió el resultado. Si una cola corre al 99 por ciento de aprobación, o el filtro está mal configurado o la revisión no está ocurriendo. Ambas cosas son hallazgos.
6. **Deja que digan que no sin fricción.** Si rechazar implica escribir una justificación y defenderla en una reunión, le pusiste al rechazo un precio que lo saca del mercado.

## Human in the loop frente a human on the loop

Son distintos y la diferencia importa cuando escribes una política.

**In the loop** significa que la acción espera a una persona. Es lo correcto para acciones irreversibles, de alto valor y bajo volumen. Cuesta latencia y consume atención, así que gástala a propósito.

**On the loop** significa que la acción sigue adelante y una persona monitorea, toma muestras y puede detener el sistema. Es lo correcto para acciones reversibles y de alto volumen donde esperar rompería el flujo de trabajo. Requiere algo que la gente rara vez construye: un botón de parada real, que alguien esté autorizado a presionar, sin una reunión.

La mayoría de las organizaciones dice hacer lo primero y opera lo segundo. La brecha entre lo que se dice y lo que se opera es donde ocurre el incidente.

## Lo que voy a seguir repitiendo

Human in the loop no es una estrategia a menos que puedas decir quién, qué revisa, qué tan rápido responde y qué pasa cuando no está disponible. Mientras esas cuatro respuestas no existan, la frase no es una salvaguarda, es una asignación de culpa que todavía no ha ocurrido.

Y si la respuesta honesta es que nadie puede revisar esto al volumen al que corre, entonces la respuesta correcta no es agregar una pantalla de aprobación. Es escribir la política que decide los casos rutinarios sin una persona, para que la persona solo gaste atención donde cambia el resultado.
`,
  },
};

export default post;
