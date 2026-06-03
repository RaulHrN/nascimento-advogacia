"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type FAQItem = {
  value: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    value: "consulta-inicial",
    question: "Quanto custa uma consulta inicial?",
    answer:
      "A primeira consulta tem valores acessíveis e pode variar conforme a complexidade do caso. Entre em contato para receber um orçamento personalizado sem compromisso.",
  },
  {
    value: "tempo-do-caso",
    question: "Quanto tempo leva para resolver meu caso?",
    answer:
      "O prazo varia conforme a natureza e complexidade de cada caso. Alguns processos podem ser resolvidos em semanas, enquanto outros podem levar meses. Mantemos você informado sobre cada etapa.",
  },
  {
    value: "atendimento-outras-cidades",
    question: "Vocês atendem casos em outras cidades?",
    answer:
      "Sim, atendemos clientes em todo o estado de São Paulo e, dependendo do caso, em outros estados através de parcerias com advogados correspondentes.",
  },
  {
    value: "sigilo-das-informacoes",
    question: "Como funciona o sigilo das informações?",
    answer:
      "O sigilo profissional é garantido pelo Código de Ética da OAB. Todas as informações compartilhadas com nosso escritório são estritamente confidenciais e protegidas por lei.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-[var(--color-surface-2)] py-[var(--section-padding-y)]"
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="faq-title"
            className="mb-4 text-3xl text-[var(--color-secondary)] md:text-4xl"
          >
            Perguntas frequentes
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto h-1 w-24 rounded-full bg-[var(--color-primary)]"
          />
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--card-bg)] px-6 shadow-[var(--shadow-sm)]"
        >
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <AccordionItem value={item.value}>
                <AccordionTrigger className="text-lg text-[var(--color-secondary)] hover:no-underline">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="text-[var(--color-text-muted)]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
