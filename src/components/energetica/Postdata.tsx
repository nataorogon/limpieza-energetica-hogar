import CtaButton from "@/components/shared/CtaButton";
import HeartLogo from "@/components/shared/svg/HeartLogo";

/** Sección 19 — P.D. (cierre personal). */
export default function Postdata() {
  return (
    <section aria-label="Posdata de Nata" className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <HeartLogo className="mx-auto h-12 w-12" />
        <p className="mt-6 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <strong className="text-on-surface">P.D. de Nata:</strong> Si
          llegaste hasta aquí, es porque algo en tu casa — o en ti — ya te lo
          estaba diciendo. Esa señal es real. Hazle caso. Tu hogar lleva tiempo
          esperando que alguien lo escuche… y esa persona eres tú. Nos vemos en
          el día 1.{" "}
          <span aria-hidden="true">💛</span>
        </p>
        <div className="mt-8">
          <CtaButton href="#oferta" variant="primary" size="lg">
            Comenzar mi limpieza de 7 días
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
