import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mapeamento manual das cidades principais do Brasil
// Baseado na lista oficial: https://api.dataforseo.com/v3/keywords_data/google_ads/locations/br
const CITY_MAPPING: Record<string, number> = {
  'Maceió': 1001506,
  'Manaus': 1001511,
  'Salvador': 1001533,
  'Fortaleza': 1001556,
  'Brasília': 1001563,
  'Vitória': 1001568,
  'Goiânia': 1001574,
  'São Luís': 1001584,
  'Belo Horizonte': 1001596,
  'Campo Grande': 1001612,
  'Cuiabá': 1001621,
  'Belém': 1001631,
  'João Pessoa': 1001634,
  'Curitiba': 1001640,
  'Recife': 1001643,
  'Teresina': 1001648,
  'Rio de Janeiro': 1001655,
  'Natal': 1001662,
  'Porto Alegre': 1001674,
  'Florianópolis': 1001688,
  'Aracaju': 1001695,
  'São Paulo': 1001773,
  'Campinas': 1001764,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const login = Deno.env.get('DATAFORSEO_LOGIN');
    const password = Deno.env.get('DATAFORSEO_PASSWORD');
    const creds = btoa(`${login}:${password}`);

    // Endpoint oficial para cidades brasileiras (GRATUITO)
    console.log('Fetching Brazil locations from DataForSEO...');
    const response = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/locations/br', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${creds}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('DataForSEO response status:', response.status);

    if (data.status_code !== 20000) {
      console.error('DataForSEO error:', data);
      return new Response(JSON.stringify({ error: 'Erro ao buscar localizações', details: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }

    // Filtrar apenas cidades (location_type = "City")
    const allLocations = data.tasks?.[0]?.result || [];
    const cities = allLocations.filter((loc: any) => loc.location_type === 'City');
    
    console.log(`Total locations in Brazil: ${allLocations.length}`);
    console.log(`Cities found: ${cities.length}`);

    // Criar mapa de cidades da API para busca rápida
    const apiCityMap = new Map<string, any>();
    for (const city of cities) {
      // Extrair nome da cidade (antes da primeira vírgula)
      const cityName = city.location_name.split(',')[0].trim();
      const normalizedName = cityName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      
      // Se já existe, preferir o que tem nome mais curto (mais específico)
      if (!apiCityMap.has(normalizedName) || 
          city.location_name.length < apiCityMap.get(normalizedName).location_name.length) {
        apiCityMap.set(normalizedName, city);
      }
    }

    console.log('API city map created with', apiCityMap.size, 'entries');

    // Inicializar Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar cidades existentes no banco
    const { data: existingCities, error: fetchError } = await supabase
      .from('locations')
      .select('*');

    if (fetchError) {
      console.error('Error fetching existing cities:', fetchError);
      return new Response(JSON.stringify({ error: 'Erro ao buscar cidades existentes', details: fetchError }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }

    console.log(`Existing cities in database: ${existingCities?.length || 0}`);

    // Atualizar cada cidade existente com o código correto
    const updates: any[] = [];
    const notFound: string[] = [];
    const alreadyCorrect: string[] = [];

    for (const city of existingCities || []) {
      // Primeiro, verificar mapeamento manual
      let correctCode = CITY_MAPPING[city.name];
      let matchSource = 'manual_mapping';

      // Se não encontrar no mapeamento manual, buscar na API
      if (!correctCode) {
        const cityNameNormalized = city.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const apiMatch = apiCityMap.get(cityNameNormalized);
        if (apiMatch) {
          correctCode = apiMatch.location_code;
          matchSource = 'api_exact_match';
        }
      }

      if (correctCode) {
        const oldCode = city.dataforseo_id;
        
        if (oldCode !== correctCode) {
          console.log(`Updating ${city.name}: ${oldCode} -> ${correctCode} (${matchSource})`);
          
          const { error: updateError } = await supabase
            .from('locations')
            .update({ dataforseo_id: correctCode })
            .eq('id', city.id);

          if (updateError) {
            console.error(`Error updating ${city.name}:`, updateError);
          } else {
            updates.push({
              city: city.name,
              oldCode,
              newCode: correctCode,
              source: matchSource
            });
          }
        } else {
          console.log(`${city.name} already has correct code: ${correctCode}`);
          alreadyCorrect.push(city.name);
        }
      } else {
        console.warn(`No match found for: ${city.name}`);
        notFound.push(city.name);
      }
    }

    console.log(`Updates completed: ${updates.length}`);
    console.log(`Already correct: ${alreadyCorrect.length}`);
    console.log(`Cities not found: ${notFound.length}`);

    // Buscar dados atualizados para confirmar
    const { data: updatedCities } = await supabase
      .from('locations')
      .select('name, dataforseo_id')
      .order('name');

    return new Response(JSON.stringify({ 
      success: true,
      total_brazil_cities_in_api: cities.length,
      existing_cities_in_db: existingCities?.length || 0,
      updates_made: updates.length,
      already_correct: alreadyCorrect.length,
      updates,
      not_found: notFound,
      current_state: updatedCities
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
