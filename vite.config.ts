import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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
        manualChunks: {
          // Core React - keep together for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // UI essentials - bundle together for faster loading
          'vendor-ui': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-slot',
            '@radix-ui/react-select',
            'lucide-react'
          ],
          
          // Forms - only when needed
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Utils - lightweight
          'vendor-utils': ['date-fns', 'clsx', 'tailwind-merge', 'lodash-es']
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
