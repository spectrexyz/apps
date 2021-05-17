import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import mdx from "vite-plugin-mdx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),

    // https://mdxjs.com/advanced/plugins
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],
  build: {
    target: "es2019",
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
})
