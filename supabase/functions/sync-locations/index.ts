import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const login = Deno.env.get('DATAFORSEO_LOGIN');
    const password = Deno.env.get('DATAFORSEO_PASSWORD');
    const creds = btoa(`${login}:${password}`);

    // Buscar todas as localizações do Brasil da API DataForSEO
    const response = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/locations', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${creds}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('DataForSEO locations response status:', response.status);

    if (data.status_code !== 20000) {
      return new Response(JSON.stringify({ error: 'Erro ao buscar localizações', details: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }

    // Filtrar apenas localizações do Brasil (country_iso_code = 'BR')
    const brazilLocations = data.tasks?.[0]?.result?.filter(
      (loc: any) => loc.country_iso_code === 'BR' && loc.location_type === 'DMA Region'
    ) || [];

    // Também buscar cidades específicas (não apenas DMA Regions)
    const allBrazilLocations = data.tasks?.[0]?.result?.filter(
      (loc: any) => loc.country_iso_code === 'BR'
    ) || [];

    console.log(`Found ${allBrazilLocations.length} Brazil locations total`);
    console.log(`Found ${brazilLocations.length} DMA Regions`);

    // Buscar cidades específicas por nome
    const targetCities = [
      'Maceio', 'Maceió',
      'Sao Paulo', 'São Paulo',
      'Rio de Janeiro',
      'Belo Horizonte',
      'Brasilia', 'Brasília',
      'Curitiba',
      'Salvador',
      'Fortaleza',
      'Recife',
      'Porto Alegre',
      'Manaus',
      'Goiania', 'Goiânia',
      'Campinas',
      'Campo Grande',
      'Cuiaba', 'Cuiabá',
      'Natal',
      'Joao Pessoa', 'João Pessoa',
      'Aracaju',
      'Teresina',
      'Vitoria', 'Vitória',
      'Florianopolis', 'Florianópolis'
    ];

    const matchedCities: any[] = [];

    for (const loc of allBrazilLocations) {
      const locName = loc.location_name.toLowerCase();
      for (const city of targetCities) {
        if (locName.includes(city.toLowerCase())) {
          matchedCities.push({
            name: loc.location_name,
            location_code: loc.location_code,
            location_type: loc.location_type,
            geo_name: loc.geo_name || loc.location_name
          });
        }
      }
    }

    // Remover duplicatas
    const uniqueCities = matchedCities.reduce((acc, curr) => {
      const exists = acc.find((c: any) => c.location_code === curr.location_code);
      if (!exists) acc.push(curr);
      return acc;
    }, []);

    console.log('Matched cities:', JSON.stringify(uniqueCities, null, 2));

    return new Response(JSON.stringify({ 
      success: true,
      total_brazil_locations: allBrazilLocations.length,
      dma_regions: brazilLocations.length,
      matched_cities: uniqueCities,
      all_brazil_locations: allBrazilLocations.map((loc: any) => ({
        name: loc.location_name,
        code: loc.location_code,
        type: loc.location_type
      }))
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
