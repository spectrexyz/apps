import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import pluginRewriteAll from "vite-plugin-rewrite-all"

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  define: {
    global: "globalThis",
  },
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: mode === "production" || "inline",
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `
      import { Fragment } from 'react'
      import { jsx } from '@emotion/react'
    `,
    jsxFragment: "Fragment",
  },
  optimizeDeps: {
    entries: ["./src/index.tsx"],
  },
  plugins: [
    pluginRewriteAll(),
    react(),
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
  },
}))
