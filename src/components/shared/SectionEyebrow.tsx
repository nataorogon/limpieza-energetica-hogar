/** Etiqueta ceremonial: serif dorada, uppercase, tracking amplio — la voz "de portada". */
export default function SectionEyebrow({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <p
      id={id}
      className={`ceremonial-label text-sm font-semibold text-secondary ${className}`}
    >
      {children}
    </p>
  );
}
