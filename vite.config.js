import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Em desenvolvimento, os pedidos a /api vão para o servidor local das funções:
//   npm run dev:api
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { sourcemap: false },
  server: {
    proxy: { "/api": "http://localhost:8888" },
  },
});
