import createCache, { StylisPlugin } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { prefixer } from "stylis"
import { BaseUrl } from "../BaseUrl"
import { cssUnitPlugin } from "../emotion-plugin-css-unit"
import { FlashMessage } from "../FlashMessage"
import { FocusVisible } from "../FocusVisible"
import { Main } from "../Main"
import { MoireBase } from "../Moire"
import { RootEntryPoint } from "../Root"
import { gu } from "../styles"
import { Theme } from "../Theme"

type KitProps = {
  baseUrl: string
  children: ReactNode
}

const emotionCache = createCache({
  key: "k",
  stylisPlugins: [cssUnitPlugin(gu, "gu"), prefixer as StylisPlugin],
})

const queryClient = new QueryClient()

export function Kit({ baseUrl, children }: KitProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseUrl baseUrl={baseUrl}>
        <CacheProvider value={emotionCache}>
          <Theme>
            <FocusVisible>
              <RootEntryPoint>
                <FlashMessage>
                  <MoireBase>
                    <Main>{children}</Main>
                  </MoireBase>
                </FlashMessage>
              </RootEntryPoint>
            </FocusVisible>
          </Theme>
        </CacheProvider>
      </BaseUrl>
    </QueryClientProvider>
  )
}
