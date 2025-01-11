import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
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
=======
  
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
})
