import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [niche, setNiche] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query from separate fields
    const query = city ? `${niche} em ${city}` : niche;
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

  return (
    <div className="navy-gradient tech-grid-bg min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 md:px-6 relative overflow-hidden">
      {/* Logo */}
      <div className="mb-8 z-10">
        <div className="flex items-end">
          <span className="text-5xl font-medium">
            <img 
              alt="G logo" 
              className="h-14 w-14 object-contain" 
              src="https://logopng.com.br/logos/google-37.svg" 
            />
          </span>
          <div className="ml-2 pb-1">
            <span className="text-slate-300 font-normal text-4xl">Ads</span>
            <span className="text-white font-medium ml-1 text-4xl">Radar</span>
          </div>
        </div>
      </div>
      
      {/* Title */}
      <h1 className="text-white mb-2 text-xl md:text-2xl font-semibold text-center z-10">
        Descubra se sua empresa está perdendo vendas!
      </h1>
      
      {/* Subtitle */}
      <p className="text-slate-300 mb-10 text-sm md:text-base text-center px-4 max-w-xl z-10">
        Digite seu serviço e sua cidade. Em 10 segundos, revelamos a demanda real que você não está aproveitando.
      </p>
      
      {/* Unified Search Bar - Capsule Style */}
      <div className="w-full max-w-3xl z-10">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-full shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden">
            {/* Niche Input */}
            <div className="flex-1 flex items-center px-5 py-4 md:py-0 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-gray-400 mr-3 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Nicho/Serviço (Ex: Advogado)"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
              />
            </div>
            
            {/* City Input */}
            <div className="flex-1 flex items-center px-5 py-4 md:py-0 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-gray-400 mr-3 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Cidade (Ex: Curitiba)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
              />
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base px-8 py-6 md:py-4 rounded-none md:rounded-r-full transition-colors"
            >
              {isLoading ? 'Analisando...' : 'Analisar'}
            </Button>
          </div>
        </form>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm z-10">
        <span className="opacity-60">Powered by Google Ads Data</span>
      </div>
    </div>
  );
};

export default GoogleStyleHomepage;
