import React from "react"
import { Route } from "wouter"
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

function App() {
  return (
    <NftProvider fetcher={fetcher}>
      <Base>
        <Header />
        <main>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">About</Route>
          <Route path="/litepaper">Litepaper</Route>
        </main>
        <Footer />
      </Base>
    </NftProvider>
  )
}

export default App
