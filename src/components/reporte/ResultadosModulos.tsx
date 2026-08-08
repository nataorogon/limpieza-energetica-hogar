import type { ResultadoModulo } from "@/lib/reporte";
import { NIVEL_CLASES, NIVEL_ETIQUETA } from "./nivel";

/**
 * El desglose módulo por módulo, en el orden del programa.
 * Cada fila cita textualmente las señales que la persona marcó: el puntaje sin
 * el porqué se lee como un número inventado.
 */
export default function ResultadosModulos({
  resultados,
  prioritarioId,
}: {
  resultados: ResultadoModulo[];
  prioritarioId: string;
}) {
  return (
    <ol className="mt-12 divide-y divide-outline-variant border-y border-outline-variant">
      {resultados.map((r) => {
        const clases = NIVEL_CLASES[r.nivel];
        const esPrioritario = r.modulo.id === prioritarioId;
        return (
          <li
            key={r.modulo.id}
            className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10"
          >
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="ceremonial-label text-xs font-semibold text-secondary">
                  Módulo {r.modulo.numero}
                </p>
                {esPrioritario && (
                  <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-[11px] font-semibold text-on-surface">
                    Empieza por aquí
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 font-display text-xl font-medium text-on-surface sm:text-2xl">
                {r.modulo.nombre}
              </h3>
              {r.marcadas.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {r.marcadas.map((texto) => (
                    <li
                      key={texto}
                      className="flex gap-2.5 text-sm leading-relaxed text-on-surface-variant"
                    >
                      <span aria-hidden="true" className={clases.texto}>
                        ●
                      </span>
                      {texto}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  No marcaste señales en esta capa. Se trabaja igual, como
                  mantenimiento y sellado.
                </p>
              )}
            </div>

            <div className="sm:w-56 sm:text-right">
              <div className="flex items-baseline gap-2 sm:justify-end">
                <span
                  className={`font-display text-3xl font-medium ${clases.texto}`}
                >
                  {r.puntaje}
                </span>
                <span className="text-xs text-on-surface-variant">/ 100</span>
              </div>
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-variant"
                role="img"
                aria-label={`${r.puntaje} de 100 — ${NIVEL_ETIQUETA[r.nivel]}`}
              >
                <div
                  className={`h-full rounded-full ${clases.barra}`}
                  style={{ width: `${r.puntaje}%` }}
                />
              </div>
              <p className={`mt-2 text-xs font-semibold ${clases.texto}`}>
                {NIVEL_ETIQUETA[r.nivel]}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
