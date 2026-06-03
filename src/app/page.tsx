import { AreasDeAtuacao } from "@/components/sections/areasDeAtuacao";
import { ComoFunciona } from "@/components/sections/comoFunciona";
import { ContatoFormulario } from "@/components/sections/contatoFormulario";
import { Depoimentos } from "@/components/sections/depoimentos";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Sobre } from "@/components/sections/sobre";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AreasDeAtuacao />
        <Sobre />
        <ComoFunciona />
        <Depoimentos />
        <FAQ />
        <ContatoFormulario />
      </main>
      <Footer />
    </div>
  );
}
