import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Tarjeta de vista previa al compartir el link (WhatsApp, Facebook, X…).
 *
 * Se genera en vez de subir un JPG porque la foto del hero es vertical
 * (1080×1550) y al recortarla a 1200×630 se perdía la cara. Aquí se compone:
 * la promesa a la izquierda sobre el crema de marca, la foto a la derecha.
 *
 * Tipografía: la del sistema de satori. Las fuentes de marca (Fraunces,
 * Cormorant) solo llegan como .woff2 vía next/font y satori no lee woff2 —
 * necesitaría el .ttf en el repo. Ver nota al final del archivo.
 */
export const alt =
  "Recupera la paz de tu hogar en 7 días — Limpieza Energética del Hogar con Nata Orogon";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tokens de marca, en literal: satori no resuelve var() de globals.css.
const CREMA = "#fbf7ef";
const CAFE = "#3a2e2a";
const CAFE_SUAVE = "#5f473c";
const ORO = "#a9762f";

export default async function Image() {
  const foto = await readFile(
    join(process.cwd(), "public/images/mujer-tranquila.jpg"),
  );
  const fotoSrc = `data:image/jpeg;base64,${foto.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: CREMA,
        }}
      >
        <div
          style={{
            width: "56%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: ORO,
              marginBottom: 34,
            }}
          >
            NATA OROGON
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 64,
              lineHeight: 1.12,
              color: CAFE,
            }}
          >
            Recupera la paz de tu hogar en&nbsp;
            <span style={{ color: ORO }}>7 días</span>.
          </div>

          <div
            style={{
              display: "flex",
              width: 76,
              height: 3,
              backgroundColor: ORO,
              margin: "34px 0 26px",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.4,
              color: CAFE_SUAVE,
            }}
          >
            Sin rituales complicados · Sin experiencia previa · 15 min al día
          </div>
        </div>

        <div style={{ width: "44%", height: "100%", display: "flex" }}>
          {/* img nativo a propósito: satori no ejecuta next/image */}
          <img
            src={fotoSrc}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    size,
  );
}

/* TODO(marca): para que la tarjeta use Fraunces en vez de la fuente por
   defecto, dejar `Fraunces.ttf` en el repo y pasarlo por la opción `fonts`
   de ImageResponse. Descargarlo en build desde Google rompe el deploy si la
   red falla, así que el .ttf tiene que estar versionado. */
