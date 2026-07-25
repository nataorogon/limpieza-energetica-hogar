import SectionEyebrow from "@/components/shared/SectionEyebrow";

const PREGUNTAS = [
  {
    q: "¿Esto es real? ¿Cómo sé que no es humo?",
    a: "Es una duda sana — yo pensé lo mismo. Los Lenguajes de Luz son transmisiones vibracionales canalizadas; no te pido que las creas, te pido que las escuches. Haz los 7 días: sentir es la única prueba que importa. Y si no sientes tu hogar distinto, la garantía “Hogar en Paz” te devuelve todo tu dinero.",
  },
  {
    q: "¿Necesito experiencia espiritual o saber meditar?",
    a: "No. Solo necesitas audífonos y 15 minutos al día. Cada audio te guía paso a paso. Si nunca meditaste, mejor: llegas sin vicios.",
  },
  {
    q: "¿Funciona en apartamento, casa alquilada o compartida?",
    a: "Sí. El trabajo es sobre la energía del espacio y de quien lo habita, no sobre los metros cuadrados ni la escritura. Funciona en un apartamento pequeño, una casa familiar o una habitación alquilada. No necesitas mover un solo mueble ni involucrar a nadie: los audios se escuchan en privado, con audífonos.",
  },
  {
    q: "¿Es seguro? ¿Choca con mi religión?",
    a: "Los Lenguajes de Luz trabajan desde la luz y el amor: no se invoca nada externo ni se “abren puertas”. Es un proceso de limpieza y armonización compatible con cualquier fe o práctica espiritual. Personas de muy distintas creencias lo han hecho en sus hogares.",
  },
  {
    q: "¿Cuánto tiempo necesito al día?",
    a: "Unos 15 minutos: un espacio tranquilo, audífonos, y darle play al audio del día. Nada más.",
  },
  {
    q: "¿Necesito comprar materiales?",
    a: "No. Sin velas obligatorias, sin hierbas, sin objetos especiales. Solo tu celular y audífonos.",
  },
  {
    q: "¿Cuándo recibo el acceso?",
    a: "Inmediatamente después de tu compra, en tu correo. Hoy mismo puedes hacer tu primera activación. El acceso es de por vida: puedes repetir el proceso cuantas veces quieras.",
  },
  {
    q: "¿Y si me atraso un día?",
    a: "No pasa nada. El programa queda tuyo para siempre y lo retomas donde lo dejaste. Lo ideal son 7 días seguidos, pero el proceso se adapta a tu ritmo.",
  },
  {
    q: "¿Qué pasa después de los 7 días?",
    a: "Tu hogar queda sellado y protegido, y tú te quedas con el Ritual de Mantenimiento Mensual (Bono 5) para renovar la energía cada mes en 15 minutos.",
  },
];

/** Sección 18 — Preguntas frecuentes (acordeón nativo, sin JS). */
export default function Faq() {
  return (
    <section aria-labelledby="faq-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionEyebrow>Preguntas frecuentes</SectionEyebrow>
        <h2
          id="faq-titulo"
          className="mt-3 font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          Lo que quizás te estás preguntando
        </h2>
        <div className="mt-8 divide-y divide-outline-variant border-y border-outline-variant">
          {PREGUNTAS.map((p) => (
            <details key={p.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium text-on-surface sm:text-lg [&::-webkit-details-marker]:hidden">
                {p.q}
                <span
                  aria-hidden="true"
                  className="text-xl text-secondary transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                {p.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
