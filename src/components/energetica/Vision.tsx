import GoldDivider from "@/components/shared/GoldDivider";

/** Secciones 11 + 12 — Imagina el día 7 + lo que está en juego. */
export default function Vision() {
  return (
    <section
      aria-labelledby="vision-titulo"
      className="bg-surface-variant/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* S11 — Visión de éxito */}
        <h2
          id="vision-titulo"
          className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Cierra los ojos un momento.
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Es el día 7. Abres la puerta de tu casa y el aire se siente…
            liviano. Respirable. Tuyo.
          </p>
          <p>
            Duermes profundo y despiertas con energía. Las conversaciones
            fluyen donde antes había roces. Ese rincón que evitabas, ahora te
            invita a quedarte. Tus visitas te lo dicen sin que preguntes:{" "}
            <em className="font-ceremonial text-xl text-secondary">
              “qué linda energía tiene tu casa”
            </em>
            .
          </p>
          <p>
            Y hay algo más importante:{" "}
            <strong className="text-on-surface">
              ya no eres la misma que empezó el día 1.
            </strong>{" "}
            Ahora sabes sostener y limpiar la energía de tu espacio. Eres la
            guardiana energética de tu hogar.
          </p>
          <p className="font-medium text-on-surface">
            Porque cuando la energía del espacio cambia, tú también comienzas a
            cambiar.
          </p>
        </div>

        <GoldDivider className="my-14" />

        {/* S12 — Lo que está en juego */}
        <p className="font-display text-2xl font-medium text-on-surface sm:text-3xl">
          ¿Y si no haces nada?
        </p>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            La energía densa no se va sola. Se acumula. Y cada mes que pasa es
            otro mes durmiendo mal, otra capa de pesadez alimentando el
            desánimo y las discusiones, otro año viviendo en un espacio que
            drena en vez de sostener.
          </p>
          <p className="font-medium text-on-surface">
            Tu casa puede seguir siendo eso. O puede volver a ser tu refugio en
            7 días. Tú eliges.
          </p>
        </div>
      </div>
    </section>
  );
}
