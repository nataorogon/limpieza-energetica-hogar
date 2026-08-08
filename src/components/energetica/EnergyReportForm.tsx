"use client";

import { useEffect, useReducer, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { MODULOS, type Modulo } from "@/lib/modulos";
import {
  construirUrlReporte,
  RESPUESTAS_VACIAS,
  type Respuestas,
} from "@/lib/reporte";
import {
  isValidCiudad,
  isValidEmail,
  isValidNombre,
  isValidWhatsapp,
} from "@/lib/validation";

type Campo = "nombre" | "ciudad" | "email" | "whatsapp";

const CAMPOS: Campo[] = ["nombre", "ciudad", "email", "whatsapp"];

const VALIDATORS: Record<Campo, (v: string) => boolean> = {
  nombre: isValidNombre,
  ciudad: isValidCiudad,
  email: isValidEmail,
  whatsapp: isValidWhatsapp,
};

const LABELS: Record<Campo, string> = {
  nombre: "Yo soy",
  ciudad: "Yo vivo en",
  email: "Enviar mi reporte a",
  whatsapp: "Enviarme mensajes de conciencia y energéticos a mi WhatsApp",
};

const PLACEHOLDERS: Record<Campo, string> = {
  nombre: "Tu Nombre",
  ciudad: "Tu Ciudad",
  email: "correo",
  whatsapp: "número de WhatsApp",
};

/**
 * Escala tipográfica por campo. "nombre"/"ciudad" son la respuesta-titular a
 * pantalla completa; "email" baja porque una dirección larga no cabe a 7xl, y
 * "whatsapp" va degradado (es opcional, y su placeholder es el más largo).
 */
const INPUT_SIZES: Record<Campo, string> = {
  nombre: "text-4xl uppercase sm:text-6xl lg:text-7xl",
  ciudad: "text-4xl uppercase sm:text-6xl lg:text-7xl",
  email: "text-2xl sm:text-4xl lg:text-5xl",
  whatsapp: "text-xl sm:text-2xl",
};

const INPUT_TYPES: Record<Campo, string> = {
  nombre: "text",
  ciudad: "text",
  email: "email",
  whatsapp: "tel",
};

const AUTOCOMPLETE: Record<Campo, string> = {
  nombre: "given-name",
  ciudad: "address-level2",
  email: "email",
  whatsapp: "tel",
};

/**
 * El recorrido completo: primero el diagnóstico, después los datos.
 * Ese orden importa — pedir el correo antes de haber entregado nada convierte
 * peor, y las 7 preguntas son justamente lo que da valor al reporte.
 */
type Paso =
  | { kind: "modulo"; modulo: Modulo }
  | { kind: "campo"; campo: Campo };

const PASOS: Paso[] = [
  ...MODULOS.map((modulo): Paso => ({ kind: "modulo", modulo })),
  ...CAMPOS.map((campo): Paso => ({ kind: "campo", campo })),
];

const CIUDAD_IDX = PASOS.findIndex(
  (p) => p.kind === "campo" && p.campo === "ciudad",
);

type Valores = Record<Campo, string>;

type FormState = {
  indice: number;
  valores: Valores;
  respuestas: Respuestas;
  /** Tras el envío: la navegación al reporte está en curso. */
  enviando: boolean;
};

type Action =
  | { type: "SET_CAMPO"; campo: Campo; valor: string }
  | { type: "SEED_CIUDAD"; valor: string }
  | { type: "TOGGLE_SENAL"; modulo: Modulo["id"]; bit: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "ENVIAR" };

/** Un paso de módulo siempre es válido: no marcar nada es una respuesta. */
function pasoValido(state: FormState, indice: number): boolean {
  const paso = PASOS[indice];
  if (paso.kind === "modulo") return true;
  return VALIDATORS[paso.campo](state.valores[paso.campo]);
}

function reducer(state: FormState, action: Action): FormState {
  if (state.enviando) return state;

  switch (action.type) {
    case "SET_CAMPO":
      return {
        ...state,
        valores: { ...state.valores, [action.campo]: action.valor },
      };
    case "SEED_CIUDAD":
      // El input inline de la sección siembra "ciudad" cada vez que se abre el
      // takeover, pero solo mientras no se haya pasado de ese paso: después
      // manda lo que la persona escribió aquí dentro.
      if (state.indice > CIUDAD_IDX || state.valores.ciudad === action.valor) {
        return state;
      }
      return { ...state, valores: { ...state.valores, ciudad: action.valor } };
    case "TOGGLE_SENAL":
      return {
        ...state,
        respuestas: {
          ...state.respuestas,
          [action.modulo]: state.respuestas[action.modulo] ^ (1 << action.bit),
        },
      };
    case "NEXT":
      // El botón deshabilitado es UX; este guard es el invariante.
      if (!pasoValido(state, state.indice)) return state;
      if (state.indice >= PASOS.length - 1) return state;
      return { ...state, indice: state.indice + 1 };
    case "PREV":
      if (state.indice === 0) return state;
      return { ...state, indice: state.indice - 1 };
    case "ENVIAR":
      if (state.indice !== PASOS.length - 1) return state;
      if (!pasoValido(state, state.indice)) return state;
      return { ...state, enviando: true };
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
 *
 * Al enviar navega a /reporte con todo el resultado en el query string, que es
 * lo que hace el reporte compartible con el resto del hogar.
 */
export default function EnergyReportForm({
  initialCiudad,
  onDismiss,
}: {
  initialCiudad: string;
  onDismiss: () => void;
}) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    indice: 0,
    valores: { nombre: "", ciudad: initialCiudad, email: "", whatsapp: "" },
    respuestas: { ...RESPUESTAS_VACIAS },
    enviando: false,
  });

  /** El control principal de cada panel, para devolverle el foco al avanzar. */
  const controles = useRef<Record<number, HTMLElement | null>>({});
  const { indice, enviando } = state;

  useEffect(() => {
    dispatch({ type: "SEED_CIUDAD", valor: initialCiudad });
  }, [initialCiudad]);

  useEffect(() => {
    if (enviando) return;
    // preventScroll: el panel entra por transform; dejar que el navegador
    // "acerque" el control le mete scrollTop al viewport y lo descuadra.
    controles.current[indice]?.focus({ preventScroll: true });
  }, [indice, enviando]);

  const esUltimo = indice === PASOS.length - 1;
  const valido = pasoValido(state, indice);
  /** El panel de "preparando" vive al final del track. */
  const panelActivo = enviando ? PASOS.length : indice;

  const enviar = () => {
    if (!valido) return;
    dispatch({ type: "ENVIAR" });
    // TODO: POST a la tabla `leads` de Supabase cuando exista el backend
    console.info("[lead — sin backend aún]", state.valores, state.respuestas);
    router.push(
      construirUrlReporte({
        nombre: state.valores.nombre,
        ciudad: state.valores.ciudad,
        respuestas: state.respuestas,
      }),
    );
  };

  return (
    <form
      className="report-viewport"
      onSubmit={(e) => {
        e.preventDefault();
        if (esUltimo) enviar();
        else dispatch({ type: "NEXT" });
      }}
    >
      <div
        className="report-track"
        style={{ "--step": panelActivo } as CSSProperties}
      >
        {PASOS.map((paso, i) => {
          const activo = i === panelActivo;
          const ultimo = i === PASOS.length - 1;
          return (
            <section
              key={paso.kind === "modulo" ? paso.modulo.id : paso.campo}
              className="report-panel"
              data-active={activo || undefined}
              inert={!activo}
              aria-label={
                paso.kind === "modulo" ? paso.modulo.tema : LABELS[paso.campo]
              }
            >
              <div className="w-full max-w-2xl text-center">
                {paso.kind === "modulo" ? (
                  <PanelModulo
                    modulo={paso.modulo}
                    mascara={state.respuestas[paso.modulo.id]}
                    activo={activo}
                    onToggle={(bit) =>
                      dispatch({
                        type: "TOGGLE_SENAL",
                        modulo: paso.modulo.id,
                        bit,
                      })
                    }
                    registrar={(el) => {
                      controles.current[i] = el;
                    }}
                  />
                ) : (
                  <PanelCampo
                    campo={paso.campo}
                    valor={state.valores[paso.campo]}
                    activo={activo}
                    onChange={(valor) =>
                      dispatch({ type: "SET_CAMPO", campo: paso.campo, valor })
                    }
                    registrar={(el) => {
                      controles.current[i] = el;
                    }}
                  />
                )}

                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={!pasoValido(state, i)}
                    className="min-h-11 rounded-full bg-on-surface px-10 py-3 text-sm font-semibold tracking-wide text-surface transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {ultimo ? "Ver mi reporte" : "Siguiente"}
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
                    {i + 1} / {PASOS.length}
                  </span>
                </div>
              </div>
            </section>
          );
        })}

        <section
          className="report-panel"
          data-active={enviando || undefined}
          inert={!enviando}
          aria-label="Preparando tu reporte"
        >
          <div className="w-full max-w-lg text-center">
            <p className="ceremonial-label text-sm font-semibold text-secondary">
              Un momento
            </p>
            <p className="mt-6 font-display text-3xl font-medium text-on-surface sm:text-4xl">
              Estamos leyendo la energía de tu hogar…
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="mt-10 min-h-11 rounded-full px-4 text-sm text-on-surface-variant underline transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Cerrar
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}

/** Un paso de diagnóstico: 3 señales, marcar las que resuenen (o ninguna). */
function PanelModulo({
  modulo,
  mascara,
  activo,
  onToggle,
  registrar,
}: {
  modulo: Modulo;
  mascara: number;
  activo: boolean;
  onToggle: (bit: number) => void;
  registrar: (el: HTMLElement | null) => void;
}) {
  return (
    <>
      <p className="ceremonial-label text-sm font-semibold text-secondary sm:text-base">
        {modulo.tema}
      </p>
      <h2 className="mt-4 font-display text-2xl font-medium text-on-surface sm:text-4xl">
        {modulo.pregunta}
      </h2>

      <div className="mt-8 space-y-3 text-left">
        {modulo.senales.map((senal, bit) => {
          const marcada = Boolean((mascara >> bit) & 1);
          return (
            <label
              key={senal.id}
              className={`flex cursor-pointer items-start gap-4 rounded-2xl border px-5 py-4 transition-colors ${
                marcada
                  ? "border-secondary bg-secondary-container/60"
                  : "border-outline-variant hover:border-outline"
              }`}
            >
              <input
                type="checkbox"
                ref={bit === 0 ? registrar : undefined}
                data-autofocus={(activo && bit === 0) || undefined}
                checked={marcada}
                onChange={() => onToggle(bit)}
                className="mt-1 h-5 w-5 shrink-0 accent-secondary"
              />
              <span className="text-base leading-relaxed text-on-surface sm:text-lg">
                {senal.texto}
              </span>
            </label>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-on-surface-variant">
        Marca las que reconozcas. Si ninguna te resuena, continúa sin marcar.
      </p>
    </>
  );
}

/** Un paso de contacto: la respuesta-titular a pantalla completa. */
function PanelCampo({
  campo,
  valor,
  activo,
  onChange,
  registrar,
}: {
  campo: Campo;
  valor: string;
  activo: boolean;
  onChange: (valor: string) => void;
  registrar: (el: HTMLElement | null) => void;
}) {
  const opcional = campo === "whatsapp";
  return (
    <>
      <label
        htmlFor={`campo-${campo}`}
        className={
          opcional
            ? "block text-sm text-on-surface-variant"
            : "ceremonial-label block text-sm font-semibold text-secondary sm:text-base"
        }
      >
        {LABELS[campo]}
        {opcional && (
          <span className="ml-1 text-on-surface-variant">(opcional)</span>
        )}
      </label>

      <input
        ref={registrar}
        id={`campo-${campo}`}
        type={INPUT_TYPES[campo]}
        autoComplete={AUTOCOMPLETE[campo]}
        data-autofocus={activo || undefined}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`[ ${PLACEHOLDERS[campo]} ]`}
        className={`mt-5 w-full border-b border-outline bg-transparent pb-3 text-center font-display text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none ${INPUT_SIZES[campo]}`}
      />

      {opcional && (
        <p className="mt-5 text-xs leading-relaxed text-on-surface-variant">
          {/* TODO: texto legal definitivo pendiente de Términos & Privacidad reales — no publicar este provisional */}
          Al dejar tu número aceptas recibir mensajes por WhatsApp. No es una
          condición de compra y puedes dejar de recibirlos cuando quieras.
          (Texto legal provisional — Términos &amp; Privacidad próximamente.)
        </p>
      )}
    </>
  );
}
