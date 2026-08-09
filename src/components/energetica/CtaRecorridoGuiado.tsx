"use client";

import { useCallback, useEffect, useRef } from "react";
import CtaButton from "@/components/shared/CtaButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ID_RIEL = "reporte";

/**
 * Reparto del recorrido guiado, en milisegundos. Total ≈ 9.7 s.
 *
 * No es un número redondo elegido a ojo: cada tramo paga algo concreto.
 *
 *  · ACERCAMIENTO — del hero al borde del riel. Fijo, no proporcional a la
 *    distancia: da igual lo lejos que esté, lo que importa es que se lea como
 *    un desplazamiento y no como un salto.
 *
 *  · LECTURA_INICIAL — quieto, sin avanzar. Es el tramo menos obvio y el más
 *    necesario: el primer texto solo está a plena opacidad en progreso 0 y
 *    empieza a desvanecerse en 0.034, o sea con el primer píxel de scroll. Con
 *    scroll manual eso está bien, porque quien llega lo lee antes de moverse;
 *    en un recorrido automático, sin esta pausa la frase se iría antes de poder
 *    leerla.
 *
 *  · RECORRIDO — el riel completo, de progreso 0 a 1. Dentro caben los tres
 *    textos, la carga del mandala, su disolución y la entrada del formulario.
 *
 * Si hay que ajustar el ritmo, es aquí y en un solo sitio.
 */
const ACERCAMIENTO = 700;
const LECTURA_INICIAL = 1000;
const RECORRIDO = 7500;

const FIN_ACERCAMIENTO = ACERCAMIENTO;
const FIN_PAUSA = FIN_ACERCAMIENTO + LECTURA_INICIAL;
const FIN_TOTAL = FIN_PAUSA + RECORRIDO;

/** easeInOutCubic: arranca y termina suave, y cruza rápido el tramo llano. */
function suavizar(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * El CTA del hero, con recorrido guiado: en vez de saltar al Reporte, mueve el
 * scroll despacio por todo el riel para que la animación se ejecute completa y
 * se pueda ir leyendo texto por texto, y termina en el campo de la ciudad.
 *
 * Sigue siendo un <a href="#reporte">: si el JS no carga, el ancla salta y la
 * sección se alcanza igual. El clic con modificador o con otro botón tampoco se
 * intercepta — abrir en otra pestaña tiene que seguir funcionando.
 *
 * SE CANCELA AL PRIMER GESTO (rueda, dedo, tecla, clic). Mover el scroll de
 * alguien durante casi diez segundos sin poder recuperarlo es hostil: en cuanto
 * hay intención de conducir, se suelta y no se vuelve a tocar.
 */
export default function CtaRecorridoGuiado({
  children,
}: {
  children: React.ReactNode;
}) {
  const detenerRef = useRef<(() => void) | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Si se desmonta a mitad del recorrido, no dejar el rAF ni las escuchas vivas.
  useEffect(() => () => detenerRef.current?.(), []);

  const iniciar = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Abrir en pestaña nueva, con modificador o con otro botón: que mande el
      // navegador.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      const riel = document.getElementById(ID_RIEL);
      // Con movimiento reducido el CSS aplana el riel —no hay animación que
      // recorrer— así que el salto del ancla es exactamente lo correcto.
      if (!riel || reducedMotion) return;

      e.preventDefault();
      detenerRef.current?.();

      let cancelado = false;
      let raf = 0;
      const GESTOS = [
        "wheel",
        "touchstart",
        "pointerdown",
        "keydown",
      ] as const;

      const quitarEscuchas = () => {
        for (const g of GESTOS) window.removeEventListener(g, detener);
      };
      function detener() {
        cancelado = true;
        cancelAnimationFrame(raf);
        quitarEscuchas();
        detenerRef.current = null;
      }
      for (const g of GESTOS) {
        window.addEventListener(g, detener, { passive: true });
      }
      detenerRef.current = detener;

      /** Posición de scroll para un progreso dado del riel (0..1). */
      const yDe = (p: number) => {
        // scrollY + rect.top es la posición del riel en el documento: los dos
        // términos cambian a la vez al hacer scroll, así que la suma es estable
        // y esto sobrevive a un reflow a mitad del recorrido.
        const arriba = window.scrollY + riel.getBoundingClientRect().top;
        const recorrido = Math.max(1, riel.offsetHeight - window.innerHeight);
        return arriba + p * recorrido;
      };

      const yInicial = window.scrollY;
      const t0 = performance.now();

      const paso = (ahora: number) => {
        if (cancelado) return;
        const t = ahora - t0;

        let y: number;
        if (t < FIN_ACERCAMIENTO) {
          const avance = suavizar(t / ACERCAMIENTO);
          y = yInicial + (yDe(0) - yInicial) * avance;
        } else if (t < FIN_PAUSA) {
          y = yDe(0);
        } else {
          y = yDe(suavizar(Math.min(1, (t - FIN_PAUSA) / RECORRIDO)));
        }

        // "instant" es obligatorio: html lleva scroll-behavior: smooth, y sin
        // esto cada frame encolaría su propio desplazamiento suave y el
        // resultado sería un arrastre elástico en vez de este recorrido.
        window.scrollTo({ top: y, behavior: "instant" });

        if (t < FIN_TOTAL) raf = requestAnimationFrame(paso);
        else {
          quitarEscuchas();
          detenerRef.current = null;
        }
      };
      raf = requestAnimationFrame(paso);
    },
    [reducedMotion],
  );

  return (
    <CtaButton href={`#${ID_RIEL}`} variant="primary" size="lg" onClick={iniciar}>
      {children}
    </CtaButton>
  );
}
