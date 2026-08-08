/**
 * Los 7 módulos del programa, EN EL ORDEN EN QUE SE TRABAJAN.
 * Ese orden es contenido, no presentación: el diagnóstico, el reporte y la
 * recomendación lo respetan, y los empates de puntaje se rompen a favor del
 * módulo más temprano (es el más fundacional).
 *
 * Cada módulo tiene dos nombres a propósito:
 *  - `tema`   — neutro, es el que se muestra MIENTRAS se diagnostica. Decirle
 *               "presencia de muertos" a alguien antes de preguntarle si oye
 *               ruidos condiciona la respuesta y arruina el diagnóstico.
 *  - `nombre` — el real. Se usa en el reporte (ya con las respuestas dadas) y
 *               en la landing, donde es justamente lo que vende.
 *
 * Este archivo es la ÚNICA fuente del programa: la landing (Plan, Problema) y
 * el Reporte leen de aquí. Si los 7 días y los 7 módulos vuelven a divergir,
 * es porque alguien escribió la lista a mano en otro lado.
 */

export type ModuloId =
  | "presencias"
  | "entidades"
  | "pensamiento"
  | "ira"
  | "objetos"
  | "portales"
  | "terreno";

export type Senal = { id: string; texto: string };

export type Modulo = {
  id: ModuloId;
  /** 1..7 — el día/módulo del programa */
  numero: number;
  tema: string;
  nombre: string;
  pregunta: string;
  /**
   * Exactamente 3: el puntaje se calcula sobre cuántas se marcan.
   * La PRIMERA es además la que la landing muestra en "¿Tu casa se siente
   * pesada?" — pon siempre de primera la más reconocible sin contexto.
   */
  senales: [Senal, Senal, Senal];
  /** Qué hace la activación de ese día. Es la línea de tiempo de la landing. */
  resumenPlan: string;
  queEs: string;
  /** Lo que produce cuando está activo — el "This may contribute to" del reporte. */
  consecuencias: string[];
  /** Lo que se recupera al trabajarlo. */
  beneficio: string;
};

