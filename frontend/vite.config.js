import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Agar aap Vite v4/v5 use kar rahe hain, ya fir agar aap postcss use kar rahe hain toh yeh import shayad na ho. Aapko apna purana tailwind import waise hi rakhna hai.
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(), // Aapka purana tailwind plugin yahan waise hi rahega
    
    // Naya PWA Plugin jo humne add kiya
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'StreetEats POS',
        short_name: 'StreetEats',
        description: 'StreetEats Point of Sale Application',
        theme_color: '#ea580c',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'launchericon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'launchericon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'launchericon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})