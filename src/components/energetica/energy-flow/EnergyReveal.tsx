import FlorVidaEterna from "@/components/shared/svg/FlorVidaEterna";
import GoldParticles from "./GoldParticles";

/**
 * La ilustración de energía del Reporte Energético, en cuatro capas:
 *  1. fol-ghost — la Flor de la Vida completa, apenas insinuada (el estado
 *                 "incompleto"): el dibujo nunca desaparece del todo.
 *  2. fol-draw  — la misma flor, revelándose en círculo según --progress.
 *                 Es un path relleno, así que se descubre con una máscara
 *                 cónica; el mandala anterior era trazo y se "dibujaba" con
 *                 stroke-dashoffset, que aquí no aplica.
 *  3. fol-anillo — la pista y el haz que marcan la carga por fuera de la flor.
 *  4. mote      — motas doradas que aparecen con el progreso y, en fase activa
 *                 (data-state del ancestro), derivan en bucle.
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

      <GoldParticles className="absolute inset-0 h-full w-full" />
    </div>
  );
}
