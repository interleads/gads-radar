import { KeywordData } from '@/components/ResultsCard';
import { supabase } from '@/integrations/supabase/client';

interface DataForSeoResult {
  keyword: string;
  search_volume: number;
  cpc: number;
  competition: string;
}

export const fetchKeywordData = async (niche: string, locationName: string): Promise<{
  keywords: KeywordData[];
  regionGrade: 'A' | 'B' | 'C' | 'D';
  regionName: string;
}> => {
  
  console.log(`Buscando dados para: ${niche} em ${locationName}`);

  // Chamamos a Edge Function passando o nome da cidade direto
  const { data: functionResponse, error } = await supabase.functions.invoke('search-volume', {
    body: { 
      niche_query: niche, 
      city_name: locationName,
      state_code: ""
    }
  });

  if (error) {
    console.error('Erro na Edge Function:', error);
    throw new Error('Falha de conexão com o servidor.');
  }

  // Tratamento de erros vindos da própria função (ex: Cidade não encontrada)
  if (!functionResponse || functionResponse.error) {
    throw new Error(functionResponse?.error || 'Cidade não encontrada em nossa base. Tente verificar a grafia.');
  }

  if (!functionResponse.success || !functionResponse.data?.tasks?.[0]?.result) {
    throw new Error('Sem dados suficientes para esta análise.');
  }

  // Formatar os dados
  const rawResults = functionResponse.data.tasks[0].result;
  
  const keywords: KeywordData[] = rawResults.map((item: DataForSeoResult) => ({
    keyword: item.keyword,
    searchVolume: item.search_volume || 0,
    cpc: item.cpc || 0,
    competition: (item.competition === 'HIGH' || parseFloat(item.competition as string) > 0.6) ? 'Alta' 
               : (item.competition === 'LOW' || parseFloat(item.competition as string) < 0.3) ? 'Baixa' 
               : 'Média'
  }));

  keywords.sort((a, b) => b.searchVolume - a.searchVolume);

  const totalVolume = keywords.reduce((acc, curr) => acc + curr.searchVolume, 0);
  let regionGrade: 'A' | 'B' | 'C' | 'D' = 'D';
  
  if (totalVolume > 5000) regionGrade = 'A';
  else if (totalVolume > 2000) regionGrade = 'B';
  else if (totalVolume > 500) regionGrade = 'C';

  return {
    keywords,
    regionGrade,
    regionName: locationName
  };
};
