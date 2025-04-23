
import { KeywordData } from '@/components/ResultsCard';

// Função para gerar dados realistas simulando a API do Google Ads
export const fetchKeywordData = (niche: string, cep: string): Promise<{
  keywords: KeywordData[];
  regionGrade: 'A' | 'B' | 'C' | 'D';
  regionName: string;
}> => {
  // Simulando o tempo de resposta da API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica para determinar a nota da região baseada no CEP
      // Aqui é apenas um exemplo - em produção seria determinado por dados reais
      const lastDigit = parseInt(cep.replace(/\D/g, '').slice(-1));
      
      let regionGrade: 'A' | 'B' | 'C' | 'D';
      if (lastDigit <= 2) regionGrade = 'A';
      else if (lastDigit <= 5) regionGrade = 'B';
      else if (lastDigit <= 8) regionGrade = 'C';
      else regionGrade = 'D';
      
      // Gera palavras-chave baseadas no nicho
      const keywordPrefixes = ['comprar', 'melhor', 'preço', '', 'onde encontrar', 'promoção'];
      const keywordSuffixes = ['perto de mim', 'online', 'barato', 'profissional', 'entrega'];
      
      // Gera entre 5 e 10 palavras-chave
      const keywordCount = 5 + Math.floor(Math.random() * 6);
      const keywords: KeywordData[] = [];
      
      for (let i = 0; i < keywordCount; i++) {
        // Seleciona um prefixo e sufixo aleatório, ou nenhum
        const usePrefix = Math.random() > 0.3;
        const useSuffix = Math.random() > 0.6;
        
        let keyword = '';
        if (usePrefix) {
          keyword += `${keywordPrefixes[Math.floor(Math.random() * keywordPrefixes.length)]} `;
        }
        
        keyword += niche;
        
        if (useSuffix) {
          keyword += ` ${keywordSuffixes[Math.floor(Math.random() * keywordSuffixes.length)]}`;
        }
        
        // Volume de busca entre 100 e 10000
        const searchVolume = 100 + Math.floor(Math.random() * 9900);
        
        // CPC entre R$ 1,00 e R$ 15,00
        const cpc = 1 + Math.random() * 14;
        
        // Concorrência baseada no volume e CPC
        let competition: 'Baixa' | 'Média' | 'Alta';
        if (searchVolume > 5000 || cpc > 10) {
          competition = 'Alta';
        } else if (searchVolume > 1000 || cpc > 5) {
          competition = 'Média';
        } else {
          competition = 'Baixa';
        }
        
        keywords.push({
          keyword,
          searchVolume,
          cpc,
          competition
        });
      }
      
      // Ordena por volume de busca (decrescente)
      keywords.sort((a, b) => b.searchVolume - a.searchVolume);
      
      // Simula nome da região baseado no CEP
      const regions = [
        'Centro', 'Zona Sul', 'Zona Norte', 'Zona Leste', 'Zona Oeste',
        'Região Metropolitana', 'Área Comercial', 'Bairro Residencial'
      ];
      const regionName = regions[Math.floor(Math.random() * regions.length)];
      
      resolve({
        keywords,
        regionGrade,
        regionName
      });
    }, 2000); // Simulando 2 segundos de tempo de resposta
  });
};
