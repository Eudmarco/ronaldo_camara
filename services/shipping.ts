import { ShippingQuote } from '../types';

// Mock function to simulate Melhor Envio API response
// Origin: Rio de Janeiro (CEP start 20... - 28...)
export const calculateFreight = async (cep: string): Promise<ShippingQuote[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cleanCep = cep.replace(/\D/g, '');
      
      if (cleanCep.length !== 8) {
        resolve([]);
        return;
      }

      // Logic to simulate price based on region
      // RJ (Local)
      const isRJ = cleanCep.startsWith('2');
      // SP (Neighbor)
      const isSP = cleanCep.startsWith('0') || cleanCep.startsWith('1');
      
      let basePricePAC = 25.00;
      let basePriceSEDEX = 45.00;

      if (isRJ) {
        basePricePAC = 18.50;
        basePriceSEDEX = 28.90;
      } else if (isSP) {
        basePricePAC = 32.00;
        basePriceSEDEX = 55.00;
      } else {
        // Other regions
        basePricePAC = 45.00;
        basePriceSEDEX = 89.00;
      }

      resolve([
        {
          name: 'PAC',
          carrier: 'Correios',
          price: basePricePAC,
          days: isRJ ? 3 : isSP ? 5 : 8
        },
        {
          name: 'SEDEX',
          carrier: 'Correios',
          price: basePriceSEDEX,
          days: isRJ ? 1 : isSP ? 2 : 4
        },
        {
          name: 'JadLog .Package',
          carrier: 'JadLog',
          price: basePricePAC * 1.1,
          days: isRJ ? 2 : isSP ? 4 : 7
        }
      ]);
    }, 1500); // 1.5s delay to simulate API request
  });
};