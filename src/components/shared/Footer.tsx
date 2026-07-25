import GoldDivider from "./GoldDivider";
import HeartLogo from "./svg/HeartLogo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-outline-variant bg-surface-variant/60 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <HeartLogo className="h-10 w-10" />
        <p className="ceremonial-label text-sm font-semibold text-on-surface">
          Nata Orogon
        </p>
        <GoldDivider />
        <p className="text-xs text-on-surface-variant">
          {/* TODO: enlazar cuando existan las páginas reales de Términos y Privacidad */}
          Términos &amp; Privacidad — próximamente
        </p>
        <p className="text-xs text-on-surface-variant">
          © {new Date().getFullYear()} Nata Orogon. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
