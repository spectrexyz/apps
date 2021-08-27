import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default {
  plugins: [reactRefresh()],
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
