-- Habilitar RLS na tabela locations (dados públicos de referência)
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de localizações
CREATE POLICY "Allow public read locations" 
ON public.locations 
FOR SELECT 
TO anon, authenticated
USING (true);