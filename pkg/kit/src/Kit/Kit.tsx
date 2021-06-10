/** @jsx jsx */
import type { ReactNode } from "react"

import { CacheProvider, jsx } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"
import { cssUnitPlugin } from "../emotion-plugin-css-unit"
import { gu } from "../styles"
import { Main } from "../Main"
import { BaseUrl } from "../BaseUrl"
import { Theme } from "../Theme"
import { RootEntryPoint } from "../Root"

type KitProps = {
  baseUrl: string
  children: ReactNode
}

const emotionCache = createCache({
  key: "k",
  stylisPlugins: [cssUnitPlugin(gu, "gu"), prefixer],
})

export function Kit({ baseUrl, children }: KitProps): JSX.Element {
  return (
    <BaseUrl baseUrl={baseUrl}>
      <CacheProvider value={emotionCache}>
        <Theme>
          <RootEntryPoint>
            <Main>{children}</Main>
          </RootEntryPoint>
        </Theme>
      </CacheProvider>
    </BaseUrl>
  )
}
