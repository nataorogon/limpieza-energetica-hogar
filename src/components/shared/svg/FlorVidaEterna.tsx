/**
 * La Flor de la Vida de la marca (public/logos/flor-vida-eterna.svg).
 *
 * Va como <img> y no inline: el dibujo es un solo path de ~74 KB y meterlo en
 * el bundle de JS lo cargaría en cada página. Como archivo estático se cachea
 * una vez y no pesa en el JS. Tampoco pasa por next/image: los SVG no se
 * optimizan y habría que abrir `dangerouslyAllowSVG`.
 *
 * Es un RELLENO, no trazos. Por eso el revelado por scroll se hace con una
 * máscara cónica en globals.css y no con stroke-dashoffset como el mandala
 * dibujado a mano que reemplaza.
 */
export default function FlorVidaEterna({
  className = "",
}: {
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG decorativo: next/image no optimiza SVG
    <img
      src="/logos/flor-vida-eterna.svg"
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}
