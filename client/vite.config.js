import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/products': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
        ws: true,
        cors: true
      },
      '/categories': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
        ws: true,
        cors: true
      },
      '/shopCarProduct': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
        ws: true,
        cors: true
      },
      '/systemOrder': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
        ws: true,
        cors: true
      },
    },
  },
});