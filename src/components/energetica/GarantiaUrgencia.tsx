import OctagonFrame from "@/components/shared/svg/OctagonFrame";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { PENDING } from "@/lib/placeholders";

/** Secciones 15 + 16 — Garantía “Hogar en Paz” + urgencia honesta. */
export default function GarantiaUrgencia() {
  return (
    <section aria-labelledby="garantia-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* S15 — Garantía, enmarcada en el octágono de la portada */}
        <div className="relative mx-auto max-w-2xl px-6 py-14 text-center sm:px-12">
          <OctagonFrame className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
          <div className="relative">
            <SectionEyebrow>Garantía “Hogar en Paz”</SectionEyebrow>
            <h2
              id="garantia-titulo"
              className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
            >
              Todo el riesgo lo asumo yo.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-on-surface-variant">
              <p>Haz los 7 días completos del programa.</p>
              <p>
                Si al terminar no sientes tu hogar más liviano y en paz,
                escríbeme dentro de los {PENDING.garantiaDias} días de tu
                compra y te devuelvo el 100% de tu dinero. Sin preguntas, sin
                formularios, sin explicaciones.
              </p>
              <p>Y te quedas con el checklist de regalo.</p>
              <p className="font-medium text-on-surface">
                Si este programa no te sirve a ti, no quiero tu dinero. Así de
                segura estoy de lo que vas a sentir.
              </p>
            </div>
          </div>
        </div>

        {/* S16 — Urgencia honesta */}
        <div className="mt-14 rounded-lg bg-secondary-container p-6 text-center sm:p-8">
          <p className="text-base leading-relaxed text-on-surface sm:text-lg">
            <span aria-hidden="true">⏳ </span>
            <strong>
              Los bonos “Duerme en Paz” y “Protocolos Exprés” solo están
              incluidos para quienes se inscriben antes del{" "}
              {PENDING.fechaUrgencia}.
            </strong>{" "}
            El programa seguirá disponible; estos dos bonos, no.
          </p>
        </div>
      </div>
    </section>
  );
}
