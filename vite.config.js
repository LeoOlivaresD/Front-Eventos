import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/Front-Eventos/',
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      // Agrega esta sección de exclusiones
      exclude: [
        'src/mocks/**', 
        'src/main.jsx', 
        '**/*.config.js', 
        '**/dist/**',
        '**/*.test.jsx',
        'src/index.css',
        'src/App.css'
      ]
    }
  }
})