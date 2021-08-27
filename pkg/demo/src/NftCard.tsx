import React from "react"
import { css } from "@emotion/react"
import { useNft } from "use-nft"
import { fonts, Moire, useDimensions, useTheme } from "kit"

type NftCardProps = {
  active: boolean
  nft: {
    contract: string
    tokenId: string
  }
}

export const NftCard = React.memo(function NftCard({
  active,
  nft: { contract, tokenId },
}: NftCardProps) {
  const { nft = { image: "", name: "", description: "" } } = useNft(
    contract,
    tokenId
  )
  const author = "@poppy"
  const bid = { current: "2.80 ETH", end: "25 MIN" }
  return (
    <div
      css={({ colors }) => css`
        width: 35gu;
        color: ${colors.background};
        border: 3px solid ${colors.primary};
        font-size: ${fonts.sizes.small};
      `}
    >
      <img
        alt=""
        src={nft.image}
        css={({ colors }) => css`
          display: block;
          width: 100%;
          height: 27gu;
          object-fit: cover;
          object-position: 50% 50%;
          background: ${colors.background};
          image-rendering: ${active ? "auto" : "crisp-edges"};
        `}
      />

      <div
        css={css`
          padding: 2gu;
        `}
      >
        <div
          css={css`
            height: 3gu;
          `}
        >
          {active && <Tag label={nft.name || "Untitled"} />}
        </div>

        <div
          css={css`
            margin: 2gu 0 1gu;
          `}
        >
          <a>{active ? author : "_"}</a>
        </div>

        <p
          css={css`
            // truncating
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            height: 9gu;
          `}
        >
          {nft.description || "−"}
        </p>

        <div
          css={css`
            margin-top: 2gu;
          `}
        >
          <div>Current bid: {bid.current}</div>
          <div>Ending in: {bid.end}</div>
        </div>
      </div>
    </div>
  )
})

function Tag({ label }: { label: string }) {
  const bounds = useDimensions()
  const { colors } = useTheme()
  return (
    <div
      css={css`
        position: relative;
        display: inline-grid;
        place-items: center;
        height: 3gu;
        text-align: center;
        white-space: nowrap;
      `}
    >
      <span
        css={({ colors }) => css`
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          max-width: 100%;
          height: 100%;
          padding: 0 1.5gu;
          color: ${colors.primary};
          background: ${colors.background};

          // truncating
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      >
        <span>{label}</span>
      </span>
      <div
        ref={bounds.observe}
        css={css`
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(2px, 2px);
          pointer-events: none;
        `}
      >
        <Moire
          height={bounds.height}
          width={bounds.width}
          linesColor={colors.background}
          backgroundColor={colors.primary}
        />
      </div>
    </div>
  )
}
