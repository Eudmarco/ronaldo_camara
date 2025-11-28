export interface Project {
  id: string;
  title: string;
  category: 'Fashion' | 'Portrait' | 'Lifestyle' | 'Campaign';
  imageUrl: string;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  dimensions: string;
}

export interface NavItem {
  label: string;
  path: string;
  isStore?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingQuote {
  name: string;
  price: number;
  days: number;
  carrier: string;
}