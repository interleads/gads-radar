import { KeywordData } from '@/components/ResultsCard';
import { supabase } from '@/integrations/supabase/client';

interface DataForSeoKeywordResult {
  keyword: string;
  search_volume: number;
  cpc: number;
  competition: string;
  competition_index: number;
  high_top_of_page_bid?: number;
  low_top_of_page_bid?: number;
}

export const fetchKeywordData = async (niche: string, locationName: string): Promise<{
  keywords: KeywordData[];
  regionGrade: 'A' | 'B' | 'C' | 'D';
  regionName: string;
  primaryKeywordVolume: number;
  totalVolume: number;
  keywordCount: number;
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

  // Volume preciso da keyword principal (agora no nível raiz da resposta)
  const primaryKeywordVolume = functionResponse.primary_keyword_volume || 0;
  const primaryKeywordData = functionResponse.primary_keyword_data;
  
  console.log('Primary keyword volume (from search_volume):', primaryKeywordVolume);
  console.log('Primary keyword data:', primaryKeywordData);

  // Formatar os dados das keywords relacionadas (keywords_for_keywords)
  const rawResults: DataForSeoKeywordResult[] = functionResponse.data.tasks[0].result || [];
  
  console.log('Raw results count:', rawResults.length);
  console.log('Sample result:', rawResults[0]);

  // A keyword corrigida pelo backend
  const correctedNiche = functionResponse.corrected_niche?.toLowerCase() || niche.toLowerCase();

  // Mapear todas as keywords
  const keywords: KeywordData[] = rawResults
    .filter(item => item.search_volume > 0) // Filtrar keywords com volume > 0
    .map((item: DataForSeoKeywordResult) => ({
      keyword: item.keyword,
      searchVolume: item.search_volume || 0,
      cpc: item.high_top_of_page_bid || item.cpc || 0, // Usar high_top_of_page_bid se disponível
      competition: getCompetitionLevel(item.competition, item.competition_index)
    }));

  // Ordenar por volume de busca (maior primeiro)
  keywords.sort((a, b) => b.searchVolume - a.searchVolume);

  // Calcular volume total
  const totalVolume = keywords.reduce((acc, curr) => acc + curr.searchVolume, 0);
  
  console.log('Total volume:', totalVolume);
  console.log('Keywords with volume:', keywords.length);

  // Calcular grade baseado no volume da keyword PRINCIPAL (não no total)
  let regionGrade: 'A' | 'B' | 'C' | 'D' = 'D';
  
  if (primaryKeywordVolume >= 10000) regionGrade = 'A';
  else if (primaryKeywordVolume >= 3000) regionGrade = 'B';
  else if (primaryKeywordVolume >= 500) regionGrade = 'C';

  // Limitar a 20 keywords para exibição
  const topKeywords = keywords.slice(0, 20);

  return {
    keywords: topKeywords,
    regionGrade,
    regionName: locationName,
    primaryKeywordVolume,
    totalVolume,
    keywordCount: keywords.length
  };
};

// Função auxiliar para determinar nível de competição
function getCompetitionLevel(competition: string, competitionIndex?: number): 'Alta' | 'Média' | 'Baixa' {
  // Se tiver competition_index numérico, usar ele
  if (typeof competitionIndex === 'number') {
    if (competitionIndex >= 67) return 'Alta';
    if (competitionIndex >= 33) return 'Média';
    return 'Baixa';
  }
  
  // Fallback para string
  if (competition === 'HIGH') return 'Alta';
  if (competition === 'LOW') return 'Baixa';
  if (competition === 'MEDIUM') return 'Média';
  
  // Se for número em string
  const numValue = parseFloat(competition);
  if (!isNaN(numValue)) {
    if (numValue > 0.6) return 'Alta';
    if (numValue < 0.3) return 'Baixa';
    return 'Média';
  }
  
  return 'Média';
}
