import React from 'react';
import { PRODUCTS } from '../constants';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Store: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl serif-font mb-4">Fine Art Store</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Leve a essência artística para o seu ambiente. Impressões de qualidade museológica, 
            assinadas e certificadas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-sm group hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="relative aspect-square overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
                  Fine Art
                </div>
              </div>
              <div className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg serif-font mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{product.dimensions} • Papel Algodão</p>
                  <p className="text-xl font-light mb-4">R$ {product.price.toFixed(2)}</p>
                </div>
                <button 
                  className="w-full py-2 border border-black text-black hover:bg-black hover:text-white transition-colors uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag size={14} />
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white p-8 md:p-12 text-center border border-gray-100">
           <h3 className="text-2xl serif-font mb-4">Envio & Qualidade</h3>
           <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
             Todas as obras são impressas sob demanda em papel fine art de alta gramatura, garantindo durabilidade de décadas. 
             O envio é realizado com embalagem reforçada via transportadora especializada (Melhor Envio), 
             assegurando que a arte chegue intacta até você.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Store;