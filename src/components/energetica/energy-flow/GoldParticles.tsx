/**
 * Motas de luz doradas sobre el linework — la traducción de marca del
 * motivo de "energía" (en vez del agua acuarela de la referencia).
 *
 * SVG, no canvas: ~18 nodos animando SOLO opacity/transform (compositor),
 * fluido a 60fps en móviles de gama media. Posiciones y tiempos son
 * deterministas (derivados del índice con el ángulo áureo) — nada de
 * Math.random, para que servidor y cliente rindan idéntico.
 */

const N = 18;

const MOTES = Array.from({ length: N }, (_, i) => {
  const angle = ((i * 137.5) % 360) * (Math.PI / 180);
  const radius = 28 + ((i * 53) % 78);
  return {
    cx: Math.round((120 + radius * Math.cos(angle)) * 100) / 100,
    cy: Math.round((120 + radius * Math.sin(angle)) * 100) / 100,
    r: 1.4 + ((i * 7) % 3) * 0.7,
    blur: i % 6 === 0,
    // Variables que consume el CSS de .energy-flow en globals.css
    stagger: ((i * 29) % 70) / 100, // desfase del fade-in por scroll
    dur: 5.5 + ((i * 11) % 40) / 10, // duración del drift en fase activa
    delay: -(((i * 13) % 60) / 10), // negativo: arranca a mitad de vuelo
    dx: (((i * 17) % 16) - 8) * 1.2,
    dy: -(4 + ((i * 23) % 12)),
  };
});

export default function GoldParticles({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {MOTES.map((m, i) => (
        <circle
          key={i}
          className="mote"
          cx={m.cx}
          cy={m.cy}
          r={m.r}
          fill="url(#grad-oro)"
          filter={m.blur ? "blur(1px)" : undefined}
          style={
            {
              "--stagger": m.stagger,
              "--dur": `${m.dur}s`,
              "--delay": `${m.delay}s`,
              "--dx": `${m.dx}px`,
              "--dy": `${m.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
