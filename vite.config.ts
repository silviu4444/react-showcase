import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { checker } from "vite-plugin-checker";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        buildMode: true
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 4200,
    proxy: {
      "/api/node": {
        target: "http://localhost:8085",
        changeOrigin: true,
        secure: false
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    exclude: ["@tanstack/react-query-devtools"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
