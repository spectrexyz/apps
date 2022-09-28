import type { FC, ReactNode } from "react"

import { css } from "@emotion/react"
import { Contract, providers } from "ethers"
import { Kit } from "moire"
import { useEffect, useState } from "react"
import { FetcherDeclarationEthers, NftProvider } from "use-nft"
import { Link, Route, Router } from "wouter"
import { BadgeDemo } from "./BadgeDemo"
import { Button } from "./Button"
import { Card } from "./Card"
import { Chart } from "./Chart"
import { Diagram } from "./Diagram/Diagram"
import { Distribution } from "./Distribution"
import { Icon } from "./Icon"
import { Loader } from "./Loader"
import { LoadingBox } from "./LoadingBox"
import { Moire } from "./Moire"
import { NftCollection } from "./NftCollection"
import { PoolWeightDemo } from "./PoolWeightDemo"
import { ProgressIndicator } from "./ProgressIndicator"
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

interface Demo {
  centered?: boolean
  [key: string]: FC | Demo["centered"]
}

const demos: Demo[] = [
  { BadgeDemo },
  { Button },
  { Card },
  { Chart },
  { Diagram },
  { Distribution },
  { Icon },
  { Loader },
  { LoadingBox },
  { Moire },
  { NftCollection, centered: false },
  { PoolWeightDemo },
  { ProgressIndicator },
  { Radio },
  { RadioBox },
  { Slider },
  { Spectre },
  { Steps },
  { TabsDemo },
  { Toggle },
  { TokenAmountDemo },
  { TokenBadge },
  { TokenIcon },
  { TokenInput },
  { Video },
]

function nameFromDemo(demo: Demo) {
  const name = Object.keys(demo).filter((n) => n !== "centered")[0]
  return name
    .replace(/Demo$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
}

function Demo({ demo }: { demo: Demo }) {
  const DemoComponent =
    Object.values(demo).filter((d) => typeof d === "function")[0]

  if (typeof DemoComponent !== "function") {
    throw new Error("Demo error")
  }

  const { centered = true } = demo

  return centered
    ? (
      <VCenter>
        <DemoComponent />
      </VCenter>
    )
    : <DemoComponent />
}

function currentLocation() {
  return window.location.hash.replace(/^#/, "") || "/"
}

function navigate(to: string) {
  window.location.hash = to
}

function useHashLocation(): [string, typeof navigate] {
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
    <Kit baseUrl="/moire/">
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
                  {demos.map((demo) => {
                    const name = nameFromDemo(demo)
                    return (
                      <li key={name}>
                        <Link href={`#/${name}`}>{name}</Link>
                      </li>
                    )
                  })}
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
              {demos.map((demo) => {
                const name = nameFromDemo(demo)
                return (
                  <Route key={name} path={`/${name}`}>
                    <Demo demo={demo} />
                  </Route>
                )
              })}
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
