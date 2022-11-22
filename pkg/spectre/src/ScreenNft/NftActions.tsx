import type { Snft } from "../types"

import * as dnum from "dnum"
import { Button, TokenAmount, useEthToUsdFormat } from "moire"
import { useLocation } from "wouter"
import { useLayout } from "../styles"
import { InfoGrid } from "./InfoGrid"

export function NftActions(
  {
    highlight = "buyout",
    snft,
  }: {
    highlight?: "buyout" | "fractions"
    snft: Snft
  },
) {
  const [, setLocation] = useLocation()
  const layout = useLayout()
  const xlarge = !layout.below("xlarge")
  const ethToUsd = useEthToUsdFormat()

  return snft && (
    <InfoGrid
      heading="Actions"
      sections={[
        {
          heading: "Buyout price",
          content: (
            <TokenAmount
              compact={!xlarge}
              converted={ethToUsd(snft.buyoutPrice)}
              symbol="ETH"
              value={dnum.format(snft.buyoutPrice, 4)}
            />
          ),
        },
        {
          heading: "Fraction price",
          content: (
            <TokenAmount
              compact={!xlarge}
              converted={ethToUsd(snft.token.priceEth)}
              symbol="ETH"
              value={dnum.format(snft.token.priceEth, 6)}
            />
          ),
        },
      ]}
      footer={[
        <div>
          <Button
            key="nft-buyout"
            label="NFT buyout"
            mode={highlight === "buyout" ? "primary" : "secondary"}
            onClick={() => {
              setLocation(`/nfts/${snft.shortId}/buyout`)
            }}
            size={xlarge ? undefined : "compact"}
            wide
            disabled={snft.buyoutState !== "Opened"}
          />
          {snft.buyoutState !== "Opened" && (
            <div css={{ paddingTop: "2gu", color: "colors.contentDimmed" }}>
              {snft.buyoutState === "Pending"
                && "Will be available after the timelock."}
              {snft.buyoutState === "Closed"
                && "Buyout closed."}
              {snft.buyoutState === "Null"
                && "Buyout not available."}
            </div>
          )}
        </div>,
        <Button
          key="buy-fractions"
          label="Buy fractions"
          mode={highlight === "fractions" ? "primary" : "secondary"}
          onClick={() => {
            setLocation(`/nfts/${snft.shortId}/buy`)
          }}
          size={xlarge ? undefined : "compact"}
          wide
        />,
      ]}
    />
  )
}
