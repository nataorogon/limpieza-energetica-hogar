import { MODULOS, type Modulo, type ModuloId } from "./modulos";

/**
 * Cálculo y serialización del Reporte Energético.
 *
 * El reporte tiene que ser COMPARTIBLE por link con el resto del hogar, así que
 * todo el resultado viaja en la URL: no hay backend, y quien abre el link ve
 * exactamente el mismo reporte. Solo van el nombre, la ciudad y las respuestas.
 * El correo NO viaja en la URL: un link que se pasa por WhatsApp a la familia no
 * debe filtrar la dirección de quien lo llenó.
 */

/** Máscara de 3 bits por módulo: bit 0/1/2 = señal 0/1/2 marcada. */
export type Respuestas = Record<ModuloId, number>;

export type Nivel = "verde" | "naranja" | "rojo";

export const RESPUESTAS_VACIAS: Respuestas = {
  presencias: 0,
  entidades: 0,
  pensamiento: 0,
  ira: 0,
  objetos: 0,
  portales: 0,
  terreno: 0,
};

/**
 * Penalización por cantidad de señales marcadas (0..3) → puntaje 100/62/32/15.
 * Es no lineal a propósito: la primera señal ya cambia el diagnóstico (de sano a
 * "hay algo"), la tercera solo confirma. Y el piso es 15, no 0 — ningún hogar
 * está energéticamente muerto, y un cero se leería como un error de cálculo.
 */
const PENALIZACION = [0, 38, 68, 85];

/** Un mismo umbral para el semáforo global y el de cada módulo. */
export function nivelDe(puntaje: number): Nivel {
  if (puntaje >= 67) return "verde";
  if (puntaje >= 34) return "naranja";
  return "rojo";
}

export const NIVEL_TEXTO: Record<Nivel, { titulo: string; lectura: string }> = {
  verde: {
    titulo: "Armónico",
    lectura:
      "Tu hogar sostiene bien su energía. Lo que aparece aquí se trabaja para mantenerlo así, no para rescatarlo.",
  },
  naranja: {
    titulo: "Cargado",
    lectura:
      "Tu hogar acumuló capas que ya se están notando. Todavía no es densidad profunda, pero sí es el momento de limpiarlas.",
  },
  rojo: {
    titulo: "Denso",
    lectura:
      "Hay densidad instalada en tu hogar y lleva tiempo ahí. Esto no se resuelve con una limpieza de superficie: necesita el proceso completo, capa por capa.",
  },
};

export function contarSenales(mascara: number): number {
  return ((mascara >> 0) & 1) + ((mascara >> 1) & 1) + ((mascara >> 2) & 1);
}

export function puntajeModulo(mascara: number): number {
  return 100 - PENALIZACION[contarSenales(mascara)];
}

export type ResultadoModulo = {
  modulo: Modulo;
  puntaje: number;
  nivel: Nivel;
  /** Las señales que la persona marcó, para citarlas textualmente en el reporte. */
  marcadas: string[];
};

export type Reporte = {
  nombre: string;
  ciudad: string;
  global: number;
  nivel: Nivel;
  /** En el orden del programa (módulo 1 → 7). */
  resultados: ResultadoModulo[];
  /** Por dónde empezar: el puntaje más bajo; los empates los gana el módulo más temprano. */
  prioritario: ResultadoModulo;
};

export function evaluarReporte({
  nombre,
  ciudad,
  respuestas,
}: {
  nombre: string;
  ciudad: string;
  respuestas: Respuestas;
}): Reporte {
  const resultados: ResultadoModulo[] = MODULOS.map((modulo) => {
    const mascara = respuestas[modulo.id] ?? 0;
    const puntaje = puntajeModulo(mascara);
    return {
      modulo,
      puntaje,
      nivel: nivelDe(puntaje),
      marcadas: modulo.senales
        .filter((_, i) => (mascara >> i) & 1)
        .map((s) => s.texto),
    };
  });

  // MODULOS ya viene en orden de programa, así que el primer mínimo que
  // encuentra reduce() es el más temprano: el empate se rompe solo.
  const prioritario = resultados.reduce((peor, r) =>
    r.puntaje < peor.puntaje ? r : peor,
  );

  // El global NO es el promedio: con seis capas limpias y una en 15, promediar
  // devuelve 67 y el hogar se leería "Armónico" teniendo una capa colapsada.
  // 60% media + 40% peor capa mantiene la lectura de conjunto pero impide que
  // el promedio esconda el problema que la persona vino a resolver.
  const media =
    resultados.reduce((suma, r) => suma + r.puntaje, 0) / resultados.length;
  const global = Math.round(0.6 * media + 0.4 * prioritario.puntaje);

  return {
    nombre,
    ciudad,
    global,
    nivel: nivelDe(global),
    resultados,
    prioritario,
  };
}

/* ── Serialización en la URL ─────────────────────────────────────────────── */

/** 7 dígitos octales, uno por módulo en orden de programa. Ej: "3010200". */
export function codificarRespuestas(respuestas: Respuestas): string {
  return MODULOS.map((m) => String((respuestas[m.id] ?? 0) & 0b111)).join("");
}

export function decodificarRespuestas(valor: string | undefined): Respuestas | null {
  if (!valor || valor.length !== MODULOS.length) return null;
  if (!/^[0-7]+$/.test(valor)) return null;

  const respuestas = { ...RESPUESTAS_VACIAS };
  MODULOS.forEach((m, i) => {
    respuestas[m.id] = Number(valor[i]);
  });
  return respuestas;
}

export function construirUrlReporte({
  nombre,
  ciudad,
  respuestas,
}: {
  nombre: string;
  ciudad: string;
  respuestas: Respuestas;
}): string {
  const params = new URLSearchParams({
    n: nombre.trim(),
    c: ciudad.trim(),
    r: codificarRespuestas(respuestas),
  });
  return `/reporte?${params.toString()}`;
}
