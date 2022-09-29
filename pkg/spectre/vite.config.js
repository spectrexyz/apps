import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import pluginRewriteAll from "vite-plugin-rewrite-all"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    global: "globalThis",
  },
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: mode === "production" || "inline",
  },
  optimizeDeps: {
    entries: ["./src/index.tsx"],
  },
  plugins: [
    pluginRewriteAll(),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    visualizer({
      emitFile: true,
      file: "stats.html",
    }),
  ],
  resolve: {
    dedupe: [
      "@emotion/cache",
      "@emotion/react",
      "react",
      "react-dom",
      "react-spring",
      "stylis",
    ],
    alias: {
      "moire": resolve(__dirname, "../moire/src/index.tsx"),
    },
  },
}))
