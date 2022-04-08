import { Button, TokenAmount } from "kit"
import { useLabelStyle, useLayout } from "../styles"
import { PanelSection } from "./PanelSection"

export function FractionsMetrics() {
  const labelStyle = useLabelStyle({ size: "small" })
  const layout = useLayout()
  return (
    <PanelSection title="Metrics">
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3gu",
          paddingTop: "1gu",
        }}
      >
        <div>
          <h2 css={labelStyle}>Market cap</h2>
          <TokenAmount
            compact={layout.below("xlarge")}
            converted="$1,367,258"
            symbol="ETH"
            value="435.18"
          />
        </div>
        <div>
          <h2 css={labelStyle}>Minted supply</h2>
          <TokenAmount
            compact={layout.below("xlarge")}
            converted="680,925 MOI"
            symbol="%"
            value="65"
          />
        </div>
        <div>
          <h2 css={labelStyle}>Minting fees</h2>
          <TokenAmount
            compact={layout.below("xlarge")}
            converted="$67,258"
            symbol="ETH"
            value="12.17"
          />
        </div>
        <div>
          <h2 css={labelStyle}>Trading fees</h2>
          <TokenAmount
            compact={layout.below("xlarge")}
            converted="$208,423"
            symbol="ETH"
            value="31.06"
          />
        </div>
      </div>
    </PanelSection>
  )
}
