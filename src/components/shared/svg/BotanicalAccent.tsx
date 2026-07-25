/**
 * Rama botánica de línea dorada — el acento de esquina de la portada.
 * Flourish de apoyo en quiebres de sección, nunca centrado ni dominante.
 */
export default function BotanicalAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      stroke="url(#grad-oro)"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      {/* Tallo principal */}
      <path d="M60 152C54 118 52 84 58 52 62 32 70 18 82 8" />
      {/* Hojas: pares alternados a lo largo del tallo */}
      <path d="M57 128c-14-4-22-14-24-28 14 2 22 12 24 28Z" />
      <path d="M56 100c12-6 17-16 16-30-12 5-17 16-16 30Z" />
      <path d="M56 76c-13-3-20-11-22-24 12 1 19 9 22 24Z" />
      <path d="M59 54c11-5 15-14 14-26-10 4-14 13-14 26Z" />
      <path d="M64 34c-10-2-16-8-18-19 10 1 15 7 18 19Z" />
      {/* Estrellitas dispersas junto a la rama */}
      <path d="M92 40v8M88 44h8" strokeWidth="1" />
      <path d="M100 70v6M97 73h6" strokeWidth="1" />
      <path d="M24 52v6M21 55h6" strokeWidth="1" />
    </svg>
  );
}
