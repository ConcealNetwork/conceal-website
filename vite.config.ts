import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/conceal-website/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/pools': {
        target: 'https://explorer.conceal.network/services/pools/data',
        changeOrigin: true,
        rewrite: () => '',
      },
    },
  },
})
