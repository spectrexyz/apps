import { ReactNode, useMemo } from "react"

import { FlatTree, Kit } from "kit"
import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Switch } from "wouter"
import { AppLayout } from "../AppLayout/AppLayout"
import { ScreenBuy } from "../ScreenBuy/ScreenBuy"
import { ScreenHome } from "../ScreenHome/ScreenHome"
import { ScreenNft } from "../ScreenNft/ScreenNft"
import { ScreenSpectralize } from "../ScreenSpectralize/ScreenSpectralize"
import { Wagmi } from "../Wagmi"
import { AppReady } from "./AppReady"
import { AppScroll } from "./AppScroll"
import { AppViewport } from "./AppViewport"

export default function App() {
  return (
    <AppProviders>
      <Switch>
        <Route path="/">
          <ScreenHome />
        </Route>
        <Route path="/fractionalize">
          <ScreenSpectralize />
        </Route>
        <Route path="/nfts/:id/serc20">
          {({ id }) => <ScreenNft id={id} panel="serc20" />}
        </Route>
        <Route path="/nfts/:id">
          {({ id }) => <ScreenNft id={id} panel="nft" />}
        </Route>
        <Route path="/nfts/:id/buy">
          <ScreenBuy />
        </Route>
        <Route>Not found</Route>
      </Switch>
    </AppProviders>
  )
}

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <FlatTree
      items={[
        ({ children }: { children: ReactNode }) => (
          <Kit baseUrl="/kit">{children}</Kit>
        ),
        ({ children }: { children: ReactNode }) => (
          <QueryClientProvider client={useMemo(() => new QueryClient(), [])}>
            {children}
          </QueryClientProvider>
        ),
        Wagmi,
        AppScroll,
        AppViewport,
        AppReady,
        AppLayout,
      ]}
    >
      {children}
    </FlatTree>
  )
}
