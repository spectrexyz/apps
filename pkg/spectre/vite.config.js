import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
// import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  define: {
    global: 'globalThis',
  },
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: mode === "production" || "inline",
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  optimizeDeps: {
    entries: ["./src/index.tsx"],
  },
  plugins: [
    // react(),
    checker({ typescript: true }),
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
