import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Add middleware to handle client-side routing
    middlewares: [
      (req, res, next) => {
        // Skip for API routes or static assets
        if (req.url?.startsWith('/api/') || req.url?.match(/\.(js|css|ico|png|jpg|jpeg|svg|gif)$/)) {
          return next();
        }
        // Rewrite all other routes to index.html
        req.url = '/index.html';
        next();
      },
    ],
  },
  // Add configuration for production builds
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});