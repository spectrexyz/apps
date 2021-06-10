import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { gu, fonts, theme } from "kit-legacy"
import { NftCollection } from "./NftCollection.jsx"
import { nftCardsSection } from "../content.jsx"
import { formatLineBreaks } from "../utils.js"
import { useLayout } from "../styles.js"

function useStyles() {
  const layout = useLayout()
  return useMemo(() => {
    if (layout.name === "small") {
      return {
        fonts: [28, 16],
        padding: { top: 8 * gu, bottom: 11 * gu },
        titleSpacing: 1 * gu,
      }
    }
    if (layout.name === "medium") {
      return {
        fonts: [44, 20],
        padding: { top: 10 * gu, bottom: 20 * gu },
        titleSpacing: 2 * gu,
      }
    }
    if (layout.name === "large") {
      return {
        fonts: [44, 20],
        padding: { top: 15 * gu, bottom: 20 * gu },
        titleSpacing: 2 * gu,
      }
    }
    return {
      fonts: [64, 24],
      padding: { top: 20.5 * gu, bottom: 27.5 * gu },
      titleSpacing: 5 * gu,
    }
  }, [layout])
}

export function NftCardsSection() {
  const styles = useStyles()
  const layout = useLayout()
  return (
    <section
      css={css`
        width: 100%;
        max-width: ${layout.contentLarge
          ? `${layout.contentLarge}px`
          : "unset"};
        padding: ${styles.padding.top}px 0 ${styles.padding.bottom}px;
      `}
    >
      <h1
        css={css`
          padding: 0 2gu;
          padding-bottom: ${styles.titleSpacing}px;
          font-size: ${styles.fonts[0]}px;
          font-weight: 600;
          text-align: center;
        `}
      >
        {nftCardsSection.title}
      </h1>
      <p
        css={css`
          padding: 0 2gu;
          font-family: ${fonts.families.sans};
          font-size: ${styles.fonts[1]}px;
          white-space: pre-wrap;
          text-align: center;
          color: ${theme.contentAlt};
        `}
      >
        {formatLineBreaks(nftCardsSection.description)}
      </p>
      <NftCollection nfts={nftCardsSection.nfts} />
    </section>
  )
}
