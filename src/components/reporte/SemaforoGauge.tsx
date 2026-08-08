import { nivelDe } from "@/lib/reporte";
import { NIVEL_CLASES, NIVEL_ETIQUETA, NIVEL_STROKE } from "./nivel";

/** Fracciones del arco donde vive cada banda del semáforo (0..1). */
const BANDAS = [
  { desde: 0, hasta: 0.33, nivel: "rojo" as const },
  { desde: 0.34, hasta: 0.66, nivel: "naranja" as const },
  { desde: 0.67, hasta: 1, nivel: "verde" as const },
];

const R = 100;
const CX = 120;
const CY = 120;
/** Semicírculo de izquierda (0) a derecha (100). pathLength=1 → todo es fracción. */
const ARCO = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

/**
 * Medidor semicircular 0–100 del Reporte Energético.
 * La banda fina de abajo es el semáforo completo (rojo | naranja | verde) y
 * siempre se ve entera: es lo que le da contexto al número. Encima va el arco
 * del puntaje real, con un punto en la punta para poder leerlo de un vistazo.
 */
export default function SemaforoGauge({
  puntaje,
  className = "",
}: {
  puntaje: number;
  className?: string;
}) {
  const fraccion = Math.min(1, Math.max(0, puntaje / 100));
  const nivel = nivelDe(puntaje);
  const angulo = Math.PI * (1 - fraccion);
  const px = CX + R * Math.cos(angulo);
  const py = CY - R * Math.sin(angulo);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 240 132"
        fill="none"
        role="img"
        aria-label={`Puntaje energético ${puntaje} de 100 — ${NIVEL_ETIQUETA[nivel]}`}
        className="w-full"
      >
        {/* Riel completo, apenas insinuado */}
        <path
          d={ARCO}
          stroke="var(--color-outline-variant)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* El semáforo: las tres bandas, siempre visibles */}
        {BANDAS.map((b) => (
          <path
            key={b.nivel}
            d={ARCO}
            pathLength={1}
            stroke={NIVEL_STROKE[b.nivel]}
            strokeWidth="4"
            strokeOpacity="0.35"
            strokeDasharray={`${b.hasta - b.desde} 1`}
            strokeDashoffset={-b.desde}
          />
        ))}

        {/* El puntaje */}
        <path
          d={ARCO}
          pathLength={1}
          stroke={NIVEL_STROKE[nivel]}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset={1 - fraccion}
        />
        <circle cx={px} cy={py} r="10" fill="var(--color-surface)" />
        <circle cx={px} cy={py} r="6" fill={NIVEL_STROKE[nivel]} />
      </svg>

      <div className="absolute inset-x-0 bottom-0 text-center">
        <p
          className={`font-display text-6xl font-medium leading-none sm:text-7xl ${NIVEL_CLASES[nivel].texto}`}
        >
          {puntaje}
        </p>
        <p className="mt-1 text-xs text-on-surface-variant">de 100</p>
      </div>
    </div>
  );
}
