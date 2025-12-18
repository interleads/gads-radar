import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SearchFormProps {
  onSearch: (niche: string, location: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [niche, setNiche] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!niche.trim()) {
      toast.error('Por favor, informe o nicho (ex: farmácia)');
      return;
    }
    
    if (!city.trim() || city.length < 3) {
      toast.error('Por favor, informe a cidade (ex: Natal)');
      return;
    }

    onSearch(niche, city);
  };

  return (
    <div className="bg-gradient-to-br from-brand-blue-800 to-brand-blue-600 text-white py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
            Descubra o potencial de anúncios do seu negócio
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Analise a concorrência e oportunidades no Google Ads para o seu nicho.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur p-4 md:p-6 rounded-xl shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="md:col-span-4">
                <label htmlFor="niche" className="block text-sm font-medium text-white/90 mb-1 text-left">
                  Nicho / Segmento
                </label>
                <Input
                  id="niche"
                  placeholder="Ex: farmácia, clínica estética, pet shop"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-white/90 mb-1 text-left">
                  Cidade
                </label>
                <div className="relative">
                  <Input
                    id="city"
                    placeholder="Ex: Natal, São Paulo"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pl-9"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                </div>
              </div>
              <div className="md:col-span-1 flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-brand-green hover:bg-brand-green-600 text-white h-10"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>Ver</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
