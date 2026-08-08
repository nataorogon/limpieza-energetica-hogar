import type { Nivel } from "@/lib/reporte";

/**
 * Las clases del semáforo, resueltas en un mapa estático.
 * Tailwind v4 escanea literales: `text-${nivel}` no genera nada, y por eso las
 * tres variantes están escritas completas aquí en vez de interpoladas.
 */
export const NIVEL_CLASES: Record<
  Nivel,
  { texto: string; borde: string; fondo: string; barra: string }
> = {
  verde: {
    texto: "text-success",
    borde: "border-success/40",
    fondo: "bg-success/10",
    barra: "bg-success",
  },
  naranja: {
    texto: "text-warning",
    borde: "border-warning/40",
    fondo: "bg-warning/10",
    barra: "bg-warning",
  },
  rojo: {
    texto: "text-error",
    borde: "border-error/40",
    fondo: "bg-error/10",
    barra: "bg-error",
  },
};

/** Para el SVG del medidor, que pinta con stroke y no con utilidades de fondo. */
export const NIVEL_STROKE: Record<Nivel, string> = {
  verde: "var(--color-success)",
  naranja: "var(--color-warning)",
  rojo: "var(--color-error)",
};

export const NIVEL_ETIQUETA: Record<Nivel, string> = {
  verde: "Rango alto",
  naranja: "Rango intermedio",
  rojo: "Rango bajo",
};
