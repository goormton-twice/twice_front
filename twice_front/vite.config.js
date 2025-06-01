import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
// vite.config.js 예시
server: {
  proxy: {
    '/api': {
      target: 'https://api.cheer-up.net',
      changeOrigin: true,
      secure: false,
    },
  },
}

})
