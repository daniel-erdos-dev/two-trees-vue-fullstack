import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": "https://two-trees-vue-backend.onrender.com",
      "/images": "https://two-trees-vue-backend.onrender.com",
    },
  },
});
