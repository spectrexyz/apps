import { useEffect, useMemo } from "react"
import { Kit, stripTrailingSlashes, FlatTree } from "kit"
import { QueryClient, QueryClientProvider } from "react-query"
import { Switch, Route, useLocation } from "wouter"
import { BlockNumber, EthBalance, Ethereum } from "../Ethereum"
import { AppLayout } from "../AppLayout/AppLayout.jsx"
import { ScreenHome } from "../ScreenHome/ScreenHome.jsx"
import { ScreenNft } from "../ScreenNft/ScreenNft.jsx"
import { ScreenSpectralize } from "../ScreenSpectralize/ScreenSpectralize.jsx"
import { ScreenBuy } from "../ScreenBuy/ScreenBuy.jsx"
import { AppReady } from "./AppReady.jsx"
import { AppScroll } from "./AppScroll.jsx"
import { AppViewport } from "./AppViewport.jsx"

export default function App() {
  return (
    <AppProviders>
      <Switch>
        <Route path="/">
          <ScreenHome />
        </Route>
        <Route path="/spectralize">
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

function AppProviders({ children }) {
  return (
    <FlatTree
      items={[
        [Kit, { baseUrl: "/kit/" }],
        [QueryClientProvider, { client: useMemo(() => new QueryClient(), []) }],
        Ethereum,
        BlockNumber,
        EthBalance,
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
