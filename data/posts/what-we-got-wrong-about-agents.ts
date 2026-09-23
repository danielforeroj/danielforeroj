import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'What We Got Wrong About Agents This Year',
  slug: 'what-we-got-wrong-about-agents',
  date: '2026-09-15T14:00:00Z',
  excerpt:
    'A year of agents in production, an industry arguing with statistics it never checked, and several confident predictions that did not survive. Including some of mine.',
  metaDescription:
    'A year of agents in production: which famous statistics do not hold up, which predictions failed, and what the evidence actually supports going into 2027.',
  tags: ['ai', 'agents', 'retrospective', 'evidence', 'operations', 'strategy'],
  content_md: `
# What We Got Wrong About Agents This Year

## Key Takeaways
- **The two most quoted statistics about AI failure do not say what people think.** Both are worth reading at the source.
- **A famous productivity study was retired by the people who ran it.** That is what integrity looks like.
- **Analyst forecasts contradicted each other inside eight months.** Cite the survey, not the prediction.
- **Autonomous did not beat supervised on capability.** It beat it on attention, which is a different argument.
- **The deployments that worked were narrow, measured, and boring.**

---

It has been a year since agents stopped being a demo and started being something companies actually run. Enough time to see what held.

I am writing this as a correction list rather than a victory lap, including on things I said. The useful output of a year is not a thesis confirmed. It is the list of places where the evidence went somewhere else.

## The 95 percent that everybody quoted

You have seen it. Ninety five percent of AI pilots fail.

The report says something different. It says 95 percent of organisations are getting zero return, which is a statement about all organisations, not about pilots. Its own funnel has half of organisations investigating, 20 percent piloting and 5 percent implementing, which means roughly a quarter of pilots cleared the bar. The evidence base is 52 interviews and 153 survey responses gathered at conferences over six months, labelled preliminary, not peer reviewed, and the authors themselves warn that six months may understate success rates. ([critique, April 2026](https://80000hours.org/podcast/episodes/ai-workplace-mit-study/))

A number travelled around the world because it confirmed something people already wanted to say. I quoted it in conversation more than once before I read the methodology. That is on me.

## The 40 percent cancellation forecast

The other one: 40 percent of agentic AI projects will be cancelled by 2027.

The disclosed basis is a January 2025 poll of 3,412 self selected webinar attendees, measuring investment posture rather than cancellations. It is analyst judgement. It may prove right. It is not a measurement, and it gets cited as one.

The same firm's forecasting record this year is worth holding up, because it shows how fast the narrative moved. In August 2025 it projected that 40 percent of enterprise applications would be integrated with task specific agents by the end of 2026, up from under 5 percent. In April 2026 its own CIO survey found 17 percent of organisations had deployed agents, and placed agentic AI at the peak of inflated expectations. ([Gartner, April 2026](https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai))

Eight months apart. Same firm. The survey is useful. The forecast was a mood.

## The productivity study that was withdrawn

Early in the year, the most cited result in the developer tooling argument was a randomised trial suggesting experienced open source developers were 19 percent slower when using AI tools.

METR, the organisation that ran it, now carries a banner on that page saying the results are out of date, and published a February 2026 follow up with 57 developers across 143 repositories and over 800 tasks, where the sign flipped but both arms cross zero. ([METR, February 2026](https://metr.org/blog/2026-02-24-uplift-update/))

So neither the slowdown nor a speedup is currently defensible. I respect that a great deal more than I would respect a confident update. If you used the 19 percent figure in a deck, it needs a footnote now.

## What autonomy actually measured

The most surprising result of the year, to me, was about human approval rather than model capability.

In a controlled study with 1,053 paid testers, an automated permission system caught 89 percent of dangerous commands while human testers caught 13.6 percent, and the human catch rate decayed within a session from around 17 percent early to about 5 percent after fifty or more prior prompts. Manual approval was reported as more than twice as likely as the automated mode to result in harmful actions users had not requested. The automated mode became the default in August. ([Anthropic, August 2026](https://claude.com/blog/auto-mode-default-in-claude-code))

I spent the first half of the year arguing that a human decision should sit in front of consequential actions. I still believe that for irreversible, high value actions. What I got wrong was assuming the human in that position was doing the work. At volume, they are not, and a well designed automatic check outperforms them.

The correction is not less oversight. It is oversight in fewer places, with better context, on the actions that actually deserve it. Policy handles the routine cases so the person has attention left for the rare one.

Caveat, again: the vendor benefits from this conclusion. The study design is public, the sample is large, and nobody has produced a contrary measurement of similar scale. Take it seriously and stay alert for a rebuttal.

## Capability did not arrive the way the roadmaps said

The benchmark numbers are a useful antidote to conference talks.

On TheAgentCompany, a benchmark of realistic company tasks, the best autonomous completion rate is 42.86 percent, and the leaderboard has no 2026 submissions above it. On tau-bench, a customer service benchmark, an agent with over 60 percent average task success drops below 25 percent when the same task must be solved correctly eight times in a row. The SWE-bench Verified ceiling is 79.2 percent, not the nineties that circulate on aggregator blogs.

That reliability collapse under repetition is the number I would put on the wall. Average success is a demo statistic. Consistency across repeated attempts is the production statistic, and it is much lower.

## The labour story got corrected too

Several companies that publicly attributed staff reductions to AI have walked some of it back. Survey work reported in July 2026 found that 39 percent of leaders had made AI driven redundancies and that 55 percent of those now say it was the wrong call, with around 32 percent of US hiring managers reporting they eliminated a role for AI and later rehired.

The most cited example is messier than the shorthand. The company's own annual filing reports a headcount decline from 4,352 to 2,831 between 2023 and 2025 and states the expectation that the number continues to decrease. The widely repeated rehire narrative is press interpretation, not the filing.

Both the triumphant version and the humiliating version of that story were exaggerated. That is usually the case.

## What actually worked

Across everything we ran and everything clients showed us, the pattern in the deployments that survived is consistent and unglamorous:

- **One process, not a platform.** The successes are a specific queue with a specific owner.
- **Read heavy, write narrow.** Retrieval, drafting, routing and summarising, with a small number of guarded write actions.
- **A policy in front of the consequential step**, evaluated before execution, not reviewed after.
- **An eval suite built from real failures**, and a rule that no model change ships without it.
- **Numbers taken before starting.** The teams that could not say what the process cost before are still arguing about whether it improved.

None of that needs a frontier model. Most of it needs someone willing to do process archaeology for two weeks.

## What I am holding going into next year

That the constraint is trust and context, not capability. That the interesting companies own execution and accountability, not model access. That consistency under repetition is the metric that separates production from theatre.

And a new one, learned this year: check the methodology before repeating the statistic, especially when it agrees with you.
`,
  es: {
    title: 'En qué nos equivocamos sobre los agentes este año',
    excerpt:
      'Un año de agentes en producción, una industria discutiendo con estadísticas que nunca verificó y varias predicciones confiadas que no sobrevivieron. Incluidas algunas mías.',
    metaDescription:
      'Un año de agentes en producción: qué estadísticas famosas no se sostienen, qué predicciones fallaron y qué respalda de verdad la evidencia de cara a 2027.',
    tags: ['ai', 'agentes', 'retrospectiva', 'evidencia', 'operaciones', 'estrategia'],
    content_md: `
# En qué nos equivocamos sobre los agentes este año

## Puntos clave
- **Las dos estadísticas más citadas sobre el fracaso de la AI no dicen lo que la gente cree.** Vale la pena leer ambas en la fuente.
- **Un famoso estudio de productividad fue retirado por quienes lo hicieron.** Así se ve la integridad.
- **Los pronósticos de los analistas se contradijeron entre sí en menos de ocho meses.** Cita la encuesta, no la predicción.
- **Lo autónomo no le ganó a lo supervisado en capacidad.** Le ganó en atención, que es otro argumento.
- **Los despliegues que funcionaron fueron acotados, medidos y aburridos.**

---

Ha pasado un año desde que los agentes dejaron de ser una demo y empezaron a ser algo que las empresas de verdad operan. Tiempo suficiente para ver qué se sostuvo.

Escribo esto como una lista de correcciones y no como una vuelta de la victoria, incluso sobre cosas que yo dije. El resultado útil de un año no es una tesis confirmada. Es la lista de lugares donde la evidencia fue para otro lado.

## El 95 por ciento que todo el mundo citó

Ya lo viste. El noventa y cinco por ciento de los pilotos de AI fracasan.

El informe dice algo distinto. Dice que el 95 por ciento de las organizaciones está obteniendo cero retorno, lo cual es una afirmación sobre todas las organizaciones, no sobre los pilotos. Su propio embudo tiene a la mitad de las organizaciones investigando, al 20 por ciento haciendo pilotos y al 5 por ciento implementando, lo que significa que aproximadamente una cuarta parte de los pilotos superó la vara. La base de evidencia son 52 entrevistas y 153 respuestas de encuesta recogidas en conferencias durante seis meses, etiquetadas como preliminares, sin revisión por pares, y los propios autores advierten que seis meses pueden subestimar las tasas de éxito. ([crítica, abril de 2026](https://80000hours.org/podcast/episodes/ai-workplace-mit-study/))

Un número le dio la vuelta al mundo porque confirmaba algo que la gente ya quería decir. Yo lo cité en conversaciones más de una vez antes de leer la metodología. Eso es culpa mía.

## El pronóstico del 40 por ciento de cancelaciones

La otra: el 40 por ciento de los proyectos de AI agéntica serán cancelados para 2027.

La base declarada es una encuesta de enero de 2025 a 3.412 asistentes a un webinar que se autoseleccionaron, y mide la postura de inversión, no cancelaciones. Es juicio de analista. Puede resultar cierto. No es una medición, y se cita como si lo fuera.

Vale la pena poner sobre la mesa el historial de pronósticos de esa misma firma este año, porque muestra lo rápido que cambió la narrativa. En agosto de 2025 proyectó que el 40 por ciento de las aplicaciones empresariales estarían integradas con agentes específicos para tareas a finales de 2026, frente a menos del 5 por ciento. En abril de 2026 su propia encuesta a CIOs encontró que el 17 por ciento de las organizaciones había desplegado agentes, y ubicó a la AI agéntica en el pico de expectativas infladas. ([Gartner, abril de 2026](https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai))

Ocho meses de diferencia. La misma firma. La encuesta es útil. El pronóstico era un estado de ánimo.

## El estudio de productividad que fue retirado

A comienzos del año, el resultado más citado en la discusión sobre herramientas para desarrolladores era un ensayo aleatorizado que sugería que los desarrolladores experimentados de código abierto eran 19 por ciento más lentos cuando usaban herramientas de AI.

METR, la organización que lo hizo, ahora tiene un aviso en esa página que dice que los resultados están desactualizados, y publicó en febrero de 2026 un seguimiento con 57 desarrolladores en 143 repositorios y más de 800 tareas, donde el signo se invirtió pero ambos brazos cruzan el cero. ([METR, febrero de 2026](https://metr.org/blog/2026-02-24-uplift-update/))

Así que hoy no se puede defender ni la desaceleración ni una aceleración. Respeto eso mucho más de lo que respetaría una actualización confiada. Si usaste la cifra del 19 por ciento en una presentación, ahora necesita una nota al pie.

## Lo que la autonomía midió en realidad

El resultado más sorprendente del año, para mí, fue sobre la aprobación humana y no sobre la capacidad de los modelos.

En un estudio controlado con 1.053 evaluadores pagados, un sistema automatizado de permisos detectó el 89 por ciento de los comandos peligrosos, mientras que los evaluadores humanos detectaron el 13,6 por ciento, y la tasa de detección humana se deterioró dentro de una misma sesión, de alrededor del 17 por ciento al principio a cerca del 5 por ciento después de cincuenta o más prompts previos. Se reportó que la aprobación manual tenía más del doble de probabilidad que el modo automatizado de terminar en acciones dañinas que los usuarios no habían pedido. El modo automatizado se volvió el predeterminado en agosto. ([Anthropic, agosto de 2026](https://claude.com/blog/auto-mode-default-in-claude-code))

Pasé la primera mitad del año argumentando que una decisión humana debía estar antes de las acciones con consecuencias. Todavía lo creo para acciones irreversibles y de alto valor. En lo que me equivoqué fue en suponer que el humano en esa posición estaba haciendo el trabajo. Con volumen, no lo hace, y un control automático bien diseñado lo supera.

La corrección no es menos supervisión. Es supervisión en menos lugares, con mejor contexto, en las acciones que de verdad la merecen. La política se encarga de los casos rutinarios para que a la persona le quede atención para el caso raro.

Advertencia, otra vez: al proveedor le conviene esta conclusión. El diseño del estudio es público, la muestra es grande y nadie ha producido una medición contraria de escala similar. Tómalo en serio y mantente atento a una refutación.

## La capacidad no llegó como decían las hojas de ruta

Las cifras de los benchmarks son un buen antídoto contra las charlas de conferencia.

En TheAgentCompany, un benchmark de tareas realistas de empresa, la mejor tasa de finalización autónoma es 42,86 por ciento, y la tabla de clasificación no tiene envíos de 2026 por encima de esa cifra. En tau-bench, un benchmark de servicio al cliente, un agente con más del 60 por ciento de éxito promedio por tarea cae por debajo del 25 por ciento cuando la misma tarea tiene que resolverse correctamente ocho veces seguidas. El techo de SWE-bench Verified es 79,2 por ciento, no los noventa y tantos que circulan en blogs agregadores.

Ese colapso de confiabilidad bajo repetición es el número que yo pondría en la pared. El éxito promedio es una estadística de demo. La consistencia en intentos repetidos es la estadística de producción, y es mucho más baja.

## La historia laboral también se corrigió

Varias empresas que atribuyeron públicamente recortes de personal a la AI han reversado parte de eso. Un trabajo de encuestas reportado en julio de 2026 encontró que el 39 por ciento de los líderes había hecho despidos impulsados por la AI y que el 55 por ciento de ellos ahora dice que fue la decisión equivocada, con alrededor del 32 por ciento de los gerentes de contratación en Estados Unidos reportando que eliminaron un cargo por la AI y luego volvieron a contratar.

El ejemplo más citado es más enredado que la versión resumida. El propio informe anual de la empresa reporta una caída de la planta de personal de 4.352 a 2.831 entre 2023 y 2025, y declara la expectativa de que la cifra siga bajando. La narrativa de la recontratación, tan repetida, es una interpretación de la prensa, no del informe.

Tanto la versión triunfal como la versión humillante de esa historia fueron exageradas. Suele pasar.

## Lo que sí funcionó

En todo lo que operamos y todo lo que los clientes nos mostraron, el patrón de los despliegues que sobrevivieron es consistente y poco glamoroso:

- **Un proceso, no una plataforma.** Los éxitos son una cola específica con un responsable específico.
- **Mucha lectura, escritura acotada.** Recuperación, redacción, enrutamiento y resúmenes, con un número pequeño de acciones de escritura protegidas.
- **Una política antes del paso con consecuencias**, evaluada antes de la ejecución, no revisada después.
- **Una suite de evals construida a partir de fallas reales**, y una regla de que ningún cambio de modelo sale sin pasarla.
- **Números tomados antes de empezar.** Los equipos que no podían decir cuánto costaba el proceso antes siguen discutiendo si mejoró.

Nada de eso necesita un modelo de frontera. La mayor parte necesita a alguien dispuesto a hacer arqueología de procesos durante dos semanas.

## Lo que sostengo de cara al próximo año

Que la restricción es la confianza y el contexto, no la capacidad. Que las empresas interesantes son dueñas de la ejecución y de la responsabilidad, no del acceso a los modelos. Que la consistencia bajo repetición es la métrica que separa la producción del teatro.

Y una nueva, aprendida este año: revisa la metodología antes de repetir la estadística, sobre todo cuando te da la razón.
`,
  },
};

export default post;
