import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import GoogleStyleHomepage from '@/components/GoogleStyleHomepage';
import ResultsCard, { KeywordData } from '@/components/ResultsCard';
import ServicePlans from '@/components/ServicePlans';
import SkeletonLoader from '@/components/SkeletonLoader';
import LeadCaptureDialog from '@/components/LeadCaptureDialog';
import StartupSection from '@/components/StartupSection';
import AuthoritySection from '@/components/AuthoritySection';
import Footer from '@/components/Footer';
import { fetchKeywordData } from '@/services/api';
import { supabase } from '@/integrations/supabase/client';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [pendingResults, setPendingResults] = useState<{
    keywordsData: KeywordData[];
    regionGrade: 'A' | 'B' | 'C' | 'D';
    location: string;
    niche: string;
    regionName: string;
    primaryKeywordVolume: number;
    totalVolume: number;
    keywordCount: number;
    annualVolume: number;
  } | null>(null);
  const [results, setResults] = useState<typeof pendingResults>(null);
  const [showGoogleStyle, setShowGoogleStyle] = useState(true);

  const handleSearch = async (niche: string, location: string) => {
    setIsLoading(true);
    
    // Resetar resultados pendentes
    setPendingResults(null);

    // Delay de 2 segundos antes de abrir o popup
    setTimeout(() => {
      setShowLeadCapture(true);
    }, 2000);

    try {
      const data = await fetchKeywordData(niche, location);
      setPendingResults({
        keywordsData: data.keywords,
        regionGrade: data.regionGrade,
        location: location,
        niche: niche,
        regionName: data.regionName,
        primaryKeywordVolume: data.primaryKeywordVolume,
        totalVolume: data.totalVolume,
        keywordCount: data.keywordCount,
        annualVolume: data.annualVolume
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      toast.error('Ocorreu um erro ao consultar os dados. Por favor, tente novamente.');
      setShowLeadCapture(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadCapture = async (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      // Salvar lead no Supabase
      const { error } = await supabase
        .from('leads')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone
        });

      if (error) {
        console.error('Erro ao salvar lead:', error);
        toast.error('Erro ao salvar dados. Tente novamente.');
        return;
      }

      toast.success('Dados salvos com sucesso!');
    } catch (err) {
      console.error('Erro inesperado:', err);
    }

    setShowLeadCapture(false);
    
    if (pendingResults) {
      setResults(pendingResults);
      setSearchPerformed(true);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Efeito para fechar popup automaticamente quando dados chegarem após submit
  useEffect(() => {
    if (pendingResults && !isLoading && results) {
      setShowLeadCapture(false);
    }
  }, [pendingResults, isLoading, results]);

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
      
      <main className="flex-grow bg-slate-50">
        <GoogleStyleHomepage onSearch={handleSearch} isLoading={isLoading} />
        
        <LeadCaptureDialog 
          isOpen={showLeadCapture} 
          onClose={() => setShowLeadCapture(false)} 
          onSubmit={handleLeadCapture}
          isLoading={isLoading}
          hasData={pendingResults !== null && pendingResults.keywordsData.length > 0}
        />
        
        {searchPerformed && (
          <section id="results" className="py-12 md:py-16">
            <div className="container max-w-5xl mx-auto px-4">
              
              {isLoading ? (
                <SkeletonLoader />
              ) : results && (
                <ResultsCard 
                  location={results.location} 
                  niche={results.niche} 
                  keywordsData={results.keywordsData}
                  primaryKeywordVolume={results.primaryKeywordVolume}
                  totalVolume={results.totalVolume}
                  keywordCount={results.keywordCount}
                  annualVolume={results.annualVolume}
                />
              )}
            </div>
          </section>
        )}
        
        {/* StartupSection - DNA de Inovação IFRN */}
        <StartupSection />
        
        {/* AuthoritySection - Big Numbers e Parceiros */}
        <AuthoritySection />
        
        {/* ServicePlans - Oferta comercial (após busca) */}
        {searchPerformed && !isLoading && (
          <ServicePlans />
        )}
      </main>
      
      {/* Footer estruturado */}
      <Footer />
    </div>
  );
};

export default Index;