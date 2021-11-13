import path from "path"
import { defineConfig } from "vite"
import dts from "vite-dts"

module.exports = defineConfig({
  mode: "development",
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      formats: ["es", "cjs"],
      fileName: (format) => `kit.${format}.js`,
    },
    sourcemap: true,
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
  optimizeDeps: {
    entries: ["./src/index.tsx"],
  },
  plugins: [dts()],
})
