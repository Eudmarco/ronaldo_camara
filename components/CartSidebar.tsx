import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Sidebar */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl serif-font font-bold">Seu Carrinho ({items.length})</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <p className="text-gray-500">Seu carrinho está vazio.</p>
                  <button onClick={toggleCart} className="text-sm uppercase font-bold underline">
                    Continuar comprando
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="serif-font font-medium">{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{item.dimensions}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">R$ {item.price.toFixed(2)}</span>
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button 
                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
                             className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={toggleCart}
                  className="w-full bg-black text-white py-4 flex items-center justify-center gap-2 uppercase text-sm font-bold tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Finalizar Compra <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;