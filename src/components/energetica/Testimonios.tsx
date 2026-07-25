import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { PENDING } from "@/lib/placeholders";

/*
 * Sección 13 — Prueba social.
 * Regla del contenido: testimonios NUNCA inventados. Estas cards son un
 * empty-state visible; cada nota indica qué tipo de testimonio buscar
 * (según el criterio del doc de contenido) al reemplazar.
 */
const PENDIENTES = [
  {
    criterio:
      "Uno que narre el MOMENTO en que “lo sintió” — resuelve la objeción “¿y si no siento nada?”.",
  },
  {
    criterio:
      "Variedad de vivienda — apartamento pequeño / casa familiar / habitación alquilada — resuelve “¿funcionará en MI casa?”.",
  },
  {
    criterio:
      "Una persona escéptica al inicio — resuelve “¿esto es real?”.",
  },
];

export default function Testimonios() {
  return (
    <section aria-labelledby="testimonios-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionEyebrow>Prueba social</SectionEyebrow>
        <h2
          id="testimonios-titulo"
          className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Ellas ya lo sintieron:
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PENDIENTES.map((t, i) => (
            <figure
              key={t.criterio}
              className="flex flex-col rounded-lg border-2 border-dashed border-outline bg-surface-variant/70 p-6"
            >
              <blockquote className="flex-1">
                <p className="ceremonial-label text-xs font-semibold text-secondary">
                  [ Testimonio {i + 1} pendiente ]
                </p>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {t.criterio}
                </p>
              </blockquote>
              <figcaption className="mt-4 border-t border-outline-variant pt-3 text-xs text-on-surface-variant">
                Nombre real y foto, con autorización.
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-center text-base text-on-surface-variant sm:text-lg">
          <strong className="text-on-surface">{PENDING.personasPrograma}</strong>{" "}
          personas ya limpiaron la energía de su hogar con este programa.
        </p>
      </div>
    </section>
  );
}
