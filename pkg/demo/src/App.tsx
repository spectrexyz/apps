import type { FC, ReactNode } from "react"

import React, { useState, useEffect } from "react"
import { Kit } from "kit"
import { css } from "@emotion/react"
import { Router, Link, Route } from "wouter"
import { providers, Contract } from "ethers"
import { NftProvider, FetcherDeclarationEthers } from "use-nft"
import { Button } from "./Button"
import { Chart } from "./Chart"
import { Diagram } from "./Diagram/Diagram"
import { Distribution } from "./Distribution"
import { Icon } from "./Icon"
import { Moire } from "./Moire"
import { NftCollection } from "./NftCollection"
import { Radio } from "./Radio"
import { RadioBox } from "./RadioBox"
import { Slider } from "./Slider"
import { Spectre } from "./Spectre"
import { Steps } from "./Steps"
import { TokenBadge } from "./TokenBadge"
import { TokenIcon } from "./TokenIcon"
import { TokenInput } from "./TokenInput"
import { Video } from "./Video"

const demos = [
  ["cards", () => <NftCollection />, false],
  ["spectre", () => <Spectre />, true],
  ["button", () => <Button label="Enable account" />, true],
  ["moire", () => <Moire />, true],
  ["chart", () => <Chart />, true],
  ["diagram", () => <Diagram />, true],
  ["distribution", () => <Distribution />, true],
  ["slider", () => <Slider />, true],
  ["steps", () => <Steps />, true],
  ["icon", () => <Icon />, true],
  ["radio", () => <Radio />, true],
  ["radiobox", () => <RadioBox />, true],
  ["token-badge", () => <TokenBadge />, true],
  ["token-icon", () => <TokenIcon />, true],
  ["token-input", () => <TokenInput />, true],
  ["video", () => <Video />, true],
] as [name: string, component: FC, centered: boolean][]

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
    provider: new providers.AlchemyProvider(
      "homestead",
      "E7YgkR4GmBg58uKRmXtQ9tJaqM6oE9hu"
    ),
  },
]

export function App() {
  return (
    <Router hook={useHashLocation}>
      <Kit baseUrl="/kit/">
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
                  {demos.map(([name]) => (
                    <li key={name}>
                      <Link href={`#/${name}`}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </VCenter>
            </Route>
            <Route path="/:any">
              <div
                css={css`
                  position: absolute;
                  top: 1gu;
                  left: 2gu;
                  z-index: 2;
                `}
              >
                <Link href="/">back</Link>
              </div>
            </Route>
            <>
              {demos.map(([name, Element, centered]) => (
                <Route key={name} path={`/${name}`}>
                  {centered ? (
                    <VCenter>
                      <Element />
                    </VCenter>
                  ) : (
                    <Element />
                  )}
                </Route>
              ))}
            </>
          </div>
        </NftProvider>
      </Kit>
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
        height: calc(100vh - 4gu * 2);
      `}
    >
      {children}
    </div>
  )
}
