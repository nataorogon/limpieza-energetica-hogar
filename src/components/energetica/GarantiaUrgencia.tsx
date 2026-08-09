import DecaHexagono from "@/components/shared/svg/DecaHexagono";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { PENDING } from "@/lib/placeholders";

/** Secciones 15 + 16 — Garantía “Hogar en Paz” + urgencia honesta. */
export default function GarantiaUrgencia() {
  return (
    <section aria-labelledby="garantia-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* S15 — Garantía, enmarcada en el decahexágono de marca.
            La figura no se deforma nunca: la caja que la contiene lleva su
            proporción exacta (cos 18° = 0.9511) y ella la llena justa. Lo que
            cambia con el ancho de pantalla es CUÁNTO abarca el marco, porque el
            hexágono solo alcanza su ancho completo en la banda central —entre
            los vértices laterales, o sea la mitad de su alto— y ahí es donde
            tiene que caber el texto:

              · desde sm envuelve el bloque entero. De ahí la columna estrecha
                (30rem) y que la sección sea alta: es el precio de no estirar
                la figura al ancho del párrafo.
              · debajo de sm envuelve solo rótulo y titular, y los párrafos van
                fuera. Con todo el texto dentro haría falta un hexágono de
                ~940px de alto y, sin deformarlo, 760px de ancho: el doble que
                la pantalla.

            Son dos marcos en el markup en vez de uno responsive porque cada uno
            cuelga de una caja distinta, y un absolute solo puede referirse a
            una. Solo se renderiza uno: el otro va en display:none. */}
        <div className="relative mx-auto grid max-w-2xl place-items-center px-6 text-center sm:aspect-[0.9511] sm:px-12">
          <DecaHexagono className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-70 sm:block" />
          {/* El ancho del texto lo manda la geometría: el rectángulo mayor que
              cabe en el hexágono mide todo su ancho por la MITAD de su alto, y
              el bloque tiene que caber ahí. 30rem deja el titular en una línea
              (necesita 450px) con margen. */}
          <div className="relative sm:max-w-[30rem]">
            {/* En móvil esta caja es el marco: proporción de la figura y el
                titular centrado en su banda ancha. Desde sm vuelve a ser flujo
                normal y el marco pasa a ser el de fuera.
                El px en % no es decorativo: el hexágono mide el 85.4% del ancho
                de la caja (2·0.8122·R sobre 2·cos18°·R), así que un titular a
                ancho completo se saldría por los lados. En % en vez de rem para
                que la proporción se mantenga a cualquier ancho de pantalla. */}
            <div className="relative grid aspect-[0.9511] place-items-center px-[9%] sm:block sm:aspect-auto sm:px-0">
              <DecaHexagono className="pointer-events-none absolute inset-0 h-full w-full opacity-70 sm:hidden" />
              <div className="relative">
                <SectionEyebrow>Garantía “Hogar en Paz”</SectionEyebrow>
                <h2
                  id="garantia-titulo"
                  className="mt-3 text-balance font-display text-3xl font-medium text-on-surface sm:text-4xl"
                >
                  Todo el riesgo lo asumo yo.
                </h2>
              </div>
            </div>
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
