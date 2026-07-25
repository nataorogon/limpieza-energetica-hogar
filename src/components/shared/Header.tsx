import CtaButton from "./CtaButton";
import HeartLogo from "./svg/HeartLogo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <HeartLogo className="h-9 w-9" />
          <span className="ceremonial-label text-sm font-semibold leading-tight text-on-surface">
            Nata
            <br />
            Orogon
          </span>
        </a>
        <CtaButton href="#oferta" variant="primary" size="md">
          Comenzar mi limpieza
        </CtaButton>
      </div>
    </header>
  );
}
