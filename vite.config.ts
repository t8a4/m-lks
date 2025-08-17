import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/m-lks/', // <-- тук сложи ИМЕТО на репото си
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
