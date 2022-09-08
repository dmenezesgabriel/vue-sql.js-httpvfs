import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/sql.js-httpvfs/dist/sqlite.worker.js",
          dest: "sql.js-httpvfs",
        },
        {
          src: "node_modules/sql.js-httpvfs/dist/sql-wasm.wasm",
          dest: "sql.js-httpvfs",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
