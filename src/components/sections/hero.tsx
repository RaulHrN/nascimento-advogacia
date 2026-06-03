"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import {
  MessageCircle,
  Shield,
  Award,
  Clock,
  type LucideIcon,
} from "lucide-react";

type BenefitItem = {
  icon: LucideIcon;
  text: string;
};

const BENEFITS: BenefitItem[] = [
  {
    icon: Shield,
    text: "Sigilo absoluto garantido",
  },
  {
    icon: Award,
    text: "Mais de 15 anos de experiência",
  },
  {
    icon: Clock,
    text: "Atendimento ágil e personalizado",
  },
];

const WHATSAPP_URL =
  "https://wa.me/5511964523031?text=Olá, gostaria de agendar uma consulta";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const shape1X = useTransform(mouseX, [0, 1], [-20, 20]);
  const shape1Y = useTransform(mouseY, [0, 1], [-20, 20]);
  const shape2X = useTransform(mouseX, [0, 1], [20, -20]);
  const shape2Y = useTransform(mouseY, [0, 1], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      mouseX.set(event.clientX / width);
      mouseY.set(event.clientY / height);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--hero-bg)]"
      aria-labelledby="hero-heading"
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl"
        style={{ x: shape1X, y: shape1Y }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[var(--color-primary)]/5 blur-3xl"
        style={{ x: shape2X, y: shape2Y }}
      />

      <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              id="hero-heading"
              className="mb-6 text-4xl leading-tight text-[var(--hero-text)] md:text-5xl lg:text-6xl"
            >
              Advocacia especializada em{" "}
              <span className="text-[var(--color-primary)]">
                Direito de Família
              </span>{" "}
              em São Paulo
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--hero-muted)]">
              Atendimento humanizado e estratégico para resolver suas questões
              jurídicas com excelência, ética e total sigilo.
            </p>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-primary)] px-8 py-4 font-medium text-[var(--color-primary-contrast)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5"
              >
                Agendar consulta
              </button>

              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-[var(--color-primary)] px-8 py-4 font-medium text-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-contrast)]"
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Falar no WhatsApp
              </button>
            </div>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {BENEFITS.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                      <Icon
                        className="h-5 w-5 text-[var(--color-primary)]"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-sm leading-relaxed text-[var(--hero-text)]">
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,_rgba(216,174,87,0.22),_transparent_60%)] blur-2xl"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-xl)]">
              <Image
                src="https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjB0ZWFtJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc4MDQ0MTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Equipe Nascimento Advocacia"
                width={1080}
                height={1350}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent"
      />
    </section>
  );
}
