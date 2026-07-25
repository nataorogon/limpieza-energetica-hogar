/**
 * Definiciones SVG globales (renderizar UNA vez en el layout).
 * `grad-oro` es el gradiente dorado de marca (#A9762F → #D4A94A, 135°):
 * todos los SVG de linework lo referencian con stroke="url(#grad-oro)".
 * No usar display:none (Safari no resuelve defs ocultos así).
 */
export default function SvgDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
      <defs>
        <linearGradient id="grad-oro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A9762F" />
          <stop offset="100%" stopColor="#D4A94A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
