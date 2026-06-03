import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

type ContactItem = {
  href: string;
  label: string;
  value: string;
  icon: LucideIcon;
  external?: boolean;
};

type SocialItem = {
  href: string;
  label: string;
  icon: IconType;
};

const contactItems: ContactItem[] = [
  {
    href: "mailto:contato@nascimento.adv.br",
    label: "Enviar e-mail para o escritório",
    value: "contato@nascimento.adv.br",
    icon: Mail,
  },
  {
    href: "tel:+551130001234",
    label: "Ligar para o escritório",
    value: "(11) 3000-1234",
    icon: Phone,
  },
  {
    href: "https://wa.me/5511999999999",
    label: "Falar no WhatsApp",
    value: "(11) 99999-9999",
    icon: MessageCircle,
    external: true,
  },
];

const socialItems: SocialItem[] = [
  {
    href: "#",
    label: "Instagram da Nascimento Advocacia",
    icon: FaInstagram,
  },
  {
    href: "#",
    label: "LinkedIn da Nascimento Advocacia",
    icon: FaLinkedin,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t bg-[var(--color-surface-dark-2)] text-[var(--color-text-inverse)] border-[var(--color-primary)]/30"
      aria-labelledby="footer-title"
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <section aria-labelledby="footer-title">
            <h2
              id="footer-title"
              className="mb-4 text-lg font-semibold text-[var(--color-text-inverse)]"
            >
              Nascimento Advocacia
            </h2>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
              Excelência, ética e dedicação em cada caso. Seu parceiro jurídico
              de confiança em São Paulo.
            </p>
          </section>

          <section aria-labelledby="footer-contact">
            <h3
              id="footer-contact"
              className="mb-4 text-base font-medium text-[var(--color-text-inverse)]"
            >
              Contato
            </h3>

            <ul className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark-2)]"
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="text-sm">{item.value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="footer-address">
            <h3
              id="footer-address"
              className="mb-4 text-base font-medium text-[var(--color-text-inverse)]"
            >
              Endereço
            </h3>

            <div className="mb-6 flex items-start gap-3 text-[var(--color-text-muted)]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <address className="not-italic text-sm leading-relaxed">
                Av. Fictícia, 1 - 12º andar
                <br />
                Vila Inventada, São Paulo - SP
                <br />
                CEP 01111-111
              </address>
            </div>

            <div className="flex gap-4">
              {socialItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark-2)]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {currentYear} Nascimento Advocacia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
