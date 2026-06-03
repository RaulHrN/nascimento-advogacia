import { AreasDeAtuacao } from "@/components/layout/areasDeAtuacao";
import { ComoFunciona } from "@/components/layout/comoFunciona";
import { ContatoFormulario } from "@/components/layout/contatoFormulario";
import { Depoimentos } from "@/components/layout/depoimentos";
import { FAQ } from "@/components/layout/faq";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Sobre } from "@/components/layout/sobre";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
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
