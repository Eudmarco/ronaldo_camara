import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Carrega variáveis de ambiente (necessário para API Keys, etc.)
    const env = loadEnv(mode, path.resolve(__dirname), '');
    
    return {
      // *** CONFIGURAÇÃO CRÍTICA PARA GITHUB PAGES ***
      // Define o subdiretório do repositório para carregar corretamente os assets (JS/CSS).
      // Isso é crucial porque o GitHub Pages hospeda o site em "seudominio.github.io/ronaldo-camara-portfolio/"
      base: '/ronaldo-camara/', 
      // ----------------------------------------------------------------------
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Define variáveis de ambiente para serem acessadas no código
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Configura o alias '@' para apontar para a raiz do projeto
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
