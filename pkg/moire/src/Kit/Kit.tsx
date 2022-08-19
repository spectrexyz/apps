import type { ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "react-query"
import { BaseUrl } from "../BaseUrl"
import { EmotionPlugins } from "../EmotionPlugins"
import { FocusVisible } from "../FocusVisible"
import { Main } from "../Main"
import { MoireBase } from "../Moire"
import { RootEntryPoint } from "../Root"
import { Theme } from "../Theme"

type KitProps = {
  baseUrl: string
  children: ReactNode
}

const queryClient = new QueryClient()

export function Kit({ baseUrl, children }: KitProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseUrl baseUrl={baseUrl}>
        <Theme>
          <EmotionPlugins>
            <FocusVisible>
              <RootEntryPoint>
                <MoireBase>
                  <Main>{children}</Main>
                </MoireBase>
              </RootEntryPoint>
            </FocusVisible>
          </EmotionPlugins>
        </Theme>
      </BaseUrl>
    </QueryClientProvider>
  )
}
