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
type Valores = Record<Campo, string>;

/**
 * Las tres líneas del cierre. Se acumulan en pantalla como una frase que la
 * persona va completando —igual que la referencia— en vez de reemplazarse.
 * La última junta correo y WhatsApp en UNA sola pantalla: son el mismo gesto
 * ("cómo te lo mando"), y separarlos añadía un paso que nadie quiere dar.
 */
const LINEAS = [
  { campo: "nombre" as const, label: "Yo soy", placeholder: "Tu Nombre" },
  { campo: "ciudad" as const, label: "Yo vivo en", placeholder: "Tu Ciudad" },
  {
    campo: "email" as const,
    label: "Enviar mi reporte a",
    placeholder: "tu correo",
  },
];

const N_MODULOS = MODULOS.length;
const TOTAL_PASOS = N_MODULOS + LINEAS.length;
/** El panel de contacto es uno solo: acumula, no se desplaza. */
const PANEL_CONTACTO = N_MODULOS;
const PANEL_ENVIANDO = N_MODULOS + 1;
const CIUDAD_PASO = N_MODULOS + 1;

type FormState = {
  paso: number;
  valores: Valores;
  respuestas: Respuestas;
  enviando: boolean;
};

type Action =
  | { type: "SET_CAMPO"; campo: Campo; valor: string }
  | { type: "SEED_CIUDAD"; valor: string }
  | { type: "TOGGLE_SENAL"; modulo: Modulo["id"]; bit: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "ENVIAR" };

/**
 * Un paso de módulo siempre es válido: no marcar nada es una respuesta.
 * El del correo exige correo válido y, si escribió WhatsApp, que tenga forma
 * de teléfono — el campo es opcional, pero un número a medias no pasa.
 */
function pasoValido(state: FormState, paso: number): boolean {
  if (paso < N_MODULOS) return true;
  const { campo } = LINEAS[paso - N_MODULOS];
  const { valores } = state;
  if (campo === "nombre") return isValidNombre(valores.nombre);
  if (campo === "ciudad") return isValidCiudad(valores.ciudad);
  return isValidEmail(valores.email) && isValidWhatsapp(valores.whatsapp);
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
      if (state.paso > CIUDAD_PASO || state.valores.ciudad === action.valor) {
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
      if (!pasoValido(state, state.paso)) return state;
      if (state.paso >= TOTAL_PASOS - 1) return state;
      return { ...state, paso: state.paso + 1 };
    case "PREV":
      if (state.paso === 0) return state;
      return { ...state, paso: state.paso - 1 };
    case "ENVIAR":
      if (state.paso !== TOTAL_PASOS - 1) return state;
      if (!pasoValido(state, state.paso)) return state;
      return { ...state, enviando: true };
  }
}

