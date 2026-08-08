import type { Metadata } from "next";
import CtaButton from "@/components/shared/CtaButton";
import GoldDivider from "@/components/shared/GoldDivider";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import FlowerOfLife from "@/components/shared/svg/FlowerOfLife";
import CompartirReporte from "@/components/reporte/CompartirReporte";
import RecorridoEnergia from "@/components/reporte/RecorridoEnergia";
import ResultadosModulos from "@/components/reporte/ResultadosModulos";
import SemaforoGauge from "@/components/reporte/SemaforoGauge";
import { NIVEL_CLASES, NIVEL_ETIQUETA } from "@/components/reporte/nivel";
import {
  decodificarRespuestas,
  evaluarReporte,
  NIVEL_TEXTO,
} from "@/lib/reporte";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** El reporte es personal y se comparte por link: nunca debe indexarse. */
const SIN_INDEXAR = { index: false, follow: false } as const;

function texto(valor: string | string[] | undefined, max: number): string {
  const v = Array.isArray(valor) ? valor[0] : valor;
  return (v ?? "").trim().slice(0, max);
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const nombre = texto((await searchParams).n, 40);
  return {
    title: nombre
      ? `El Reporte Energético de ${nombre} — Nata Orogon`
      : "El Reporte Energético — Nata Orogon",
    description:
      "El semáforo energético de tu hogar, capa por capa, y por dónde conviene empezar.",
    robots: SIN_INDEXAR,
  };
}

