/**
 * Valores pendientes de dato real — NO PUBLICAR sin reemplazar.
 * Fuente: contenido-landing-page.md (anexo, nota #4).
 * Los valores entre corchetes se renderizan tal cual en la página,
 * como señal visible e intencional de que siguen pendientes.
 */
export const PENDING = {
  // TODO: validar precio final (sugerido US$47 lanzamiento / US$67 regular)
  precioHoy: "US$47",
  precioRegular: "US$67",
  // TODO: recalcular si cambia algún ítem del stack
  valorTotal: "US$320",

  stack: {
    programa: [
      {
        nombre: "Programa “7 Días de Limpieza Energética del Hogar”",
        descripcion:
          "7 audio-activaciones canalizadas en Lenguajes de Luz, una por día: presencias, entidades, formas de pensamiento, espadas de ira, objetos y estructuras, portales, y reasignación del terreno. Acceso inmediato y de por vida.",
        valor: "US$97", // TODO: valor real
      },
      {
        nombre: "Guía de Acompañamiento Día a Día (PDF)",
        descripcion:
          "Qué esperar, qué podrías sentir y el paso exacto de cada jornada.",
        valor: "US$27", // TODO: valor real
      },
      {
        nombre: "Activación de Sellado y Protección del Hogar",
        descripcion:
          "El cierre del proceso, con las 7 capas ya liberadas, para que la limpieza se sostenga en el tiempo.",
        valor: "US$47", // TODO: valor real
      },
    ],
    bonos: [
      {
        nombre: "Bono 1 — “Escudo de Luz”",
        descripcion:
          "Audio de protección diaria de 5 minutos, para después de visitas o lugares densos.",
        valor: "US$37", // TODO: valor real
      },
      {
        nombre: "Bono 2 — Checklist de Limpieza Habitación por Habitación",
        descripcion: "Imprimible, para no tener que pensar por dónde empezar.",
        valor: "US$19", // TODO: valor real
      },
      {
        nombre: "Bono 3 — “Duerme en Paz”",
        descripcion:
          "Meditación nocturna con Lenguajes de Luz para tu dormitorio ya limpio.",
        valor: "US$37", // TODO: valor real
      },
      {
        nombre: "Bono 4 — Protocolos Exprés",
        descripcion:
          "Mini-audios para momentos específicos — post-mudanza, post-discusión, post-visitas, luna llena.",
        valor: "US$29", // TODO: valor real
      },
      {
        nombre: "Bono 5 — Ritual de Mantenimiento Mensual",
        descripcion:
          "Renueva la energía de tu hogar cada mes en 15 minutos.",
        valor: "US$27", // TODO: valor real
      },
    ],
  },

  // TODO: cifras reales de Nata (sección "La guía")
  aniosNata: "[X años]",
  personasNata: "[X personas]",
  // TODO: dato de autoridad de la sección de testimonios
  personasPrograma: "[X]",

  // TODO: confirmar días según política de reembolso de Hotmart
  garantiaDias: 15,

  // TODO: fecha real y verificable — sin countdown falso (regla del nicho)
  fechaUrgencia: "[FECHA REAL]",
} as const;
