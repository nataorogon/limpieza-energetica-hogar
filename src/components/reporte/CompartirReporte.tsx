"use client";

import { useEffect, useState } from "react";

/**
 * Compartir el reporte con el resto del hogar.
 * Usa el diálogo nativo del sistema cuando existe (móvil) y cae a copiar el
 * link cuando no. La URL se lee en el cliente porque el reporte entero vive en
 * el query string — no hay nada que consultar en el servidor.
 */
export default function CompartirReporte({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!copiado) return;
    const t = setTimeout(() => setCopiado(false), 2500);
    return () => clearTimeout(t);
  }, [copiado]);

  const compartir = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopiado(true);
    } catch {
      // El usuario canceló el diálogo nativo, o el navegador negó el
      // portapapeles: no hay nada que reportar, el link sigue en la barra.
    }
  };

  return (
    <button
      type="button"
      onClick={compartir}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-outline px-6 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      {copiado ? "Link copiado ✓" : "Compartir mi reporte"}
    </button>
  );
}
