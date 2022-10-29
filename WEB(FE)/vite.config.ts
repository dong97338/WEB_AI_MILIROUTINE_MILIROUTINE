import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://yoopark-solid-space-goggles-q4jxvv74647fx7jj-8080.preview.app.github.dev',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
