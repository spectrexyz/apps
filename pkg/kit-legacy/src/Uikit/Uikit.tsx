/** @jsx jsx */
import type { ReactNode } from "react"

import { jsx } from "@emotion/react"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"
import { cssUnitPlugin } from "../emotion-plugin-css-unit"
import { gu } from "../styles"
import { Main } from "../Main"
import { BaseUrl } from "../BaseUrl"

type UikitProps = {
  baseUrl: string
  children: ReactNode
}

const emotionCache = createCache({
  key: "uitk",
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
