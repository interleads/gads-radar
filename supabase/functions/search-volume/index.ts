import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// 1. LISTA MESTRA DE NICHOS (O sistema corrige para estes termos)
const NICHOS_VALIDOS = [
  "farmacia", "farmácia de manipulação", "salão de beleza", 
  "oficina mecânica", "dentista", "clínica de estética", 
  "pizzaria", "advogado", "energia solar", "pet shop",
  "restaurante", "imobiliária", "academia", "contabilidade"
];

// Função simples de similaridade (Fuzzy Match)
function getSimilarity(str1: string, str2: string) {
  const bigrams = (str: string) => {
    const s = str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const v = new Array(Math.max(0, s.length - 1));
    for (let i = 0; i < v.length; i++) v[i] = s.slice(i, i + 2);
    return v;
  }
  const pairs1 = bigrams(str1);
  const pairs2 = bigrams(str2);
  const union = pairs1.length + pairs2.length;
  if (union === 0) return 0;
  let hit_count = 0;
  for (const x of pairs1) {
    for (const y of pairs2) {
      if (x === y) hit_count++;
    }
  }
  return (2.0 * hit_count) / union;
}

// Função para encontrar a cidade mais similar
function findBestCityMatch(cityName: string, availableCities: { name: string; dataforseo_id: number }[]): { city: { name: string; dataforseo_id: number } | null; score: number; suggestions: string[] } {
  let bestMatch: { name: string; dataforseo_id: number } | null = null;
  let bestScore = 0;
  const suggestions: string[] = [];

  for (const city of availableCities) {
    const score = getSimilarity(cityName, city.name);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = city;
    }
    // Collect top 5 suggestions for error message
    if (score > 0.3) {
      suggestions.push(city.name);
    }
  }

  // Sort suggestions by relevance and take top 5
  suggestions.sort((a, b) => getSimilarity(cityName, b) - getSimilarity(cityName, a));
  
  return { 
    city: bestScore >= 0.6 ? bestMatch : null, // Only auto-correct if very similar
    score: bestScore,
    suggestions: suggestions.slice(0, 5)
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { niche_query, city_name, state_code } = await req.json()
    
    console.log('Received request:', { niche_query, city_name, state_code });

    // Config do Supabase Admin (para ler o banco)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. CORREÇÃO DO NICHO (FUZZY MATCH)
    let melhor_nicho = niche_query;
    let maior_score = 0;

    NICHOS_VALIDOS.forEach(nicho => {
      const score = getSimilarity(niche_query, nicho);
      if (score > maior_score) {
        maior_score = score;
        melhor_nicho = nicho;
      }
    });
    // Se a similaridade for muito baixa, mantemos o original
    if (maior_score < 0.25) melhor_nicho = niche_query;
    
    console.log('Niche correction:', { original: niche_query, corrected: melhor_nicho, score: maior_score });

    // 2. BUSCAR CIDADES DISPONÍVEIS NO BANCO
    const { data: allCities, error: citiesError } = await supabaseClient
      .from('locations')
      .select('name, dataforseo_id');

    if (citiesError || !allCities || allCities.length === 0) {
      console.error('Error fetching cities:', citiesError);
      return new Response(JSON.stringify({ error: 'Erro ao buscar cidades disponíveis.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }

    // 3. BUSCAR CIDADE COM FUZZY MATCH
    const cityMatch = findBestCityMatch(city_name, allCities);
    
    console.log('City match result:', { 
      searched: city_name, 
      found: cityMatch.city?.name, 
      score: cityMatch.score,
      suggestions: cityMatch.suggestions 
    });

    if (!cityMatch.city) {
      // Cidade não encontrada - retorna sugestões
      const suggestionList = cityMatch.suggestions.length > 0 
        ? cityMatch.suggestions.join(', ') 
        : allCities.slice(0, 5).map(c => c.name).join(', ');
      
      return new Response(JSON.stringify({ 
        error: `Cidade "${city_name}" não encontrada. Tente: ${suggestionList}` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      });
    }
    
    const selectedCity = cityMatch.city;
    console.log('City selected:', selectedCity);

    // 4. CHAMAR DATAFORSEO API
    const login = Deno.env.get('DATAFORSEO_LOGIN');
    const password = Deno.env.get('DATAFORSEO_PASSWORD');
    const creds = btoa(`${login}:${password}`);

    const payload = [{
      "location_code": selectedCity.dataforseo_id,
      "language_code": "pt",
      "keywords": [
        melhor_nicho,
        `preço ${melhor_nicho}`,
        `melhor ${melhor_nicho}`
      ],
      "sort_by": "search_volume"
    }];
    
    console.log('DataForSEO payload:', payload);

    const dfsResponse = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${creds}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const dfsData = await dfsResponse.json();
    
    console.log('DataForSEO response status:', dfsResponse.status);

    return new Response(JSON.stringify({ 
      success: true,
      corrected_niche: melhor_nicho,
      data: dfsData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }
})
