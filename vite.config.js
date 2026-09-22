import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/van-stan-folio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})