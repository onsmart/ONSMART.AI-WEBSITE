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
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const setCookie = proxyRes.headers['set-cookie'];
            if (setCookie) {
              // Reescreve cookies para o cliente (remove Secure/Domain) e garante envio
              const rewritten = setCookie.map((cookie: string) =>
                cookie
                  .replace(/;\s*Secure/gi, '')
                  .replace(/Domain=[^;]+;?/gi, '')
              );
              proxyRes.headers['set-cookie'] = rewritten;
            }
          });
        },
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
      drop: [], // Enabled console for debugging
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
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot',
      'lodash-es',
      'react-is',
      'recharts'
    ],
    exclude: ['framer-motion', '@emailjs/browser'],
  },
}));
