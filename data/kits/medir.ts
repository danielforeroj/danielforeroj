import type { Kit } from './types';

// MEDIR: el kit para poner la IA a producir plata (7 videos en espanol).
// Fuentes de cada cifra:
// * 71,9% / 37,7% (Colombia): T01, posturas-contrarias.md, desde data/posts/ai-for-businesses-that-already-work.ts.
// * 59% de las pymes sin impacto (region): T35, misma fuente.
// * Cinco pasos: T04. Tres numeros en 30 dias y el ejemplo 20 h x 30.000 = 600.000 contra 200.000: T03 y guion es-06.
// * 20 a 50 casos reales: T06, desde data/posts/evals-are-the-new-qa.ts.
// * 8.424 dolares en octubre de 2026: ev-01. Regla pequeno / mediano / grande: ev-02.

const kit: Kit = {
  word: 'MEDIR',
  slug: 'medir',
  videos: [
    {
      id: 'es-01',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que en 30 días sepa si su IA se paga sola.',
    },
    {
      id: 'es-02',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que lo automatice sin copiar el desorden.',
    },
    {
      id: 'es-06',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que en 30 días sepa si la herramienta se queda o se apaga.',
    },
    {
      id: 'es-08',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que deje de perseguir el modelo de moda.',
    },
    {
      id: 'es-11',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que su próxima herramienta tenga algo ordenado que leer.',
    },
    {
      id: 'es-14',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que sepa cuántas veces acierta una herramienta antes de pagarla.',
    },
    {
      id: 'es-16',
      lang: 'es',
      promise:
        'Comente MEDIR y le mando el kit para poner la IA a producir plata, para que deje de pagar el modelo más caro por tareas que hace el pequeño.',
    },
  ],
  content: {
    es: {
      title: 'El kit para poner la IA a producir plata',
      promise:
        'Escoja una tarea, ordénela en cinco pasos, mídala con reloj y en 30 días sepa en plata si su IA se paga sola o se apaga.',
      minutes: 45,
      howTo: [
        'Empiece por la sección 1 esta semana: el inventario de tareas y la calculadora del día 30.',
        'Cada tabla se copia con un botón y se pega en Google Sheets o Excel, con las fórmulas.',
        'Los prompts traen [CORCHETES] para lo que usted llena. Péguelos en Claude o ChatGPT tal cual.',
        'Las secciones 4 a 7 son para cuando la primera tarea ya está medida: casos de prueba, datos y qué modelo hace qué.',
      ],
      sections: [
        // es-01
        {
          id: 'se-paga-sola',
          title: 'Una tarea, medida, que se pague sola',
          videos: ['es-01'],
          intro:
            'Del uso suelto de su equipo a una sola tarea medida. Al final de esta sección tiene la tarea escogida, sus horas de hoy y la cuenta que hará el día 30.',
          blocks: [
            {
              type: 'p',
              // T01: posturas-contrarias.md, fuente data/posts/ai-for-businesses-that-already-work.ts
              text: 'En Colombia, 71,9 por ciento de las empresas subió su presupuesto de IA y solo 37,7 por ciento la integró de verdad en la operación diaria. Lo que falta no es otra herramienta: es que una tarea concreta pase a ser parte del proceso, y que alguien la mida.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Pregúntele a su equipo qué ya hace con IA por su cuenta',
                  body: 'Use el mensaje de abajo. Pida tareas concretas, no opiniones sobre la IA.',
                },
                {
                  title: 'Llene el inventario',
                  body: 'Una fila por tarea, con cuántas veces se hace al mes y cuánto toma cada vez. La hoja calcula las horas al mes.',
                },
                {
                  title: 'Escoja una sola',
                  body: 'La que más horas suma al mes y más se repite igual. Escriba sus pasos con la prueba de la sección 2: si no caben en cinco, todavía no se automatiza, y pasa a la siguiente de la lista.',
                },
                {
                  title: 'Mida las horas de hoy antes de prender nada',
                  body: 'Con reloj, con la bitácora de la sección 3. Sin esa línea base no hay forma de saber nada el día 30.',
                },
                {
                  title: 'El día 30, mida otra vez y haga la cuenta',
                  body: 'Las mismas horas, contadas igual, en la calculadora de abajo. Si da positivo, se queda. Si da negativo, o nadie contó las horas, se apaga.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Mensaje al equipo: qué ya hace con IA',
              body: `Hola, equipo. Estoy armando la lista de tareas en las que ya usamos IA, para escoger una y volverla parte del proceso de verdad. No es una evaluación de nadie.

Respóndame antes del [DÍA], con una línea por tarea:
1. La tarea, concreta (ejemplo: "resumir los correos de proveedores del día", no "redactar").
2. Qué herramienta usa (o si la hace sin IA y cree que se podría).
3. Cuántas veces la hace al mes.
4. Cuántos minutos le toma cada vez, más o menos.
5. Si se hace igual cada vez o si "depende".

Si hay una tarea que repite mucho y le quita tiempo, aunque hoy no use IA para ella, póngala también.

Gracias, [SU NOMBRE]`,
            },
            {
              type: 'sheet',
              id: 'inventario-tareas',
              title: 'Inventario de tareas con IA',
              columns: [
                'Tarea',
                'Quién la hace',
                'Herramienta que usa hoy',
                'Veces al mes',
                'Minutos por vez',
                'Horas al mes',
                '¿Se hace igual cada vez? (Sí/No)',
                'Pasos que tiene (estimado)',
              ],
              rows: [
                ['Ejemplo: conciliar facturas de proveedores', 'Asistente contable', 'Ninguna', '40', '15', '=D2*E2/60', 'Sí', '5'],
                ['Ejemplo: responder cotizaciones por correo', 'Comercial', 'Chat de IA, copia y pega', '60', '12', '=D3*E3/60', 'No', '8'],
                ['', '', '', '', '', '=D4*E4/60', '', ''],
                ['', '', '', '', '', '=D5*E5/60', '', ''],
                ['', '', '', '', '', '=D6*E6/60', '', ''],
                ['', '', '', '', '', '=D7*E7/60', '', ''],
              ],
              note: 'Las dos primeras filas son ejemplos inventados: bórrelas. Ordene por "Horas al mes" y escoja la primera que diga Sí y tenga cinco pasos o menos.',
            },
            {
              type: 'calc',
              id: 'calc-se-paga-sola',
              title: 'La cuenta del día 30: ¿se paga sola?',
              inputs: [
                {
                  id: 'horasAntes',
                  label: 'Horas al mes antes de la herramienta',
                  value: 30,
                  unit: 'h',
                  hint: 'Contadas con reloj antes de prenderla, no de memoria.',
                },
                {
                  id: 'horasAhora',
                  label: 'Horas al mes con la herramienta',
                  value: 10,
                  unit: 'h',
                  hint: 'Contadas igual, incluido el tiempo de revisar y corregir lo que entrega la IA.',
                },
                {
                  id: 'valorHora',
                  label: 'Lo que vale una hora de esa persona',
                  value: 30000,
                  unit: '$',
                  hint: 'Su costo mensual total con prestaciones, dividido entre las horas que trabaja al mes.',
                },
                {
                  id: 'factura',
                  label: 'Factura mensual de la herramienta',
                  value: 200000,
                  unit: '$',
                  hint: 'Todo lo que cobra al mes: licencias, uso, integraciones.',
                },
                {
                  id: 'umbral',
                  label: 'Su umbral: lo mínimo que tiene que dejar al mes',
                  value: 0,
                  unit: '$',
                  hint: 'Lo pone usted. Con 0, basta con que la resta dé positiva.',
                },
              ],
              outputs: [
                { label: 'Horas ahorradas al mes', expr: 'horasAntes-horasAhora', format: 'hours' },
                { label: 'Ahorro en plata al mes', expr: '(horasAntes-horasAhora)*valorHora', format: 'money' },
                { label: 'Resultado neto al mes (ahorro menos factura)', expr: '(horasAntes-horasAhora)*valorHora-factura', format: 'money' },
                { label: 'Pesos ahorrados por cada peso de factura', expr: '(horasAntes-horasAhora)*valorHora/factura', format: 'number' },
              ],
              verdict: {
                expr: '(horasAntes-horasAhora)*valorHora-factura-umbral',
                pass: 'Se queda: el ahorro paga la factura y deja lo que usted exige.',
                fail: 'Se apaga, o se cambia de tarea: el ahorro no alcanza a pagar la factura con su umbral.',
              },
            },
            {
              type: 'p',
              // Ejemplo literal del guion es-06 (T03).
              text: 'Los valores que trae la calculadora son el ejemplo del video: 20 horas ahorradas a 30.000 pesos la hora son 600.000 pesos, contra una herramienta de 200.000. Cámbielos por los suyos.',
            },
          ],
        },

        // es-02
        {
          id: 'cinco-pasos',
          title: 'La prueba de los cinco pasos antes de automatizar',
          videos: ['es-02'],
          intro:
            'Una tarde con la persona que hace la tarea. Sale con el proceso escrito en cinco pasos, cada "depende" convertido en regla, y la instrucción que le va a dar a la herramienta.',
          blocks: [
            {
              type: 'rule',
              // T04
              text: 'Si no cabe en cinco pasos claros, no se automatiza todavía. La IA no ordena el desorden: lo copia, y a toda velocidad.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Siéntese con quien hace la tarea, no con su jefe',
                  body: 'Pídale que la haga frente a usted con un caso real. Grabe la conversación si puede: la va a pasar por el prompt de abajo.',
                },
                {
                  title: 'Escriba los pasos, uno por línea',
                  body: 'Como si se los explicara a alguien nuevo. Un verbo por paso, con el dato que entra y lo que sale.',
                },
                {
                  title: 'Cuéntelos',
                  body: 'Si pasan de cinco, o si alguno dice "depende", ese proceso todavía no está listo.',
                },
                {
                  title: 'Resuelva cada "depende" con una regla escrita',
                  body: 'Quién decide, con qué dato y en qué caso. Si nadie sabe la regla, esa es la conversación pendiente, no la herramienta.',
                },
                {
                  title: 'Pruébelo con alguien que nunca hizo la tarea',
                  body: 'Si la hace con la hoja y sin preguntar, la herramienta también tiene algo que seguir. Ahí sí la conecta, con la hoja como instrucción.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Prompt: de la explicación grabada a cinco pasos',
              body: `Actúe como analista de procesos. Le voy a pegar la transcripción de una persona explicando cómo hace una tarea en mi empresa. Su trabajo es convertirla en un proceso que se pueda automatizar, sin inventar nada.

Contexto:
- Empresa: [QUÉ HACE SU EMPRESA, EN UNA LÍNEA]
- Tarea: [NOMBRE DE LA TAREA]
- Quién la hace hoy: [CARGO]
- Para qué sirve el resultado: [QUIÉN LO USA Y PARA QUÉ]

Entregue, en este orden:
1. Una tabla con columnas: Paso | Qué se hace (empieza con un verbo) | Quién | Dato que entra | Qué sale.
2. La lista de cada punto donde la persona dijo "depende", "a veces", "según", "si es urgente" o algo parecido, con la frase exacta de la transcripción.
3. Para cada uno, la pregunta que yo tengo que responder para volverlo regla: quién decide, con qué dato y en qué caso.
4. Un veredicto: "Cabe en cinco pasos" o "No cabe todavía", y por qué.

Reglas:
- No invente reglas ni pasos que la persona no dijo. Si falta información, escriba "FALTA:" y la pregunta.
- No junte dos pasos distintos en uno para que quepan en cinco.
- No proponga herramientas todavía.

Transcripción:
[PEGUE AQUÍ LA TRANSCRIPCIÓN]`,
            },
            {
              type: 'sheet',
              id: 'mapa-proceso',
              title: 'Mapa del proceso en cinco pasos',
              columns: [
                'Paso',
                'Qué se hace (un verbo)',
                'Quién',
                'Dato que entra',
                'Qué sale',
                '¿Dice "depende"? (Sí/No)',
                'Regla que lo resuelve (quién decide, con qué dato, en qué caso)',
              ],
              rows: [
                ['1', 'Ejemplo: descargar las facturas del correo de proveedores', 'Asistente contable', 'Correos del día', 'PDF en la carpeta del mes', 'No', ''],
                ['2', 'Ejemplo: cruzar cada factura con la orden de compra', 'Asistente contable', 'PDF y orden de compra', 'Factura marcada OK o con diferencia', 'Sí', 'Ejemplo: si la diferencia pasa de [SU MONTO], decide el jefe de compras con la orden original'],
                ['3', '', '', '', '', '', ''],
                ['4', '', '', '', '', '', ''],
                ['5', '', '', '', '', '', ''],
              ],
              note: 'Las filas de ejemplo son hipotéticas. Si necesita una fila 6, el proceso todavía no está listo: vuelva a la conversación con quien lo hace.',
            },
            {
              type: 'check',
              id: 'listo-para-automatizar',
              title: 'Listo para automatizar cuando...',
              items: [
                'El proceso cabe en cinco pasos o menos, sin juntar pasos a la fuerza.',
                'Cada paso empieza con un verbo y tiene un dato que entra y algo que sale.',
                'No queda ningún "depende" sin su regla escrita.',
                'Cada regla dice quién decide, con qué dato y en qué caso.',
                'Alguien que nunca hizo la tarea la hizo con la hoja, sin preguntar.',
                'Está escrito qué pasa cuando llega un caso que no encaja en ninguna regla, y a quién va.',
                'Las horas de hoy ya se midieron con reloj (sección 3).',
              ],
            },
          ],
        },

        // es-06
        {
          id: 'tres-numeros',
          title: 'Tres números en 30 días: se queda o se apaga',
          videos: ['es-06'],
          intro:
            'El protocolo para contar las horas igual antes y después, la hoja que da la decisión, y el mensaje para su socio, su junta o su contador.',
          blocks: [
            {
              type: 'rule',
              // T03
              text: 'Horas antes, horas ahora y la factura. Tres números en la misma moneda, en el mismo mes.',
            },
            {
              type: 'compare',
              bad: {
                title: 'Lo que no paga la herramienta',
                items: [
                  'El equipo dice que rinde más.',
                  'Horas estimadas de memoria.',
                  'Empezar a medir después de prender la herramienta.',
                  'Contar lo que tarda la IA y olvidar el tiempo de revisar y corregir.',
                  'Comparar horas contra pesos.',
                ],
              },
              good: {
                title: 'Lo que sí',
                items: [
                  'Horas contadas con reloj, un mes antes de prenderla.',
                  'El mismo método de conteo el día 30.',
                  'Revisión y correcciones dentro de las horas con la herramienta.',
                  'Horas ahorradas por el valor de la hora, al lado de la factura del mismo mes.',
                  'Una decisión escrita el día 30: se queda o se apaga.',
                ],
              },
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Antes de prender la herramienta: cuente con reloj',
                  body: 'Cada vez que se hace la tarea, una fila en la bitácora con hora de inicio y de fin. Un mes completo, o la semana multiplicada por las semanas del mes si la tarea es estable.',
                },
                {
                  title: 'Prenda la herramienta y siga contando igual',
                  body: 'La misma persona, la misma tarea, la misma bitácora. El tiempo de revisar lo que entrega la IA también cuenta.',
                },
                {
                  title: 'A los 30 días, haga la resta en plata',
                  body: 'Horas ahorradas por lo que vale una hora de esa persona, al lado de la factura mensual. La hoja de decisión y la calculadora de la sección 1 hacen la cuenta.',
                },
                {
                  title: 'Decida por escrito',
                  body: 'Si la resta da positiva, se queda. Si da negativa, o si nadie contó las horas, se apaga, por buena que haya sido la demo.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'bitacora-reloj',
              title: 'Bitácora con reloj (una fila cada vez que se hace la tarea)',
              columns: [
                'Fecha',
                'Tarea',
                'Periodo (Antes/Después)',
                'Quién',
                'Hora de inicio',
                'Hora de fin',
                'Minutos',
                '¿Incluye revisar lo de la IA? (Sí/No)',
              ],
              rows: [
                ['', '', 'Antes', '', '', '', '=(F2-E2)*1440', ''],
                ['', '', 'Antes', '', '', '', '=(F3-E3)*1440', ''],
                ['', '', 'Antes', '', '', '', '=(F4-E4)*1440', ''],
                ['', '', 'Después', '', '', '', '=(F5-E5)*1440', ''],
                ['', '', 'Después', '', '', '', '=(F6-E6)*1440', ''],
                ['', '', 'Después', '', '', '', '=(F7-E7)*1440', ''],
              ],
              note: 'Escriba las horas como hora (9:15, 9:40) y la columna Minutos se calcula sola. Sume los minutos de cada periodo y divida entre 60 para tener las horas del mes.',
            },
            {
              type: 'sheet',
              id: 'decision-30-dias',
              title: 'Decisión del día 30',
              columns: [
                'Herramienta',
                'Tarea',
                'Horas al mes antes',
                'Horas al mes ahora',
                'Valor de la hora',
                'Factura mensual',
                'Ahorro en plata',
                'Resultado neto',
                'Decisión (Se queda/Se apaga)',
              ],
              rows: [
                ['Ejemplo del video', '20 horas ahorradas', '30', '10', '30000', '200000', '=(C2-D2)*E2', '=G2-F2', 'Se queda'],
                ['', '', '', '', '', '', '=(C3-D3)*E3', '=G3-F3', ''],
                ['', '', '', '', '', '', '=(C4-D4)*E4', '=G4-F4', ''],
                ['', '', '', '', '', '', '=(C5-D5)*E5', '=G5-F5', ''],
              ],
              note: 'Resultado neto positivo: se queda. Negativo, o sin horas contadas: se apaga. Una fila por herramienta que esté pagando hoy.',
            },
            {
              type: 'template',
              title: 'Mensaje para su socio, su junta o su contador',
              body: `Asunto: [HERRAMIENTA], resultado de 30 días

Medimos [TAREA] durante 30 días antes de usar [HERRAMIENTA] y 30 días con ella, con el mismo método (bitácora con hora de inicio y fin, incluido el tiempo de revisar lo que entrega).

- Horas al mes antes: [HORAS ANTES]
- Horas al mes ahora: [HORAS AHORA]
- Valor de la hora de quien la hace: [VALOR HORA]
- Ahorro en plata al mes: [AHORRO]
- Factura mensual de la herramienta: [FACTURA]
- Resultado neto al mes: [NETO]

Decisión: [SE QUEDA / SE APAGA].
[SI SE QUEDA: Las horas liberadas van a (TAREA O RESPONSABLE). Volvemos a medir el (FECHA).]
[SI SE APAGA: Cancelamos el (FECHA) y probamos con (SIGUIENTE TAREA DEL INVENTARIO).]

La bitácora está en [ENLACE].`,
            },
          ],
        },

        // es-08
        {
          id: 'cualquier-modelo',
          title: 'Lo que le sirve con cualquier modelo',
          videos: ['es-08'],
          intro:
            'Tres cosas que no se vencen cuando cambia el nombre de moda: una lista fija de casos, el documento que le explica su negocio a la IA y la regla de qué modelo hace qué. Con ellas, un modelo nuevo es una prueba de una tarde.',
          blocks: [
            {
              type: 'p',
              // T17
              text: 'Los nombres cambian cada semana. Lo que decide el resultado casi no cambia: qué información le da, qué le pide y cómo revisa lo que entrega.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Arme la lista fija de casos',
                  body: 'Entre 20 y 50 casos reales con su respuesta correcta. La hoja está en la sección 6. Es la misma lista para cualquier herramienta, hoy y el año que viene.',
                },
                {
                  title: 'Escriba el documento de contexto de su negocio',
                  body: 'Una sola versión, con dueño y fecha de revisión. Se pega al inicio de cada conversación o se carga como instrucción del proyecto.',
                },
                {
                  title: 'Escriba la regla de qué tareas van al modelo barato y cuáles al caro',
                  body: 'La regla y la hoja están en la sección 7.',
                },
                {
                  title: 'Cuando salga un modelo nuevo, una tarde y no una reunión',
                  body: 'Corra la lista de casos con el mismo documento de contexto. Si acierta más, o igual por menos plata, cambia. Si no, sigue con lo que tiene.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Documento de contexto: su negocio explicado a la IA',
              body: `# Contexto de [NOMBRE DE LA EMPRESA]
Versión: [FECHA]. Dueño: [PERSONA]. Se revisa cada [FRECUENCIA].

## Qué hacemos
[QUÉ VENDE, A QUIÉN, EN QUÉ PAÍSES, EN UNA O DOS LÍNEAS]

## Clientes
- Cliente típico: [CARGO, TIPO DE EMPRESA, TAMAÑO]
- Lo que nos compran y por qué: [MOTIVOS REALES, CON SUS PALABRAS]
- Lo que nunca les ofrecemos: [LÍMITES]

## Cómo hablamos
- Trato: [USTED O TUTEO]. Tono: [DIRECTO, FORMAL...].
- Palabras que usamos: [LISTA]
- Palabras que no usamos nunca: [LISTA]

## Datos que la IA puede dar por ciertos
- Precios vigentes: [ENLACE O TABLA, CON FECHA]
- Tiempos de entrega, horarios, políticas: [LISTA]

## Lo que la IA no puede hacer nunca
- Inventar precios, plazos, cifras o nombres de clientes. Si no está aquí, responde "no lo sé" y pregunta.
- Prometer descuentos, fechas o condiciones que no estén escritas en este documento.
- [OTROS LÍMITES DE SU EMPRESA]

## A quién se escala
- Un cliente molesto, una excepción, algo fuera de este documento: [PERSONA Y CANAL]`,
              note: 'Una sola versión viva. Si cada persona del equipo tiene su propio prompt, la herramienta da una respuesta distinta a cada uno.',
            },
            {
              type: 'template',
              title: 'Agenda de la prueba de una tarde para un modelo nuevo',
              body: `Prueba de [MODELO O HERRAMIENTA NUEVA] contra [LO QUE USAMOS HOY]
Fecha: [FECHA]. Responsable: [PERSONA]. Duración: una tarde.

1. Mismo documento de contexto, misma instrucción, mismos casos (lista fija, sección 6). No se ajusta nada para el modelo nuevo.
2. Correr los [N] casos en los dos. Guardar cada respuesta.
3. Calificar con la regla escrita de qué cuenta como acierto, sin saber cuál respuesta es de cuál modelo si se puede.
4. Anotar: aciertos de cada uno, aciertos en los casos difíciles, costo por tarea terminada de cada uno.
5. Decidir con esta regla:
   * Acierta más en los casos difíciles: se cambia.
   * Acierta igual y cuesta menos: se cambia.
   * Cualquier otro resultado: seguimos con lo que tenemos y se archiva la prueba.`,
            },
            {
              type: 'template',
              title: 'Lo que le pregunta al vendedor del nombre de moda',
              body: `1. ¿Puede correr estos [N] casos nuestros frente a nosotros, hoy, sin verlos antes?
2. ¿Cuántos acierta de cada 100 en casos como los nuestros, y cómo lo midieron?
3. ¿Qué modelo hay por debajo, y qué pasa con nuestro flujo cuando lo cambien?
4. ¿Cuánto cuesta por tarea terminada, no por mes ni por usuario?
5. ¿Qué hace cuando no sabe la respuesta? Muéstrenos un caso.
6. ¿Qué datos nuestros guarda, dónde y quién los puede ver?
7. ¿Cómo nos llevamos nuestros datos y nuestras instrucciones si nos vamos?`,
            },
            {
              type: 'check',
              id: 'tres-activos',
              title: 'Los tres activos, al día',
              items: [
                'La lista fija tiene al menos 20 casos reales, con su respuesta correcta escrita.',
                'La lista incluye los casos difíciles: correos enredados, pedidos raros, quejas.',
                'El documento de contexto tiene dueño, fecha y una sola versión.',
                'Todo el equipo usa el mismo documento de contexto.',
                'La regla de qué modelo hace qué está escrita (sección 7).',
                'Cada prueba de un modelo nuevo quedó archivada con su resultado.',
              ],
            },
          ],
        },

        // es-11
        {
          id: 'datos-ordenados',
          title: 'Antes de otra herramienta: dónde viven sus datos',
          videos: ['es-11'],
          intro:
            'El mapa de dónde están hoy los datos de sus clientes, una tabla ordenada a donde pasarlos, con dueño, y la primera decisión semanal que la IA puede leer de ahí.',
          blocks: [
            {
              type: 'p',
              // T35: posturas-contrarias.md, fuente data/posts/ai-for-businesses-that-already-work.ts
              text: 'En la región, 59 por ciento de las pymes no reporta ningún impacto con IA, aunque el presupuesto subió. La integración no subió con él: los datos viven en WhatsApp, el proceso en la cabeza de una persona y el registro en una hoja que esa misma persona mantiene.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Haga la lista de dónde viven hoy sus datos de clientes',
                  body: 'Chats, hojas, correos, cuadernos, y la cabeza de quién. Use el mapa de abajo.',
                },
                {
                  title: 'Escoja el lugar que más decisiones alimenta',
                  body: 'El que se consulta para decidir a quién llamar, qué pedir o a quién cobrar. Uno solo.',
                },
                {
                  title: 'Páselo a un solo sitio ordenado',
                  body: 'Una tabla con columnas fijas (la plantilla está abajo). Para los chats, el prompt de extracción hace el primer paso.',
                },
                {
                  title: 'Escriba quién lo actualiza y cada cuánto',
                  body: 'Sin dueño, en un mes vuelve al desorden. Póngalo en la tabla y en el calendario de esa persona.',
                },
                {
                  title: 'Empiece por una sola decisión que se toma cada semana',
                  body: 'Qué cliente llamar, qué pedir, a quién cobrarle. Cuando esa funcione, va por la segunda.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'mapa-datos',
              title: 'Mapa de dónde viven sus datos',
              columns: [
                'Dato',
                'Dónde vive hoy',
                'En el celular o la cabeza de quién',
                'Decisiones que alimenta',
                'Veces por semana que se decide con él',
                'Sitio ordenado de destino',
                'Dueño',
                'Cada cuánto se actualiza',
              ],
              rows: [
                ['Ejemplo: pedidos de clientes', 'WhatsApp del vendedor', 'Vendedor', 'Qué despachar, a quién volver a llamar', '5', 'Tabla de clientes', 'Vendedor', 'Cada día al cierre'],
                ['Ejemplo: saldos por cobrar', 'Hoja de la contadora', 'Contadora', 'A quién cobrarle esta semana', '1', 'Tabla de clientes', 'Contadora', 'Cada lunes'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
              ],
              note: 'Ejemplos hipotéticos. Ordene por "Veces por semana" y empiece por la primera fila.',
            },
            {
              type: 'sheet',
              id: 'tabla-clientes',
              title: 'El sitio ordenado: tabla de clientes',
              columns: [
                'Cliente',
                'Contacto (nombre y canal)',
                'Fecha del último pedido',
                'Qué pidió',
                'Valor del último pedido',
                'Saldo por cobrar',
                'Próxima acción',
                'Fecha de la próxima acción',
                'Responsable',
                'Fuente del dato',
              ],
              rows: [
                ['', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', ''],
              ],
              note: 'Una fila por cliente, fechas en un solo formato (AAAA-MM-DD). La columna "Fuente del dato" dice de dónde salió cada fila, para poder revisarla.',
            },
            {
              type: 'template',
              title: 'Prompt: de un chat exportado de WhatsApp a la tabla',
              body: `Le voy a pegar un chat exportado de WhatsApp entre mi empresa y uno o varios clientes. Extraiga los datos a una tabla con exactamente estas columnas:

Cliente | Contacto (nombre y canal) | Fecha del último pedido | Qué pidió | Valor del último pedido | Saldo por cobrar | Próxima acción | Fecha de la próxima acción | Responsable | Fuente del dato

Reglas:
- Solo lo que está escrito en el chat. Si un dato no aparece, deje la celda vacía. No lo estime ni lo deduzca.
- Fechas en formato AAAA-MM-DD.
- En "Fuente del dato" ponga la fecha y la hora del mensaje de donde sacó la fila.
- Si un mensaje es ambiguo (no está claro si es pedido, cotización o pregunta), no lo meta en la tabla: póngalo en una lista aparte llamada "Para revisar", con la frase exacta.
- Entregue la tabla en formato para pegar en una hoja de cálculo (separada por tabulaciones), y después la lista "Para revisar".

Contexto de mi empresa: [QUÉ VENDE, MONEDA, CÓMO SE VE UN PEDIDO TÍPICO]

Chat:
[PEGUE AQUÍ EL CHAT EXPORTADO]`,
              note: 'Antes de pegar chats de clientes en cualquier herramienta, revise qué permite su política de datos y la de la herramienta. Quite números y datos personales que la tabla no necesite.',
            },
            {
              type: 'template',
              title: 'Prompt: la decisión de cada semana',
              body: `Le adjunto la tabla de clientes de mi empresa (actualizada el [FECHA]). Con ella, responda una sola pregunta: [A QUÉ CLIENTES LLAMAR ESTA SEMANA / QUÉ PEDIR AL PROVEEDOR / A QUIÉN COBRARLE].

Mi regla para decidirlo: [EJEMPLO: llamar a quien no pide hace más de (N) días y tiene saldo en cero; cobrar a quien tiene saldo vencido de más de (N) días].

Entregue:
1. La lista, ordenada por prioridad, con el dato de la tabla que justifica cada fila.
2. Las filas que no pudo evaluar porque les falta un dato, y cuál.

No use información que no esté en la tabla. Si la regla no alcanza para decidir un caso, dígalo en lugar de suponer.`,
            },
            {
              type: 'check',
              id: 'datos-listos',
              title: 'Su próxima herramienta tiene algo que leer cuando...',
              items: [
                'El mapa de dónde viven los datos está completo, incluida la cabeza de quién.',
                'Un solo lugar de datos ya pasó a la tabla ordenada.',
                'La tabla tiene dueño y frecuencia de actualización escritos.',
                'Las fechas y los valores están en un solo formato.',
                'Hay una decisión semanal escrita como regla.',
                'La decisión de esta semana salió de la tabla, no del celular de alguien.',
              ],
            },
          ],
        },

        // es-14
        {
          id: 'cuantas-acierta',
          title: 'Cuántas veces acierta, antes de pagarla',
          videos: ['es-14'],
          intro:
            'Su propia prueba con 20 a 50 casos reales, la regla de qué cuenta como acierto, el mensaje para el proveedor y la cuenta que da el número que se negocia.',
          blocks: [
            {
              type: 'rule',
              // T06
              text: 'Una demo es una sola muestra, con el caso que el vendedor escogió. Pida el número: cuántas acierta de cada cien, con sus casos.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Junte entre 20 y 50 casos reales de su empresa',
                  body: 'Los correos enredados, los pedidos raros, las quejas. Marque cuáles son difíciles: ahí está lo que necesita saber.',
                },
                {
                  title: 'Escriba al lado de cada uno la respuesta correcta',
                  body: 'Y, antes de la prueba, qué cuenta como acierto. Por ejemplo: "clasifica bien el tipo de pedido y no inventa un precio". Si lo decide después de ver la respuesta, va a ser generoso con la herramienta.',
                },
                {
                  title: 'No le entregue las respuestas al proveedor',
                  body: 'Los casos se los da el día de la prueba. Las respuestas correctas se quedan con usted.',
                },
                {
                  title: 'Pídale que corra los casos frente a usted y cuente',
                  body: 'Ese número es el que se negocia, no la demo. Si el proveedor no quiere hacer la prueba, ya tiene su respuesta.',
                },
                {
                  title: 'Guarde la lista',
                  body: 'Es la lista fija de la sección 4. Le sirve para probar cualquier herramienta que le ofrezcan más adelante.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'banco-casos',
              title: 'Banco de casos de prueba',
              columns: [
                '#',
                'Caso (texto o enlace)',
                'Tipo (Normal/Difícil)',
                'Respuesta correcta',
                'Qué cuenta como acierto',
                'Respuesta de la herramienta',
                'Acertó (1 o 0)',
              ],
              rows: [
                ['1', 'Ejemplo: correo de un cliente que pide dos productos y cambia la dirección a mitad del mensaje', 'Difícil', 'Pedido de 2 productos a la dirección nueva', 'Los dos productos y la dirección nueva, sin inventar precio', '', ''],
                ['2', 'Ejemplo: queja por un despacho tarde que también pide factura', 'Difícil', 'Queja escalada y solicitud de factura registrada', 'Detecta las dos cosas', '', ''],
                ['3', '', '', '', '', '', ''],
                ['4', '', '', '', '', '', ''],
                ['5', '', '', '', '', '', ''],
                ['6', '', '', '', '', '', ''],
              ],
              note: 'Siga hasta tener entre 20 y 50 filas. Al final, sume la columna G con =SUM(G2:G51) y lleve ese total a la calculadora de abajo.',
            },
            {
              type: 'template',
              title: 'Mensaje al proveedor: la prueba antes de firmar',
              body: `Hola, [NOMBRE]. Gracias por la demo.

Antes de decidir, queremos ver la herramienta con nuestros casos. Tenemos [N] casos reales de [TAREA], incluidos los difíciles. Le proponemos:

1. Una sesión de [DURACIÓN] el [FECHA], en la que ustedes corren los casos frente a nosotros.
2. Le entregamos los casos ese día. Las respuestas correctas y el criterio de acierto los tenemos nosotros.
3. Configuran la herramienta como la tendríamos en producción, con nuestro documento de contexto. Nada ajustado a mano durante la prueba.
4. Contamos cuántos acierta, y por separado cuántos de los difíciles.

Con ese número hablamos de precio y de condiciones.

¿Le sirve el [FECHA]?

[SU NOMBRE]`,
            },
            {
              type: 'calc',
              id: 'calc-tasa-acierto',
              title: 'El número que se negocia',
              inputs: [
                { id: 'casos', label: 'Casos probados', value: 20, hint: 'Entre 20 y 50.' },
                { id: 'aciertos', label: 'Aciertos en total', value: 15, hint: 'Valor de ejemplo: ponga el suyo.' },
                { id: 'dificiles', label: 'Casos difíciles probados', value: 8, hint: 'Valor de ejemplo.' },
                { id: 'aciertosDificiles', label: 'Aciertos en los difíciles', value: 4, hint: 'Valor de ejemplo.' },
                {
                  id: 'umbral',
                  label: 'Su umbral: aciertos mínimos de cada 100',
                  value: 80,
                  hint: 'Lo pone usted según cuánto le cuesta un error en esta tarea. Valor de ejemplo.',
                },
              ],
              outputs: [
                { label: 'Aciertos de cada 100', expr: 'aciertos/casos*100', format: 'number' },
                { label: 'Aciertos de cada 100 en los difíciles', expr: 'aciertosDificiles/dificiles*100', format: 'number' },
                { label: 'Errores que vería en 100 casos como estos', expr: '100-aciertos/casos*100', format: 'number' },
              ],
              verdict: {
                expr: 'aciertos/casos*100-umbral',
                pass: 'Pasa su umbral. Ahora mire los difíciles: si ahí falla mucho, defina quién revisa esos casos antes de pagar.',
                fail: 'No pasa su umbral. No firme con este número: pida otra configuración y repita la prueba, o pase al siguiente proveedor.',
              },
            },
          ],
        },

        // es-16
        {
          id: 'tres-tamanos',
          title: 'El modelo correcto para cada tarea',
          videos: ['es-16'],
          intro:
            'La regla de los tres tamaños, la hoja para revisar sus flujos paso por paso, el costo por tarea terminada y la cuenta de cuánto ahorra bajando una tarea al modelo pequeño.',
          blocks: [
            {
              type: 'p',
              // ev-01 (unica mencion de la operacion de Daniel en el kit)
              text: 'En octubre de 2026, mis agentes consumieron 8.424 dólares a precio de lista, en una sola máquina. Lo que decide si eso es caro o barato no es cuánto se usa la IA: es qué modelo hace cada tarea.',
            },
            {
              type: 'rule',
              // ev-02
              text: 'El pequeño lee, busca y clasifica. El mediano escribe, textos y código. El grande solo juzga lo difícil, y deja escrita la razón.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Parta cada flujo en pasos',
                  body: 'Un flujo que "responde correos" casi siempre es: leer, clasificar, buscar datos, escribir la respuesta y, a veces, decidir un caso raro.',
                },
                {
                  title: 'Marque el tipo de trabajo de cada paso',
                  body: 'Leer, buscar o clasificar: pequeño. Escribir: mediano. Juzgar lo difícil: grande. Use el prompt de auditoría si son muchos flujos.',
                },
                {
                  title: 'Busque la tarea pesada en el modelo grande',
                  body: 'Casi siempre hay una que el pequeño hace igual. Pruébela con su lista de casos (sección 6) antes de cambiarla.',
                },
                {
                  title: 'Mida el costo por tarea terminada, no por mes',
                  body: 'Gasto del flujo en el mes dividido entre tareas terminadas. Así sabe qué flujo le cuesta más.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'flujos-modelos',
              title: 'Revisión de flujos: qué modelo hace cada paso',
              columns: [
                'Flujo',
                'Paso',
                'Tipo de trabajo (Leer, buscar o clasificar / Escribir / Juzgar)',
                'Modelo que usa hoy (Pequeño/Mediano/Grande)',
                'Modelo según la regla',
                'Corridas al mes',
                'Costo por corrida',
                'Costo al mes',
                'Tareas terminadas al mes',
                'Costo por tarea terminada',
              ],
              rows: [
                ['Ejemplo: responder correos de clientes', 'Clasificar el correo', 'Leer, buscar o clasificar', 'Grande', 'Pequeño', '', '', '=F2*G2', '', '=H2/I2'],
                ['Ejemplo: responder correos de clientes', 'Escribir la respuesta', 'Escribir', 'Grande', 'Mediano', '', '', '=F3*G3', '', '=H3/I3'],
                ['Ejemplo: responder correos de clientes', 'Decidir si se escala una queja', 'Juzgar', 'Grande', 'Grande', '', '', '=F4*G4', '', '=H4/I4'],
                ['', '', '', '', '', '', '', '=F5*G5', '', '=H5/I5'],
                ['', '', '', '', '', '', '', '=F6*G6', '', '=H6/I6'],
              ],
              note: 'Ejemplo hipotético. Corridas y costo por corrida salen del panel de uso o de la factura de su proveedor. Las filas donde "hoy" y "según la regla" no coinciden son las que se prueban primero.',
            },
            {
              type: 'calc',
              id: 'calc-bajar-modelo',
              title: '¿Cuánto ahorra bajando una tarea al modelo pequeño?',
              inputs: [
                { id: 'corridas', label: 'Corridas al mes de esa tarea', value: 3000, hint: 'Valor de ejemplo: sáquelo de su panel de uso.' },
                { id: 'costoGrande', label: 'Costo de 1.000 corridas en el modelo grande', value: 100, unit: '$', hint: 'Valor de ejemplo, en la moneda de su factura.' },
                { id: 'costoPequeno', label: 'Costo de 1.000 corridas en el modelo pequeño', value: 10, unit: '$', hint: 'Valor de ejemplo.' },
                { id: 'aciertoGrande', label: 'Aciertos de cada 100 del grande en sus casos', value: 95, hint: 'De su prueba de la sección 6.' },
                { id: 'aciertoPequeno', label: 'Aciertos de cada 100 del pequeño en sus casos', value: 93, hint: 'De la misma prueba, con los mismos casos.' },
                { id: 'costoError', label: 'Lo que le cuesta corregir un error', value: 1, unit: '$', hint: 'Tiempo de quien lo corrige por el valor de su hora. Valor de ejemplo.' },
              ],
              outputs: [
                { label: 'Ahorro en modelo al mes', expr: 'corridas/1000*(costoGrande-costoPequeno)', format: 'money' },
                { label: 'Costo de los errores de más al mes', expr: 'corridas*(aciertoGrande-aciertoPequeno)/100*costoError', format: 'money' },
                {
                  label: 'Ahorro neto al mes',
                  expr: 'corridas/1000*(costoGrande-costoPequeno)-corridas*(aciertoGrande-aciertoPequeno)/100*costoError',
                  format: 'money',
                },
              ],
              verdict: {
                expr: 'corridas/1000*(costoGrande-costoPequeno)-corridas*(aciertoGrande-aciertoPequeno)/100*costoError',
                pass: 'Bájela al pequeño: ahorra aun pagando los errores de más.',
                fail: 'Déjela donde está: los errores de más se comen el ahorro.',
              },
            },
            {
              type: 'template',
              title: 'Prompt: auditar un flujo con la regla de los tres tamaños',
              body: `Actúe como revisor de costos de un flujo con IA. Le doy la descripción de un flujo de mi empresa y el modelo que usa cada paso. Aplique esta regla, sin excepciones que no justifique por escrito:

- Pequeño: leer, buscar, extraer, clasificar.
- Mediano: escribir textos y código.
- Grande: solo juzgar lo difícil (casos ambiguos, decisiones con consecuencias), y siempre dejando escrita la razón.

Flujo: [NOMBRE]
Para qué sirve: [RESULTADO QUE ENTREGA]
Pasos y modelo actual:
1. [PASO] | modelo actual: [PEQUEÑO/MEDIANO/GRANDE] | corridas al mes: [N]
2. [PASO] | modelo actual: [...] | corridas al mes: [N]
[...]

Entregue una tabla: Paso | Tipo de trabajo | Modelo actual | Modelo según la regla | Por qué | Riesgo de bajarlo | Cómo probarlo con mis casos.

Reglas:
- Si un paso mezcla dos tipos de trabajo (por ejemplo, clasificar y escribir), propóngame partirlo en dos.
- Si recomienda dejar un paso en el grande, la razón tiene que nombrar qué tiene de difícil ese paso. "Es más seguro" no es una razón.
- No invente precios. Si necesita un costo para comparar, pídamelo.`,
            },
            {
              type: 'template',
              title: 'Instrucción para el paso del modelo grande: juzgar con la razón escrita',
              body: `Usted solo recibe los casos que los pasos anteriores marcaron como difíciles. Su trabajo es decidir [LA DECISIÓN: escalar o no, aprobar o no, qué categoría aplica].

Para cada caso entregue, en este formato:
DECISIÓN: [OPCIÓN]
RAZÓN: dos o tres frases, citando el dato exacto del caso que la justifica.
CONFIANZA: alta, media o baja.
SI ES BAJA: qué dato faltaría para decidir.

No decida sin razón escrita. Si el caso no es difícil (cabe en una regla simple), dígalo: ese caso debió resolverse antes y hay que revisar el paso que lo mandó aquí.`,
            },
          ],
        },
      ],
      next: {
        text: 'Si quiere que revisemos juntos qué proceso de su empresa conviene medir primero, empiece por el diagnóstico de crecimiento.',
        cta: 'Hacer el diagnóstico',
        page: 'crecer',
      },
    },
  },
};

export default kit;
