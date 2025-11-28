import { Project, Product } from './types';

export const APP_NAME = "RONALDO CAMARA";

export const HERO_SLIDES = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
];

export const PROJECTS: Project[] = [
  { id: '1', title: 'Summer Vogue', category: 'Fashion', imageUrl: 'https://picsum.photos/720/1280?random=10' },
  { id: '2', title: 'Urban Soul', category: 'Portrait', imageUrl: 'https://picsum.photos/720/1280?random=11' },
  { id: '3', title: 'Velvet Night', category: 'Fashion', imageUrl: 'https://picsum.photos/720/1280?random=12' },
  { id: '4', title: 'Raw Emotion', category: 'Portrait', imageUrl: 'https://picsum.photos/720/1280?random=13' },
  { id: '5', title: 'Coastal Living', category: 'Lifestyle', imageUrl: 'https://picsum.photos/720/1280?random=14' },
  { id: '6', title: 'Golden Hour', category: 'Campaign', imageUrl: 'https://picsum.photos/720/1280?random=15' },
  { id: '7', title: 'Noir Series', category: 'Portrait', imageUrl: 'https://picsum.photos/720/1280?random=16' },
  { id: '8', title: 'Street Style', category: 'Fashion', imageUrl: 'https://picsum.photos/720/1280?random=17' },
];

export const LEGACY_GALLERY = [
  { id: 'l1', url: 'https://picsum.photos/800/1200?grayscale&random=101', caption: 'Backstage Vogue, 1985' },
  { id: 'l2', url: 'https://picsum.photos/1200/800?grayscale&random=102', caption: 'Editorial Paris, 1992' },
  { id: 'l3', url: 'https://picsum.photos/800/800?grayscale&random=103', caption: 'Retrato Studio, 1978' },
  { id: 'l4', url: 'https://picsum.photos/800/1200?grayscale&random=104', caption: 'Campanha Nacional, 1998' },
  { id: 'l5', url: 'https://picsum.photos/1200/800?grayscale&random=105', caption: 'Desfile SPFW, 2005' },
  { id: 'l6', url: 'https://picsum.photos/800/800?grayscale&random=106', caption: 'Acervo Pessoal' },
];

export const PRODUCTS: Product[] = [
  { id: '1', title: 'Mist Over Mountains', price: 450, dimensions: '60x90cm', imageUrl: 'https://picsum.photos/600/600?random=20' },
  { id: '2', title: 'Serenity Blue', price: 380, dimensions: '50x70cm', imageUrl: 'https://picsum.photos/600/600?random=21' },
  { id: '3', title: 'Urban Geometry', price: 520, dimensions: '80x120cm', imageUrl: 'https://picsum.photos/600/600?random=22' },
  { id: '4', title: 'Desert Silence', price: 450, dimensions: '60x90cm', imageUrl: 'https://picsum.photos/600/600?random=23' },
  { id: '5', title: 'Rio Golden Hour', price: 600, dimensions: '90x140cm', imageUrl: 'https://picsum.photos/600/600?random=24' },
  { id: '6', title: 'Abstract Nature I', price: 350, dimensions: '40x60cm', imageUrl: 'https://picsum.photos/600/600?random=25' },
  { id: '7', title: 'Parisian Morning', price: 480, dimensions: '60x90cm', imageUrl: 'https://picsum.photos/600/600?random=26' },
  { id: '8', title: 'Deep Ocean', price: 550, dimensions: '80x120cm', imageUrl: 'https://picsum.photos/600/600?random=27' },
  { id: '9', title: 'Vintage Soul', price: 420, dimensions: '50x75cm', imageUrl: 'https://picsum.photos/600/600?random=28' },
  { id: '10', title: 'Neon Nights', price: 490, dimensions: '70x100cm', imageUrl: 'https://picsum.photos/600/600?random=29' },
  { id: '11', title: 'Silent Forest', price: 390, dimensions: '50x70cm', imageUrl: 'https://picsum.photos/600/600?random=30' },
  { id: '12', title: 'Geometric Shadows', price: 460, dimensions: '60x90cm', imageUrl: 'https://picsum.photos/600/600?random=31' },
];

export const BUDGET_OPTIONS = [
  "Até R$ 5.000",
  "R$ 5.000 - R$ 15.000",
  "R$ 15.000 - R$ 30.000",
  "Acima de R$ 30.000"
];