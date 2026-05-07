import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Horus/',
  plugins: [react()],
  server: {
    allowedHosts: ['goatskin-anime-self.ngrok-free.dev', 'all'],
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
