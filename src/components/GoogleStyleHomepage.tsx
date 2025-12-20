import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { parseSearchQuery } from '@/lib/searchParser';

const PLACEHOLDER_EXAMPLES = [
  "pizzaria em são paulo",
  "advogado em curitiba",
  "mecânico em recife",
  "farmácia em salvador"
];

interface GoogleStyleHomepageProps {
  onSearch: (niche: string, location: string) => void;
  isLoading: boolean;
}

const GoogleStyleHomepage: React.FC<GoogleStyleHomepageProps> = ({
  onSearch,
  isLoading
}) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (query.length > 0) return;

    const currentExample = PLACEHOLDER_EXAMPLES[placeholderIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedPlaceholder.length < currentExample.length) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(currentExample.slice(0, displayedPlaceholder.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1));
        }, 40);
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_EXAMPLES.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedPlaceholder, isTyping, placeholderIndex, query]);

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
      
      {/* Search Bar */}
      <div className="w-full max-w-2xl z-10">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          {/* Search Input */}
          <div className="w-full bg-white rounded-full shadow-2xl flex items-center px-5 py-4 relative">
            <Search className="text-gray-400 mr-3 flex-shrink-0" size={20} />
            <input
              type="text"
              placeholder={query.length === 0 ? displayedPlaceholder : ''}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
            />
            {query.length === 0 && (
              <span className="absolute left-12 text-gray-400 pointer-events-none animate-pulse">|</span>
            )}
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base px-10 py-3 rounded-full transition-colors shadow-lg"
          >
            {isLoading ? 'Analisando...' : 'Analisar'}
          </Button>
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
