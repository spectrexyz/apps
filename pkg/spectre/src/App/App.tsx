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

export function App() {
  return (
    <AppProviders>
      <Switch>
        {/* Home */}
        <Route path="/">
          <ScreenHome />
        </Route>

        {/* Fractionalize */}
        <Route path="/fractionalize">
          <ScreenSpectralize />
        </Route>

        {/* NFTs */}
        <Route path="/nfts/:id/pool">
          {({ id }) => <ScreenNft id={id} panel="pool" />}
        </Route>
        <Route path="/nfts/:id/fractions">
          {({ id }) => <ScreenNft id={id} panel="fractions" />}
        </Route>
        <Route path="/nfts/:id">
          {({ id }) => <ScreenNft id={id} panel="nft" />}
        </Route>

        {/* Swap */}
        <Route path="/nfts/:id/buy">
          {({ id }) => <ScreenBuy id={id} />}
        </Route>
        <Route>Not found</Route>
      </Switch>
    </AppProviders>
  )
}

function AppProviders({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), [])
  return (
    <FlatTree
      items={[
        ({ children }: { children: ReactNode }) => (
          <Kit baseUrl="/kit">{children}</Kit>
        ),
        ({ children }: { children: ReactNode }) => (
          <QueryClientProvider client={queryClient}>
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
