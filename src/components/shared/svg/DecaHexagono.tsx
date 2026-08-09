/**
 * El decahexágono de marca: el marco geométrico que rodea la garantía.
 *
 * Es vector propio, no el PNG del archivo original. public/logos/
 * DecaHexagono.svg en realidad envuelve un bitmap de 1.3 MB; midiéndolo píxel
 * a píxel, la figura resultó ser geometría exacta y se puede redibujar. Sale a
 * cuenta por tres lados: pesa ~1 KB, es nítido a cualquier tamaño, y toma
 * `grad-oro` — el mismo dorado de marca que la flor y el haz, en vez del oro
 * fotográfico apagado del bitmap.
 *
 * La construcción, tal como está en el original:
 *
 *  · DECÁGONO regular con un vértice al norte. Por eso el bitmap mide
 *    2852×3000: su relación es 2·cos 18° / 2 = 0.9511.
 *
 *  · HEXÁGONO INSCRITO EN ÉL, que NO es regular. Sus seis vértices son las
 *    puntas norte y sur del decágono —las cuatro líneas de cada punta salen
 *    del mismo pixel, comprobado— más cuatro puntos a media altura (y = ±R/2)
 *    que caen sobre las aristas diagonales del decágono. Medido: la arista
 *    vertical del hexágono está a 0.806·R del centro y la del decágono a esa
 *    altura, a 0.812·R — la misma línea, dentro del grosor del trazo.
 *
 *    Un hexágono REGULAR de radio R también compartiría las puntas, pero sus
 *    vértices laterales caerían a 0.866·R, fuera del decágono (0.812·R ahí),
 *    y cruzarían las aristas. El del original toca sin salirse: queda dentro
 *    en todo su recorrido, en contacto con el decágono en seis puntos.
 *
 * NUNCA se deforma, y no depende de que quien lo use acierte: sin
 * preserveAspectRatio="none", el SVG conserva su proporción y se centra dentro
 * de la caja que le den, sea la que sea. Para usarlo como marco hay que darle
 * una caja con su misma relación (0.9511) y entonces la llena exacta; con
 * cualquier otra, se ajusta dentro sin estirarse.
 *
 * `non-scaling-stroke` mantiene el trazo a 1px real en cualquier tamaño, en
 * vez de engordar con la escala.
 */

/** Radio del decágono, en unidades del viewBox. */
const R = 120;
/** Media anchura de la figura = apotema del decágono (vértice al norte). */
const CX = R * Math.cos((18 * Math.PI) / 180);
const CY = R;

type Punto = readonly [number, number];

/** Vértices del decágono regular, con el primero al norte y en horario. */
const DECAGONO: Punto[] = Array.from({ length: 10 }, (_, k) => {
  const a = ((-90 + k * 36) * Math.PI) / 180;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
});

/** x del segmento p→q a la altura y (los dos usos cruzan esa altura). */
function xEnAltura(p: Punto, q: Punto, y: number): number {
  return p[0] + ((y - p[1]) / (q[1] - p[1])) * (q[0] - p[0]);
}

/**
 * Los vértices laterales del hexágono: a media altura, sobre la arista
 * superior derecha del decágono (la que va del vértice a -54° al de -18°).
 */
const X_LATERAL = xEnAltura(DECAGONO[1], DECAGONO[2], CY - R / 2);

const HEXAGONO: Punto[] = [
  [CX, CY - R], // punta norte, compartida con el decágono
  [X_LATERAL, CY - R / 2],
  [X_LATERAL, CY + R / 2],
  [CX, CY + R], // punta sur, compartida
  [2 * CX - X_LATERAL, CY + R / 2],
  [2 * CX - X_LATERAL, CY - R / 2],
];

function puntos(vertices: Punto[]): string {
  return vertices
    .map(([x, y]) => `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`)
    .join(" ");
}

export default function DecaHexagono({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${Math.round(CX * 2 * 100) / 100} ${R * 2}`}
      fill="none"
      stroke="url(#grad-oro)"
      aria-hidden="true"
      className={className}
    >
      <polygon
        points={puntos(DECAGONO)}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={puntos(HEXAGONO)}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
