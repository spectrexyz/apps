import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  build: {
    target: "es2019",
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  resolve: {
    dedupe: [
      "@emotion/react",
    ],
  },
}