export default async function ReportePage({ searchParams }: Props) {
  const params = await searchParams;
  const respuestas = decodificarRespuestas(texto(params.r, 7));

  if (!respuestas) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <SectionEyebrow>El Reporte Energético</SectionEyebrow>
        <h1 className="mt-4 font-display text-3xl font-medium text-on-surface sm:text-4xl">
          No pudimos leer este reporte.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
          El link está incompleto o fue modificado. Puedes generar el tuyo en
          dos minutos.
        </p>
        <div className="mt-8">
          <CtaButton href="/#reporte" variant="secondary" size="lg">
            Hacer mi Reporte Energético
          </CtaButton>
        </div>
      </div>
    );
  }

  const reporte = evaluarReporte({
    nombre: texto(params.n, 40),
    ciudad: texto(params.c, 40),
    respuestas,
  });
  const { prioritario } = reporte;
  const clasesGlobal = NIVEL_CLASES[reporte.nivel];
  const saludo = reporte.nombre || "Este";
  const enDonde = reporte.ciudad ? ` en ${reporte.ciudad}` : "";

  return (
    <>
      {/* ── Portada personalizada ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 text-center md:py-24">
        {/* FlowerOfLife directo, no EnergyReveal: fuera de .energy-flow el
            mandala se dibuja completo, que es lo que queremos de marca de agua. */}
        <FlowerOfLife className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <SectionEyebrow>El Reporte Energético</SectionEyebrow>
          <h1 className="mt-5 font-display text-3xl font-medium leading-tight text-on-surface sm:text-4xl lg:text-5xl">
            {saludo}, este es el reporte energético de tu hogar
            {enDonde}.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Tu hogar guarda capas de energía que se acumularon con el tiempo —
            del terreno, de los objetos, de lo que se dijo entre estas paredes.
            Esto es lo que aparece en las tuyas.
          </p>
          <p className="mt-6 text-base text-on-surface-variant">Empecemos.</p>
        </div>
      </section>

      {/* ── Semáforo global ───────────────────────────────────────────── */}
      <section
        aria-labelledby="semaforo-titulo"
        className="border-y border-outline-variant bg-surface-variant/40 py-16 md:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2
            id="semaforo-titulo"
            className="font-display text-2xl font-medium text-on-surface sm:text-3xl"
          >
            La energía de tu hogar hoy
          </h2>

          <SemaforoGauge
            puntaje={reporte.global}
            className="mx-auto mt-10 max-w-sm"
          />

          <p
            className={`mt-8 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold ${clasesGlobal.borde} ${clasesGlobal.fondo} ${clasesGlobal.texto}`}
          >
            {NIVEL_TEXTO[reporte.nivel].titulo} · {NIVEL_ETIQUETA[reporte.nivel]}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            {NIVEL_TEXTO[reporte.nivel].lectura}
          </p>
          <p className="mt-8 text-xs leading-relaxed text-on-surface-variant">
            0–33 rango bajo · 34–66 rango intermedio · 67–100 rango alto. El
            puntaje se calcula sobre las señales que reconociste en cada una de
            las 7 capas, y pesa de más la capa más cargada: una sola capa
            colapsada no queda escondida detrás del promedio.
          </p>
        </div>
      </section>

      {/* ── Desglose por módulo ───────────────────────────────────────── */}
      <section
        aria-labelledby="resultados-titulo"
        className="py-16 md:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2
            id="resultados-titulo"
            className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
          >
            Tus 7 capas, una por una.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            El programa trabaja estas capas en este orden, porque cada una
            sostiene a la siguiente. Así está cada una en tu hogar:
          </p>

          <ResultadosModulos
            resultados={reporte.resultados}
            prioritarioId={prioritario.modulo.id}
          />
        </div>
      </section>

      {/* ── El módulo prioritario, en profundidad ─────────────────────── */}
      <section
        aria-labelledby="prioritario-titulo"
        className="border-y border-outline-variant bg-surface-variant/40 py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionEyebrow>
            Empieza por aquí · Módulo {prioritario.modulo.numero}
          </SectionEyebrow>
          <h2
            id="prioritario-titulo"
            className="mt-4 font-display text-3xl font-medium text-on-surface sm:text-4xl"
          >
            {prioritario.modulo.nombre}
          </h2>
          <p
            className={`mt-4 text-sm font-semibold ${NIVEL_CLASES[prioritario.nivel].texto}`}
          >
            {prioritario.puntaje} / 100 ·{" "}
            {NIVEL_ETIQUETA[prioritario.nivel]} — es la capa más cargada de tu
            hogar, y por eso es la que más te va a cambiar el resultado.
          </p>

          <p className="mt-8 text-base leading-relaxed text-on-surface-variant sm:text-lg">
            {prioritario.modulo.queEs}
          </p>

          <p className="mt-8 font-display text-lg font-medium text-on-surface">
            Esto es lo que suele producir:
          </p>
          <ul className="mt-4 space-y-2">
            {prioritario.modulo.consecuencias.map((c) => (
              <li
                key={c}
                className="flex gap-3 text-base leading-relaxed text-on-surface-variant"
              >
                <span aria-hidden="true" className="text-secondary">
                  —
                </span>
                {c}
              </li>
            ))}
          </ul>

          <GoldDivider className="my-10" />

          <p className="font-display text-lg font-medium text-on-surface">
            Lo que recuperas al trabajarlo:
          </p>
          <p className="mt-2 text-base leading-relaxed text-on-surface-variant sm:text-lg">
            {prioritario.modulo.beneficio}
          </p>
        </div>
      </section>

      {/* ── El recorrido de la energía ────────────────────────────────── */}
      <section aria-labelledby="recorrido-titulo" className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2
            id="recorrido-titulo"
            className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
          >
            El recorrido de la energía en tu hogar
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            La energía no aparece en tu cuarto: llega hasta ahí. Entra por el
            terreno, se asienta en la estructura, se guarda en los objetos y se
            alimenta de lo que ocurre entre las personas.
          </p>

          <div className="mt-10">
            <RecorridoEnergia />
          </div>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Por eso sahumar el dormitorio alivia unos días y después la pesadez
            vuelve: limpia el último eslabón, no la cadena. El programa recorre
            los siete en orden y sella al final para que lo logrado se sostenga.
          </p>
        </div>
      </section>

      {/* ── Qué significa + cierre ────────────────────────────────────── */}
      <section
        aria-labelledby="cierre-titulo"
        className="border-t border-outline-variant py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2
            id="cierre-titulo"
            className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
          >
            Qué significa esto para tu hogar
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Nada de lo que aparece en este reporte es permanente. Son capas, y
            las capas se levantan en orden. En 7 días, con 15 minutos diarios,
            tu casa pasa de sostener lo que quedó atrapado a sostenerte a ti:
            paz, tranquilidad y armonía en el lugar donde vives.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/#oferta" variant="primary" size="lg">
              Comenzar mi limpieza de 7 días
            </CtaButton>
            <CompartirReporte
              titulo={`El Reporte Energético${reporte.nombre ? ` de ${reporte.nombre}` : ""}`}
            />
          </div>
          <p className="mt-6 text-sm text-on-surface-variant">
            Comparte este link con quienes viven contigo: el hogar se limpia
            entre todos.
          </p>
        </div>
      </section>
    </>
  );
}
