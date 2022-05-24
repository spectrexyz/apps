import type { FC, ReactNode } from "react"

import { css } from "@emotion/react"
import { Contract, providers } from "ethers"
import { Kit } from "kit"
import { useEffect, useState } from "react"
import { FetcherDeclarationEthers, NftProvider } from "use-nft"
import { Link, Route, Router } from "wouter"
import { BadgeDemo } from "./BadgeDemo"
import { Button } from "./Button"
import { Chart } from "./Chart"
import { Diagram } from "./Diagram/Diagram"
import { Distribution } from "./Distribution"
import { FlashMessageDemo } from "./FlashMessageDemo"
import { Icon } from "./Icon"
import { Moire } from "./Moire"
import { NftCollection } from "./NftCollection"
import { PoolWeightDemo } from "./PoolWeightDemo"
import { Radio } from "./Radio"
import { RadioBox } from "./RadioBox"
import { Slider } from "./Slider"
import { Spectre } from "./Spectre"
import { Steps } from "./Steps"
import { TabsDemo } from "./TabsDemo"
import { Toggle } from "./Toggle"
import { TokenAmountDemo } from "./TokenAmountDemo"
import { TokenBadge } from "./TokenBadge"
import { TokenIcon } from "./TokenIcon"
import { TokenInput } from "./TokenInput"
import { Video } from "./Video"

const demos = [
  ["badge", BadgeDemo],
  ["button", Button],
  ["cards", NftCollection, false],
  ["chart", Chart],
  ["diagram", Diagram],
  ["distribution", Distribution],
  ["flash-message", FlashMessageDemo],
  ["icon", Icon],
  ["moire", Moire],
  ["pool-weight", PoolWeightDemo],
  ["radio", Radio],
  ["radiobox", RadioBox],
  ["slider", Slider],
  ["spectre", Spectre],
  ["steps", Steps],
  ["tabs", TabsDemo],
  ["toggle", Toggle],
  ["token-amount", TokenAmountDemo],
  ["token-badge", TokenBadge],
  ["token-icon", TokenIcon],
  ["token-input", TokenInput],
  ["video", Video],
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
              {demos.map(([name, Element, centered = true]) => (
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
