import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
// import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  plugins: [
    // react(),
    checker({ typescript: true }),
  ],
})
