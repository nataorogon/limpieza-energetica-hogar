/**
 * Mandala flor de la vida: 19 círculos en retícula hexagonal + anillo
 * exterior doble. Solo linework, nunca relleno (regla de marca).
 *
 * Cada círculo lleva pathLength=1, así el dibujado por scroll es pura
 * matemática CSS (stroke-dasharray: 1 + stroke-dashoffset ligado a
 * --progress) sin medir paths. Los grupos fol-g1…g4 permiten el stagger
 * centro→afuera; ese CSS vive en globals.css y SOLO se activa dentro de
 * .energy-flow — fuera de ahí el mandala se ve completo (watermark).
 */

const R = 34;
const CX = 120;
const CY = 120;

function ringCenters(dist: number, startDeg: number): Array<[number, number]> {
  return Array.from({ length: 6 }, (_, k) => {
    const a = ((startDeg + k * 60) * Math.PI) / 180;
    return [
      Math.round((CX + dist * Math.cos(a)) * 100) / 100,
      Math.round((CY + dist * Math.sin(a)) * 100) / 100,
    ];
  });
}

const RING_1 = ringCenters(R, 0);
const RING_2A = ringCenters(2 * R, 0);
const RING_2B = ringCenters(Math.sqrt(3) * R, 30);

type Props = {
  className?: string;
  /** "url(#grad-oro)" por defecto; "currentColor" para la copia fantasma. */
  stroke?: string;
};

export default function FlowerOfLife({
  className,
  stroke = "url(#grad-oro)",
}: Props) {
  const circle = (cx: number, cy: number, r: number, key: string) => (
    <circle key={key} cx={cx} cy={cy} r={r} pathLength={1} />
  );

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      <g className="fol-g1">{circle(CX, CY, R, "c")}</g>
      <g className="fol-g2">
        {RING_1.map(([x, y], i) => circle(x, y, R, `r1-${i}`))}
      </g>
      <g className="fol-g3">
        {RING_2A.map(([x, y], i) => circle(x, y, R, `r2a-${i}`))}
        {RING_2B.map(([x, y], i) => circle(x, y, R, `r2b-${i}`))}
      </g>
      {/* Anillo exterior: ya no son dos círculos que se dibujan, sino una
          pista tenue y un haz que la recorre. El haz avanza con --progress
          —arranca arriba y va en sentido horario—, así que se lee como energía
          cargándose en círculo al ritmo del scroll y no como dos trazos.
          Fuera de .energy-flow los tres se pintan completos y concéntricos:
          el mandala sigue viéndose entero como marca de agua. */}
      <g className="fol-g4">
        <circle
          cx={CX}
          cy={CY}
          r={106}
          className="fol-pista"
          pathLength={1}
        />
        <g className="fol-haz">
          <circle
            cx={CX}
            cy={CY}
            r={106}
            className="fol-haz-halo"
            pathLength={1}
            filter="blur(2.5px)"
          />
          <circle
            cx={CX}
            cy={CY}
            r={106}
            className="fol-haz-nucleo"
            pathLength={1}
          />
        </g>
      </g>
    </svg>
  );
}
