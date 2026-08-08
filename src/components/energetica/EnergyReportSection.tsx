"use client";

import { useEffect, useRef, useState } from "react";
import CtaButton from "@/components/shared/CtaButton";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import EnergyReportForm from "./EnergyReportForm";
import EnergyReportOverlay from "./EnergyReportOverlay";
import EnergyReveal from "./energy-flow/EnergyReveal";

type Phase = "idle" | "activating" | "form";

const TITLE_ID = "reporte-titulo";
const TITLE = "El Reporte Energético";

/**
 * Sección 4 — El Reporte Energético (captura de lead).
 * Máquina de fases: idle (reveal por scroll + input inline) → activating
 * (el linework cobra vida, ~450ms) → form (takeover a pantalla completa).
 * El intro no se desmonta: queda debajo del takeover y vuelve al cerrarlo.
 * data-state en la raíz alimenta el CSS; --progress lo escribe el hook.
 */
export default function EnergyReportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [ciudad, setCiudad] = useState("");
  const reducedMotion = usePrefersReducedMotion();

  useScrollProgress(sectionRef, !reducedMotion);

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
      ref={sectionRef}
      data-state={phase}
      aria-labelledby={TITLE_ID}
      className="overflow-hidden bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <EnergyReveal className="mx-auto h-64 w-64 sm:h-80 sm:w-80" />

        <div className="report-intro mt-8">
          <SectionEyebrow id={TITLE_ID}>{TITLE}</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium text-on-surface sm:text-4xl lg:text-5xl">
            ¿Qué energía existe realmente en tu hogar?
          </h2>
          <p className="mt-4 text-base text-on-surface-variant sm:text-lg">
            ¿Has verificado alguna vez qué energía habita en tu casa?
          </p>

          <form
            className="mx-auto mt-10 max-w-md"
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
              className="mt-2 w-full border-b border-outline bg-transparent pb-2 text-center font-display text-3xl text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none sm:text-4xl"
            />
            <div className="mt-8">
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
