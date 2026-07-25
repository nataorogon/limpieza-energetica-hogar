import CtaButton from "@/components/shared/CtaButton";
import BotanicalAccent from "@/components/shared/svg/BotanicalAccent";

/** Sección 17 — CTA final (pedir la orden). */
export default function CtaFinal() {
  return (
    <section
      aria-labelledby="cta-final-titulo"
      className="relative overflow-hidden bg-surface-variant/60 py-16 md:py-24"
    >
      <BotanicalAccent className="pointer-events-none absolute -left-6 bottom-4 h-40 w-auto -scale-x-100 opacity-50 sm:h-52" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2
          id="cta-final-titulo"
          className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Tu hogar es tu refugio. Es hora de recuperarlo.
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Hoy puedes seguir conviviendo con esa pesadez que ya conoces… o
            puedes ponerte los audífonos esta misma noche y empezar a
            liberarla.
          </p>
          <p>
            Te invito a empezar hoy. Haz clic abajo y en 2 minutos estarás
            escuchando tu primera activación.
          </p>
        </div>
        <div className="mt-8">
          <CtaButton href="#oferta" variant="primary" size="lg">
            COMENZAR MI LIMPIEZA ENERGÉTICA AHORA
          </CtaButton>
        </div>
        <p className="mt-4 text-xs italic text-on-surface-variant">
          Acceso inmediato · Garantía “Hogar en Paz” · Compra segura por
          Hotmart
        </p>
      </div>
    </section>
  );
}
