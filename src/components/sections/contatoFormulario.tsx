"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  area: string;
  mensagem: string;
};

const AREA_OPTIONS = [
  { value: "familia", label: "Direito de Família" },
  { value: "trabalhista", label: "Direito Trabalhista" },
  { value: "civel", label: "Direito Cível" },
  { value: "consumidor", label: "Direito do Consumidor" },
  { value: "empresarial", label: "Direito Empresarial" },
  { value: "previdenciario", label: "Direito Previdenciário" },
];

export function ContatoFormulario() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      area: "",
      mensagem: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Formulário enviado:", data);

      toast.success(
        "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      );
      reset();
    } catch {
      toast.error("Não foi possível enviar sua mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    "w-full rounded-[var(--radius-lg)] border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/45 outline-none transition-colors duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20";

  const errorTextClass = "mt-1 text-sm text-red-300";

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="bg-[linear-gradient(135deg,_var(--color-surface-dark)_0%,_var(--color-surface-dark-2)_100%)] py-[var(--section-padding-y)]"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2
            id="contato-title"
            className="mb-4 text-3xl text-[var(--color-text-inverse)] md:text-4xl"
          >
            Pronto para falar com um advogado?
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-[var(--color-text-muted)]">
            Preencha o formulário abaixo. Garantimos sigilo total e retorno em
            até 24 horas.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10"
          noValidate
        >
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-medium text-white"
              >
                Nome completo *
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                className={inputBaseClass}
                aria-invalid={!!errors.nome}
                {...register("nome", {
                  required: "Nome é obrigatório.",
                  minLength: {
                    value: 3,
                    message: "Informe seu nome completo.",
                  },
                })}
              />
              {errors.nome && (
                <p className={errorTextClass}>{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                E-mail *
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={inputBaseClass}
                aria-invalid={!!errors.email}
                {...register("email", {
                  required: "E-mail é obrigatório.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Informe um e-mail válido.",
                  },
                })}
              />
              {errors.email && (
                <p className={errorTextClass}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="telefone"
                className="mb-2 block text-sm font-medium text-white"
              >
                Telefone / WhatsApp *
              </label>
              <input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                className={inputBaseClass}
                aria-invalid={!!errors.telefone}
                {...register("telefone", {
                  required: "Telefone é obrigatório.",
                  minLength: {
                    value: 10,
                    message: "Informe um telefone válido.",
                  },
                })}
              />
              {errors.telefone && (
                <p className={errorTextClass}>{errors.telefone.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="area"
                className="mb-2 block text-sm font-medium text-white"
              >
                Área de interesse *
              </label>
              <select
                id="area"
                className={inputBaseClass}
                aria-invalid={!!errors.area}
                {...register("area", {
                  required: "Selecione uma área de interesse.",
                })}
              >
                <option
                  value=""
                  className="bg-[var(--color-surface-dark)] text-white"
                >
                  Selecione...
                </option>
                {AREA_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[var(--color-surface-dark)] text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.area && (
                <p className={errorTextClass}>{errors.area.message}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="mensagem"
              className="mb-2 block text-sm font-medium text-white"
            >
              Mensagem *
            </label>
            <textarea
              id="mensagem"
              rows={5}
              placeholder="Conte-nos brevemente sobre seu caso..."
              className={`${inputBaseClass} resize-none`}
              aria-invalid={!!errors.mensagem}
              {...register("mensagem", {
                required: "Mensagem é obrigatória.",
                minLength: {
                  value: 10,
                  message: "Escreva uma mensagem um pouco mais detalhada.",
                },
              })}
            />
            {errors.mensagem && (
              <p className={errorTextClass}>{errors.mensagem.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 py-4 font-medium text-[var(--color-primary-contrast)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
          </button>

          <p className="mt-6 text-center text-sm leading-relaxed text-[var(--color-text-muted)]">
            Ao enviar este formulário, você concorda com nossa política de
            privacidade. Seus dados são protegidos e utilizados exclusivamente
            para contato profissional.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
