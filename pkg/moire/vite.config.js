import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig(async ({ mode }) => ({
  build: {
    target: ["es2020", "esnext"],
    outDir: "dist",
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
      fileName: (format) => `moire.${format}.js`,
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
      output: {
        preserveModules: true,
        esModule: true,
        entryFileNames: ({ name }) => `${name}.js`,
      },
    },
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxFragment: "Fragment",
  },
  optimizeDeps: {
    entries: ["./src/index.tsx"],
  },
  plugins: [dts({ insertTypesEntry: true })],
}))
