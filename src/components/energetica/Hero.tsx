import CtaButton from "@/components/shared/CtaButton";
import PhotoPlaceholder from "@/components/shared/PhotoPlaceholder";
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
          <h1
            id="hero-titulo"
            className="font-display text-4xl font-medium leading-tight text-on-surface sm:text-5xl lg:text-6xl"
          >
            La tranquilidad comienza limpiando la{" "}
            <em className="not-italic text-secondary">energía de tu hogar</em>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Programa guiado de 7 días con audio-activaciones de Lenguajes de
            Luz, canalizadas por Nata Orogón, para liberar la energía densa de
            tu casa y volver a sentirla como tu refugio. Sin rituales
            complicados. Sin experiencia previa. Solo 15 minutos al día.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton href="#oferta" variant="primary" size="lg">
              Comenzar mi limpieza de 7 días
            </CtaButton>
            <CtaButton href="#reporte" variant="secondary" size="lg">
              Recibir mi Reporte Energético gratis
            </CtaButton>
          </div>
        </div>
        <PhotoPlaceholder
          label="Una mujer serena en su sala luminosa — el destino emocional"
          aspect="4/5"
          className="max-w-md justify-self-center md:justify-self-end"
        />
      </div>
    </section>
  );
}
