import React from "react"
import { useLocation } from "wouter"
import { NftProvider } from "use-nft"
import Base from "./Base.jsx"
import { Footer } from "./Footer/Footer.jsx"
import { Header } from "./Header/Header.jsx"
import { Home } from "./Home/Home.jsx"
import { Litepaper } from "./Litepaper/Litepaper.jsx"
import { nfts } from "./nfts.js"

const fetcher = {
  config: null,
  fetchNft(contract, tokenId) {
    const nft = nfts.find(({ nft }) => {
      return nft.contract === contract && nft.tokenId === tokenId
    })
    return nft
  },
}

function App() {
  const [location] = useLocation()

  const matchLocation = (path) =>
    (location === "/" ? "/" : location.replace(/\/$/, "")) === path

  return (
    <NftProvider fetcher={fetcher}>
      <Base>
        <Header />
        <main>
          {matchLocation("/") && <Home />}
          {matchLocation("/litepaper") && <Litepaper />}
        </main>
        <Footer />
      </Base>
    </NftProvider>
  )
}

export default App
