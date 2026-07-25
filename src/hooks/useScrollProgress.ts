"use client";

import { useEffect, type RefObject } from "react";

/**
 * Escribe --progress (0..1) como CSS custom property sobre el elemento,
 * ligado a su posición de scroll: 0 cuando su borde superior entra al
 * viewport, 1 cuando la sección está centrada. Toda la respuesta visual
 * es CSS puro leyendo esa variable — React nunca re-renderiza por scroll.
 *
 * IntersectionObserver activa/desactiva el listener de scroll para que
 * fuera de vista no se haga ningún trabajo. Con enabled=false (reduced
 * motion) fija --progress: 1 — el contenido nunca queda oculto tras la
 * animación.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean = true,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enabled) {
      el.style.setProperty("--progress", "1");
      return;
    }

    let raf = 0;
    let listening = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.9)));
      el.style.setProperty("--progress", p.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "25% 0px 25% 0px" },
    );

    io.observe(el);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}
