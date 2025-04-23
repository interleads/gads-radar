
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SearchFormProps {
  onSearch: (niche: string, cep: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [niche, setNiche] = useState('');
  const [cep, setCep] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) {
      toast.error('Por favor, informe o nicho da sua empresa');
      return;
    }
    if (!cep || cep.replace(/\D/g, '').length !== 8) {
      toast.error('Por favor, informe um CEP válido');
      return;
    }
    onSearch(niche, cep);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5);
    }
    setCep(value);
  };

  return (
    <div className="bg-gradient-to-br from-brand-blue-800 to-brand-blue-600 text-white py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
            Descubra o potencial de anúncios do seu negócio
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Analise a concorrência e oportunidades no Google Ads para o seu nicho e região
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur p-4 md:p-6 rounded-xl shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="md:col-span-4">
                <label htmlFor="niche" className="block text-sm font-medium text-white/90 mb-1 text-left">
                  Nicho da sua empresa
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
                <label htmlFor="cep" className="block text-sm font-medium text-white/90 mb-1 text-left">
                  CEP de atuação
                </label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  value={cep}
                  onChange={handleCepChange}
                  maxLength={9}
                />
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
                      <span>Buscando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>Consultar</span>
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
