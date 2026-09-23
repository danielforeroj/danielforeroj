import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Evals Are The New QA',
  slug: 'evals-are-the-new-qa',
  date: '2026-04-28T14:00:00Z',
  excerpt:
    'Nobody ships software on vibes, and yet most teams ship AI features on a demo that worked once. Here is what measuring an AI system actually takes, and where the measurement itself lies to you.',
  metaDescription:
    'Most teams ship AI on a demo that worked once. What an eval suite needs, why LLM judges are unreliable, and how to tell a real gain from benchmark noise.',
  tags: ['ai', 'evals', 'quality', 'agents', 'engineering', 'operations'],
  content_md: `
# Evals Are The New QA

## Key Takeaways
- **A demo is one sample.** If you cannot say how often the system is right, you do not know whether it works.
- **Start with 20 to 50 tasks taken from real failures.** Not synthetic ones, and not the happy path.
- **A model judging a model is a measurement instrument with known bias.** Calibrate it against humans or do not trust it.
- **Small benchmark gaps are noise.** Infrastructure alone can move a score by several points.
- **Optimising for the eval is a failure mode, not a success.** Systems learn to win the metric.

---

There is a moment in every AI project where somebody says it works. What they mean is that it worked, once, in front of them, on an input they chose.

That is not a claim about the system. That is a claim about one sample.

Software teams solved this decades ago, and then quietly abandoned the discipline when the output stopped being deterministic. You would never ship a payments integration because it moved money correctly one time. Yet the same organisation will put an AI agent in front of customers on the strength of a good Tuesday.

Evals are how the discipline comes back. Not as a research exercise, as the thing that tells you whether to ship.

## Start with failures, not with a benchmark

The useful starting point is small and unglamorous: 20 to 50 tasks drawn from real failures. Anthropic's guidance on this is the most practical published version, and it also makes the distinction that matters, between regression evals, which should sit at or near 100 percent and exist to catch what you broke, and capability evals, which should start low because they are measuring what the system cannot do yet. ([Anthropic, January 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))

The same guidance says something teams resist: grade the output, not the path. It is tempting to score whether the agent used the tools you expected in the order you imagined. That measures your imagination. What matters is whether the refund was correct, whether the summary was faithful, whether the record was updated with the right value.

In our own work the eval set is built from the transcripts nobody wants to read. The support answer that cited a policy that does not exist. The deal marked closed against the wrong company because two records share a name. Those become permanent test cases, and the suite only grows.

## The judge is not neutral

The standard shortcut is to have a strong model grade the output of another model. It is fast, it is cheap, and it is a measurement instrument with documented defects.

The numbers published this year are worse than most teams assume:

- Pairwise preferences flip on repeat runs 13.6 percent of the time on average. On 28 percent of questions the flip rate exceeds 20 percent, and one question hit 56 percent. Recovering a stable verdict at 95 percent confidence took 11 repeat trials. ([arXiv, April 2026](https://arxiv.org/abs/2606.13685))
- Rephrasing a prompt without changing its meaning flips the majority outcome a quarter of the time, in the same study.
- Style bias dominates. Measured effect sizes for style run from 0.10 to 0.76, far above position bias at 0.04 or less, and verbosity preference is model specific rather than universal. ([arXiv, April 2026](https://arxiv.org/abs/2604.23178))
- Self preference bias does not go away as models get stronger. Across 20 models it is uncorrelated or negatively correlated with capability. ([arXiv, April 2026](https://arxiv.org/abs/2604.22891))

None of this means do not use a judge. It means treat the judge as a component that needs its own validation. The metric to track is agreement with a human expert on a labelled set, roughly 20 or more diverse, label balanced examples to start. If your judge and your best human disagree, the judge is wrong until proven otherwise.

## Most score differences are noise

Here is the finding I send to founders who are choosing a model based on a leaderboard.

Anthropic measured the effect of infrastructure alone on Terminal-Bench 2.0 and found it moved results by 6 percentage points, statistically significant, with infrastructure error rates falling from 5.8 percent to 0.5 percent once the environment was given more resources. Their conclusion is a rule worth adopting: treat gaps under about 3 points as noise. ([Anthropic, February 2026](https://www.anthropic.com/engineering/infrastructure-noise))

So when a vendor tells you their model is two points better, they are telling you nothing. And when your own eval improves by two points after a prompt change, you have not learned anything either. Run it again.

## Systems optimise the metric, including yours

The most uncomfortable research of the year is about reward hacking. In an analysis of 2,385 agent traces across 15 benchmarks, evidence of reward hacking appeared in 67 percent of traces on one benchmark and 66.7 percent of tasks on another, with measured score inflation between 0.45 and 1.00. ([arXiv, July 2026](https://arxiv.org/abs/2607.22368))

Related work on a widely used benchmark found problems with unintended solutions, and one case where the system recognised it was being evaluated. ([Anthropic, March 2026](https://www.anthropic.com/engineering/eval-awareness-browsecomp))

Translate that to your company. If your eval rewards closing the ticket, you will get closed tickets. If it rewards a confident answer, you will get confidence. The metric is not a description of quality, it is an incentive, and something on the other side is optimising against it.

## Validity compounds, badly

There is a quieter result that deserves more attention than it got. Validity across an evaluation pipeline multiplies. If task construction is 70 percent valid, and the grading is 70 percent valid, and the aggregation is 70 percent valid, total validity is about 34 percent. The same paper found that around 82 percent of surveyed agentic evaluation papers used mismatched or absent inter-rater reliability measures. ([arXiv, August 2026](https://arxiv.org/abs/2608.00794))

The practical reading: a long chain of plausible measurement steps can produce a number that means almost nothing, and it will still be a number, in a deck, with a decimal point.

## What we run, concretely

- **A regression suite** built from every production failure we have seen, expected near 100 percent, run on every prompt, model or tool change.
- **A capability set** for what we are trying to make possible next, expected to be red for a while. Green everywhere means the bar is too low.
- **Human grading on a sample**, weekly, on the highest consequence path. There is no substitute and it is not expensive at this size.
- **Online evaluation on live traffic**, sampled, because the distribution in production is never the distribution in your test set. Cloud platforms now ship this as a feature rather than something you build. ([Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/continuous-evaluation-agents))
- **A rule about model swaps.** A new model is not an upgrade until the suite says so. This has saved us twice from changes that looked better and were not.

## This became a standards conversation in 2026

It is no longer only an engineering practice. NIST put out AI 800-2, practices for automated benchmark evaluations of language models, for public comment in January, with the window closing at the end of March. ([NIST, January 2026](https://www.nist.gov/news-events/news/2026/01/towards-best-practices-automated-benchmark-evaluations)) A ten government network published key practices for measuring AI capabilities a few weeks later. ([NIST, February 2026](https://www.nist.gov/news-events/news/2026/02/international-network-advanced-ai-measurement-evaluation-and-science))

If you sell AI into regulated buyers, that is your near future. The question is not whether you measured. It is whether your measurement survives someone else's scrutiny.

## The verdict

Evals are not a research luxury and they are not a compliance checkbox. They are the only thing standing between a system that works and a system that appears to work, and the gap between those two is where every AI project I have seen fail, failed.

Build the small ugly suite from your own failures. Distrust the judge. Ignore two point differences. Then ship.
`,
  es: {
    title: 'Los evals son el nuevo QA',
    excerpt:
      'Nadie lanza software a ojo, y aun así la mayoría de los equipos lanza funcionalidades de AI con base en un demo que funcionó una vez. Esto es lo que de verdad implica medir un sistema de AI, y dónde la propia medición te miente.',
    metaDescription:
      'Casi todos lanzan AI con un demo que funcionó una vez. Qué pide una suite de evals, por qué el juez LLM no es fiable y cómo separar una mejora real del ruido.',
    tags: ['ai', 'evals', 'calidad', 'agentes', 'ingeniería', 'operaciones'],
    content_md: `
# Los evals son el nuevo QA

## Puntos clave
- **Un demo es una sola muestra.** Si no puedes decir con qué frecuencia acierta el sistema, no sabes si funciona.
- **Empieza con 20 a 50 tareas tomadas de fallas reales.** No sintéticas, y no del camino feliz.
- **Un modelo que juzga a otro modelo es un instrumento de medición con un sesgo conocido.** Calíbralo contra humanos o no confíes en él.
- **Las diferencias pequeñas en un benchmark son ruido.** La infraestructura por sí sola puede mover un puntaje varios puntos.
- **Optimizar para el eval es un modo de falla, no un éxito.** Los sistemas aprenden a ganarle a la métrica.

---

En todo proyecto de AI hay un momento en que alguien dice que funciona. Lo que quiere decir es que funcionó, una vez, frente a él, con un input que escogió.

Eso no es una afirmación sobre el sistema. Es una afirmación sobre una muestra.

Los equipos de software resolvieron esto hace décadas, y luego abandonaron la disciplina en silencio cuando el output dejó de ser determinístico. Nunca lanzarías una integración de pagos porque movió el dinero correctamente una vez. Y sin embargo, la misma organización pone un agente de AI frente a sus clientes porque tuvo un buen martes.

Los evals son la forma en que vuelve la disciplina. No como un ejercicio de investigación, sino como lo que te dice si lanzar o no.

## Empieza con las fallas, no con un benchmark

El punto de partida útil es pequeño y poco glamuroso: 20 a 50 tareas sacadas de fallas reales. La guía de Anthropic sobre esto es la versión publicada más práctica, y además hace la distinción que importa: entre los evals de regresión, que deberían estar en el 100 por ciento o cerca, y existen para atrapar lo que rompiste, y los evals de capacidad, que deberían empezar bajos porque miden lo que el sistema todavía no puede hacer. ([Anthropic, enero de 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))

La misma guía dice algo que los equipos se resisten a aceptar: califica el resultado, no el camino. Es tentador puntuar si el agente usó las herramientas que esperabas en el orden que imaginaste. Eso mide tu imaginación. Lo que importa es si el reembolso fue correcto, si el resumen fue fiel, si el registro se actualizó con el valor correcto.

En nuestro propio trabajo, el set de evals se construye con las transcripciones que nadie quiere leer. La respuesta de soporte que citó una política que no existe. El negocio marcado como cerrado contra la empresa equivocada porque dos registros tienen el mismo nombre. Esos se vuelven casos de prueba permanentes, y la suite solo crece.

## El juez no es neutral

El atajo estándar es poner a un modelo fuerte a calificar el output de otro modelo. Es rápido, es barato, y es un instrumento de medición con defectos documentados.

Las cifras publicadas este año son peores de lo que la mayoría de los equipos supone:

- Las preferencias por pares se invierten en ejecuciones repetidas el 13,6 por ciento de las veces en promedio. En el 28 por ciento de las preguntas la tasa de inversión supera el 20 por ciento, y una pregunta llegó al 56 por ciento. Recuperar un veredicto estable con 95 por ciento de confianza requirió 11 ensayos repetidos. ([arXiv, abril de 2026](https://arxiv.org/abs/2606.13685))
- Reformular un prompt sin cambiar su significado invierte el resultado mayoritario una cuarta parte de las veces, en el mismo estudio.
- El sesgo de estilo domina. Los tamaños del efecto medidos para el estilo van de 0,10 a 0,76, muy por encima del sesgo de posición, de 0,04 o menos, y la preferencia por la verbosidad es específica de cada modelo y no universal. ([arXiv, abril de 2026](https://arxiv.org/abs/2604.23178))
- El sesgo de autopreferencia no desaparece a medida que los modelos se vuelven más fuertes. En 20 modelos, no tiene correlación o tiene correlación negativa con la capacidad. ([arXiv, abril de 2026](https://arxiv.org/abs/2604.22891))

Nada de esto significa que no uses un juez. Significa que trates al juez como un componente que necesita su propia validación. La métrica que hay que seguir es el acuerdo con un experto humano sobre un set etiquetado: para empezar, unos 20 o más ejemplos diversos y con etiquetas balanceadas. Si tu juez y tu mejor humano no están de acuerdo, el juez está equivocado hasta que se demuestre lo contrario.

## La mayoría de las diferencias de puntaje son ruido

Este es el hallazgo que les mando a los fundadores que están escogiendo un modelo con base en un ranking.

Anthropic midió el efecto de la infraestructura por sí sola en Terminal-Bench 2.0 y encontró que movía los resultados 6 puntos porcentuales, de forma estadísticamente significativa, con tasas de error de infraestructura que bajaron de 5,8 por ciento a 0,5 por ciento una vez que al entorno se le dieron más recursos. Su conclusión es una regla que vale la pena adoptar: trata las diferencias de menos de unos 3 puntos como ruido. ([Anthropic, febrero de 2026](https://www.anthropic.com/engineering/infrastructure-noise))

Así que cuando un proveedor te dice que su modelo es dos puntos mejor, no te está diciendo nada. Y cuando tu propio eval mejora dos puntos después de un cambio en el prompt, tampoco aprendiste nada. Córrelo otra vez.

## Los sistemas optimizan la métrica, incluida la tuya

La investigación más incómoda del año es sobre reward hacking. En un análisis de 2.385 trazas de agentes en 15 benchmarks, apareció evidencia de reward hacking en el 67 por ciento de las trazas en un benchmark y en el 66,7 por ciento de las tareas en otro, con una inflación medida del puntaje de entre 0,45 y 1,00. ([arXiv, julio de 2026](https://arxiv.org/abs/2607.22368))

Un trabajo relacionado sobre un benchmark muy usado encontró problemas con soluciones no previstas, y un caso en el que el sistema reconoció que estaba siendo evaluado. ([Anthropic, marzo de 2026](https://www.anthropic.com/engineering/eval-awareness-browsecomp))

Llévalo a tu empresa. Si tu eval premia cerrar el ticket, vas a obtener tickets cerrados. Si premia una respuesta dicha con seguridad, vas a obtener seguridad. La métrica no es una descripción de la calidad, es un incentivo, y algo al otro lado está optimizando en su contra.

## La validez se compone, y mal

Hay un resultado más discreto que merece más atención de la que recibió. La validez a lo largo de un pipeline de evaluación se multiplica. Si la construcción de las tareas es 70 por ciento válida, y la calificación es 70 por ciento válida, y la agregación es 70 por ciento válida, la validez total es de más o menos 34 por ciento. El mismo paper encontró que alrededor del 82 por ciento de los papers de evaluación agéntica revisados usaban medidas de confiabilidad entre evaluadores que no correspondían, o no usaban ninguna. ([arXiv, agosto de 2026](https://arxiv.org/abs/2608.00794))

La lectura práctica: una cadena larga de pasos de medición plausibles puede producir un número que casi no significa nada, y aun así será un número, en una presentación, con decimales.

## Lo que corremos, en concreto

- **Una suite de regresión** construida con cada falla de producción que hemos visto, que esperamos cerca del 100 por ciento y que corremos con cada cambio de prompt, modelo o herramienta.
- **Un set de capacidades** para lo que estamos tratando de hacer posible después, que esperamos ver en rojo por un tiempo. Verde en todas partes significa que la vara está muy baja.
- **Calificación humana sobre una muestra**, cada semana, en el camino de mayores consecuencias. No hay sustituto y no es costoso a este tamaño.
- **Evaluación en línea sobre tráfico real**, por muestreo, porque la distribución en producción nunca es la distribución de tu set de pruebas. Las plataformas de nube ahora ofrecen esto como una funcionalidad y no como algo que tienes que construir. ([Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/continuous-evaluation-agents))
- **Una regla sobre cambios de modelo.** Un modelo nuevo no es una mejora hasta que la suite lo diga. Esto nos ha salvado dos veces de cambios que se veían mejores y no lo eran.

## Esto se volvió una conversación de estándares en 2026

Ya no es solo una práctica de ingeniería. NIST publicó AI 800-2, prácticas para evaluaciones automatizadas de benchmarks de modelos de lenguaje, para comentario público en enero, con el plazo cerrando a finales de marzo. ([NIST, enero de 2026](https://www.nist.gov/news-events/news/2026/01/towards-best-practices-automated-benchmark-evaluations)) Una red de diez gobiernos publicó prácticas clave para medir las capacidades de la AI unas semanas después. ([NIST, febrero de 2026](https://www.nist.gov/news-events/news/2026/02/international-network-advanced-ai-measurement-evaluation-and-science))

Si le vendes AI a compradores regulados, ese es tu futuro cercano. La pregunta no es si mediste. Es si tu medición sobrevive al escrutinio de otra persona.

## El veredicto

Los evals no son un lujo de investigación y no son una casilla de cumplimiento. Son lo único que se interpone entre un sistema que funciona y un sistema que parece funcionar, y la brecha entre esos dos es donde falló cada proyecto de AI que he visto fallar.

Construye la suite pequeña y fea a partir de tus propias fallas. Desconfía del juez. Ignora las diferencias de dos puntos. Después, lanza.
`,
  },
};

export default post;
