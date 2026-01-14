import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: 'public',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Force lodash to resolve to lodash-es
      "lodash": "lodash-es"
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React - keep together for better caching
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          
          // Radix UI components - bundle together
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix';
          }
          
          // UI essentials
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          
          // Forms - only when needed
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform') || id.includes('node_modules/zod')) {
            return 'vendor-forms';
          }
          
          // Utils - lightweight
          if (id.includes('node_modules/date-fns') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge') || id.includes('node_modules/lodash')) {
            return 'vendor-utils';
          }
          
          // i18n
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'vendor-i18n';
          }
          
          // Analytics and monitoring
          if (id.includes('node_modules/react-ga4') || id.includes('node_modules/web-vitals')) {
            return 'vendor-analytics';
          }
          
          // Produtos pages - chunk separado para melhor code splitting
          if (id.includes('/pages/produtos/')) {
            return 'pages-produtos';
          }
          
          // Soluções pages - chunk separado
          if (id.includes('/pages/solucoes/')) {
            return 'pages-solucoes';
          }
          
          // Outras páginas menos críticas
          if (id.includes('/pages/') && !id.includes('/pages/Index') && !id.includes('/pages/Servicos') && !id.includes('/pages/Contato')) {
            return 'pages-other';
          }
        },
        // Ensure favicon is copied correctly
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'favicon.ico') {
            return 'favicon.ico';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    minify: 'esbuild',
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    target: 'es2020',
    outDir: 'dist',
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot',
      'lodash-es',
      'react-is',
      'recharts'
    ],
    exclude: ['framer-motion', '@emailjs/browser'],
  },
}));
