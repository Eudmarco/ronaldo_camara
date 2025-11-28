import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const categories = ['All', 'Fashion', 'Portrait', 'Lifestyle', 'Campaign'];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const handleShareFacebook = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();
    const url = encodeURIComponent(imageUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareTwitter = (e: React.MouseEvent, title: string, imageUrl: string) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Check out "${title}" by Ronaldo Camara`);
    const url = encodeURIComponent(imageUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleInstagram = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();
    // Since Instagram web doesn't support direct sharing via URL, we copy the link
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert("Link da imagem copiado! Pronto para postar.");
    });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl serif-font mb-4">Galeria Selecionada</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore uma coleção com curadoria dos melhores momentos, estilos e emoções.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm uppercase tracking-widest pb-1 transition-all duration-300 ${
                filter === cat 
                  ? 'text-black border-b border-black font-semibold' 
                  : 'text-gray-400 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[9/16]">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Background */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Share Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100 z-10">
                    <button 
                      onClick={(e) => handleShareFacebook(e, project.imageUrl)}
                      className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-sm transition-all shadow-lg"
                      title="Compartilhar no Facebook"
                    >
                      <Facebook size={16} />
                    </button>
                    <button 
                      onClick={(e) => handleShareTwitter(e, project.title, project.imageUrl)}
                      className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-sm transition-all shadow-lg"
                      title="Compartilhar no Twitter"
                    >
                      <Twitter size={16} />
                    </button>
                    <button 
                      onClick={(e) => handleInstagram(e, project.imageUrl)}
                      className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-sm transition-all shadow-lg"
                      title="Copiar Link para Instagram"
                    >
                      <Instagram size={16} />
                    </button>
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl serif-font">{project.title}</h3>
                    <p className="text-xs uppercase tracking-widest opacity-80">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;