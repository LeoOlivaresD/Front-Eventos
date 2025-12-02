import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/Front-Eventos/',
  optimizeDeps: {
    exclude: ['msw/browser']
  },
  server: {
    middlewareMode: false,
  },
  preview: {
    port: 4173,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/setupTests.js',
  }
})