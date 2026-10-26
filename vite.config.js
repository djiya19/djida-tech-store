import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/djida-tech-store/',
  plugins: [react()],
})
