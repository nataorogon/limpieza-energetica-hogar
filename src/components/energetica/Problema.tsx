import GoldDivider from "@/components/shared/GoldDivider";

const SENALES = [
  "Ambientes tensos o cargados en ciertas habitaciones.",
  "Cansancio constante que no se explica con tu rutina.",
  "Discusiones que se repiten siempre en el mismo lugar.",
  "Insomnio o sueño que no repara, aunque duermas horas.",
  "Estancamiento: proyectos, dinero o ánimo que no fluyen desde una mudanza, una ruptura o una mala época.",
  "Sensación de incomodidad, de “no estar sola”, o de querer irte de tu propia casa.",
];

/** Secciones 2 + 3 — Apertura (tobogán resbaladizo) + El problema. */
export default function Problema() {
  return (
    <section aria-labelledby="problema-titulo" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* S2 — Apertura */}
        <p className="font-display text-2xl font-medium text-on-surface sm:text-3xl">
          Tu casa habla.
        </p>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Lo notas al llegar del trabajo. Ese cuarto donde siempre terminan
            discutiendo. Ese rincón que evitas sin saber por qué. Esa pesadez
            en el aire que no se va por más que limpies, ordenes y abras las
            ventanas.
          </p>
          <p className="font-medium text-on-surface">No es tu imaginación.</p>
          <p>
            Los espacios guardan memoria. Cada discusión, cada duelo, cada
            visita que llegó cargada, cada época difícil… deja una huella
            energética que se acumula, capa sobre capa, año tras año.
          </p>
          <p>
            Y mientras esa energía permanece, todo se siente más difícil: el
            descanso, la convivencia, la claridad, el fluir de tu vida.
          </p>
          <p>
            Hay una razón por la que limpias tu casa cada semana y aun así se
            siente cargada. Te la cuento más abajo.
          </p>
        </div>

        <GoldDivider className="my-14" />

        {/* S3 — El problema */}
        <h2
          id="problema-titulo"
          className="font-display text-3xl font-medium text-on-surface sm:text-4xl"
        >
          ¿Tu casa se siente pesada?
        </h2>
        <p className="mt-4 text-base text-on-surface-variant sm:text-lg">
          Tal vez has notado:
        </p>
        <ul className="mt-6 space-y-3">
          {SENALES.map((senal) => (
            <li key={senal} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
              />
              <span className="text-base leading-relaxed text-on-surface-variant sm:text-lg">
                {senal}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Si marcaste aunque sea una, sigue leyendo. Porque nada de esto es
            casualidad, y ninguna de estas señales se resuelve con más limpieza
            física.
          </p>
          <p className="text-on-surface">
            <strong>El verdadero problema tiene nombre: energía densa
            acumulada.</strong>{" "}
            Residuos energéticos de emociones, personas y situaciones que tu
            espacio fue absorbiendo — y que nadie le enseñó a soltar.
          </p>
          <p>
            Y aquí está lo injusto:{" "}
            <strong className="text-on-surface">
              tu hogar debería ser tu templo.
            </strong>{" "}
            El lugar que te recarga, no el que te drena. Nadie debería sentirse
            extraña, inquieta o pesada dentro de su propia casa.
          </p>
        </div>
      </div>
    </section>
  );
}
