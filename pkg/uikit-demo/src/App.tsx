import type { ReactNode } from "react"

import { useState, useEffect } from "react"
import { Uikit, Button } from "uikit"
import { css } from "@emotion/react"
import { Router, Link, Route } from "wouter"
import { providers, Contract } from "ethers"
import { NftProvider, FetcherDeclarationEthers } from "use-nft"
import { Spectre } from "./Spectre"
import { NftCollection } from "./NftCollection"

function currentLocation() {
  return window.location.hash.replace(/^#/, "") || "/"
}

function navigate(to: string) {
  window.location.hash = to
}

function useHashLocation(): [string, (path: string, ...args: any[]) => any] {
  const [loc, setLoc] = useState(currentLocation())
  useEffect(() => {
    const handler = () => setLoc(currentLocation())
    window.addEventListener("hashchange", handler)
    return () => {
      window.removeEventListener("hashchange", handler)
    }
  }, [])
  return [loc, navigate]
}

const fetcher = [
  "ethers",
  {
    ethers: { Contract },
    // provider: new providers.CloudflareProvider(),
    provider: new providers.AlchemyProvider(
      "homestead",
      "E7YgkR4GmBg58uKRmXtQ9tJaqM6oE9hu"
    ),
    // provider: new providers.InfuraProvider(['homestead', '7236f6a36152476ba61279266233a49c'])
  },
]

export function App() {
  return (
    <Router hook={useHashLocation}>
      <Uikit baseUrl="/uikit/">
        <NftProvider fetcher={fetcher as FetcherDeclarationEthers}>
          <div
            css={css`
              width: 100vw;
              height: 100vh;
              padding: 4gu 0;
              overflow-x: hidden;
              overflow-y: scroll;
            `}
          >
            <Route path="/">
              <VCenter>
                <ul>
                  <li>
                    <Link href="#/button">button</Link>
                  </li>
                  <li>
                    <Link href="#/cards">cards</Link>
                  </li>
                  <li>
                    <Link href="#/spectre">spectre</Link>
                  </li>
                </ul>
              </VCenter>
            </Route>
            <Route path="/:any">
              <div
                css={css`
                  position: absolute;
                  top: 1gu;
                  left: 2gu;
                `}
              >
                <Link href="/">back</Link>
              </div>
            </Route>
            <Route path="/cards">
              <NftCollection />
            </Route>
            <Route path="/spectre">
              <VCenter>
                <Spectre />
              </VCenter>
            </Route>
            <Route path="/button">
              <VCenter>
                <Button label="Enable account" />
              </VCenter>
            </Route>
          </div>
        </NftProvider>
      </Uikit>
    </Router>
  )
}

function VCenter({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        place-items: center;
        width: 100%;
        min-height: calc(100% - 4gu * 2);
      `}
    >
      {children}
    </div>
  )
}
