import Image from "next/image";
import CtaButton from "@/components/shared/CtaButton";
import BotanicalAccent from "@/components/shared/svg/BotanicalAccent";

/** Sección 1 — Hero (above the fold). */
export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden"
    >
      <BotanicalAccent className="pointer-events-none absolute -right-6 top-8 h-40 w-auto opacity-50 sm:h-56" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-2 md:gap-14 md:pb-24 md:pt-20">
        <div>
          {/* La promesa dolorosa (B.C + V − P) en tres tiempos tipográficos.
              Va en el lugar del titular, no debajo: los 2-3 segundos que dura
              la atención se los lleva el H1, y antes se gastaban repitiendo
              sin cuantificar lo que la promesa ya decía bien.
              1) beneficio cuantificado — 2) vehículo único — 3) los "sin".
              Tres tamaños, tres pesos, tres colores: cada tiempo se lee solo. */}
          <h1
            id="hero-titulo"
            className="font-display text-4xl font-medium leading-tight text-on-surface sm:text-5xl lg:text-6xl"
          >
            Recupera la paz de tu hogar en{" "}
            <em className="not-italic text-secondary">7 días</em>.
          </h1>

          {/* 24px mínimo: el dorado de marca da 3.66:1 sobre el fondo crema, que
              cumple AA solo como texto grande (≥24px). A 20px incumpliría. */}
          <p className="mt-6 max-w-lg font-display text-2xl leading-snug text-on-surface-variant lg:text-3xl">
            con un método de limpieza basado en{" "}
            <em className="not-italic text-secondary">Registros Akáshicos</em> y
            activado con{" "}
            <em className="not-italic text-secondary">Lenguajes de Luz</em>.
          </p>

          <div
            aria-hidden="true"
            className="gradient-gold mt-8 h-px w-16 opacity-70"
          />
          <p className="ceremonial-label mt-4 max-w-md text-xs font-semibold leading-relaxed text-on-surface-variant sm:text-sm">
            Sin rituales complicados · Sin experiencia previa · 15 minutos al día
          </p>
          {/* Un solo CTA: el Reporte Energético es ahora la sección inmediata
              siguiente, así que un botón que baje hasta él solo compite. */}
          <div className="mt-8">
            <CtaButton href="#oferta" variant="primary" size="lg">
              Comenzar mi limpieza de 7 días
            </CtaButton>
          </div>
        </div>
        {/* width/height son las intrínsecas del archivo (1080×1550): fijan la
            proporción y evitan el salto de layout mientras carga. `priority`
            porque está sobre la línea de flotación y es el LCP del hero. */}
        <Image
          src="/images/mujer-tranquila.jpg"
          alt="Una mujer descansa con los ojos cerrados en su sala luminosa, entre plantas y velas encendidas"
          width={1080}
          height={1550}
          priority
          sizes="(min-width: 768px) 28rem, 100vw"
          className="w-full max-w-md justify-self-center rounded-lg md:justify-self-end"
        />
      </div>
    </section>
  );
}
