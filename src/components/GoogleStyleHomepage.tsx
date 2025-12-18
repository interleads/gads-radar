import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { parseSearchQuery } from '@/lib/searchParser';

interface GoogleStyleHomepageProps {
  onSearch: (niche: string, location: string) => void;
  isLoading: boolean;
}

const GoogleStyleHomepage: React.FC<GoogleStyleHomepageProps> = ({
  onSearch,
  isLoading
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = parseSearchQuery(query);
    
    if (!result.success) {
      if (result.suggestion) {
        toast.error(result.error, {
          description: result.suggestion
        });
      } else {
        toast.error(result.error || 'Erro ao processar busca');
      }
      return;
    }
    
    onSearch(result.niche!, result.city!);
  };
  return <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-[20px]">
      <div className="mb-8">
        <div className="flex items-end">
          <span className="text-5xl font-medium">
            <img alt="G logo" className="h-14 w-14 object-contain" src="https://logopng.com.br/logos/google-37.svg" />
          </span>
          <div className="ml-2 pb-1">
            <span className="text-gray-600 font-normal text-4xl">Ads</span>
            <span className="text-gray-900 font-medium ml-1 text-4xl">Radar</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-800 mb-6 text-lg font-medium px-[21px] py-0 text-center">
        Descubra se sua empresa está perdendo vendas!
      </p>
      
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <Input className="pl-12 pr-12 py-6 h-14 rounded-full border border-gray-200 shadow-sm hover:shadow-md focus-visible:shadow-md transition-shadow text-base" placeholder="Digite o seu segmento + cidade (Ex: farmácia em Natal)" value={query} onChange={e => setQuery(e.target.value)} />
            <Mic className="absolute right-4 text-blue-500 cursor-pointer" size={20} />
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button type="submit" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-normal py-2 px-6 rounded-md border-none" disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Pesquisar'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default GoogleStyleHomepage;