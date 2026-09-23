import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Quantum Is A Supply Chain Problem',
  slug: 'quantum-is-a-supply-chain-problem',
  date: '2026-06-29T14:00:00Z',
  excerpt:
    'The interesting constraint on quantum computing is not physics any more. It is refrigerators, helium, cabling, fabrication capacity and who controls them. That is why governments are buying equity.',
  metaDescription:
    'The constraint on quantum computing is industrial, not theoretical: helium-3, refrigeration, cryogenic cabling and fab capacity, and who controls them.',
  tags: ['quantum', 'infrastructure', 'supply-chain', 'policy', 'hardware'],
  content_md: `
# Quantum Is A Supply Chain Problem

## Key Takeaways
- **Error correction stopped being theoretical.** Real machines now run logical qubits, in small numbers.
- **The bottleneck moved from physics to industry.** Refrigeration, helium-3, cryogenic wiring, fabrication capacity.
- **Helium-3 costs on the order of a thousand times gold by weight**, and a supplier signed a contract to source it from the Moon.
- **Governments are taking equity stakes to secure capacity**, which tells you how they classify this.
- **Read roadmaps as promises.** The gap between an announced target and a delivered result is where most of the commentary goes wrong.

---

Most quantum coverage is a qubit count and an adjective. That is a bad way to understand an industry, because the number that gets announced is rarely the number that constrains it.

I have spent the last year looking at this the way I look at any company: what does it take to build one more unit, who supplies that, and what happens if they cannot.

The answers are surprisingly physical.

## First, what actually got delivered

Three results from the last two years are real, published and peer reviewed, and they are why the tone changed.

Google's Willow processor demonstrated below threshold error correction on 105 qubits, meaning the logical error rate roughly halves with each increase in code distance. Adding physical qubits started making the logical qubit better rather than worse, which is the precondition for everything else. Google followed it in October 2025 with a verifiable quantum advantage result on a physics problem. ([Google Research](https://research.google/blog/a-verifiable-quantum-advantage/))

Quantinuum launched Helios commercially in November 2025 with 98 physical qubits, two qubit gate fidelity of 99.921 percent, and 48 error corrected logical qubits. ([Quantinuum](https://www.quantinuum.com/press-releases/quantinuum-announces-commercial-launch-of-new-helios-quantum-computer-that-offers-unprecedented-accuracy-to-enable-generative-quantum-ai-genqai))

IBM's Nighthawk arrived the same month, and alongside it IBM demonstrated real time decoding of an error correcting code on FPGAs, fast enough to keep up with the machine, which they described as being a year ahead of their own schedule. ([arXiv, October 2025](https://arxiv.org/abs/2510.21600))

Notice what those have in common. None of them is a qubit count. They are about error correction working, being verifiable, and being decodable in real time.

And notice what is not on that list. Microsoft's topological claim from early 2025 remains contested, with Nature's own editorial note saying the results do not represent evidence for topological modes. ([APS Physics, March 2025](https://physics.aps.org/articles/v18/68)) A contested result is not a delivered one.

## Now the boring part, which is the real part

To run a superconducting quantum computer you need to hold a chip near absolute zero, deliver thousands of control signals into that cold space without carrying heat in with them, and read signals back out. That is an industrial problem with a small number of suppliers.

**Helium-3.** Dilution refrigerators depend on it. It trades somewhere in the range of two thousand to fifteen thousand dollars per litre, which works out to roughly a thousand times the price of gold by weight. ([The Quantum Insider, September 2025](https://thequantuminsider.com/2025/09/17/bluefors-enters-deal-to-secure-lunar-helium-3-supply-from-interlune/))

It is not mined. In the US it is recovered as a decay product of tritium, which means supply is a function of a nuclear weapons programme's schedule rather than of demand. ([US DOE Isotope Program](https://www.isotopes.gov/Supply-and-Demand-of-Helium-3))

In September 2025, Bluefors, one of the main refrigerator manufacturers, signed an agreement to source up to 10,000 litres a year of helium-3 from the Moon, starting in 2028. ([Bluefors](https://bluefors.com/news/bluefors-to-source-helium-3-from-the-moon-with-interlune-to-power-next-phase-of-quantum-industry-growth/))

Read that again. A supply agreement, with delivery dates, for an isotope extracted from lunar regolith. Whatever you think about the timeline, the fact that a serious manufacturer signed it tells you how tight they expect terrestrial supply to be.

**Cabling.** Each qubit needs control lines running from room temperature into the cold stage. Coaxial cable does not scale: too much physical space, too much heat, too many failure points. One supplier in this niche describes flexible superconducting cabling giving roughly eight times the channel density at similar cost, with a roadmap from 256 channels per loader now to 1,024 in 2027 and 4,096 in 2029. ([Physics World, September 2025](https://physicsworld.com/a/delft-circuits-cryogenic-rf-cable-innovations-offer-a-flexible-path-to-quantum-scalability/))

Those numbers are the actual ceiling on qubit count for that architecture. Not the chip. The wiring.

**Fabrication.** Quantum chips need fabs, and the good ones are busy making something else. Which is why the moves this year have been about owning capacity rather than renting it.

## Governments are buying equity, not writing grants

This is the part I find most telling as an operator.

In May 2026 the US Department of Commerce announced letters of intent worth about 2.013 billion dollars to nine companies, including a billion to IBM for a quantum foundry, with a minority non controlling equity stake in each company as a condition of the money. ([NIST, May 2026](https://www.nist.gov/news-events/news/2026/05/department-commerce-announces-letters-intent-9-companies-2-billion))

Governments do not usually take equity in exchange for industrial support. When they do, it is because they have classified the capability as strategic rather than commercial.

DARPA's benchmarking initiative advanced 11 companies to its second stage in November 2025, and the programme's stated question is whether any approach reaches utility scale by 2033. ([DARPA](https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection)) The UK committed two billion pounds in March 2026, including an advance market commitment to actually buy large scale machines. ([NQCC](https://www.nqcc.ac.uk/blogs/the-uk-has-thrown-down-the-gauntlet-on-quantum/)) The EU's quantum strategy funds chip pilot lines and has a Quantum Act on the calendar, with supply chain security named explicitly. ([EU Quantum Europe Strategy](https://qt.eu/media/pdf/Quantum_Europe_Strategy_July_2025.pdf))

An advance market commitment is not a subsidy. It is a purchase order for something that does not exist yet, which is how you de risk a supply chain rather than a laboratory.

## Roadmaps are marketing until they are not

Every major player publishes a roadmap with logical qubit counts and dates several years out. Treat those as intentions.

The useful corrective is the Australian project with PsiQuantum, announced with close to a billion Australian dollars behind it, which by mid 2026 had changed site, changed chief executive, had no major development plan lodged, and had its delivery date reported as at risk. ([Forbes Australia](https://www.forbes.com.au/news/innovation/psiquantums-stalled-quantum-plant-to-break-ground-after-location-switch/))

No physics failed there. Permits, sites and construction did. Which is exactly the point of this post.

## What this means if you are not building a quantum computer

Three things, and none of them require a physicist.

1. **Your cryptography timeline is set by this industry's timeline, and this industry's timeline is now industrial.** Delays in refrigeration and fabrication push the threat out. Better error correction and decoding pull it in. Both are happening at once.
2. **The suppliers are more interesting than the headline names.** In any deep tech wave, the people selling the picks have better margins and more certainty than the people digging. Refrigeration, cryogenic wiring, control electronics and isotope supply are small markets today with structural demand behind them.
3. **Watch what governments buy, not what they announce.** Equity stakes and purchase commitments are a stronger signal than strategy documents, and they arrived this year.

## The verdict

Quantum computing stopped being only a physics story and became an industrial one at the moment error correction started working. From here, the things that decide the pace are helium, refrigerators, cables, fabs, permits and procurement.

That is less romantic than a breakthrough narrative. It is also how you tell, from the outside, whether a timeline is real.
`,
  es: {
    title: 'La computación cuántica es un problema de cadena de suministro',
    excerpt:
      'La restricción interesante de la computación cuántica ya no es la física. Son los refrigeradores, el helio, el cableado, la capacidad de fabricación y quién los controla. Por eso los gobiernos están comprando participaciones accionarias.',
    metaDescription:
      'El límite de la computación cuántica es industrial, no teórico: helio-3, refrigeración, cableado criogénico, capacidad de fabricación y quién los controla.',
    tags: ['cuántica', 'infraestructura', 'cadena-de-suministro', 'políticas', 'hardware'],
    content_md: `
# La computación cuántica es un problema de cadena de suministro

## Puntos clave
- **La corrección de errores dejó de ser teórica.** Máquinas reales ya corren qubits lógicos, en números pequeños.
- **El cuello de botella pasó de la física a la industria.** Refrigeración, helio-3, cableado criogénico, capacidad de fabricación.
- **El helio-3 cuesta del orden de mil veces lo que el oro por peso**, y un proveedor firmó un contrato para obtenerlo de la Luna.
- **Los gobiernos están tomando participaciones accionarias para asegurar capacidad**, lo que te dice cómo clasifican esto.
- **Lee las hojas de ruta como promesas.** La brecha entre una meta anunciada y un resultado entregado es donde la mayoría de los análisis se equivocan.

---

La mayor parte de la cobertura sobre computación cuántica es un número de qubits y un adjetivo. Esa es una mala forma de entender una industria, porque el número que se anuncia rara vez es el número que la limita.

He pasado el último año mirando esto como miro cualquier empresa: qué se necesita para construir una unidad más, quién suministra eso y qué pasa si no puede hacerlo.

Las respuestas son sorprendentemente físicas.

## Primero, lo que de verdad se entregó

Tres resultados de los últimos dos años son reales, están publicados y revisados por pares, y son la razón por la que cambió el tono.

El procesador Willow de Google demostró corrección de errores por debajo del umbral en 105 qubits, lo que significa que la tasa de error lógico se reduce más o menos a la mitad con cada aumento en la distancia del código. Agregar qubits físicos empezó a hacer mejor al qubit lógico en lugar de peor, que es la condición previa para todo lo demás. Google lo siguió en octubre de 2025 con un resultado de ventaja cuántica verificable en un problema de física. ([Google Research](https://research.google/blog/a-verifiable-quantum-advantage/))

Quantinuum lanzó comercialmente Helios en noviembre de 2025 con 98 qubits físicos, una fidelidad de compuerta de dos qubits de 99,921 por ciento y 48 qubits lógicos con corrección de errores. ([Quantinuum](https://www.quantinuum.com/press-releases/quantinuum-announces-commercial-launch-of-new-helios-quantum-computer-that-offers-unprecedented-accuracy-to-enable-generative-quantum-ai-genqai))

Nighthawk de IBM llegó el mismo mes, y junto con él IBM demostró la decodificación en tiempo real de un código de corrección de errores en FPGAs, lo bastante rápida para seguirle el ritmo a la máquina, algo que describieron como un año adelantado frente a su propio cronograma. ([arXiv, octubre de 2025](https://arxiv.org/abs/2510.21600))

Fíjate en lo que tienen en común. Ninguno es un número de qubits. Se tratan de que la corrección de errores funcione, sea verificable y se pueda decodificar en tiempo real.

Y fíjate en lo que no está en esa lista. La afirmación topológica de Microsoft de principios de 2025 sigue en disputa, y la propia nota editorial de Nature dice que los resultados no representan evidencia de modos topológicos. ([APS Physics, marzo de 2025](https://physics.aps.org/articles/v18/68)) Un resultado en disputa no es un resultado entregado.

## Ahora la parte aburrida, que es la parte real

Para operar un computador cuántico superconductor necesitas mantener un chip cerca del cero absoluto, llevar miles de señales de control a ese espacio frío sin meter calor con ellas y leer señales de vuelta. Ese es un problema industrial con un número pequeño de proveedores.

**Helio-3.** Los refrigeradores de dilución dependen de él. Se transa en algún punto entre dos mil y quince mil dólares por litro, lo que equivale más o menos a mil veces el precio del oro por peso. ([The Quantum Insider, septiembre de 2025](https://thequantuminsider.com/2025/09/17/bluefors-enters-deal-to-secure-lunar-helium-3-supply-from-interlune/))

No se extrae de minas. En Estados Unidos se recupera como producto del decaimiento del tritio, lo que significa que la oferta depende del cronograma de un programa de armas nucleares y no de la demanda. ([US DOE Isotope Program](https://www.isotopes.gov/Supply-and-Demand-of-Helium-3))

En septiembre de 2025, Bluefors, uno de los principales fabricantes de refrigeradores, firmó un acuerdo para obtener hasta 10.000 litros al año de helio-3 de la Luna, a partir de 2028. ([Bluefors](https://bluefors.com/news/bluefors-to-source-helium-3-from-the-moon-with-interlune-to-power-next-phase-of-quantum-industry-growth/))

Léelo otra vez. Un acuerdo de suministro, con fechas de entrega, por un isótopo extraído del regolito lunar. Pienses lo que pienses sobre el cronograma, el hecho de que un fabricante serio lo haya firmado te dice qué tan escasa espera que sea la oferta terrestre.

**Cableado.** Cada qubit necesita líneas de control que vayan desde la temperatura ambiente hasta la etapa fría. El cable coaxial no escala: demasiado espacio físico, demasiado calor, demasiados puntos de falla. Un proveedor de este nicho describe que el cableado superconductor flexible ofrece aproximadamente ocho veces la densidad de canales a un costo similar, con una hoja de ruta que va de 256 canales por loader hoy a 1.024 en 2027 y 4.096 en 2029. ([Physics World, septiembre de 2025](https://physicsworld.com/a/delft-circuits-cryogenic-rf-cable-innovations-offer-a-flexible-path-to-quantum-scalability/))

Esas cifras son el techo real del número de qubits para esa arquitectura. No el chip. El cableado.

**Fabricación.** Los chips cuánticos necesitan fábricas, y las buenas están ocupadas haciendo otra cosa. Por eso los movimientos de este año han sido para ser dueños de capacidad en lugar de alquilarla.

## Los gobiernos están comprando participación, no otorgando subsidios

Esta es la parte que más me dice como operador.

En mayo de 2026, el Departamento de Comercio de Estados Unidos anunció cartas de intención por unos 2.013 millones de dólares a nueve empresas, incluidos mil millones a IBM para una fundición cuántica, con una participación accionaria minoritaria y sin control en cada empresa como condición del dinero. ([NIST, mayo de 2026](https://www.nist.gov/news-events/news/2026/05/department-commerce-announces-letters-intent-9-companies-2-billion))

Los gobiernos no suelen tomar participación accionaria a cambio de apoyo industrial. Cuando lo hacen, es porque clasificaron la capacidad como estratégica y no como comercial.

La iniciativa de benchmarking de DARPA pasó a 11 empresas a su segunda etapa en noviembre de 2025, y la pregunta declarada del programa es si algún enfoque llega a escala de utilidad para 2033. ([DARPA](https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection)) El Reino Unido comprometió dos mil millones de libras en marzo de 2026, incluido un compromiso anticipado de mercado para comprar de verdad máquinas a gran escala. ([NQCC](https://www.nqcc.ac.uk/blogs/the-uk-has-thrown-down-the-gauntlet-on-quantum/)) La estrategia cuántica de la UE financia líneas piloto de chips y tiene una Quantum Act en el calendario, con la seguridad de la cadena de suministro mencionada de forma explícita. ([EU Quantum Europe Strategy](https://qt.eu/media/pdf/Quantum_Europe_Strategy_July_2025.pdf))

Un compromiso anticipado de mercado no es un subsidio. Es una orden de compra por algo que todavía no existe, que es como le quitas riesgo a una cadena de suministro y no a un laboratorio.

## Las hojas de ruta son marketing hasta que dejan de serlo

Cada jugador importante publica una hoja de ruta con números de qubits lógicos y fechas a varios años. Tómalas como intenciones.

El correctivo útil es el proyecto australiano con PsiQuantum, anunciado con cerca de mil millones de dólares australianos detrás, que a mediados de 2026 había cambiado de ubicación, había cambiado de director ejecutivo, no había presentado ningún plan de desarrollo importante y tenía su fecha de entrega reportada en riesgo. ([Forbes Australia](https://www.forbes.com.au/news/innovation/psiquantums-stalled-quantum-plant-to-break-ground-after-location-switch/))

Ahí no falló la física. Fallaron los permisos, las ubicaciones y la construcción. Que es exactamente el punto de este post.

## Qué significa esto si no estás construyendo un computador cuántico

Tres cosas, y ninguna requiere un físico.

1. **Tu cronograma de criptografía lo define el cronograma de esta industria, y el cronograma de esta industria ahora es industrial.** Los retrasos en refrigeración y fabricación alejan la amenaza. Una mejor corrección de errores y decodificación la acercan. Las dos cosas están pasando al mismo tiempo.
2. **Los proveedores son más interesantes que los nombres de los titulares.** En cualquier ola de deep tech, los que venden las picas tienen mejores márgenes y más certeza que los que excavan. Refrigeración, cableado criogénico, electrónica de control y suministro de isótopos son mercados pequeños hoy, con una demanda estructural detrás.
3. **Mira lo que compran los gobiernos, no lo que anuncian.** Las participaciones accionarias y los compromisos de compra son una señal más fuerte que los documentos de estrategia, y llegaron este año.

## El veredicto

La computación cuántica dejó de ser solo una historia de física y se volvió una historia industrial en el momento en que la corrección de errores empezó a funcionar. De aquí en adelante, lo que decide el ritmo son el helio, los refrigeradores, los cables, las fábricas, los permisos y las compras.

Eso es menos romántico que una narrativa de grandes avances. También es la forma de saber, desde afuera, si un cronograma es real.
`,
  },
};

export default post;
