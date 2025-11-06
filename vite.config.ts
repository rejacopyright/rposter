import { tanstackRouter } from '@tanstack/router-plugin/vite'

import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@ts': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@lottie': fileURLToPath(new URL('./src/assets/lottie', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
