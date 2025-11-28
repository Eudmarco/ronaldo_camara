import React from 'react';
import { APP_NAME } from '../constants';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl serif-font tracking-widest mb-4">{APP_NAME}</h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Capturando a essência e o glamour há 60 anos. 
              Especialista em retratos, moda e campanhas de alto impacto.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
            </p>
            <p className="text-gray-600 text-[10px] mt-1">
              Design inspirado por Trumpas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;