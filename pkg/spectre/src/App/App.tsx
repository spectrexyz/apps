import type { AddressOrEnsName } from "kit"
import type { ReactNode } from "react"

import { FlatTree, Kit } from "kit"
import { useMemo } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Router, Switch } from "wouter"
import makeMatcher from "wouter/matcher"
import { AppLayout } from "../AppLayout/AppLayout"
import { ScreenBuy } from "../ScreenBuy/ScreenBuy"
import { ScreenHome } from "../ScreenHome/ScreenHome"
import { ScreenNft } from "../ScreenNft/ScreenNft"
import { ScreenProfile } from "../ScreenProfile/ScreenProfile"
import { ScreenSpectralize } from "../ScreenSpectralize/ScreenSpectralize"
import { Wagmi } from "../Wagmi"
import { AppReady } from "./AppReady"
import { AppScroll } from "./AppScroll"
import { AppViewport } from "./AppViewport"

const defaultMatcher = makeMatcher()
const routeMatcher: ReturnType<typeof makeMatcher> = (pattern, path) => {
  if (pattern === "/:address") {
    const address = path.slice(1).match(/^(?:.+\.eth|0x[0-9a-fA-F]{40})$/)?.[0]
    return address ? [true, { address }] : [false, null]
  }
  return defaultMatcher(pattern, path)
}

export function App() {
  return (
    <AppProviders>
      <Router matcher={routeMatcher}>
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

          {/* Profile */}
          <Route path="/:address">
            {({ address }: { address: AddressOrEnsName }) => (
              <ScreenProfile address={address} panel="nfts" />
            )}
          </Route>
          <Route path="/:address/fractions">
            {({ address }: { address: AddressOrEnsName }) => (
              <ScreenProfile address={address} panel="fractions" />
            )}
          </Route>
          <Route path="/:address/pools">
            {({ address }: { address: AddressOrEnsName }) => (
              <ScreenProfile address={address} panel="pools" />
            )}
          </Route>
          <Route path="/:address/rewards">
            {({ address }: { address: AddressOrEnsName }) => (
              <ScreenProfile address={address} panel="rewards" />
            )}
          </Route>
          <Route path="/:address/proposals">
            {({ address }: { address: AddressOrEnsName }) => (
              <ScreenProfile address={address} panel="proposals" />
            )}
          </Route>

          <Route>
            <div
              css={{
                padding: "3gu",
                textAlign: "center",
              }}
            >
              Not found
            </div>
          </Route>
        </Switch>
      </Router>
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
