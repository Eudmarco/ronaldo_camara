import React from 'react';
import { Camera, Award, Star } from 'lucide-react';
import { LEGACY_GALLERY } from '../constants';
import { motion } from 'framer-motion';

const Legacy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">Sobre o Artista</span>
            <h1 className="text-5xl md:text-6xl serif-font mb-8 leading-tight">
              Uma Vida Através <br/><span className="italic text-gray-600">Das Lentes</span>
            </h1>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Há seis décadas, comecei minha jornada com uma câmera analógica e um sonho. 
                O que começou como uma paixão se transformou em um legado de captura da beleza humana.
              </p>
              <p>
                Minha filosofia sempre foi simples: a fotografia não é apenas sobre a luz, é sobre a conexão. 
                É sobre fazer a pessoa do outro lado da lente se sentir a versão mais poderosa de si mesma.
              </p>
              <p className="font-semibold text-black">
                "A verdadeira arte está em tornar o efêmero, eterno."
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
             {/* Styling the image to look classic/vintage */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 p-4 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full relative grayscale contrast-125">
                <img 
                  src="https://picsum.photos/800/1200?grayscale" 
                  alt="Portrait of the artist" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-sepia-0 opacity-20 pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Authority Stats */}
        <div className="bg-neutral-900 text-white py-16 px-8 mb-24 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Camera size={40} className="mb-4 text-gray-400" />
              <span className="text-4xl serif-font font-bold mb-2">60+</span>
              <span className="text-sm uppercase tracking-widest text-gray-400">Anos de Carreira</span>
            </div>
            <div className="flex flex-col items-center">
              <Award size={40} className="mb-4 text-gray-400" />
              <span className="text-4xl serif-font font-bold mb-2">500+</span>
              <span className="text-sm uppercase tracking-widest text-gray-400">Publicações</span>
            </div>
            <div className="flex flex-col items-center">
              <Star size={40} className="mb-4 text-gray-400" />
              <span className="text-4xl serif-font font-bold mb-2">Icon</span>
              <span className="text-sm uppercase tracking-widest text-gray-400">Status no Mercado</span>
            </div>
          </div>
        </div>

        {/* Historical Gallery */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">O Acervo</span>
            <h2 className="text-3xl md:text-4xl serif-font">Momentos Históricos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEGACY_GALLERY.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                key={item.id} 
                className="group relative overflow-hidden aspect-[4/5] bg-gray-100 cursor-pointer"
              >
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white serif-font italic text-lg">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl serif-font mb-12">O que dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <blockquote className="space-y-4">
              <p className="italic text-gray-600 text-lg">
                "Ronaldo não tira apenas fotos, ele cria obras de arte. Trabalhar com ele mudou a forma como me vejo."
              </p>
              <cite className="block font-bold not-italic text-sm uppercase tracking-wide">- Marina R., Modelo</cite>
            </blockquote>
            <blockquote className="space-y-4">
              <p className="italic text-gray-600 text-lg">
                "A experiência e a calma que ele traz para o set são incomparáveis. Um verdadeiro mestre."
              </p>
              <cite className="block font-bold not-italic text-sm uppercase tracking-wide">- Carlos D., Diretor Criativo</cite>
            </blockquote>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Legacy;