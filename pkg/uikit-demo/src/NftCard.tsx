import React from "react"
import { css } from "@emotion/react"
import { Moire, colors, fonts, gu } from "uikit"
import { useNft } from "use-nft"

export const NftCard = React.memo(function NftCard({
  active,
  nft: { contract, tokenId },
}) {
  const { nft = { image: "" }, loading, error, reload } = useNft(
    contract,
    tokenId
  )
  const author = "@poppy"
  const bid = { current: "2.80 ETH", end: "25 MIN" }
  return (
    <div
      css={css`
        width: 35gu;
        color: ${colors.background};
        border: 3px solid ${colors.primary};
        font-size: ${fonts.sizes.small};
      `}
    >
      <img
        alt=""
        src={nft.image}
        css={css`
          display: block;
          width: 100%;
          height: 27gu;
          object-fit: cover;
          object-position: 50% 50%;
          background: ${colors.background};
        `}
      />

      <div
        css={css`
          padding: 2gu;
        `}
      >
        <Tag label={nft.name || "Untitled"} animate={active} />

        <div
          css={css`
            margin: 2gu 0 1gu;
          `}
        >
          <a>{author}</a>
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
          {nft.description}
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

function Tag({ animate, label }) {
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
        css={css`
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          height: 100%;
          padding: 0 1.5gu;
          color: ${colors.primary};
          background: ${colors.background};
        `}
      >
        {label}
      </span>
      <div
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
        <Moire mode="light" animate={animate} label={label} />
      </div>
    </div>
  )
}
