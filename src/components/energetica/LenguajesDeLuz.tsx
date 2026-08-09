import SectionEyebrow from "@/components/shared/SectionEyebrow";
import FlorVidaEterna from "@/components/shared/svg/FlorVidaEterna";

const CAPAS = [
  "elevar la frecuencia del espacio,",
  "liberar cargas densas acumuladas,",
  "armonizar ambientes y objetos,",
  "y sellar el espacio con protección.",
];

/** Sección 7 — ¿Qué son los Lenguajes de Luz? */
export default function LenguajesDeLuz() {
  return (
    <section
      aria-labelledby="lenguajes-titulo"
      className="relative overflow-hidden bg-surface-variant/60 py-16 md:py-24"
    >
      <FlorVidaEterna className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 opacity-[0.14]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionEyebrow>Lenguajes de Luz</SectionEyebrow>
        <h2
          id="lenguajes-titulo"
          className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          ¿Qué son los Lenguajes de Luz?
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Los Lenguajes de Luz son transmisiones vocales canalizadas que
            contienen códigos vibracionales de alta frecuencia.
          </p>
          <p>
            No se entienden con la mente — y justo por eso funcionan. No
            necesitas descifrarlos, creer en ellos ni “sentir la energía” para
            que actúen: trabajan directamente a nivel vibracional, como la
            música te emociona sin que analices las notas.
          </p>
          <p>
            En este programa hay una activación canalizada por cada una de las
            7 capas del hogar, y todas hacen el mismo trabajo de fondo:
          </p>
          <ul className="space-y-2 pl-1">
            {CAPAS.map((capa) => (
              <li key={capa} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                />
                <span>{capa}</span>
              </li>
            ))}
          </ul>
          <p className="font-medium text-on-surface">
            No puedo describirte lo que vas a sentir el primer día. Solo puedo
            decirte que lo vas a notar.
          </p>
        </div>
      </div>
    </section>
  );
}
