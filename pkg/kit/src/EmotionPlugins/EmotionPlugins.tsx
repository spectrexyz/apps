import type { ReactNode } from "react"

import createCache, { StylisPlugin } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { useRef } from "react"
import { prefixer } from "stylis"
import { gu } from "../styles"
import { useTheme } from "../Theme"
import { cssUnitPlugin } from "./emotion-plugin-css-unit"
import { themePlugin } from "./emotion-plugin-theme"

export function EmotionPlugins({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const emotionCache = useRef<ReturnType<typeof createCache>>()

  if (!emotionCache.current) {
    emotionCache.current = createCache({
      key: "k",
      stylisPlugins: [
        cssUnitPlugin(gu, "gu"),
        themePlugin(theme),
        prefixer as StylisPlugin,
      ],
    })
    console.log("????", emotionCache.current)
  }

  return (
    <CacheProvider value={emotionCache.current}>
      {children}
    </CacheProvider>
  )
}
