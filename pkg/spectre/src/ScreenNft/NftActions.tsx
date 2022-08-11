import type { Snft } from "../types"

import * as dnum from "dnum"
import { Button, TokenAmount, useEthToUsdFormat } from "kit"
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

  return (
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
        <Button
          key="nft-buyout"
          label="NFT buyout"
          mode={highlight === "buyout" ? "primary" : "secondary"}
          size={xlarge ? undefined : "compact"}
          wide
        />,
        <Button
          key="buy-fractions"
          label="Buy fractions"
          mode={highlight === "fractions" ? "primary" : "secondary"}
          size={xlarge ? undefined : "compact"}
          onClick={() => {
            setLocation(`/nfts/${snft.id}/buy`)
          }}
          wide
        />,
      ]}
    />
  )
}
