
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const ServicePlans: React.FC = () => {
  const plans = [
    {
      name: 'Básico',
      price: 'R$ 697',
      period: '/mês',
      description: 'Ideal para pequenas empresas iniciando no Google Ads',
      features: [
        'Gestão de até 50 palavras-chave',
        'Configuração inicial de campanha',
        'Relatório mensal de desempenho',
        'Otimização mensal de anúncios',
        'Suporte por e-mail'
      ],
      isPopular: false
    },
    {
      name: 'Avançado',
      price: 'R$ 997',
      period: '/mês',
      description: 'Perfeito para empresas em crescimento',
      features: [
        'Gestão de até 150 palavras-chave',
        'Configuração de campanhas múltiplas',
        'Relatórios semanais de desempenho',
        'Otimização semanal de anúncios',
        'Remarketing e públicos personalizados',
        'Suporte por e-mail e telefone'
      ],
      isPopular: true
    },
    {
      name: 'Profissional',
      price: 'R$ 1.497',
      period: '/mês',
      description: 'Para empresas que buscam máximos resultados',
      features: [
        'Gestão de palavras-chave ilimitadas',
        'Estratégia completa de funil de vendas',
        'Dashboard em tempo real',
        'Otimização contínua de campanhas',
        'Integrações com CRM e plataformas',
        'Relatórios personalizados',
        'Suporte prioritário 7 dias por semana'
      ],
      isPopular: false
    }
  ];

  const handleContactClick = () => {
    // Aqui você pode implementar o link para o WhatsApp
    window.open('https://wa.me/5500000000000?text=Olá!%20Estou%20interessado%20em%20saber%20mais%20sobre%20os%20planos%20de%20gestão%20de%20Google%20Ads.', '_blank');
  };

  return (
    <section className="py-16 bg-brand-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-brand-blue-800 mb-4">Pronto para começar a anunciar com estratégia?</h2>
          <p className="text-lg text-gray-600">
            Escolha o plano ideal para maximizar seus resultados no Google Ads com nossa gestão profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105 ${
                plan.isPopular ? 'border-2 border-brand-blue' : 'border border-gray-100'
              }`}
            >
              {plan.isPopular && (
                <div className="bg-brand-blue text-white py-2 px-4 text-center">
                  <span className="text-sm font-medium">Mais Popular</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleContactClick}
                  variant={plan.isPopular ? "default" : "outline"} 
                  className={`w-full ${plan.isPopular ? 'bg-brand-blue hover:bg-brand-blue-700' : 'border-brand-blue text-brand-blue hover:bg-brand-blue-50'}`}
                >
                  Falar com especialista
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePlans;
