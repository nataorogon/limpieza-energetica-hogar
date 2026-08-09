import FlorVidaEterna from "@/components/shared/svg/FlorVidaEterna";

/**
 * La ilustración de energía del riel del Reporte Energético, en tres capas:
 *  1. fol-ghost — la Flor de la Vida completa, apenas insinuada (el estado
 *                 "incompleto"): el dibujo nunca desaparece del todo.
 *  2. fol-draw  — la misma flor, revelándose en círculo según --progress.
 *                 Es un path relleno, así que se descubre con una máscara
 *                 cónica; el mandala anterior era trazo y se "dibujaba" con
 *                 stroke-dashoffset, que aquí no aplica.
 *  3. fol-anillo — la pista y el haz que marcan la carga por fuera de la flor.
 *
 * Esto vive SOLO en el riel: es el medidor que se llena con el scroll. Dentro
 * del cuestionario no aparece —ahí el fondo son únicamente las motas (ver
 * GoldParticles)—, porque una flor completa y detenida detrás de 10 preguntas
 * no aporta nada y compite con la pregunta.
 * Todo el comportamiento vive en el CSS de .energy-flow (globals.css).
 */
export default function EnergyReveal({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`energy-flow relative ${className}`}>
      <FlorVidaEterna className="fol-ghost absolute inset-0 h-full w-full" />
      <FlorVidaEterna className="fol-draw absolute inset-0 h-full w-full" />

      {/* El haz: pista tenue + halo + núcleo, justo por fuera de la flor
          (la flor llega a r≈110 dentro de este viewBox de 240). */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        stroke="url(#grad-oro)"
        aria-hidden="true"
        className="fol-anillo absolute inset-0 h-full w-full"
      >
        <circle cx="120" cy="120" r="116" className="fol-pista" pathLength={1} />
        <g className="fol-haz">
          <circle
            cx="120"
            cy="120"
            r="116"
            className="fol-haz-halo"
            pathLength={1}
            filter="blur(2.5px)"
          />
          <circle
            cx="120"
            cy="120"
            r="116"
            className="fol-haz-nucleo"
            pathLength={1}
          />
        </g>
      </svg>
    </div>
  );
}
