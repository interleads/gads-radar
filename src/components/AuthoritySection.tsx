import React from 'react';
import { Users, BarChart, MapPin, Brain } from 'lucide-react';
const AuthoritySection: React.FC = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-brand-blue-800 mb-4">
            Mais de 300 empresas já analisaram seu potencial com o G Ads Radar
          </h2>
          <p className="text-gray-600 mb-8">
            Somos uma startup especializada em tráfego local e análise de mercado no Google Ads.
            Ajudamos empresas a investir com inteligência, analisando concorrência, volume de buscas e potencial de retorno por região e segmento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:transform hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Users className="w-6 h-6 text-brand-blue-600" />
              </div>
              <h3 className="font-bold text-lg">+300 empresas analisadas</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Experiência comprovada com centenas de negócios de diferentes segmentos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:transform hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <BarChart className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="font-bold text-lg">+5 milhões de buscas avaliadas</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Base de dados robusta para análise precisa de potencial de mercado.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:transform hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <MapPin className="w-6 h-6 text-brand-red-500" />
              </div>
              <h3 className="font-bold text-lg">Foco em negócios locais</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Especialistas em estratégias de tráfego pago para empresas com atuação regional.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:transform hover:scale-105 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Brain className="w-6 h-6 text-brand-yellow-500" />
              </div>
              <h3 className="font-bold text-lg">Metodologia validada</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Abordagem própria com resultados comprovados em diferentes mercados.
            </p>
          </div>
        </div>

        <div className="text-center">
          
        </div>
      </div>
    </section>;
};
export default AuthoritySection;