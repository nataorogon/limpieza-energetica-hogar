import PhotoPlaceholder from "@/components/shared/PhotoPlaceholder";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { PENDING } from "@/lib/placeholders";

/** Sección 8 — La guía (empatía + autoridad). */
export default function Guia() {
  return (
    <section aria-labelledby="guia-titulo" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 sm:px-6 md:grid-cols-[2fr_3fr] md:gap-14">
        <PhotoPlaceholder
          label="Foto de Nata, cálida y cercana"
          aspect="4/5"
          className="mx-auto max-w-sm"
        />
        <div>
          <SectionEyebrow>Tu guía</SectionEyebrow>
          <h2
            id="guia-titulo"
            className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
          >
            Yo también sentí que mi casa me pesaba.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
            <p>
              Sé lo que es no poder descansar en tu propio espacio. Llegar a
              casa y sentir que el aire pesa. Limpiar, ordenar, sahumar… y que
              nada alcance.
            </p>
            <p>
              Soy <strong className="text-on-surface">Nata Orogón</strong>,
              canalizadora de Lenguajes de Luz. {PENDING.aniosNata} acompañando
              procesos de sanación energética, {PENDING.personasNata} que ya
              hicieron este proceso en sus hogares.
            </p>
            <p>
              Este programa nació de mi propia casa: de descubrir que los
              espacios guardan memoria, y de encontrar en los Lenguajes de Luz
              la herramienta más directa para liberarla. Lo estructuré en 7
              días para que cualquier persona — sin ninguna experiencia —
              pueda hacerlo de principio a fin.
            </p>
            <p className="font-medium text-on-surface">
              No te pido que creas. Te pido que lo escuches 7 días. Sentir es
              la única prueba que importa.
            </p>
            <p className="font-ceremonial text-2xl text-secondary">— Nata</p>
          </div>
        </div>
      </div>
    </section>
  );
}
