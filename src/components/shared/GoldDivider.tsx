/** Hairline dorado entre secciones — fino, nunca una regla pesada. */
export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`gradient-gold mx-auto h-px w-24 opacity-60 ${className}`}
    />
  );
}
