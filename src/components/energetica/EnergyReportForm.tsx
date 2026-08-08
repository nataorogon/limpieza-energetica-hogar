"use client";

import { useEffect, useReducer, useRef, type CSSProperties } from "react";
import CtaButton from "@/components/shared/CtaButton";
import HeartLogo from "@/components/shared/svg/HeartLogo";
import {
  isValidCiudad,
  isValidEmail,
  isValidNombre,
  isValidWhatsapp,
} from "@/lib/validation";

type Step = "nombre" | "ciudad" | "email" | "whatsapp";

const STEP_ORDER: Step[] = ["nombre", "ciudad", "email", "whatsapp"];
const CIUDAD_IDX = STEP_ORDER.indexOf("ciudad");

const VALIDATORS: Record<Step, (v: string) => boolean> = {
  nombre: isValidNombre,
  ciudad: isValidCiudad,
  email: isValidEmail,
  whatsapp: isValidWhatsapp,
};

const LABELS: Record<Step, string> = {
  nombre: "Yo soy",
  ciudad: "Yo vivo en",
  email: "Enviar mi reporte a",
  whatsapp: "Enviarme mensajes de conciencia y energéticos a mi WhatsApp",
};

const PLACEHOLDERS: Record<Step, string> = {
  nombre: "Tu Nombre",
  ciudad: "Tu Ciudad",
  email: "correo",
  whatsapp: "número de WhatsApp",
};

/**
 * Escala tipográfica por paso. "nombre"/"ciudad" son la respuesta-titular a
 * pantalla completa; "email" baja porque una dirección larga no cabe a 7xl, y
 * "whatsapp" va degradado (es opcional, y su placeholder es el más largo).
 */
const INPUT_SIZES: Record<Step, string> = {
  nombre: "text-4xl uppercase sm:text-6xl lg:text-7xl",
  ciudad: "text-4xl uppercase sm:text-6xl lg:text-7xl",
  email: "text-2xl sm:text-4xl lg:text-5xl",
  whatsapp: "text-xl sm:text-2xl",
};

const INPUT_TYPES: Record<Step, string> = {
  nombre: "text",
  ciudad: "text",
  email: "email",
  whatsapp: "tel",
};

const AUTOCOMPLETE: Record<Step, string> = {
  nombre: "given-name",
  ciudad: "address-level2",
  email: "email",
  whatsapp: "tel",
};

type Values = Record<Step, string>;

type FormState =
  | { status: "editing"; step: Step; values: Values }
  | { status: "submitted"; values: Values };

type Action =
  | { type: "SET_FIELD"; field: Step; value: string }
  | { type: "SEED_CIUDAD"; value: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SUBMIT" };

function reducer(state: FormState, action: Action): FormState {
  if (state.status === "submitted") return state;
  const idx = STEP_ORDER.indexOf(state.step);
  const currentValid = VALIDATORS[state.step](state.values[state.step]);

  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "SEED_CIUDAD":
      // El input inline de la sección siembra "ciudad" cada vez que se abre
      // el takeover, pero solo mientras no se haya pasado de ese paso:
      // después manda lo que el usuario escribió aquí dentro.
      if (idx > CIUDAD_IDX || state.values.ciudad === action.value) return state;
      return { ...state, values: { ...state.values, ciudad: action.value } };
    case "NEXT":
      // El botón deshabilitado es UX; este guard es el invariante.
      if (!currentValid || idx >= STEP_ORDER.length - 1) return state;
      return { ...state, step: STEP_ORDER[idx + 1] };
    case "PREV":
      if (idx === 0) return state;
      return { ...state, step: STEP_ORDER[idx - 1] };
    case "SUBMIT":
      if (state.step !== "whatsapp" || !currentValid) return state;
      return { status: "submitted", values: state.values };
  }
}

/**
 * Micro-form del Reporte Energético dentro del takeover.
 *
 * Cada pregunta es un panel de 100dvh apilado en .report-track; avanzar solo
 * cambia --step y el CSS traslada el track -100dvh. No es scroll real: no hay
 * listeners, no pelea con el teclado virtual ni con scroll-snap, y la pregunta
 * saliente sigue montada mientras se va (por eso se lee como una superficie
 * continua y no como un carrusel). Los paneles inactivos van `inert`: fuera del
 * orden de tabulación y del árbol de accesibilidad.
 */
