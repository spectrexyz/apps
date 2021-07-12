import { useMemo } from "react"
import { Kit, stripTrailingSlashes, FlatTree } from "kit"
import { QueryClient, QueryClientProvider } from "react-query"
import { Switch, Route } from "wouter"
import { BlockNumber, EthBalance, Ethereum } from "../Ethereum"
import { AppLayout } from "../AppLayout/AppLayout.jsx"
import { ScreenHome } from "../ScreenHome/ScreenHome.jsx"
import { ScreenSwap } from "../ScreenSwap/ScreenSwap.jsx"
import { ScreenSpectralize } from "../ScreenSpectralize/ScreenSpectralize.jsx"
import { AppReady } from "./AppReady.jsx"
import { AppScroll } from "./AppScroll.jsx"
import { AppViewport } from "./AppViewport.jsx"

function App() {
  return (
    <AppProviders>
      <Switch>
        <Route path="/">
          <ScreenHome />
        </Route>
        <Route path="/spectralize">
          <ScreenSpectralize />
        </Route>
        <Route path="/nfts/:id/buy">
          <ScreenSwap />
        </Route>
        <Route>Wrong path?</Route>
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

export default App
