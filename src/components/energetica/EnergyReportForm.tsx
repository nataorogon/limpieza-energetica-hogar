"use client";

import { useEffect, useReducer, useRef } from "react";
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

type Values = Record<Step, string>;

type FormState =
  | { status: "editing"; step: Step; values: Values }
  | { status: "submitted"; values: Values };

type Action =
  | { type: "SET_FIELD"; field: Step; value: string }
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

export default function EnergyReportForm({
  initialCiudad,
}: {
  initialCiudad: string;
}) {
  const [state, dispatch] = useReducer(reducer, {
    status: "editing",
    step: "nombre",
    values: { nombre: "", ciudad: initialCiudad, email: "", whatsapp: "" },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const activeStep = state.status === "editing" ? state.step : null;

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeStep]);

  useEffect(() => {
    if (state.status === "submitted") {
      // TODO: POST a la tabla `leads` de Supabase cuando exista el backend
      console.info("[lead — sin backend aún]", state.values);
    }
  }, [state]);

  if (state.status === "submitted") {
    return (
      <div className="report-form-enter mx-auto max-w-lg text-center">
        <HeartLogo className="mx-auto h-12 w-12" />
        <p className="mt-6 font-display text-2xl font-medium text-on-surface sm:text-3xl">
          Gracias, {state.values.nombre.trim()}.
        </p>
        <p className="mt-3 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          Tu Reporte Energético está en camino a{" "}
          <strong className="text-on-surface">
            {state.values.email.trim()}
          </strong>
          .
        </p>
        <p className="mt-6 text-base text-on-surface-variant">
          Mientras llega, descubre el programa completo de 7 días.
        </p>
        <div className="mt-6">
          <CtaButton href="#oferta" variant="secondary" size="lg">
            Conocer el programa
          </CtaButton>
        </div>
      </div>
    );
  }

  const { step, values } = state;
  const idx = STEP_ORDER.indexOf(step);
  const isLast = idx === STEP_ORDER.length - 1;
  const currentValid = VALIDATORS[step](values[step]);

  return (
    <form
      className="report-form-enter mx-auto max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: isLast ? "SUBMIT" : "NEXT" });
      }}
    >
      <ol className="space-y-7">
        {STEP_ORDER.slice(0, idx + 1).map((s) => {
          const active = s === step;
          const demoted = s === "whatsapp";
          return (
            <li key={s}>
              <label
                htmlFor={active ? `campo-${s}` : undefined}
                className={
                  demoted
                    ? "block text-sm text-on-surface-variant"
                    : "ceremonial-label block text-sm font-semibold text-secondary"
                }
              >
                {LABELS[s]}
                {demoted && (
                  <span className="ml-1 text-on-surface-variant">
                    (opcional)
                  </span>
                )}
              </label>
              {active ? (
                <input
                  ref={inputRef}
                  id={`campo-${s}`}
                  type={
                    s === "email" ? "email" : s === "whatsapp" ? "tel" : "text"
                  }
                  autoComplete={
                    s === "nombre"
                      ? "given-name"
                      : s === "email"
                        ? "email"
                        : s === "whatsapp"
                          ? "tel"
                          : "address-level2"
                  }
                  value={values[s]}
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: s, value: e.target.value })
                  }
                  placeholder={`[ ${PLACEHOLDERS[s]} ]`}
                  className={`mt-2 w-full border-b bg-transparent pb-2 font-display focus:outline-none ${
                    demoted
                      ? "border-outline-variant text-xl text-on-surface placeholder:text-outline"
                      : "border-outline text-3xl text-on-surface placeholder:text-outline sm:text-4xl"
                  } focus:border-secondary`}
                />
              ) : (
                <p
                  className={`mt-2 break-all font-display uppercase text-on-surface ${
                    demoted
                      ? "text-xl"
                      : s === "email"
                        ? "text-2xl sm:text-3xl"
                        : "text-3xl sm:text-4xl"
                  }`}
                >
                  {values[s].trim()}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {step === "whatsapp" && (
        <p className="mt-5 text-xs leading-relaxed text-on-surface-variant">
          {/* TODO: texto legal definitivo pendiente de Términos & Privacidad reales — no publicar este provisional */}
          Al dejar tu número aceptas recibir mensajes por WhatsApp. No es una
          condición de compra y puedes dejar de recibirlos cuando quieras.
          (Texto legal provisional — Términos &amp; Privacidad próximamente.)
        </p>
      )}

      <div className="mt-9 flex items-center justify-between gap-4">
        {idx > 0 ? (
          <button
            type="button"
            onClick={() => dispatch({ type: "PREV" })}
            className="min-h-11 rounded-full px-5 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            ← Anterior
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={!currentValid}
          className="min-h-11 rounded-full bg-on-surface px-8 py-2.5 text-sm font-semibold tracking-wide text-surface transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-35"
        >
          {isLast ? "Enviar mi reporte" : "Siguiente →"}
        </button>
      </div>
    </form>
  );
}
