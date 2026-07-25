/**
 * El corazón de doble trazo de Nata Orogon: un trazo dibuja el contorno
 * del corazón, un segundo trazo desplazado lo repite como un ala/pétalo.
 * Linework abierto, nunca relleno; trazo en gradiente dorado (grad-oro,
 * definido en SvgDefs). Requiere <SvgDefs /> montado en el layout.
 */
export default function HeartLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Trazo principal: contorno del corazón, abierto en la punta */}
      <path
        d="M31 55C15 42 8.5 31 11.5 21.5 14 13.5 24.5 11.5 30 19c.8 1.1 1.5 2.3 2 3.6.5-1.3 1.2-2.5 2-3.6 5.5-7.5 16-5.5 18.5 2.5 2.4 7.6-1.3 16.4-11.7 26.1"
        stroke="url(#grad-oro)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Eco/ala: el mismo gesto, desplazado y más liviano */}
      <path
        d="M33.5 58.5C20 47.5 13 36 16 26c1.9-6.3 8.6-8.9 14-6"
        stroke="url(#grad-oro)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
