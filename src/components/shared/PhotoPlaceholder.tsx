/**
 * Slot claramente marcado para una foto real pendiente.
 * Cuando llegue el asset: reemplazar por <Image> de next/image con el
 * mismo aspect ratio (y variantes por breakpoint si el arte lo pide).
 */
export default function PhotoPlaceholder({
  label,
  aspect = "4/5",
  className = "",
}: {
  /** Descripción de la foto pendiente, se muestra dentro del marco. */
  label: string;
  /** Aspect ratio CSS, p. ej. "4/5" o "16/9". */
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Foto pendiente: ${label}`}
      style={{ aspectRatio: aspect }}
      className={`flex w-full items-center justify-center rounded-lg border-2 border-dashed border-outline bg-surface-variant p-6 ${className}`}
    >
      <p className="max-w-xs text-center text-sm text-on-surface-variant">
        <span className="ceremonial-label block text-xs font-semibold text-secondary">
          Foto pendiente
        </span>
        <span className="mt-2 block">[ {label} ]</span>
      </p>
    </div>
  );
}
