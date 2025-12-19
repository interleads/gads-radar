import React from 'react';
import { Atom, Building2, Microscope, BarChart3, TrendingUp } from 'lucide-react';

const StartupSection: React.FC = () => {
  const pillars = [
    { icon: Building2, label: 'IFRN', description: 'Incubação Oficial' },
    { icon: Microscope, label: 'Pesquisa', description: 'Base Científica' },
    { icon: BarChart3, label: 'Tecnologia', description: 'Dados Avançados' },
    { icon: TrendingUp, label: 'Resultados', description: 'ROI Comprovado' },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 navy-gradient" />
      <div className="absolute inset-0 tech-grid-bg" />
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Atom className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium text-sm">Incubada no IFRN</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              DNA de Inovação e{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Tecnologia Federal
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A Interleads não é apenas uma agência. Somos uma{' '}
              <span className="text-white font-semibold">startup nascida no ecossistema de inovação</span>{' '}
              do Instituto Federal do Rio Grande do Norte (IFRN). Unimos o{' '}
              <span className="text-emerald-400">rigor científico de dados</span> com a{' '}
              <span className="text-cyan-400">agressividade comercial</span> que seu negócio precisa.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Validação Científica</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-sm font-medium">Metodologia Comprovada</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Glassmorphism Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl scale-110" />
              
              {/* Main Card */}
              <div className="relative pricing-card p-8 rounded-3xl max-w-md">
                {/* IFRN Logo Placeholder */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-emerald-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-2">
                  Instituto Federal do RN
                </h3>
                <p className="text-slate-400 text-center text-sm mb-6">
                  Incubadora de Empresas de Base Tecnológica
                </p>

                {/* Pillars Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {pillars.map((pillar, index) => (
                    <div
                      key={index}
                      className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 cursor-default"
                    >
                      <pillar.icon className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-white font-semibold text-sm">{pillar.label}</p>
                      <p className="text-slate-400 text-xs">{pillar.description}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom Badge */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <Atom className="w-4 h-4 text-emerald-400" />
                    <span>Empresa de Base Tecnológica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupSection;
