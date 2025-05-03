import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./src/client/config"),
      "@components": path.resolve(__dirname, "./src/client/components"),
      "@sections": path.resolve(__dirname, "./src/client/sections"),
      "@models": path.resolve(__dirname, "./src/client/models")
    },
  },
})