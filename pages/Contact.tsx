import React from 'react';
import { BUDGET_OPTIONS } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 text-center">
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">Fique por dentro</span>
          <h1 className="text-4xl md:text-5xl serif-font mb-4">Vamos Conversar?</h1>
          <p className="text-gray-500">Solicite um orçamento para o seu projeto.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image / Info Side */}
          <div className="hidden lg:block relative h-full min-h-[600px]">
            <img 
              src="https://picsum.photos/800/1200?random=99" 
              alt="Photographer at work" 
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-white/80" />
                  <span>ronaldo@ronaldocamara.com.br</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-white/80" />
                  <span>+55 (21) 98292-9292</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-white/80" />
                  <span>Rio de Janeiro, RJ - Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl serif-font mb-8">Solicite um Orçamento</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Nome*</label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">E-mail*</label>
                <input 
                  type="email" 
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Telefone*</label>
                <input 
                  type="tel" 
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Orçamento Estimado</label>
                <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-white">
                  <option value="" disabled selected>Selecione uma faixa de valor</option>
                  {BUDGET_OPTIONS.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Mensagem</label>
                <textarea 
                  rows={4}
                  className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Conte um pouco sobre o seu projeto..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-4 uppercase tracking-widest font-bold text-sm hover:bg-neutral-800 transition-colors"
              >
                Enviar Solicitação
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;