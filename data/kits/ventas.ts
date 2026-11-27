import type { Kit } from './types';

// VENTAS (espanol): el kit de ventas y seguimiento. Videos es-04 (T24), es-09 (ev-10), es-27 (T25).
// Fuentes: C:/agents/studio/specs/faceless/semana/2026-11-30/es.md,
// C:/agents/studio/conocimiento/Evidencia de Daniel.md,
// C:/agents/studio/.claude/skills/studio-contenido/references/posturas-contrarias.md (T24, T25).

const kit: Kit = {
  word: 'VENTAS',
  slug: 'ventas',
  videos: [
    {
      id: 'es-04',
      lang: 'es',
      promise:
        'Comente VENTAS y le mando el kit de ventas y seguimiento, para que cada evento le deje reuniones y no fotos.',
    },
    {
      id: 'es-09',
      lang: 'es',
      promise:
        'Comente VENTAS y le mando el kit de ventas y seguimiento, para que vea hoy mismo dónde se le caen las ventas.',
    },
    {
      id: 'es-27',
      lang: 'es',
      promise:
        'Comente VENTAS y le mando el kit de ventas y seguimiento, para que cada aliado gane cuando su cliente gana.',
    },
  ],
  content: {
    es: {
      title: 'El kit de ventas y seguimiento',
      promise:
        'Tres herramientas para que una conversación termine en una fecha: el seguimiento de 24 horas después de un evento, la prueba del cliente oculto por WhatsApp y la revisión de sus aliados.',
      minutes: 40,
      howTo: [
        'Vaya a la sección que le toca hoy: un evento que viene, su WhatsApp o sus alianzas. No tiene que hacer las tres de una vez.',
        'Copie las hojas a Google Sheets o Excel. Las fórmulas funcionan tal cual.',
        'Los textos entre [CORCHETES] los llena usted. Los prompts están escritos para Claude o ChatGPT con sus datos pegados.',
        'Las listas de chequeo guardan sus marcas en este navegador: puede volver después del evento o de la prueba.',
      ],
      sections: [
        // es-04, T24: "Las fotos no son pipeline. Las reuniones si." / "Convert every handshake into a
        // trackable follow-up within 24 hours" (gtm-playbook-web3.ts, seccion 10).
        {
          id: 'eventos',
          title: 'Un evento que le deje reuniones, no fotos',
          videos: ['es-04'],
          intro:
            'El evento se paga en las 24 horas que siguen. Aquí está la hoja de antes, la nota de durante y el mensaje de después, con una fecha adentro.',
          blocks: [
            {
              type: 'rule',
              text: 'Cada apretón de manos se vuelve un seguimiento en 24 horas, o no pasó.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Antes de ir: a quién quiere ver y qué le va a proponer',
                  body: 'Una frase por persona. Si no sabe qué le propondría, esa persona no va en la lista. Use la primera hoja y el prompt de preparación.',
                },
                {
                  title: 'Durante: después de cada conversación, anote una sola cosa',
                  body: 'Qué le duele a esa persona hoy, con sus palabras. Una nota de voz al salir de la conversación sirve. La tarjeta sola no sirve.',
                },
                {
                  title: 'Esa misma noche: todo a la hoja de seguimiento',
                  body: 'Una fila por persona, con el dolor, una idea para resolverlo y el siguiente paso. Si quiere, pase las notas de voz por el prompt de seguimiento.',
                },
                {
                  title: 'Antes de 24 horas: escríbale con una fecha',
                  body: 'Lo que le duele, una idea para resolverlo y una fecha para hablar. No "un gusto conocerlo". Una fecha.',
                },
                {
                  title: 'A las dos semanas: haga la cuenta del evento',
                  body: 'Cuántas reuniones salieron y cuánto le costó cada una. Con ese número decide si vuelve el año que viene.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'eventos-lista',
              title: 'Antes del evento: a quién quiero ver',
              columns: [
                'Persona',
                'Empresa y cargo',
                'Por qué ella (qué tiene que ver con lo que vendo)',
                'Qué le voy a proponer (una frase)',
                'Cómo llego (intro, ya me conoce, en frío)',
                'Dónde la encuentro (charla, stand, cena)',
                'La vi (sí o no)',
              ],
              rows: [
                [
                  'Ejemplo: [Nombre]',
                  '[Empresa], gerente de operaciones',
                  'Su equipo concilia facturas a mano',
                  'Mostrarle cómo cerrar la conciliación del mes en días y no en semanas',
                  'Intro de [persona en común]',
                  'Panel de las 3 pm',
                  '',
                ],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
              ],
              note: 'La fila de ejemplo es inventada. Bórrela y llene la suya. Si la columna de la propuesta queda vacía, esa persona sale de la lista.',
            },
            {
              type: 'template',
              title: 'Prompt de preparación: de la lista de asistentes a su lista corta',
              body: `Voy a ir a [NOMBRE DEL EVENTO] el [FECHA]. Necesito una lista corta de personas para buscar allá, con lo que le propondría a cada una.

Lo que vendo: [SU OFERTA EN DOS LÍNEAS]
A quién le sirve (cliente ideal): [INDUSTRIA, TAMAÑO, CARGO QUE DECIDE]
El problema que resuelvo, en palabras del cliente: [EL DOLOR]
Lo que NO busco: [CARGOS O EMPRESAS QUE NO SON CLIENTES]

Lista de asistentes, ponentes y patrocinadores (pegada tal cual):
[PEGUE AQUÍ LA LISTA O LA AGENDA]

Lo que necesito:
1. Las [NÚMERO] personas con más probabilidad de ser cliente, ordenadas de más a menos.
2. Por cada una, una tabla con estas columnas: Persona | Empresa y cargo | Por qué ella | Qué le voy a proponer (una sola frase, concreta, sin adjetivos) | Dónde la encuentro.
3. Al final, las personas que descartó y por qué, en una línea cada una.

Reglas:
- Use solo lo que está en la lista que pegué. Si supone algo sobre una persona o su empresa, márquelo con [VERIFICAR].
- No invente cargos, cifras ni noticias de las empresas.
- La propuesta es algo que yo puedo mostrar en una reunión corta, no "explorar sinergias".
- Si con la información no se puede decidir sobre alguien, dígalo en vez de rellenar.`,
              note: 'Funciona mejor si pega la agenda completa con los nombres de los ponentes. Revise a mano cada [VERIFICAR] antes de ir.',
            },
            {
              type: 'sheet',
              id: 'eventos-seguimiento',
              title: 'Después del evento: hoja de seguimiento',
              columns: [
                'Nombre',
                'Empresa',
                'Qué le duele hoy (sus palabras)',
                'Idea para resolverlo',
                'Fecha y hora propuestas',
                'Conversación (fecha y hora)',
                'Mensaje enviado (fecha y hora)',
                'Horas hasta el mensaje',
                'Respondió (sí o no)',
                'Reunión agendada (fecha)',
                'Siguiente paso',
                'Fecha del siguiente paso',
              ],
              rows: [
                [
                  'Ejemplo: [Nombre]',
                  '[Empresa]',
                  'Cierran el mes tarde porque concilian a mano',
                  'Ver juntos un mes de facturas y dónde se va el tiempo',
                  'Jueves 10:00',
                  '2026-12-03 18:00',
                  '2026-12-04 09:30',
                  '=(G2-F2)*24',
                  'sí',
                  '2026-12-10',
                  'Mandar agenda de la reunión',
                  '2026-12-08',
                ],
                ['', '', '', '', '', '', '', '=(G3-F3)*24', '', '', '', ''],
                ['', '', '', '', '', '', '', '=(G4-F4)*24', '', '', '', ''],
                ['', '', '', '', '', '', '', '=(G5-F5)*24', '', '', '', ''],
                ['', '', '', '', '', '', '', '=(G6-F6)*24', '', '', '', ''],
                ['', '', '', '', '', '', '', '=(G7-F7)*24', '', '', '', ''],
              ],
              note: 'Escriba las fechas con hora (año-mes-día hora:minutos) para que la columna de horas calcule. Toda fila con más de 24 en esa columna es un seguimiento que llegó tarde. La fila de ejemplo es inventada.',
            },
            {
              type: 'template',
              title: 'Prompt de seguimiento: de sus notas de voz a la hoja y los mensajes',
              body: `Volví de [NOMBRE DEL EVENTO]. Abajo están mis notas de cada conversación, transcritas tal cual. Necesito dos cosas: las filas para mi hoja de seguimiento y un mensaje para cada persona.

Lo que vendo: [SU OFERTA EN DOS LÍNEAS]
Mi disponibilidad para reuniones en los próximos 7 días: [DÍAS Y HORAS]
Duración de la primera reunión: [MINUTOS]
Canal por el que voy a escribir: [WHATSAPP, CORREO O LINKEDIN]

Notas:
[PEGUE AQUÍ LAS NOTAS, UNA POR PERSONA, CON NOMBRE Y EMPRESA]

Salida:
1. Una tabla con columnas: Nombre | Empresa | Qué le duele hoy (sus palabras, citadas de mi nota) | Idea para resolverlo (una línea) | Fecha y hora propuestas | Siguiente paso.
2. Un mensaje por persona, de máximo 5 líneas, con esta estructura: dónde hablamos, lo que le duele dicho con sus palabras, una idea concreta para resolverlo, y una fecha y hora tomadas de mi disponibilidad, con una alternativa.

Reglas:
- No use "un gusto conocerlo", "quedo atento" ni "cualquier cosa me avisa". Cada mensaje termina en una fecha.
- No invente dolores. Si una nota no dice qué le duele a la persona, no escriba mensaje: márquela como SIN DOLOR ANOTADO para que yo decida si la llamo o la descarto.
- No reparta la misma hora a dos personas.
- Trato de usted, frases cortas, sin signos de exclamación.`,
              note: 'Revise cada mensaje antes de enviarlo. La regla de SIN DOLOR ANOTADO evita el mensaje genérico, que es el que nadie contesta.',
            },
            {
              type: 'template',
              title: 'El mensaje de las 24 horas (para escribirlo a mano)',
              body: `[Nombre], hablamos ayer en [evento] sobre [lo que le duele, con sus palabras].

Me quedé pensando en eso. Una idea: [la idea concreta, en una o dos líneas].

¿Le sirve el [día] a las [hora] para mostrarle cómo lo haríamos, en [minutos] minutos? Si no, el [otro día] a las [otra hora] también me queda bien.`,
              note: 'Tres partes y una fecha. Si no puede llenar la segunda línea, todavía no tiene nada que proponerle.',
            },
            {
              type: 'check',
              id: 'eventos-check',
              title: 'Antes de cerrar el día del evento',
              items: [
                'Cada conversación útil tiene una nota con lo que le duele a esa persona hoy.',
                'Todas las personas están en la hoja de seguimiento, con su siguiente paso.',
                'Las tarjetas que no tienen nota están separadas para decidir: llamar o descartar.',
                'Los mensajes de mañana están escritos y cada uno propone día y hora.',
                'Ninguno dice "un gusto conocerlo" como única razón para escribir.',
                'Tengo en el calendario a qué hora de mañana se envían, antes de que se cumplan las 24 horas.',
                'Puse en el calendario la fecha para hacer la cuenta del evento, a las dos semanas.',
              ],
            },
            {
              type: 'calc',
              id: 'eventos-calc',
              title: 'La cuenta del evento: cuánto le costó cada reunión',
              inputs: [
                { id: 'gastos', label: 'Entrada, viaje, hotel y comidas', value: 1500, unit: 'USD', hint: 'Ejemplo. Ponga lo suyo.' },
                { id: 'horas', label: 'Horas suyas en el evento, viajes incluidos', value: 20, unit: 'horas', hint: 'Ejemplo.' },
                { id: 'valorhora', label: 'Lo que vale una hora suya', value: 50, unit: 'USD', hint: 'Ejemplo. Su número.' },
                { id: 'conversaciones', label: 'Conversaciones con nota de dolor', value: 15, hint: 'Ejemplo. De su hoja.' },
                { id: 'reuniones', label: 'Reuniones agendadas a las dos semanas', value: 4, hint: 'Ejemplo. Si es cero, ponga 1 para ver el costo mínimo.' },
                { id: 'tope', label: 'Lo máximo que pagaría por una reunión con un cliente posible', value: 300, unit: 'USD', hint: 'Su umbral. Lo decide usted.' },
              ],
              outputs: [
                { label: 'Costo total del evento', expr: 'gastos+horas*valorhora', format: 'money' },
                { label: 'Costo por reunión', expr: '(gastos+horas*valorhora)/reuniones', format: 'money' },
                { label: 'Reuniones por cada 100 conversaciones', expr: 'reuniones/conversaciones*100', format: 'number' },
              ],
              verdict: {
                expr: 'tope-(gastos+horas*valorhora)/reuniones',
                pass: 'Cada reunión le costó menos que su tope. El evento se ganó su lugar en el calendario del año que viene.',
                fail: 'Cada reunión le costó más que su tope. Antes de volver, revise dónde se perdió: la lista de antes, las notas de durante o los mensajes de después.',
              },
            },
          ],
        },
        // es-09, ev-10: prueba de WhatsApp a un cliente (2026-08-27). Nunca decir el tipo de negocio.
        {
          id: 'whatsapp',
          title: 'La prueba del cliente oculto por WhatsApp',
          videos: ['es-09'],
          intro:
            'Cinco minutos para ver, hoy, qué le pasa a un cliente listo para comprar cuando le escribe a su empresa. El mensaje, la hoja para medirlo y la regla que lo arregla.',
          blocks: [
            {
              type: 'rule',
              text: 'Contestar rápido no es vender. Vender es llevar la conversación hasta una fecha.',
            },
            {
              // ev-10: respuesta en el mismo minuto, enlatada, enlace al catalogo, sin pregunta ni
              // confirmacion; chatbot previo cerraba unas 6 de 10 y perdia 4 sin pasar a una persona.
              type: 'p',
              text: 'A un cliente le hicimos esta prueba: un mensaje con fecha, hora y número de personas, listo para comprar. La respuesta llegó en el mismo minuto, enlatada, con un enlace al catálogo y ni una pregunta para confirmar. Antes habían probado un chatbot que cerraba unas seis de cada diez conversaciones; las otras cuatro se perdían, sin forma de pasarlas a una persona.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Escoja al cliente oculto',
                  body: 'Alguien de confianza cuyo número no conozca su equipo. Que no avise y que escriba desde su teléfono, como cualquier cliente.',
                },
                {
                  title: 'Que escriba como un cliente listo para comprar',
                  body: 'Con los datos que usted necesita para cerrar: qué quiere, cuándo, cuánto. Use el mensaje de abajo y cámbielo a su negocio.',
                },
                {
                  title: 'Hágala dos veces',
                  body: 'Un martes en horario normal y otra vez un sábado en la noche. La segunda muestra qué pasa fuera de horario.',
                },
                {
                  title: 'Mida tres cosas',
                  body: 'Cuánto tardan, si le hacen una pregunta, y si le proponen día y hora. Si contesta un bot, mida una cuarta: si pudo pasar a una persona. Todo va a la hoja.',
                },
                {
                  title: 'Escriba la regla y póngala a funcionar',
                  body: 'Toda conversación con intención de compra termina con día, hora y confirmación, la conteste una persona o un bot. Mande la regla al equipo y, si tiene bot, cárguela como instrucción.',
                },
                {
                  title: 'Repita la prueba en dos semanas',
                  body: 'Mismo mensaje, otra persona. Si el puntaje no subió, la regla está escrita pero nadie la usa.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Los dos mensajes del cliente oculto',
              body: `MENSAJE 1 (listo para comprar):
Hola, buenas. Quiero [producto o servicio] para el [día] a las [hora], [cantidad: somos 4, son 10 unidades, es para 2 personas]. ¿Me confirman si se puede?

MENSAJE 2 (si la respuesta no le pregunta nada, contéstele esto):
Listo, ¿y cómo hago para dejarlo apartado? Lo necesito sí o sí para esa fecha.`,
              note: 'El primer mensaje ya trae todo lo que hace falta para cerrar. Si la respuesta no usa esos datos, ahí está la primera caída. El segundo mensaje mide si alguien lleva la conversación hasta la confirmación cuando el cliente insiste.',
            },
            {
              type: 'sheet',
              id: 'whatsapp-registro',
              title: 'Registro de la prueba',
              columns: [
                'Prueba',
                'Día y hora del envío',
                'Contestó (persona o bot)',
                'Minutos hasta la primera respuesta',
                'Hizo una pregunta (1 o 0)',
                'Propuso día y hora (1 o 0)',
                'Pidió confirmación (1 o 0)',
                'Si era bot: pudo pasar a una persona (1 o 0)',
                'Puntaje (de 4)',
                'Dónde se cayó',
              ],
              rows: [
                ['Prueba 1, martes', '', '', '', '', '', '', '', '=E2+F2+G2+H2', ''],
                ['Prueba 2, sábado en la noche', '', '', '', '', '', '', '', '=E3+F3+G3+H3', ''],
                ['Prueba 3, en dos semanas', '', '', '', '', '', '', '', '=E4+F4+G4+H4', ''],
                ['Prueba 4, en dos semanas, sábado', '', '', '', '', '', '', '', '=E5+F5+G5+H5', ''],
              ],
              note: 'Si contestó una persona, ponga 1 en la columna del bot. Una respuesta en el mismo minuto con 0 en preguntar, proponer y confirmar es el caso de arriba: rápida y sin venta.',
            },
            {
              type: 'check',
              id: 'whatsapp-fallas',
              title: 'Dónde se le caen las ventas: marque lo que vio en la prueba',
              items: [
                'La respuesta fue un mensaje enlatado que no usó la fecha, la hora ni la cantidad que el cliente ya había dado.',
                'Mandaron solo un enlace al catálogo o a la página, sin una pregunta.',
                'Nadie propuso día y hora.',
                'Nadie pidió confirmación, ni siquiera después del segundo mensaje.',
                'El bot se presentó con un nombre de persona que no existe.',
                'El bot no tenía cómo pasar la conversación a una persona.',
                'Fuera de horario nadie contestó, o contestó un mensaje automático que no lleva a ninguna parte.',
                'Contestaron, pero la conversación se quedó abierta: nadie volvió a escribir.',
              ],
            },
            {
              type: 'template',
              title: 'La regla, escrita para su equipo',
              body: `REGLA DE VENTAS POR WHATSAPP (desde el [FECHA])

Toda conversación con intención de compra termina con día, hora y confirmación, la conteste una persona o un bot.

Intención de compra es cuando el cliente dice qué quiere, para cuándo o cuánto. Con una sola de esas tres, ya aplica la regla.

1. Use los datos que el cliente ya dio. No le pregunte lo que ya dijo.
2. Pregunte solo lo que falta para cerrar: [LOS DATOS QUE NECESITA SU NEGOCIO].
3. Proponga un día y una hora concretos. No "cuando guste".
4. Pida confirmación: "¿Le confirmo para el [día] a las [hora]?".
5. Si no puede cerrar usted, pase la conversación a [PERSONA O CARGO] antes de [TIEMPO], con un resumen de lo que el cliente pidió.
6. Nunca mande solo un enlace. Si manda uno, va con una pregunta.

Responsable de revisar que se cumpla: [NOMBRE]. Se revisa cada [PERIODO] con una prueba de cliente oculto.`,
            },
            {
              type: 'template',
              title: 'Instrucción para su bot o agente de WhatsApp',
              body: `Usted atiende el WhatsApp de [EMPRESA]. Su trabajo no es contestar rápido: es llevar cada conversación con intención de compra hasta día, hora y confirmación.

Lo que vende la empresa: [OFERTA, CON PRECIOS SI LOS PUEDE DAR]
Datos que hacen falta para cerrar una venta: [POR EJEMPLO: QUÉ, PARA CUÁNDO, CUÁNTOS, A NOMBRE DE QUIÉN]
Disponibilidad real: [CÓMO LA CONSULTA: AGENDA, HOJA, SISTEMA. SI NO TIENE ACCESO, DÍGALO]
Persona que recibe las conversaciones que usted no cierra: [NOMBRE Y CANAL]

Cómo trabaja:
1. Lea todo lo que el cliente escribió y tome los datos que ya dio. No los vuelva a pedir.
2. Pregunte uno por uno los datos que faltan, máximo uno por mensaje.
3. Cuando tenga los datos, proponga un día y una hora concretos y pida confirmación con una pregunta de sí o no.
4. Al confirmar, repita el resumen: qué, cuándo, cuántos, a nombre de quién.

Pase la conversación a la persona de arriba, con un resumen de tres líneas, cuando:
- el cliente pida hablar con alguien,
- haya una queja, un reclamo o una pregunta de precio que no está en sus datos,
- lleve [NÚMERO] mensajes sin avanzar hacia una fecha,
- no pueda confirmar disponibilidad.

Nunca:
- mande solo un enlace al catálogo sin una pregunta,
- invente disponibilidad, precios o condiciones,
- se presente con un nombre de persona: diga que es el asistente de [EMPRESA],
- deje una conversación con intención de compra sin fecha o sin pasarla a una persona.`,
              note: 'Después de cargarla, repita la prueba del cliente oculto. La instrucción vale lo que dé la prueba, no lo que diga el proveedor del bot.',
            },
            {
              type: 'calc',
              id: 'whatsapp-calc',
              title: 'Cuánto se le está cayendo por WhatsApp',
              inputs: [
                { id: 'conv', label: 'Conversaciones con intención de compra por semana', value: 30, hint: 'Ejemplo. Cuéntelas en su WhatsApp de la semana pasada.' },
                { id: 'cierran', label: 'De cada 10, cuántas terminan con día, hora y confirmación', value: 5, hint: 'Ejemplo. Revise 10 conversaciones reales y cuente.' },
                { id: 'ticket', label: 'Valor promedio de una venta', value: 80, unit: 'USD', hint: 'Ejemplo.' },
                { id: 'arreglo', label: 'Lo que le costaría al mes arreglarlo (horas de una persona, bot, herramienta)', value: 400, unit: 'USD', hint: 'Su estimado.' },
              ],
              outputs: [
                { label: 'Conversaciones que se quedan sin fecha por semana', expr: 'conv*(10-cierran)/10', format: 'number' },
                { label: 'Ventas en juego por semana', expr: 'conv*(10-cierran)/10*ticket', format: 'money' },
                { label: 'Ventas en juego en cuatro semanas', expr: 'conv*(10-cierran)/10*ticket*4', format: 'money' },
              ],
              verdict: {
                expr: 'conv*(10-cierran)/10*ticket*4-arreglo',
                pass: 'Lo que se le queda sin fecha en un mes vale más de lo que cuesta arreglarlo. Aunque recupere una parte, la regla se paga.',
                fail: 'Con estos números, arreglarlo cuesta más de lo que hay en juego. Revise el conteo de conversaciones antes de descartarlo.',
              },
            },
          ],
        },
        // es-27, T25: un partner es distribucion solo si gana cuando su cliente gana; creadores mas
        // chicos con credibilidad real superaron a nombres grandes con el incentivo alineado
        // (gtm-playbook-web3.ts, secciones 3 y Mini Case Notes).
        {
          id: 'aliados',
          title: 'Aliados que ganan cuando su cliente gana',
          videos: ['es-27'],
          intro:
            'La lista de sus aliados con dos columnas, clientes traídos y qué gana cada uno, y la propuesta para el que hoy no gana nada.',
          blocks: [
            {
              type: 'rule',
              text: 'Un aliado es distribución solo si gana cuando su cliente gana.',
            },
            {
              type: 'p',
              text: 'Si el incentivo del aliado no está atado al resultado del cliente, va a mover su producto cuando le sobre tiempo. Por eso creadores más pequeños, con credibilidad real, le ganan a nombres grandes cuando el incentivo está bien atado.',
            },
            {
              type: 'compare',
              bad: {
                title: 'Un logo',
                items: [
                  'Su logo en la página del aliado y el del aliado en la suya.',
                  'Un convenio firmado que nadie vuelve a abrir.',
                  'Un pago o un beneficio por firmar, no por lo que pasa con el cliente.',
                  'Nadie sabe cuántos clientes trajo este año.',
                ],
              },
              good: {
                title: 'Distribución',
                items: [
                  'El aliado gana cuando el cliente que trajo le compra a usted.',
                  'Por ejemplo, un porcentaje de la primera compra de cada cliente que le traiga.',
                  'Cada cliente llega con una marca de quién lo trajo: un enlace, un código o una pregunta al cerrar.',
                  'Una vez por [periodo] se revisa la hoja con el aliado.',
                ],
              },
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Haga la lista de aliados',
                  body: 'Todos: integraciones, agencias, creadores, clientes que refieren, socios de eventos. Si aparece en su página o usted aparece en la de ellos, va en la lista.',
                },
                {
                  title: 'Anote cuántos clientes le trajo cada uno este año',
                  body: 'Si no lo sabe, revise sus ventas del año y pregunte a cada cliente cómo llegó. Lo que no tenga dato va como 0 hasta que se demuestre otra cosa.',
                },
                {
                  title: 'Al lado, escriba qué gana cada uno cuando ese cliente le compra',
                  body: 'Lo que gana hoy, no lo que dice el convenio. Si la respuesta es "nada" o "visibilidad", escríbalo así.',
                },
                {
                  title: 'Al que no gana nada, propóngale algo atado al resultado del cliente',
                  body: 'Una comisión o un beneficio que se paga cuando el cliente compra o logra [el resultado que usted promete], no cuando se firma. Haga la cuenta con la calculadora antes de mandar la propuesta.',
                },
                {
                  title: 'Ponga la marca de origen y revise',
                  body: 'Un enlace o un código por aliado, o la pregunta "¿quién le habló de nosotros?" al cerrar. Sin eso, en un año va a estar adivinando otra vez.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'aliados-hoja',
              title: 'Revisión de aliados',
              columns: [
                'Aliado',
                'Tipo (integración, agencia, creador, referido)',
                'Clientes que trajo este año',
                'Ventas de esos clientes este año',
                'Qué gana hoy cuando le compran',
                'Atado al resultado del cliente (sí o no)',
                'Propuesta nueva',
                'Porcentaje propuesto',
                'Pago al aliado con las ventas de este año',
                'Siguiente paso y fecha',
              ],
              rows: [
                ['Ejemplo: agencia que nos tiene en su página', 'Agencia', '0', '0', 'Nada', 'no', 'Porcentaje de la primera compra de cada cliente que traiga', '10', '=D2*H2/100', 'Llamar el [fecha]'],
                ['Ejemplo: cliente que nos refiere', 'Referido', '3', '2400', 'Nada', 'no', 'Un mes de servicio gratis por cada cliente que compre', '', '=D3*H3/100', 'Mandar propuesta el [fecha]'],
                ['', '', '', '', '', '', '', '', '=D4*H4/100', ''],
                ['', '', '', '', '', '', '', '', '=D5*H5/100', ''],
                ['', '', '', '', '', '', '', '', '=D6*H6/100', ''],
                ['', '', '', '', '', '', '', '', '=D7*H7/100', ''],
              ],
              note: 'Las dos filas de ejemplo son inventadas. La columna de pago le muestra cuánto le habría pagado a cada aliado este año con el porcentaje propuesto: si el número es cero, ese aliado no le trajo a nadie y la propuesta es lo único que puede cambiarlo.',
            },
            {
              type: 'check',
              id: 'aliados-check',
              title: 'Antes de proponerle algo a un aliado',
              items: [
                'Sé cuántos clientes me trajo este año, con dato y no de memoria.',
                'Sé qué gana hoy cuando uno de esos clientes me compra.',
                'La propuesta se paga cuando el cliente compra o logra el resultado, no cuando se firma.',
                'Hice la cuenta y el margen que me queda por cliente me sirve.',
                'Cada cliente que traiga va a llegar con una marca de origen: enlace, código o pregunta.',
                // ev-27: un KOL es alguien cuya palabra pesa por quien es, no por cuanta gente lo ve.
                'Si es un creador o una comunidad: la gente que lo sigue actúa sobre lo que dice, no solo lo ve.',
                'Hay una fecha para revisar los números con el aliado.',
              ],
            },
            {
              type: 'template',
              title: 'El mensaje al aliado que hoy no gana nada',
              body: `[Nombre], revisando nuestras alianzas me di cuenta de algo: hoy, cuando usted me manda un cliente, usted no gana nada. Así no nos sirve a ninguno de los dos.

Le propongo esto: por cada cliente que llegue de su parte y [compre / logre el resultado], usted recibe [el porcentaje o el beneficio] de [la primera compra / el primer mes]. Se paga cuando el cliente [compra / logra el resultado], no al firmar.

Para saber cuáles vienen de usted, le paso [un enlace / un código] propio. Revisamos los números juntos cada [periodo].

¿Le sirve hablarlo el [día] a las [hora]?`,
              note: 'Igual que el seguimiento de un evento: termina en una fecha.',
            },
            {
              type: 'template',
              title: 'Prompt para revisar sus alianzas con sus datos',
              body: `Voy a revisar mis alianzas comerciales. Le paso dos cosas: la lista de aliados con lo que gana cada uno hoy, y mis ventas del año con el origen de cada cliente cuando lo tengo.

Lo que vendo y a quién: [SU OFERTA Y SU CLIENTE IDEAL]
Margen bruto aproximado por venta: [PORCENTAJE]
Lo máximo que pagaría por un cliente nuevo: [MONTO]

Aliados:
[PEGUE LA LISTA: ALIADO, TIPO, QUÉ GANA HOY]

Ventas del año:
[PEGUE: CLIENTE, FECHA, VALOR, CÓMO LLEGÓ]

Lo que necesito:
1. Una tabla por aliado: clientes que trajo, ventas de esos clientes, qué gana hoy, si eso está atado al resultado del cliente (sí o no).
2. Los aliados en cuatro grupos: trae y gana, trae y no gana, no trae y gana, no trae ni gana.
3. Para cada aliado que no gana nada, una propuesta atada al resultado del cliente y no a la firma, con el pago calculado sobre las ventas de este año y el margen que me quedaría.
4. Las ventas que no tienen origen, contadas aparte.

Reglas:
- Si una venta no dice de dónde vino, no se la asigne a ningún aliado. Va en "sin origen".
- No proponga nada que deje el margen por cliente por debajo de lo que le dije.
- Muestre las cuentas, no solo el resultado.`,
            },
            {
              type: 'calc',
              id: 'aliados-calc',
              title: 'Cuánto le puede ofrecer a un aliado',
              inputs: [
                { id: 'compra', label: 'Valor promedio de la primera compra de un cliente', value: 1000, unit: 'USD', hint: 'Ejemplo. Use el suyo.' },
                { id: 'margen', label: 'Su margen bruto sobre esa compra', value: 40, unit: '%', hint: 'Ejemplo.' },
                { id: 'comision', label: 'Porcentaje que le propone al aliado', value: 10, unit: '%', hint: 'Ejemplo.' },
                { id: 'clientes', label: 'Clientes que el aliado podría traer en un trimestre', value: 3, hint: 'Su estimado, conservador.' },
                { id: 'minimo', label: 'Lo mínimo que le tiene que quedar por cliente', value: 250, unit: 'USD', hint: 'Su umbral. Lo decide usted.' },
              ],
              outputs: [
                { label: 'Pago al aliado por cada cliente', expr: 'compra*comision/100', format: 'money' },
                { label: 'Margen que le queda a usted por cliente', expr: 'compra*(margen-comision)/100', format: 'money' },
                { label: 'Pago al aliado en el trimestre', expr: 'compra*comision/100*clientes', format: 'money' },
                { label: 'Margen que le queda en el trimestre', expr: 'compra*(margen-comision)/100*clientes', format: 'money' },
              ],
              verdict: {
                expr: 'compra*(margen-comision)/100-minimo',
                pass: 'Después de pagarle al aliado, le queda más que su mínimo por cliente. Puede mandar la propuesta.',
                fail: 'Con ese porcentaje le queda menos que su mínimo. Baje el porcentaje, páguelo sobre otro resultado o cambie el beneficio por algo que no salga de su margen.',
              },
            },
          ],
        },
      ],
      next: {
        text: 'Si quiere ver dónde más se le escapan los clientes, además del evento, el WhatsApp y los aliados, haga el diagnóstico de crecimiento.',
        cta: 'Hacer el diagnóstico',
        page: 'crecer',
      },
    },
  },
};

export default kit;
