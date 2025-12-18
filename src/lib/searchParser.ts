// Lista de cidades brasileiras cadastradas (normalizada)
const CITY_NAMES = [
  'Recife', 'Natal', 'São Paulo', 'Rio de Janeiro', 'Salvador', 
  'Fortaleza', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Brasília',
  'Manaus', 'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís',
  'São Gonçalo', 'Maceió', 'Duque de Caxias', 'Campo Grande', 'Teresina',
  'João Pessoa', 'Osasco', 'Jaboatão dos Guararapes', 'Ribeirão Preto',
  'Uberlândia', 'Contagem', 'Sorocaba', 'Aracaju', 'Feira de Santana',
  'Cuiabá', 'Joinville', 'Aparecida de Goiânia', 'Londrina', 'Niterói',
  'Ananindeua', 'Porto Velho', 'Serra', 'Caxias do Sul', 'Macapá',
  'Florianópolis', 'Santos', 'Mauá', 'Betim', 'São José dos Campos',
  'Olinda', 'Caruaru', 'Petrolina', 'Cabo de Santo Agostinho', 'Paulista'
];

// Separadores comuns que usuários podem usar
const SEPARATORS = [' em ', ' - ', ', ', ' na cidade de ', ' na ', ' no '];

/**
 * Remove acentos de uma string para comparação
 */
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normaliza string para comparação (lowercase + sem acentos)
 */
function normalize(str: string): string {
  return removeAccents(str.toLowerCase().trim());
}

/**
 * Verifica se duas strings são equivalentes (ignorando acentos e case)
 */
function isMatch(str1: string, str2: string): boolean {
  return normalize(str1) === normalize(str2);
}

/**
 * Encontra uma cidade no final da query string
 */
function findCityAtEnd(query: string): { niche: string; city: string } | null {
  const normalizedQuery = normalize(query);
  
  // Ordena cidades por tamanho (maior primeiro) para evitar match parcial
  // Ex: "São Paulo" antes de "Paulo"
  const sortedCities = [...CITY_NAMES].sort((a, b) => b.length - a.length);
  
  for (const city of sortedCities) {
    const normalizedCity = normalize(city);
    
    if (normalizedQuery.endsWith(normalizedCity)) {
      // Extrai o nicho (tudo antes da cidade)
      const nicheEndIndex = query.length - city.length;
      let niche = query.slice(0, nicheEndIndex).trim();
      
      // Remove caracteres de conexão finais como espaços, vírgulas
      niche = niche.replace(/[\s,\-]+$/, '').trim();
      
      if (niche.length > 0) {
        return { niche, city };
      }
    }
  }
  
  return null;
}

/**
 * Valida se a cidade encontrada existe na lista
 */
function validateCity(cityInput: string): string | null {
  for (const city of CITY_NAMES) {
    if (isMatch(cityInput, city)) {
      return city; // Retorna o nome correto com acentuação
    }
  }
  return null;
}

export interface ParseResult {
  success: boolean;
  niche?: string;
  city?: string;
  error?: string;
  suggestion?: string;
}

/**
 * Parser inteligente de busca
 * Reconhece múltiplos formatos:
 * - "farmácia em recife"
 * - "salao de beleza recife"
 * - "chaveiro, natal"
 * - "pet shop - são paulo"
 */
export function parseSearchQuery(query: string): ParseResult {
  const trimmedQuery = query.trim();
  
  if (!trimmedQuery) {
    return {
      success: false,
      error: 'Por favor, digite seu segmento e cidade'
    };
  }

  // 1. Primeiro tenta com separadores explícitos
  for (const sep of SEPARATORS) {
    const sepIndex = trimmedQuery.toLowerCase().indexOf(sep.toLowerCase());
    if (sepIndex > 0) {
      const niche = trimmedQuery.slice(0, sepIndex).trim();
      const cityInput = trimmedQuery.slice(sepIndex + sep.length).trim();
      
      if (niche && cityInput) {
        const validatedCity = validateCity(cityInput);
        if (validatedCity) {
          return { success: true, niche, city: validatedCity };
        }
        // Cidade não encontrada, mas formato correto
        return {
          success: false,
          error: `Cidade "${cityInput}" não encontrada`,
          suggestion: `Tente: ${niche} em Recife, São Paulo, Salvador...`
        };
      }
    }
  }

  // 2. Tenta encontrar cidade no final da string
  const cityMatch = findCityAtEnd(trimmedQuery);
  if (cityMatch) {
    const validatedCity = validateCity(cityMatch.city);
    if (validatedCity) {
      return { success: true, niche: cityMatch.niche, city: validatedCity };
    }
  }

  // 3. Não conseguiu parsear - dá dica ao usuário
  return {
    success: false,
    error: 'Não consegui identificar a cidade',
    suggestion: 'Tente: farmácia em Recife, salão de beleza São Paulo...'
  };
}
