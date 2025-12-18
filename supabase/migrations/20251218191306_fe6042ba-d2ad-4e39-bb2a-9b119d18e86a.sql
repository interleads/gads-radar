-- Habilitar RLS na tabela leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT anônimo (captura de leads públicos)
CREATE POLICY "Allow public lead capture" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);