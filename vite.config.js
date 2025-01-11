import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with "/api" to the backend
      "/api": {
        target: "http://localhost:3005", // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
