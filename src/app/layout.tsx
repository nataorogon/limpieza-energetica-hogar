import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import SvgDefs from "@/components/shared/svg/SvgDefs";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * El snippet de Google y la vista previa al compartir el link son el titular
 * fuera del sitio: repiten la misma promesa (B.C + V − P) que el hero, no una
 * descripción genérica del producto. La description va en ~155 caracteres,
 * que es donde Google corta.
 */
const TITULO = "Limpieza Energética del Hogar en 7 Días — Nata Orogon";
const DESCRIPCION =
  "Recupera la paz de tu hogar en 7 días con un protocolo de limpieza energética activado con Lenguajes de Luz. Sin rituales complicados, 15 min al día.";

export const metadata: Metadata = {
  // metadataBase convierte las rutas relativas (og:image, canonical) en URLs
  // absolutas. Sin esto la vista previa al compartir se queda sin imagen.
  metadataBase: new URL("https://limpieza-energetica-hogar.nataorogon.com"),
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: "/",
    siteName: "Nata Orogon",
    locale: "es_CO",
    type: "website",
    // La imagen la aporta src/app/opengraph-image.tsx (1200×630 generada).
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SvgDefs />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
