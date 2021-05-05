import React from "react"
import { css } from "@emotion/react"
import { Hero } from "./Hero.jsx"
import { Steps } from "./Steps.jsx"
import { Partnership } from "./Partnership.jsx"
import { NftCardsSection } from "./NftCardsSection.jsx"
import { Subscribe } from "./Subscribe.jsx"

export function Home() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {true && <Hero />}
      {true && <Steps />}
      {true && <Partnership />}
      {true && <NftCardsSection />}
      {true && <Subscribe />}
    </div>
  )
}
