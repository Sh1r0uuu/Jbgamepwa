import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Aktifkan PWA di mode development
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'app-logo-192.png', 'app-logo-512.png'], 
      manifest: {
        name: 'KAI (改) Store',
        short_name: 'KAI Store',
        description: 'Marketplace Akun Game Online Terpercaya',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/app-logo-192.png', // Tambahkan slash '/' di depan agar path absolut
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/app-logo-512.png', // Tambahkan slash '/' di depan
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})