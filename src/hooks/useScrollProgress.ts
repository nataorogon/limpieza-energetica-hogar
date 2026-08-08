"use client";

import { useEffect, type RefObject } from "react";

/**
 * Progreso de un riel de scroll con panel pegado (sticky).
 *
 * El riel mide varias alturas de viewport; dentro va un panel `sticky top-0` de
 * 100dvh con todas las capas apiladas en la misma celda. Este hook escribe
 * --progress (0..1) sobre el riel en cada frame: todo lo visual —opacidad de
 * cada texto, escala del mandala— lo resuelve el CSS leyendo esa variable, así
 * que React NUNCA re-renderiza por scroll.
 *
 * Lo único que sube a estado es el índice del beat activo, vía `onBeat`, y solo
 * cuando cambia: son 3 renders en todo el recorrido. Con eso el componente
 * puede marcar `inert` la capa que no manda de forma declarativa — sin eso, el
 * teclado cae en un campo invisible y, como el panel es sticky, enfocarlo ni
 * siquiera lo trae a la vista: el foco simplemente desaparece.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  beats: readonly number[],
  onBeat: (indice: number) => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const aplicar = (p: number) => {
      el.style.setProperty("--progress", p.toFixed(4));
      let beat = 0;
      for (let i = 0; i < beats.length; i++) if (p >= beats[i]) beat = i;
      onBeat(beat);
    };

    if (!enabled) {
      // Sin movimiento el riel no aplica: el CSS lo aplana y se ve todo.
      aplicar(1);
      return;
    }

    let raf = 0;
    let escuchando = false;

    const medir = () => {
      raf = 0;
      const recorrido = el.offsetHeight - window.innerHeight;
      const p =
        recorrido <= 0
          ? 1
          : Math.min(
              1,
              Math.max(0, -el.getBoundingClientRect().top / recorrido),
            );
      aplicar(p);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };

    const io = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting && !escuchando) {
        escuchando = true;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        onScroll();
      } else if (!entrada.isIntersecting && escuchando) {
        escuchando = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    });

    io.observe(el);
    medir();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, beats, onBeat, enabled]);
}
