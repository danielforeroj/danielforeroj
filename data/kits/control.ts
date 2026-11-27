import type { Kit } from './types';

// CONTROL: one kit, two languages. Spanish "el kit de control para su IA" (es-12, es-21, es-26),
// English "the AI control kit" (en-03, en-07, en-11, en-17). Both versions carry the same six
// sections, in the order their first video goes out.
//
// Sources for every figure:
// 20 to 50 cases, regression near 100, capability starts low: en-03 script, thesis T06.
// 13.6 percent verdict flips of an LLM judge on repeat runs: T06 (posturas-contrarias.md,
//   source data/posts/evals-are-the-new-qa.ts).
// Around 93 percent of permission prompts approved (Anthropic, coding agent): T07
//   (posturas-contrarias.md, source data/posts/human-in-the-loop-is-not-a-strategy.ts).
// 8,424 dollars at API prices in October 2026 on one machine: ev-01, en-11 script.
// Run the workflow ten times: en-11 script.
// Calculator default values are hypothetical examples, labeled as such.

const kit: Kit = {
  word: 'CONTROL',
  slug: 'control',
  videos: [
    {
      id: 'en-03',
      lang: 'en',
      promise:
        "Comment CONTROL and I'll send you the AI control kit, so you know how often your system is right before you ship it.",
    },
    {
      id: 'es-12',
      lang: 'es',
      promise:
        'Comente CONTROL y le mando el kit de control para su IA, para que cada cosa que haga su IA tenga un responsable de verdad.',
    },
    {
      id: 'en-07',
      lang: 'en',
      promise: "Comment CONTROL and I'll send you the AI control kit, so your agent can't do what it shouldn't.",
    },
    {
      id: 'en-11',
      lang: 'en',
      promise: "Comment CONTROL and I'll send you the AI control kit, so you can price an AI workflow you can defend.",
    },
    {
      id: 'es-21',
      lang: 'es',
      promise:
        'Comente CONTROL y le mando el kit de control para su IA, para que su IA nunca apruebe su propio trabajo.',
    },
    {
      id: 'es-26',
      lang: 'es',
      promise:
        'Comente CONTROL y le mando el kit de control para su IA, para que ninguna cifra inventada le llegue a un cliente.',
    },
    {
      id: 'en-17',
      lang: 'en',
      promise:
        "Comment CONTROL and I'll send you the AI control kit, so no model ever grades its own homework in your stack.",
    },
  ],
  content: {
    // Spanish
    es: {
      title: 'El kit de control para su IA',
      promise:
        'Seis controles que usted monta esta semana: cuántas veces acierta su sistema, quién responde por cada acción, qué tiene prohibido su agente, cuánto cuesta cada tarea, quién revisa el trabajo de la IA y de dónde sale cada cifra.',
      minutes: 45,
      howTo: [
        'Escoja una sola tarea que su IA ya hace, la que más le preocupa, y pásela por las seis secciones.',
        'Las hojas se pegan directo en Google Sheets o Excel, con fórmulas. Las plantillas tienen botón de copiar: llene lo que está entre [CORCHETES].',
        'Las listas guardan sus marcas en este navegador. Vuelva cuando agregue la siguiente tarea.',
        'Si una celda queda vacía, esa es la respuesta: esa tarea todavía no debería correr sola.',
      ],
      sections: [
        {
          id: 'cuantas-veces-acierta',
          title: 'Cuántas veces acierta antes de lanzarlo',
          videos: ['en-03'],
          intro:
            'Un demo que funcionó es una muestra de uno. Aquí arma su suite de pruebas con fallas reales y sale con un número: cuántas veces acierta su sistema.',
          blocks: [
            {
              type: 'rule',
              text: 'Si no puede decir cuántas veces acierta, no sabe si funciona. Solo sabe que funcionó una vez.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Junte las fallas reales',
                  body: 'Tickets de soporte, correos molestos, los casos raros de los que su equipo se ríe. De ahí salen entre 20 y 50 casos, no de la ruta feliz.',
                },
                {
                  title: 'Convierta cada falla en una prueba',
                  body: 'La entrada exacta, la respuesta esperada escrita antes de correrla y lo que la salida nunca puede decir.',
                },
                {
                  title: 'Sepárelas en dos grupos',
                  body: 'Regresión: lo que ya funciona y no se puede romper, debe pasar cerca del cien por ciento. Capacidad: lo que todavía no sabe hacer, arranca bajo y está bien.',
                },
                {
                  title: 'Corra la suite en cada cambio',
                  body: 'Cada vez que cambie un prompt, una herramienta o el modelo. Un modelo nuevo no es una mejora hasta que la suite lo diga.',
                },
                {
                  title: 'Toda falla nueva entra a la suite',
                  body: 'La suite solo crece. Una falla que usted ya vio no le puede volver a llegar a un cliente.',
                },
              ],
            },
            {
              // ev-06
              type: 'p',
              text: 'Un ejemplo de mi operación: la misma noticia salió tres veces en 7 días porque el control de repetidos comparaba enlaces, no historias. Se arregló comparando el evento y las entidades. Ese es el tipo de caso que va en su suite: una falla que pasó por encima de un control.',
            },
            {
              type: 'template',
              title: 'Prompt: convertir una falla real en un caso de prueba',
              body: `Usted me ayuda a construir la suite de pruebas de un sistema de IA que [QUÉ HACE EL SISTEMA, por ejemplo: responde a clientes preguntas sobre pedidos].

Le voy a pegar una falla real: lo que recibió el sistema, lo que respondió y por qué estuvo mal.

FALLA:
[PEGUE AQUÍ EL TICKET, EL CORREO O LA CONVERSACIÓN]

Devuélvame una sola fila, con las columnas separadas por tabulador, para pegar en mi hoja:
caso | origen | entrada exacta | respuesta esperada | lo que nunca puede decir | tipo (regresión o capacidad)

Reglas:
1. La entrada va tal cual llegó. No la limpie ni la mejore: los errores de ortografía y el contexto incompleto son parte de la prueba.
2. La respuesta esperada se escribe como algo que se pueda verificar ("dice que no encuentra el pedido y pide el número"), no como un estilo ("responde amablemente").
3. Si la falla no deja claro cuál era la respuesta correcta, no la invente. Escriba FALTA DEFINIR y dígame qué pregunta tengo que responder yo.
4. Tipo: regresión si el sistema ya responde bien este caso hoy; capacidad si nunca lo ha hecho bien.
5. Si en la falla hay datos personales de un cliente, reemplácelos por [NOMBRE], [CORREO], [TELÉFONO].`,
            },
            {
              type: 'sheet',
              id: 'suite-es',
              title: 'Su suite de pruebas',
              columns: [
                'Caso',
                'Origen de la falla',
                'Entrada exacta',
                'Respuesta esperada',
                'Nunca puede decir',
                'Tipo',
                'Corrida 1 (1 pasa, 0 falla)',
                'Corrida 2',
                'Corrida 3',
                'Aciertos',
              ],
              rows: [
                [
                  'Ejemplo: pregunta por un pedido que no existe',
                  'Ticket de soporte',
                  '[pegue el mensaje tal cual]',
                  'Dice que no encuentra el pedido y pide el número',
                  'Un estado de envío inventado',
                  'Regresión',
                  '1',
                  '1',
                  '0',
                  '=G2+H2+I2',
                ],
                [
                  'Ejemplo: pide un descuento que no existe',
                  'Correo de un cliente molesto',
                  '[pegue el mensaje tal cual]',
                  'Explica la política vigente y ofrece hablar con una persona',
                  'Un descuento que nadie aprobó',
                  'Regresión',
                  '',
                  '',
                  '',
                  '=G3+H3+I3',
                ],
                ['', '', '', '', '', '', '', '', '', '=G4+H4+I4'],
                ['', '', '', '', '', '', '', '', '', '=G5+H5+I5'],
                ['', '', '', '', '', '', '', '', '', '=G6+H6+I6'],
              ],
              note: 'Corra cada caso más de una vez: un sistema de IA no responde siempre igual. Sume las corridas que pasan por tipo y llévelas a la calculadora de abajo.',
            },
            {
              type: 'calc',
              id: 'acierto-es',
              title: 'Tasa de acierto contra su umbral',
              inputs: [
                {
                  id: 'regPasa',
                  label: 'Corridas de regresión que pasaron',
                  value: 27,
                  hint: 'Ejemplo. Sale de la columna de aciertos.',
                },
                { id: 'regTotal', label: 'Corridas de regresión en total', value: 30, hint: 'Casos por corridas' },
                { id: 'capPasa', label: 'Corridas de capacidad que pasaron', value: 4, hint: 'Ejemplo' },
                { id: 'capTotal', label: 'Corridas de capacidad en total', value: 12, hint: 'Ejemplo' },
                {
                  id: 'umbral',
                  label: 'Su umbral para lanzar (% de regresión)',
                  value: 95,
                  unit: '%',
                  hint: 'Lo fija usted, según lo que cuesta un error en esta tarea.',
                },
              ],
              outputs: [
                { label: 'Acierto en regresión (%)', expr: 'regPasa/regTotal*100', format: 'number' },
                { label: 'Acierto en capacidad (%)', expr: 'capPasa/capTotal*100', format: 'number' },
                { label: 'Distancia a su umbral (puntos)', expr: 'regPasa/regTotal*100-umbral', format: 'number' },
              ],
              verdict: {
                expr: 'regPasa/regTotal*100-umbral+0.001',
                pass: 'Pasa su umbral en regresión. Puede lanzar, y la suite sigue corriendo en cada cambio.',
                fail: 'No pasa su umbral. No lo lance todavía: mire qué casos fallan y corrija el sistema o la entrada, nunca la prueba.',
              },
            },
            {
              type: 'check',
              id: 'antes-de-lanzar-es',
              title: 'Antes de lanzarlo',
              items: [
                'Tengo entre 20 y 50 casos sacados de fallas reales, no inventados.',
                'Cada caso tiene la respuesta esperada escrita antes de correrlo.',
                'Corrí cada caso más de una vez.',
                'La regresión pasa el umbral que yo fijé.',
                'La suite corre cada vez que cambio un prompt, una herramienta o el modelo.',
                'Hay una persona con nombre que pasa cada falla nueva a la suite.',
              ],
            },
          ],
        },
        {
          id: 'responsable-de-verdad',
          title: 'Un responsable de verdad para cada acción',
          videos: ['es-12'],
          intro:
            'Un humano aprobando todo no es control. Aquí escribe las cuatro respuestas para cada cosa que su IA hace sola, y sabe cuáles tareas todavía no deberían correr solas.',
          blocks: [
            {
              // T07: Anthropic, around 93 percent of permission prompts approved.
              type: 'p',
              text: 'La atención de quien revisa cae con el volumen. Anthropic publicó que los desarrolladores aprueban cerca del 93 por ciento de las solicitudes de permiso de su agente de código, y son usuarios técnicos con el contexto al frente. Pocas revisiones bien hechas valen más que una cola infinita.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Liste lo que su IA hace sola',
                  body: 'Cada acción que sale sin que nadie la toque: responder a un cliente, cambiar un registro, mandar un correo, cobrar.',
                },
                {
                  title: 'Decida qué necesita revisión',
                  body: 'Por consecuencia, no por categoría: lo que mueve plata, toca a un cliente, cambia credenciales o no se puede deshacer. Lo demás no debería llegarle a una persona.',
                },
                {
                  title: 'Responda las cuatro preguntas',
                  body: 'Quién revisa, con nombre propio. Qué tan rápido responde, en horas. Qué puede anular y qué no. Qué pasa cuando esa persona no está.',
                },
                {
                  title: 'Si nadie responde, se detiene',
                  body: 'Si la respuesta a la cuarta pregunta es "nada", el sistema se tiene que detener solo. Una espera que se vence y aprueba sola no es control.',
                },
                {
                  title: 'Revise a los revisores cada semana',
                  body: 'Cuántos casos aprobó, cuántos cambió, cuánto tiempo les dedicó. Si nunca cambia nada, o la regla está mal puesta o la revisión no está pasando.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'cuatro-preguntas-es',
              title: 'Las cuatro preguntas, una fila por acción',
              columns: [
                'Acción que la IA hace sola',
                'Qué pasa si sale mal',
                'Quién revisa (nombre)',
                'Suplente (nombre)',
                'Responde en (horas)',
                'Qué puede anular',
                'Qué no puede anular',
                'Si nadie responde',
                '¿Puede correr sola?',
              ],
              rows: [
                [
                  'Ejemplo: enviar una cotización a un cliente nuevo',
                  'Un precio equivocado frente al cliente',
                  '[nombre]',
                  '[nombre]',
                  '[horas]',
                  'Precio, descuento, fecha de entrega',
                  'La plantilla y las condiciones generales',
                  'No sale: queda en borrador',
                  'Sí, con las cuatro respuestas',
                ],
                [
                  'Ejemplo: responder preguntas frecuentes por WhatsApp',
                  'Una respuesta errada a un cliente',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  'No: faltan respuestas',
                ],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
              ],
              note: 'Una celda vacía en quién, suplente, horas o qué pasa si nadie responde quiere decir que esa acción no tiene control: tiene a alguien a quien culpar. Esa acción no corre sola hasta que la fila esté completa.',
            },
            {
              // ev-05
              type: 'p',
              text: 'Así funciona en mi operación: las rutinas que publican leen primero un archivo de encendido. Si el archivo falta, corren como borrador y no publican nada. Que se detenga solo es una decisión de diseño, no de disciplina.',
            },
            {
              type: 'template',
              title: 'Mensaje para asignar al responsable',
              body: `[NOMBRE], desde el [FECHA] usted es la persona responsable de revisar [ACCIÓN QUE HACE LA IA, por ejemplo: las cotizaciones que la IA prepara para clientes nuevos].

Lo que eso significa:
1. Le llegan solo los casos que [REGLA, por ejemplo: superan [MONTO] o son la primera cotización de un cliente]. Lo demás sale sin revisión.
2. Responde en máximo [HORAS] horas hábiles.
3. Puede cambiar o rechazar [QUÉ PUEDE ANULAR]. No puede cambiar [QUÉ NO PUEDE ANULAR]: eso lo decide [QUIÉN].
4. Si usted no está, revisa [SUPLENTE]. Si ninguno responde a tiempo, el caso no sale y queda en borrador.
5. Para rechazar basta una línea con el motivo.
6. Cada caso le llega con lo que la IA propone, lo que leyó para proponerlo y lo que no sabe. Si le llega solo con dos botones, me avisa.

Cada [DÍA] revisamos juntos cuántos casos le llegaron, cuántos cambió y cuánto tiempo le tomaron. Si el volumen no le deja leer cada caso, me avisa ese mismo día y cambiamos la regla, no su atención.

¿Me confirma que lo asume?`,
            },
            {
              type: 'sheet',
              id: 'revision-semanal-es',
              title: 'La revisión de la revisión, cada semana',
              columns: [
                'Semana',
                'Casos que le llegaron',
                'Aprobados sin cambio',
                'Cambiados o rechazados',
                '% que cambió',
                'Minutos promedio por caso',
                'Decisión',
              ],
              rows: [
                [
                  'Ejemplo: semana 1',
                  '40',
                  '39',
                  '1',
                  '=D2/B2*100',
                  '1',
                  'Revisar si la regla manda casos que no necesitan revisión',
                ],
                ['', '', '', '', '=D3/B3*100', '', ''],
                ['', '', '', '', '=D4/B4*100', '', ''],
                ['', '', '', '', '=D5/B5*100', '', ''],
              ],
              note: 'Usted fija qué porcentaje le preocupa. Si semana tras semana casi nada cambia y cada caso toma un minuto, la revisión es un trámite: suba el umbral de lo que llega o automatice la decisión rutinaria con una regla.',
            },
            {
              type: 'check',
              id: 'responsable-es',
              title: 'Control, no teatro',
              items: [
                'Cada acción que la IA hace sola tiene su fila.',
                'Ninguna fila dice "el equipo" donde debería ir un nombre.',
                'Cada responsable tiene suplente.',
                'Si nadie responde a tiempo, la acción no sale.',
                'El responsable ve la evidencia (qué propone la IA, qué leyó, qué no sabe), no solo dos botones.',
                'Las acciones sin fila completa están apagadas.',
              ],
            },
          ],
        },
        {
          id: 'lo-que-tiene-permitido',
          title: 'Lo que su agente tiene permitido, y lo que nunca',
          videos: ['en-07'],
          intro:
            'Que su agente pueda tocar el CRM no dice qué le está permitido hacer ahí. Aquí escribe el permiso de cada acción y deja la lista de nunca en código, fuera del modelo.',
          blocks: [
            { type: 'rule', text: 'Una regla escrita en el prompt es una petición, no un control.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Liste cada acción, no cada sistema',
                  body: 'No "el CRM": leer contactos, editar un campo, enviar un correo, emitir un reembolso, borrar. Una fila por acción y por herramienta.',
                },
                {
                  title: 'Escriba el permiso',
                  body: 'Permitido, permitido con límite (monto, cantidad por hora, tipo de registro) o nunca.',
                },
                {
                  title: 'Escriba la condición previa',
                  body: 'Qué tiene que ser cierto antes: identidad verificada, contrato activo, evidencia adjunta.',
                },
                {
                  title: 'Haga cumplir la lista de nunca en código',
                  body: 'Entre la decisión del agente y la ejecución. Si la acción está en la lista, la llamada falla antes de correr, diga lo que diga el modelo.',
                },
                {
                  title: 'Que falle cerrado',
                  body: 'Si el chequeo no responde, la acción no sale. Lo contrario apaga su control justo cuando su sistema está mal.',
                },
                {
                  title: 'Registre cada llamada bloqueada',
                  body: 'Esa lista le muestra lo que el agente intentó hacer y nadie esperaba que intentara.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'permisos-es',
              title: 'La tabla de permisos',
              columns: [
                'Herramienta',
                'Acción',
                'Permiso (permitido, con límite, nunca)',
                'Límite',
                'Condición previa',
                '¿Se puede deshacer?',
                'Dónde se hace cumplir (código o prompt)',
              ],
              rows: [
                ['Ejemplo: CRM', 'Leer contactos', 'Permitido', '', '', 'Sí', 'Código'],
                [
                  'Ejemplo: CRM',
                  'Cambiar la etapa de un negocio',
                  'Con límite',
                  'Solo negocios asignados al agente',
                  'Que el negocio exista y esté abierto',
                  'Sí',
                  'Código',
                ],
                ['Ejemplo: CRM', 'Borrar un contacto', 'Nunca', '', '', 'No', 'Código'],
                [
                  'Ejemplo: pagos',
                  'Emitir un reembolso',
                  'Con límite',
                  '[MONTO MÁXIMO] por caso',
                  'Pedido verificado',
                  'No',
                  'Código',
                ],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
              ],
              note: 'Toda fila que diga "prompt" en la última columna es una petición. Pásela a código, empezando por las que no se pueden deshacer.',
            },
            {
              // ev-29
              type: 'p',
              text: 'Un caso de mi operación: el nombre del cliente final de una agencia socia nunca va en un mensaje a un creador. La lista vive en configuración y un script rechaza cualquier mensaje que la nombre. En 5 corridas registradas en septiembre de 2026 pidieron presupuesto, brief o fecha antes de dar tarifa, un mismo equipo de managers pidió el presupuesto 3 veces, y el agente nunca reveló nada de la lista.',
            },
            {
              type: 'template',
              title: 'Especificación para su desarrollador: la lista de nunca',
              body: `Necesito un control que corra fuera del modelo, entre la decisión del agente y la ejecución de cualquier herramienta.

1. Un archivo de configuración con:
   Acciones prohibidas: [LISTA, por ejemplo: borrar contactos, cambiar precios, enviar a dominios fuera de la lista]
   Datos que nunca pueden salir: [LISTA, por ejemplo: nombres de clientes finales, datos de tarjeta]
   Límites: [ACCIÓN], máximo [MONTO O CANTIDAD] por [caso, hora o día]

2. Antes de ejecutar cualquier llamada, una función revisa la acción y sus parámetros contra ese archivo y devuelve una de tres respuestas:
   Negar: la llamada no corre y queda registrada con el motivo.
   Retener: va a [RESPONSABLE] con lo que el agente propone, lo que leyó y por qué. Si no hay respuesta en [HORAS] horas, se niega.
   Permitir: corre.

3. Si la función falla, no responde o no encuentra el archivo, la respuesta es negar. Nunca permitir por defecto.

4. Cada llamada negada o retenida queda en un registro con fecha, acción, parámetros y motivo. Me llega un resumen cada [DÍA].

5. El agente no puede editar ni el archivo ni la función. Los cambios a la lista los aprueba [QUIÉN].

6. Una prueba por cada acción de la lista de nunca, que confirme que la llamada falla aunque el prompt le pida hacerla.`,
            },
            {
              type: 'template',
              title: 'Correo para su proveedor de agentes',
              body: `Hola [NOMBRE]:

Antes de darle al agente acceso de escritura a [SISTEMA], necesito tres cosas por escrito.

1. La lista de acciones que el agente puede ejecutar en [SISTEMA], una por una.
2. Dónde se configura lo que tiene prohibido, y si ese control corre fuera del modelo o dentro del prompt.
3. Qué pasa si ese control no responde: ¿la acción se bloquea o sale?

Si hoy solo existe la lista de lo que el agente puede hacer, le pido que me diga cómo y cuándo tendríamos la de lo que nunca puede hacer.

Gracias,
[SU NOMBRE]`,
              note: 'Si la respuesta solo muestra lo que el agente puede hacer, está comprando capacidad, no control.',
            },
          ],
        },
        {
          id: 'costo-por-tarea',
          title: 'Cuánto cuesta cada tarea',
          videos: ['en-11'],
          intro:
            'Nadie le compra a usted un millón de tokens. Aquí saca el costo de una tarea terminada, lo compara con lo que cuesta hoy y escribe un precio que puede defender en una propuesta.',
          blocks: [
            {
              // ev-01
              type: 'p',
              text: 'En octubre de 2026 mis agentes corrieron 8.424 dólares a precio de API en una sola máquina. Esa cuenta no la movió el precio por token. La movieron los tokens de razonamiento, los agentes llamando a otros agentes, el contexto que se reenvía en cada llamada y los reintentos.',
            },
            { type: 'rule', text: 'Presupueste por tarea, no por token.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Corra el flujo diez veces',
                  body: 'Con casos reales, de punta a punta, y anote el costo total que marca el panel de uso de su proveedor.',
                },
                {
                  title: 'Divida por las que terminaron bien',
                  body: 'Una llamada barata que falla no es barata. El número que importa es el costo por tarea exitosa.',
                },
                {
                  title: 'Ponga lo fijo primero',
                  body: 'Instrucciones, herramientas y contexto de su empresa van al principio del prompt, siempre iguales, para que su proveedor los guarde en caché. Una fecha o el nombre del cliente arriba rompe el caché en cada llamada.',
                },
                {
                  title: 'Mande por lotes lo que puede esperar',
                  body: 'Reportes, resúmenes, trabajo de la noche. El descuento de lotes y de caché está en la página de precios de su proveedor: úselo en la hoja de abajo.',
                },
                {
                  // ev-02
                  title: 'Use el modelo según la tarea',
                  body: 'El pequeño lee, busca y clasifica. El mediano escribe código y textos. El grande solo juzga lo difícil, con la razón escrita.',
                },
                {
                  title: 'Póngale techo',
                  body: 'Cada agente con un máximo de pasos y un presupuesto por tarea, y una alerta cuando el costo por tarea se mueve.',
                },
              ],
            },
            {
              type: 'calc',
              id: 'costo-tarea-es',
              title: 'Costo por tarea y lo que ahorra',
              inputs: [
                {
                  id: 'costoPrueba',
                  label: 'Costo total de las corridas de prueba',
                  value: 6,
                  unit: 'USD',
                  hint: 'Ejemplo. Sale del panel de uso de su proveedor.',
                },
                { id: 'corridas', label: 'Corridas de prueba', value: 10 },
                { id: 'exitosas', label: 'Corridas que terminaron bien', value: 8, hint: 'Ejemplo' },
                { id: 'tareasMes', label: 'Tareas al mes', value: 300, hint: 'Ejemplo' },
                {
                  id: 'minPersona',
                  label: 'Minutos que le toma hoy a una persona',
                  value: 25,
                  unit: 'min',
                  hint: 'Ejemplo. Mídalo, no lo calcule de memoria.',
                },
                {
                  id: 'minRevision',
                  label: 'Minutos de revisión humana por tarea con IA',
                  value: 3,
                  unit: 'min',
                  hint: 'Ejemplo',
                },
                {
                  id: 'costoHora',
                  label: 'Costo por hora de esa persona',
                  value: 20,
                  unit: 'USD',
                  hint: 'Ejemplo. Salario con prestaciones dividido por horas trabajadas.',
                },
              ],
              outputs: [
                { label: 'Costo por corrida', expr: 'costoPrueba/corridas', format: 'money' },
                { label: 'Costo de IA por tarea exitosa', expr: 'costoPrueba/exitosas', format: 'money' },
                {
                  label: 'Costo por tarea con IA, revisión incluida',
                  expr: 'costoPrueba/exitosas+minRevision/60*costoHora',
                  format: 'money',
                },
                { label: 'Costo por tarea hoy, a mano', expr: 'minPersona/60*costoHora', format: 'money' },
                { label: 'Costo de IA al mes', expr: 'costoPrueba/exitosas*tareasMes', format: 'money' },
                {
                  label: 'Ahorro al mes',
                  expr: 'tareasMes*(minPersona/60*costoHora-(costoPrueba/exitosas+minRevision/60*costoHora))',
                  format: 'money',
                },
                { label: 'Horas que libera al mes', expr: 'tareasMes*(minPersona-minRevision)/60', format: 'hours' },
              ],
              verdict: {
                expr: 'minPersona/60*costoHora-(costoPrueba/exitosas+minRevision/60*costoHora)',
                pass: 'Cada tarea con IA, revisión incluida, cuesta menos que a mano. Esos dos números van juntos en su propuesta.',
                fail: 'Con estos números la tarea sale más cara con IA. Revise caché, lotes y modelo antes de proponerla, o no la proponga.',
              },
            },
            {
              type: 'sheet',
              id: 'costo-pasos-es',
              title: 'Dónde se va el costo, paso por paso',
              columns: [
                'Paso del flujo',
                'Modelo (pequeño, mediano, grande)',
                'Llamadas por tarea (con reintentos)',
                'Costo promedio por llamada (USD)',
                'Costo por tarea (USD)',
                '¿El inicio del prompt es siempre igual?',
                '¿Puede esperar (lote)?',
                'Cambio que va a probar',
              ],
              rows: [
                ['Ejemplo: clasificar el correo que entra', 'Pequeño', '1', '', '=C2*D2', 'Sí', 'No', ''],
                [
                  'Ejemplo: redactar la respuesta',
                  'Mediano',
                  '1',
                  '',
                  '=C3*D3',
                  'No: lleva la fecha arriba',
                  'No',
                  'Mover la fecha al final del prompt',
                ],
                [
                  'Ejemplo: resumen del día para el gerente',
                  'Grande',
                  '1',
                  '',
                  '=C4*D4',
                  'Sí',
                  'Sí',
                  'Pasarlo a mediano y a lote nocturno',
                ],
                ['', '', '', '', '=C5*D5', '', '', ''],
                ['', '', '', '', '=C6*D6', '', '', ''],
                ['Total por tarea', '', '', '', '=SUM(E2:E6)', '', '', ''],
              ],
              note: 'El costo por llamada sale del registro de uso de su proveedor. Los reintentos cuentan como llamadas. Después de cada cambio, vuelva a correr la calculadora y la suite de la primera sección.',
            },
            {
              type: 'template',
              title: 'Prompt: ordenar su prompt para que se pueda guardar en caché',
              body: `Le voy a pegar el prompt completo que usa mi flujo [NOMBRE DEL FLUJO]. Las partes que cambian en cada llamada van marcadas entre {{ }}.

[PEGUE AQUÍ EL PROMPT]

Haga tres cosas:
1. Separe lo que es igual en todas las llamadas (instrucciones, definición de herramientas, contexto de la empresa, ejemplos) de lo que cambia (fecha, cliente, mensaje, datos del caso).
2. Devuélvame el prompt reordenado: todo lo fijo primero, siempre en el mismo orden, y todo lo variable al final. No cambie el sentido de ninguna instrucción.
3. Liste todo lo variable que hoy está metido en la parte fija (una fecha, un nombre, un contador) y dígame a dónde moverlo.

No resuma ni acorte las instrucciones. Si algo es ambiguo, pregúnteme antes de moverlo.`,
            },
            {
              type: 'template',
              title: 'El costo, escrito para su propuesta',
              body: `Costo de operación del flujo [NOMBRE DEL FLUJO]

Medido en [NÚMERO] corridas con casos reales, del [FECHA] al [FECHA]:
1. Costo de IA por caso terminado: [COSTO POR TAREA EXITOSA]
2. Revisión humana por caso: [MINUTOS] minutos, [COSTO]
3. Costo total por caso: [TOTAL]
4. Lo que cuesta hoy el mismo caso hecho a mano: [COSTO HOY]
5. Volumen estimado: [TAREAS] casos al mes, [COSTO MENSUAL] de operación, [HORAS] horas liberadas.

Techo: si el costo por caso pasa de [TECHO] durante [PERIODO], el flujo se detiene y lo revisamos antes de seguir.
Este costo se vuelve a medir cada vez que cambie el modelo o el prompt.`,
            },
          ],
        },
        {
          id: 'nunca-se-califica-solo',
          title: 'Ningún modelo aprueba su propio trabajo',
          videos: ['es-21', 'en-17'],
          intro:
            'Revisar el resumen que escribió el agente es aprobar lo que él quiso mostrarle, no lo que decidió hacer. Aquí escribe lo que cada salida tiene que cumplir y pone una revisión que puede decir que no.',
          blocks: [
            {
              type: 'compare',
              bad: {
                title: 'Lo que parece control',
                items: [
                  'Leer el resumen que escribió el mismo agente.',
                  'Pedirle al mismo modelo que revise su respuesta.',
                  'Arreglar a mano lo que salió mal y seguir.',
                  'Un revisor que nunca rechaza nada.',
                ],
              },
              good: {
                title: 'Lo que es control',
                items: [
                  'Una lista escrita de lo que la salida tiene que cumplir.',
                  'Una regla fija o un modelo distinto que la revisa.',
                  'Si no pasa, no sale: se devuelve con el motivo.',
                  'Se corrige la entrada y se vuelve a correr.',
                ],
              },
            },
            {
              // ev-04
              type: 'p',
              text: 'En mi operación, cada herramienta de contenido tiene una prueba en código que sale con error y frena el archivo si algo falla. Nada se arregla a mano: se corrige la entrada y se vuelve a correr.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Escriba qué tiene que cumplir cada salida',
                  body: 'Largo, cifras con fuente, palabras prohibidas, formato, datos que nunca pueden aparecer.',
                },
                {
                  title: 'Decida quién revisa cada criterio',
                  body: 'Lo que se puede contar o buscar (largo, palabras, formato, que cada cifra tenga fuente) va en una regla fija, en código. Lo que pide criterio (si responde la pregunta, si es fiel a los datos) lo revisa un modelo distinto del que escribió.',
                },
                {
                  title: 'Si no pasa, no sale',
                  body: 'Se devuelve con el motivo. Nadie la arregla a mano: se corrige la entrada, el prompt o los datos, y se vuelve a correr.',
                },
                {
                  title: 'Revise al revisor',
                  body: 'Compare los veredictos del modelo revisor con los de una persona experta en un grupo de casos. Si no coinciden, el revisor está mal hasta que se demuestre lo contrario.',
                },
              ],
            },
            {
              // T06: 13.6 percent verdict flips on repeat runs.
              type: 'p',
              text: 'Un modelo que juzga a otro tampoco es neutral: en investigación publicada, un juez que compara dos respuestas cambió su veredicto al repetir la misma prueba 13,6 por ciento de las veces en promedio. Por eso el revisor también se mide.',
            },
            {
              type: 'sheet',
              id: 'criterios-es',
              title: 'Lo que cada salida tiene que cumplir',
              columns: [
                'Salida de la IA',
                'Criterio',
                'Cómo se revisa (regla fija o modelo distinto)',
                'Qué regla o qué modelo',
                'Si falla',
                'Quién corrige la entrada',
              ],
              rows: [
                [
                  'Ejemplo: resumen semanal para un cliente',
                  'Máximo [N] palabras',
                  'Regla fija',
                  'Conteo en código',
                  'No sale, vuelve con el motivo',
                  '[nombre]',
                ],
                [
                  'Ejemplo: resumen semanal para un cliente',
                  'Cada cifra con su fuente al lado',
                  'Regla fija',
                  'Busca cifras sin fuente junto a ellas',
                  'No sale, vuelve con el motivo',
                  '[nombre]',
                ],
                [
                  'Ejemplo: resumen semanal para un cliente',
                  'Ninguna palabra de la lista prohibida',
                  'Regla fija',
                  'Lista en configuración',
                  'No sale, vuelve con el motivo',
                  '[nombre]',
                ],
                [
                  'Ejemplo: resumen semanal para un cliente',
                  'Fiel a los datos de origen',
                  'Modelo distinto',
                  '[un modelo distinto del que escribió]',
                  'No sale, vuelve con el motivo',
                  '[nombre]',
                ],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
              ],
            },
            {
              type: 'template',
              title: 'Prompt para el modelo revisor (nunca el mismo que escribió)',
              body: `Usted revisa una salida escrita por otro sistema. No la reescribe ni la mejora: decide si pasa o no pasa.

CRITERIOS (todos obligatorios):
1. [CRITERIO, por ejemplo: toda cifra coincide con una cifra de los DATOS DE ORIGEN]
2. [CRITERIO, por ejemplo: no afirma nada que no esté en los DATOS DE ORIGEN]
3. [CRITERIO, por ejemplo: responde esta pregunta del cliente: [PREGUNTA]]

DATOS DE ORIGEN:
[PEGUE AQUÍ LOS DATOS, DOCUMENTOS O REGISTROS QUE USÓ EL SISTEMA]

SALIDA A REVISAR:
[PEGUE AQUÍ LA SALIDA]

Responda solo con este formato:
VEREDICTO: PASA o NO PASA
FALLAS: una línea por criterio que no se cumple, con la frase exacta de la salida y el criterio que incumple.
SIN VERIFICAR: lo que no pudo confirmar con los datos de origen.

Reglas:
1. Lo que no puede verificar con los datos de origen cuenta como falla. No hay beneficio de la duda.
2. El estilo no es un criterio. No premie una salida por estar bien escrita.
3. Si todos los criterios se cumplen, diga PASA aunque usted lo habría escrito distinto.`,
              note: 'Corra este prompt en un modelo distinto del que escribió la salida. Lo que se puede contar, como el largo o las palabras prohibidas, déjelo en código.',
            },
            {
              type: 'check',
              id: 'revisor-es',
              title: 'Ningún modelo se califica solo',
              items: [
                'Cada salida de la IA tiene sus criterios escritos.',
                'El revisor nunca es el mismo modelo que escribió.',
                'Lo que se puede contar o buscar lo revisa código, no un modelo.',
                'Si no pasa, no sale, y nadie lo arregla a mano.',
                'Medí al revisor contra una persona experta en un grupo de casos.',
                'Sé cuántas salidas rechazó el revisor este mes. Si son cero, reviso al revisor.',
              ],
            },
          ],
        },
        {
          id: 'ninguna-cifra-inventada',
          title: 'Ninguna cifra inventada frente a un cliente',
          videos: ['es-26'],
          intro:
            'La IA no miente: completa con lo más probable, sin dudar. Aquí pone la regla de la fuente al lado y decide qué datos nunca salen de la memoria del modelo.',
          blocks: [
            {
              type: 'rule',
              text: 'Todo dato que sale hacia un cliente lleva su fuente al lado. Si no tiene fuente, no sale.',
            },
            {
              type: 'p',
              text: 'Mentir requiere saber la verdad. Una persona que no sabe, duda; la IA no duda. Le puede resolver una pregunta de doctorado y en la misma respuesta inventarse un libro que no existe. Es brillante a las diez y bruta a las once, y el control es suyo.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Marque qué es un dato',
                  body: 'Cifras, nombres, citas, fechas, precios, condiciones de un contrato. Todo eso necesita fuente.',
                },
                {
                  title: 'Pida la fuente de cada afirmación',
                  body: 'En el mismo prompt, no después. Y abra usted cada fuente: un enlace que escribe el modelo también puede ser inventado.',
                },
                {
                  title: 'Lo que no admite error no sale de la memoria del modelo',
                  body: 'Precios, contratos y cifras de su empresa salen de una regla fija o de un sistema que consulta su propia información.',
                },
                {
                  title: 'Revise antes de enviar',
                  body: 'Con la lista del final, cada vez que un texto de la IA va para un cliente.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'datos-sensibles-es',
              title: 'De dónde sale cada tipo de dato',
              columns: [
                'Tipo de dato',
                'Ejemplo en su empresa',
                '¿Admite error?',
                'De dónde sale (sistema propio, documento propio, regla fija, fuente externa, memoria del modelo)',
                'Quién lo verifica antes de enviar',
              ],
              rows: [
                ['Precios', '[su lista de precios]', 'No', 'Sistema propio o regla fija', '[nombre]'],
                ['Condiciones de contrato', '', 'No', 'Documento propio', ''],
                ['Resultados de un cliente', '', 'No', 'Sistema propio', ''],
                ['Datos de mercado', '', 'Solo con fuente', 'Fuente externa que usted abrió', ''],
                ['Redacción y tono', '', 'Sí', 'Memoria del modelo', ''],
                ['', '', '', '', ''],
              ],
            },
            {
              type: 'template',
              title: 'Prompt: escribir con la fuente al lado',
              body: `Va a preparar [QUÉ, por ejemplo: un correo de seguimiento para un cliente] usando SOLO las fuentes que le pego abajo.

FUENTES:
[F1] [PEGUE EL TEXTO O EL ENLACE]
[F2] [PEGUE EL TEXTO O EL ENLACE]

Reglas:
1. Cada cifra, nombre, fecha, cita o precio lleva al lado su fuente entre corchetes, por ejemplo [F2].
2. Si un dato no está en las fuentes, no lo escriba. Ponga en su lugar [SIN FUENTE: lo que haría falta].
3. No complete con lo que suele ser cierto en la industria. Si no está en las fuentes, no existe para este texto.
4. Al final, liste cada dato que usó con su fuente y la frase exacta de la fuente de donde lo sacó.

Si no puede escribir el texto sin datos que no están en las fuentes, dígamelo en vez de escribirlo.`,
            },
            {
              type: 'template',
              title: 'Prompt: sacar todos los datos de un texto antes de enviarlo',
              body: `Le pego un texto que va para un cliente. No lo reescriba ni lo corrija.

TEXTO:
[PEGUE EL TEXTO]

Saque cada afirmación que se pueda verificar (cifra, nombre, fecha, cita, precio, condición) en una tabla de tres columnas: la afirmación exacta, el tipo de dato y qué fuente haría falta para confirmarla.
No juzgue si son ciertas. Solo lístelas todas, sin saltarse ninguna.`,
              note: 'Con esa tabla al lado, abra cada fuente usted. Mejor si lo corre en un modelo distinto del que escribió el texto.',
            },
            {
              type: 'check',
              id: 'antes-de-enviar-es',
              title: 'Antes de que salga hacia un cliente',
              items: [
                'Cada cifra del texto tiene su fuente al lado.',
                'Abrí cada fuente y el dato está ahí, igual.',
                'Ningún precio ni condición de contrato salió de la memoria del modelo.',
                'Cada [SIN FUENTE] se resolvió o se borró.',
                'Ninguna cita de una persona, un estudio o un libro quedó sin confirmar.',
              ],
            },
          ],
        },
      ],
      next: {
        text: 'Si quiere ver cómo se arma esto con agentes en una operación real, siga con la guía de IA.',
        cta: 'Ver la guía de IA',
        page: 'ai',
      },
    },

    // English
    en: {
      title: 'The AI control kit',
      promise:
        "Six controls you set up this week: how often your system is right, who answers for each action, what your agent may never do, what each task costs, who checks the AI's work and where every number comes from.",
      minutes: 45,
      howTo: [
        'Pick one task your AI already runs, the one that worries you most, and take it through all six sections.',
        'The sheets paste straight into Google Sheets or Excel, formulas included. Templates have a copy button: fill in whatever sits in [BRACKETS].',
        'Checklists keep their ticks in this browser. Come back when you add the next task.',
        'If a cell stays empty, that is your answer: that task should not run on its own yet.',
      ],
      sections: [
        {
          id: 'how-often-right',
          title: 'How often it is right, before you ship',
          videos: ['en-03'],
          intro:
            'A demo that worked is a sample of one. Here you build an eval suite from real failures and leave with a number: how often your system is right.',
          blocks: [
            {
              type: 'rule',
              text: "If you can't say how often it's right, you don't know it works. You know it worked once.",
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Collect the real failures',
                  body: 'Support tickets, angry emails, the edge cases your team jokes about. That is where your 20 to 50 cases come from, not the happy path.',
                },
                {
                  title: 'Turn each failure into a test',
                  body: 'The exact input, the expected answer written down before you run it, and what the output must never say.',
                },
                {
                  title: 'Split them in two',
                  body: 'Regression: what already works and must not break, should pass close to a hundred percent. Capability: what it cannot do yet, starts low, and that is fine.',
                },
                {
                  title: 'Run the suite on every change',
                  body: "Every time you change a prompt, a tool or the model. A new model isn't an upgrade until the suite says so.",
                },
                {
                  title: 'Every new failure joins the suite',
                  body: 'The suite only grows. A failure you have already seen should never reach a customer again.',
                },
              ],
            },
            {
              // ev-06
              type: 'p',
              text: 'An example from my own operation: the same news story went out three times in 7 days because the duplicate check compared links, not stories. The fix was to compare the event and the entities. That is the kind of case that belongs in your suite: a failure that got past a check.',
            },
            {
              type: 'template',
              title: 'Prompt: turn a real failure into a test case',
              body: `You are helping me build the eval suite for an AI system that [WHAT THE SYSTEM DOES, for example: answers customer questions about orders].

I will paste one real failure: what the system received, what it answered and why it was wrong.

FAILURE:
[PASTE THE TICKET, EMAIL OR CONVERSATION HERE]

Return one row, columns separated by tabs, ready to paste into my sheet:
case | source | exact input | expected answer | must never say | type (regression or capability)

Rules:
1. The input goes in exactly as it arrived. Do not clean it up: typos and missing context are part of the test.
2. Write the expected answer as something checkable ("says it cannot find the order and asks for the order number"), not as a style ("answers politely").
3. If the failure does not make the right answer clear, do not invent one. Write TO DEFINE and tell me which question I need to answer.
4. Type: regression if the system already handles this case correctly today; capability if it never has.
5. Replace any customer personal data with [NAME], [EMAIL], [PHONE].`,
            },
            {
              type: 'sheet',
              id: 'suite-en',
              title: 'Your eval suite',
              columns: [
                'Case',
                'Where the failure came from',
                'Exact input',
                'Expected answer',
                'Must never say',
                'Type',
                'Run 1 (1 pass, 0 fail)',
                'Run 2',
                'Run 3',
                'Passes',
              ],
              rows: [
                [
                  'Example: asks about an order that does not exist',
                  'Support ticket',
                  '[paste the message as is]',
                  'Says it cannot find the order and asks for the number',
                  'A made up shipping status',
                  'Regression',
                  '1',
                  '1',
                  '0',
                  '=G2+H2+I2',
                ],
                [
                  'Example: asks for a discount that does not exist',
                  'Angry customer email',
                  '[paste the message as is]',
                  'Explains the current policy and offers a person',
                  'A discount nobody approved',
                  'Regression',
                  '',
                  '',
                  '',
                  '=G3+H3+I3',
                ],
                ['', '', '', '', '', '', '', '', '', '=G4+H4+I4'],
                ['', '', '', '', '', '', '', '', '', '=G5+H5+I5'],
                ['', '', '', '', '', '', '', '', '', '=G6+H6+I6'],
              ],
              note: "Run each case more than once: an AI system doesn't answer the same way every time. Add up passing runs by type and take them to the calculator below.",
            },
            {
              type: 'calc',
              id: 'hit-rate-en',
              title: 'Hit rate against your threshold',
              inputs: [
                {
                  id: 'regPass',
                  label: 'Regression runs that passed',
                  value: 27,
                  hint: 'Example. From the Passes column.',
                },
                { id: 'regTotal', label: 'Regression runs in total', value: 30, hint: 'Cases times runs' },
                { id: 'capPass', label: 'Capability runs that passed', value: 4, hint: 'Example' },
                { id: 'capTotal', label: 'Capability runs in total', value: 12, hint: 'Example' },
                {
                  id: 'threshold',
                  label: 'Your ship threshold (% of regression)',
                  value: 95,
                  unit: '%',
                  hint: 'You set it, based on what one error costs in this task.',
                },
              ],
              outputs: [
                { label: 'Regression hit rate (%)', expr: 'regPass/regTotal*100', format: 'number' },
                { label: 'Capability hit rate (%)', expr: 'capPass/capTotal*100', format: 'number' },
                { label: 'Distance to your threshold (points)', expr: 'regPass/regTotal*100-threshold', format: 'number' },
              ],
              verdict: {
                expr: 'regPass/regTotal*100-threshold+0.001',
                pass: 'Regression clears your threshold. You can ship, and the suite keeps running on every change.',
                fail: "It doesn't clear your threshold. Don't ship yet: look at which cases fail and fix the system or the input, never the test.",
              },
            },
            {
              type: 'check',
              id: 'before-you-ship-en',
              title: 'Before you ship',
              items: [
                'I have 20 to 50 cases taken from real failures, not made up.',
                'Every case has its expected answer written before it runs.',
                'I ran every case more than once.',
                'Regression clears the threshold I set.',
                'The suite runs every time I change a prompt, a tool or the model.',
                'A named person moves every new failure into the suite.',
              ],
            },
          ],
        },
        {
          id: 'a-real-owner',
          title: 'A real owner for every action',
          videos: ['es-12'],
          intro:
            'A human approving everything is not control. Here you write the four answers for everything your AI does on its own, and find out which tasks should not run alone yet.',
          blocks: [
            {
              // T07: Anthropic, around 93 percent of permission prompts approved.
              type: 'p',
              text: 'Reviewer attention drops with volume. Anthropic published that developers approve around 93 percent of the permission prompts from its coding agent, and those are technical users with the context right in front of them. A few reviews done well beat an endless queue.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'List what your AI does on its own',
                  body: 'Every action that goes out without anyone touching it: replying to a customer, changing a record, sending an email, charging a card.',
                },
                {
                  title: 'Decide what needs review',
                  body: "By consequence, not by category: anything that moves money, touches a customer, changes credentials or can't be undone. Nothing else should reach a person.",
                },
                {
                  title: 'Answer the four questions',
                  body: 'Who reviews, by name. How fast they respond, in hours. What they can override and what they cannot. What happens when that person is not there.',
                },
                {
                  title: 'If nobody answers, it stops',
                  body: "If the answer to the fourth question is 'nothing', the system has to stop on its own. A timeout that quietly approves is not control.",
                },
                {
                  title: 'Review the reviewers every week',
                  body: "How many cases they approved, how many they changed, how long they spent. If nothing ever changes, either the rule is set wrong or the review isn't happening.",
                },
              ],
            },
            {
              type: 'sheet',
              id: 'four-questions-en',
              title: 'The four questions, one row per action',
              columns: [
                'Action the AI takes on its own',
                'What happens if it goes wrong',
                'Who reviews (name)',
                'Backup (name)',
                'Responds within (hours)',
                'Can override',
                'Cannot override',
                'If nobody responds',
                'Can it run alone?',
              ],
              rows: [
                [
                  'Example: send a quote to a new customer',
                  'A wrong price in front of the customer',
                  '[name]',
                  '[name]',
                  '[hours]',
                  'Price, discount, delivery date',
                  'The template and the standard terms',
                  'It does not go out: stays as a draft',
                  'Yes, with all four answers',
                ],
                [
                  'Example: answer FAQs over WhatsApp',
                  'A wrong answer to a customer',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  'No: answers missing',
                ],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
              ],
              note: 'An empty cell under who, backup, hours or if nobody responds means that action has no control, only someone to blame. It does not run alone until the row is complete.',
            },
            {
              // ev-05
              type: 'p',
              text: 'This is how it works in my operation: the routines that publish read an on switch file first. If the file is missing, they run as a draft and publish nothing. Stopping on its own is a design decision, not a discipline one.',
            },
            {
              type: 'template',
              title: 'Message to assign the owner',
              body: `[NAME], starting [DATE] you are the person responsible for reviewing [WHAT THE AI DOES, for example: the quotes the AI prepares for new customers].

What that means:
1. You only get the cases that [RULE, for example: exceed [AMOUNT] or are a customer's first quote]. Everything else goes out without review.
2. You respond within [HOURS] business hours.
3. You can change or reject [WHAT YOU CAN OVERRIDE]. You cannot change [WHAT YOU CANNOT]: [WHO] decides that.
4. If you are out, [BACKUP] reviews. If neither of you responds in time, the case does not go out and stays as a draft.
5. Rejecting takes one line with the reason. Nothing more.
6. Every case reaches you with what the AI proposes, what it read to propose it and what it does not know. If all you get is two buttons, tell me.

Every [DAY] we look together at how many cases you got, how many you changed and how long they took. If the volume doesn't let you read every case, tell me that same day and we change the rule, not your attention.

Can you confirm you're taking this on?`,
            },
            {
              type: 'sheet',
              id: 'weekly-review-en',
              title: 'Reviewing the review, every week',
              columns: [
                'Week',
                'Cases received',
                'Approved unchanged',
                'Changed or rejected',
                '% changed',
                'Average minutes per case',
                'Decision',
              ],
              rows: [
                [
                  'Example: week 1',
                  '40',
                  '39',
                  '1',
                  '=D2/B2*100',
                  '1',
                  'Check whether the rule sends cases that need no review',
                ],
                ['', '', '', '', '=D3/B3*100', '', ''],
                ['', '', '', '', '=D4/B4*100', '', ''],
                ['', '', '', '', '=D5/B5*100', '', ''],
              ],
              note: 'You decide which percentage worries you. If week after week almost nothing changes and each case takes a minute, the review is a formality: raise the bar for what reaches a person, or decide the routine cases with a rule.',
            },
            {
              type: 'check',
              id: 'owner-en',
              title: 'Control, not theater',
              items: [
                'Every action the AI takes on its own has a row.',
                "No row says 'the team' where a name should be.",
                'Every owner has a backup.',
                'If nobody responds in time, the action does not go out.',
                'The owner sees the evidence (what the AI proposes, what it read, what it does not know), not just two buttons.',
                'Actions without a complete row are switched off.',
              ],
            },
          ],
        },
        {
          id: 'allowed-and-never',
          title: 'What your agent is allowed to do, and what it may never do',
          videos: ['en-07'],
          intro:
            "Your agent being able to touch your CRM says nothing about what it's allowed to do there. Here you write the permission for every action and put the never list in code, outside the model.",
          blocks: [
            { type: 'rule', text: 'A rule written in the prompt is a request, not a control.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'List every action, not every system',
                  body: "Not 'the CRM': read contacts, edit a field, send an email, issue a refund, delete. One row per action per tool.",
                },
                {
                  title: 'Write the permission',
                  body: 'Allowed, allowed with a limit (amount, count per hour, record type), or never.',
                },
                {
                  title: 'Write the precondition',
                  body: 'What must be true first: identity verified, contract active, evidence attached.',
                },
                {
                  title: 'Enforce the never list in code',
                  body: 'Between the agent deciding and the action running. If the action is on the list, the call fails before it runs, whatever the model says.',
                },
                {
                  title: 'Make it fail closed',
                  body: 'If the check does not respond, the action does not run. The opposite default switches your control off exactly when your system is unhealthy.',
                },
                {
                  title: 'Log every blocked call',
                  body: 'That list shows you what the agent tried to do that nobody expected it to try.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'permissions-en',
              title: 'The permissions table',
              columns: [
                'Tool',
                'Action',
                'Permission (allowed, with a limit, never)',
                'Limit',
                'Precondition',
                'Can it be undone?',
                'Where it is enforced (code or prompt)',
              ],
              rows: [
                ['Example: CRM', 'Read contacts', 'Allowed', '', '', 'Yes', 'Code'],
                [
                  'Example: CRM',
                  'Move a deal to another stage',
                  'With a limit',
                  'Only deals assigned to the agent',
                  'The deal exists and is open',
                  'Yes',
                  'Code',
                ],
                ['Example: CRM', 'Delete a contact', 'Never', '', '', 'No', 'Code'],
                [
                  'Example: payments',
                  'Issue a refund',
                  'With a limit',
                  '[MAX AMOUNT] per case',
                  'Order verified',
                  'No',
                  'Code',
                ],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
              ],
              note: "Every row that says 'prompt' in the last column is a request. Move it into code, starting with the ones that can't be undone.",
            },
            {
              // ev-29
              type: 'p',
              text: "A case from my own operation: a partner agency's end client is never named in a message to a creator. The list lives in config and a script rejects any message that names it. Across 5 logged runs in September 2026, creators and managers asked for the budget, the brief or the date before quoting a rate, one management team asked for the budget 3 times, and the agent never revealed anything on the list.",
            },
            {
              type: 'template',
              title: 'Spec for your engineer: the never list',
              body: `I need a control that runs outside the model, between the agent's decision and the execution of any tool.

1. A config file with:
   Forbidden actions: [LIST, for example: delete contacts, change prices, send to domains outside the allowlist]
   Data that can never go out: [LIST, for example: end client names, card data]
   Limits: [ACTION], at most [AMOUNT OR COUNT] per [case, hour or day]

2. Before any call executes, a function checks the action and its parameters against that file and returns one of three answers:
   Deny: the call does not run and is logged with the reason.
   Hold: it goes to [OWNER] with what the agent proposes, what it read and why. If there is no answer within [HOURS] hours, it is denied.
   Permit: it runs.

3. If the function errors, times out or cannot find the file, the answer is deny. Never permit by default.

4. Every denied or held call is logged with date, action, parameters and reason. I get a summary every [DAY].

5. The agent cannot edit the file or the function. Changes to the list are approved by [WHO].

6. One test per action on the never list, confirming the call fails even when the prompt asks for it.`,
            },
            {
              type: 'template',
              title: 'Email to your agent vendor',
              body: `Hi [NAME],

Before we give the agent write access to [SYSTEM], I need three things in writing.

1. The list of actions the agent can execute in [SYSTEM], one by one.
2. Where we configure what it is forbidden to do, and whether that control runs outside the model or inside the prompt.
3. What happens if that control does not respond: is the action blocked, or does it go through?

If today there is only a list of what the agent can do, please tell me how and when we would get the list of what it can never do.

Thanks,
[YOUR NAME]`,
              note: "If the answer only shows what the agent can do, you're buying capability, not control.",
            },
          ],
        },
        {
          id: 'cost-per-task',
          title: 'What each task costs',
          videos: ['en-11'],
          intro:
            'Nobody sells a client a million tokens. Here you work out what one finished task costs, compare it with what it costs today and write a price you can defend in a proposal.',
          blocks: [
            {
              // ev-01
              type: 'p',
              text: "In October 2026 my agents ran 8,424 dollars at API prices on one machine. The price per token didn't drive that bill. Reasoning tokens did, and agents calling agents, context resent on every call, and retries.",
            },
            { type: 'rule', text: 'Budget per task, not per token.' },
            {
              type: 'steps',
              items: [
                {
                  title: 'Run the workflow ten times',
                  body: "Real cases, end to end, and write down the total cost your provider's usage dashboard shows.",
                },
                {
                  title: 'Divide by the runs that finished correctly',
                  body: "A cheap call that fails isn't cheap. The number that matters is cost per successful task.",
                },
                {
                  title: 'Put the fixed parts first',
                  body: 'Instructions, tool definitions and company context go at the start of the prompt, identical every time, so your provider can cache them. A date or a customer name at the top breaks the cache on every call.',
                },
                {
                  title: "Batch whatever can wait",
                  body: "Reports, summaries, overnight work. The batch and cache discounts are on your provider's pricing page: use them in the sheet below.",
                },
                {
                  // ev-02
                  title: 'Match the model to the task',
                  body: 'The small one reads, searches and classifies. The mid one writes code and copy. The large one only judges the hard calls, with the reason written down.',
                },
                {
                  title: 'Put a ceiling on it',
                  body: 'Every agent gets a maximum number of steps and a budget per task, and an alert when the cost per task moves.',
                },
              ],
            },
            {
              type: 'calc',
              id: 'cost-per-task-en',
              title: 'Cost per task and what it saves',
              inputs: [
                {
                  id: 'testCost',
                  label: 'Total cost of the test runs',
                  value: 6,
                  unit: 'USD',
                  hint: "Example. From your provider's usage dashboard.",
                },
                { id: 'runs', label: 'Test runs', value: 10 },
                { id: 'good', label: 'Runs that finished correctly', value: 8, hint: 'Example' },
                { id: 'tasksMonth', label: 'Tasks per month', value: 300, hint: 'Example' },
                {
                  id: 'humanMin',
                  label: 'Minutes a person takes today',
                  value: 25,
                  unit: 'min',
                  hint: "Example. Measure it, don't guess.",
                },
                {
                  id: 'reviewMin',
                  label: 'Minutes of human review per AI task',
                  value: 3,
                  unit: 'min',
                  hint: 'Example',
                },
                {
                  id: 'hourCost',
                  label: 'Loaded hourly cost of that person',
                  value: 20,
                  unit: 'USD',
                  hint: 'Example. Salary plus benefits divided by hours worked.',
                },
              ],
              outputs: [
                { label: 'Cost per run', expr: 'testCost/runs', format: 'money' },
                { label: 'AI cost per successful task', expr: 'testCost/good', format: 'money' },
                {
                  label: 'Cost per task with AI, review included',
                  expr: 'testCost/good+reviewMin/60*hourCost',
                  format: 'money',
                },
                { label: 'Cost per task today, by hand', expr: 'humanMin/60*hourCost', format: 'money' },
                { label: 'AI cost per month', expr: 'testCost/good*tasksMonth', format: 'money' },
                {
                  label: 'Monthly saving',
                  expr: 'tasksMonth*(humanMin/60*hourCost-(testCost/good+reviewMin/60*hourCost))',
                  format: 'money',
                },
                { label: 'Hours freed per month', expr: 'tasksMonth*(humanMin-reviewMin)/60', format: 'hours' },
              ],
              verdict: {
                expr: 'humanMin/60*hourCost-(testCost/good+reviewMin/60*hourCost)',
                pass: 'Each task with AI, review included, costs less than by hand. Those two numbers go side by side in your proposal.',
                fail: "With these numbers the task costs more with AI. Work on caching, batching and model choice before you propose it, or don't propose it.",
              },
            },
            {
              type: 'sheet',
              id: 'cost-by-step-en',
              title: 'Where the cost goes, step by step',
              columns: [
                'Workflow step',
                'Model (small, mid, large)',
                'Calls per task (retries included)',
                'Average cost per call (USD)',
                'Cost per task (USD)',
                'Is the start of the prompt always identical?',
                'Can it wait (batch)?',
                'Change to test',
              ],
              rows: [
                ['Example: classify the incoming email', 'Small', '1', '', '=C2*D2', 'Yes', 'No', ''],
                [
                  'Example: draft the reply',
                  'Mid',
                  '1',
                  '',
                  '=C3*D3',
                  'No: the date sits at the top',
                  'No',
                  'Move the date to the end of the prompt',
                ],
                [
                  "Example: the manager's daily summary",
                  'Large',
                  '1',
                  '',
                  '=C4*D4',
                  'Yes',
                  'Yes',
                  'Move it to mid and to an overnight batch',
                ],
                ['', '', '', '', '=C5*D5', '', '', ''],
                ['', '', '', '', '=C6*D6', '', '', ''],
                ['Total per task', '', '', '', '=SUM(E2:E6)', '', '', ''],
              ],
              note: "Cost per call comes from your provider's usage log. Retries count as calls. After every change, rerun the calculator and the eval suite from the first section.",
            },
            {
              type: 'template',
              title: 'Prompt: reorder your prompt so it can be cached',
              body: `I'm pasting the full prompt my [WORKFLOW NAME] workflow uses. The parts that change on every call are marked with {{ }}.

[PASTE THE PROMPT HERE]

Do three things:
1. Separate what is identical on every call (instructions, tool definitions, company context, examples) from what changes (date, customer, message, case data).
2. Return the prompt reordered: everything fixed first, always in the same order, everything variable at the end. Do not change the meaning of any instruction.
3. List anything variable that currently sits inside the fixed part (a date, a name, a counter) and tell me where to move it.

Do not summarize or shorten the instructions. If something is ambiguous, ask me before you move it.`,
            },
            {
              type: 'template',
              title: 'The cost, written for your proposal',
              body: `Operating cost of the [WORKFLOW NAME] workflow

Measured over [NUMBER] runs on real cases, [DATE] to [DATE]:
1. AI cost per finished case: [COST PER SUCCESSFUL TASK]
2. Human review per case: [MINUTES] minutes, [COST]
3. Total cost per case: [TOTAL]
4. What the same case costs today by hand: [COST TODAY]
5. Expected volume: [TASKS] cases a month, [MONTHLY COST] to run, [HOURS] hours freed.

Ceiling: if the cost per case goes above [CEILING] for [PERIOD], the workflow stops and we review it before it continues.
This cost is measured again every time the model or the prompt changes.`,
            },
          ],
        },
        {
          id: 'never-grades-itself',
          title: 'No model grades its own homework',
          videos: ['es-21', 'en-17'],
          intro:
            "Reading the summary your agent wrote means approving what it chose to show you, not what it chose to do. Here you write what every output must satisfy and put in a check that is allowed to say no.",
          blocks: [
            {
              type: 'compare',
              bad: {
                title: 'What looks like control',
                items: [
                  'Reading the summary the same agent wrote.',
                  'Asking the same model to review its own answer.',
                  'Fixing what went wrong by hand and moving on.',
                  'A reviewer that never rejects anything.',
                ],
              },
              good: {
                title: 'What is control',
                items: [
                  'A written list of what the output must satisfy.',
                  'A fixed rule or a different model checks it.',
                  "If it fails, it doesn't ship: it goes back with the reason.",
                  'You fix the input and run it again.',
                ],
              },
            },
            {
              // ev-04
              type: 'p',
              text: 'In my own operation, every content tool has a check in code that exits with an error and stops the file when something fails. Nothing gets fixed by hand: you fix the input and run it again.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Write what every output must satisfy',
                  body: 'Length, a source on every number, words it can never use, format, data that must never appear.',
                },
                {
                  title: 'Decide who checks each criterion',
                  body: 'Anything you can count or search for (length, words, format, a source next to every number) goes in a fixed rule, in code. Anything that takes judgment (does it answer the question, is it faithful to the data) is checked by a different model than the one that wrote it.',
                },
                {
                  title: "If it fails, it doesn't ship",
                  body: 'It goes back with the reason. Nobody patches it by hand: you fix the input, the prompt or the data, and run it again.',
                },
                {
                  title: 'Check the checker',
                  body: 'Compare the reviewer model\'s verdicts with a human expert on a set of cases. If they disagree, the reviewer is wrong until proven otherwise.',
                },
              ],
            },
            {
              // T06: 13.6 percent verdict flips on repeat runs.
              type: 'p',
              text: 'A model judging another model is not neutral either: in published research, a judge comparing two answers flipped its verdict 13.6 percent of the time on average when the same comparison was run again. That is why the reviewer gets measured too.',
            },
            {
              type: 'sheet',
              id: 'criteria-en',
              title: 'What every output must satisfy',
              columns: [
                'AI output',
                'Criterion',
                'How it is checked (fixed rule or different model)',
                'Which rule or which model',
                'If it fails',
                'Who fixes the input',
              ],
              rows: [
                [
                  'Example: weekly client summary',
                  'At most [N] words',
                  'Fixed rule',
                  'Word count in code',
                  'Does not ship, goes back with the reason',
                  '[name]',
                ],
                [
                  'Example: weekly client summary',
                  'A source next to every number',
                  'Fixed rule',
                  'Flags any number without a source beside it',
                  'Does not ship, goes back with the reason',
                  '[name]',
                ],
                [
                  'Example: weekly client summary',
                  'No word from the banned list',
                  'Fixed rule',
                  'List in config',
                  'Does not ship, goes back with the reason',
                  '[name]',
                ],
                [
                  'Example: weekly client summary',
                  'Faithful to the source data',
                  'Different model',
                  '[a different model than the writer]',
                  'Does not ship, goes back with the reason',
                  '[name]',
                ],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
              ],
            },
            {
              type: 'template',
              title: 'Prompt for the reviewer model (never the one that wrote it)',
              body: `You are reviewing an output written by another system. You do not rewrite or improve it: you decide whether it passes.

CRITERIA (all required):
1. [CRITERION, for example: every number matches a number in the SOURCE DATA]
2. [CRITERION, for example: it claims nothing that is not in the SOURCE DATA]
3. [CRITERION, for example: it answers this customer question: [QUESTION]]

SOURCE DATA:
[PASTE THE DATA, DOCUMENTS OR RECORDS THE SYSTEM USED]

OUTPUT TO REVIEW:
[PASTE THE OUTPUT]

Reply only in this format:
VERDICT: PASS or FAIL
FAILURES: one line per criterion not met, quoting the exact sentence from the output and the criterion it breaks.
UNVERIFIED: anything you could not confirm from the source data.

Rules:
1. Anything you cannot verify from the source data counts as a failure. No benefit of the doubt.
2. Style is not a criterion. Do not reward an output for being well written.
3. If every criterion is met, say PASS even if you would have written it differently.`,
              note: 'Run this prompt on a different model than the one that wrote the output. Keep anything countable, like length or banned words, in code.',
            },
            {
              type: 'check',
              id: 'reviewer-en',
              title: 'No model grades itself',
              items: [
                'Every AI output has written criteria.',
                'The reviewer is never the model that wrote it.',
                'Anything countable or searchable is checked by code, not a model.',
                "If it fails, it doesn't ship, and nobody patches it by hand.",
                'I measured the reviewer against a human expert on a set of cases.',
                'I know how many outputs the reviewer rejected this month. If it is zero, I check the reviewer.',
              ],
            },
          ],
        },
        {
          id: 'no-invented-numbers',
          title: 'No invented number in front of a client',
          videos: ['es-26'],
          intro:
            "AI doesn't lie: it fills in the most likely answer without hesitating. Here you set the source next to every claim, and decide which data never comes from the model's memory.",
          blocks: [
            {
              type: 'rule',
              text: "Every fact that goes to a client carries its source next to it. No source, it doesn't go out.",
            },
            {
              type: 'p',
              text: "Lying requires knowing the truth. A person who doesn't know hesitates; AI doesn't. It can solve a PhD level question and invent a book that doesn't exist in the same answer. Brilliant at ten and wrong at eleven, and the control is yours.",
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Mark what counts as a fact',
                  body: 'Numbers, names, quotes, dates, prices, contract terms. All of it needs a source.',
                },
                {
                  title: 'Ask for the source of every claim',
                  body: 'In the same prompt, not afterward. Then open every source yourself: a link the model writes can be invented too.',
                },
                {
                  title: "What can't be wrong never comes from the model's memory",
                  body: 'Prices, contracts and your company numbers come from a fixed rule or from a system that queries your own data.',
                },
                {
                  title: 'Check before you send',
                  body: 'With the checklist at the end, every time an AI text goes to a client.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'sensitive-data-en',
              title: 'Where each kind of fact comes from',
              columns: [
                'Kind of fact',
                'Example in your company',
                'Can it be wrong?',
                "Where it comes from (own system, own document, fixed rule, external source, model's memory)",
                'Who verifies it before it goes out',
              ],
              rows: [
                ['Prices', '[your price list]', 'No', 'Own system or fixed rule', '[name]'],
                ['Contract terms', '', 'No', 'Own document', ''],
                ['A client\'s results', '', 'No', 'Own system', ''],
                ['Market data', '', 'Only with a source', 'External source you opened', ''],
                ['Wording and tone', '', 'Yes', "Model's memory", ''],
                ['', '', '', '', ''],
              ],
            },
            {
              type: 'template',
              title: 'Prompt: write with the source next to every claim',
              body: `You will prepare [WHAT, for example: a follow up email to a client] using ONLY the sources I paste below.

SOURCES:
[S1] [PASTE THE TEXT OR THE LINK]
[S2] [PASTE THE TEXT OR THE LINK]

Rules:
1. Every number, name, date, quote or price carries its source in brackets right next to it, for example [S2].
2. If a fact is not in the sources, do not write it. Put [NO SOURCE: what would be needed] in its place.
3. Do not fill in with what is usually true in the industry. If it is not in the sources, it does not exist for this text.
4. At the end, list every fact you used with its source and the exact sentence from the source it came from.

If you cannot write the text without facts that are not in the sources, tell me instead of writing it.`,
            },
            {
              type: 'template',
              title: 'Prompt: pull every claim out of a text before it goes out',
              body: `I'm pasting a text that is going to a client. Do not rewrite or correct it.

TEXT:
[PASTE THE TEXT]

Pull out every checkable claim (number, name, date, quote, price, term) into a three column table: the exact claim, the kind of fact, and what source would be needed to confirm it.
Do not judge whether they are true. Just list all of them, without skipping any.`,
              note: 'With that table beside you, open every source yourself. Better still, run it on a different model than the one that wrote the text.',
            },
            {
              type: 'check',
              id: 'before-sending-en',
              title: 'Before it goes to a client',
              items: [
                'Every number in the text has its source next to it.',
                'I opened every source and the fact is there, exactly.',
                "No price or contract term came from the model's memory.",
                'Every [NO SOURCE] was resolved or deleted.',
                'No quote from a person, a study or a book went out unconfirmed.',
              ],
            },
          ],
        },
      ],
      next: {
        text: 'If you want these controls running in your own stack, this is how I work with founders.',
        cta: 'Work with Daniel',
        page: 'work',
      },
    },
  },
};

export default kit;
