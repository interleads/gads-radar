import React from 'react';
import { Instagram, Linkedin, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const solutions = [
    { label: 'Site Profissional', href: '#' },
    { label: 'Tráfego Pago', href: '#' },
    { label: 'Consultoria', href: '#' },
    { label: 'Análise de Mercado', href: '#' },
  ];

  const company = [
    { label: 'Sobre Nós', href: '#' },
    { label: 'Nossa História (IFRN)', href: '#' },
    { label: 'Contato', href: '#' },
    { label: 'Trabalhe Conosco', href: '#' },
  ];

  const legal = [
    { label: 'Termos de Uso', href: '#' },
    { label: 'Política de Privacidade', href: '#' },
    { label: 'LGPD', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/5584999999999', label: 'WhatsApp' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
      <div className="absolute inset-0 tech-grid-bg opacity-30" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-3">
                INTER<span className="text-emerald-400">LEADS</span>
              </h3>
              <p className="text-slate-400 mb-6 max-w-sm">
                Transformando dados em faturamento. Especialistas em tráfego pago para negócios locais que querem dominar sua região.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Natal/RN - Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">contato@interleads.com.br</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">(84) 99999-9999</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Soluções
              </h4>
              <ul className="space-y-3">
                {solutions.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Empresa
              </h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3">
                {legal.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* CNPJ */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-slate-500 text-xs">
                  CNPJ: 00.000.000/0001-00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm text-center md:text-left">
                © {currentYear} Interleads Tecnologia. Nascida em Natal/RN para o mundo.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs">Incubada no</span>
                <span className="text-emerald-400 font-semibold text-xs">IFRN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
