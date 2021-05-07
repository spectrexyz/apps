import React, { useEffect, useRef } from "react"
import { useLocation, Route, Switch } from "wouter"
import { NftProvider } from "use-nft"
import { Contract, getDefaultProvider } from "ethers"
import Base from "./Base.jsx"
import { Footer } from "./Footer/Footer.jsx"
import { Header } from "./Header/Header.jsx"
import { Home } from "./Home/Home.jsx"

const fetcher = [
  "ethers",
  {
    ethers: { Contract },
    provider: getDefaultProvider(),
  },
]

function useResetScroll() {
  const [{ pathname }] = useLocation()
  const initialPathname = useRef(true)
  useEffect(() => {
    if (initialPathname.current) {
      initialPathname.current = false
      return
    }
    window.scrollTo(0, 0)
  }, [pathname])
}

function App() {
  useResetScroll()
  return (
    <NftProvider fetcher={fetcher}>
      <Base>
        <Header />
        <main>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/about">About</Route>
            <Route path="/litepaper">Litepaper</Route>
          </Switch>
        </main>
        <Footer />
      </Base>
    </NftProvider>
  )
}

export default App
