import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // L'app viene pubblicata come pagina del sito del museo, sotto /asta/
  // (vedi build:site nel package.json di root) — serve perché gli asset
  // (JS/CSS) siano referenziati con il percorso giusto.
  base: '/asta/',
  plugins: [react()],
})
