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
/** El relevo: donde uno acaba de apagarse y el siguiente empieza a encenderse. */
const BEATS = [0, 0.13, 0.55] as const;

/**
 * desde/hasta de cada texto. Tres reglas gobiernan estos números:
 *
 * 1. SIN ESPERA. El primero empieza a irse en 0.02 —el primer gesto de scroll—,
 *    no después. Antes aguantaba quieto hasta 0.25, que en un riel de 480svh
 *    son ~95svh: un viewport entero sin que pasara nada. Su `desde` es -0.11
 *    (= -rampa) para que ya esté al 100% al llegar.
 *
 * 2. RELEVO EXACTO, SIN SUPERPOSICIÓN. El `desde` de cada uno es el `hasta` del
 *    anterior (0.13 y 0.55). En ese punto ambos valen 0 —un instante, no un
 *    tramo—, así que nunca se ven dos textos encimados y tampoco queda
 *    pantalla vacía. Van apilados en la misma celda: si se cruzaran a media
 *    opacidad serían una mancha ilegible.
 *
 * 3. TODOS ENTRAN DESVANECIDOS. Ninguno aparece de golpe; el que llega sube
 *    desde abajo mientras se enciende.
 *
 * El segundo llega hasta 0.55 y no hasta 0.44 —donde el mandala acaba de
 * cargarse— a propósito: entre 0.44 y 0.55 el mandala se disuelve expandiéndose
 * (--disolucion en globals.css) para que el tercer texto entre sobre fondo
 * limpio. Si el segundo se apagara en 0.44, ese tramo sería pantalla vacía con
 * un mandala desvaneciéndose y nada que leer; así se van juntos, y la
 * disolución es el gesto de cierre de esa frase en vez de un hueco.
 *
 * El último no se apaga: entra en 0.55 y deja ~33% del riel de permanencia
 * para que el formulario se sostenga mientras se sigue bajando.
 */
const VENTANAS = [
  { desde: -0.11, hasta: 0.13 },
  { desde: 0.13, hasta: 0.55 },
  { desde: 0.55, hasta: 99 },
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
          className="report-arte pointer-events-none col-start-1 row-start-1 place-self-center"
        >
          <EnergyReveal className="h-full w-full" />
        </div>
        {/* Aclara el centro del panel, que es donde vive el texto */}
        <div
          aria-hidden="true"
          className="report-scrim col-start-1 row-start-1 h-full w-full"
        />

        {/* Primer tiempo: el puente. Antes aquí solo había un rótulo, y el
            Reporte quedaba preguntando por un problema que nadie había
            nombrado — "Tu casa habla", donde se explica la energía densa,
            ahora va DESPUÉS. Esta frase nombra al enemigo y justifica medir,
            sin agregar sección ni alargar el riel. El rótulo baja a eyebrow. */}
        <div
          style={ventana(0)}
          className="report-beat col-start-1 row-start-1 max-w-3xl place-self-center px-6 text-center"
        >
          <p className="ceremonial-label text-sm font-semibold text-secondary sm:text-base">
            {TITLE}
          </p>
          <p className="mt-6 font-display text-3xl font-medium leading-tight text-on-surface sm:text-5xl lg:text-6xl">
            Toda casa acumula lo que vivió.
            <span className="block text-secondary">La tuya también.</span>
          </p>
        </div>

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
          data-activo={ctaActivo || undefined}
          className="report-beat col-start-1 row-start-1 w-full max-w-xl place-self-center px-6 text-center"
        >
          {/* Mismo tratamiento que el titular anterior: es el tercer tiempo de
              la misma frase, no una nota al pie. */}
          <p className="font-display text-2xl font-medium leading-tight text-on-surface sm:text-4xl">
            ¿Has verificado alguna vez qué energía habita en tu hogar?
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
              <CtaButton
                type="submit"
                variant="secondary"
                size="lg"
                className="report-cta"
              >
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
