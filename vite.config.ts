import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    manifest: {
      name: "Unrel",
      short_name: "Unrel",
      description: "Music Player",
      theme_color: "#ffffff",
    }
  })]
})
