import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default {
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  })],
  build: {
    target: "es2019",
  },
  esbuild: {
    // see https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
}
