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
const TITLE = "Recibe tu Reporte Energético";
/** Una sola fuente: el placeholder real y la copia invisible que sitúa el caret
 *  tienen que medir lo mismo, o el caret se descoloca. */
const PLACEHOLDER_CIUDAD = "[ Tu Ciudad ]";

/**
 * Dónde arranca cada texto dentro del riel (0..1). El CSS los cruza con una
 * rampa a cada lado, así que entre uno y otro hay un respiro en blanco: eso es
 * lo que hace que la atención caiga sobre una sola frase a la vez.
 */
/** El relevo: donde uno acaba de apagarse y el siguiente empieza a encenderse. */
const BEATS = [0, 0.217, 0.909] as const;

/**
 * desde/hasta/rampa de cada texto. El riel se reparte 8:2:1 —carga del mandala,
 * disolución, entrada del formulario— y cuatro reglas gobiernan estos números:
 *
 * 1. SIN ESPERA. El primero empieza a irse en 0.034 —el primer gesto de scroll—,
 *    no después. Antes aguantaba quieto hasta 0.25: un viewport entero sin que
 *    pasara nada. Su `desde` es -rampa para que ya esté al 100% al llegar.
 *
 * 2. RELEVO EXACTO, SIN SUPERPOSICIÓN. El `desde` de cada uno es el `hasta` del
 *    anterior (0.217 y 0.909). En ese punto ambos valen 0 —un instante, no un
 *    tramo—, así que nunca se ven dos textos encimados y tampoco queda
 *    pantalla vacía. Van apilados en la misma celda: si se cruzaran a media
 *    opacidad serían una mancha ilegible.
 *
 * 3. TODOS ENTRAN DESVANECIDOS. Ninguno aparece de golpe; el que llega sube
 *    desde abajo mientras se enciende.
 *
 * 4. RAMPA PROPIA POR BEAT. Los dos primeros usan 0.183; el tercero, 0.085 —menos
 *    de la mitad—. En su tramo lo único que se mueve es él (el mandala ya se
 *    fue), y estirarlo obligaba a seguir bajando sin nada que lo justificara: se
 *    sentía como que el scroll no respondía. Entra rápido y el riel termina.
 *    0.085 y no 0.091 (= 1 - 0.909) para que acabe de entrar unos píxeles ANTES
 *    del final del riel y no justo en el último, donde --progress solo llega a 1
 *    en el píxel exacto del fondo.
 *
 * El segundo llega hasta 0.909 y no hasta 0.726 —donde el mandala acaba de
 * cargarse— a propósito: entre esos dos puntos el mandala se disuelve
 * expandiéndose (--disolucion en globals.css) para que el tercer texto entre
 * sobre fondo limpio. Si el segundo se apagara en 0.726, ese tramo sería
 * pantalla vacía con un mandala desvaneciéndose y nada que leer; así se van
 * juntos, y la disolución es el gesto de cierre de esa frase en vez de un hueco.
 *
 * El último no se apaga y termina de entrar justo en 1, que es donde el panel
 * deja de estar pegado: el formulario acaba de formarse y el riel lo suelta.
 */
const VENTANAS = [
  { desde: -0.183, hasta: 0.217, rampa: 0.183 },
  { desde: 0.217, hasta: 0.909, rampa: 0.183 },
  { desde: 0.909, hasta: 99, rampa: 0.085 },
];

function ventana(i: number): CSSProperties {
  return {
    "--desde": VENTANAS[i].desde,
    "--hasta": VENTANAS[i].hasta,
    "--rampa": VENTANAS[i].rampa,
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
            Sabías que toda casa acumula lo que vivió.
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
            {/* El campo va centrado y vacío, y sin foco el navegador no dibuja
                caret: se leía como un rótulo más, no como algo donde escribir.
                Debajo del input va un caret decorativo que titila, y que se
                apaga solo (CSS, ver .pista-ciudad) en cuanto hay foco —ahí manda
                el caret de verdad— o ya hay texto escrito. */}
            <div className="relative mt-3">
              <input
                id="ciudad-inline"
                type="text"
                autoComplete="address-level2"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                placeholder={PLACEHOLDER_CIUDAD}
                className="campo-ciudad w-full border-b border-outline bg-transparent pb-2 text-center font-display text-3xl text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none sm:text-5xl"
              />
              {/* La copia invisible del placeholder no es un adorno: se centra
                  igual que el de verdad —misma cadena, misma tipografía, mismo
                  centrado—, así que colgando el caret de su borde izquierdo cae
                  exactamente delante del texto sin medir nada en JS, y sigue
                  cayendo bien si cambia la fuente o el copy. */}
              <span
                aria-hidden="true"
                className="pista-ciudad pointer-events-none absolute inset-0 flex items-center justify-center pb-2 font-display text-3xl sm:text-5xl"
              >
                <span className="relative">
                  <span className="opacity-0">{PLACEHOLDER_CIUDAD}</span>
                  <span className="pista-cursor absolute right-full top-1/2 mr-[0.18em] h-[1em] w-[2px] -translate-y-1/2 rounded-full bg-secondary" />
                </span>
              </span>
            </div>
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
