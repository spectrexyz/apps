// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-dts";
module.exports = defineConfig(async ({ mode }) => ({
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve("/home/pierre/s/apps/pkg/kit", "src/index.tsx"),
      formats: ["es", "cjs"],
      fileName: (format) => `kit.${format}.js`
    },
    sourcemap: mode === "production" || "inline",
    rollupOptions: {
      external: [
        "@emotion/cache",
        "@emotion/react",
        "react",
        "react-dom",
        "react-spring",
        "stylis"
      ]
    }
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from '@emotion/react'`
  },
  optimizeDeps: {
    entries: ["./src/index.tsx"]
  },
  plugins: [dts()]
}));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtZHRzXCJcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVDb25maWcoYXN5bmMgKHsgbW9kZSB9KSA9PiAoe1xuICBidWlsZDoge1xuICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKFwiL2hvbWUvcGllcnJlL3MvYXBwcy9wa2cva2l0XCIsIFwic3JjL2luZGV4LnRzeFwiKSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBraXQuJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgXCJpbmxpbmVcIixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcIkBlbW90aW9uL2NhY2hlXCIsXG4gICAgICAgIFwiQGVtb3Rpb24vcmVhY3RcIixcbiAgICAgICAgXCJyZWFjdFwiLFxuICAgICAgICBcInJlYWN0LWRvbVwiLFxuICAgICAgICBcInJlYWN0LXNwcmluZ1wiLFxuICAgICAgICBcInN0eWxpc1wiLFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAganN4RmFjdG9yeTogXCJqc3hcIixcbiAgICBqc3hJbmplY3Q6IGBpbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdgLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlbnRyaWVzOiBbXCIuL3NyYy9pbmRleC50c3hcIl0sXG4gIH0sXG4gIHBsdWdpbnM6IFtkdHMoKV0sXG59KSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFFQSxPQUFPLFVBQVUsYUFBYSxPQUFPLEVBQUUsV0FBWTtBQUFBLEVBQ2pELE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sS0FBSyxRQUFRLCtCQUErQjtBQUFBLE1BQ25ELFNBQVMsQ0FBQyxNQUFNO0FBQUEsTUFDaEIsVUFBVSxDQUFDLFdBQVcsT0FBTztBQUFBO0FBQUEsSUFFL0IsV0FBVyxTQUFTLGdCQUFnQjtBQUFBLElBQ3BDLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlOLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQTtBQUFBLEVBRWIsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDO0FBQUE7QUFBQSxFQUVaLFNBQVMsQ0FBQztBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
