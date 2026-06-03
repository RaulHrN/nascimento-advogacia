"use client";

import {
  Heart,
  Briefcase,
  FileText,
  ShoppingCart,
  Building2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

type PracticeArea = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const PRACTICE_AREAS: PracticeArea[] = [
  {
    icon: Heart,
    title: "Direito de Família",
    description: "Divórcio, guarda, pensão alimentícia e partilha de bens.",
  },
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    description: "Processos trabalhistas e assessoria para empregados.",
  },
  {
    icon: FileText,
    title: "Direito Cível",
    description: "Contratos, ações de cobrança e reparação de danos.",
  },
  {
    icon: ShoppingCart,
    title: "Direito do Consumidor",
    description: "Defesa de direitos e relações de consumo.",
  },
  {
    icon: Building2,
    title: "Direito Empresarial",
    description: "Consultoria jurídica e contratos empresariais.",
  },
  {
    icon: Users,
    title: "Direito Previdenciário",
    description: "Aposentadorias, pensões e benefícios do INSS.",
  },
];

export function AreasDeAtuacao() {
  return (
    <section
      id="areas"
      className="bg-[var(--color-bg)] py-[var(--section-padding-y)]"
      aria-labelledby="areas-title"
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
            id="areas-title"
            className="mb-4 text-3xl text-[var(--color-secondary)] md:text-4xl"
          >
            Áreas de atuação
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto h-1 w-24 rounded-full bg-[var(--color-primary)]"
          />
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area, index) => {
            const Icon = area.icon;

            return (
              <li key={area.title} className="h-full">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--card-bg)] p-8 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-[var(--shadow-lg)]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-secondary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)]">
                    <Icon
                      className="h-7 w-7 text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-primary-contrast)]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mb-3 text-xl text-[var(--color-secondary)]">
                    {area.title}
                  </h3>

                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {area.description}
                  </p>
                </motion.article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
