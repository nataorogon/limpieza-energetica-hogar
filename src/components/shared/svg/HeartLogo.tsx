import Image from "next/image";

/**
 * El logo de Nata Orogon: el corazón de doble trazo en degradado dorado.
 *
 * Es un mapa de bits, no un vector. El archivo original (public/logos) es un
 * SVG que en realidad envuelve un PNG con máscara y pesa 245 KB; aquí se sirve
 * el PNG ya extraído, recortado, con el fondo blanco fuera y reducido a 256px
 * — 30 KB. A los tamaños en que se usa (36–48px) sobra de resolución.
 *
 * La API se mantiene: el llamador manda las clases de tamaño. `object-contain`
 * evita que una clase cuadrada (h-9 w-9) deforme el logo, que es 256×250.
 */
export default function HeartLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logos/logo-nata-orogon.png"
      alt=""
      width={256}
      height={250}
      priority
      className={`object-contain ${className}`}
    />
  );
}
