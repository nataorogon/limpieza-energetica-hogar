import FlowerOfLife from "@/components/shared/svg/FlowerOfLife";
import GoldParticles from "./GoldParticles";

/**
 * La ilustración de energía del Reporte Energético, en tres capas:
 *  1. fol-ghost — el mandala completo, apenas visible (el estado "incompleto")
 *  2. fol-draw — el mismo mandala dibujándose según --progress (scroll)
 *  3. mote     — motas doradas que aparecen con el progreso y, en fase
 *                activa (data-state del ancestro), derivan en bucle.
 * Todo el comportamiento vive en el CSS de .energy-flow (globals.css).
 */
export default function EnergyReveal({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`energy-flow relative ${className}`}>
      <FlowerOfLife
        stroke="currentColor"
        className="fol-ghost absolute inset-0 h-full w-full"
      />
      <FlowerOfLife className="fol-draw relative h-full w-full" />
      <GoldParticles className="absolute inset-0 h-full w-full" />
    </div>
  );
}
