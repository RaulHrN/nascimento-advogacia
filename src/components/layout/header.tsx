"use client";

import { useEffect, useState } from "react";
import { Scale } from "lucide-react";
import { cn } from "../ui/utils";
import { ButtonLink } from "../ui/buttonLink";

const NAV_ITEMS = [
  { label: "Áreas de atuação", href: "#areas" },
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--header-bg)] shadow-lg backdrop-blur-sm"
          : "bg-[var(--color-surface-dark)]",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[var(--content-wide)] items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handleScrollTop}
          className="flex items-center gap-3 text-left outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)]"
          aria-label="Voltar para o topo"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <Scale className="h-6 w-6 text-[var(--color-primary-contrast)]" />
          </span>

          <span className="flex flex-col">
            <span className="text-lg leading-tight font-semibold text-white">
              Nascimento
            </span>
            <span className="text-xs tracking-[0.2em] text-[var(--color-primary)]">
              ADVOCACIA
            </span>
          </span>
        </button>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink href="#contato" className="hidden md:inline-flex">
          Agendar consulta
        </ButtonLink>
      </div>
    </header>
  );
}
