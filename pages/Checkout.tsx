import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { calculateFreight } from '../services/shipping';
import { ShippingQuote } from '../types';
import { Loader2, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [cep, setCep] = useState('');
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingQuote[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingQuote | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    city: '',
    state: ''
  });

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen text-center px-6">
        <h1 className="text-3xl serif-font mb-4">Seu carrinho está vazio</h1>
        <button onClick={() => navigate('/store')} className="text-black underline">Voltar para a loja</button>
      </div>
    );
  }

  const handleCalculateShipping = async () => {
    if (cep.length < 8) return;
    setLoadingShipping(true);
    setShippingOptions([]);
    setSelectedShipping(null);
    
    try {
      const quotes = await calculateFreight(cep);
      setShippingOptions(quotes);
    } catch (error) {
      console.error("Erro ao calcular frete", error);
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleCheckout = () => {
    if (!selectedShipping || !formData.name) {
      alert("Por favor, preencha os dados e selecione o frete.");
      return;
    }

    const message = `
*NOVO PEDIDO - RONALDO CAMARA FINE ART*
--------------------------------
*Cliente:* ${formData.name}
*Email:* ${formData.email}
*Endereço:* ${formData.address}, ${formData.number} - ${cep}

*Itens:*
${items.map(i => `- ${i.title} (${i.dimensions}) x${i.quantity}: R$ ${(i.price * i.quantity).toFixed(2)}`).join('\n')}

*Frete:* ${selectedShipping.name} (R$ ${selectedShipping.price.toFixed(2)})
*Total:* R$ ${(cartTotal + selectedShipping.price).toFixed(2)}
--------------------------------
Aguardo instruções de pagamento.
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5521982929292?text=${encodedMessage}`;
    
    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, '_blank');
    navigate('/');
  };

  const grandTotal = cartTotal + (selectedShipping?.price || 0);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl serif-font mb-12">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Personal Info */}
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">1. Seus Dados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    className="w-full border p-3 focus:outline-none focus:border-black"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-2">E-mail</label>
                  <input 
                    type="email" 
                    className="w-full border p-3 focus:outline-none focus:border-black"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Calc */}
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">2. Entrega (Melhor Envio)</h2>
              
              <div className="flex gap-4 items-end mb-6">
                 <div className="flex-1">
                    <label className="block text-xs uppercase text-gray-500 font-bold mb-2">CEP</label>
                    <input 
                      type="text" 
                      placeholder="00000-000"
                      className="w-full border p-3 focus:outline-none focus:border-black"
                      value={cep}
                      onChange={e => setCep(e.target.value)}
                      maxLength={9}
                    />
                 </div>
                 <button 
                  onClick={handleCalculateShipping}
                  disabled={loadingShipping || cep.length < 8}
                  className="bg-gray-900 text-white px-6 py-3 font-bold uppercase text-xs tracking-widest hover:bg-black disabled:opacity-50"
                 >
                   {loadingShipping ? <Loader2 className="animate-spin" /> : 'Calcular'}
                 </button>
              </div>

              {/* Shipping Options */}
              {shippingOptions.length > 0 && (
                <div className="space-y-3">
                  {shippingOptions.map((opt, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedShipping(opt)}
                      className={`border p-4 cursor-pointer flex justify-between items-center transition-all ${
                        selectedShipping?.name === opt.name 
                          ? 'border-black bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck size={20} className="text-gray-600" />
                        <div>
                          <p className="font-bold text-sm">{opt.name} <span className="text-gray-500 font-normal">via {opt.carrier}</span></p>
                          <p className="text-xs text-gray-500">Chega em até {opt.days} dias úteis</p>
                        </div>
                      </div>
                      <span className="font-bold">R$ {opt.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Details */}
            {selectedShipping && (
               <div className="bg-white p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2">3. Endereço de Entrega</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <input 
                        type="text" 
                        placeholder="Rua / Avenida" 
                        className="w-full border p-3"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Número" 
                        className="w-full border p-3"
                        value={formData.number}
                        onChange={e => setFormData({...formData, number: e.target.value})}
                      />
                    </div>
                 </div>
               </div>
            )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm sticky top-32">
              <h3 className="text-lg font-bold mb-6 border-b pb-4">Resumo do Pedido</h3>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.title} (x{item.quantity})</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Frete</span>
                  <span>{selectedShipping ? `R$ ${selectedShipping.price.toFixed(2)}` : '--'}</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>R$ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={!selectedShipping || !formData.name}
                className="w-full mt-8 bg-green-600 text-white py-4 uppercase font-bold tracking-widest hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Pagar via WhatsApp
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                O pagamento será combinado diretamente pelo WhatsApp. Aceitamos PIX e Cartão.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;