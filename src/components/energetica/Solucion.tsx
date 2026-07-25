import CtaButton from "@/components/shared/CtaButton";
import GoldDivider from "@/components/shared/GoldDivider";

/** Secciones 5 + 6 — Por qué lo que ya probaste no alcanza + La solución. */
export default function Solucion() {
  return (
    <section aria-labelledby="solucion-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* S5 — Por qué lo que ya probaste no alcanza */}
        <p className="font-display text-2xl font-medium text-on-surface sm:text-3xl">
          Quizás ya lo intentaste.
        </p>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Sahumaste con palo santo. Pusiste sal en las esquinas. Prendiste
            incienso, moviste muebles, hasta rezaste por tu casa.
          </p>
          <p>Y funcionó… por unos días. Después, la pesadez volvió.</p>
          <p>
            Aquí está el error que casi todas cometemos:{" "}
            <strong className="text-on-surface">
              esas prácticas limpian la superficie, pero no las capas
              profundas.
            </strong>{" "}
            Es como pasar un trapo por encima de una mancha que lleva años
            impregnada. La energía densa acumulada se guarda por capas — en los
            objetos, en los rincones, en las memorias del espacio — y necesita
            un proceso ordenado, progresivo y completo para liberarse de
            verdad.
          </p>
          <p>Eso es exactamente lo que hace este programa. Déjame explicarte.</p>
        </div>

        <GoldDivider className="my-14" />

        {/* S6 — La solución */}
        <h2
          id="solucion-titulo"
          className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Una mudanza energética, sin cambiar de casa.
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            <strong className="text-on-surface">
              Limpieza Energética del Hogar
            </strong>{" "}
            es un proceso guiado de 7 días que limpia, capa por capa, la
            energía acumulada de tu casa — y la sella con protección para que
            el resultado se sostenga.
          </p>
          <ul className="space-y-2 text-on-surface">
            <li>No es un curso que tienes que estudiar.</li>
            <li>No es un ritual complicado con materiales raros.</li>
            <li>No depende de que “sepas” trabajar con energía.</li>
          </ul>
          <p>
            Cada día recibes una audio-activación canalizada en Lenguajes de
            Luz. Tú solo necesitas audífonos, 15 minutos y un espacio
            tranquilo.{" "}
            <strong className="text-on-surface">
              Los audios hacen el trabajo; tú solo escuchas y acompañas.
            </strong>
          </p>
          <p>
            Día a día, habitación por habitación, capa por capa: al séptimo día
            tu casa no se siente igual. Y tú tampoco.
          </p>
        </div>
        <div className="mt-8">
          <CtaButton href="#oferta" variant="primary" size="lg">
            Quiero empezar hoy
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
