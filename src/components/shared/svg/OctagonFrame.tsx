/**
 * Marco geométrico de la portada: dos cuadrados superpuestos (uno rotado
 * 45°) que forman la estrella de ocho puntas, más un octágono interior.
 * Linework fino en gradiente dorado; decorativo, se coloca detrás o
 * alrededor del contenido (garantía, precio).
 */

const CX = 120;
const CY = 120;

function squarePoints(radius: number, rotDeg: number): string {
  return Array.from({ length: 4 }, (_, k) => {
    const a = ((rotDeg + k * 90) * Math.PI) / 180;
    const x = Math.round((CX + radius * Math.cos(a)) * 100) / 100;
    const y = Math.round((CY + radius * Math.sin(a)) * 100) / 100;
    return `${x},${y}`;
  }).join(" ");
}

function octagonPoints(radius: number): string {
  return Array.from({ length: 8 }, (_, k) => {
    const a = ((22.5 + k * 45) * Math.PI) / 180;
    const x = Math.round((CX + radius * Math.cos(a)) * 100) / 100;
    const y = Math.round((CY + radius * Math.sin(a)) * 100) / 100;
    return `${x},${y}`;
  }).join(" ");
}

export default function OctagonFrame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="url(#grad-oro)"
      aria-hidden="true"
      className={className}
    >
      <polygon points={squarePoints(112, 45)} strokeWidth="1" />
      <polygon points={squarePoints(112, 0)} strokeWidth="1" />
      <polygon points={octagonPoints(96)} strokeWidth="0.75" opacity="0.7" />
    </svg>
  );
}
