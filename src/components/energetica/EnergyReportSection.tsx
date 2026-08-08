"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import CtaButton from "@/components/shared/CtaButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import EnergyReportForm from "./EnergyReportForm";
import EnergyReportOverlay from "./EnergyReportOverlay";
import EnergyReveal from "./energy-flow/EnergyReveal";

type Phase = "idle" | "activating" | "form";

const TITLE_ID = "reporte-titulo";
const TITLE = "El Reporte Energético";

/**
 * Dónde arranca cada texto dentro del riel (0..1). El CSS los cruza con una
 * rampa a cada lado, así que entre uno y otro hay un respiro en blanco: eso es
 * lo que hace que la atención caiga sobre una sola frase a la vez.
 */
const BEATS = [0, 0.36, 0.84] as const;

/** desde/hasta de cada texto. El último no se apaga: se queda con el formulario. */
const VENTANAS = [
  { desde: -0.1, hasta: 0.28 },
  { desde: 0.36, hasta: 0.74 },
  { desde: 0.84, hasta: 99 },
];

function ventana(i: number): CSSProperties {
  return {
    "--desde": VENTANAS[i].desde,
    "--hasta": VENTANAS[i].hasta,
  } as CSSProperties;
}

/**
 * Sección 4 — El Reporte Energético (captura de lead).
 *
 * Es un riel de scroll de ~4 viewports con un panel pegado arriba: mientras se
 * baja, la página entera queda ocupada solo por el reporte, el mandala crece y
 * los textos se van relevando de a uno. El último trae el input y el CTA, que
 * abre el takeover a pantalla completa.
 *
 * Todo el movimiento lo resuelve el CSS leyendo --progress (lo escribe el hook
 * por rAF); React solo maneja la máquina de fases del takeover.
 */
export default function EnergyReportSection() {
  const rielRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [beat, setBeat] = useState(0);
  const [ciudad, setCiudad] = useState("");
  const reducedMotion = usePrefersReducedMotion();

  useScrollProgress(rielRef, BEATS, setBeat, !reducedMotion);
  /** El CTA solo existe para el teclado y el ratón cuando su beat manda. */
  const ctaActivo = beat === BEATS.length - 1;

  useEffect(() => {
    if (phase !== "activating") return;
    const t = setTimeout(() => setPhase("form"), 450);
    return () => clearTimeout(t);
  }, [phase]);

  const activate = () => {
    if (phase !== "idle") return;
    setPhase(reducedMotion ? "form" : "activating");
  };

  return (
    <section
      id="reporte"
      ref={rielRef}
      data-state={phase}
      aria-labelledby={TITLE_ID}
      className="report-riel relative bg-surface"
    >
      <div className="report-pin">
        {/* Capa de arte — crece con el scroll pero SIEMPRE completa: el tamaño
            base se limita al viewport, así que el mandala nunca se recorta. */}
        <div
          aria-hidden="true"
          className="report-arte col-start-1 row-start-1 place-self-center"
        >
          <EnergyReveal className="h-full w-full" />
        </div>
        {/* Aclara el centro del panel, que es donde vive el texto */}
        <div
          aria-hidden="true"
          className="report-scrim col-start-1 row-start-1 h-full w-full"
        />

        <p
          style={ventana(0)}
          className="report-beat ceremonial-label col-start-1 row-start-1 place-self-center px-6 text-center text-2xl font-semibold text-secondary sm:text-4xl"
        >
          {TITLE}
        </p>

        <h2
          id={TITLE_ID}
          style={ventana(1)}
          className="report-beat col-start-1 row-start-1 max-w-3xl place-self-center px-6 text-center font-display text-3xl font-medium text-on-surface sm:text-5xl lg:text-6xl"
        >
          ¿Qué energía existe realmente en tu hogar?
        </h2>

        <div
          style={ventana(2)}
          inert={!ctaActivo}
          className={`report-beat col-start-1 row-start-1 w-full max-w-xl place-self-center px-6 text-center ${
            ctaActivo ? "pointer-events-auto" : ""
          }`}
        >
          <p className="text-base text-on-surface-variant sm:text-xl">
            ¿Has verificado alguna vez qué energía habita en tu casa?
          </p>
          <form
            className="mt-10"
            onSubmit={(e) => {
              e.preventDefault();
              activate();
            }}
          >
            <label
              htmlFor="ciudad-inline"
              className="ceremonial-label block text-sm font-semibold text-secondary"
            >
              Yo vivo en
            </label>
            <input
              id="ciudad-inline"
              type="text"
              autoComplete="address-level2"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="[ Tu Ciudad ]"
              className="mt-3 w-full border-b border-outline bg-transparent pb-2 text-center font-display text-3xl text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none sm:text-5xl"
            />
            <div className="mt-10">
              <CtaButton type="submit" variant="secondary" size="lg">
                Conocer mi energía
              </CtaButton>
            </div>
          </form>
        </div>
      </div>

      <EnergyReportOverlay
        open={phase === "form"}
        onClose={() => setPhase("idle")}
        titleId="reporte-takeover-titulo"
        title={TITLE}
      >
        {({ close }) => (
          <EnergyReportForm initialCiudad={ciudad} onDismiss={close} />
        )}
      </EnergyReportOverlay>
    </section>
  );
}
