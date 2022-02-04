import type { FC, ReactNode } from "react"

import { css } from "@emotion/react"
import { Contract, providers } from "ethers"
import { Kit } from "kit"
import React, { useEffect, useState } from "react"
import { FetcherDeclarationEthers, NftProvider } from "use-nft"
import { Link, Route, Router } from "wouter"
import { Badge } from "./Badge"
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
import { Toggle } from "./Toggle"
import { TokenBadge } from "./TokenBadge"
import { TokenIcon } from "./TokenIcon"
import { TokenInput } from "./TokenInput"
import { Video } from "./Video"

const demos = [
  ["badge", () => <Badge />, true],
  ["button", () => <Button label="Enable account" />, true],
  ["cards", () => <NftCollection />, false],
  ["chart", () => <Chart />, true],
  ["diagram", () => <Diagram />, true],
  ["distribution", () => <Distribution />, true],
  ["icon", () => <Icon />, true],
  ["moire", () => <Moire />, true],
  ["radio", () => <Radio />, true],
  ["radiobox", () => <RadioBox />, true],
  ["slider", () => <Slider />, true],
  ["spectre", () => <Spectre />, true],
  ["steps", () => <Steps />, true],
  ["token-badge", () => <TokenBadge />, true],
  ["token-icon", () => <TokenIcon />, true],
  ["token-input", () => <TokenInput />, true],
  ["video", () => <Video />, true],
  ["toggle", () => <Toggle />, true],
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
      "E7YgkR4GmBg58uKRmXtQ9tJaqM6oE9hu",
    ),
  },
]

export function App() {
  return (
    <Kit baseUrl="/kit/">
      <Router hook={useHashLocation}>
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
                  {centered
                    ? (
                      <VCenter>
                        <Element />
                      </VCenter>
                    )
                    : <Element />}
                </Route>
              ))}
            </>
          </div>
        </NftProvider>
      </Router>
    </Kit>
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
