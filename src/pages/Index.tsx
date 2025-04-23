
import React, { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import ResultsCard, { KeywordData } from '@/components/ResultsCard';
import ServicePlans from '@/components/ServicePlans';
import SkeletonLoader from '@/components/SkeletonLoader';
import { fetchKeywordData } from '@/services/api';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [results, setResults] = useState<{
    keywordsData: KeywordData[];
    regionGrade: 'A' | 'B' | 'C' | 'D';
    location: string;
    niche: string;
    regionName: string;
  } | null>(null);

  const handleSearch = async (niche: string, cep: string) => {
    setIsLoading(true);
    
    try {
      // Em um ambiente real, esta chamada seria para a API real do Google Ads
      const data = await fetchKeywordData(niche, cep);
      
      setResults({
        keywordsData: data.keywords,
        regionGrade: data.regionGrade,
        location: cep,
        niche: niche,
        regionName: data.regionName
      });
      
      setSearchPerformed(true);
      toast.success(`Análise concluída para ${niche} no CEP ${cep}`);
      
      // Rolagem suave até os resultados
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      toast.error('Ocorreu um erro ao consultar os dados. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mensagens personalizadas baseadas na nota
  const getRegionMessage = (grade: 'A' | 'B' | 'C' | 'D', regionName: string, niche: string) => {
    switch (grade) {
      case 'A':
        return `Excelente oportunidade! A concorrência em ${regionName} para ${niche} é favorável.`;
      case 'B':
        return `Boa oportunidade! Há espaço para anúncios eficientes em ${regionName} para ${niche}.`;
      case 'C':
        return `Oportunidade moderada. A concorrência em ${regionName} para ${niche} exige estratégia.`;
      case 'D':
        return `Concorrência elevada em ${regionName} para ${niche}. Requer estratégia especializada.`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {searchPerformed && (
          <section id="results" className="py-16">
            <div className="container">
              <h2 className="text-2xl font-bold text-center mb-8">Resultados da Análise</h2>
              
              {isLoading ? (
                <SkeletonLoader />
              ) : results && (
                <ResultsCard
                  regionGrade={{
                    grade: results.regionGrade,
                    message: getRegionMessage(results.regionGrade, results.regionName, results.niche)
                  }}
                  location={results.location}
                  niche={results.niche}
                  keywordsData={results.keywordsData}
                />
              )}
            </div>
          </section>
        )}
        
        {searchPerformed && !isLoading && (
          <ServicePlans />
        )}
      </main>
      
      <footer className="bg-brand-blue-900 text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold text-lg">AdWords Compass</p>
              <p className="text-sm text-gray-300">© {new Date().getFullYear()} Todos os direitos reservados</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:text-brand-blue-300 transition-colors">Termos de uso</a>
              <a href="#" className="text-sm hover:text-brand-blue-300 transition-colors">Política de privacidade</a>
              <a href="#" className="text-sm hover:text-brand-blue-300 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
