import type { Snft } from "../types"

import { Button, TokenAmount } from "kit"
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
  return (
    <InfoGrid
      heading="Actions"
      sections={[
        {
          heading: "Buyout price",
          content: (
            <TokenAmount
              compact={!xlarge}
              converted="$1,367,258"
              symbol="ETH"
              value="435.18"
            />
          ),
        },
        {
          heading: "Fraction price",
          content: (
            <TokenAmount
              compact={!xlarge}
              converted="$20.23"
              symbol="ETH"
              value="0.0018"
            />
          ),
        },
      ]}
      footer={[
        <Button
          label="NFT buyout"
          mode={highlight === "buyout" ? "primary" : "secondary"}
          size={xlarge ? undefined : "compact"}
          wide
        />,
        <Button
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
