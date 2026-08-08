import Hero from "@/components/energetica/Hero";
import Problema from "@/components/energetica/Problema";
import EnergyReportSection from "@/components/energetica/EnergyReportSection";
import Solucion from "@/components/energetica/Solucion";
import LenguajesDeLuz from "@/components/energetica/LenguajesDeLuz";
import Guia from "@/components/energetica/Guia";
import Plan from "@/components/energetica/Plan";
import Vision from "@/components/energetica/Vision";
import Testimonios from "@/components/energetica/Testimonios";
import Oferta from "@/components/energetica/Oferta";
import GarantiaUrgencia from "@/components/energetica/GarantiaUrgencia";
import CtaFinal from "@/components/energetica/CtaFinal";
import Faq from "@/components/energetica/Faq";
import Postdata from "@/components/energetica/Postdata";

/**
 * Orden del funnel según contenido-landing-page.md (S1–S19), con una
 * desviación deliberada: el Reporte Energético va ANTES de "Tu casa habla".
 * El reporte es el gancho —diagnostica y captura— y llega mientras la persona
 * todavía tiene atención; el problema se desarrolla después, ya con el
 * resultado en la mano y con las 7 señales resonando.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <EnergyReportSection />
      <Problema />
      <Solucion />
      <LenguajesDeLuz />
      <Guia />
      <Plan />
      <Vision />
      <Testimonios />
      <Oferta />
      <GarantiaUrgencia />
      <CtaFinal />
      <Faq />
      <Postdata />
    </>
  );
}
