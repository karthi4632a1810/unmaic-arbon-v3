import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 3D globe + three.js is intentionally large; loaded only on /global-engagements
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/three") ||
            id.includes("three-globe") ||
            id.includes("react-globe.gl")
          ) {
            return "vendor-globe";
          }
          if (id.includes("node_modules/hls.js")) {
            return "vendor-hls";
          }
        },
      },
    },
  },
});
