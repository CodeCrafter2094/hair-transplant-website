import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true // Tüm ngrok ve dış bağlantı isimlerine izin verir
  }
})
