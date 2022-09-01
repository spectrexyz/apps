import type { ReactNode } from "react"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { prefixer } from "stylis"
import { BaseUrl } from "../BaseUrl"
import { cssUnitPlugin } from "../emotion-plugin-css-unit"
import { Main } from "../Main"
import { gu } from "../styles"

type UikitProps = {
  baseUrl: string
  children: ReactNode
}

const emotionCache = createCache({
  key: "k",
  stylisPlugins: [cssUnitPlugin(gu, "gu"), prefixer],
})

export function Uikit({ baseUrl, children }: UikitProps) {
  return (
    <BaseUrl baseUrl={baseUrl}>
      <CacheProvider value={emotionCache}>
        <Main>{children}</Main>
      </CacheProvider>
    </BaseUrl>
  )
}
