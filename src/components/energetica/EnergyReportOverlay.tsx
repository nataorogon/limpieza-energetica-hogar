"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import GoldParticles from "./energy-flow/GoldParticles";

/**
 * Takeover a pantalla completa del Reporte Energético.
 *
 * Es un <dialog> abierto con showModal(): el top layer del navegador nos da
 * gratis foco atrapado, Escape, inert sobre el resto de la página y z-index
 * irrelevante (el header sticky es z-50 y no hay que pelearse con él; el
 * overflow-hidden de la sección tampoco recorta el top layer).
 *
 * Lo único que hay que orquestar a mano es la salida: dialog.close() es
 * inmediato, así que marcamos data-closing, dejamos correr el keyframe y
 * avisamos al padre en animationend.
 *
 * children es función para poder entregar `close` (el cierre animado) al
 * contenido — el CTA final del formulario necesita cerrar el takeover.
 */
export default function EnergyReportOverlay({
  open,
  onClose,
  titleId,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  children: (api: { close: () => void }) => React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      // showModal() enfoca el primer foco disponible (sería la ✕). El panel
      // activo se marca a sí mismo y manda.
      el.querySelector<HTMLElement>("[data-autofocus]")?.focus({
        preventScroll: true,
      });
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // showModal() bloquea la interacción de fondo pero no la rueda del ratón.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = useCallback(() => {
    if (reducedMotion) onClose();
    else setClosing(true);
  }, [reducedMotion, onClose]);

  const finishClose = useCallback(() => {
    setClosing(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!closing) return;
    // Red de seguridad: si animationend no llega (keyframe cancelado, pestaña
    // en segundo plano…) el modal no puede quedarse abierto e invisible —
    // sería la página entera inutilizable, con el scroll del body bloqueado.
    const t = setTimeout(finishClose, 600);
    return () => clearTimeout(t);
  }, [closing, finishClose]);

  return (
    <dialog
      ref={ref}
      className="report-takeover"
      data-state="form"
      data-closing={closing || undefined}
      aria-labelledby={titleId}
      onCancel={(e) => {
        // Escape también pasa por la animación de salida
        e.preventDefault();
        close();
      }}
      onAnimationEnd={(e) => {
        if (!closing || e.target !== ref.current) return;
        finishClose();
      }}
    >
      {/* Capa de arte: SOLO motas derivando. Ni flor ni haz — esos son el
          medidor del riel, y aquí ya cumplieron. Detenidos detrás de 10
          preguntas eran ruido: un dibujo grande que compite con la pregunta y
          que, una vez completo, no comunica nada. Las motas sí: son movimiento
          lento y sin meta, que es la sensación que queremos mientras se
          responde. Van más opacas que antes (0.7) porque ahora no se apoyan en
          el linework; el scrim radial sigue despejando el centro. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center opacity-70"
      >
        <GoldParticles className="h-[min(92vw,84dvh)] w-[min(92vw,84dvh)]" />
      </div>
      <div aria-hidden="true" className="report-scrim absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6">
        <SectionEyebrow id={titleId}>{title}</SectionEyebrow>
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar el reporte"
          className="pointer-events-auto -mt-2 flex min-h-11 min-w-11 items-center justify-center rounded-full text-xl leading-none text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {children({ close })}
    </dialog>
  );
}
