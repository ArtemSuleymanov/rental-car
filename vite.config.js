import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, 
    },
  },
  build: {
    sourcemap: true,
    assetsInlineLimit: 0,
  },
})
