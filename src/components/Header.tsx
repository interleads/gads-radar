
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6 text-brand-blue" />
          <h1 className="text-xl font-semibold text-brand-blue-900">AdWords Compass</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">Como funciona</a>
          <a href="#" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">Recursos</a>
          <a href="#" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">Preços</a>
          <a href="#" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">Contato</a>
        </nav>
        <Button variant="outline" className="hidden md:flex">
          Entrar
        </Button>
        <button className="block md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
