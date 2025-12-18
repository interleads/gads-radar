-- Criar tabela para cache de buscas
CREATE TABLE public.search_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  niche TEXT NOT NULL,
  city_name TEXT NOT NULL,
  location_code INTEGER NOT NULL,
  
  -- Dados cacheados
  primary_keyword_volume INTEGER,
  primary_keyword_data JSONB,
  related_keywords JSONB,
  
  -- Controle de cache
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  hit_count INTEGER DEFAULT 0,
  
  -- Índice único para evitar duplicatas
  CONSTRAINT unique_niche_city UNIQUE (niche, city_name)
);

-- Índices para buscas rápidas
CREATE INDEX idx_cache_lookup ON public.search_cache (niche, city_name);
CREATE INDEX idx_cache_expiry ON public.search_cache (expires_at);

-- Habilitar RLS
ALTER TABLE public.search_cache ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (edge function usa service role)
CREATE POLICY "Cache readable by all" ON public.search_cache
  FOR SELECT USING (true);