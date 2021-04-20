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
    provider: new providers.CloudflareProvider(),
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
              overflow: hidden;
            `}
          >
            <div
              css={css`
                display: grid;
                place-items: center;
                width: 100%;
                min-height: 100%;
              `}
            >
              <Route path="/">
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
                <NftCollection count={16} />
              </Route>
              <Route path="/spectre">
                <Spectre />
              </Route>
              <Route path="/button">
                <Button label="Enable account" />
              </Route>
            </div>
          </div>
        </NftProvider>
      </Uikit>
    </Router>
  )
}
