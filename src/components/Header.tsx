
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b border-transparent">
      <div className="container py-4 flex justify-between items-center">
        <div className="invisible md:visible">
          {/* Left side - placeholder for layout balance */}
          <div className="space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Sobre</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Contato</a>
          </div>
        </div>
        
        <div className="md:absolute md:right-8 space-x-2 flex items-center">
          <Button variant="outline" className="text-sm border-0 hover:bg-gray-100">Entrar</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
