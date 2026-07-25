import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const BASE =
  "inline-flex min-h-11 items-center justify-center rounded-full text-center font-body font-semibold tracking-wide transition-[opacity,background-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const VARIANTS: Record<Variant, string> = {
  // Gradiente arena→rosa: la firma Luz Suave, reservado al CTA primario
  primary: "gradient-cta text-on-surface shadow-sm hover:opacity-90",
  // Tratamiento secundario: contorno dorado sobre fondo claro
  secondary:
    "border border-secondary bg-transparent text-secondary hover:bg-secondary-container",
};

const SIZES: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type AnchorProps = { href: string } & ComponentPropsWithoutRef<"a">;
type ButtonProps = { href?: undefined } & ComponentPropsWithoutRef<"button">;

type Props = (AnchorProps | ButtonProps) & {
  variant?: Variant;
  size?: Size;
};

export default function CtaButton({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (rest.href !== undefined) {
    return <a {...(rest as AnchorProps)} className={classes} />;
  }
  return <button {...(rest as ButtonProps)} className={classes} />;
}
