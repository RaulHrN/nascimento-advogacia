"use client";

import { Send, Phone, Users, FileCheck, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type StepItem = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const STEPS: StepItem[] = [
  {
    number: "01",
    icon: Send,
    title: "Envie seus dados",
    description:
      "Preencha o formulário ou entre em contato pelo WhatsApp para nos contar sobre seu caso.",
  },
  {
    number: "02",
    icon: Phone,
    title: "Retorno rápido",
    description:
      "Nossa equipe analisa sua solicitação e entra em contato em até 24 horas.",
  },
  {
    number: "03",
    icon: Users,
    title: "Reunião com advogado",
    description:
      "Agendamos uma conversa para entender todos os detalhes da sua situação.",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Estratégia personalizada",
    description:
      "Desenvolvemos a melhor estratégia jurídica para resolver seu caso com eficiência.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="bg-[var(--color-bg)] py-[var(--section-padding-y)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="como-funciona-title"
            className="mb-4 text-3xl text-[var(--color-secondary)] md:text-4xl"
          >
            Como funciona o atendimento
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto h-1 w-24 rounded-full bg-[var(--color-primary)]"
          />
        </motion.div>

        <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <li key={step.number} className="h-full">
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative h-full"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-[var(--radius-xl)] bg-[radial-gradient(circle_at_top_right,_rgba(216,174,87,0.18),_transparent_70%)] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-primary)]/50 group-hover:shadow-[var(--shadow-lg)]">
                    <span className="mb-4 text-5xl font-semibold leading-none text-[var(--color-secondary)]/10 transition-opacity duration-300 group-hover:text-[var(--color-secondary)]/20">
                      {step.number}
                    </span>

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-secondary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)]">
                      <Icon
                        className="h-6 w-6 text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-primary-contrast)]"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="mb-3 text-xl text-[var(--color-secondary)]">
                      {step.title}
                    </h3>

                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
