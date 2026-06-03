"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";

type TestimonialItem = {
  quote: string;
  name: string;
  city: string;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Profissionais extremamente competentes e atenciosos. Resolveram meu caso de divórcio de forma rápida e justa. Recomendo de olhos fechados!",
    name: "Maria S.",
    city: "São Paulo",
  },
  {
    quote:
      "Excelente atendimento do início ao fim. A equipe sempre disponível para esclarecer dúvidas e me deixou muito segura durante todo o processo.",
    name: "Carlos R.",
    city: "Campinas",
  },
  {
    quote:
      "Muito satisfeito com o resultado. Advogados éticos e transparentes que realmente se importam com o cliente. Agradeço pela dedicação!",
    name: "Ana P.",
    city: "São Paulo",
  },
];

const RATING_STARS = 5;

export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="bg-[linear-gradient(135deg,var(--color-surface-dark-2),var(--color-surface-dark))] py-[var(--section-padding-y)]"
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
            id="depoimentos-title"
            className="mb-4 text-3xl text-[var(--color-text-inverse)] md:text-4xl"
          >
            O que nossos clientes dizem
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto h-1 w-24 rounded-full bg-[var(--color-primary)]"
          />
        </motion.div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <li
              key={`${testimonial.name}-${testimonial.city}`}
              className="h-full"
            >
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--card-border-inverse)] bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:bg-white/10 hover:shadow-[var(--shadow-lg)]"
              >
                <div
                  className="mb-6 flex gap-1"
                  aria-label={`Avaliação de ${RATING_STARS} estrelas`}
                >
                  {Array.from({ length: RATING_STARS }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-5 w-5 fill-[var(--color-primary)] text-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mb-6 flex-1">
                  <p className="leading-relaxed text-[var(--hero-muted)] italic">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                <footer className="border-t border-white/10 pt-4">
                  <p className="text-[var(--color-text-inverse)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[var(--color-primary)]">
                    {testimonial.city}
                  </p>
                </footer>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