export const MODULOS: Modulo[] = [
  {
    id: "presencias",
    numero: 1,
    tema: "Sonidos y presencias",
    nombre: "Presencia de muertos, espíritus y duendes",
    pregunta: "¿Algo de esto pasa en tu hogar?",
    senales: [
      { id: "ruidos", texto: "Escucho ruidos que no tienen explicación" },
      { id: "presencia", texto: "Siento una presencia en la casa" },
      {
        id: "observada",
        texto: "Me levanto asustada, como si alguien me estuviera observando",
      },
    ],
    resumenPlan:
      "Liberamos lo que quedó atado al espacio y lo acompañamos a irse. Es la capa que más rápido se nota al dormir.",
    queEs:
      "Cuando alguien muere —en tu hogar o en el de un vecino— puede quedarse rondando el lugar. Queda atado al espacio hasta que se hace una limpieza que lo libere. Las reliquias y los objetos heredados suelen sostener ese vínculo sin que nadie lo sepa.",
    consecuencias: [
      "Ruidos, pasos y movimiento sin origen",
      "Sensación de compañía cuando estás sola",
      "Despertares con sobresalto en la madrugada",
      "Sueño que nunca termina de reparar",
    ],
    beneficio:
      "Que la casa vuelva a estar solo habitada por quienes viven en ella.",
  },
  {
    id: "entidades",
    numero: 2,
    tema: "Lo que se alimenta de tu casa",
    nombre: "Entidades en tu hogar",
    pregunta: "¿Reconoces alguna de estas situaciones?",
    senales: [
      {
        id: "zonas-miedo",
        texto: "Me da miedo caminar por ciertas zonas de la casa",
      },
      { id: "drenado", texto: "Me siento drenada o fatigada sin razón clara" },
      {
        id: "adoracion",
        texto:
          "En casa hay cuadros, posters o altares de artistas o figuras que admiramos",
      },
    ],
    resumenPlan:
      "Cortamos el alimento de lo que se instaló y desanclamos sus puntos de apoyo en la casa.",
    queEs:
      "En los hogares donde se consume pornografía o cine de terror, o donde se adora a artistas y figuras —sobre todo si ya murieron— se forman entidades que se alimentan de esa energía de adoración. Cuadros, posters y postales son su punto de anclaje. Las drogas dentro del hogar abren la misma puerta.",
    consecuencias: [
      "Zonas de la casa donde nadie quiere estar",
      "Cansancio que no se explica con el descanso",
      "Sensación de ser observada",
      "Ambiente denso que vuelve apenas se limpia",
    ],
    beneficio: "Recuperar cada rincón de tu casa, sin zonas prohibidas.",
  },
  {
    id: "pensamiento",
    numero: 3,
    tema: "Lo que se dice y se piensa",
    nombre: "Formas de pensamiento negativo",
    pregunta: "¿Algo de esto suena a tu casa?",
    senales: [
      {
        id: "discusiones",
        texto: "Hay malos entendidos, discusiones y peleas seguidas",
      },
      {
        id: "hablar-mal",
        texto:
          "Dentro de casa se habla mal de la pareja, del jefe o de una misma",
      },
      {
        id: "pesadez",
        texto: "Después de discutir, el ambiente queda pesado por días",
      },
    ],
    resumenPlan:
      "Disolvemos lo que se dijo y se pensó entre estas paredes, y que quedó cargando cada espacio.",
    queEs:
      "Todo lo que pensamos y decimos crea formas de pensamiento. Cuando hablas mal de tu pareja, de tu jefe o de ti misma dentro de tu casa, esas formas no se van: se quedan cargando los espacios donde se dijeron.",
    consecuencias: [
      "Discusiones que se repiten siempre en el mismo lugar",
      "Ambiente cargado sin motivo aparente",
      "Malos entendidos entre quienes viven ahí",
      "Pensamientos que se vuelven más oscuros dentro de la casa",
    ],
    beneficio: "Que tu casa deje de guardar lo que se dijo en un mal día.",
  },
  {
    id: "ira",
    numero: 4,
    tema: "Ira, celos y envidias",
    nombre: "Espadas de ira clavadas en tu hogar",
    pregunta: "¿Alguna de estas te resuena?",
    senales: [
      {
        id: "rabia-dirigida",
        texto:
          "Hay rabia o resentimiento dirigido a esta casa o a quien vive en ella",
      },
      {
        id: "proyectos-caen",
        texto:
          "De un momento a otro se caen todos los proyectos, uno tras otro",
      },
      { id: "vecinos", texto: "Tengo o tuve problemas con los vecinos" },
    ],
    resumenPlan:
      "Extraemos las espadas clavadas —celos, envidias, rabias dirigidas— y cerramos lo que las sostenía.",
    queEs:
      "Los celos, las envidias, las rabias y las iras dirigidas a un hogar no se disipan solas. La ira es una espada: se lanza y se clava en el espacio, y ahí queda, sosteniendo el conflicto desde adentro.",
    consecuencias: [
      "Proyectos que se derrumban en cadena",
      "Conflictos que se reactivan sin causa nueva",
      "Roces constantes con vecinos o familia",
      "Sensación de estar remando contra algo",
    ],
    beneficio: "Sacar de tu casa lo que otros dirigieron contra ella.",
  },
  {
    id: "objetos",
    numero: 5,
    tema: "Objetos y estructuras",
    nombre: "Objetos y estructuras cargados",
    pregunta: "¿Te pasa algo de esto?",
    senales: [
      {
        id: "danos",
        texto: "Se me empiezan a dañar las cosas y vivo haciendo arreglos",
      },
      {
        id: "fugas",
        texto:
          "Hay fugas económicas del hogar: eléctricas, electrodomésticos, gastos estructurales",
      },
      {
        id: "heredados",
        texto: "Tengo objetos regalados o heredados de los que no sé el origen",
      },
    ],
    resumenPlan:
      "Limpiamos objetos, instalación eléctrica y estructura de la energía que traen de afuera.",
    queEs:
      "Un objeto carga la energía de quien lo fabricó y de quien te lo regaló. Entra a tu casa con todo eso puesto. La instalación eléctrica y los campos electromagnéticos suman su propia carga sobre la estructura.",
    consecuencias: [
      "Averías en cadena y arreglos que no terminan",
      "Fugas de dinero atadas a la casa",
      "Electrodomésticos que fallan antes de tiempo",
      "Objetos que incomodan sin saber por qué",
    ],
    beneficio: "Que lo que tienes en casa deje de traer historia ajena.",
  },
  {
    id: "portales",
    numero: 6,
    tema: "Rincones y espacios olvidados",
    nombre: "Portales y puertas abiertas",
    pregunta: "¿Reconoces alguno de estos espacios?",
    senales: [
      {
        id: "abandonado",
        texto:
          "Hay un cuarto útil, clóset o depósito muy desordenado o abandonado",
      },
      {
        id: "antigua",
        texto: "La casa es antigua o tuvo muchos habitantes antes",
      },
      {
        id: "movimiento",
        texto: "Escucho movimiento en zonas donde no hay nadie",
      },
    ],
    resumenPlan:
      "Cerramos las puertas que llevan años abiertas: cuartos útiles, clósets, rincones abandonados.",
    queEs:
      "Los portales se abren donde el espacio lleva mucho tiempo sin atención: hogares muy antiguos, cuartos útiles abandonados, clósets en desorden profundo. Son las puertas por donde entran las entidades, y quedan abiertas hasta que alguien las cierra.",
    consecuencias: [
      "Entrada continua de energías nuevas",
      "Limpiezas que dejan de servir a los pocos días",
      "Movimiento y ruido en zonas deshabitadas",
      "Rincones que se sienten fríos o incómodos",
    ],
    beneficio: "Cerrar las puertas que llevan años abiertas.",
  },
  {
    id: "terreno",
    numero: 7,
    tema: "El terreno donde está tu casa",
    nombre: "Terreno con energía pesada — Reasignación energética",
    pregunta: "¿Algo de esto describe tu situación?",
    senales: [
      { id: "bloqueo", texto: "Los proyectos se me bloquean sin explicación" },
      {
        id: "estafas",
        texto: "He tenido estafas o pérdidas de dinero inesperadas",
      },
      {
        id: "vuelve",
        texto: "La pesadez vuelve aunque limpie la casa una y otra vez",
      },
    ],
    resumenPlan:
      "Limpiamos el terreno y lo reasignamos: deja de ser lo que fue y pasa a ser tu hogar.",
    queEs:
      "Toda casa está construida sobre un terreno, y la mayoría de los terrenos están contaminados: fueron campos de batalla, hubo personas enterradas ahí, o fueron asignados como campos sagrados donde se iba a orar. Ese terreno se limpia y se reasigna: deja de ser lo que fue y pasa a ser hogar.",
    consecuencias: [
      "Bloqueos que se repiten en todo lo que emprendes",
      "Pérdidas de dinero difíciles de explicar",
      "Pesadez que regresa después de cada limpieza",
      "Sensación de que el problema no es la casa sino el lugar",
    ],
    beneficio: "Que el suelo bajo tu casa por fin sea tuyo, y solo tuyo.",
  },
];

export const MODULOS_POR_ID = new Map(MODULOS.map((m) => [m.id, m]));
