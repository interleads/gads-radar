import React, { useEffect, useState, useRef } from 'react';
import { DollarSign, Users, Briefcase, Star } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * end);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('pt-BR');

  return (
    <span ref={ref}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

const AuthoritySection: React.FC = () => {
  const stats = [
    {
      icon: DollarSign,
      value: 2,
      prefix: 'R$ ',
      suffix: ' Mi+',
      label: 'Verba Gerenciada',
      description: 'em campanhas otimizadas',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/30',
    },
    {
      icon: Users,
      value: 15000,
      prefix: '+',
      suffix: '',
      label: 'Leads Gerados',
      description: 'para nossos clientes',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/30',
    },
    {
      icon: Briefcase,
      value: 120,
      prefix: '+',
      suffix: '',
      label: 'Projetos Ativos',
      description: 'em todo o Brasil',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/30',
    },
    {
      icon: Star,
      value: 4.9,
      prefix: '',
      suffix: '/5',
      label: 'Satisfação',
      description: 'avaliação dos clientes',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/30',
      decimals: 1,
    },
  ];

  const partners = [
    { name: 'Google Ads', initials: 'G' },
    { name: 'Meta Ads', initials: 'M' },
    { name: 'Analytics', initials: 'A' },
    { name: 'IFRN', initials: 'IFRN' },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 navy-gradient" />
      <div className="absolute inset-0 tech-grid-bg" />
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-400 text-sm font-medium mb-4">
            Resultados Comprovados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Números que{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              impõem respeito
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Anos de experiência transformados em resultados mensuráveis para nossos clientes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative pricing-card p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.borderColor} border mb-4`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>

              {/* Number */}
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                <AnimatedCounter 
                  end={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>

              {/* Label */}
              <h3 className="text-white font-semibold text-lg mb-1">
                {stat.label}
              </h3>
              <p className="text-slate-400 text-sm">
                {stat.description}
              </p>

              {/* Hover Glow */}
              <div className={`absolute inset-0 rounded-2xl ${stat.bgColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="border-t border-white/10 pt-12">
          <p className="text-center text-slate-500 text-sm uppercase tracking-wider mb-8">
            Certificados e Parcerias
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{partner.initials}</span>
                </div>
                <span className="text-white/70 font-medium hidden sm:inline">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
