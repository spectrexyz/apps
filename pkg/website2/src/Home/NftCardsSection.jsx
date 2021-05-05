import React from "react"
import { css } from "@emotion/react"
import { fonts } from "uikit"
import { NftCollection } from "./NftCollection.jsx"
import { nftCardsSection } from "../content.js"
import { formatLineBreaks } from "../utils.js"

export function NftCardsSection() {
  return (
    <section
      css={css`
        width: 100%;
        padding: 20.5gu 0 27.5gu;
      `}
    >
      <h1
        css={css`
          padding-bottom: 5gu;
          font-size: ${fonts.sizes.xxlarge};
          font-weight: 600;
          text-align: center;
        `}
      >
        {nftCardsSection.title}
      </h1>
      <p
        css={css`
          font-family: ${fonts.families.sans};
          font-size: ${fonts.sizes.largeSans};
          white-space: pre-wrap;
          text-align: center;
        `}
      >
        {formatLineBreaks(nftCardsSection.description)}
      </p>
      <div
        css={css`
          height: 100gu;
        `}
      >
        <NftCollection nfts={nftCardsSection.nfts} />
      </div>
    </section>
  )
}
