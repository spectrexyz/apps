import path from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

module.exports = defineConfig(async ({ mode }) => ({
  build: {
    target: ["es2020", "esnext"],
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      formats: ["es", "cjs"],
      fileName: (format) => `kit.${format}.js`,
    },
    sourcemap: mode === "production" || "inline",
    rollupOptions: {
      external: [
        "@emotion/cache",
        "@emotion/react",
        "react",
        "react-dom",
        "react-spring",
        "stylis",
      ],
    },
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
  plugins: [dts({ insertTypesEntry: true })],
}))
