"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const DIFFERENTIALS = [
  "Atendimento personalizado e humanizado para cada cliente.",
  "Estratégias jurídicas sólidas baseadas em ampla experiência.",
  "Compromisso total com ética, transparência e sigilo profissional.",
];

export function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="bg-[var(--color-surface-2)] py-[var(--section-padding-y)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="sobre-title"
              className="mb-6 text-3xl text-[var(--color-secondary)] md:text-4xl"
            >
              Sobre o escritório
            </h2>

            <div
              aria-hidden="true"
              className="mb-8 h-1 w-24 rounded-full bg-[var(--color-primary)]"
            />

            <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
              Com mais de 15 anos de atuação em São Paulo, o escritório
              Nascimento Advocacia é reconhecido pela excelência no atendimento
              e pela dedicação em buscar as melhores soluções jurídicas para
              nossos clientes.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-muted)]">
              Nossa equipe é formada por advogados especializados, comprometidos
              com a ética profissional e focados em resultados. Acreditamos que
              cada caso merece atenção única e estratégia personalizada.
            </p>

            <ul className="space-y-4">
              {DIFFERENTIALS.map((differential, index) => (
                <motion.li
                  key={differential}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-[var(--color-secondary)]">
                    {differential}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[var(--radius-2xl)] bg-[radial-gradient(circle_at_top_right,_rgba(216,174,87,0.22),_transparent_65%)] blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] shadow-[var(--shadow-xl)]">
              <Image
                src="https://images.unsplash.com/photo-1775144657626-29ff0a46ca90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsYXclMjBvZmZpY2UlMjB0ZWFtJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc4MDQ0MTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Ambiente profissional do escritório Nascimento Advocacia"
                width={1080}
                height={1350}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