export default function EnergyReportForm({
  initialCiudad,
  onDismiss,
}: {
  initialCiudad: string;
  onDismiss: () => void;
}) {
  const [state, dispatch] = useReducer(reducer, {
    status: "editing",
    step: "nombre",
    values: { nombre: "", ciudad: initialCiudad, email: "", whatsapp: "" },
  });

  const inputs = useRef<Partial<Record<Step, HTMLInputElement | null>>>({});
  const activeStep = state.status === "editing" ? state.step : null;

  useEffect(() => {
    dispatch({ type: "SEED_CIUDAD", value: initialCiudad });
  }, [initialCiudad]);

  useEffect(() => {
    if (!activeStep) return;
    // preventScroll: el panel entra por transform; dejar que el navegador
    // "acerque" el input le mete scrollTop al viewport y lo descuadra.
    inputs.current[activeStep]?.focus({ preventScroll: true });
  }, [activeStep]);

  useEffect(() => {
    if (state.status === "submitted") {
      // TODO: POST a la tabla `leads` de Supabase cuando exista el backend
      console.info("[lead — sin backend aún]", state.values);
    }
  }, [state]);

  const idx = activeStep ? STEP_ORDER.indexOf(activeStep) : STEP_ORDER.length;
  const isLast = idx === STEP_ORDER.length - 1;

  return (
    <form
      className="report-viewport"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: isLast ? "SUBMIT" : "NEXT" });
      }}
    >
      <div className="report-track" style={{ "--step": idx } as CSSProperties}>
        {STEP_ORDER.map((s, i) => {
          const active = i === idx;
          const optional = s === "whatsapp";
          const valid = VALIDATORS[s](state.values[s]);
          return (
            <section
              key={s}
              className="report-panel"
              data-active={active || undefined}
              inert={!active}
              aria-label={LABELS[s]}
            >
              <div className="w-full max-w-2xl text-center">
                <label
                  htmlFor={`campo-${s}`}
                  className={
                    optional
                      ? "block text-sm text-on-surface-variant"
                      : "ceremonial-label block text-sm font-semibold text-secondary sm:text-base"
                  }
                >
                  {LABELS[s]}
                  {optional && (
                    <span className="ml-1 text-on-surface-variant">
                      (opcional)
                    </span>
                  )}
                </label>

                <input
                  ref={(el) => {
                    inputs.current[s] = el;
                  }}
                  id={`campo-${s}`}
                  type={INPUT_TYPES[s]}
                  autoComplete={AUTOCOMPLETE[s]}
                  data-autofocus={active || undefined}
                  value={state.values[s]}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: s,
                      value: e.target.value,
                    })
                  }
                  placeholder={`[ ${PLACEHOLDERS[s]} ]`}
                  className={`mt-5 w-full border-b border-outline bg-transparent pb-3 text-center font-display text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none ${INPUT_SIZES[s]}`}
                />

                {optional && (
                  <p className="mt-5 text-xs leading-relaxed text-on-surface-variant">
                    {/* TODO: texto legal definitivo pendiente de Términos & Privacidad reales — no publicar este provisional */}
                    Al dejar tu número aceptas recibir mensajes por WhatsApp. No
                    es una condición de compra y puedes dejar de recibirlos
                    cuando quieras. (Texto legal provisional — Términos &amp;
                    Privacidad próximamente.)
                  </p>
                )}

                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={!valid}
                    className="min-h-11 rounded-full bg-on-surface px-10 py-3 text-sm font-semibold tracking-wide text-surface transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {i === STEP_ORDER.length - 1
                      ? "Enviar mi reporte"
                      : "Siguiente"}
                  </button>
                </div>

                <div className="mt-7 flex items-center justify-center gap-5 text-xs text-on-surface-variant">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "PREV" })}
                      className="min-h-11 rounded-full px-3 transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                      ← Anterior
                    </button>
                  )}
                  <span className="ceremonial-label">
                    {i + 1} / {STEP_ORDER.length}
                  </span>
                </div>
              </div>
            </section>
          );
        })}

        <section
          className="report-panel"
          data-active={state.status === "submitted" || undefined}
          inert={state.status !== "submitted"}
          aria-label="Reporte enviado"
        >
          <div className="w-full max-w-lg text-center">
            <HeartLogo className="mx-auto h-12 w-12" />
            <p className="mt-6 font-display text-3xl font-medium text-on-surface sm:text-4xl">
              Gracias, {state.values.nombre.trim()}.
            </p>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant sm:text-lg">
              Tu Reporte Energético está en camino a{" "}
              {/* break-words, no break-all: un correo que cabe entero no debe
                  partirse a mitad de palabra solo por llenar la línea */}
              <strong className="break-words text-on-surface">
                {state.values.email.trim()}
              </strong>
              .
            </p>
            <p className="mt-6 text-base text-on-surface-variant">
              Mientras llega, descubre el programa completo de 7 días.
            </p>
            <div className="mt-8">
              <CtaButton
                href="#oferta"
                variant="secondary"
                size="lg"
                onClick={onDismiss}
              >
                Conocer el programa
              </CtaButton>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
