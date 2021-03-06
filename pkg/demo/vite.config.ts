import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: { dedupe: ["react", "react-dom"] },
  build: {
    target: "es2020",
    sourcemap: "inline",
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `
      import { Fragment } from 'react'
      import { jsx } from '@emotion/react'
    `,
    jsxFragment: "Fragment",
  },
})
