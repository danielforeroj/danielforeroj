import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Are You In The Answer',
  slug: 'are-you-in-the-answer',
  date: '2026-02-24T14:00:00Z',
  excerpt:
    'Buyers stopped reading ten blue links and started reading one answer. If your brand is not inside that answer, you are not in the consideration set, and your analytics will not tell you why.',
  metaDescription:
    'Buyers now read one AI answer, not ten links. What the data shows about clicks and citations, why rank no longer predicts them, and how to measure yourself.',
  tags: ['ai', 'geo', 'aeo', 'search', 'marketing', 'growth'],
  content_md: `
# Are You In The Answer

## Key Takeaways
- **The question changed.** It is no longer where you rank. It is whether you are named when a buyer asks about your category.
- **Ranking predicts citation less and less.** Half of what an engine cites is no longer what wins the page.
- **Clicks are down and sessions end earlier.** The visit you used to get is now an answer someone else summarised.
- **Every assistant behaves differently.** One cites constantly and names brands rarely, another does the opposite.
- **Measure it before you optimise it.** Most teams are guessing about a surface they have never looked at.

---

A client asked me last month why traffic was down while the business felt fine. The pipeline had not collapsed. Search impressions were stable. Clicks were not.

That is the shape of the shift. Demand did not go anywhere. The interface in front of it did.

## What the numbers say

The most methodologically careful public study of click behaviour remains the Pew Research work, which observed real browsing rather than asking people what they do. On searches where an AI summary appeared, 8 percent of visits included a click on a traditional result, against 15 percent where no summary appeared. One percent clicked a link inside the summary. Twenty six percent of sessions ended entirely, against 16 percent without. ([Pew Research Center, July 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/))

The effect has deepened since. An analysis of 300,000 keywords comparing December 2023 with December 2025 put the click through rate drop for position one at 58 percent when an AI overview is present, up from the 34.5 percent the same team measured a year earlier. ([Ahrefs, February 2026](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)) It is correlational, and the authors say so, but the direction is not in dispute.

On the publisher side, Chartbeat data reported in the Reuters Institute's 2026 trends work showed Google referrals to publishers down 33 percent globally year over year to November 2025, and down 38 percent for US organic. ([Press Gazette, January 2026](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/))

Those are three different populations measured three different ways, which is why I trust the direction and not the decimals.

## Ranking stopped being the proxy

For twenty years the whole discipline had one convenient property: if you ranked, you were seen. That link is weakening.

In mid 2025, a study of AI overview citations found that 76.1 percent of cited URLs also appeared in the classic top ten. ([Ahrefs, July 2025](https://ahrefs.com/blog/search-rankings-ai-citations/)) In the scans we run now, in our own clients' categories, the overlap is visibly lower than that, and it keeps drifting. I expect the next public study to confirm it.

Which means a rank report is drifting away from the question your buyer actually asks. It still tells you who wins the page. It is no longer a reliable proxy for who gets named in the answer.

## The engines are not one thing

Treating "AI search" as a single channel is the most common mistake I see in strategy decks.

Run the same category question through four assistants and you get four different shapes of answer. One returns a long list of cited sources and almost never names a vendor. Another names three companies with confidence and cites almost nothing. One leans on whatever has a crawlable comparison page. One leans on forums.

I am describing our own scans rather than a published study, because the published work on this is thin and mostly vendor produced. But the structural point is not subtle: one assistant is a research surface, where being a citable source is what matters, and another is a recommendation surface, where being a named brand is what matters. They are not one channel and they do not respond to the same work.

## The part nobody wants to hear about crawlers

There is an economic asymmetry underneath all of this. Cloudflare measured crawl to referral ratios in 2025: roughly 38,000 to one for Anthropic, about 1,091 to one for OpenAI, 195 to one for Perplexity, against 5 to one for Google, with training driving around 80 percent of AI bot activity. ([Cloudflare, August 2025](https://blog.cloudflare.com/crawlers-click-ai-bots-training/)) Cloudflare notes a caveat that inflates one of those figures, and the numbers have surely moved since, but the shape is right. The old bargain, we crawl you and we send you visitors, does not hold at the same exchange rate.

Two practical consequences.

First, blocking training does not block answer time retrieval, and they are different bots. OpenAI documents three: one for training, one for surfacing results in ChatGPT search, and one for user initiated fetches, where it states robots.txt may not apply. ([OpenAI](https://developers.openai.com/api/docs/bots)) Google's control covers training and grounding but gives no opt out from AI overviews specifically. ([Google](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)) If someone on your team blanket blocked AI crawlers last year to protect content, check what they actually blocked.

Second, do not spend a sprint on llms.txt. Of around 38,000 domains publishing a valid one, 97 percent received zero requests for it in the month studied, and most of the fetches that did happen came from coding agents and audit tools. ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)) I ship one anyway because it costs an hour. I would not present it to a board as a strategy.

## What actually seems to work

The academic anchor for this field is still the original generative engine optimization paper, which found that citing sources, adding quotations and adding statistics raised visibility by up to 40 percent on their benchmark. ([arXiv, 2023](https://arxiv.org/abs/2311.09735))

That is a suspiciously comfortable result for anyone who writes carefully, and it matches what we see:

- **Answer the question in the first hundred words**, in plain language, before the context and the caveats.
- **Put a number in it.** Specific, attributed, dated. Models reach for text they can quote without hedging.
- **Be the source, not the summary.** Original data, original methodology, your own numbers. Nothing gets cited for restating the consensus.
- **Name yourself clearly and consistently.** Entity confusion is a real failure. If three spellings of your company exist, you are splitting your own signal.
- **Keep the facts consistent across your own properties.** Contradicting yourself across your site, your docs and your profiles is how a model decides it does not trust any of it.

## Measure first

You cannot manage this from Google Analytics. Referral traffic from an assistant is thin or invisible, so the only honest approach is to ask the engines directly, repeatedly, and record what they say: the category question, the answer, which brands appear, which sources are cited, on what date, on which model.

That is the loop we built unbound geo around, and building it taught me the thing I would tell anyone starting: the measurement is not the product. Knowing you are absent is worth very little. Knowing which sources the engine trusts in your category, and becoming one of them, is the work.

## The verdict

Search did not die. It got summarised. The buyer still exists, still has budget, still has the same problem. They are just reading one paragraph now instead of choosing from ten links.

The only question that matters is whether your name is in that paragraph. Most companies have never checked.
`,
  es: {
    title: '¿Estás en la respuesta?',
    excerpt:
      'Los compradores dejaron de leer diez links azules y empezaron a leer una sola respuesta. Si tu marca no está dentro de esa respuesta, no estás entre las opciones que consideran, y tu analítica no te va a decir por qué.',
    metaDescription:
      'Los compradores leen una respuesta de AI, no diez links. Qué muestran los datos sobre clics y citas, por qué el ranking ya no los predice y cómo medirte.',
    tags: ['ai', 'geo', 'aeo', 'búsqueda', 'marketing', 'crecimiento'],
    content_md: `
# ¿Estás en la respuesta?

## Puntos clave
- **La pregunta cambió.** Ya no es en qué posición estás. Es si te nombran cuando un comprador pregunta por tu categoría.
- **El ranking predice cada vez menos quién es citado.** La mitad de lo que cita un motor ya no es lo que gana la página.
- **Los clics bajan y las sesiones terminan antes.** La visita que antes recibías ahora es una respuesta que otro resumió.
- **Cada asistente se comporta distinto.** Uno cita constantemente y rara vez nombra marcas, otro hace lo contrario.
- **Mídelo antes de optimizarlo.** La mayoría de los equipos está adivinando sobre una superficie que nunca ha mirado.

---

El mes pasado un cliente me preguntó por qué el tráfico había bajado si el negocio se sentía bien. El pipeline no se había desplomado. Las impresiones en búsqueda estaban estables. Los clics no.

Esa es la forma del cambio. La demanda no se fue a ninguna parte. Lo que cambió fue la interfaz que tiene enfrente.

## Lo que dicen los números

El estudio público metodológicamente más cuidadoso sobre el comportamiento de clics sigue siendo el trabajo de Pew Research, que observó navegación real en lugar de preguntarle a la gente qué hace. En las búsquedas donde apareció un resumen de AI, el 8 por ciento de las visitas incluyó un clic en un resultado tradicional, frente al 15 por ciento donde no apareció ningún resumen. El uno por ciento hizo clic en un link dentro del resumen. El veintiséis por ciento de las sesiones terminó por completo, frente al 16 por ciento sin resumen. ([Pew Research Center, julio de 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/))

El efecto se ha profundizado desde entonces. Un análisis de 300,000 keywords que comparó diciembre de 2023 con diciembre de 2025 ubicó la caída de la tasa de clics de la posición uno en 58 por ciento cuando aparece un AI overview, frente al 34.5 por ciento que el mismo equipo midió un año antes. ([Ahrefs, febrero de 2026](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)) Es correlacional, y los autores lo dicen, pero la dirección no está en discusión.

Del lado de los medios, datos de Chartbeat reportados en el trabajo de tendencias 2026 del Reuters Institute mostraron que los referidos de Google hacia los medios cayeron 33 por ciento a nivel global, año contra año, a noviembre de 2025, y 38 por ciento en el orgánico de Estados Unidos. ([Press Gazette, enero de 2026](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/))

Son tres poblaciones distintas medidas de tres formas distintas, y por eso confío en la dirección y no en los decimales.

## El ranking dejó de ser el indicador

Durante veinte años toda la disciplina tuvo una propiedad conveniente: si posicionabas, te veían. Ese vínculo se está debilitando.

A mediados de 2025, un estudio sobre las citas en los AI overviews encontró que el 76.1 por ciento de las URL citadas también aparecía en el top diez clásico. ([Ahrefs, julio de 2025](https://ahrefs.com/blog/search-rankings-ai-citations/)) En los escaneos que corremos hoy, en las categorías de nuestros propios clientes, la coincidencia es visiblemente menor, y se sigue desplazando. Espero que el próximo estudio público lo confirme.

Lo que significa que un reporte de ranking se está alejando de la pregunta que tu comprador realmente hace. Todavía te dice quién gana la página. Ya no es un indicador confiable de a quién nombran en la respuesta.

## Los motores no son una sola cosa

Tratar la "búsqueda con AI" como un solo canal es el error más común que veo en las presentaciones de estrategia.

Haz la misma pregunta de categoría en cuatro asistentes y obtienes cuatro formas distintas de respuesta. Uno devuelve una lista larga de fuentes citadas y casi nunca nombra a un proveedor. Otro nombra tres empresas con seguridad y casi no cita nada. Uno se apoya en lo que tenga una página de comparación rastreable. Otro se apoya en foros.

Estoy describiendo nuestros propios escaneos y no un estudio publicado, porque lo publicado sobre esto es escaso y en su mayoría lo producen proveedores. Pero el punto estructural no es sutil: un asistente es una superficie de investigación, donde lo que importa es ser una fuente citable, y otro es una superficie de recomendación, donde lo que importa es ser una marca nombrada. No son un solo canal y no responden al mismo trabajo.

## La parte que nadie quiere oír sobre los crawlers

Hay una asimetría económica debajo de todo esto. Cloudflare midió en 2025 la relación entre rastreos y referidos: aproximadamente 38,000 a uno para Anthropic, cerca de 1,091 a uno para OpenAI, 195 a uno para Perplexity, frente a 5 a uno para Google, con el entrenamiento generando alrededor del 80 por ciento de la actividad de bots de AI. ([Cloudflare, agosto de 2025](https://blog.cloudflare.com/crawlers-click-ai-bots-training/)) Cloudflare anota una salvedad que infla una de esas cifras, y sin duda los números se han movido desde entonces, pero la forma es correcta. El viejo trato (te rastreamos y te mandamos visitantes) ya no se sostiene a la misma tasa de cambio.

Dos consecuencias prácticas.

Primero, bloquear el entrenamiento no bloquea la recuperación al momento de responder, y son bots distintos. OpenAI documenta tres: uno para entrenamiento, uno para mostrar resultados en la búsqueda de ChatGPT y uno para las consultas que inicia el usuario, donde afirma que robots.txt puede no aplicar. ([OpenAI](https://developers.openai.com/api/docs/bots)) El control de Google cubre entrenamiento y grounding, pero no ofrece una forma de excluirse específicamente de los AI overviews. ([Google](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)) Si alguien de tu equipo bloqueó en bloque los crawlers de AI el año pasado para proteger contenido, revisa qué bloqueó en realidad.

Segundo, no gastes un sprint en llms.txt. De unos 38,000 dominios que publican uno válido, el 97 por ciento no recibió ni una sola solicitud de ese archivo en el mes estudiado, y la mayoría de las solicitudes que sí ocurrieron vinieron de agentes de código y herramientas de auditoría. ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)) Yo lo publico igual porque cuesta una hora. No se lo presentaría a una junta directiva como estrategia.

## Lo que sí parece funcionar

El ancla académica de este campo sigue siendo el paper original de generative engine optimization, que encontró que citar fuentes, agregar citas textuales y agregar estadísticas aumentaba la visibilidad hasta en un 40 por ciento en su benchmark. ([arXiv, 2023](https://arxiv.org/abs/2311.09735))

Es un resultado sospechosamente cómodo para cualquiera que escriba con cuidado, y coincide con lo que vemos:

- **Responde la pregunta en las primeras cien palabras**, en lenguaje sencillo, antes del contexto y las salvedades.
- **Ponle un número.** Específico, atribuido, con fecha. Los modelos buscan texto que puedan citar sin matizar.
- **Sé la fuente, no el resumen.** Datos originales, metodología original, tus propios números. Nada se cita por repetir el consenso.
- **Nómbrate de forma clara y consistente.** La confusión de entidades es una falla real. Si existen tres formas de escribir el nombre de tu empresa, estás dividiendo tu propia señal.
- **Mantén los datos consistentes en todas tus propiedades.** Contradecirte entre tu sitio, tu documentación y tus perfiles es la forma en que un modelo decide que no confía en nada de eso.

## Mide primero

No puedes gestionar esto desde Google Analytics. El tráfico de referidos desde un asistente es escaso o invisible, así que el único enfoque honesto es preguntarles directamente a los motores, una y otra vez, y registrar lo que dicen: la pregunta de categoría, la respuesta, qué marcas aparecen, qué fuentes se citan, en qué fecha, en qué modelo.

Ese es el ciclo alrededor del cual construimos unbound geo, y construirlo me enseñó lo que le diría a cualquiera que esté empezando: la medición no es el producto. Saber que no apareces vale muy poco. Saber en qué fuentes confía el motor en tu categoría, y convertirte en una de ellas, es el trabajo.

## El veredicto

La búsqueda no murió. La resumieron. El comprador sigue existiendo, sigue teniendo presupuesto, sigue teniendo el mismo problema. Solo que ahora lee un párrafo en lugar de escoger entre diez links.

La única pregunta que importa es si tu nombre está en ese párrafo. La mayoría de las empresas nunca lo ha revisado.
`,
  },
};

export default post;
