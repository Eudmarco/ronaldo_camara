import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { HERO_SLIDES, PROJECTS } from '../constants';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Preload first image
  useEffect(() => {
    const img = new Image();
    img.src = HERO_SLIDES[0];
    img.onload = () => {
      setIsHeroLoaded(true);
    };
  }, []);

  // Auto-rotate slides only after load
  useEffect(() => {
    if (!isHeroLoaded) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHeroLoaded]);

  const featuredProjects = PROJECTS.slice(0, 3);

  // Animation variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Delays between Title -> Subtitle -> Button
        delayChildren: 0.3,   // Wait slightly before starting
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 }, // Start lower for more dramatic slide up
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth slide
      }
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        
        {/* Loading State */}
        <AnimatePresence>
          {!isHeroLoaded && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-white"
            >
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Carousel */}
        {HERO_SLIDES.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHeroLoaded && index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={slide} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Hero Content - Only renders when loaded */}
        {isHeroLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl text-white font-bold serif-font mb-6 tracking-tighter shadow-sm"
              >
                VISUAL IMPACT
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-white/90 tracking-widest uppercase mb-10 text-shadow"
              >
                Moda • Retrato • Lifestyle
              </motion.p>
              
              <motion.div variants={itemVariants}>
                 <Link 
                  to="/gallery" 
                  className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-semibold backdrop-blur-sm bg-white/5"
                >
                  Ver Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Featured Works Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">Destaques</span>
              <h2 className="text-3xl md:text-4xl serif-font">Trabalhos Recentes</h2>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-wide hover:text-gray-600 transition-colors">
              Ver Todos <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link to="/gallery" key={project.id} className="group cursor-pointer">
                <div className="overflow-hidden aspect-[3/4] mb-4">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl serif-font group-hover:text-gray-600 transition-colors">{project.title}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{project.category}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide border-b border-black pb-1">
              Ver Galeria Completa <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Teaser */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl serif-font mb-6">60 Anos de Excelência</h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Uma trajetória marcada por fotografar ícones, definir tendências e capturar a alma 
            por trás da fama. Conheça a história que construiu a autoridade por trás das lentes.
          </p>
          <Link 
            to="/legacy" 
            className="px-8 py-3 bg-neutral-900 text-white hover:bg-black transition-colors uppercase tracking-widest text-sm font-semibold"
          >
            Ler a História
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;