/**
 * Micro-form del Reporte Energético dentro del takeover.
 *
 * El track apila 7 paneles de diagnóstico (uno por capa) + 1 panel de cierre
 * que acumula nombre, ciudad y contacto + 1 de envío. Avanzar solo cambia
 * --step y el CSS traslada el track -100dvh: no es scroll real, así que no hay
 * listeners, no pelea con el teclado virtual y el panel saliente sigue montado
 * mientras se va. Los inactivos van `inert`, fuera del tabulado y del árbol de
 * accesibilidad.
 *
 * Al enviar navega directo a /reporte —sin pantalla intermedia ni botón extra—
 * con todo el resultado en el query string, que es lo que lo hace compartible.
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
    paso: 0,
    valores: { nombre: "", ciudad: initialCiudad, email: "", whatsapp: "" },
    respuestas: { ...RESPUESTAS_VACIAS },
    enviando: false,
  });

  /** El control principal de cada paso, para devolverle el foco al avanzar. */
  const controles = useRef<Record<number, HTMLElement | null>>({});
  const { paso, enviando } = state;

  useEffect(() => {
    dispatch({ type: "SEED_CIUDAD", valor: initialCiudad });
  }, [initialCiudad]);

  useEffect(() => {
    if (enviando) return;
    // preventScroll: el panel entra por transform; dejar que el navegador
    // "acerque" el control le mete scrollTop al viewport y lo descuadra.
    controles.current[paso]?.focus({ preventScroll: true });
  }, [paso, enviando]);

  const esUltimo = paso === TOTAL_PASOS - 1;
  const valido = pasoValido(state, paso);
  const panelActivo = enviando
    ? PANEL_ENVIANDO
    : Math.min(paso, PANEL_CONTACTO);

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

  const pie = (
    <div className="mt-9 flex items-center justify-center gap-5 text-xs text-on-surface-variant">
      {paso > 0 && !enviando && (
        <button
          type="button"
          onClick={() => dispatch({ type: "PREV" })}
          className="min-h-11 rounded-full px-3 transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          ← Anterior
        </button>
      )}
      <span className="ceremonial-label">
        {Math.min(paso + 1, TOTAL_PASOS)} / {TOTAL_PASOS}
      </span>
    </div>
  );

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
        {MODULOS.map((modulo, i) => {
          const activo = i === panelActivo;
          return (
            <section
              key={modulo.id}
              className="report-panel"
              data-active={activo || undefined}
              inert={!activo}
              aria-label={modulo.tema}
            >
              <div className="w-full max-w-2xl text-center">
                <p className="ceremonial-label text-sm font-semibold text-secondary sm:text-base">
                  {modulo.tema}
                </p>
                <h2 className="mt-4 font-display text-2xl font-medium text-on-surface sm:text-4xl">
                  {modulo.pregunta}
                </h2>

                <div className="mt-8 space-y-3 text-left">
                  {modulo.senales.map((senal, bit) => {
                    const marcada = Boolean(
                      (state.respuestas[modulo.id] >> bit) & 1,
                    );
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
                          ref={
                            bit === 0
                              ? (el) => {
                                  controles.current[i] = el;
                                }
                              : undefined
                          }
                          data-autofocus={(activo && bit === 0) || undefined}
                          checked={marcada}
                          onChange={() =>
                            dispatch({
                              type: "TOGGLE_SENAL",
                              modulo: modulo.id,
                              bit,
                            })
                          }
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
                  Marca las que reconozcas. Si ninguna te resuena, continúa sin
                  marcar.
                </p>

                <BotonSiguiente habilitado ultimo={false} />
                {pie}
              </div>
            </section>
          );
        })}

        {/* Cierre: una sola pantalla que va sumando líneas. */}
        <section
          className="report-panel"
          data-active={panelActivo === PANEL_CONTACTO || undefined}
          inert={panelActivo !== PANEL_CONTACTO}
          aria-label="Tus datos"
        >
          <div className="w-full max-w-2xl text-center">
            <ol className="space-y-6">
              {LINEAS.map((linea, i) => {
                const pasoLinea = N_MODULOS + i;
                if (pasoLinea > paso) return null;
                const activa = pasoLinea === paso;
                const esEmail = linea.campo === "email";
                return (
                  <li key={linea.campo}>
                    <p className="ceremonial-label text-sm font-semibold text-secondary sm:text-base">
                      {linea.label}
                    </p>
                    {activa ? (
                      <input
                        ref={(el) => {
                          controles.current[pasoLinea] = el;
                        }}
                        id={`campo-${linea.campo}`}
                        type={esEmail ? "email" : "text"}
                        autoComplete={
                          linea.campo === "nombre"
                            ? "given-name"
                            : linea.campo === "ciudad"
                              ? "address-level2"
                              : "email"
                        }
                        aria-label={linea.label}
                        data-autofocus
                        value={state.valores[linea.campo]}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_CAMPO",
                            campo: linea.campo,
                            valor: e.target.value,
                          })
                        }
                        placeholder={`[ ${linea.placeholder} ]`}
                        className={`mt-2 w-full border-b border-outline bg-transparent pb-2 text-center font-display text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none ${
                          esEmail
                            ? "text-xl sm:text-3xl"
                            : "text-3xl uppercase sm:text-5xl"
                        }`}
                      />
                    ) : (
                      <p
                        className={`mt-2 break-words font-display text-on-surface ${
                          esEmail
                            ? "text-xl sm:text-3xl"
                            : "text-3xl uppercase sm:text-5xl"
                        }`}
                      >
                        {state.valores[linea.campo].trim()}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* WhatsApp: aparece JUNTO al correo, no como un paso aparte. */}
            {paso === TOTAL_PASOS - 1 && (
              <div className="mt-10">
                <p className="ceremonial-label text-sm font-semibold text-on-surface">
                  Enviarme mensajes de conciencia a mi WhatsApp
                </p>
                <p className="ceremonial-label mt-1 text-xs text-on-surface-variant">
                  Opcional
                </p>
                <input
                  id="campo-whatsapp"
                  type="tel"
                  autoComplete="tel"
                  aria-label="Número de WhatsApp (opcional)"
                  value={state.valores.whatsapp}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CAMPO",
                      campo: "whatsapp",
                      valor: e.target.value,
                    })
                  }
                  placeholder="000 000 000"
                  className="mx-auto mt-3 block w-full max-w-xs border-b border-outline-variant bg-transparent pb-2 text-center font-display text-xl text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none sm:text-2xl"
                />
                <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-on-surface-variant">
                  {/* TODO: texto legal definitivo pendiente de Términos & Privacidad reales — no publicar este provisional */}
                  Al dejar tu número aceptas recibir mensajes por WhatsApp. No es
                  una condición de compra y puedes dejar de recibirlos cuando
                  quieras. (Texto legal provisional — Términos &amp; Privacidad
                  próximamente.)
                </p>
              </div>
            )}

            <BotonSiguiente habilitado={valido} ultimo={esUltimo} />
            {pie}
          </div>
        </section>

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

function BotonSiguiente({
  habilitado,
  ultimo,
}: {
  habilitado: boolean;
  ultimo: boolean;
}) {
  return (
    <div className="mt-10">
      <button
        type="submit"
        disabled={!habilitado}
        className="min-h-11 rounded-full bg-on-surface px-10 py-3 text-sm font-semibold tracking-wide text-surface transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-35"
      >
        {ultimo ? "Ver mi reporte" : "Siguiente"}
      </button>
    </div>
  );
}
