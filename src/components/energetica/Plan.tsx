import CtaButton from "@/components/shared/CtaButton";
import GoldDivider from "@/components/shared/GoldDivider";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MODULOS } from "@/lib/modulos";

const PASOS = [
  {
    titulo: "Únete hoy.",
    texto:
      "Acceso inmediato y de por vida. En 2 minutos estás escuchando tu primer audio.",
  },
  {
    titulo: "Escucha un audio al día.",
    texto:
      "15 minutos, con audífonos, en un espacio tranquilo de tu casa. El audio te guía; tú respiras.",
  },
  {
    titulo: "Siente tu hogar renacer.",
    texto:
      "Al día 7 tu casa queda limpia capa por capa, reasignada como tu hogar y sellada para que se sostenga.",
  },
];

/** Secciones 9 + 10 — El plan en 3 pasos + el recorrido día a día. */
export default function Plan() {
  return (
    <section aria-labelledby="plan-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* S9 — 3 pasos */}
        <SectionEyebrow>Tu ritual de 7 días</SectionEyebrow>
        <h2
          id="plan-titulo"
          className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Así de simple:
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo}>
              <span className="font-ceremonial text-4xl text-secondary">
                {i + 1}
              </span>
              <h3 className="mt-2 font-display text-xl font-medium text-on-surface">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                {paso.texto}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <CtaButton href="#oferta" variant="primary" size="lg">
            Comenzar mi ritual de 7 días
          </CtaButton>
        </div>

        <GoldDivider className="my-16" />

        {/* S10 — Recorrido día a día */}
        <h2 className="font-display text-3xl font-medium text-on-surface sm:text-4xl">
          7 días. 7 capas. Un hogar nuevo.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          Cada día trabaja una capa distinta, en este orden exacto — porque
          cada una sostiene a la siguiente:
        </p>
        {/* Un solo origen: estos son los mismos 7 módulos que puntúa el
            Reporte Energético (src/lib/modulos.ts). */}
        <ol className="mt-10 space-y-6 border-l border-outline-variant pl-6">
          {MODULOS.map((m) => (
            <li key={m.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-secondary"
              />
              <p className="ceremonial-label text-xs font-semibold text-secondary">
                Día {m.numero}
              </p>
              <h3 className="mt-1 font-display text-lg font-medium text-on-surface">
                {m.nombre}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                {m.resumenPlan}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          Todos los audios son diferentes, progresivos y quedan tuyos para
          siempre: puedes repetir el proceso completo en cada mudanza, inicio
          de ciclo o etapa difícil.
        </p>
        <p className="mt-6 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          ¿No sabes cuál de las 7 capas está más cargada en tu casa?{" "}
          <a
            href="#reporte"
            className="font-medium text-secondary underline underline-offset-4 hover:text-on-surface"
          >
            Haz tu Reporte Energético gratis
          </a>{" "}
          y te decimos por dónde empezar.
        </p>
      </div>
    </section>
  );
}
