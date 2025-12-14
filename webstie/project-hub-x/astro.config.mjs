// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [
      customErrorOverlayPlugin(),
    ],
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    host: true,
    port: 3000,
  },
});
