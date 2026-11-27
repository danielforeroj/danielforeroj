import type { Kit } from './types';

// MARCA: el kit de marca y contenido. Seis videos en espanol (es-07, es-13, es-17,
// es-22, es-23, es-24), en el orden en que salen. Fuentes: guiones en
// C:/agents/studio/specs/faceless/semana/2026-11-30/es.md, posturas T19 a T22 en
// posturas-contrarias.md, y Evidencia de Daniel (ev-22, ev-23, ev-24, ev-27, ev-29).

const kit: Kit = {
  word: 'MARCA',
  slug: 'marca',
  videos: [
    {
      id: 'es-07',
      lang: 'es',
      promise:
        'Comente MARCA y le mando el kit de marca y contenido, para que salga en prensa cuando su historia ya esté clara.',
    },
    {
      id: 'es-13',
      lang: 'es',
      promise:
        'Comente MARCA y le mando el kit de marca y contenido, para que cualquier cliente la entienda en la primera lectura.',
    },
    {
      id: 'es-17',
      lang: 'es',
      promise:
        'Comente MARCA y le mando el kit de marca y contenido, para que cada pieza que publique le hable a quien sí le compra.',
    },
    {
      id: 'es-22',
      lang: 'es',
      promise:
        'Comente MARCA y le mando el kit de marca y contenido, para que sepa en qué páginas tiene que aparecer.',
    },
    {
      id: 'es-23',
      lang: 'es',
      promise:
        'Comente MARCA y le mando el kit de marca y contenido, para que su presupuesto vaya a quien la gente sí le hace caso.',
    },
    {
      id: 'es-24',
      lang: 'es',
      promise:
        'Comente MARCA y le mando el kit de marca y contenido, para que una sola reunión le dé contenido para una semana.',
    },
  ],
  content: {
    es: {
      title: 'El kit de marca y contenido',
      promise:
        'Sale con una frase que sus clientes repiten igual, una página sin jerga, un filtro para cada pieza, la lista de páginas donde tiene que aparecer, una forma de pagarle solo al creador que la gente escucha y una reunión convertida en una semana de contenido.',
      minutes: 45,
      howTo: [
        'Vaya en orden: la frase de la primera sección alimenta todas las demás.',
        'Cada sección tiene algo para llenar o copiar. Las hojas se pegan directo en Google Sheets o Excel, con fórmulas.',
        'Las plantillas con [CORCHETES] son para que usted ponga sus datos. Los prompts están escritos para Claude o ChatGPT.',
        'Las listas guardan sus marcas en este navegador: puede volver y seguir donde quedó.',
      ],
      sections: [
        // es-07, postura T22. Anuncio de ronda: ev-22.
        {
          id: 'historia-clara',
          title: 'La frase antes de la prensa',
          videos: ['es-07'],
          intro:
            'Una frase que tres clientes repiten igual. Sin ella, cada artículo confunde un poco más. Con ella, cada artículo suma.',
          blocks: [
            {
              type: 'rule',
              text: 'El PR no fabrica una historia. Distribuye la que ya tiene. Si la historia no es clara, más cobertura solo le muestra a más gente que no es clara.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Escriba la frase',
                  body: 'Qué hace su empresa, para quién y por qué ahora. Una sola frase, sin palabras técnicas. Use la plantilla de abajo.',
                },
                {
                  title: 'Léasela a tres clientes',
                  body: 'Clientes de verdad, no su equipo. Pídales que se la repitan con sus palabras y anote lo que dicen, literal, en la hoja.',
                },
                {
                  title: 'Compare las tres versiones',
                  body: 'Si cada uno dice algo distinto, el trabajo es la frase, no la prensa. Ajústela y vuelva a probar hasta que los tres digan lo mismo.',
                },
                {
                  title: 'Póngala en todas partes',
                  body: 'La misma frase va arriba en su página, en su perfil y en el primer párrafo de cualquier nota de prensa.',
                },
                {
                  title: 'Ahora sí, la agencia',
                  body: 'Si va a contratar agencia en enero, esta prueba va antes. Llévele la frase ya probada como punto de partida, no como tarea.',
                },
              ],
            },
            {
              type: 'template',
              title: 'La frase en una línea',
              body: `[NOMBRE DE SU EMPRESA] le [VERBO CONCRETO: organiza, cobra, entrega, encuentra] [QUÉ, en palabras de su cliente] a [QUIÉN, tan específico como pueda] para que [RESULTADO QUE EL CLIENTE VE], y lo necesita ahora porque [HECHO DE ESTE MOMENTO: una regla nueva, un costo que subió, una fecha].`,
              note: 'Si no puede llenar "por qué ahora" con un hecho, todavía no tiene historia para prensa. Tiene una descripción.',
            },
            {
              type: 'template',
              title: 'Lo que le dice al cliente (llamada o WhatsApp)',
              body: `Hola [NOMBRE], le robo dos minutos. Estoy probando cómo explicamos lo que hacemos y quiero oírlo de alguien que nos conoce.

Le leo una frase y le pido que me la repita con sus palabras, como se lo contaría a un colega. No hay respuesta correcta, me sirve justo lo que le quede.

"[SU FRASE]"

¿Cómo se lo explicaría usted a alguien que no nos conoce?`,
              note: 'No corrija ni explique después de leer. Lo que el cliente no repite es lo que la frase no está diciendo.',
            },
            {
              type: 'sheet',
              id: 'prueba-tres-clientes',
              title: 'La prueba de los tres clientes',
              columns: [
                'Cliente',
                'Lo que repitió (literal)',
                'Dijo qué hace (1 o 0)',
                'Dijo para quién (1 o 0)',
                'Dijo por qué ahora (1 o 0)',
                'Puntaje (de 3)',
                'Palabras suyas que usted no usa',
              ],
              rows: [
                ['Cliente 1', '', '', '', '', '=C2+D2+E2', ''],
                ['Cliente 2', '', '', '', '', '=C3+D3+E3', ''],
                ['Cliente 3', '', '', '', '', '=C4+D4+E4', ''],
              ],
              note: 'La frase está lista cuando los tres sacan 3 y dicen lo mismo entre ellos. La última columna es oro: esas palabras suelen ser mejores que las suyas.',
            },
            {
              type: 'template',
              title: 'Prompt: el primer párrafo de la nota de prensa',
              body: `Actúe como editor de una sección de negocios en [PAÍS O MERCADO DE LANZAMIENTO]. Su trabajo es decidir si esto es noticia, no hacerme sentir bien.

Contexto:
1. Frase probada con tres clientes: "[SU FRASE]"
2. El hecho que anunciamos: [QUÉ PASÓ, con cifra y fecha si existe]
3. Por qué importa ahora en este mercado: [CONTEXTO]
4. Datos que puede usar (no use ningún otro): [LISTA DE DATOS VERIFICABLES]

Haga esto:
1. Diga en una línea si hay un hecho detrás del titular. Si no lo hay, diga qué falta y deténgase ahí.
2. Si lo hay, escriba tres titulares de máximo 12 palabras, cada uno con el hecho adentro.
3. Escriba el primer párrafo (máximo 60 palabras) que arranque con la frase probada, casi literal.
4. Liste cada adjetivo que usó y bórrelo si no lo sostiene un dato de la lista.

No invente cifras, clientes ni citas. No use "líder", "innovador", "disruptivo" ni "solución integral".`,
            },
            {
              type: 'check',
              id: 'listo-para-prensa',
              title: 'Antes de pagar prensa',
              items: [
                'Los tres clientes repitieron la frase y dijeron lo mismo.',
                'La frase está arriba en la página, en el perfil y en el primer párrafo de la nota.',
                'El titular tiene un hecho detrás. Un comunicado sin hecho es ruido.',
                'Tengo una lista de periodistas verificados del mercado donde lanzo, y un plan para llegarles en las primeras 48 horas.',
                'La agencia recibe la frase probada, no la tarea de inventarla.',
              ],
            },
            // ev-22: titular con un hecho detras y 10 periodistas verificados del mercado de lanzamiento en 48 horas; un wire sin hecho es ruido.
            {
              type: 'p',
              text: 'En los anuncios de ronda que preparamos con clientes, el titular lleva un hecho detrás y sale a **10 periodistas verificados del mercado de lanzamiento en 48 horas**. Un wire sin hecho es ruido.',
            },
          ],
        },

        // es-13, postura T19 (post fuck-web3-jargon, nivel de lectura de sexto a octavo grado).
        {
          id: 'sin-glosario',
          title: 'El primer párrafo sin jerga',
          videos: ['es-13'],
          intro:
            'El método para que su página la entienda cualquier cliente en la primera lectura. Nadie le escribe para contarle que no entendió.',
          blocks: [
            {
              type: 'rule',
              text: 'Si su producto necesita un glosario, no tiene un problema de producto. Tiene un problema de lenguaje.',
            },
            {
              type: 'p',
              text: 'La jerga parece experticia, pero le sube el esfuerzo al que lee, y lo que cuesta entender no se compra. Escriba como si le explicara a un cliente al frente, con un nivel de lectura de **sexto a octavo grado**.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Copie el primer párrafo de su sitio',
                  body: 'El que se ve sin bajar. Es el que más lee la gente y el que menos se revisa.',
                },
                {
                  title: 'Subraye cada palabra que su cliente no diría',
                  body: 'La prueba: ¿la usaría en una conversación con usted, en una llamada o en WhatsApp? Si no, va a la hoja.',
                },
                {
                  title: 'Cámbiela por lo que él diría',
                  body: 'No "solución integral". Lo que hace, en palabras de la calle. Si sus clientes ya le escribieron, use sus mensajes como diccionario.',
                },
                {
                  title: 'Léaselo a alguien de afuera de su sector',
                  body: 'Si lo puede repetir, quedó. Si no, siga cortando.',
                },
                {
                  title: 'Repita en cada pantalla',
                  body: 'Arriba de cada pantalla importante, una línea que diga para qué sirve. Si hace falta el nombre técnico, va después y entre paréntesis.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'diccionario-cliente',
              title: 'El diccionario de su cliente',
              columns: ['Palabra o frase de su página', 'Dónde aparece', '¿La diría su cliente? (sí o no)', 'Lo que él diría', 'De dónde sale (mensaje, llamada, reseña)'],
              rows: [
                [
                  'Ejemplo: solución integral de gestión',
                  'Primer párrafo de la página de inicio',
                  'no',
                  'Le organizamos los pedidos y las facturas en un solo lugar',
                  'Así lo describen los clientes por WhatsApp',
                ],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
              ],
            },
            {
              type: 'compare',
              bad: {
                title: 'Así no',
                items: [
                  'Solución integral de gestión.',
                  'Cree una billetera Web3 nativa, autocustodiada, con recuperación MPC opcional.',
                  'La elegibilidad se comprueba con zk-SNARKs.',
                ],
              },
              good: {
                title: 'Así sí',
                items: [
                  'Le organizamos los pedidos y las facturas en un solo lugar.',
                  'Cree su cuenta. Usted la controla. Si pierde el teléfono, la recupera con su correo.',
                  'Demuestre que cumple los requisitos sin compartir sus datos.',
                ],
              },
            },
            {
              type: 'template',
              title: 'Prompt: reescribir en palabras de su cliente',
              body: `Usted es editor de textos comerciales para [PAÍS O REGIÓN]. Escribe en español latinoamericano neutro, de usted, con un nivel de lectura de sexto a octavo grado.

Mi cliente típico: [QUIÉN ES, A QUÉ SE DEDICA, QUÉ LE PREOCUPA]
Lo que vendo, explicado como se lo diría en persona: [DOS O TRES LÍNEAS]

Así hablan mis clientes (mensajes, reseñas o transcripciones, literales):
"""
[PEGUE AQUÍ 5 A 20 MENSAJES REALES]
"""

Texto de mi página:
"""
[PEGUE EL PRIMER PÁRRAFO]
"""

Haga esto:
1. Tabla con cada palabra o frase que mi cliente no usaría en una conversación, y por qué.
2. Para cada una, el reemplazo, sacado del vocabulario de los mensajes cuando exista.
3. El párrafo reescrito, de máximo 50 palabras, con frases cortas.
4. Lo que no pudo traducir sin más información. Pregúntemelo en vez de inventarlo.

No agregue beneficios, cifras ni promesas que no estén en mi texto. No use "integral", "innovador", "de punta" ni "360".`,
              note: 'El prompt no reemplaza la prueba con la persona de afuera. La prepara.',
            },
            {
              type: 'check',
              id: 'prueba-persona-afuera',
              title: 'La prueba de la persona de afuera',
              items: [
                'Le leí el párrafo a alguien que no trabaja en mi sector.',
                'Me lo repitió con sus palabras sin que yo le explicara nada.',
                'No me preguntó qué significa ninguna palabra.',
                'Supo decir qué hago y para quién.',
                'Si falló algo, corté y volví a probar con otra persona.',
              ],
            },
          ],
        },

        // es-17, postura T21 (regla de reparto: al menos 70% de las piezas al centro o al primer anillo del publico).
        {
          id: 'filtro-de-piezas',
          title: 'El filtro antes de publicar',
          videos: ['es-17'],
          intro:
            'Dos preguntas para cada pieza y una cuenta al final del mes, para que lo que publique le hable a quien sí le compra.',
          blocks: [
            {
              type: 'p',
              text: 'Un viral que no tiene que ver con lo que vende le trae seguidores que no compran. Las siguientes piezas le llegan a esa gente, que no reacciona, y el promedio se cae. Para una empresa la meta no es el alcance: es la confianza de quien le puede comprar.',
            },
            {
              type: 'rule',
              text: 'Al menos siete de cada diez piezas tienen que hablarle a quien compra.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Escriba quién le compra',
                  body: 'El dueño o el cargo que firma, en una línea. Y aparte, quién lo recomienda (un contador, un aliado, un cliente actual).',
                },
                {
                  title: 'Liste sus líneas de negocio',
                  body: 'Las que de verdad vende hoy. Cada pieza tiene que poder apuntar a una.',
                },
                {
                  title: 'Pase cada pieza por las dos preguntas',
                  body: '¿A quién le habla: al que compra, al que recomienda o a cualquiera? ¿Qué vende: una de sus líneas, o ninguna?',
                },
                {
                  title: 'Aplique la regla de descarte',
                  body: 'Si la respuesta es cualquiera y ninguna, no va en la cuenta de la empresa, por divertida que sea.',
                },
                {
                  title: 'Cuente al cierre del mes',
                  body: 'Con el plan de enero en construcción, el filtro va primero: pase el calendario completo por la hoja antes de aprobarlo.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'calendario-filtrado',
              title: 'El calendario filtrado',
              columns: [
                'Pieza',
                '¿A quién le habla? (compra, recomienda, cualquiera)',
                '¿Qué vende? (línea o ninguna)',
                'Le habla a quien compra (1 o 0)',
                'Decisión (publicar, reenfocar, descartar)',
              ],
              rows: [
                ['Ejemplo: caso de un cliente con su problema y cómo lo resolvió', 'compra', '[LÍNEA 1]', '1', 'publicar'],
                ['Ejemplo: tendencia de humor sin relación con lo que vende', 'cualquiera', 'ninguna', '0', 'descartar'],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['Total', '', '', '=SUM(D2:D7)', ''],
              ],
              note: 'Agregue filas arriba del total si tiene más piezas y ajuste el rango. Lleve el total y el número de piezas a la calculadora de abajo.',
            },
            {
              type: 'calc',
              id: 'regla-siete-de-diez',
              title: '¿Su mes pasa la regla?',
              inputs: [
                { id: 'total', label: 'Piezas del mes', value: 20, unit: 'piezas', hint: 'Valor de ejemplo. Ponga las suyas.' },
                { id: 'comprador', label: 'Piezas que le hablan a quien compra', value: 12, unit: 'piezas' },
              ],
              outputs: [
                { label: 'Proporción que le habla a quien compra', expr: 'comprador / total', format: 'percent' },
                { label: 'Piezas que le faltan para siete de cada diez', expr: '(total * 7 / 10) - comprador', format: 'number' },
              ],
              verdict: {
                expr: '(comprador * 10) - (total * 7) + 0.5',
                pass: 'Pasa: al menos siete de cada diez piezas le hablan a quien compra.',
                fail: 'No pasa: reenfoque o saque piezas antes de aprobar el calendario.',
              },
            },
            {
              type: 'template',
              title: 'Prompt: pasar el calendario por el filtro',
              body: `Usted es el editor de contenido de [EMPRESA]. Su trabajo es proteger la cuenta de la empresa, no conseguir vistas.

Quién nos compra: [CARGO O PERFIL, en una línea]
Quién nos recomienda: [PERFIL]
Nuestras líneas de negocio: [LÍNEA 1], [LÍNEA 2], [LÍNEA 3]

Calendario propuesto (una pieza por línea):
"""
[PEGUE EL CALENDARIO]
"""

Para cada pieza responda en una tabla: a quién le habla (compra, recomienda, cualquiera), qué línea vende (o ninguna), y la decisión (publicar, reenfocar, descartar).
Para cada "reenfocar", proponga en una línea cómo la misma idea le habla a quien compra y apunta a una línea de negocio.
Al final, diga cuántas piezas de cuántas le hablan a quien compra y si el calendario llega a siete de cada diez.

No apruebe una pieza porque sea divertida o porque pueda viralizarse. Si no sabe a quién le habla, márquela como "cualquiera".`,
            },
            {
              type: 'check',
              id: 'antes-de-publicar',
              title: 'Cada pieza, antes de salir',
              items: [
                'Sé a quién le habla: al que compra o al que recomienda.',
                'Apunta a una línea de negocio que vendo hoy.',
                'No es "cualquiera y ninguna".',
                'El mes completo sigue en siete de cada diez o más.',
              ],
            },
          ],
        },

        // es-22, postura T20. Coincidencia entre corridas: ev-23 (metodo de GEO, dos corridas iguales coinciden en ~36% de las marcas).
        {
          id: 'aparecer-en-la-respuesta',
          title: 'Mida si el asistente lo nombra',
          videos: ['es-22'],
          intro:
            'Una medición que usted hace esta semana para saber si ChatGPT y los otros asistentes lo nombran, y en qué páginas tiene que aparecer.',
          blocks: [
            {
              type: 'rule',
              text: 'La pregunta ya no es en qué puesto sale en Google. Es si el asistente lo nombra en la respuesta.',
            },
            {
              type: 'p',
              text: 'El asistente responde y recomienda marcas por su cuenta, y cada uno se comporta distinto: uno cita fuentes, otro nombra marcas. Además, la misma pregunta da respuestas distintas: en nuestras mediciones, **dos corridas iguales coinciden en cerca del 36% de las marcas**. Por eso una sola corrida no dice nada.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Abra una ventana privada, sin sesión iniciada',
                  body: 'Su propia cuenta ya conoce su empresa, su historial y su ubicación, y le muestra la versión más optimista.',
                },
                {
                  title: 'Escriba cinco preguntas como las haría un cliente',
                  body: 'Nunca con el nombre de su empresa. Use los patrones de abajo.',
                },
                {
                  title: 'Haga cada pregunta varias veces, en chats nuevos',
                  body: 'Usted decide cuántas veces por pregunta. Lo que importa es que sea el mismo número para todas y el mismo cada mes. Repítalo en cada asistente que usen sus clientes.',
                },
                {
                  title: 'Anote todo en el registro',
                  body: 'Si lo nombraron o no, qué marcas nombraron y qué páginas citaron.',
                },
                {
                  title: 'Arme su lista de trabajo',
                  body: 'Las páginas que más cita el asistente son las que tiene que trabajar. Ahí es donde tiene que aparecer. Con el plan de SEO del año que viene en aprobación, mídalo antes de aprobarlo.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Cinco preguntas de cliente (patrones)',
              body: `1. ¿Cuál es la mejor [CATEGORÍA] para [TIPO DE CLIENTE] en [CIUDAD O PAÍS]?
2. Necesito [RESULTADO QUE BUSCA EL CLIENTE]. ¿Qué empresas me recomienda?
3. ¿Qué alternativas hay a [COMPETIDOR MÁS CONOCIDO] para [TIPO DE CLIENTE]?
4. ¿Cuánto cuesta [SERVICIO O PRODUCTO] en [PAÍS] y a quién se lo puedo contratar?
5. Tengo [PROBLEMA CONCRETO, como lo dice el cliente]. ¿Cómo lo resuelvo y con quién?`,
              note: 'Saque el lenguaje de sus clientes, no de su página. Si un cliente no escribiría la pregunta así, cámbiela.',
            },
            {
              type: 'sheet',
              id: 'registro-corridas',
              title: 'El registro de corridas',
              columns: ['Fecha', 'Asistente', 'Pregunta (1 a 5)', 'Corrida', 'Lo nombró (1 o 0)', 'Nombró al competidor principal (1 o 0)', 'Marcas que nombró', 'Páginas que citó (URL)'],
              rows: [
                ['[FECHA]', '[ASISTENTE]', '1', '1', '', '', '', ''],
                ['[FECHA]', '[ASISTENTE]', '1', '2', '', '', '', ''],
                ['[FECHA]', '[ASISTENTE]', '1', '3', '', '', '', ''],
                ['[FECHA]', '[ASISTENTE]', '2', '1', '', '', '', ''],
                ['[FECHA]', '[ASISTENTE]', '2', '2', '', '', '', ''],
                ['[FECHA]', '[ASISTENTE]', '2', '3', '', '', '', ''],
                ['Total', '', '', '', '=SUM(E2:E7)', '=SUM(F2:F7)', '', ''],
              ],
              note: 'Siga agregando filas arriba del total, una por corrida, y ajuste los rangos.',
            },
            {
              type: 'calc',
              id: 'tasa-de-mencion',
              title: '¿Quién gana en la respuesta?',
              inputs: [
                { id: 'corridas', label: 'Corridas en total', value: 25, unit: 'corridas', hint: 'Ejemplo: 5 preguntas por 5 corridas. Ponga las suyas.' },
                { id: 'suyas', label: 'Corridas en las que lo nombraron a usted', value: 4, unit: 'corridas' },
                { id: 'competidor', label: 'Corridas en las que nombraron a su competidor principal', value: 11, unit: 'corridas' },
              ],
              outputs: [
                { label: 'Su tasa de mención', expr: 'suyas / corridas', format: 'percent' },
                { label: 'Tasa de mención del competidor', expr: 'competidor / corridas', format: 'percent' },
                { label: 'Corridas de diferencia', expr: 'competidor - suyas', format: 'number' },
              ],
              verdict: {
                expr: 'suyas - competidor',
                pass: 'Lo nombran más que a su competidor. Repita la medición el mes que viene con las mismas preguntas.',
                fail: 'Su competidor le gana en la respuesta. La lista de páginas citadas es su plan de trabajo.',
              },
            },
            {
              type: 'template',
              title: 'Prompt: consolidar las respuestas',
              body: `Le voy a pegar respuestas de asistentes de IA a preguntas de clientes. No busque nada en internet ni agregue información suya: solo lea lo que le pego.

Mi empresa: [NOMBRE]. Mis competidores conocidos: [LISTA].

Respuestas (cada una con fecha, asistente, número de pregunta y número de corrida):
"""
[PEGUE AQUÍ LAS RESPUESTAS]
"""

Devuélvame:
1. Tabla por corrida: si me nombraron (sí o no), qué marcas nombraron, en qué orden.
2. Tabla de marcas: cuántas corridas nombró a cada una, de mayor a menor.
3. Tabla de páginas citadas: URL, cuántas veces aparece, y el tipo (comparativa, foro, medio, directorio, reseñas, sitio de una marca).
4. Las cinco páginas que más se repiten y que no son mías.

Si una respuesta no cita fuentes, escriba "sin fuentes". No cuente como mención una marca que solo aparece en una URL.`,
            },
            {
              type: 'sheet',
              id: 'lista-de-paginas',
              title: 'La lista de trabajo: dónde tiene que aparecer',
              columns: ['Página citada (URL)', 'Veces citada', 'Tipo', '¿Aparezco ahí? (sí o no)', 'Qué hay que hacer', 'Responsable', 'Fecha'],
              rows: [
                ['[URL]', '', 'comparativa', '', 'Ejemplo: pedir que nos incluyan con datos verificables', '', ''],
                ['[URL]', '', 'foro', '', '', '', ''],
                ['[URL]', '', 'medio', '', '', '', ''],
                ['[URL]', '', 'directorio', '', '', '', ''],
                ['[URL]', '', '', '', '', '', ''],
              ],
              note: 'Ordene por veces citada. Las de arriba son su lista de trabajo.',
            },
          ],
        },

        // es-23, caso: ev-24 (creadores desde 2018, lista de unos 2.500, CPM contra vistas mas autoridad, trato tipo UGC),
        // ev-27 (KOL: su palabra pesa por quien es; influencer: alcance y entretenimiento), ev-23 (149K suscriptores, ~330 vistas),
        // ev-29 (lo que piden creadores y managers antes de dar tarifa).
        {
          id: 'autoridad-del-creador',
          title: 'Evalúe al creador antes de pagarle',
          videos: ['es-23'],
          intro:
            'Tres pasos, una calculadora y una hoja para leer comentarios, para que su presupuesto vaya a quien la gente sí le hace caso.',
          blocks: [
            {
              type: 'p',
              text: 'Trabajamos con creadores en Latinoamérica desde 2018 y hoy tenemos una lista de unos 2.500. Lo que aprendimos: el costo por mil vistas no alcanza. Un líder de opinión vale por quién es, no por cuánta gente lo ve. Un influenciador vale por alcance y entretenimiento.',
            },
            {
              type: 'rule',
              text: 'Vistas sin autoridad es alcance caro.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Calcule el costo por mil vistas, sobre vistas recientes',
                  body: 'No sobre seguidores. Hemos visto una cuenta de 149.000 suscriptores que promediaba unas 330 vistas. Tome el promedio de sus últimas piezas.',
                },
                {
                  title: 'Mida la autoridad en los comentarios',
                  body: 'Lea los comentarios de sus últimas piezas. ¿La gente pregunta, pregunta dónde comprar, repite lo que él dice? Si solo le dicen que está muy lindo, tiene alcance, no autoridad.',
                },
                {
                  title: 'Decida cómo pagarle',
                  body: 'Autoridad alta y costo dentro de su tope: páguele por publicar. Autoridad baja: no le pague por publicar. Cómprele el contenido y páutelo usted, o descártelo.',
                },
              ],
            },
            {
              type: 'calc',
              id: 'costo-por-mil-vistas',
              title: 'Costo real por mil vistas',
              inputs: [
                { id: 'tarifa', label: 'Lo que cobra por pieza', value: 400, unit: 'USD', hint: 'Valor de ejemplo.' },
                { id: 'vistas', label: 'Vistas promedio de sus últimas piezas', value: 18000, unit: 'vistas', hint: 'Vistas, no seguidores.' },
                { id: 'tope', label: 'Su tope de costo por mil vistas', value: 20, unit: 'USD', hint: 'Lo fija usted según lo que le rinde su propia pauta. Este es un ejemplo.' },
              ],
              outputs: [
                { label: 'Costo por mil vistas', expr: 'tarifa / vistas * 1000', format: 'money' },
                { label: 'Tarifa que respetaría su tope', expr: 'tope * vistas / 1000', format: 'money' },
              ],
              verdict: {
                expr: 'tope - (tarifa / vistas * 1000)',
                pass: 'El costo está dentro de su tope. Ahora mida la autoridad antes de pagar.',
                fail: 'Está por encima de su tope. Negocie la tarifa o cómprele el contenido y páutelo usted.',
              },
            },
            {
              type: 'sheet',
              id: 'lectura-comentarios',
              title: 'La lectura de comentarios',
              columns: [
                'Creador',
                'Pieza (enlace)',
                'Comentarios leídos',
                'Preguntas sobre el tema',
                'Preguntan dónde comprar o lo piden',
                'Repiten lo que él dijo',
                'Solo elogio o emojis',
                'Proporción que actúa',
              ],
              rows: [
                ['Ejemplo: creador A', '[ENLACE]', '50', '6', '4', '3', '37', '=(D2+E2+F2)/C2'],
                ['Ejemplo: creador B', '[ENLACE]', '50', '1', '0', '0', '49', '=(D3+E3+F3)/C3'],
                ['', '', '', '', '', '', '', '=(D4+E4+F4)/C4'],
                ['', '', '', '', '', '', '', '=(D5+E5+F5)/C5'],
                ['', '', '', '', '', '', '', '=(D6+E6+F6)/C6'],
              ],
              note: 'Los ejemplos son hipotéticos. Lea la misma cantidad de comentarios por creador para poder comparar, y fije usted desde qué proporción le paga por publicar.',
            },
            {
              type: 'template',
              title: 'Prompt: clasificar los comentarios',
              body: `Le pego los comentarios de las últimas [N] piezas de un creador. Quiero saber si su audiencia actúa sobre lo que dice o solo lo entretiene.

Tema del creador: [TEMA]. Lo que yo vendería con él: [PRODUCTO].

Comentarios:
"""
[PEGUE LOS COMENTARIOS]
"""

Clasifique cada comentario en una sola categoría:
1. Pregunta sobre el tema
2. Pregunta dónde comprar, pide el enlace o dice que lo va a probar
3. Repite o discute lo que el creador dijo
4. Solo elogio, emojis o etiquetas a amigos
5. Spam o bots

Devuelva una tabla con el conteo por categoría, tres comentarios literales de las categorías 1 a 3, y la proporción de comentarios en las categorías 1 a 3 sobre el total sin contar spam.
No infiera intención de un emoji. Si un comentario es ambiguo, va en la categoría 4.`,
            },
            {
              type: 'template',
              title: 'Mensaje: comprarle el contenido para pautarlo usted',
              body: `Hola [NOMBRE], soy [SU NOMBRE] de [EMPRESA]. Nos gusta cómo explica [TEMA] y queremos proponerle algo distinto a una publicación en su cuenta.

Queremos comprarle [NÚMERO] videos de [DURACIÓN] sobre [PRODUCTO], para pautarlos desde nuestras cuentas.

Para que pueda cotizar de una vez:
1. Brief: [LINK O RESUMEN DE TRES LÍNEAS]
2. Fecha de entrega: [FECHA]
3. Uso de imagen: pauta pagada en [REDES] durante [MESES], en [PAÍSES]
4. Exclusividad: [NINGUNA o CATEGORÍA Y PLAZO]
5. Presupuesto de referencia: [RANGO]

¿Me comparte su tarifa por video con esos derechos, y su tarifa general por formato?`,
              note: 'Va con presupuesto, fecha, brief, uso de imagen y exclusividad desde el primer mensaje porque eso es lo que creadores y managers piden antes de dar tarifa. Si no lo manda, se va la semana en idas y vueltas.',
            },
            {
              type: 'check',
              id: 'antes-de-pagar-creador',
              title: 'Antes de pagarle a un creador',
              items: [
                'Calculé el costo por mil sobre vistas recientes, no sobre seguidores.',
                'Leí los comentarios de sus últimas piezas y llené la hoja.',
                'Su audiencia pregunta, compra o repite lo que él dice.',
                'Si la autoridad es baja, le propuse comprarle el contenido en vez de pagarle por publicar.',
                'En un producto técnico, prefiero un creador al que le creen sobre cinco que todo el mundo ve.',
              ],
            },
          ],
        },

        // es-24, Alex Hormozi, atribuido como en el guion: podcast de George Janko, episodio 159 ([0:04:53], [0:06:42 a 0:07:54]).
        {
          id: 'capturar-contenido',
          title: 'Una reunión, una semana de contenido',
          videos: ['es-24'],
          intro:
            'Cómo sacar cinco piezas de una reunión que ya iba a pasar, para que una sola reunión le dé contenido para una semana.',
          blocks: [
            {
              type: 'p',
              text: 'Alex Hormozi cuenta que su equipo publica **más de mil piezas de contenido por semana** sin gastarle tiempo extra a él, y que **el 90 por ciento es captura**: seminarios, preguntas y respuestas, cosas que ya iban a pasar, convertidas en clips, cortos, carruseles e hilos (podcast de George Janko, episodio 159).',
            },
            {
              type: 'rule',
              text: 'El mejor contenido no se fabrica. Se captura.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Haga la lista de lo que ya pasa',
                  body: 'Reuniones con clientes, capacitaciones, preguntas que se repiten en ventas y en soporte. Llene el inventario.',
                },
                {
                  title: 'Grabe una, con permiso',
                  body: 'Pida permiso antes con el mensaje de abajo. Grabe y transcriba (la grabadora de su videollamada o cualquier transcriptor sirve).',
                },
                {
                  title: 'Saque cinco preguntas con su respuesta',
                  body: 'Con el prompt de abajo. Cada pregunta es una pieza, una por día hábil.',
                },
                {
                  title: 'Revise antes de publicar',
                  body: 'Nada que identifique al cliente sin su visto bueno. Si el cliente pidió revisar, se lo manda antes.',
                },
                {
                  title: 'Diseñe su servicio para que produzca contenido',
                  body: 'Que cada entrega deje algo grabable: una revisión mensual, una sesión de preguntas, un antes y después. Ese contenido es el que trae al siguiente cliente.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'inventario-captura',
              title: 'El inventario de lo que ya pasa',
              columns: ['Qué pasa', 'Veces por semana', '¿Se puede grabar? (sí o no)', 'Quién da el permiso', 'Preguntas que se repiten ahí'],
              rows: [
                ['Ejemplo: reunión de seguimiento con un cliente', '', '', 'El cliente', ''],
                ['Ejemplo: capacitación interna', '', '', '', ''],
                ['Ejemplo: llamada de ventas', '', '', 'El prospecto', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['Total por semana', '=SUM(B2:B6)', '', '', ''],
              ],
            },
            {
              type: 'template',
              title: 'Mensaje: pedir permiso para grabar',
              body: `Hola [NOMBRE]. Para la reunión del [FECHA], ¿le parece si la grabamos?

La uso para dos cosas: tener el resumen exacto de lo que acordamos, y sacar algunas preguntas generales para contenido de [EMPRESA]. Nada con su nombre, el de su empresa ni sus cifras sin que usted lo apruebe antes. Si prefiere revisar cada pieza, se la mando primero.

Si no le queda cómodo, no hay problema y la hacemos igual.`,
            },
            {
              type: 'template',
              title: 'Prompt: cinco piezas de una transcripción',
              body: `Le pego la transcripción de una reunión con un cliente. Quiero cinco piezas de contenido para la semana, sacadas solo de lo que se dijo.

Mi empresa: [EMPRESA]. Quién nos compra: [PERFIL]. Lo que vendemos: [LÍNEAS DE NEGOCIO].

Transcripción (con marcas de tiempo):
"""
[PEGUE LA TRANSCRIPCIÓN]
"""

Para cada una de las cinco preguntas que más le sirven a un cliente parecido:
1. La pregunta, como la dijo el cliente.
2. La respuesta, en tres a cinco frases, con las palabras de quien respondió.
3. La primera línea de la pieza: lo que hace que alguien se detenga.
4. Minuto de inicio y de fin en la grabación, para cortar el clip.
5. El formato que mejor le queda (clip, carrusel, post de texto) y por qué.
6. La línea de negocio a la que apunta.

Quite nombres, empresas, cifras y cualquier dato que identifique al cliente. No agregue cifras, ejemplos ni consejos que no estén en la transcripción. Si no hay cinco preguntas buenas, deme las que haya.`,
            },
            {
              type: 'sheet',
              id: 'semana-de-piezas',
              title: 'La semana que sale de una reunión',
              columns: ['Día', 'Pregunta', 'Formato', 'Minuto del clip', 'Línea de negocio', 'Revisada (1 o 0)', 'Publicada (1 o 0)'],
              rows: [
                ['Lunes', '', '', '', '', '', ''],
                ['Martes', '', '', '', '', '', ''],
                ['Miércoles', '', '', '', '', '', ''],
                ['Jueves', '', '', '', '', '', ''],
                ['Viernes', '', '', '', '', '', ''],
                ['Total', '', '', '', '', '=SUM(F2:F6)', '=SUM(G2:G6)'],
              ],
              note: 'Antes de publicar, cada pieza pasa por el filtro de la sección tres: a quién le habla y qué vende.',
            },
            {
              type: 'check',
              id: 'servicio-que-produce',
              title: 'Su servicio produce contenido',
              items: [
                'Tengo la lista de lo que ya pasa cada semana en la empresa.',
                'Pido permiso de grabar como parte normal de las reuniones con clientes.',
                'Cada reunión grabada se transcribe el mismo día.',
                'De cada transcripción salen cinco preguntas con su respuesta.',
                'Hay al menos una entrega del servicio pensada para dejar algo grabable.',
              ],
            },
          ],
        },
      ],
      next: {
        text: 'Si quiere ver cómo lo nombran hoy los asistentes de IA, y qué páginas citan en su categoría, sin hacer las corridas a mano, empiece por el escaneo gratuito.',
        cta: 'Hacer el escaneo gratuito',
        page: 'geo',
      },
    },
  },
};

export default kit;
