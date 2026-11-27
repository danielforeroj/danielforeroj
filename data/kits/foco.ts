import type { Kit } from './types';

// FOCO: el kit de foco y equipo. Videos es-03, es-18, es-19, es-28, es-29
// (guiones en C:/agents/studio/specs/faceless/semana/2026-11-30/es.md).

const kit: Kit = {
  word: 'FOCO',
  slug: 'foco',
  videos: [
    {
      id: 'es-03',
      lang: 'es',
      promise:
        'Comente FOCO y le mando el kit de foco y equipo, para que no mate una buena idea por falta de volumen.',
    },
    {
      id: 'es-18',
      lang: 'es',
      promise:
        'Comente FOCO y le mando el kit de foco y equipo, para que entre a un mercado nuevo por donde sí se compra.',
    },
    {
      id: 'es-19',
      lang: 'es',
      promise:
        'Comente FOCO y le mando el kit de foco y equipo, para que cada reunión termine con algo que se pueda medir.',
    },
    {
      id: 'es-28',
      lang: 'es',
      promise:
        'Comente FOCO y le mando el kit de foco y equipo, para que el próximo número que cite aguante en la sala.',
    },
    {
      id: 'es-29',
      lang: 'es',
      promise:
        'Comente FOCO y le mando el kit de foco y equipo, para que reconozca una deuda disfrazada antes de ceder parte de su empresa.',
    },
  ],
  content: {
    es: {
      title: 'El kit de foco y equipo',
      promise:
        'Cinco herramientas para decidir con datos y no con opiniones: pruebas con volumen, mercados nuevos, reuniones que dejan conductas, cifras que aguantan y acuerdos de capital que no esconden deuda.',
      minutes: 40,
      howTo: [
        'Cada sección responde a un video. Vaya directo a la que necesita hoy.',
        'Las listas guardan sus marcas en este navegador: puede volver y seguir donde iba.',
        'Las hojas se copian tal cual a Google Sheets o Excel, con fórmulas incluidas.',
        'Las plantillas se copian con un botón. Llene lo que está entre [CORCHETES].',
      ],
      sections: [
        // ---------------------------------------------------------------- es-03
        {
          id: 'volumen',
          title: 'Antes de matar una idea, dele volumen',
          videos: ['es-03'],
          intro:
            'Diseñe la prueba antes de empezar: tamaño, plazo y una sola métrica. Así la decisión sale de un número y no de diez intentos.',
          blocks: [
            {
              // Fuente: Alex Hormozi en el podcast de George Janko, episodio 159 [0:02:33 a 0:03:55], tal como lo cuenta el guion es-03.
              type: 'p',
              text:
                'Alex Hormozi cuenta que repartió 300 volantes para su gimnasio, no llegó nadie y lo dio por fracaso. Su mentor le preguntó de qué tamaño fue la prueba. Hormozi cuenta que ellos probaban con unos 1.500 volantes, y cuando algo funcionaba repartían 3.000 al día.',
            },
            { type: 'rule', text: 'Casi nada fracasa por mala idea. Fracasa por poco volumen.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Decida el tamaño de la prueba antes de empezar',
                  body: 'No diez mensajes. Cientos. Escriba el número en la ficha de abajo y no lo cambie a mitad de camino.',
                },
                {
                  title: 'Fije cuánto tiempo la va a sostener, y no la revise antes',
                  body: 'Ponga la fecha de revisión en el calendario. Mirar el resultado cada día lleva a matar la prueba antes de tiempo.',
                },
                {
                  title: 'Mida una sola cosa: respuestas por cada cien intentos',
                  body: 'Una métrica, definida antes. Si mide cinco cosas, siempre va a encontrar una que le dé la razón.',
                },
                {
                  title: 'Decida con el número contra el umbral que usted fijó',
                  body: 'Por encima de su umbral: escale el volumen. Por debajo, y con el volumen completo: cambie el mensaje o el canal, y pruebe otra vez con el mismo tamaño.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Ficha de la prueba (llénela antes del primer intento)',
              body: `PRUEBA: [nombre corto, ej. mensajes a clínicas en Medellín]
HIPÓTESIS: Si [hacemos esto] a [este público] por [este canal], [este porcentaje] responde.
CANAL: [WhatsApp, correo, llamada, volante, anuncio]
TAMAÑO DECIDIDO: [número de intentos, en cientos]
PLAZO: del [fecha de inicio] al [fecha de revisión]. No se revisa antes.
ÚNICA MÉTRICA: respuestas por cada 100 intentos. Cuenta como respuesta: [defina qué cuenta]
UMBRAL PARA SEGUIR: [respuestas por cada 100 que usted fija]
SI PASA EL UMBRAL: [cómo escala el volumen]
SI NO PASA: [qué cambia: mensaje, canal o público] y se repite con el mismo tamaño
RESPONSABLE: [nombre]
FIRMA DE QUIEN APRUEBA QUE NO SE MATA ANTES DE TIEMPO: [nombre]`,
            },
            {
              type: 'calc',
              id: 'volumen-calc',
              title: '¿Ya puede decidir?',
              inputs: [
                { id: 'intentos', label: 'Intentos hechos', value: 400, hint: 'Ejemplo. Ponga los suyos.' },
                { id: 'respuestas', label: 'Respuestas obtenidas', value: 6, hint: 'Ejemplo.' },
                {
                  id: 'umbral',
                  label: 'Su umbral: respuestas por cada 100 para seguir',
                  value: 2,
                  hint: 'Lo fija usted antes de empezar, según lo que vale un cliente para su negocio.',
                },
                { id: 'minimo', label: 'Tamaño decidido de la prueba', value: 500, unit: 'intentos' },
              ],
              outputs: [
                { label: 'Respuestas por cada 100 intentos', expr: 'respuestas / intentos * 100', format: 'number' },
                {
                  label: 'Intentos que faltan para el tamaño decidido (si es negativo, ya lo cumplió)',
                  expr: 'minimo - intentos',
                  format: 'number',
                },
              ],
              verdict: {
                expr: 'respuestas / intentos * 100 - umbral',
                pass: 'Está por encima de su umbral. Si ya cumplió el tamaño decidido, escale el volumen.',
                fail: 'Está por debajo de su umbral. Si todavía no cumple el tamaño decidido, siga: aún no tiene un número, tiene una opinión.',
              },
            },
            {
              type: 'sheet',
              id: 'volumen-registro',
              title: 'Registro de pruebas',
              columns: [
                'Prueba',
                'Canal',
                'Tamaño decidido',
                'Fecha de revisión',
                'Umbral (por cada 100)',
                'Intentos hechos',
                'Respuestas',
                'Respuestas por cada 100',
                'Decisión',
              ],
              rows: [
                ['Ejemplo: mensajes a clínicas', 'WhatsApp', '500', '[fecha]', '2', '500', '14', '=G2/F2*100', 'Escalar'],
                ['Ejemplo: correo a gerentes de compras', 'Correo', '800', '[fecha]', '1', '320', '1', '=G3/F3*100', 'Seguir hasta 800'],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
              ],
              note: 'Las filas de ejemplo son hipotéticas. No se decide una fila hasta que "Intentos hechos" llega a "Tamaño decidido".',
            },
            {
              type: 'template',
              title: 'Prompt: que su IA le revise la prueba antes de lanzarla',
              body: `Actúe como revisor de diseño de pruebas comerciales. Su trabajo es encontrar por qué esta prueba no va a permitir una decisión, no animarme.

CONTEXTO
Negocio: [qué vende y a quién]
Lo que vale un cliente nuevo para nosotros: [valor o margen aproximado]
Capacidad del equipo: [cuántos intentos por semana podemos hacer de verdad]

LA PRUEBA
[pegue aquí la ficha de la prueba llena]

REVISE Y RESPONDA EN ESTE ORDEN
1. ¿El tamaño decidido alcanza para distinguir una idea mala de una idea con poco volumen? Explique el razonamiento con mis propios números, no con promedios de la industria.
2. ¿Hay una sola métrica, y está definido qué cuenta como respuesta? Si hay ambigüedad, reescriba la definición.
3. ¿El plazo es sostenible con la capacidad del equipo? Si no, proponga el plazo mínimo realista.
4. ¿Qué podría hacer que matemos la prueba antes de tiempo? Lista de riesgos concretos.
5. Una versión corregida de la ficha, lista para copiar.

REGLAS
No invente tasas de respuesta "normales" ni cifras de referencia. Si necesita un dato que no le di, pregúntemelo al final en una lista.`,
            },
            {
              type: 'check',
              id: 'volumen-antes-de-matar',
              title: 'Antes de dar una idea por muerta',
              items: [
                'El tamaño de la prueba se decidió antes de empezar, y está escrito.',
                'Se llegó a ese tamaño. Si no, la prueba sigue.',
                'Se respetó la fecha de revisión: nadie la cerró antes.',
                'Se midió una sola cosa, definida desde el principio.',
                'El resultado se comparó con el umbral fijado antes, no con una sensación.',
                'Si no pasó, ya está escrito qué se cambia (mensaje, canal o público) para la siguiente prueba.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- es-18
        {
          id: 'mercado-nuevo',
          title: 'Entre a un mercado nuevo por donde sí se compra',
          videos: ['es-18'],
          intro:
            'Tres preguntas respondidas con compradores de allá antes de gastar en abrir. Sirve para otro país y también para otra ciudad.',
          blocks: [
            {
              // T36 (posturas-contrarias.md): los pagos, la confianza, la distribución, la regulación y el comportamiento del cliente funcionan distinto.
              type: 'p',
              text:
                'El producto es el mismo. Cambia todo lo demás: cómo paga la gente, en quién confía, quién distribuye y qué exige la regulación. Quien gana en un mercado nuevo entiende los rieles locales antes de traducir el catálogo.',
            },
            { type: 'rule', text: 'A un mercado nuevo no se entra con el mismo discurso traducido.' },
            {
              type: 'steps',
              items: [
                {
                  title: '¿Cómo paga su cliente allá?',
                  body: 'Tarjeta, transferencia, efectivo o cuotas. Si su cobro no encaja con la forma de pagar, la venta se cae al final.',
                },
                {
                  title: '¿Dónde decide?',
                  body: 'Muchas veces es un chat y una recomendación, no una página web. Ahí va su esfuerzo de venta.',
                },
                {
                  title: '¿Quién tiene ya su confianza?',
                  body: 'Un distribuidor, un gremio, un aliado local. Empiece por ahí en vez de construir confianza desde cero.',
                },
                {
                  title: 'Confirme qué exige la regulación',
                  body: 'Facturación, registros, permisos. Pregúntelo a alguien que opere allá y valídelo con un asesor local.',
                },
                {
                  title: 'Un solo país, primeros clientes que paguen, y ahí sí crezca',
                  body: 'La meta de la primera etapa son clientes que pagan, no una página traducida.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Mensaje para conseguir las cinco conversaciones',
              body: `Hola [nombre], [quién los conecta] me sugirió escribirle.

Estoy evaluando llevar [qué hace su empresa, en una línea] a [país o ciudad] y antes de invertir quiero entender cómo se compra allá. No le voy a vender nada.

¿Me regala 20 minutos esta semana o la próxima? Le pregunto cómo compra hoy [la categoría] y a quién le pregunta antes de decidir. Si le sirve, después le comparto lo que aprenda de las cinco conversaciones.

[Su nombre]`,
              note: 'Funciona mejor si lo manda el aliado local o alguien que el comprador ya conoce.',
            },
            {
              type: 'template',
              title: 'Guía para cada conversación (20 minutos)',
              body: `NO presente su producto hasta la pregunta 7.

1. Cuénteme la última vez que compró [la categoría]. ¿Qué compró y a quién?
2. ¿Cómo lo pagó? ¿Tarjeta, transferencia, efectivo, cuotas? ¿Por qué así?
3. ¿Dónde se enteró de la opción que escogió? ¿Dónde tomó la decisión: un chat, una llamada, una visita, una página?
4. ¿A quién le preguntó antes de comprar? ¿Qué le dijo?
5. ¿Qué papeles o requisitos le pidieron (factura, registro, contrato, garantía)?
6. ¿Qué lo haría desconfiar de un proveedor nuevo que viene de afuera?
7. [Ahora sí, una línea de su oferta.] Si se lo ofreciera mañana, ¿por dónde le gustaría recibirlo y cómo lo pagaría?
8. ¿A quién más debería preguntarle?

ANOTE LAS PALABRAS EXACTAS, no su interpretación.`,
            },
            {
              type: 'sheet',
              id: 'mercado-rieles',
              title: 'Mapa de rieles locales (una fila por conversación)',
              columns: [
                'Comprador (rol, sin nombre)',
                'País o ciudad',
                'Cómo paga',
                'Dónde decide',
                'En quién confía',
                'Requisitos que le pidieron',
                'Frase textual clave',
                '¿Compraría? (sí, no, depende)',
              ],
              rows: [
                ['Ejemplo: jefe de compras de una distribuidora', '[ciudad]', 'Transferencia a 30 días', 'Chat con el vendedor de siempre', 'Su gremio', 'Factura electrónica', '[sus palabras]', 'Depende'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
              ],
              note: 'La fila de ejemplo es hipotética. Si tres de cinco coinciden en cómo pagan o dónde deciden, ese es su riel de entrada.',
            },
            {
              type: 'template',
              title: 'Prompt: de cinco conversaciones a un plan de entrada',
              body: `Tengo las notas de cinco conversaciones con compradores de [país o ciudad] sobre [la categoría]. Quiero un plan de entrada basado solo en lo que ellos dijeron.

NOTAS
[pegue las notas o la hoja de rieles]

ENTREGUE
1. Una tabla: cómo pagan, dónde deciden, en quién confían, requisitos. Para cada celda, cuántos de los cinco lo dijeron y la frase textual que lo respalda.
2. El canal de entrada más probable y el aliado local con más confianza, con la evidencia.
3. Qué parte de mi oferta actual choca con lo que dijeron (forma de cobro, canal, discurso).
4. Las preguntas que siguen abiertas y a quién hacérselas.

REGLAS
Si algo no aparece en las notas, escriba "SIN DATO". No complete con lo que suele pasar en otros mercados ni con supuestos. No traduzca mi discurso actual: dígame qué cambiar.`,
            },
            {
              type: 'check',
              id: 'mercado-antes-de-abrir',
              title: 'Antes de gastar en abrir',
              items: [
                'Escogió un solo país o ciudad para empezar.',
                'Hizo cinco conversaciones con compradores de allá.',
                'Sabe cómo paga su cliente allá, con palabras de ellos y no con suposiciones.',
                'Sabe dónde decide (chat, recomendación, visita, página).',
                'Identificó quién ya tiene su confianza y habló con esa persona o empresa.',
                'Confirmó con alguien de allá qué exige la regulación.',
                'Su cobro encaja con la forma de pagar local.',
                'La meta de la primera etapa son clientes que paguen, no la página traducida.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- es-19
        {
          id: 'reuniones',
          title: 'Reuniones que terminan en algo que se puede medir',
          videos: ['es-19'],
          intro:
            'Traduzca cada palabra vaga a una conducta con verbo y fecha, y cierre con una pregunta. Funciona igual con un empleado, un socio o un proveedor.',
          blocks: [
            {
              // Fuente: Alex Hormozi en el podcast de George Janko, episodio 159 [1:39:07] y [1:41:07], tal como lo cuenta el guion es-19.
              type: 'p',
              text:
                'Si todos salen de acuerdo y el lunes nadie hace nada distinto, no falta compromiso. Falta una conducta concreta. Alex Hormozi lo arregla con una sola pregunta al final de cada reunión uno a uno: ¿qué quiere que haga como resultado de esta conversación?',
            },
            { type: 'rule', text: 'Si no se puede ver, no se puede pedir.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Cuando alguien diga una palabra vaga, pida la conducta',
                  body: 'Ante "más compromiso" o "mejor actitud", pregunte: ¿qué haría distinto, en concreto, una persona comprometida?',
                },
                {
                  title: 'Escriba esa conducta con verbo y con fecha',
                  body: 'No "mejorar la comunicación". "Enviar el reporte el viernes a las cinco".',
                },
                {
                  title: 'Cierre con la pregunta de Hormozi y anote la respuesta delante de todos',
                  body: '¿Qué quiere que haga como resultado de esta conversación? Se escribe en pantalla o en el acta mientras la otra persona mira.',
                },
                {
                  title: 'Hágala también al revés',
                  body: 'Pregúntele a su equipo qué quieren que usted haga distinto como resultado de la reunión, y anótelo igual.',
                },
                {
                  title: 'Revise en la siguiente reunión',
                  body: 'Primer punto de la agenda: las conductas de la vez pasada, cumplidas o no. Lo que se cumplió se reconoce en voz alta.',
                },
              ],
            },
            {
              type: 'compare',
              bad: {
                title: 'Palabra vaga',
                items: [
                  'Mejorar la comunicación',
                  'Más compromiso con los clientes',
                  'Mejor actitud en el equipo',
                  'Estar más pendiente de las ventas',
                ],
              },
              good: {
                title: 'Conducta con verbo y fecha (ejemplos)',
                items: [
                  'Enviar el reporte el viernes a las cinco',
                  'Responder cada mensaje de cliente el mismo día hábil, desde el lunes',
                  'Llegar a la reunión del lunes con los tres bloqueos de la semana escritos',
                  'Revisar el tablero de ventas cada martes a las nueve y escribir una línea en el grupo',
                ],
              },
            },
            {
              type: 'template',
              title: 'Cierre de reunión (los últimos 5 minutos)',
              body: `CIERRE: [nombre de la reunión], [fecha]

1. Revisión de la vez pasada
   [conducta] / [responsable] / ¿se cumplió? sí o no. Lo cumplido se reconoce.

2. Palabras vagas de hoy, traducidas
   "[palabra vaga]" se convierte en: [verbo] [qué] [para cuándo]

3. La pregunta, a cada persona
   "¿Qué quiere que haga como resultado de esta conversación?"
   [persona]: [respuesta, con verbo y fecha]

4. Al revés
   "¿Qué quieren que yo haga distinto como resultado de esta reunión?"
   [respuesta, con verbo y fecha]

5. Se lee en voz alta lo anotado antes de colgar o salir.`,
            },
            {
              type: 'template',
              title: 'Prompt: del acta o la transcripción a conductas medibles',
              body: `Le paso la transcripción o las notas de una reunión. Convierta lo acordado en conductas que se puedan verificar.

REUNIÓN
Tipo: [uno a uno, equipo, socio, proveedor]
Participantes: [nombres y roles]
Transcripción o notas:
[pegue aquí]

ENTREGUE
1. Tabla: acuerdo tal como se dijo / conducta (empieza con verbo) / responsable / fecha y hora / cómo se ve que se cumplió.
2. Lista de palabras vagas que quedaron sin traducir ("compromiso", "actitud", "más pendiente", "mejorar") con la frase exacta donde aparecen y una pregunta para convertir cada una en conducta.
3. Las respuestas a "¿qué quiere que haga como resultado de esta conversación?", si se hizo la pregunta. Si no se hizo, dígalo.

REGLAS
No invente responsables ni fechas. Si no se dijeron, escriba "FALTA" en la celda. No resuma la reunión: solo conductas y vacíos.`,
            },
            {
              type: 'sheet',
              id: 'reuniones-conductas',
              title: 'Tablero de conductas acordadas',
              columns: [
                'Fecha de la reunión',
                'Lo que se dijo',
                'Conducta (verbo)',
                'Responsable',
                'Para cuándo',
                'Cómo se ve que se cumplió',
                '¿Cumplido? (sí o no)',
              ],
              rows: [
                ['Ejemplo: [fecha]', 'Mejorar la comunicación con el cliente', 'Enviar el reporte semanal', '[nombre]', 'Viernes 5 p. m.', 'El correo llega al cliente con el reporte adjunto', ''],
                ['Ejemplo: [fecha]', 'Más compromiso con las ventas', 'Llamar a los 10 prospectos de la lista', '[nombre]', 'Miércoles', 'Cada llamada queda anotada en el CRM', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
              ],
              note: 'Las filas de ejemplo son hipotéticas. Si la columna "Cómo se ve que se cumplió" no se puede llenar, la conducta todavía está vaga.',
            },
            {
              type: 'check',
              id: 'reuniones-antes-de-cerrar',
              title: 'Antes de cerrar cualquier reunión',
              items: [
                'Cada acuerdo empieza con un verbo.',
                'Cada acuerdo tiene responsable y fecha.',
                'Ninguna palabra vaga quedó sin traducir a conducta.',
                'Se hizo la pregunta: ¿qué quiere que haga como resultado de esta conversación?',
                'Se hizo también al revés.',
                'Lo anotado se leyó en voz alta delante de todos.',
                'La revisión de estas conductas ya está en la agenda de la próxima reunión.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- es-28
        {
          id: 'cifras',
          title: 'Que el próximo número que cite aguante en la sala',
          videos: ['es-28'],
          intro:
            'Un método de tres revisiones para cualquier cifra que vaya a una junta, un pitch o una presentación de fin de año.',
          blocks: [
            {
              // T30 (posturas-contrarias.md) y su fuente: data/posts/what-we-got-wrong-about-agents.ts (2026-09-15),
              // que cita la crítica de abril de 2026: https://80000hours.org/podcast/episodes/ai-workplace-mit-study/
              type: 'p',
              text:
                'La cifra circula como "el 95 por ciento de los proyectos piloto de IA fracasan". El informe no habla de pilotos: habla de organizaciones que no vieron retorno. Su base son 52 entrevistas y 153 respuestas de encuesta recogidas en conferencias, y el propio informe se presenta como preliminar. Daniel también la repitió antes de leer cómo se midió.',
            },
            { type: 'rule', text: 'Revise cómo se midió antes de repetir la cifra.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Abra la fuente original y busque de cuánta gente salió',
                  body: 'No el artículo que la cita: el informe. Busque la sección de metodología y anote el tamaño de la muestra.',
                },
                {
                  title: 'Mire qué se midió',
                  body: 'Proyectos, empresas, personas o intenciones. "El 95 por ciento de las organizaciones" y "el 95 por ciento de los pilotos" son afirmaciones distintas.',
                },
                {
                  title: 'Distinga medición, encuesta y pronóstico',
                  body: 'Una medición cuenta lo que pasó. Una encuesta cuenta lo que la gente dice. Un pronóstico es la opinión de un analista. Las tres se citan como si fueran lo mismo.',
                },
                {
                  title: 'Desconfíe más cuando el dato le da la razón',
                  body: 'Ahí es cuando se revisa dos veces. Las cifras que confirman lo que ya queríamos decir son las que menos revisamos.',
                },
                {
                  title: 'Ponga debajo del número la fuente y el tamaño de la muestra',
                  body: 'En la diapositiva, no en un anexo. Si no puede llenar el pie, no use la cifra.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'cifras-registro',
              title: 'Registro de cifras de su presentación',
              columns: [
                'Cifra tal como la va a decir',
                'Dónde la vio',
                'Fuente original (enlace)',
                'Qué se midió (proyectos, empresas, personas, intenciones)',
                'Tamaño de la muestra',
                'Tipo (medición, encuesta, pronóstico)',
                '¿Le da la razón? (sí o no)',
                '¿Revisada dos veces?',
                'Pie para la diapositiva',
              ],
              rows: [
                [
                  'Ejemplo: "95 por ciento de los pilotos de IA fracasan"',
                  'Redes y presentaciones',
                  '[enlace al informe original]',
                  'Organizaciones sin retorno, no pilotos',
                  '52 entrevistas y 153 respuestas de encuesta',
                  'Encuesta preliminar',
                  'Sí',
                  'Sí',
                  'No usar como está. Si se usa, decir lo que mide de verdad.',
                ],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
              ],
              note: 'Una fila por número que aparezca en su presentación. Si "Le da la razón" dice sí, la columna "Revisada dos veces" no puede quedar vacía.',
            },
            {
              type: 'template',
              title: 'Pie de cifra para la diapositiva',
              body: `Fuente: [organización que midió], "[título del informe]", [mes y año]. Muestra: [número] [entrevistas, encuestas, empresas, personas]. Mide: [qué se midió, en una línea]. Tipo: [medición, encuesta o pronóstico].`,
            },
            {
              type: 'template',
              title: 'Prompt: auditoría de las cifras de una presentación',
              body: `Voy a presentar esto en [junta, pitch, cierre de año] ante [quién]. Necesito que cada número aguante una pregunta incómoda.

PRESENTACIÓN (texto de las diapositivas)
[pegue aquí]

FUENTES (texto de la metodología de cada informe, no el artículo que lo cita)
[pegue aquí, una por cifra]

PARA CADA CIFRA ENTREGUE
1. La afirmación tal como está en mi diapositiva.
2. Lo que la fuente mide de verdad: qué unidad (proyectos, empresas, personas, intenciones), qué muestra y cómo se recogió.
3. Tipo: medición, encuesta o pronóstico.
4. Veredicto: coincide, exagera o dice otra cosa. Si exagera o dice otra cosa, reescriba la frase para que diga solo lo que la fuente sostiene.
5. La pregunta más difícil que alguien en la sala podría hacer sobre ese número.
6. El pie de cifra listo: fuente, muestra, qué mide.

REGLAS
Si no le pegué el texto de la fuente de una cifra, márquela "SIN FUENTE VERIFICABLE" y no la valide con lo que usted recuerde. No agregue cifras nuevas.`,
            },
            {
              type: 'check',
              id: 'cifras-antes-de-presentar',
              title: 'Antes de presentar',
              items: [
                'Cada número tiene la fuente original abierta, no el artículo que lo cita.',
                'Sé de cuánta gente o de cuántas empresas salió cada cifra.',
                'Sé qué se midió: proyectos, empresas, personas o intenciones.',
                'Ningún pronóstico ni encuesta aparece como si fuera una medición.',
                'Revisé dos veces las cifras que me dan la razón.',
                'Cada número tiene debajo la fuente y el tamaño de la muestra.',
                'Quité las cifras que no pude verificar.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- es-29
        {
          id: 'deuda-disfrazada',
          title: 'Reconozca una deuda disfrazada antes de ceder acciones',
          videos: ['es-29'],
          intro:
            'Tres cláusulas para buscar en cualquier acuerdo con un socio capitalista. Si aparece una, está negociando un préstamo. No es asesoría legal: que un abogado lea el borrador final.',
          blocks: [
            {
              // T39 (posturas-contrarias.md): una deuda no es capital que merezca equity. Daniel, 2026-09-24.
              type: 'p',
              text:
                'Las acciones son para quien corre el riesgo con usted. Quien quiere su plata de vuelta con retorno fijo, pase lo que pase, está prestando. Endeudarse no tiene nada de malo. Lo malo es pagar la deuda dos veces: con intereses y con parte de su empresa.',
            },
            { type: 'rule', text: 'Una deuda disfrazada no merece acciones.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Busque un retorno mínimo garantizado',
                  body: 'Un porcentaje o un monto que se le paga al inversionista sin importar cómo le vaya al negocio.',
                },
                {
                  title: 'Busque una obligación de recomprarle su parte en una fecha',
                  body: 'Que usted o la empresa tengan que comprarle las acciones de vuelta en un plazo o a un precio fijado.',
                },
                {
                  title: 'Pregunte quién pierde si al negocio le va mal',
                  body: 'Si usted pierde y él cobra igual, es deuda.',
                },
                {
                  title: 'Si es deuda, negóciela como deuda',
                  body: 'Con tasa, con plazo y sin entregar acciones.',
                },
                {
                  title: 'Que un abogado lea el borrador final antes de firmar',
                  body: 'Lleve la hoja de abajo llena: la revisión sale más rápida y más precisa.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'deuda-clausulas',
              title: 'Revisión del borrador, cláusula por cláusula',
              columns: [
                'Cláusula (número)',
                'Texto literal',
                '¿Retorno mínimo garantizado? (sí o no)',
                '¿Recompra obligatoria con fecha? (sí o no)',
                'Si al negocio le va mal, ¿quién pierde?',
                'Lectura (capital o deuda)',
                'Pregunta para el abogado',
              ],
              rows: [
                ['Ejemplo: 4.2', '[copie el texto]', 'Sí', 'No', 'Solo el fundador', 'Deuda', '¿Esta cláusula convierte el aporte en un préstamo?'],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
              ],
              note: 'La fila de ejemplo es hipotética. Basta un sí en cualquiera de las dos columnas del medio para tratar el acuerdo como deuda.',
            },
            {
              type: 'calc',
              id: 'deuda-dos-veces',
              title: 'Cuánto le cuesta pagar la deuda dos veces',
              inputs: [
                { id: 'monto', label: 'Monto que le entregan', value: 100000, unit: 'USD', hint: 'Ejemplo. Ponga los suyos.' },
                { id: 'tasa', label: 'Retorno garantizado al año', value: 12, unit: '%', hint: 'Ejemplo. Use el que dice el borrador.' },
                { id: 'anos', label: 'Años hasta la recompra o el pago', value: 3 },
                { id: 'acciones', label: 'Porcentaje de la empresa que le piden', value: 10, unit: '%' },
                {
                  id: 'valor',
                  label: 'Lo que usted cree que vale la empresa al final del plazo',
                  value: 2000000,
                  unit: 'USD',
                  hint: 'Su propia estimación.',
                },
              ],
              outputs: [
                { label: 'Intereses que paga (simples, aproximado)', expr: 'monto * tasa / 100 * anos', format: 'money' },
                { label: 'Valor de las acciones que cede', expr: 'valor * acciones / 100', format: 'money' },
                {
                  label: 'Costo total del acuerdo disfrazado (intereses más acciones)',
                  expr: 'monto * tasa / 100 * anos + valor * acciones / 100',
                  format: 'money',
                },
                {
                  label: 'Lo que se ahorra si lo negocia como préstamo, sin acciones',
                  expr: 'valor * acciones / 100',
                  format: 'money',
                },
              ],
            },
            {
              type: 'template',
              title: 'Prompt: busque condiciones de prestamista en el borrador',
              body: `Le paso el borrador de un acuerdo con un inversionista. No le pido opinión legal: le pido que encuentre las cláusulas que hacen que el inversionista se comporte como prestamista y no como socio.

BORRADOR
[pegue el texto completo]

BUSQUE, AUNQUE USEN OTRO NOMBRE
1. Cualquier retorno mínimo o garantizado al inversionista, sin importar el resultado del negocio.
2. Cualquier obligación mía o de la empresa de recomprarle su participación en una fecha o a un precio fijado.
3. Cualquier mecanismo por el que, si al negocio le va mal, el inversionista cobra igual y yo pierdo.

ENTREGUE
Una tabla: número de cláusula / texto literal / cuál de las tres condiciones cumple / por qué / pregunta concreta para mi abogado.
Al final, una línea: "Se comporta como capital" o "Se comporta como deuda", con las cláusulas que lo sostienen.

REGLAS
Cite el texto literal. Si una cláusula es ambigua, dígalo y conviértala en pregunta para el abogado. No me recomiende firmar ni no firmar.`,
            },
            {
              type: 'template',
              title: 'Mensaje: proponer que se negocie como préstamo',
              body: `Hola [nombre],

Gracias por el borrador. Lo revisé con cuidado y veo que incluye [un retorno garantizado del X / una recompra obligatoria en (fecha)]. Con esas condiciones, el riesgo queda de nuestro lado y su retorno queda asegurado, que es como funciona un préstamo.

Me parece justo para los dos que lo estructuremos así: un préstamo de [monto] con una tasa de [tasa] y un plazo de [plazo], sin participación accionaria. Si prefiere entrar como socio, con acciones, conversemos una versión sin retorno garantizado ni recompra, donde los dos ganamos o perdemos juntos.

¿Le parece si lo hablamos [día y hora]?

[Su nombre]`,
              note: 'Antes de enviarlo, que su abogado revise los términos que propone.',
            },
            {
              type: 'check',
              id: 'deuda-antes-de-firmar',
              title: 'Antes de firmar cualquier acuerdo de capital',
              items: [
                'Busqué un retorno mínimo garantizado en todo el borrador.',
                'Busqué una obligación de recompra con fecha o precio fijado.',
                'Respondí por escrito quién pierde si al negocio le va mal.',
                'Si apareció alguna de las tres, propuse negociarlo como deuda: tasa, plazo y sin acciones.',
                'Calculé lo que me costaría pagar la deuda dos veces.',
                'Un abogado leyó el borrador final antes de firmar.',
              ],
            },
          ],
        },
      ],
      next: {
        text: 'Si quiere saber dónde se le está yendo el crecimiento a su empresa, empiece por el diagnóstico.',
        cta: 'Hacer el diagnóstico de crecimiento',
        page: 'crecer',
      },
    },
  },
};

export default kit;
