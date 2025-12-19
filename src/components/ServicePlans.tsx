import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, MapPin, AlertTriangle, Sparkles } from 'lucide-react';

interface Plan {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  setupFee: number;
  setupFree: boolean;
  savings: number | null;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'ghost' | 'success' | 'success-lg';
  isFeatured: boolean;
  tag: string | null;
}

const ServicePlans: React.FC = () => {
  const plans: Plan[] = [
    {
      id: 'mensal',
      title: 'Flexível',
      subtitle: '(Mensal)',
      price: 649,
      setupFee: 1000,
      setupFree: false,
      savings: null,
      description: 'Sem fidelidade. Ideal para testes de curto prazo.',
      features: [
        'Criação de Landing Page Local',
        'Gestão de Google Ads (Pesquisa)',
        'Relatório Básico'
      ],
      buttonText: 'Contratar Mensal',
      buttonVariant: 'ghost',
      isFeatured: false,
      tag: null
    },
    {
      id: 'semestral',
      title: 'Semestral',
      price: 589,
      setupFee: 1000,
      setupFree: true,
      savings: 1360,
      description: 'Contrato de 6 meses.',
      features: [
        'Tudo do plano Mensal',
        'Otimização de Perfil de Empresa (GMB)',
        'Suporte Prioritário'
      ],
      buttonText: 'Aproveitar Setup Grátis',
      buttonVariant: 'success',
      isFeatured: false,
      tag: 'Setup Grátis'
    },
    {
      id: 'anual',
      title: 'Anual',
      price: 519,
      setupFee: 1000,
      setupFree: true,
      savings: 2560,
      description: 'Contrato de 12 meses. Domine seu mercado local.',
      features: [
        'Site Institucional Completo',
        'Gestão Google Ads + Remarketing',
        'Consultoria de Vendas (Script para leads)',
        'Isenção Total de Setup'
      ],
      buttonText: 'Garantir Oferta Anual',
      buttonVariant: 'success-lg',
      isFeatured: true,
      tag: 'Parceiro de Negócios (Recomendado)'
    }
  ];

  const handleContactClick = (planId: string) => {
    const messages: Record<string, string> = {
      mensal: 'Olá! Tenho interesse no plano Flexível (Mensal) da Interleads.',
      semestral: 'Olá! Quero aproveitar o Setup Grátis do plano Semestral!',
      anual: 'Olá! Quero garantir a oferta do plano Anual com todos os benefícios!'
    };
    window.open(
      `https://wa.me/5500000000000?text=${encodeURIComponent(messages[planId] || 'Olá!')}`,
      '_blank'
    );
  };

  return (
    <section className="py-20 navy-gradient tech-grid-bg relative overflow-hidden">
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span className="text-white/90 text-sm font-medium">
              Exclusivo para Negócios Locais e Prestadores de Serviço
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Invista no crescimento do seu negócio
          </h2>
          <p className="text-lg text-slate-300">
            Escolha o tempo de parceria ideal. Quanto maior o compromisso, maior o benefício.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${
                plan.isFeatured ? 'pricing-card-featured md:-mt-4 md:mb-4' : 'pricing-card'
              } p-6 lg:p-8 relative`}
            >
              {/* Tag */}
              {plan.tag && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${
                  plan.isFeatured 
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-900' 
                    : 'bg-emerald-500 text-white'
                } px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-1.5`}>
                  {plan.isFeatured && <Sparkles className="h-3.5 w-3.5" />}
                  {plan.tag}
                </div>
              )}

              {/* Title */}
              <div className="text-center pt-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">
                    {plan.title} {plan.subtitle && <span className="font-normal text-slate-300">{plan.subtitle}</span>}
                  </h3>
                </div>
                
                {/* Price */}
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold text-white">R$ {plan.price}</span>
                  <span className="text-sm text-slate-400">/mês</span>
                </div>
              </div>

              {/* Setup Fee */}
              <div className={`rounded-xl p-4 mb-6 ${
                plan.setupFree 
                  ? 'bg-emerald-500/10 border border-emerald-500/30' 
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                {plan.setupFree ? (
                  <div className="text-center">
                    <span className="text-slate-400 line-through text-sm">R$ {plan.setupFee}</span>
                    <span className="ml-2 text-emerald-400 font-bold text-lg animate-pulse-glow">GRÁTIS</span>
                    <p className="text-xs text-slate-400 mt-1">Taxa de Setup</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-center">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <div>
                      <span className="text-red-400 font-semibold">+ R$ {plan.setupFee}</span>
                      <span className="text-slate-400 text-sm ml-1">de Setup Inicial</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Savings */}
              {plan.savings && (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 mb-6 text-center">
                  <span className="text-emerald-400 font-bold">
                    💰 Economize R$ {plan.savings.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-slate-300 text-sm ml-1">
                    {plan.id === 'anual' ? 'no 1º ano!' : 'no total'}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-slate-300 text-sm text-center mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                onClick={() => handleContactClick(plan.id)}
                className={`w-full ${
                  plan.buttonVariant === 'ghost'
                    ? 'bg-transparent border border-white/30 text-white hover:bg-white/10'
                    : plan.buttonVariant === 'success-lg'
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg font-semibold'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {plan.isFeatured && <Check className="h-5 w-5 mr-2" />}
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-sm mt-12 max-w-2xl mx-auto">
          Todos os planos incluem Site + Gestão de Tráfego Pago. 
          O investimento em anúncios (verba Google) é à parte e definido em conjunto.
        </p>
      </div>
    </section>
  );
};

export default ServicePlans;
