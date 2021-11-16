import type { ReactNode } from "react"
import type { StylisPlugin } from "@emotion/cache"

import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"
import { cssUnitPlugin } from "../emotion-plugin-css-unit"
import { gu } from "../styles"
import { BaseUrl } from "../BaseUrl"
import { FocusVisible } from "../FocusVisible"
import { Main } from "../Main"
import { MoireBase } from "../Moire"
import { RootEntryPoint } from "../Root"
import { Theme } from "../Theme"

type KitProps = {
  baseUrl: string
  children: ReactNode
}

const emotionCache = createCache({
  key: "k",
  stylisPlugins: [cssUnitPlugin(gu, "gu"), prefixer as StylisPlugin],
})

export function Kit({ baseUrl, children }: KitProps): JSX.Element {
  return (
    <BaseUrl baseUrl={baseUrl}>
      <CacheProvider value={emotionCache}>
        <Theme>
          <FocusVisible>
            <RootEntryPoint>
              <MoireBase>
                <Main>{children}</Main>
              </MoireBase>
            </RootEntryPoint>
          </FocusVisible>
        </Theme>
      </CacheProvider>
    </BaseUrl>
  )
}
