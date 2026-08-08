const PASOS = [
  { titulo: "El terreno", nota: "Lo que hubo antes de tu casa" },
  { titulo: "La estructura", nota: "Muros, instalación, cimientos" },
  { titulo: "Los objetos", nota: "Lo comprado, regalado y heredado" },
  { titulo: "Las personas", nota: "Lo que se dice, se piensa y se siente" },
  { titulo: "Tu descanso", nota: "Donde todo lo anterior se acumula" },
];

/**
 * Cómo se carga la energía de un hogar, de afuera hacia adentro.
 * Encadenado a propósito: explica por qué limpiar solo el último eslabón
 * (sahumar el cuarto) no sostiene el resultado.
 */
export default function RecorridoEnergia() {
  return (
    // min-w-max hasta lg (se desplaza en horizontal); de lg en adelante los
    // pasos reparten el ancho y la cadena entra completa sin barra.
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ol className="flex min-w-max items-stretch gap-0 lg:min-w-0">
        {PASOS.map((paso, i) => (
          <li key={paso.titulo} className="flex items-center lg:flex-1">
            <div className="w-40 rounded-lg border border-outline-variant bg-surface-variant/50 px-3 py-4 text-center sm:w-48 lg:w-auto lg:flex-1">
              <p className="font-display text-base font-medium text-on-surface">
                {paso.titulo}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">
                {paso.nota}
              </p>
            </div>
            {i < PASOS.length - 1 && (
              <div
                aria-hidden="true"
                className="flex w-8 shrink-0 items-center sm:w-10"
              >
                <span className="h-px flex-1 bg-outline-variant" />
                <span className="text-outline">›</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
