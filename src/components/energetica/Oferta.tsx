import CtaButton from "@/components/shared/CtaButton";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { PENDING } from "@/lib/placeholders";

function StackItem({
  marcador,
  nombre,
  descripcion,
  valor,
}: {
  marcador: string;
  nombre: string;
  descripcion: string;
  valor: string;
}) {
  return (
    <li className="flex items-start gap-4 rounded-lg bg-surface p-5">
      <span aria-hidden="true" className="mt-0.5 text-lg">
        {marcador}
      </span>
      <div className="flex-1">
        <h4 className="font-display text-base font-medium text-on-surface sm:text-lg">
          {nombre}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
          {descripcion}
        </p>
      </div>
      <span className="shrink-0 text-sm text-on-surface-variant">
        <span className="sr-only">Valor: </span>
        {valor}
      </span>
    </li>
  );
}

/** Sección 14 — La oferta completa (stack de valor). */
export default function Oferta() {
  return (
    <section
      id="oferta"
      aria-labelledby="oferta-titulo"
      className="bg-surface-variant/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionEyebrow>La oferta completa</SectionEyebrow>
        <h2
          id="oferta-titulo"
          className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Esto es todo lo que recibes hoy:
        </h2>

        <h3 className="ceremonial-label mt-10 text-sm font-semibold text-secondary">
          El programa principal
        </h3>
        <ul className="mt-4 space-y-3">
          {PENDING.stack.programa.map((item) => (
            <StackItem key={item.nombre} marcador="✨" {...item} />
          ))}
        </ul>

        <h3 className="ceremonial-label mt-10 text-sm font-semibold text-secondary">
          Y estos bonos de regalo
        </h3>
        <ul className="mt-4 space-y-3">
          {PENDING.stack.bonos.map((item) => (
            <StackItem key={item.nombre} marcador="🎁" {...item} />
          ))}
        </ul>

        <div className="mt-12 rounded-xl border border-outline-variant bg-surface p-8 text-center">
          <p className="text-base text-on-surface-variant">
            Valor total:{" "}
            <span className="line-through">{PENDING.valorTotal}</span>
          </p>
          <p className="mt-3 font-display text-4xl font-medium text-on-surface sm:text-5xl">
            Hoy: <span className="text-primary">{PENDING.precioHoy}</span>
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-on-surface-variant sm:text-base">
            Menos de lo que cuesta una sola limpieza energética presencial —
            que se hace una vez. Aquí tienes el proceso completo, guiado, para
            siempre, y puedes repetirlo cada vez que tu hogar lo necesite.
          </p>
          <div className="mt-7">
            {/* TODO: reemplazar el ancla por el checkout embebido de Hotmart */}
            <CtaButton href="#oferta" variant="primary" size="lg">
              Sí, quiero mi hogar en paz — {PENDING.precioHoy}
            </CtaButton>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            Compra segura vía Hotmart · Acceso inmediato · Tarjeta, PayPal o
            pago local
          </p>
        </div>
      </div>
    </section>
  );
}
